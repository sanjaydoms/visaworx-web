import type { CountryCode } from "../types/core";
import type { Verified } from "../verification/types";
import type { AgeBand } from "../types/applicant";
import type { SubmissionChannel } from "../types/journey";

/**
 * Biometric enrolment requirements.
 *
 * MODEL ONLY — no data ships here. Age exemptions in particular ("do infants
 * need biometrics?") vary by country and change; an assumed answer sends a
 * family to an appointment they did not need, or leaves them missing one they
 * did. Phase 3 populates this from official sources.
 */
export type BiometricType = "fingerprints" | "facial-image" | "iris" | "signature";

export type BiometricRequirementKey = {
  destination: CountryCode;
  visaCategoryId: string;
  applicationLocationCountry?: CountryCode;
  submissionChannel?: SubmissionChannel;
  ageBand: AgeBand;
};

export type BiometricRequirement = {
  key: BiometricRequirementKey;
  required: boolean;
  types: BiometricType[];
  /** Where enrolment takes place, when specified by the authority. */
  enrolmentLocation?: string;
  /** Age-based or reuse-based exemptions, as published. */
  exemptions: string[];
  /** How long a previous enrolment remains reusable, where published. */
  reusePeriodMonths?: number;
};

export type VerifiedBiometricRequirement = Verified<BiometricRequirement>;

/** Empty until Phase 3, for the same reason as the photo registry. */
export const biometricRegistry: VerifiedBiometricRequirement[] = [];
