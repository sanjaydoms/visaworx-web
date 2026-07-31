import type { VisaPurpose } from "../content/countries";

export type ReadinessBandType =
  | "Early Preparation"
  | "Developing Readiness"
  | "Good Foundation"
  | "Needs Expert Review";

export type ReadinessAnswers = {
  destinationSlug: string;
  visaPurpose: VisaPurpose | "";
  validPassport: "yes" | "no" | "";
  purposeDefined: "yes" | "no" | "partially" | "";
  homeCommitment: "yes" | "no" | "partial" | "";
  internationalTravel?: "yes" | "no" | "";
  priorRefusal?: "yes" | "no" | "";
  fundingSource: "self" | "sponsor" | "both" | "";
  hasIdentityDocs: boolean;
  hasPurposeDocs: boolean;
  hasFinancialEvidence: boolean;
  hasTravelItinerary: boolean;
  hasEmploymentOrSponsorshipDocs: boolean;
  hasPriorRefusalDocs: boolean;
};

export type ReadinessEvaluationResult = {
  band: ReadinessBandType;
  summaryTitle: string;
  explanation: string;
  strengths: string[];
  attentionAreas: string[];
  nextSteps: string[];
  consultationHandoffText: string;
};
