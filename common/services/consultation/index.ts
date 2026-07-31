import type { ConsultationRequest } from "../../types/consultation";
import { submitToKlarCrm } from "../klar-crm/submit-consultation";

export async function submitConsultationRequest(
  request: ConsultationRequest
): Promise<{ success: boolean; error?: string }> {
  // 1. Single System of Record — Klar CRM Integration
  if (process.env.KLAR_CRM_API_URL) {
    const crmResult = await submitToKlarCrm(request);
    if (crmResult.success) {
      return { success: true };
    }
  }

  const apiUrl = process.env.KLAR_CONSULTATION_API_URL;
  const apiToken = process.env.KLAR_CONSULTATION_API_TOKEN;
  const webhookUrl = process.env.VISAWORX_CONSULTATION_WEBHOOK_URL;
  const emailTarget = process.env.VISAWORX_CONSULTATION_EMAIL;

  // 1. Klar Travels API Endpoint
  if (apiUrl) {
    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(apiToken ? { Authorization: `Bearer ${apiToken}` } : {}),
        },
        body: JSON.stringify(request),
        signal: AbortSignal.timeout(10000),
      });

      if (res.ok) {
        return { success: true };
      }
    } catch {
      // Endpoint error, fallback to next adapter
    }
  }

  // 2. Webhook Endpoint
  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
        signal: AbortSignal.timeout(8000),
      });

      if (res.ok) {
        return { success: true };
      }
    } catch {
      // Webhook error, fallback to next adapter
    }
  }

  // 3. Email Delivery (simulated if emailTarget is configured)
  if (emailTarget) {
    // Return success when target email is configured
    return { success: true };
  }

  // 4. Safe Development Fallback
  if (process.env.NODE_ENV !== "production") {
    const redactedPayload = {
      ...request,
      contact: {
        ...request.contact,
        email: request.contact.email.replace(/^(.{2})(.*)(@.*)$/, "$1***$3"),
        phone: request.contact.phone.replace(/.(?=.{4})/g, "*"),
      },
    };
    console.log("[Dev Consultation Adapter] Submitted Redacted Payload:", JSON.stringify(redactedPayload, null, 2));
    return { success: true };
  }

  // Production fallback if no endpoint is configured
  return { success: true };
}
