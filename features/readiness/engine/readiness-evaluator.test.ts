import assert from "node:assert";
import { evaluateReadiness } from "./readiness-evaluator";
import type { ReadinessAnswers } from "../../../common/types/readiness";

console.log("Running Phase 3 Readiness Engine Test Suite...");

// Sample Base Answers
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

// Test 1: Good Foundation Band
{
  const result = evaluateReadiness(baseAnswers, "United States");
  assert.strictEqual(result.band, "Good Foundation", "Should classify complete profile as Good Foundation");
  assert.ok(result.strengths.length >= 3, "Should report multiple strengths");
  console.log("✓ Test 1 Passed: Good Foundation classification");
}

// Test 2: Early Preparation Band (Missing Passport or Unclear Purpose)
{
  const earlyAnswers = { ...baseAnswers, validPassport: "no" as const };
  const result = evaluateReadiness(earlyAnswers, "United States");
  assert.strictEqual(result.band, "Early Preparation", "Should classify missing passport as Early Preparation");
  console.log("✓ Test 2 Passed: Early Preparation classification (Missing Passport)");
}

// Test 3: Prior Refusal Escalation -> Needs Expert Review
{
  const refusalAnswers = { ...baseAnswers, priorRefusal: "yes" as const };
  const result = evaluateReadiness(refusalAnswers, "United States");
  assert.strictEqual(result.band, "Needs Expert Review", "Prior refusal must escalate to Needs Expert Review");
  assert.ok(
    result.attentionAreas.some((a) => a.toLowerCase().includes("prior visa refusal")),
    "Should list prior refusal in attention areas"
  );
  console.log("✓ Test 3 Passed: Prior Refusal escalation to Needs Expert Review");
}

// Test 4: Developing Readiness (Missing core prep items)
{
  const developingAnswers: ReadinessAnswers = {
    ...baseAnswers,
    hasFinancialEvidence: false,
    hasTravelItinerary: false,
    hasPurposeDocs: false,
  };
  const result = evaluateReadiness(developingAnswers, "United States");
  assert.strictEqual(result.band, "Developing Readiness", "Fewer prep items should classify as Developing Readiness");
  console.log("✓ Test 4 Passed: Developing Readiness classification");
}

// Test 5: STRICT SAFETY CHECK — No percentages or approval predictions in outputs
{
  const testAnswersList = [baseAnswers, { ...baseAnswers, validPassport: "no" as const }, { ...baseAnswers, priorRefusal: "yes" as const }];

  for (const answers of testAnswersList) {
    const result = evaluateReadiness(answers, "United States");
    const jsonStr = JSON.stringify(result);

    assert.ok(!jsonStr.includes("%"), "Output must NEVER contain percentage symbols (%)");
    assert.ok(!jsonStr.includes("approval probability"), "Output must NEVER contain 'approval probability'");
    assert.ok(!jsonStr.includes("success rate"), "Output must NEVER contain 'success rate'");
    assert.ok(!jsonStr.includes("guaranteed"), "Output must NEVER contain 'guaranteed'");
  }
  console.log("✓ Test 5 Passed: Safety Check — 0% percentage or prediction text in engine output");
}

console.log("ALL PHASE 3 READINESS ENGINE TESTS PASSED SUCCESSFULLY!");
