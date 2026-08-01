import type { FamilyComposition, TravelScenario } from "../family/types";
import { countMinors, groupSize } from "../family/types";
import type { FundingArrangement, TravelPurpose } from "../types/journey";
import { isMinorBand, type MinorAccompaniment } from "../types/applicant";

/**
 * Derives the travel scenario from who is travelling and how it is funded.
 *
 * This is structural inference about the applicant's own situation, not a
 * statement about visa rules, so it is safe to compute. What the scenario then
 * *requires* is verified knowledge and is resolved separately.
 *
 * Order matters: the most constrained scenario wins. An unaccompanied minor is
 * an unaccompanied minor even if the trip is sponsored, because the consent and
 * guardianship documentation is the part most easily missed.
 */
export function deriveScenario(input: {
  composition: FamilyComposition;
  funding: FundingArrangement;
  purpose: TravelPurpose;
}): TravelScenario {
  const { composition, funding, purpose } = input;
  const primary = composition.primaryApplicant;
  const primaryIsMinor = isMinorBand(primary.ageBand);
  const minors = countMinors(composition);
  const size = groupSize(composition);

  // A minor as the primary applicant is the most constrained case.
  if (primaryIsMinor) {
    const accompaniment: MinorAccompaniment =
      composition.members.length === 0
        ? "unaccompanied"
        : inferAccompaniment(composition);

    switch (accompaniment) {
      case "unaccompanied":
        return "unaccompanied-minor";
      case "both-parents":
        return "minor-with-both-parents";
      case "one-parent":
        return "minor-with-one-parent";
      case "legal-guardian":
        return "minor-with-guardian";
    }
  }

  // A student funded by parents has a distinct sponsor-document profile.
  if (purpose === "study" && funding.type === "sponsored" && funding.sponsor === "parent") {
    return "student-funded-by-parents";
  }

  if (minors > 0 && size > 1) {
    const accompaniment = inferAccompaniment(composition);
    if (accompaniment === "one-parent") return "minor-with-one-parent";
    if (accompaniment === "legal-guardian") return "minor-with-guardian";
    return "minor-with-both-parents";
  }

  if (funding.type === "sponsored" && size > 1) return "sponsored-family";

  if (purpose === "family-visit" && size === 1) {
    const rel = composition.members[0]?.relationshipToPrimary;
    if (rel === "child") return "parent-visiting-child";
    if (rel === "parent") return "child-visiting-parent";
  }

  if (size > 1) return "family-travelling-together";

  return "solo-adult";
}

/**
 * Works out who is accompanying the minors, from the adults in the group.
 *
 * Defaults to `legal-guardian` rather than `both-parents` when the adults are
 * not stated parents: assuming a parental relationship would understate the
 * authorisation documents the group needs.
 */
function inferAccompaniment(composition: FamilyComposition): MinorAccompaniment {
  const adults = [composition.primaryApplicant, ...composition.members.map((m) => m.applicant)]
    .filter((a) => !isMinorBand(a.ageBand));

  if (adults.length === 0) return "unaccompanied";

  const parentCount = composition.members.filter(
    (m) => m.relationshipToPrimary === "parent" || m.relationshipToPrimary === "spouse"
  ).length;

  const primaryIsAdult = !isMinorBand(composition.primaryApplicant.ageBand);

  // Primary adult plus a spouse/parent means two parental figures.
  if (primaryIsAdult && parentCount >= 1) return "both-parents";
  if (primaryIsAdult) return "one-parent";
  if (parentCount >= 2) return "both-parents";
  if (parentCount === 1) return "one-parent";

  return "legal-guardian";
}

/** Scenarios where authorisation or consent documentation is central. */
export const CONSENT_SENSITIVE_SCENARIOS: TravelScenario[] = [
  "minor-with-one-parent",
  "minor-with-guardian",
  "unaccompanied-minor",
];

export function needsConsentDocumentation(scenario: TravelScenario): boolean {
  return CONSENT_SENSITIVE_SCENARIOS.includes(scenario);
}
