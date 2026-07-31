import type {
  ReadinessAnswers,
  ReadinessBandType,
  ReadinessEvaluationResult,
} from "../types/readiness";
import { readinessContent } from "../content/readiness";

export function evaluateReadiness(
  answers: ReadinessAnswers,
  destinationName: string = "your destination"
): ReadinessEvaluationResult {
  const strengths: string[] = [];
  const attentionAreas: string[] = [];
  const nextSteps: string[] = [];

  // Evaluate Passport & Purpose
  if (answers.validPassport === "yes") {
    strengths.push("Valid passport available for travel");
  } else if (answers.validPassport === "no") {
    attentionAreas.push("Passport renewal or issuance required before applying");
  }

  if (answers.purposeDefined === "yes") {
    strengths.push("Clear and specific travel purpose identified");
  } else if (answers.purposeDefined === "partially") {
    attentionAreas.push("Travel purpose needs clearer supporting evidence and itinerary");
  } else if (answers.purposeDefined === "no") {
    attentionAreas.push("Travel intent and itinerary are currently undefined");
  }

  // Evaluate Home Commitments & Funding
  if (answers.homeCommitment === "yes") {
    strengths.push("Relevant home-country economic, employment, or academic commitments identified");
  } else if (answers.homeCommitment === "partial") {
    attentionAreas.push("Supporting employment, education, or business evidence may need strengthening");
  } else if (answers.homeCommitment === "no") {
    attentionAreas.push("Limited evidence of economic or personal commitments in home country");
  }

  if (answers.fundingSource === "self" || answers.fundingSource === "both") {
    strengths.push("Personal financial preparation identified");
  } else if (answers.fundingSource === "sponsor") {
    strengths.push("Sponsorship structure identified");
  }

  // Preparation items count
  let prepItemsCount = 0;
  if (answers.hasIdentityDocs) {
    prepItemsCount++;
    strengths.push("Core identity and civil status documents prepared");
  } else {
    attentionAreas.push("Identity documents need assembly and verification");
  }

  if (answers.hasPurposeDocs) {
    prepItemsCount++;
    strengths.push("Purpose-specific supporting documents identified");
  } else {
    attentionAreas.push("Purpose-specific supporting documents (invitations, admissions, bookings) incomplete");
  }

  if (answers.hasFinancialEvidence) {
    prepItemsCount++;
    strengths.push("Financial statements and bank records gathered");
  } else {
    attentionAreas.push("Financial documents require formal bank statement preparation");
  }

  if (answers.hasTravelItinerary) {
    prepItemsCount++;
    strengths.push("Travel itinerary and accommodation planning in place");
  } else {
    attentionAreas.push("Accommodation or flight itinerary planning is incomplete");
  }

  if (answers.hasEmploymentOrSponsorshipDocs) {
    prepItemsCount++;
    strengths.push("Employment verification or sponsor documentation available");
  }

  // Handle Prior Refusal
  if (answers.priorRefusal === "yes") {
    attentionAreas.push("Prior visa refusal requires expert review before re-application");
  } else if (answers.internationalTravel === "yes") {
    strengths.push("Previous international travel history identified");
  }

  // Rule-based Classification Logic
  let band: ReadinessBandType = "Developing Readiness";

  if (answers.validPassport === "no" || answers.purposeDefined === "no") {
    band = "Early Preparation";
  } else if (answers.priorRefusal === "yes" || answers.purposeDefined === "partially") {
    band = "Needs Expert Review";
  } else if (
    answers.validPassport === "yes" &&
    answers.purposeDefined === "yes" &&
    answers.homeCommitment === "yes" &&
    prepItemsCount >= 3
  ) {
    band = "Good Foundation";
  } else if (prepItemsCount < 2 || answers.homeCommitment === "no") {
    band = "Developing Readiness";
  } else {
    band = "Developing Readiness";
  }


  // Generate Next Steps
  nextSteps.push(`Review the ${destinationName} country guide for category-specific checklist guidelines`);
  if (attentionAreas.length > 0) {
    nextSteps.push("Gather missing financial and purpose-specific supporting documents");
  }
  if (answers.priorRefusal === "yes" || band === "Needs Expert Review") {
    nextSteps.push("Schedule a document review with a Visaworx human expert to evaluate risk factors");
  } else {
    nextSteps.push("Request a document review before submitting your application");
  }
  nextSteps.push("Confirm current official requirements with the destination government portal");

  const bandConfig = readinessContent.bands[band];

  const consultationHandoffText = `Readiness Assessment Summary for ${destinationName} (${answers.visaPurpose || "Visa"}): Band: ${band}. Identified Strengths: ${strengths.length}. Attention Areas: ${attentionAreas.length}.`;

  return {
    band,
    summaryTitle: bandConfig.title,
    explanation: bandConfig.description,
    strengths,
    attentionAreas,
    nextSteps,
    consultationHandoffText,
  };
}
