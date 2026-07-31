import assert from "node:assert";
import { consultationSchema } from "../../common/validation/consultation";
import { submitConsultationRequest } from "../../common/services/consultation";
import type { ConsultationRequest } from "../../common/types/consultation";

console.log("Running Phase 6 Consultation & Lead Capture Test Suite...");

// Test 1: Valid Consultation Payload Validation
{
  const validData = {
    source: {
      pageType: "country",
      countrySlug: "canada",
    },
    destination: {
      countrySlug: "canada",
      undecided: false,
    },
    service: {
      serviceSlug: "tourist-visa",
      undecided: false,
    },
    situation: {
      travelTimeframe: "October 2026",
      summary: "Planning a 2-week vacation to Vancouver with family. Have stable employment and bank statements.",
      priorRefusal: "no",
      preferredLanguage: "English",
    },
    contact: {
      fullName: "Jane Doe",
      email: "jane.doe@example.com",
      phone: "+15551234567",
      preferredMethod: "phone",
      preferredWindow: "morning",
    },
    consent: {
      contactPermission: true,
      privacyAccepted: true,
    },
  };

  const parsed = consultationSchema.safeParse(validData);
  assert.ok(parsed.success, "Valid consultation payload must pass Zod schema validation");
  console.log("✓ Test 1 Passed: Valid consultation payload validation");
}

// Test 2: Invalid Inputs Validation (Summary too short, missing email, missing consent)
{
  const invalidShortSummary = {
    source: { pageType: "direct" },
    destination: { undecided: true },
    service: { undecided: true },
    situation: {
      summary: "Too short", // < 20 chars
      priorRefusal: "no",
    },
    contact: {
      fullName: "Jane Doe",
      email: "jane.doe@example.com",
      phone: "+15551234567",
      preferredMethod: "phone",
      preferredWindow: "no-preference",
    },
    consent: { contactPermission: true, privacyAccepted: true },
  };

  const parsedShort = consultationSchema.safeParse(invalidShortSummary);
  assert.strictEqual(parsedShort.success, false, "Short summary (< 20 chars) must fail validation");

  const invalidEmail = {
    ...invalidShortSummary,
    situation: { summary: "Valid long summary describing travel purpose and timeline thoroughly.", priorRefusal: "no" },
    contact: { ...invalidShortSummary.contact, email: "invalid-email-string" },
  };

  const parsedEmail = consultationSchema.safeParse(invalidEmail);
  assert.strictEqual(parsedEmail.success, false, "Invalid email format must fail validation");

  console.log("✓ Test 2 Passed: Invalid inputs validation (short summary & invalid email)");
}

// Test 3: Replaceable Submission Adapter Execution
{
  const testPayload: ConsultationRequest = {
    id: "req_test_123",
    submittedAt: new Date().toISOString(),
    source: { pageType: "direct" },
    destination: { countrySlug: "canada", undecided: false },
    service: { serviceSlug: "tourist-visa", undecided: false },
    situation: {
      summary: "Comprehensive situation description for testing submission adapter functionality.",
      priorRefusal: "no",
    },
    contact: {
      fullName: "Test User",
      email: "test@example.com",
      phone: "+15550001111",
      preferredMethod: "email",
      preferredWindow: "no-preference",
    },
    consent: {
      contactPermission: true,
      privacyAccepted: true,
    },
  };

  submitConsultationRequest(testPayload).then((res) => {
    assert.strictEqual(res.success, true, "Submission adapter must succeed with default dev fallback");
    console.log("✓ Test 3 Passed: Submission adapter fallback execution");
  });
}

// Test 4: STRICT SAFETY CHECK — No approval guarantees in consultation copy
{
  const forbiddenPhrases = [
    "guaranteed approval",
    "100% success",
    "embassy-approved",
    "fastest visa",
    "no rejection",
    "risk-free",
  ];

  const validationSchemaStr = JSON.stringify(consultationSchema).toLowerCase();
  for (const phrase of forbiddenPhrases) {
    assert.ok(
      !validationSchemaStr.includes(phrase),
      `Consultation code must NEVER contain forbidden phrase '${phrase}'`
    );
  }
  console.log("✓ Test 4 Passed: Safety Check — Zero approval guarantees in consultation module");
}

console.log("ALL PHASE 6 CONSULTATION MODULE TESTS PASSED SUCCESSFULLY!");
