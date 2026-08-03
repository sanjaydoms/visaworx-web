import { describe, expect, it } from "vitest";
import { servicesData } from "../../common/content/services";
import { countriesData } from "../../common/content/countries";
import { guidesData } from "../../common/content/guides";
import { FORBIDDEN_MARKETING_PHRASES } from "../../common/content/forbidden-phrases";

const expectedSlugs = [
  "tourist-visa",
  "business-visa",
  "student-visa",
  "work-visa",
  "family-dependent-visa",
  "visa-readiness-review",
  "documentation-review",
  "interview-preparation",
  "refusal-review",
];

describe("services content model", () => {
  it("contains exactly the nine initial services", () => {
    expect(servicesData.map((s) => s.slug).sort()).toEqual([...expectedSlugs].sort());
  });

  it.each(expectedSlugs)("service '%s' is fully populated", (slug) => {
    const service = servicesData.find((s) => s.slug === slug);
    expect(service).toBeDefined();
    expect(service!.title.length).toBeGreaterThan(0);
    expect(service!.shortDescription.length).toBeGreaterThan(0);
    expect(service!.idealFor.length).toBeGreaterThan(0);
    expect(service!.outcomes.length).toBeGreaterThan(0);
    expect(service!.included.length).toBeGreaterThan(0);
    expect(service!.excluded.length).toBeGreaterThan(0);
    expect(service!.process.length).toBeGreaterThan(0);
    expect(service!.faqs.length).toBeGreaterThan(0);
  });

  it("has no record for an unknown slug so the route can 404", () => {
    expect(servicesData.find((s) => s.slug === "non-existent-service")).toBeUndefined();
  });

  it("only links to related countries that exist", () => {
    const countrySlugs = countriesData.map((c) => c.slug);
    for (const service of servicesData) {
      for (const slug of service.relatedCountrySlugs) {
        expect(countrySlugs, `service '${service.slug}' links to '${slug}'`).toContain(slug);
      }
    }
  });
});

// RelatedServices resolves these slugs against servicesData and drops the ones
// that do not match, so a stale slug silently removes a card. Every content
// model that feeds that component is checked here.
describe("related service references resolve", () => {
  const serviceSlugs = servicesData.map((s) => s.slug);

  const referrers: Array<[string, Array<{ slug: string; relatedServiceSlugs: string[] }>]> = [
    ["countries", countriesData],
    ["services", servicesData],
    ["guides", guidesData],
  ];

  it.each(referrers)("every related service slug in %s exists", (_name, records) => {
    for (const record of records) {
      for (const slug of record.relatedServiceSlugs) {
        expect(serviceSlugs, `'${record.slug}' links to service '${slug}'`).toContain(slug);
      }
    }
  });

  it("gives every country at least one resolvable related service", () => {
    for (const country of countriesData) {
      const resolved = country.relatedServiceSlugs.filter((slug) => serviceSlugs.includes(slug));
      expect(resolved.length, `country '${country.slug}'`).toBeGreaterThan(0);
    }
  });
});

describe("services content safety", () => {
  it.each(servicesData.map((s) => s.slug))("service '%s' makes no approval claims", (slug) => {
    const content = JSON.stringify(servicesData.find((s) => s.slug === slug)).toLowerCase();
    for (const phrase of FORBIDDEN_MARKETING_PHRASES) {
      expect(content).not.toContain(phrase);
    }
  });
});
