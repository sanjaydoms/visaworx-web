import type { ConsultationRequest } from "../../types/consultation";
import { getKlarCrmConfig, sendKlarCrmRequest } from "./client";
import { mapToKlarCrmPayloads } from "./mapper";
import { KlarCrmError } from "./errors";

export async function submitToKlarCrm(
  request: ConsultationRequest
): Promise<{ success: boolean; error?: string }> {
  const config = getKlarCrmConfig();
  if (!config) {
    return { success: false, error: "Klar CRM API is not configured" };
  }

  const { contact, consultation } = mapToKlarCrmPayloads(request);

  try {
    // 1. Submit / Match Contact record
    const contactEndpoint = `${config.apiUrl}/api/v1/contacts`;
    await sendKlarCrmRequest(contactEndpoint, contact as unknown as Record<string, unknown>, contact.external_reference, config);

    // 2. Create Consultation Enquiry record linked to contact
    const consultationEndpoint = `${config.apiUrl}${config.consultationEndpoint}`;
    await sendKlarCrmRequest(consultationEndpoint, consultation as unknown as Record<string, unknown>, consultation.external_reference, config);

    return { success: true };
  } catch (err: unknown) {
    if (err instanceof KlarCrmError) {
      return { success: false, error: `Klar CRM submission failed: ${err.message}` };
    }
    return { success: false, error: "Klar CRM integration encountered an unexpected error." };
  }
}
