import assert from "node:assert";
import { mapToKlarCrmPayloads } from "./mapper";
import { redactSensitiveData, getKlarCrmConfig } from "./client";
import { KlarCrmError } from "./errors";
import type { ConsultationRequest } from "../../types/consultation";

console.log("Running Klar CRM Integration Unit Test Suite...");

// Test 1: Field Mapping Accuracy
{
  const mockRequest: ConsultationRequest = {
    id: "req_xyz999",
    submittedAt: "2026-08-01T12:00:00.000Z",
    source: {
      pageType: "country",
      countrySlug: "canada",
      readinessBand: "Good Foundation",
      guideSlug: "how-to-prepare-financial-evidence",
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
      summary: "Detailed travel plan to visit Banff and Vancouver for 14 days with my spouse.",
      priorRefusal: "no",
      preferredLanguage: "English",
    },
    contact: {
      fullName: "Alex Rivera",
      email: "alex.rivera@example.com",
      phone: "+15559876543",
      preferredMethod: "whatsapp",
      preferredWindow: "afternoon",
    },
    consent: {
      contactPermission: true,
      privacyAccepted: true,
    },
  };

  const { contact, consultation } = mapToKlarCrmPayloads(mockRequest);

  assert.strictEqual(contact.contact_name, "Alex Rivera", "Contact name must map to fullName");
  assert.strictEqual(contact.contact_email, "alex.rivera@example.com", "Contact email must map to email");
  assert.strictEqual(contact.contact_phone, "+15559876543", "Contact phone must map to phone");
  assert.strictEqual(contact.communication_preference, "whatsapp", "Communication preference must map to preferredMethod");
  assert.strictEqual(contact.external_reference, "VISAWORX-req_xyz999", "External reference must match VISAWORX-{id}");

  assert.strictEqual(consultation.external_reference, "VISAWORX-req_xyz999", "Consultation external_reference must match VISAWORX-{id}");
  assert.strictEqual(consultation.status, "New Consultation Request", "Status must default to 'New Consultation Request'");
  assert.strictEqual(consultation.destination_country, "Canada", "Destination country slug must map to display name 'Canada'");
  assert.strictEqual(consultation.service_category, "Tourist Visa Support", "Service category slug must map to title 'Tourist Visa Support'");
  assert.strictEqual(consultation.travel_timeframe, "October 2026", "Travel timeframe must map correctly");
  assert.strictEqual(consultation.previous_refusal, "no", "Previous refusal must map correctly");
  assert.strictEqual(consultation.readiness_status, "Good Foundation", "Readiness status must map to readiness band");
  assert.strictEqual(consultation.lead_source, "country", "Lead source must map to pageType");

  console.log("✓ Test 1 Passed: Field mapping accuracy verified");
}

// Test 2: Log Redaction Helper
{
  const rawPayload = {
    contact_name: "Jane Smith",
    contact_email: "jane.smith@example.com",
    contact_phone: "+15551234567",
    consultation_summary: "Private personal summary information",
  };

  const redacted = redactSensitiveData(rawPayload);

  assert.strictEqual(redacted.contact_name, "Jane Smith", "Name should be retained");
  assert.strictEqual(redacted.contact_email, "ja***@example.com", "Email must be redacted in logs");
  assert.strictEqual(redacted.contact_phone, "********4567", "Phone must be masked in logs");
  assert.strictEqual(redacted.consultation_summary, "[REDACTED SUMMARY]", "Summary must be redacted in logs");

  console.log("✓ Test 2 Passed: Log redaction helper verified");
}

// Test 3: Environment Config Retrieval
{
  process.env.KLAR_CRM_API_URL = "https://crm.klartravels.com/";
  process.env.KLAR_CRM_API_TOKEN = "secret_token_123";
  process.env.KLAR_CRM_TENANT_ID = "tenant_visaworx";

  const config = getKlarCrmConfig();
  assert.ok(config, "Config should return non-null when KLAR_CRM_API_URL is set");
  assert.strictEqual(config?.apiUrl, "https://crm.klartravels.com", "Trailing slashes must be trimmed");
  assert.strictEqual(config?.apiToken, "secret_token_123");
  assert.strictEqual(config?.tenantId, "tenant_visaworx");

  console.log("✓ Test 3 Passed: Environment config retrieval verified");
}

// Test 4: Custom Error Class
{
  const err = new KlarCrmError("API unauthorized", "UNAUTHORIZED", 401);
  assert.strictEqual(err.name, "KlarCrmError");
  assert.strictEqual(err.code, "UNAUTHORIZED");
  assert.strictEqual(err.statusCode, 401);

  console.log("✓ Test 4 Passed: Custom KlarCrmError verified");
}

console.log("ALL KLAR CRM INTEGRATION UNIT TESTS PASSED!");
