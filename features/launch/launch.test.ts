import { beforeEach, describe, expect, it, vi } from "vitest";
import { countriesData } from "../../common/content/countries";
import { servicesData } from "../../common/content/services";
import { guidesData } from "../../common/content/guides";
import { faqsData } from "../../common/content/faqs";
import { glossaryData } from "../../common/content/glossary";
import { evaluateReadiness } from "../../common/config/readiness-rules";
import { processAssistantQuery } from "../../common/ai/adapters/provider";
import { FORBIDDEN_MARKETING_PHRASES } from "../../common/content/forbidden-phrases";

// Launch journeys must pass against approved content only, with no live model.
beforeEach(() => {
  vi.stubEnv("AI_API_KEY", "");
  return () => vi.unstubAllEnvs();
});

describe("launch journey: country -> readiness -> result", () => {
  it("evaluates a well-prepared applicant to Good Foundation", () => {
    const country = countriesData[0];
    expect(country).toBeDefined();

    const evaluation = evaluateReadiness(
      {
        destinationSlug: country.slug,
        visaPurpose: "Tourist",
        validPassport: "yes",
        purposeDefined: "yes",
        homeCommitment: "yes",
        fundingSource: "self",
        hasIdentityDocs: true,
        hasPurposeDocs: true,
        hasFinancialEvidence: true,
        hasTravelItinerary: true,
        hasEmploymentOrSponsorshipDocs: true,
        hasPriorRefusalDocs: false,
      },
      country.name
    );

    expect(evaluation.band).toBe("Good Foundation");
  });
});

describe("launch journey: service -> consultation", () => {
  it("exposes the tourist visa service as an entry point", () => {
    expect(servicesData.find((s) => s.slug === "tourist-visa")).toBeDefined();
  });
});

describe("launch journey: assistant -> escalation -> consultation", () => {
  it("has guides available as assistant entry points", () => {
    expect(guidesData.length).toBeGreaterThan(0);
  });

  it("escalates a refusal question to a human consultation", async () => {
    const result = await processAssistantQuery({
      message: "I got a 214(b) visa refusal last month",
    });
    expect(result.escalation?.required).toBe(true);
    expect(result.nextSteps.some((ns) => ns.type === "consultation")).toBe(true);
  });

  it("cites approved sources for a supported question", async () => {
    const result = await processAssistantQuery({
      message: "How to check official visa rules?",
    });
    expect(result.sources.length).toBeGreaterThan(0);
  });

  it("admits uncertainty and offers an expert for an unsupported question", async () => {
    const result = await processAssistantQuery({
      message: "What are the rules for visa unmapped topic xyz999?",
    });
    expect(result.answer).toContain("do not have enough approved information");
    expect(result.nextSteps.some((ns) => ns.type === "consultation")).toBe(true);
  });
});

describe("launch content safety", () => {
  const models: Array<[string, unknown]> = [
    ["countries", countriesData],
    ["services", servicesData],
    ["guides", guidesData],
    ["faqs", faqsData],
    ["glossary", glossaryData],
  ];

  it.each(models)("%s content makes no approval claims", (_name, data) => {
    const content = JSON.stringify(data).toLowerCase();
    for (const phrase of FORBIDDEN_MARKETING_PHRASES) {
      expect(content).not.toContain(phrase);
    }
  });
});
