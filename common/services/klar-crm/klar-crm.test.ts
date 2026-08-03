import { afterEach, describe, expect, it, vi } from "vitest";
import { mapToKlarCrmPayloads } from "./mapper";
import { redactSensitiveData, getKlarCrmConfig } from "./client";
import { KlarCrmError } from "./errors";
import type { ConsultationRequest } from "../../types/consultation";

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

describe("klar crm field mapping", () => {
  const { contact, consultation } = mapToKlarCrmPayloads(mockRequest);

  it("maps the contact record", () => {
    expect(contact.contact_name).toBe("Alex Rivera");
    expect(contact.contact_email).toBe("alex.rivera@example.com");
    expect(contact.contact_phone).toBe("+15559876543");
    expect(contact.communication_preference).toBe("whatsapp");
    expect(contact.external_reference).toBe("VISAWORX-req_xyz999");
  });

  it("forwards the callback preferences the consultant needs", () => {
    expect(consultation.preferred_contact_window).toBe("afternoon");
  });

  it("omits an unset preferred date or time rather than sending an empty value", () => {
    expect(consultation).not.toHaveProperty("preferred_date");
    expect(consultation).not.toHaveProperty("preferred_time");

    const { consultation: withSlot } = mapToKlarCrmPayloads({
      ...mockRequest,
      contact: { ...mockRequest.contact, preferredDate: "2026-09-14", preferredTime: "15:30" },
    });
    expect(withSlot.preferred_date).toBe("2026-09-14");
    expect(withSlot.preferred_time).toBe("15:30");
  });

  it("maps the consultation record and resolves slugs to display names", () => {
    expect(consultation.external_reference).toBe("VISAWORX-req_xyz999");
    expect(consultation.status).toBe("New Consultation Request");
    expect(consultation.destination_country).toBe("Canada");
    expect(consultation.service_category).toBe("Tourist Visa Support");
    expect(consultation.travel_timeframe).toBe("October 2026");
    expect(consultation.previous_refusal).toBe("no");
    expect(consultation.readiness_status).toBe("Good Foundation");
    expect(consultation.lead_source).toBe("country");
  });
});

describe("log redaction", () => {
  it("masks contact details and drops the free-text summary", () => {
    const redacted = redactSensitiveData({
      contact_name: "Jane Smith",
      contact_email: "jane.smith@example.com",
      contact_phone: "+15551234567",
      consultation_summary: "Private personal summary information",
    });

    expect(redacted.contact_name).toBe("Jane Smith");
    expect(redacted.contact_email).toBe("ja***@example.com");
    expect(redacted.contact_phone).toBe("********4567");
    expect(redacted.consultation_summary).toBe("[REDACTED SUMMARY]");
  });
});

describe("klar crm configuration", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("reads credentials from the environment and trims the api url", () => {
    vi.stubEnv("KLAR_CRM_API_URL", "https://crm.klartravels.com/");
    vi.stubEnv("KLAR_CRM_API_TOKEN", "secret_token_123");
    vi.stubEnv("KLAR_CRM_TENANT_ID", "tenant_visaworx");

    const config = getKlarCrmConfig();
    expect(config).not.toBeNull();
    expect(config?.apiUrl).toBe("https://crm.klartravels.com");
    expect(config?.apiToken).toBe("secret_token_123");
    expect(config?.tenantId).toBe("tenant_visaworx");
  });

  it("returns null when the api url is not configured", () => {
    vi.stubEnv("KLAR_CRM_API_URL", "");
    expect(getKlarCrmConfig()).toBeNull();
  });
});

describe("KlarCrmError", () => {
  it("carries the code and status alongside the message", () => {
    const err = new KlarCrmError("API unauthorized", "UNAUTHORIZED", 401);
    expect(err.name).toBe("KlarCrmError");
    expect(err.code).toBe("UNAUTHORIZED");
    expect(err.statusCode).toBe(401);
  });
});
