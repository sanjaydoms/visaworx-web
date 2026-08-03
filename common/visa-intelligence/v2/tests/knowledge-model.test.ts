import { describe, it, expect } from "vitest";

import { countryCode, isoDate, available, unavailable } from "../types/core";
import {
  resolveVerified,
  isExpired,
  REVIEW_WINDOW_DAYS,
  type Verified,
} from "../verification/types";
import {
  countryRegistry,
  resolveCountry,
  findCountryBySlug,
  listUnverifiedCountries,
  promoteToVerified,
  officialSources,
} from "../countries/registry";
import { resolveCategory, findCategoryById, visaCategoryRegistry } from "../visa-categories/registry";
import { photoSpecificationRegistry, photoKeyToString } from "../photo-specifications/types";
import { biometricRegistry } from "../biometrics/types";
import { createVersioned, addRevision, revisionAt } from "../versioning/history";
import { deriveMinorStatus, isMinorBand } from "../types/applicant";
import { countMinors, groupSize } from "../family/types";
import { groupByOwnership, type DocumentRequirement } from "../documents/types";

const NOW = new Date("2026-08-01T00:00:00Z");

function fact<T>(value: T, over: Partial<Verified<T>> = {}): Verified<T> {
  return {
    value,
    sources: [{ sourceId: "src-test" }],
    lastVerified: isoDate("2026-07-01"),
    status: "verified",
    ...over,
  };
}

describe("verification gate", () => {
  it("returns a verified fact that is in date and sourced", () => {
    const r = resolveVerified(fact("ok"), NOW);
    expect(r.available).toBe(true);
  });

  it("reports an expired rule as expired rather than serving it", () => {
    const stale = fact("old", { lastVerified: isoDate("2020-01-01") });
    const r = resolveVerified(stale, NOW);
    expect(r.available).toBe(false);
    if (!r.available) expect(r.reason).toBe("expired");
  });

  it("treats a fact as expired exactly past the review window", () => {
    const inside = fact("x", { lastVerified: isoDate("2026-07-01") });
    expect(isExpired(inside, NOW)).toBe(false);

    const past = new Date(NOW.getTime() + (REVIEW_WINDOW_DAYS + 1) * 86_400_000);
    expect(isExpired(inside, past)).toBe(true);
  });

  it("refuses to serve a conflicting source and surfaces the conflict", () => {
    const conflicted = fact("x", {
      status: "conflicting",
      conflictNote: "Embassy and VFS pages state different photo sizes.",
    });
    const r = resolveVerified(conflicted, NOW);
    expect(r.available).toBe(false);
    if (!r.available) {
      expect(r.reason).toBe("conflicting");
      expect(r.guidance).toContain("different photo sizes");
    }
  });

  it("refuses to serve a fact that carries no source, whatever its status", () => {
    const unsourced = fact("x", { sources: [] });
    const r = resolveVerified(unsourced, NOW);
    expect(r.available).toBe(false);
  });

  it("returns a not-modelled gap for a missing fact", () => {
    const r = resolveVerified(undefined, NOW);
    expect(r.available).toBe(false);
    if (!r.available) expect(r.reason).toBe("not-modelled");
  });
});

describe("country resolution", () => {
  it("recognises 50 destinations", () => {
    expect(countryRegistry).toHaveLength(50);
    expect(findCountryBySlug("united-states")?.value.code).toBe(countryCode("US"));
  });

  it("resolves EVERY destination to a real code, with none falling back to ??", () => {
    // Regression guard. The original hand-written slug map mismapped Schengen
    // ("schengen-area" vs the real slug "schengen"), leaving it with a "??"
    // code. A length-only assertion passed while that entry was broken.
    const unresolved = countryRegistry.filter((c) => String(c.value.code) === "??");
    expect(unresolved.map((c) => c.value.name)).toEqual([]);
  });

  it("links all ten destinations that have published content", () => {
    const linked = countryRegistry.filter((c) => c.value.legacySlug);
    expect(linked).toHaveLength(10);
    expect(findCountryBySlug("schengen")?.value.code).toBe(countryCode("SCHENGEN"));
  });

  it("attaches no source to a destination with no published content", () => {
    // The honest state: recognised, but nothing held about it.
    const india = countryRegistry.find((c) => c.value.name === "India")!;
    expect(india.value.legacySlug).toBeUndefined();
    expect(india.sources).toEqual([]);
    expect(resolveVerified(india, NOW).available).toBe(false);
  });

  it("carries an official source across for each destination that has one", () => {
    expect(officialSources.length).toBe(10);
    for (const s of officialSources) expect(s.url).toMatch(/^https?:\/\//);
  });

  it("returns an explicit gap for a destination that is not modelled", () => {
    const r = resolveCountry(countryCode("ZZ"), NOW);
    expect(r.available).toBe(false);
    if (!r.available) {
      expect(r.reason).toBe("not-modelled");
      expect(r.guidance).toMatch(/official authority|Visaworx expert/i);
    }
  });

  it("does not serve migrated content as verified before an editorial pass", () => {
    // Migrated V1 content is authored, not source-checked. Until a human
    // verifies it, resolution must produce a gap rather than assert accuracy.
    expect(listUnverifiedCountries()).toHaveLength(50);
    const r = resolveCountry(countryCode("US"), NOW);
    expect(r.available).toBe(false);
  });

  it("allows promotion to verified once a human has checked the source", () => {
    const us = findCountryBySlug("united-states")!;
    const promoted = promoteToVerified(us, "2026-08-01");
    expect(promoted.status).toBe("verified");
    expect(resolveVerified(promoted, NOW).available).toBe(true);
  });

  it("refuses to promote a fact with no source attached", () => {
    const orphan = fact("x", { sources: [] });
    expect(() => promoteToVerified(orphan, "2026-08-01")).toThrow(/official source/i);
  });
});

describe("visa category resolution", () => {
  it("resolves a modelled purpose to a category to explore", () => {
    const r = resolveCategory("study");
    expect(r.available).toBe(true);
    if (r.available) expect(r.data.id).toBe("cat-student");
  });

  it("returns a gap for a purpose with no modelled category", () => {
    const r = resolveCategory("transit");
    expect(r.available).toBe(false);
  });

  it("describes categories to explore, never a specific legal visa class", () => {
    // Naming a class (F-1, Subclass 500) as applicable would be an eligibility
    // determination, which is reserved for human experts.
    for (const c of visaCategoryRegistry) {
      expect(c.label).not.toMatch(/\b[A-Z]-?\d\b|subclass\s*\d+/i);
      expect(c.description).not.toMatch(/subclass\s*\d+/i);
    }
  });

  it("links back to V1 service pages instead of duplicating their content", () => {
    expect(findCategoryById("cat-tourist")?.legacyServiceSlug).toBe("tourist-visa");
  });
});

describe("no unsupported precision", () => {
  it("ships no photo specifications until they are source-verified", () => {
    expect(photoSpecificationRegistry).toHaveLength(0);
  });

  it("ships no biometric requirements until they are source-verified", () => {
    expect(biometricRegistry).toHaveLength(0);
  });

  it("builds a stable lookup key across every dimension that can change a spec", () => {
    const key = photoKeyToString({
      destination: countryCode("GB"),
      visaCategoryId: "cat-tourist",
      applicationLocationCountry: countryCode("AE"),
      submissionChannel: "visa-application-centre",
      subject: "infant",
      medium: "digital-upload",
    });
    expect(key).toBe("GB|cat-tourist|AE|visa-application-centre|infant|digital-upload");
  });
});

describe("applicant and family model", () => {
  it("classifies minors by age band", () => {
    expect(isMinorBand("infant")).toBe(true);
    expect(isMinorBand("adult")).toBe(false);
  });

  it("treats a minor with no stated accompaniment as unaccompanied", () => {
    // The safer default: unaccompanied minors need the most documentation, so
    // assuming it avoids under-preparing an applicant.
    expect(deriveMinorStatus("child")).toEqual({
      isMinor: true,
      accompaniedBy: "unaccompanied",
    });
  });

  it("never marks an adult as a minor even if accompaniment is supplied", () => {
    expect(deriveMinorStatus("adult", "one-parent")).toEqual({ isMinor: false });
  });

  it("counts minors and group size across a family", () => {
    const adult = { nationality: countryCode("IN"), countryOfResidence: countryCode("AE"), travellerType: "employed" as const, ageBand: "adult" as const };
    const child = { ...adult, travellerType: "minor" as const, ageBand: "child" as const };
    const composition = {
      primaryApplicant: adult,
      members: [
        { applicant: child, relationshipToPrimary: "child" as const },
        { applicant: child, relationshipToPrimary: "child" as const },
      ],
    };
    expect(countMinors(composition)).toBe(2);
    expect(groupSize(composition)).toBe(3);
  });
});

describe("document grouping", () => {
  it("separates shared, individual, minor and sponsor documents", () => {
    const reqs: DocumentRequirement[] = [
      { id: "a", label: "Itinerary", category: "travel-arrangements", ownership: "shared", detail: "", mandatory: true },
      { id: "b", label: "Passport", category: "identity", ownership: "individual", detail: "", mandatory: true },
      { id: "c", label: "Consent letter", category: "consent-and-authorisation", ownership: "minor", detail: "", mandatory: true },
      { id: "d", label: "Sponsor letter", category: "financial", ownership: "sponsor", detail: "", mandatory: true },
    ];
    const grouped = groupByOwnership(reqs);
    expect(grouped.shared).toHaveLength(1);
    expect(grouped.individual).toHaveLength(1);
    expect(grouped.minor).toHaveLength(1);
    expect(grouped.sponsor).toHaveLength(1);
    expect(grouped["spouse-or-dependent"]).toHaveLength(0);
  });
});

describe("version history", () => {
  it("records revisions and keeps the previous value retrievable", () => {
    const v1 = createVersioned("photo-gb-tourist", {
      value: "35x45mm",
      sources: [{ sourceId: "src-gb" }],
      recordedOn: isoDate("2026-01-01"),
      recordedBy: "migration",
      changeNote: "Initial import.",
    });
    expect(v1.current.revision).toBe(1);

    const v2 = addRevision(v1, {
      value: "35x45mm, plain cream background",
      sources: [{ sourceId: "src-gb" }],
      recordedOn: isoDate("2026-06-01"),
      recordedBy: "editor:sd",
      changeNote: "Background wording clarified by GOV.UK.",
    });

    expect(v2.current.revision).toBe(2);
    expect(v2.history).toHaveLength(1);
    expect(revisionAt(v2, 1)?.value).toBe("35x45mm");
    expect(revisionAt(v2, 2)?.changeNote).toMatch(/GOV.UK/);
  });
});

describe("KnowledgeResult contract", () => {
  it("forces callers to handle the unavailable branch", () => {
    const ok = available(1);
    const gap = unavailable<number>("not-modelled", "no data");

    expect(ok.available && ok.data).toBe(1);
    expect(gap.available).toBe(false);
    if (!gap.available) expect(gap.guidance).toBe("no data");
  });
});

describe("site-wide destination coverage", () => {
  it("lists all 50 destinations on the site", async () => {
    const { countriesData, isPublished } = await import("../../../content/countries");
    expect(countriesData).toHaveLength(50);
    expect(countriesData.filter(isPublished)).toHaveLength(10);
  });

  it("gives every destination a unique, url-safe slug", async () => {
    const { countriesData } = await import("../../../content/countries");
    const slugs = countriesData.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(50);
    for (const s of slugs) expect(s).toMatch(/^[a-z0-9-]+$/);
  });

  it("publishes no requirements, checklists or FAQs for unverified destinations", async () => {
    // The load-bearing guarantee: a destination without verified sources must
    // never present visa guidance, because inventing it gets applications
    // rejected.
    const { countriesData, isPublished } = await import("../../../content/countries");
    for (const c of countriesData.filter((x) => !isPublished(x))) {
      expect(c.preparationChecklist).toEqual([]);
      expect(c.applicationStages).toEqual([]);
      expect(c.commonMistakes).toEqual([]);
      expect(c.faqs).toEqual([]);
      expect(c.overview).toBe("");
    }
  });

  it("keeps the site list and the V2 registry in step", async () => {
    const { countriesData } = await import("../../../content/countries");
    expect(countriesData).toHaveLength(countryRegistry.length);
  });
});
