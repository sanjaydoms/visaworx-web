import type { KlarCrmConsultationPayload } from "../../../services/klar-crm/types";
import type { TravelScenario } from "../family/types";
import type { PreparationScore } from "../scoring/preparation-score";
import type { FundingArrangement } from "../types/journey";

/**
 * V2 enrichment for the Klar CRM consultation handoff.
 *
 * Strictly additive. Klar CRM remains the single system of record, every
 * existing field name is preserved exactly, and this module only appends new
 * keys — so a CRM that does not yet know about them keeps working, and no
 * existing mapping needs re-approval.
 *
 * The enrichment is gated on CONSULTANT_HANDOFF_V2 by the caller. With the flag
 * off, the payload is byte-identical to V1.
 */
export type KlarCrmV2Enrichment = {
  traveller_scenario: string;
  family_composition: string;
  minor_arrangement: string;
  funding_method: string;
  preparation_score: string;
  preparation_band: string;
  priority_gaps: string;
  questions_asked: string;
  /** Only ever populated when the applicant consented to it being shared. */
  ai_topic_summary: string;
  source_page: string;
};

export type EnrichedKlarCrmConsultationPayload = KlarCrmConsultationPayload &
  Partial<KlarCrmV2Enrichment>;

const SCENARIO_LABELS: Record<TravelScenario, string> = {
  "solo-adult": "Solo adult",
  "family-travelling-together": "Family travelling together",
  "minor-with-both-parents": "Minor with both parents",
  "minor-with-one-parent": "Minor with one parent",
  "minor-with-guardian": "Minor with guardian",
  "unaccompanied-minor": "Unaccompanied minor",
  "sponsored-family": "Sponsored family",
  "student-funded-by-parents": "Student funded by parents",
  "parent-visiting-child": "Parent visiting child",
  "child-visiting-parent": "Child visiting parent",
};

function describeFunding(funding: FundingArrangement): string {
  switch (funding.type) {
    case "sponsored":
      return `Sponsored (${funding.sponsor})`;
    case "mixed":
      return funding.sponsor ? `Mixed (sponsor: ${funding.sponsor})` : "Mixed";
    case "self-funded":
      return "Self-funded";
    case "employer-funded":
      return "Employer-funded";
    case "scholarship-or-institution":
      return "Scholarship or institution";
  }
}

/**
 * Appends V2 context to an existing consultation payload.
 *
 * The AI topic summary is included only with explicit consent. Conversation
 * content is more sensitive than the form fields the applicant knowingly filled
 * in, so it is opt-in rather than assumed — consistent with the consent fix
 * applied to the V1 flow.
 */
export function enrichConsultationPayload(
  base: KlarCrmConsultationPayload,
  context: {
    scenario: TravelScenario;
    travellerCount: number;
    minorCount: number;
    minorArrangement?: string;
    funding: FundingArrangement;
    preparation?: PreparationScore;
    questionsAsked?: string[];
    aiTopicSummary?: string;
    aiSummaryConsentGiven: boolean;
    sourcePage: string;
  }
): EnrichedKlarCrmConsultationPayload {
  const enrichment: KlarCrmV2Enrichment = {
    traveller_scenario: SCENARIO_LABELS[context.scenario],
    family_composition: `${context.travellerCount} traveller(s), ${context.minorCount} minor(s)`,
    minor_arrangement: context.minorArrangement ?? "N/A",
    funding_method: describeFunding(context.funding),
    preparation_score: context.preparation
      ? `${context.preparation.percentage}% (${context.preparation.totalPoints}/${context.preparation.maxPoints})`
      : "Not assessed",
    preparation_band: context.preparation?.band ?? "Not assessed",
    priority_gaps:
      context.preparation?.priorityGaps.map((g) => g.label).join("; ") || "None identified",
    questions_asked: (context.questionsAsked ?? []).join(" | ") || "None recorded",
    ai_topic_summary: context.aiSummaryConsentGiven ? context.aiTopicSummary ?? "" : "",
    source_page: context.sourcePage,
  };

  // Base fields are spread last so V2 can never overwrite an existing mapping.
  return { ...enrichment, ...base };
}

/** Guard for tests: the enrichment must not collide with any V1 field name. */
export function enrichmentCollidesWith(base: KlarCrmConsultationPayload): string[] {
  const v2Keys: Array<keyof KlarCrmV2Enrichment> = [
    "traveller_scenario",
    "family_composition",
    "minor_arrangement",
    "funding_method",
    "preparation_score",
    "preparation_band",
    "priority_gaps",
    "questions_asked",
    "ai_topic_summary",
    "source_page",
  ];
  return v2Keys.filter((k) => k in base);
}
