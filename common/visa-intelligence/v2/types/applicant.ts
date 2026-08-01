import type { CountryCode } from "./core";

/**
 * Who is applying, and from where.
 *
 * Nationality, residence and application location are deliberately separate.
 * They are frequently different — an Indian national resident in the UAE
 * applying at a VFS centre in Dubai — and requirements can hinge on any of the
 * three. Collapsing them, as V1 effectively did, is what makes generic visa
 * advice wrong for real applicants.
 */
export type Applicant = {
  nationality: CountryCode;
  countryOfResidence: CountryCode;
  travellerType: TravellerType;
  ageBand: AgeBand;
};

export type TravellerType =
  | "adult"
  | "student"
  | "employed"
  | "self-employed"
  | "retired"
  | "homemaker"
  | "minor"
  | "infant";

/**
 * Age bands rather than a date of birth: the engine only needs the band to
 * resolve requirements, and bands avoid holding a precise personal identifier.
 */
export type AgeBand = "infant" | "child" | "adolescent" | "adult" | "senior";

export type MinorStatus =
  | { isMinor: false }
  | {
      isMinor: true;
      /** Who the minor is travelling with — drives consent documentation. */
      accompaniedBy: MinorAccompaniment;
    };

export type MinorAccompaniment =
  | "both-parents"
  | "one-parent"
  | "legal-guardian"
  | "unaccompanied";

export function isMinorBand(band: AgeBand): boolean {
  return band === "infant" || band === "child" || band === "adolescent";
}

/**
 * Derives minor status from the age band and accompaniment, so callers cannot
 * accidentally treat a child as an adult by supplying the wrong flag.
 */
export function deriveMinorStatus(
  band: AgeBand,
  accompaniedBy?: MinorAccompaniment
): MinorStatus {
  if (!isMinorBand(band)) return { isMinor: false };
  return { isMinor: true, accompaniedBy: accompaniedBy ?? "unaccompanied" };
}
