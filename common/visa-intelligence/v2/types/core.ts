/**
 * Core primitives for the V2 Visa Intelligence Engine.
 *
 * The central idea in this layer is that visa knowledge is never a bare value.
 * Every fact carries its official source, the date it was last verified, and a
 * verification status — and any lookup that cannot be answered from verified
 * data returns an explicit "unavailable" result rather than a guess.
 *
 * This is what makes the product rule "never invent visa rules, timelines,
 * requirements or success probabilities" enforceable by the type system rather
 * than by reviewer discipline.
 */

/** ISO 3166-1 alpha-2, uppercase. */
export type CountryCode = string & { readonly __brand: "CountryCode" };

/** ISO 8601 calendar date, `YYYY-MM-DD`. */
export type IsoDate = string & { readonly __brand: "IsoDate" };

export function countryCode(value: string): CountryCode {
  return value.trim().toUpperCase() as CountryCode;
}

export function isoDate(value: string): IsoDate {
  return value as IsoDate;
}

/**
 * Why a piece of knowledge could not be served. Each reason maps to distinct
 * user-facing handling: `not-modelled` and `expired` are honest gaps, while
 * `conflicting` means sources disagree and a human must adjudicate.
 */
export type UnavailableReason =
  | "not-modelled"
  | "expired"
  | "conflicting"
  | "requires-more-context";

/**
 * The only way this engine returns knowledge.
 *
 * Callers must handle the unavailable branch, so there is no code path that
 * silently produces an unsourced answer.
 */
export type KnowledgeResult<T> =
  | { available: true; data: T }
  | {
      available: false;
      reason: UnavailableReason;
      /** Plain-language explanation safe to show a user. */
      guidance: string;
      /** What the caller would need to supply to resolve it, if anything. */
      missingContext?: string[];
    };

export function available<T>(data: T): KnowledgeResult<T> {
  return { available: true, data };
}

export function unavailable<T>(
  reason: UnavailableReason,
  guidance: string,
  missingContext?: string[]
): KnowledgeResult<T> {
  return { available: false, reason, guidance, missingContext };
}

/** Standard guidance copy, so every gap reads consistently and escalates. */
export const GAP_GUIDANCE: Record<UnavailableReason, string> = {
  "not-modelled":
    "Visaworx does not yet hold verified information for this combination. Confirm the requirement with the relevant official authority, or speak to a Visaworx expert.",
  expired:
    "The information Visaworx holds for this has passed its review date and may no longer be current. Confirm with the official authority before relying on it.",
  conflicting:
    "Available official sources disagree on this point. A Visaworx expert should review it before you act on it.",
  "requires-more-context":
    "More detail is needed before this can be answered accurately.",
};
