import type { ConsultationRequest } from "../../types/consultation";
import type { KlarCrmContactPayload, KlarCrmConsultationPayload } from "./types";
import { countriesData } from "../../content/countries";
import { servicesData } from "../../content/services";

export function mapToKlarCrmPayloads(request: ConsultationRequest): {
  contact: KlarCrmContactPayload;
  consultation: KlarCrmConsultationPayload;
} {
  const externalRef = `VISAWORX-${request.id}`;

  const destName = request.destination.undecided
    ? "Not decided yet"
    : countriesData.find((c) => c.slug === request.destination.countrySlug)?.name || request.destination.countrySlug || "Undecided";

  const serviceName = request.service.undecided
    ? "Not sure yet"
    : servicesData.find((s) => s.slug === request.service.serviceSlug)?.title || request.service.serviceSlug || "Not sure yet";

  const contact: KlarCrmContactPayload = {
    contact_name: request.contact.fullName,
    contact_email: request.contact.email,
    contact_phone: request.contact.phone,
    communication_preference: request.contact.preferredMethod,
    preferred_language: request.situation.preferredLanguage || "English",
    consent_given: request.consent.contactPermission && request.consent.privacyAccepted,
    external_reference: externalRef,
  };

  const consultation: KlarCrmConsultationPayload = {
    external_reference: externalRef,
    created_date: request.submittedAt,
    status: "New Consultation Request",
    destination_country: destName,
    service_category: serviceName,
    travel_timeframe: request.situation.travelTimeframe || "Not specified",
    consultation_summary: request.situation.summary,
    previous_refusal: request.situation.priorRefusal,
    readiness_status: request.source.readinessBand || "N/A",
    lead_source: request.source.pageType || "direct",
    guide_reference: request.source.guideSlug || "N/A",
    contact_email: request.contact.email,
    contact_phone: request.contact.phone,
  };

  return { contact, consultation };
}
