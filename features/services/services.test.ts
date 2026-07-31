import assert from "node:assert";
import { servicesData } from "../../common/content/services";
import { countriesData } from "../../common/content/countries";

console.log("Running Phase 4 Services Module Test Suite...");

// Test 1: Verify all 9 initial service slugs exist
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

{
  assert.strictEqual(servicesData.length, 9, "Should contain exactly 9 service records");

  for (const slug of expectedSlugs) {
    const found = servicesData.find((s) => s.slug === slug);
    assert.ok(found, `Service record for slug '${slug}' must exist`);
    assert.ok(found.title.length > 0, `Service '${slug}' must have non-empty title`);
    assert.ok(found.shortDescription.length > 0, `Service '${slug}' must have shortDescription`);
    assert.ok(found.idealFor.length > 0, `Service '${slug}' must list idealFor items`);
    assert.ok(found.outcomes.length > 0, `Service '${slug}' must list outcomes`);
    assert.ok(found.included.length > 0, `Service '${slug}' must list included items`);
    assert.ok(found.excluded.length > 0, `Service '${slug}' must list excluded items`);
    assert.ok(found.process.length > 0, `Service '${slug}' must list process steps`);
    assert.ok(found.faqs.length > 0, `Service '${slug}' must list FAQs`);
  }
  console.log("✓ Test 1 Passed: 9 initial service records validated");
}

// Test 2: Verify Missing Service Fallback
{
  const missing = servicesData.find((s) => s.slug === "non-existent-service");
  assert.strictEqual(missing, undefined, "Non-existent service slug should return undefined for 404 fallback");
  console.log("✓ Test 2 Passed: Missing service fallback check");
}

// Test 3: Verify Related Country Slugs validity
{
  for (const service of servicesData) {
    for (const countrySlug of service.relatedCountrySlugs) {
      const countryFound = countriesData.find((c) => c.slug === countrySlug);
      assert.ok(
        countryFound,
        `Related country slug '${countrySlug}' in service '${service.slug}' must exist in countriesData`
      );
    }
  }
  console.log("✓ Test 3 Passed: Related country links validity check");
}

// Test 4: STRICT SAFETY CHECK — No approval guarantees or false claims in service copy
{
  const forbiddenPhrases = [
    "guaranteed approval",
    "100% success",
    "embassy-approved",
    "fastest visa",
    "no rejection",
    "risk-free",
  ];

  for (const service of servicesData) {
    const jsonStr = JSON.stringify(service).toLowerCase();
    for (const phrase of forbiddenPhrases) {
      assert.ok(
        !jsonStr.includes(phrase),
        `Service '${service.slug}' content must NEVER contain forbidden phrase '${phrase}'`
      );
    }
  }
  console.log("✓ Test 4 Passed: Safety Check — Zero approval guarantees or false claims in content");
}

console.log("ALL PHASE 4 SERVICES MODULE TESTS PASSED SUCCESSFULLY!");
