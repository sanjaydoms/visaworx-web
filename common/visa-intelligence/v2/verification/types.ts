import type { IsoDate, KnowledgeResult } from "../types/core";
import { GAP_GUIDANCE, available, unavailable } from "../types/core";
import type { SourceRef } from "../sources/types";

export type VerificationStatus =
  /** Checked against an official source within the review window. */
  | "verified"
  /** Carried over from earlier content without a source check. */
  | "unverified"
  /** Was verified, but the review window has elapsed. */
  | "expired"
  /** Two or more official sources disagree. */
  | "conflicting";

/**
 * A fact plus its provenance. Nothing in the V2 knowledge layer is stored
 * bare — if it can be shown to a user, it carries a source and a date.
 */
export type Verified<T> = {
  value: T;
  sources: SourceRef[];
  lastVerified: IsoDate;
  status: VerificationStatus;
  /** Set when status is `conflicting`, describing the disagreement. */
  conflictNote?: string;
};

/** How long a verified fact stays trustworthy before it must be re-checked. */
export const REVIEW_WINDOW_DAYS = 180;

export function daysBetween(from: IsoDate, to: Date): number {
  const start = new Date(`${from}T00:00:00Z`).getTime();
  if (Number.isNaN(start)) return Number.POSITIVE_INFINITY;
  return Math.floor((to.getTime() - start) / 86_400_000);
}

export function isExpired(fact: Verified<unknown>, now: Date = new Date()): boolean {
  return daysBetween(fact.lastVerified, now) > REVIEW_WINDOW_DAYS;
}

/**
 * The single gate every consumer must pass a fact through before display.
 *
 * Unverified, expired and conflicting facts are never returned as usable
 * knowledge — they become explicit gaps with guidance instead. Expiry is
 * evaluated at read time so stale content degrades on its own, without anyone
 * having to remember to prune it.
 */
export function resolveVerified<T>(
  fact: Verified<T> | undefined,
  now: Date = new Date()
): KnowledgeResult<Verified<T>> {
  if (!fact) return unavailable("not-modelled", GAP_GUIDANCE["not-modelled"]);

  if (fact.status === "conflicting") {
    return unavailable("conflicting", fact.conflictNote || GAP_GUIDANCE.conflicting);
  }

  if (fact.status === "unverified") {
    return unavailable("not-modelled", GAP_GUIDANCE["not-modelled"]);
  }

  if (fact.status === "expired" || isExpired(fact, now)) {
    return unavailable("expired", GAP_GUIDANCE.expired);
  }

  if (fact.sources.length === 0) {
    // A fact with no source cannot be shown, whatever its status claims.
    return unavailable("not-modelled", GAP_GUIDANCE["not-modelled"]);
  }

  return available(fact);
}
