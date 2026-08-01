import type { Verified } from "../verification/types";
import type { FamilyRelationship } from "../family/types";

/**
 * Document requirements, grouped by who is responsible for producing them.
 *
 * The grouping is the point. Applicants routinely duplicate work (five bank
 * statements when one sponsor declaration was needed) or miss relationship
 * documents entirely, because generic checklists present one flat list.
 */
export type DocumentOwnership =
  /** One copy covers the whole group (e.g. an itinerary). */
  | "shared"
  /** Every traveller needs their own. */
  | "individual"
  /** Required from the lead applicant only. */
  | "primary-applicant"
  /** Required from a spouse or dependent. */
  | "spouse-or-dependent"
  /** Required for a minor traveller. */
  | "minor"
  /** Required from whoever is funding the trip. */
  | "sponsor";

export type DocumentCategory =
  | "identity"
  | "civil-status"
  | "financial"
  | "employment"
  | "education"
  | "travel-arrangements"
  | "accommodation"
  | "purpose-evidence"
  | "consent-and-authorisation"
  | "previous-travel-history";

export type DocumentRequirement = {
  id: string;
  label: string;
  category: DocumentCategory;
  ownership: DocumentOwnership;
  /** Free-text detail, always source-backed via the wrapping Verified<>. */
  detail: string;
  mandatory: boolean;
  /** Set when this requirement exists only because of a relationship. */
  triggeredByRelationship?: FamilyRelationship;
  /** Documented carve-outs, never inferred. */
  exceptions?: string[];
};

/** A document set is always verified as a whole, with its own provenance. */
export type DocumentSet = Verified<DocumentRequirement[]>;

export function groupByOwnership(
  requirements: DocumentRequirement[]
): Record<DocumentOwnership, DocumentRequirement[]> {
  const empty: Record<DocumentOwnership, DocumentRequirement[]> = {
    shared: [],
    individual: [],
    "primary-applicant": [],
    "spouse-or-dependent": [],
    minor: [],
    sponsor: [],
  };

  for (const req of requirements) empty[req.ownership].push(req);
  return empty;
}
