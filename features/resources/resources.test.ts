import assert from "node:assert";
import { guidesData } from "../../common/content/guides";
import { faqsData } from "../../common/content/faqs";
import { glossaryData } from "../../common/content/glossary";
import { searchResources } from "../../common/utils/resource-search";

console.log("Running Phase 5 Resources Module Test Suite...");

// Test 1: Validate all 12 initial guide records
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
];

{
  assert.strictEqual(guidesData.length, 12, "Should contain exactly 12 initial guide records");

  for (const slug of expectedGuideSlugs) {
    const guide = guidesData.find((g) => g.slug === slug);
    assert.ok(guide, `Guide record '${slug}' must exist`);
    assert.ok(guide.title.length > 0, `Guide '${slug}' must have a non-empty title`);
    assert.ok(guide.summary.length > 0, `Guide '${slug}' must have a non-empty summary`);
    assert.ok(guide.content.length > 0, `Guide '${slug}' must have content blocks`);
    assert.ok(guide.seo.title.length > 0, `Guide '${slug}' must have SEO title`);
  }
  console.log("✓ Test 1 Passed: 12 initial guide records validated");
}

// Test 2: Missing Guide Fallback Check
{
  const missing = guidesData.find((g) => g.slug === "non-existent-guide");
  assert.strictEqual(missing, undefined, "Missing guide slug should return undefined for 404 fallback");
  console.log("✓ Test 2 Passed: Missing guide fallback check");
}

// Test 3: Multi-Entity Search Engine
{
  const searchResult = searchResources("visa");
  assert.ok(searchResult.totalCount > 0, "Search query 'visa' should return multi-entity results");
  assert.ok(searchResult.guides.length > 0, "Search result should include matching guides");
  assert.ok(searchResult.faqs.length > 0, "Search result should include matching FAQs");

  const emptyResult = searchResources("");
  assert.strictEqual(emptyResult.totalCount, 0, "Empty search query should return 0 results");
  console.log("✓ Test 3 Passed: Multi-entity search engine check");
}

// Test 4: FAQ & Glossary Data Structures
{
  assert.ok(faqsData.length >= 10, "FAQ database should contain at least 10 items");
  assert.ok(glossaryData.length >= 14, "Glossary database should contain at least 14 terms");
  console.log("✓ Test 4 Passed: FAQ & Glossary databases validated");
}

// Test 5: STRICT SAFETY CHECK — No approval guarantees or false promises in guide content
{
  const forbiddenPhrases = [
    "guaranteed approval",
    "100% success",
    "embassy-approved",
    "fastest visa",
    "no rejection",
    "risk-free",
  ];

  for (const guide of guidesData) {
    const jsonStr = JSON.stringify(guide).toLowerCase();
    for (const phrase of forbiddenPhrases) {
      assert.ok(
        !jsonStr.includes(phrase),
        `Guide '${guide.slug}' content must NEVER contain forbidden phrase '${phrase}'`
      );
    }
  }
  console.log("✓ Test 5 Passed: Safety Check — Zero approval guarantees in guide content");
}

console.log("ALL PHASE 5 RESOURCES MODULE TESTS PASSED SUCCESSFULLY!");
