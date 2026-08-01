import type { Applicant, MinorAccompaniment } from "../types/applicant";

/**
 * Composition of a group travelling together.
 *
 * Modelled as a group with one primary applicant plus members, because
 * document requirements split along exactly those lines: some documents are
 * shared by the group, some are per person, and some exist only because of a
 * relationship (a consent letter, a sponsorship declaration).
 */
export type FamilyComposition = {
  primaryApplicant: Applicant;
  members: FamilyMember[];
};

export type FamilyMember = {
  applicant: Applicant;
  relationshipToPrimary: FamilyRelationship;
  /** Present only for members who are minors. */
  minorAccompaniment?: MinorAccompaniment;
};

export type FamilyRelationship =
  | "spouse"
  | "child"
  | "parent"
  | "sibling"
  | "other-dependent";

/** The travel scenarios Phase 4 will resolve document sets for. */
export type TravelScenario =
  | "solo-adult"
  | "family-travelling-together"
  | "minor-with-both-parents"
  | "minor-with-one-parent"
  | "minor-with-guardian"
  | "unaccompanied-minor"
  | "sponsored-family"
  | "student-funded-by-parents"
  | "parent-visiting-child"
  | "child-visiting-parent";

export function countMinors(composition: FamilyComposition): number {
  const primary = composition.primaryApplicant.ageBand;
  const primaryIsMinor = primary === "infant" || primary === "child" || primary === "adolescent";

  return (
    (primaryIsMinor ? 1 : 0) +
    composition.members.filter((m) => {
      const b = m.applicant.ageBand;
      return b === "infant" || b === "child" || b === "adolescent";
    }).length
  );
}

export function groupSize(composition: FamilyComposition): number {
  return 1 + composition.members.length;
}
