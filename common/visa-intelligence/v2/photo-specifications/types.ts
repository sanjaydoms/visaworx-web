import type { CountryCode } from "../types/core";
import type { Verified } from "../verification/types";
import type { SubmissionChannel } from "../types/journey";

/**
 * Photo specification model.
 *
 * MODEL ONLY — this file deliberately ships no data. Photo requirements are
 * exact, numeric, country-specific and change without notice; a plausible-
 * looking wrong dimension causes a rejected application. Phase 3 populates the
 * registry, and only from official sources. Until then every lookup returns an
 * honest "not modelled" gap.
 *
 * Every field the migration prompt requires is represented, and the required
 * ones are non-optional, so a partially-known specification cannot be
 * registered and then displayed as if it were complete.
 */
export type PhotoSubjectType = "adult" | "minor" | "infant";

export type PhotoMedium = "physical-print" | "digital-upload";

export type PhotoSpecificationKey = {
  destination: CountryCode;
  visaCategoryId: string;
  /** Requirements can differ by where and how the application is lodged. */
  applicationLocationCountry?: CountryCode;
  submissionChannel?: SubmissionChannel;
  subject: PhotoSubjectType;
  medium: PhotoMedium;
};

export type PhotoDimensions = {
  widthMm?: number;
  heightMm?: number;
  /** Digital submissions are specified in pixels instead of millimetres. */
  widthPx?: number;
  heightPx?: number;
  /** Proportion of frame height the face must occupy, where specified. */
  faceHeightMinMm?: number;
  faceHeightMaxMm?: number;
};

export type PhotoFileRequirements = {
  formats: string[];
  minFileSizeKb?: number;
  maxFileSizeKb?: number;
  minDpi?: number;
};

export type PhotoSpecification = {
  key: PhotoSpecificationKey;
  dimensions: PhotoDimensions;
  /** Number of prints required, for physical submissions. */
  quantity?: number;
  background: string;
  faceRequirements: string;
  glasses: string;
  headwear: string;
  /** Rules specific to photographing children. */
  childRules?: string;
  /** Rules specific to photographing infants. */
  infantRules?: string;
  fileRequirements?: PhotoFileRequirements;
  /** Documented exceptions — religious headwear, medical, and so on. */
  exceptions: string[];
};

export type VerifiedPhotoSpecification = Verified<PhotoSpecification>;

/**
 * Registry of verified photo specifications.
 *
 * Empty by design until Phase 3. An empty registry is correct behaviour, not a
 * missing feature: it produces "we do not hold verified information for this,
 * check the official source" rather than an invented dimension.
 */
export const photoSpecificationRegistry: VerifiedPhotoSpecification[] = [];

export function photoKeyToString(key: PhotoSpecificationKey): string {
  return [
    key.destination,
    key.visaCategoryId,
    key.applicationLocationCountry ?? "any",
    key.submissionChannel ?? "any",
    key.subject,
    key.medium,
  ].join("|");
}
