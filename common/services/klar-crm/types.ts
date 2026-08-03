export type KlarCrmConfig = {
  apiUrl: string;
  apiToken?: string;
  tenantId?: string;
  consultationEndpoint?: string;
  timeoutMs: number;
};

export type KlarCrmContactPayload = {
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  communication_preference: string;
  preferred_language?: string;
  consent_given: boolean;
  external_reference: string;
};

export type KlarCrmConsultationPayload = {
  external_reference: string;
  created_date: string;
  status: "New Consultation Request" | "Contact Attempted" | "Consultation Scheduled" | "Consultation Completed" | "Closed";
  destination_country: string;
  service_category: string;
  travel_timeframe: string;
  consultation_summary: string;
  previous_refusal: string;
  readiness_status: string;
  lead_source: string;
  guide_reference: string;
  contact_email: string;
  contact_phone: string;

  /**
   * Callback preferences. Optional because they are a preference and not a
   * booking - Visaworx reserves no slot, and the consultant confirms an actual
   * time with the applicant.
   *
   * These are new to the payload: the contact window was collected but never
   * forwarded, so consultants were calling back without knowing when the
   * applicant asked to be reached. Operations should confirm Klar CRM accepts
   * these keys; unknown fields are normally ignored, so the worst case is that
   * they are dropped exactly as they are today.
   */
  preferred_contact_window?: string;
  preferred_date?: string;
  preferred_time?: string;
};

export type KlarCrmApiResponse<T = unknown> =
  | { success: true; data: T; contactId?: string; consultationId?: string }
  | { success: false; error: string; code?: string };
