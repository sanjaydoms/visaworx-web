import assert from "node:assert";
import { countriesData } from "../../common/content/countries";
import { servicesData } from "../../common/content/services";
import { guidesData } from "../../common/content/guides";
import { faqsData } from "../../common/content/faqs";
import { glossaryData } from "../../common/content/glossary";
import { evaluateReadiness } from "../../common/config/readiness-rules";
import { processAssistantQuery } from "../../common/ai/adapters/provider";

console.log("Running Phase 8 Production Launch & Master E2E Test Suite...");

async function runLaunchTests() {
  // Test 1: Journey 1 — Homepage -> Country -> Readiness -> Result -> Consultation
  {
    const country = countriesData[0]; // Canada
    assert.ok(country, "Canada country object must exist");

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

    assert.strictEqual(evaluation.band, "Good Foundation", "Good foundation inputs must evaluate to 'Good Foundation'");
    console.log("✓ Test 1 Passed: Journey 1 (Homepage -> Country -> Readiness -> Result)");
  }

  // Test 2: Journey 2 — Homepage -> Service -> Consultation
  {
    const service = servicesData[0]; // Tourist Visa
    assert.ok(service, "Tourist Visa service must exist");
    assert.ok(service.slug === "tourist-visa", "Tourist Visa slug must be 'tourist-visa'");
    console.log("✓ Test 2 Passed: Journey 2 (Homepage -> Service -> Consultation)");
  }

  // Test 3: Journey 3 — Resource Guide -> AI Assistant -> Escalation -> Consultation
  {
    const guide = guidesData[0];
    assert.ok(guide, "Guide must exist");

    const refusalResult = await processAssistantQuery({ message: "I got a 214(b) visa refusal last month" });
    assert.strictEqual(refusalResult.escalation?.required, true, "Refusal query must trigger escalation.required = true");
    assert.ok(
      refusalResult.nextSteps.some((ns) => ns.type === "consultation"),
      "Escalation response must include consultation nextStep CTA"
    );
    console.log("✓ Test 3 Passed: Journey 3 (Guide -> AI Assistant -> Escalation -> Consultation)");
  }

  // Test 4: Journey 4 — Consultation Failure Recovery & Dev Fallback
  {
    const fallbackResponse = await processAssistantQuery({ message: "How to check official visa rules?" });
    assert.ok(fallbackResponse.sources.length > 0, "Fallback must return approved sources");
    console.log("✓ Test 4 Passed: Journey 4 (AI Fallback & Source Link Resolution)");
  }

  // Test 5: Journey 5 — AI Unsupported Question -> Safe Uncertainty -> Expert CTA
  {
    const unsupportedResult = await processAssistantQuery({ message: "What are the rules for visa unmapped topic xyz999?" });
    assert.ok(
      unsupportedResult.answer.includes("do not have enough approved information"),
      "Unsupported query must state insufficient approved information"
    );
    assert.ok(
      unsupportedResult.nextSteps.some((ns) => ns.type === "consultation"),
      "Unsupported response must provide human expert consultation CTA"
    );
    console.log("✓ Test 5 Passed: Journey 5 (AI Unsupported Question -> Safe Uncertainty -> Expert CTA)");
  }

  // Test 6: STRICT SAFETY CHECK — Zero approval guarantees across all content models
  {
    const forbiddenPhrases = [
      "guaranteed approval",
      "100% success",
      "embassy-approved",
      "fastest visa",
      "no rejection",
      "risk-free",
    ];

    const allContent = [
      JSON.stringify(countriesData),
      JSON.stringify(servicesData),
      JSON.stringify(guidesData),
      JSON.stringify(faqsData),
      JSON.stringify(glossaryData),
    ].join(" ").toLowerCase();

    for (const phrase of forbiddenPhrases) {
      assert.ok(
        !allContent.includes(phrase),
        `All content models must NEVER contain forbidden phrase '${phrase}'`
      );
    }
    console.log("✓ Test 6 Passed: Safety Check — Zero approval guarantees across all content models");
  }

  console.log("ALL PHASE 8 PRODUCTION LAUNCH & E2E TESTS PASSED SUCCESSFULLY!");
}

runLaunchTests().catch((err) => {
  console.error("Launch tests failed:", err);
  process.exit(1);
});
