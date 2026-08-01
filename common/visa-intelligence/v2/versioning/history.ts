import type { IsoDate } from "../types/core";
import type { SourceRef } from "../sources/types";

/**
 * Change history for a piece of visa knowledge.
 *
 * Visa rules change, and an applicant who prepared under last month's rules
 * needs to know *what* changed, not just that something did. Keeping history
 * alongside the current value also makes a bad edit reversible and gives the
 * AI coach something honest to say about currency.
 */
export type KnowledgeRevision<T> = {
  /** Monotonic, starting at 1. */
  revision: number;
  value: T;
  sources: SourceRef[];
  recordedOn: IsoDate;
  /** Who or what recorded it — an editor id, or "migration". */
  recordedBy: string;
  /** Plain-language description of what changed and why. */
  changeNote: string;
};

export type VersionedKnowledge<T> = {
  id: string;
  current: KnowledgeRevision<T>;
  history: KnowledgeRevision<T>[];
};

export function createVersioned<T>(
  id: string,
  initial: Omit<KnowledgeRevision<T>, "revision">
): VersionedKnowledge<T> {
  return { id, current: { ...initial, revision: 1 }, history: [] };
}

/** Appends a revision, moving the previous current value into history. */
export function addRevision<T>(
  versioned: VersionedKnowledge<T>,
  next: Omit<KnowledgeRevision<T>, "revision">
): VersionedKnowledge<T> {
  return {
    id: versioned.id,
    current: { ...next, revision: versioned.current.revision + 1 },
    history: [...versioned.history, versioned.current],
  };
}

export function revisionAt<T>(
  versioned: VersionedKnowledge<T>,
  revision: number
): KnowledgeRevision<T> | undefined {
  if (versioned.current.revision === revision) return versioned.current;
  return versioned.history.find((r) => r.revision === revision);
}
