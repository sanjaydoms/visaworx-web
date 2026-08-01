import { describe, it, expect } from "vitest";

import { countryCode, isoDate } from "../types/core";
import { resolvePhotoSpecification, hasAnyPhotoDataFor } from "../photo-specifications/resolver";
import type { PhotoSpecificationKey, VerifiedPhotoSpecification } from "../photo-specifications/types";
import { deriveScenario, needsConsentDocumentation } from "../scenarios/derive";
import { buildPreparationScore, isFullyTraceable, type ScoreContribution } from "../scoring/preparation-score";
import { buildClaritySnapshot } from "../clarity-snapshot/build";
import { decide, detectExactTopic, gapToReply, toCoachedAnswer } from "../ai/coach";
import { parseSearchIntent, needsMoreContext } from "../search/intent";
import { enrichConsultationPayload, enrichmentCollidesWith } from "../crm/handoff";
import { defaultTenant, visibleTo } from "../tenancy/config";
import { unavailable, available } from "../types/core";

const NOW = new Date("2026-08-01T00:00:00Z");

const adult = {
  nationality: countryCode("IN"),
  countryOfResidence: countryCode("AE"),
  travellerType: "employed" as const,
  ageBand: "adult" as const,
};
const child = { ...adult, travellerType: "minor" as const, ageBand: "child" as const };

const baseKey: PhotoSpecificationKey = {
  destination: countryCode("GB"),
  visaCategoryId: "cat-tourist",
  applicationLocationCountry: countryCode("AE"),
  submissionChannel: "visa-application-centre",
  subject: "adult",
  medium: "physical-print",
};

function spec(over: Partial<PhotoSpecificationKey>, status: "verified" | "expired" = "verified"): VerifiedPhotoSpecification {
  return {
    value: {
      key: { ...baseKey, ...over },
      dimensions: { widthMm: 35, heightMm: 45 },
      background: "plain cream",
      faceRequirements: "full face, eyes open",
      glasses: "no tinted lenses",
      headwear: "only for religious or medical reasons",
      exceptions: [],
    },
    sources: [{ sourceId: "src-gb" }],
    lastVerified: isoDate(status === "verified" ? "2026-07-01" : "2020-01-01"),
    status: "verified",
  };
}

describe("Phase 3 - photo specification resolver", () => {
  it("returns an honest gap when nothing is modelled", () => {
    const r = resolvePhotoSpecification(baseKey, [], NOW);
    expect(r.available).toBe(false);
    if (!r.available) {
      expect(r.reason).toBe("not-modelled");
      expect(r.missingContext).toContain("destination");
    }
  });

  it("matches an exact specification", () => {
    const r = resolvePhotoSpecification(baseKey, [spec({})], NOW);
    expect(r.available).toBe(true);
    if (r.available) expect(r.data.precision).toBe("exact");
  });

  it("falls back to country-wide guidance and reports the lower precision", () => {
    const countryWide = spec({ applicationLocationCountry: undefined, submissionChannel: undefined });
    const r = resolvePhotoSpecification(baseKey, [countryWide], NOW);
    expect(r.available).toBe(true);
    if (r.available) expect(r.data.precision).not.toBe("exact");
  });

  it("never relaxes subject type - an infant does not fall back to adult rules", () => {
    const adultSpec = spec({ subject: "adult" });
    const r = resolvePhotoSpecification({ ...baseKey, subject: "infant" }, [adultSpec], NOW);
    expect(r.available).toBe(false);
  });

  it("never relaxes medium - a digital upload does not fall back to print rules", () => {
    const printSpec = spec({ medium: "physical-print" });
    const r = resolvePhotoSpecification({ ...baseKey, medium: "digital-upload" }, [printSpec], NOW);
    expect(r.available).toBe(false);
  });

  it("reports conflicting specifications instead of picking one", () => {
    const a = spec({});
    const b = { ...spec({}), value: { ...spec({}).value, background: "white" } };
    const r = resolvePhotoSpecification(baseKey, [a, b], NOW);
    expect(r.available).toBe(false);
    if (!r.available) expect(r.reason).toBe("conflicting");
  });

  it("does not serve an expired specification", () => {
    const stale = { ...spec({}), lastVerified: isoDate("2020-01-01") };
    const r = resolvePhotoSpecification(baseKey, [stale], NOW);
    expect(r.available).toBe(false);
    if (!r.available) expect(r.reason).toBe("expired");
  });

  it("distinguishes an uncovered country from an uncovered case", () => {
    expect(hasAnyPhotoDataFor(countryCode("GB"), [spec({})])).toBe(true);
    expect(hasAnyPhotoDataFor(countryCode("JP"), [spec({})])).toBe(false);
  });
});

describe("Phase 4 - family and minor scenarios", () => {
  const solo = { primaryApplicant: adult, members: [] };

  it("identifies a solo adult", () => {
    expect(deriveScenario({ composition: solo, funding: { type: "self-funded" }, purpose: "tourism" })).toBe("solo-adult");
  });

  it("identifies an unaccompanied minor", () => {
    const composition = { primaryApplicant: child, members: [] };
    expect(deriveScenario({ composition, funding: { type: "sponsored", sponsor: "parent" }, purpose: "study" })).toBe("unaccompanied-minor");
  });

  it("prefers the unaccompanied-minor scenario over the sponsorship scenario", () => {
    // The consent and guardianship documents are the part most easily missed,
    // so the more constrained scenario must win.
    const composition = { primaryApplicant: child, members: [] };
    const s = deriveScenario({ composition, funding: { type: "sponsored", sponsor: "parent" }, purpose: "tourism" });
    expect(s).toBe("unaccompanied-minor");
  });

  it("identifies a minor travelling with one parent", () => {
    const composition = { primaryApplicant: adult, members: [{ applicant: child, relationshipToPrimary: "child" as const }] };
    expect(deriveScenario({ composition, funding: { type: "self-funded" }, purpose: "tourism" })).toBe("minor-with-one-parent");
  });

  it("identifies a minor travelling with both parents", () => {
    const composition = {
      primaryApplicant: adult,
      members: [
        { applicant: adult, relationshipToPrimary: "spouse" as const },
        { applicant: child, relationshipToPrimary: "child" as const },
      ],
    };
    expect(deriveScenario({ composition, funding: { type: "self-funded" }, purpose: "tourism" })).toBe("minor-with-both-parents");
  });

  it("identifies a student funded by parents", () => {
    const composition = { primaryApplicant: adult, members: [] };
    expect(deriveScenario({ composition, funding: { type: "sponsored", sponsor: "parent" }, purpose: "study" })).toBe("student-funded-by-parents");
  });

  it("flags the scenarios where consent documentation matters", () => {
    expect(needsConsentDocumentation("minor-with-one-parent")).toBe(true);
    expect(needsConsentDocumentation("unaccompanied-minor")).toBe(true);
    expect(needsConsentDocumentation("solo-adult")).toBe(false);
  });
});

describe("Phase 5 - preparation scoring", () => {
  const contributions: ScoreContribution[] = [
    { dimension: "pathway-clarity", question: "Do you know which visa category you need?", answer: "Yes", points: 2, maxPoints: 2 },
    { dimension: "traveller-profile-readiness", question: "Is your passport valid for six months?", answer: "No", points: 0, maxPoints: 2, improvement: "Renew your passport before applying." },
    { dimension: "document-preparation", question: "Have you gathered identity documents?", answer: "Partly", points: 1, maxPoints: 2 },
    { dimension: "supporting-evidence", question: "Do you have financial evidence?", answer: "No", points: 0, maxPoints: 2, improvement: "Request formal bank statements." },
  ];

  it("scores each of the four visible dimensions", () => {
    const score = buildPreparationScore(contributions);
    expect(score.dimensions).toHaveLength(4);
    expect(score.totalPoints).toBe(3);
    expect(score.maxPoints).toBe(8);
  });

  it("maps every point to a visible question and answer", () => {
    expect(isFullyTraceable(buildPreparationScore(contributions))).toBe(true);
  });

  it("never produces an approval probability", () => {
    const score = buildPreparationScore(contributions);
    const serialised = JSON.stringify(score).toLowerCase();
    expect(serialised).not.toMatch(/probability|likelihood|chance|odds|approval rate/);
  });

  it("escalates to expert review when gaps are broad rather than merely low", () => {
    const broad: ScoreContribution[] = contributions.map((c) => ({ ...c, points: 0 }));
    expect(buildPreparationScore(broad).band).toBe("Needs expert review");
  });

  it("orders priority gaps worst first", () => {
    const score = buildPreparationScore(contributions);
    const pcts = score.priorityGaps.map((g) => g.percentage);
    expect([...pcts].sort((a, b) => a - b)).toEqual(pcts);
  });
});

describe("Phase 5 - clarity snapshot", () => {
  const score = buildPreparationScore([
    { dimension: "document-preparation", question: "Documents ready?", answer: "No", points: 0, maxPoints: 2, improvement: "Gather identity documents." },
  ]);

  const snapshot = buildClaritySnapshot({
    situation: { destinationName: "United Kingdom", purposeLabel: "Tourism", scenario: "minor-with-one-parent", travellerCount: 2, minorCount: 1 },
    visaPath: available({ id: "cat-tourist", label: "Tourism", purpose: "tourism", description: "" }),
    documentGroups: unavailable("not-modelled", "No verified document list."),
    familyRequirements: unavailable("not-modelled", "No verified family requirements."),
    photoGuidance: unavailable("not-modelled", "No verified photo requirements."),
    preparation: score,
    consultationHref: "/visaworx/consultation?source=clarity",
  });

  it("marks the score as secondary", () => {
    expect(snapshot.scoreIsSecondary).toBe(true);
  });

  it("turns knowledge gaps into visible attention items rather than omitting them", () => {
    // An omitted requirement reads as "not required", which is the more
    // dangerous failure.
    expect(snapshot.needsAttention.some((a) => /document requirements/i.test(a))).toBe(true);
    expect(snapshot.needsAttention.some((a) => /photo requirements/i.test(a))).toBe(true);
  });

  it("raises consent exceptions for a minor with one parent", () => {
    expect(snapshot.exceptions.join(" ")).toMatch(/consent|authorisation/i);
  });

  it("caps next actions at three", () => {
    expect(snapshot.nextActions.length).toBeLessThanOrEqual(3);
  });

  it("always offers a human expert handoff", () => {
    expect(snapshot.expertHandoff.consultationHref).toContain("/visaworx/consultation");
  });
});

describe("Phase 6 - AI coach", () => {
  it("detects questions that have an exact answer", () => {
    expect(detectExactTopic("what size photo do I need for the UK?")).toBe("photo-specification");
    expect(detectExactTopic("do infants need biometrics?")).toBe("biometrics");
    expect(detectExactTopic("tell me about visa interviews")).toBeNull();
  });

  it("asks for context instead of answering an exact question generically", () => {
    const d = decide({ question: "what photo size do I need?", knownContext: {} });
    expect(d.kind).toBe("clarify");
    if (d.kind === "clarify") {
      expect(d.missingContext.length).toBeGreaterThan(0);
      expect(d.question).toMatch(/could you tell me/i);
    }
  });

  it("answers once the required context is present", () => {
    const d = decide({
      question: "what photo size do I need?",
      knownContext: { destination: "GB", visa: "cat-tourist", who: "adult", how: "vac" },
    });
    expect(d.kind).toBe("answer");
  });

  it("attaches provenance and a currency note to every answer", () => {
    const a = toCoachedAnswer("35x45mm", { sources: [{ sourceId: "src-gb" }], lastVerified: isoDate("2026-07-01") }, true);
    expect(a.sources).toHaveLength(1);
    expect(a.currencyNote).toMatch(/last verified 2026-07-01/i);
    expect(a.verifyWithAuthority).toBe(true);
  });

  it("turns a gap into an honest reply listing what it would need", () => {
    const reply = gapToReply({ available: false, reason: "not-modelled", guidance: "Not held.", missingContext: ["destination"] });
    expect(reply).toMatch(/Not held\./);
    expect(reply).toMatch(/destination/);
  });
});

describe("Phase 7 - search intent", () => {
  it("resolves country and category from a plain query", () => {
    const i = parseSearchIntent("Canada tourist visa");
    expect(i.countryName).toBe("Canada");
    expect(i.visaCategoryId).toBe("cat-tourist");
  });

  it("resolves a photo topic", () => {
    expect(parseSearchIntent("UK photo size").topics).toContain("photo");
  });

  it("resolves a family scenario", () => {
    const i = parseSearchIntent("child travelling with one parent");
    expect(i.scenario).toBe("minor-with-one-parent");
    expect(i.topics).toContain("family-or-minor");
  });

  it("resolves sponsorship questions", () => {
    expect(parseSearchIntent("can my father sponsor me?").topics).toContain("sponsorship");
  });

  it("resolves applicant type for infant queries", () => {
    const i = parseSearchIntent("do infants need biometrics?");
    expect(i.applicantType).toBe("infant");
    expect(i.topics).toContain("biometrics");
  });

  it("resolves refusal and invitation topics", () => {
    expect(parseSearchIntent("previous refusal reapplication").topics).toContain("previous-refusal");
    expect(parseSearchIntent("Schengen business invitation").topics).toContain("invitation");
  });

  it("flags an exact query that lacks the context to answer it", () => {
    expect(needsMoreContext(parseSearchIntent("visa photo background"))).toBe(true);
    expect(needsMoreContext(parseSearchIntent("Japan tourist visa photo background"))).toBe(false);
  });
});

describe("Phase 8 - CRM handoff", () => {
  const base = {
    external_reference: "VISAWORX-req_1",
    created_date: "2026-08-01",
    status: "New Consultation Request" as const,
    destination_country: "United Kingdom",
    service_category: "Tourism",
    travel_timeframe: "October 2026",
    consultation_summary: "Summary",
    previous_refusal: "no",
    readiness_status: "N/A",
    lead_source: "clarity",
    guide_reference: "N/A",
    contact_email: "a@example.com",
    contact_phone: "+100",
  };

  const enriched = enrichConsultationPayload(base, {
    scenario: "minor-with-one-parent",
    travellerCount: 2,
    minorCount: 1,
    funding: { type: "sponsored", sponsor: "parent" },
    aiSummaryConsentGiven: false,
    aiTopicSummary: "Discussed photo requirements",
    sourcePage: "/visaworx/readiness/result",
  });

  it("preserves every existing CRM field name and value", () => {
    for (const [k, v] of Object.entries(base)) {
      expect(enriched[k as keyof typeof base]).toBe(v);
    }
  });

  it("adds no field that collides with an existing mapping", () => {
    expect(enrichmentCollidesWith(base)).toEqual([]);
  });

  it("adds the V2 scenario context", () => {
    expect(enriched.traveller_scenario).toBe("Minor with one parent");
    expect(enriched.funding_method).toBe("Sponsored (parent)");
  });

  it("withholds the AI summary unless consent was given", () => {
    expect(enriched.ai_topic_summary).toBe("");

    const consented = enrichConsultationPayload(base, {
      scenario: "solo-adult",
      travellerCount: 1,
      minorCount: 0,
      funding: { type: "self-funded" },
      aiSummaryConsentGiven: true,
      aiTopicSummary: "Discussed photo requirements",
      sourcePage: "/x",
    });
    expect(consented.ai_topic_summary).toBe("Discussed photo requirements");
  });
});

describe("Phase 9 - tenancy", () => {
  it("defaults to a single tenant matching current production", () => {
    expect(defaultTenant.id).toBe("klar-visaworx");
    expect(defaultTenant.logoPath).toBe("/brand/visaworx-logo.png");
  });

  it("shows all shared knowledge when a tenant sets no allow list", () => {
    const items = [{ id: "a" }, { id: "b" }];
    expect(visibleTo(defaultTenant, items, (i) => i.id, [])).toHaveLength(2);
  });

  it("filters shared knowledge rather than duplicating it per tenant", () => {
    const items = [{ id: "a" }, { id: "b" }];
    const visible = visibleTo(defaultTenant, items, (i) => i.id, ["a"]);
    expect(visible).toHaveLength(1);
    // Same object identity - a filtered view, never a copy that could drift.
    expect(visible[0]).toBe(items[0]);
  });
});

describe("Phase 7 - search across the expanded destination list", () => {
  it("resolves destinations that have no published content yet", () => {
    // Recognition is separate from having guidance: the engine must route a
    // query about India even though no Visaworx content exists for it.
    expect(parseSearchIntent("India student visa").countryName).toBe("India");
    expect(parseSearchIntent("Brazil tourist visa").countryName).toBe("Brazil");
  });

  it("resolves the Schengen Area, which is not a country", () => {
    const i = parseSearchIntent("Schengen business invitation");
    expect(i.countryName).toBe("Schengen Area");
    expect(i.topics).toContain("invitation");
  });

  it("prefers the longest matching name so partial names do not shadow", () => {
    expect(parseSearchIntent("South Korea work visa").countryName).toBe("South Korea");
    expect(parseSearchIntent("South Africa tourist visa").countryName).toBe("South Africa");
  });
});
