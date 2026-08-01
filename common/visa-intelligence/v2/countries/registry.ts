import { countriesData } from "../../../content/countries";
import { countryCode, isoDate, unavailable, available, GAP_GUIDANCE } from "../types/core";
import type { CountryCode, KnowledgeResult } from "../types/core";
import type { CountryProfile, VerifiedCountryProfile } from "./types";
import type { OfficialSource } from "../sources/types";
import { resolveVerified } from "../verification/types";
import type { Verified } from "../verification/types";

/**
 * ISO codes for the destinations V1 already covers. Kept as an explicit map
 * rather than derived from the slug, because slugs are editorial and codes are
 * the stable key the V2 engine resolves on.
 */
const SLUG_TO_CODE: Record<string, string> = {
  "united-states": "US",
  "united-kingdom": "GB",
  canada: "CA",
  australia: "AU",
  "new-zealand": "NZ",
  "schengen-area": "EU",
  "united-arab-emirates": "AE",
  singapore: "SG",
  japan: "JP",
  "south-korea": "KR",
};

/** Official sources carried across from the V1 country content. */
export const officialSources: OfficialSource[] = countriesData
  .filter((c) => Boolean(c.officialSourceUrl))
  .map((c) => ({
    id: `src-${c.slug}`,
    label: c.officialSourceLabel,
    url: c.officialSourceUrl as string,
    authority: "government" as const,
    jurisdiction: countryCode(SLUG_TO_CODE[c.slug] ?? "??"),
    retrievedAt: isoDate(c.lastReviewed ?? "1970-01-01"),
  }));

/**
 * Country profiles migrated from V1.
 *
 * Status is `unverified` on purpose. The V1 content was authored for the
 * website and carries a source link and a review date, but it has not been
 * checked field-by-field against those sources as part of this migration, and
 * this layer must not assert a verification that nobody performed. Promotion
 * to `verified` is a human editorial action — see `promoteToVerified`.
 */
export const countryRegistry: VerifiedCountryProfile[] = countriesData.map((c) => ({
  value: {
    code: countryCode(SLUG_TO_CODE[c.slug] ?? "??"),
    name: c.name,
    legacySlug: c.slug,
    visaCategoryIds: c.visaPurposes.map((p) => `cat-${p.toLowerCase()}`),
  },
  sources: c.officialSourceUrl ? [{ sourceId: `src-${c.slug}`, url: c.officialSourceUrl }] : [],
  lastVerified: isoDate(c.lastReviewed ?? "1970-01-01"),
  status: "unverified",
}));

/**
 * Records that a human has checked a fact against its official source.
 *
 * Returns a new record rather than mutating, so verification state is always
 * explicit at the call site and auditable.
 */
export function promoteToVerified<T>(fact: Verified<T>, checkedOn: string): Verified<T> {
  if (fact.sources.length === 0) {
    throw new Error("Cannot verify a fact that has no official source attached.");
  }
  return { ...fact, status: "verified", lastVerified: isoDate(checkedOn) };
}

export function findCountryByCode(code: CountryCode): VerifiedCountryProfile | undefined {
  return countryRegistry.find((c) => c.value.code === code);
}

export function findCountryBySlug(slug: string): VerifiedCountryProfile | undefined {
  return countryRegistry.find((c) => c.value.legacySlug === slug);
}

/**
 * Resolves a destination to a usable profile, or an explicit gap.
 *
 * Because migrated profiles are `unverified`, this currently returns a gap for
 * every country. That is the intended, honest behaviour until the editorial
 * verification pass runs — V1 continues to serve its own content meanwhile.
 */
export function resolveCountry(
  code: CountryCode,
  now: Date = new Date()
): KnowledgeResult<VerifiedCountryProfile> {
  const found = findCountryByCode(code);
  if (!found) {
    return unavailable(
      "not-modelled",
      `Visaworx does not yet hold structured visa intelligence for this destination. ${GAP_GUIDANCE["not-modelled"]}`
    );
  }
  return resolveVerified(found, now);
}

/** Destinations present in the registry, regardless of verification state. */
export function listModelledCountries(): CountryProfile[] {
  return countryRegistry.map((c) => c.value);
}

/** Everything still awaiting an editorial verification pass. */
export function listUnverifiedCountries(): CountryProfile[] {
  return countryRegistry.filter((c) => c.status === "unverified").map((c) => c.value);
}

export { available };
