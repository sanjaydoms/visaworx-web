import { describe, expect, it } from "vitest";
import { guidesData } from "../../common/content/guides";
import { faqsData } from "../../common/content/faqs";
import { glossaryData } from "../../common/content/glossary";
import { searchResources } from "../../common/utils/resource-search";
import { FORBIDDEN_MARKETING_PHRASES } from "../../common/content/forbidden-phrases";
import { tokenize } from "../../common/ai/retrieval/relevance";

const expectedGuideSlugs = [
  "how-to-choose-the-right-visa-category",
  "visa-readiness-before-you-apply",
  "common-visa-application-mistakes",
  "how-to-prepare-financial-evidence",
  "how-to-prepare-employment-documents",
  "how-to-prepare-student-visa-documents",
  "visa-interview-preparation-guide",
  "understanding-visa-refusal-reasons",
  "when-to-consider-reapplying-after-refusal",
  "business-visa-document-preparation",
  "family-visit-visa-preparation",
  "how-to-check-current-official-visa-requirements",
  "schengen-visa-from-india",
  "uk-visitor-visa-from-india",
  "uae-visa-from-india",
  "us-visitor-visa-from-india",
  "canada-visitor-visa-from-india",
  "singapore-visa-from-india",
  "new-zealand-visitor-visa-from-india",
  "japan-visa-from-india",
  "south-korea-visa-from-india",
  "travel-authorisations-are-not-visas",
  "what-indian-financial-documents-prove",
  "when-someone-else-funds-your-trip",
  "first-time-applicant-no-travel-history",
  "self-employed-visa-applications-from-india",
  "travelling-with-children-indian-passport",
  "after-a-refusal-appeal-review-or-reapply",
  "transit-and-layovers-indian-passport",
];

describe("guides content model", () => {
  it("contains exactly the published guide inventory", () => {
    expect(guidesData.map((g) => g.slug).sort()).toEqual([...expectedGuideSlugs].sort());
  });

  it.each(expectedGuideSlugs)("guide '%s' is fully populated", (slug) => {
    const guide = guidesData.find((g) => g.slug === slug);
    expect(guide).toBeDefined();
    expect(guide!.title.length).toBeGreaterThan(0);
    expect(guide!.summary.length).toBeGreaterThan(0);
    expect(guide!.content.length).toBeGreaterThan(0);
    expect(guide!.seo.title.length).toBeGreaterThan(0);
  });

  it("has no record for an unknown slug so the route can 404", () => {
    expect(guidesData.find((g) => g.slug === "non-existent-guide")).toBeUndefined();
  });
});

describe("resource search", () => {
  it("returns matches across entity types for a broad query", () => {
    const result = searchResources("visa");
    expect(result.totalCount).toBeGreaterThan(0);
    expect(result.guides.length).toBeGreaterThan(0);
    expect(result.faqs.length).toBeGreaterThan(0);
  });

  it("returns nothing for an empty query", () => {
    expect(searchResources("").totalCount).toBe(0);
  });
});

describe("faq and glossary content", () => {
  it("carries at least ten FAQs", () => {
    expect(faqsData.length).toBeGreaterThanOrEqual(10);
  });

  it("carries at least fourteen glossary terms", () => {
    expect(glossaryData.length).toBeGreaterThanOrEqual(14);
  });
});

describe("guide content safety", () => {
  it.each(guidesData.map((g) => g.slug))("guide '%s' makes no approval claims", (slug) => {
    const content = JSON.stringify(guidesData.find((g) => g.slug === slug)).toLowerCase();
    for (const phrase of FORBIDDEN_MARKETING_PHRASES) {
      expect(content).not.toContain(phrase);
    }
  });
});

// The assistant suite proves that unsupported questions stay unsupported by asking
// deliberately unmatchable things - "What are the visa rules for Madagascar?",
// "xyz999 nothing matches this". Those queries are built from ordinary English, and
// FAQs are indexed at the retriever's highest weights: question 3, answer 1.5.
// Because "visa" is a stopword, such a query can reduce to two content words, so a
// single hit on one filler term in an indexed field clears the relevance floor and a
// nonsense question starts retrieving real content.
//
// This has happened twice. Both times the fix was to reach for the specific noun -
// "entry process", "eligibility conditions" - rather than to loosen the retriever.
// Only words that appear in a *realistic* guard query belong here. "What are the
// visa rules for Madagascar?" is a question a real traveller would ask, and the
// assistant must answer it as unsupported rather than serving UAE content, so
// "rules" is worth avoiding in FAQ text. The purely artificial fixtures are built
// from unmatchable tokens instead, so they constrain nothing.
const RETRIEVAL_FILLER = ["rules"];

describe("FAQ wording does not collide with the assistant guard queries", () => {
  // Compare stems, not literal words, using the retriever's own tokenizer so this
  // can never drift from it. "rules" and "ruling" both stem to "rul", which is how
  // a FAQ mentioning a court ruling started matching a query about Madagascar.
  const fillerStems = new Set(RETRIEVAL_FILLER.flatMap((word) => tokenize(word)));

  it.each(RETRIEVAL_FILLER)("no FAQ question or answer stems to %s", (word) => {
    const stems = new Set(tokenize(word));
    const offenders = faqsData
      .filter((faq) =>
        [...tokenize(faq.question), ...tokenize(faq.answer)].some((token) => stems.has(token)),
      )
      .map((faq) => faq.id);

    expect(offenders).toEqual([]);
  });

  it("covers every filler term with a stem", () => {
    expect(fillerStems.size).toBeGreaterThan(0);
  });
});
