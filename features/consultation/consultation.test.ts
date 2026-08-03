import { afterEach, describe, expect, it, vi } from "vitest";
import { consultationSchema } from "../../common/validation/consultation";
import { submitConsultationRequest } from "../../common/services/consultation";
import type { ConsultationRequest } from "../../common/types/consultation";
import { FORBIDDEN_MARKETING_PHRASES } from "../../common/content/forbidden-phrases";

const validPayload = {
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
    summary:
      "Planning a 2-week vacation to Vancouver with family. Have stable employment and bank statements.",
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

describe("consultation schema validation", () => {
  it("accepts a complete, well-formed request", () => {
    expect(consultationSchema.safeParse(validPayload).success).toBe(true);
  });

  it("rejects a situation summary shorter than 20 characters", () => {
    const result = consultationSchema.safeParse({
      ...validPayload,
      situation: { ...validPayload.situation, summary: "Too short" },
    });
    expect(result.success).toBe(false);
  });

  it("rejects a malformed email address", () => {
    const result = consultationSchema.safeParse({
      ...validPayload,
      contact: { ...validPayload.contact, email: "invalid-email-string" },
    });
    expect(result.success).toBe(false);
  });

  it("rejects a request without contact permission", () => {
    const result = consultationSchema.safeParse({
      ...validPayload,
      consent: { contactPermission: false, privacyAccepted: true },
    });
    expect(result.success).toBe(false);
  });

  it("rejects a request without privacy acceptance", () => {
    const result = consultationSchema.safeParse({
      ...validPayload,
      consent: { contactPermission: true, privacyAccepted: false },
    });
    expect(result.success).toBe(false);
  });
});

const testRequest: ConsultationRequest = {
  id: "req_test_123",
  submittedAt: "2026-08-01T12:00:00.000Z",
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

describe("consultation submission adapter", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  // Regression guard for 3168a57: an unconfigured environment used to report
  // success and silently drop the lead. Nothing confirmed receipt, so the
  // caller must be told the submission failed.
  it("reports failure when no destination is configured", async () => {
    vi.stubEnv("KLAR_CRM_API_URL", "");
    vi.stubEnv("KLAR_CONSULTATION_API_URL", "");
    vi.stubEnv("VISAWORX_CONSULTATION_WEBHOOK_URL", "");
    vi.stubEnv("VISAWORX_ALLOW_DEV_FALLBACK", "");

    const result = await submitConsultationRequest(testRequest);
    expect(result.success).toBe(false);
    expect(result.error).toBeTruthy();
  });

  it("reports failure when the configured endpoint rejects the request", async () => {
    vi.stubEnv("KLAR_CRM_API_URL", "");
    vi.stubEnv("KLAR_CONSULTATION_API_URL", "https://klar.example.com/consultations");
    vi.stubEnv("VISAWORX_CONSULTATION_WEBHOOK_URL", "");
    vi.stubEnv("VISAWORX_ALLOW_DEV_FALLBACK", "");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response("nope", { status: 500 }))
    );

    const result = await submitConsultationRequest(testRequest);
    expect(result.success).toBe(false);
  });

  it("reports success when a configured endpoint confirms receipt", async () => {
    vi.stubEnv("KLAR_CRM_API_URL", "");
    vi.stubEnv("KLAR_CONSULTATION_API_URL", "https://klar.example.com/consultations");
    vi.stubEnv("VISAWORX_CONSULTATION_WEBHOOK_URL", "");
    vi.stubEnv("VISAWORX_ALLOW_DEV_FALLBACK", "");
    const fetchMock = vi.fn().mockResolvedValue(new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    const result = await submitConsultationRequest(testRequest);
    expect(result.success).toBe(true);
    expect(fetchMock).toHaveBeenCalledOnce();
  });

  it("accepts the dev fallback only when it is explicitly opted into", async () => {
    vi.stubEnv("KLAR_CRM_API_URL", "");
    vi.stubEnv("KLAR_CONSULTATION_API_URL", "");
    vi.stubEnv("VISAWORX_CONSULTATION_WEBHOOK_URL", "");
    vi.stubEnv("NODE_ENV", "development");
    vi.stubEnv("VISAWORX_ALLOW_DEV_FALLBACK", "true");
    vi.spyOn(console, "log").mockImplementation(() => {});

    const result = await submitConsultationRequest(testRequest);
    expect(result.success).toBe(true);
  });

  it("never uses the dev fallback in production", async () => {
    vi.stubEnv("KLAR_CRM_API_URL", "");
    vi.stubEnv("KLAR_CONSULTATION_API_URL", "");
    vi.stubEnv("VISAWORX_CONSULTATION_WEBHOOK_URL", "");
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("VISAWORX_ALLOW_DEV_FALLBACK", "true");

    const result = await submitConsultationRequest(testRequest);
    expect(result.success).toBe(false);
  });
});

describe("consultation module safety", () => {
  it("makes no approval claims in validation messages", () => {
    const schemaText = JSON.stringify(consultationSchema).toLowerCase();
    for (const phrase of FORBIDDEN_MARKETING_PHRASES) {
      expect(schemaText).not.toContain(phrase);
    }
  });
});
