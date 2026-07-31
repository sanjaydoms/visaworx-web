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
};

export type KlarCrmApiResponse<T = unknown> =
  | { success: true; data: T; contactId?: string; consultationId?: string }
  | { success: false; error: string; code?: string };
