import { describe, expect, it } from "vitest";
import { searchApprovedContent } from "./search-approved-content";
import { buildRetrievalContext } from "./build-context";
import { tokenize, scoreFields } from "./relevance";
import { countriesData, isPublished } from "../../content/countries";

describe("query tokenization", () => {
  it("drops filler words that carry no retrieval signal", () => {
    expect(tokenize("What are the documents for a visa?")).toEqual(["document"]);
  });

  it("treats 'visa' as a stopword because it appears in nearly every record", () => {
    expect(tokenize("visa")).toEqual([]);
    expect(tokenize("student visa")).toEqual(["student"]);
  });

  it("folds plurals so 'documents' and 'document' match", () => {
    expect(tokenize("documents")).toEqual(tokenize("document"));
  });
});

describe("field scoring", () => {
  it("ranks a title hit above a body-only hit", () => {
    const terms = tokenize("financial evidence");
    const titleHit = scoreFields(terms, [
      { text: "How to prepare financial evidence", weight: 3 },
      { text: "unrelated body", weight: 1 },
    ]);
    const bodyHit = scoreFields(terms, [
      { text: "unrelated title", weight: 3 },
      { text: "mentions financial evidence in passing", weight: 1 },
    ]);

    expect(titleHit).toBeGreaterThan(bodyHit);
  });

  it("scores nothing when no term matches", () => {
    expect(scoreFields(tokenize("kayaking"), [{ text: "visa readiness", weight: 3 }])).toBe(0);
  });
});

describe("retrieval over approved content", () => {
  it("answers a natural-language question, which the old substring match could not", () => {
    // No title or summary contains this sentence, so whole-query matching
    // returned nothing and the assistant claimed to have no information.
    const result = searchApprovedContent(
      "How do I prepare financial evidence for a student visa?"
    );

    expect(result.sources.length).toBeGreaterThan(0);
    expect(result.matchedGuides.map((g) => g.slug)).toContain("how-to-prepare-financial-evidence");
  });

  it("ranks the most relevant guide first rather than returning data order", () => {
    const result = searchApprovedContent("interview preparation");
    expect(result.matchedGuides[0].slug).toBe("visa-interview-preparation-guide");
  });

  it("finds a country by name", () => {
    const result = searchApprovedContent("What documents are required for Canada?");
    expect(result.matchedCountries.map((c) => c.slug)).toContain("canada");
  });

  it("returns nothing for a query with no approved content behind it", () => {
    const result = searchApprovedContent("Random unmapped text xyz999");
    expect(result.sources).toEqual([]);
    expect(result.matchedGuides).toEqual([]);
    expect(result.matchedCountries).toEqual([]);
  });

  it("returns nothing for an empty query even with page context", () => {
    const result = searchApprovedContent("   ", { pageType: "country", countrySlug: "canada" });
    expect(result.sources).toEqual([]);
  });

  it("uses page context to resolve a question that never names its subject", () => {
    const bare = searchApprovedContent("What should I prepare?");
    const inContext = searchApprovedContent("What should I prepare?", {
      pageType: "country",
      countrySlug: "canada",
    });

    expect(bare.matchedCountries.map((c) => c.slug)).not.toContain("canada");
    expect(inContext.matchedCountries.map((c) => c.slug)).toContain("canada");
  });
});

describe("destinations without published guidance", () => {
  const unpublished = countriesData.find((c) => !isPublished(c))!;

  it("never presents an unpublished destination as country knowledge", () => {
    const result = searchApprovedContent(`What are the visa rules for ${unpublished.name}?`);

    expect(result.matchedCountries.map((c) => c.slug)).not.toContain(unpublished.slug);
    expect(result.unpublishedDestinations.map((c) => c.slug)).toContain(unpublished.slug);
  });

  it("tells the model to report the gap instead of answering from elsewhere", () => {
    const result = searchApprovedContent(`Tell me about ${unpublished.name} requirements`);
    const context = buildRetrievalContext(result);

    expect(context).toContain("DESTINATIONS WITHOUT PUBLISHED GUIDANCE");
    expect(context).toMatch(/NO reviewed guidance/i);
  });
});

describe("retrieval context", () => {
  it("emits no heading without content under it", () => {
    const context = buildRetrievalContext(searchApprovedContent("financial evidence"));

    for (const heading of context.split("\n\n")) {
      const [title, ...body] = heading.split("\n");
      expect(body.length, `heading '${title}' has no content`).toBeGreaterThan(0);
    }
  });

  it("never emits an empty field, which invites the model to fill the silence", () => {
    const context = buildRetrievalContext(searchApprovedContent("Canada student documents"));
    expect(context).not.toMatch(/^- [^:]+:\s*$/m);
    expect(context).not.toContain(": .");
  });

  it("instructs the model not to answer when nothing matched", () => {
    const context = buildRetrievalContext(searchApprovedContent("xyz999 nothing matches this"));
    expect(context).toContain("NO APPROVED CONTENT MATCHED");
    expect(context).toMatch(/do not answer from general knowledge/i);
  });

  it("carries page context through so the model knows where the question came from", () => {
    const context = buildRetrievalContext(searchApprovedContent("what should I prepare"), {
      pageType: "guide",
      guideSlug: "how-to-prepare-financial-evidence",
      readinessBand: "Developing Readiness",
    });

    expect(context).toContain("CURRENT PAGE CONTEXT: guide");
    expect(context).toContain("how-to-prepare-financial-evidence");
    expect(context).toContain("Developing Readiness");
  });

  it("stays within the context budget for a broad query", () => {
    const context = buildRetrievalContext(
      searchApprovedContent("student documents financial evidence interview refusal business")
    );
    expect(context.length).toBeLessThanOrEqual(6100);
  });
});
