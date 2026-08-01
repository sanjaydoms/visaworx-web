import type { CountryCode } from "../types/core";
import type { Verified } from "../verification/types";

export type CountryProfile = {
  code: CountryCode;
  name: string;
  /** Slug of the V1 country page, so V2 can link back without duplicating it. */
  legacySlug?: string;
  /** Visa category ids this destination supports in the V2 model. */
  visaCategoryIds: string[];
};

export type VerifiedCountryProfile = Verified<CountryProfile>;
