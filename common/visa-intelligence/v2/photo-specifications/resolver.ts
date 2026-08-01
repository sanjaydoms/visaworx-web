import type { KnowledgeResult } from "../types/core";
import { unavailable, GAP_GUIDANCE } from "../types/core";
import { resolveVerified } from "../verification/types";
import {
  photoSpecificationRegistry,
  photoKeyToString,
  type PhotoSpecificationKey,
  type VerifiedPhotoSpecification,
} from "./types";

/**
 * Resolves photo requirements for a specific applicant and submission route.
 *
 * Matching is deliberately strict-to-loose but never lossy in the dimensions
 * that change the answer. Subject type (adult / minor / infant) and medium
 * (print / digital) are never relaxed, because an infant's rules and a digital
 * upload's pixel sizes are genuinely different requirements rather than more
 * general versions of the adult print case. Location and channel may be
 * relaxed, since a country-wide specification legitimately covers a centre
 * that publishes no override.
 */
const MATCH_STRATEGIES: Array<{
  label: string;
  relax: (key: PhotoSpecificationKey) => PhotoSpecificationKey;
}> = [
  { label: "exact", relax: (k) => k },
  { label: "any-channel", relax: (k) => ({ ...k, submissionChannel: undefined }) },
  { label: "any-location", relax: (k) => ({ ...k, applicationLocationCountry: undefined }) },
  {
    label: "country-wide",
    relax: (k) => ({ ...k, submissionChannel: undefined, applicationLocationCountry: undefined }),
  },
];

export type PhotoMatch = {
  specification: VerifiedPhotoSpecification;
  /** How specific the match was, so the UI can say "country-wide guidance". */
  precision: "exact" | "any-channel" | "any-location" | "country-wide";
};

export function resolvePhotoSpecification(
  key: PhotoSpecificationKey,
  registry: VerifiedPhotoSpecification[] = photoSpecificationRegistry,
  now: Date = new Date()
): KnowledgeResult<PhotoMatch> {
  const conflicts: VerifiedPhotoSpecification[] = [];

  for (const strategy of MATCH_STRATEGIES) {
    const wanted = photoKeyToString(strategy.relax(key));
    const matches = registry.filter(
      (spec) => photoKeyToString(strategy.relax(spec.value.key)) === wanted
    );

    if (matches.length === 0) continue;

    // More than one specification for the same key means sources disagree.
    // Surfacing that beats silently picking the first.
    if (matches.length > 1) {
      conflicts.push(...matches);
      break;
    }

    const resolved = resolveVerified(matches[0], now);
    if (!resolved.available) return resolved;

    return {
      available: true,
      data: { specification: resolved.data, precision: strategy.label as PhotoMatch["precision"] },
    };
  }

  if (conflicts.length > 0) {
    return unavailable(
      "conflicting",
      "Visaworx holds more than one photo specification for this combination and they do not agree. A Visaworx expert should confirm which applies before you have photographs taken."
    );
  }

  return unavailable(
    "not-modelled",
    `Visaworx does not hold verified photo requirements for this combination. ${GAP_GUIDANCE["not-modelled"]}`,
    ["destination", "visa category", "applicant age group", "how the application will be submitted"]
  );
}

/**
 * True when the registry holds nothing at all for a destination, letting the UI
 * distinguish "we cover this country but not your exact case" from "we do not
 * cover this country yet".
 */
export function hasAnyPhotoDataFor(
  destination: PhotoSpecificationKey["destination"],
  registry: VerifiedPhotoSpecification[] = photoSpecificationRegistry
): boolean {
  return registry.some((s) => s.value.key.destination === destination);
}
