import type { KnowledgeResult } from "../types/core";
import type { PreparationScore } from "../scoring/preparation-score";
import type { TravelScenario } from "../family/types";
import type { VisaCategory } from "../visa-categories/registry";
import type { DocumentRequirement } from "../documents/types";
import type { PhotoMatch } from "../photo-specifications/resolver";
import { needsConsentDocumentation } from "../scenarios/derive";

/**
 * The Visa Clarity Snapshot.
 *
 * Sections mirror the eleven the product specifies, in order. Any section
 * backed by visa knowledge holds a KnowledgeResult rather than a value, so a
 * gap renders as an honest "we do not hold this, here is what to do" instead
 * of being silently omitted — an omitted requirement reads as "not required",
 * which is the more dangerous failure.
 *
 * The score is carried but is explicitly secondary: `scoreIsSecondary` is part
 * of the contract, and there is no approval-probability field anywhere in this
 * type.
 */
export type ClaritySnapshot = {
  /** 1. Your travel situation */
  situation: SituationSummary;
  /** 2. Visa path to explore */
  visaPath: KnowledgeResult<VisaCategory>;
  /** 3. Common document groups */
  documentGroups: KnowledgeResult<DocumentRequirement[]>;
  /** 4. Family or minor requirements */
  familyRequirements: KnowledgeResult<DocumentRequirement[]>;
  /** 5. Photo and biometric guidance */
  photoGuidance: KnowledgeResult<PhotoMatch>;
  /** 6. Important exceptions */
  exceptions: string[];
  /** 7. Preparation score — presented after the substance, never as a verdict. */
  preparation: PreparationScore;
  scoreIsSecondary: true;
  /** 8. What needs attention */
  needsAttention: string[];
  /** 9. Three next actions */
  nextActions: string[];
  /** 10. Questions worth exploring */
  questionsWorthExploring: string[];
  /** 11. Speak to a human expert */
  expertHandoff: ExpertHandoff;
};

export type SituationSummary = {
  destinationName: string;
  purposeLabel: string;
  scenario: TravelScenario;
  travellerCount: number;
  minorCount: number;
};

export type ExpertHandoff = {
  headline: string;
  reason: string;
  /** Deep link into the consultation flow, carrying context but no personal data. */
  consultationHref: string;
};

const SCENARIO_LABELS: Record<TravelScenario, string> = {
  "solo-adult": "Travelling alone",
  "family-travelling-together": "Family travelling together",
  "minor-with-both-parents": "Child travelling with both parents",
  "minor-with-one-parent": "Child travelling with one parent",
  "minor-with-guardian": "Child travelling with a guardian",
  "unaccompanied-minor": "Child travelling unaccompanied",
  "sponsored-family": "Sponsored family travel",
  "student-funded-by-parents": "Student funded by parents",
  "parent-visiting-child": "Parent visiting a child",
  "child-visiting-parent": "Child visiting a parent",
};

export function scenarioLabel(scenario: TravelScenario): string {
  return SCENARIO_LABELS[scenario];
}

/**
 * Assembles the snapshot.
 *
 * Next actions are capped at three deliberately — a long list of everything
 * outstanding is what makes applicants freeze, and the product intent is to
 * give a clear immediate step. Gaps in knowledge become actions of their own,
 * so an unknown requirement turns into "confirm this with the official source"
 * rather than disappearing.
 */
export function buildClaritySnapshot(input: {
  situation: SituationSummary;
  visaPath: KnowledgeResult<VisaCategory>;
  documentGroups: KnowledgeResult<DocumentRequirement[]>;
  familyRequirements: KnowledgeResult<DocumentRequirement[]>;
  photoGuidance: KnowledgeResult<PhotoMatch>;
  preparation: PreparationScore;
  consultationHref: string;
}): ClaritySnapshot {
  const { situation, preparation } = input;

  const needsAttention: string[] = preparation.priorityGaps.map(
    (d) => `${d.label}: ${d.percentage}% of the questions in this area are still open.`
  );

  const exceptions: string[] = [];
  const nextActions: string[] = [];
  const questions: string[] = [];

  // Knowledge gaps become explicit actions rather than silent omissions.
  for (const [label, result] of [
    ["visa path", input.visaPath],
    ["document requirements", input.documentGroups],
    ["photo requirements", input.photoGuidance],
  ] as const) {
    if (!result.available) {
      needsAttention.push(`Visaworx does not yet hold verified ${label} for your situation.`);
      nextActions.push(`Confirm ${label} with the official authority, or ask a Visaworx expert.`);
    }
  }

  if (needsConsentDocumentation(situation.scenario)) {
    exceptions.push(
      "Travel involving a child without both parents usually attracts additional consent and authorisation requirements. Confirm the exact documents with the relevant authority."
    );
    questions.push("What authorisation is needed for the accompanying adult?");
  }

  for (const gap of preparation.priorityGaps.slice(0, 3)) {
    const weakest = [...gap.contributions].sort((a, b) => a.points - b.points)[0];
    if (weakest?.improvement) nextActions.push(weakest.improvement);
  }

  questions.push(
    "Which documents in my situation are shared, and which does each traveller need individually?",
    "What should I prepare before speaking with an expert?"
  );

  return {
    situation: input.situation,
    visaPath: input.visaPath,
    documentGroups: input.documentGroups,
    familyRequirements: input.familyRequirements,
    photoGuidance: input.photoGuidance,
    exceptions,
    preparation,
    scoreIsSecondary: true,
    needsAttention,
    nextActions: nextActions.slice(0, 3),
    questionsWorthExploring: questions.slice(0, 4),
    expertHandoff: {
      headline: "Speak to a Visaworx expert",
      reason:
        preparation.band === "Needs expert review"
          ? "Several areas of your preparation are still open, and a consultant can prioritise them with you."
          : "A consultant can confirm the details that apply to your specific situation.",
      consultationHref: input.consultationHref,
    },
  };
}
