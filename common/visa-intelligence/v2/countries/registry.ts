import { countriesData } from "../../../content/countries";
import { countryCode, isoDate, unavailable, available, GAP_GUIDANCE } from "../types/core";
import type { CountryCode, KnowledgeResult } from "../types/core";
import type { CountryProfile, VerifiedCountryProfile } from "./types";
import type { OfficialSource } from "../sources/types";
import { destinations, type Destination } from "./destinations";
import { resolveVerified } from "../verification/types";
import type { Verified } from "../verification/types";

/**
 * Legacy slug to destination code, derived from the destination list rather
 * than hand-maintained. The previous hand-written map silently mismapped
 * Schengen ("schengen-area" vs the actual slug "schengen"), which fell through
 * to a "??" code - a count-based test passed while the entry was broken.
 */
const SLUG_TO_CODE: Record<string, string> = Object.fromEntries(
  destinations.filter((d) => d.legacySlug).map((d) => [d.legacySlug as string, d.code])
);

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
 * Profiles for every destination the engine recognises.
 *
 * Built from the destination list, not from V1 content, so recognising a
 * destination is separate from having guidance for it. Ten carry provenance
 * migrated from V1; the other forty are identity records with no sources
 * attached, which the verification gate turns into an honest "not held" gap.
 *
 * Status is `unverified` throughout, on purpose. The V1 content was authored
 * for the website and carries a source link and a review date, but it has not
 * been checked field-by-field against those sources as part of this migration,
 * and this layer must not assert a verification nobody performed. Promotion is
 * a human editorial action — see `promoteToVerified`.
 */
export const countryRegistry: VerifiedCountryProfile[] = destinations.map(
  (d: Destination): VerifiedCountryProfile => {
    const legacy = d.legacySlug
      ? countriesData.find((c) => c.slug === d.legacySlug)
      : undefined;

    return {
      value: {
        code: countryCode(d.code),
        name: d.name,
        legacySlug: d.legacySlug,
        visaCategoryIds: legacy
          ? legacy.visaPurposes.map((p) => `cat-${p.toLowerCase()}`)
          : [],
      },
      // No legacy content means no source, which is the correct honest state:
      // the engine knows the destination exists and holds nothing about it.
      sources:
        legacy?.officialSourceUrl && d.legacySlug
          ? [{ sourceId: `src-${d.legacySlug}`, url: legacy.officialSourceUrl }]
          : [],
      lastVerified: isoDate(legacy?.lastReviewed ?? "1970-01-01"),
      status: "unverified",
    };
  }
);

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
