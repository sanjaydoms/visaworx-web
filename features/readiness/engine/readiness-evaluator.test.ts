import { describe, expect, it } from "vitest";
import { evaluateReadiness } from "./readiness-evaluator";
import type { ReadinessAnswers } from "../../../common/types/readiness";

const baseAnswers: ReadinessAnswers = {
  destinationSlug: "united-states",
  visaPurpose: "Tourist",
  validPassport: "yes",
  purposeDefined: "yes",
  homeCommitment: "yes",
  internationalTravel: "yes",
  priorRefusal: "no",
  fundingSource: "self",
  hasIdentityDocs: true,
  hasPurposeDocs: true,
  hasFinancialEvidence: true,
  hasTravelItinerary: true,
  hasEmploymentOrSponsorshipDocs: true,
  hasPriorRefusalDocs: false,
};

describe("readiness banding", () => {
  it("classifies a complete profile as Good Foundation with multiple strengths", () => {
    const result = evaluateReadiness(baseAnswers, "United States");
    expect(result.band).toBe("Good Foundation");
    expect(result.strengths.length).toBeGreaterThanOrEqual(3);
  });

  it("classifies a missing passport as Early Preparation", () => {
    const result = evaluateReadiness({ ...baseAnswers, validPassport: "no" }, "United States");
    expect(result.band).toBe("Early Preparation");
  });

  it("escalates a prior refusal to Needs Expert Review and names it", () => {
    const result = evaluateReadiness({ ...baseAnswers, priorRefusal: "yes" }, "United States");
    expect(result.band).toBe("Needs Expert Review");
    expect(result.attentionAreas.some((a) => a.toLowerCase().includes("prior visa refusal"))).toBe(
      true
    );
  });

  it("classifies missing core preparation items as Developing Readiness", () => {
    const result = evaluateReadiness(
      {
        ...baseAnswers,
        hasFinancialEvidence: false,
        hasTravelItinerary: false,
        hasPurposeDocs: false,
      },
      "United States"
    );
    expect(result.band).toBe("Developing Readiness");
  });
});

describe("readiness output safety", () => {
  const scenarios: Array<[string, ReadinessAnswers]> = [
    ["complete profile", baseAnswers],
    ["missing passport", { ...baseAnswers, validPassport: "no" }],
    ["prior refusal", { ...baseAnswers, priorRefusal: "yes" }],
  ];

  it.each(scenarios)("emits no probability or guarantee language for %s", (_label, answers) => {
    const output = JSON.stringify(evaluateReadiness(answers, "United States"));
    expect(output).not.toContain("%");
    expect(output).not.toContain("approval probability");
    expect(output).not.toContain("success rate");
    expect(output).not.toContain("guaranteed");
  });
});
