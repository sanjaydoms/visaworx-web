import type { ConsultationRequest } from "../../types/consultation";
import { submitToKlarCrm } from "../klar-crm/submit-consultation";

/**
 * Delivers a consultation request to the configured system of record.
 *
 * Success is reported ONLY when a destination actually confirmed receipt.
 * If nothing is configured, or every configured destination fails, this
 * returns a failure so the applicant is told the truth rather than being
 * shown a success screen for a request that was never delivered.
 */
export async function submitConsultationRequest(
  request: ConsultationRequest
): Promise<{ success: boolean; error?: string }> {
  const attempts: string[] = [];

  // 1. Klar CRM — the single system of record.
  if (process.env.KLAR_CRM_API_URL) {
    const crmResult = await submitToKlarCrm(request);
    if (crmResult.success) {
      return { success: true };
    }
    attempts.push(`klar-crm: ${crmResult.error || "unknown error"}`);
  }

  const apiUrl = process.env.KLAR_CONSULTATION_API_URL;
  const apiToken = process.env.KLAR_CONSULTATION_API_TOKEN;
  const webhookUrl = process.env.VISAWORX_CONSULTATION_WEBHOOK_URL;

  // 2. Klar Travels API endpoint.
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
      attempts.push(`klar-api: HTTP ${res.status}`);
    } catch (err) {
      attempts.push(`klar-api: ${err instanceof Error ? err.message : "network error"}`);
    }
  }

  // 3. Webhook endpoint.
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
      attempts.push(`webhook: HTTP ${res.status}`);
    } catch (err) {
      attempts.push(`webhook: ${err instanceof Error ? err.message : "network error"}`);
    }
  }

  // 4. Development fallback — explicitly opt-in, never silently in production.
  if (process.env.NODE_ENV !== "production" && process.env.VISAWORX_ALLOW_DEV_FALLBACK === "true") {
    console.log(
      "[Dev Consultation Adapter] Accepted request",
      JSON.stringify({ id: request.id, submittedAt: request.submittedAt })
    );
    return { success: true };
  }

  // Nothing confirmed receipt. Report the failure honestly.
  console.error(
    "[Consultation Delivery Failure]",
    JSON.stringify({
      requestId: request.id,
      configuredDestinations: attempts.length,
      attempts,
    })
  );

  return {
    success: false,
    error:
      attempts.length === 0
        ? "No consultation destination is configured. Your request was not delivered."
        : "We could not deliver your request to our consultation team.",
  };
}
