import { describe, expect, it } from "vitest";
import { guidesData } from "../../common/content/guides";
import { faqsData } from "../../common/content/faqs";
import { glossaryData } from "../../common/content/glossary";
import { searchResources } from "../../common/utils/resource-search";
import { FORBIDDEN_MARKETING_PHRASES } from "../../common/content/forbidden-phrases";

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
