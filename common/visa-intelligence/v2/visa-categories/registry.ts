import type { TravelPurpose } from "../types/journey";
import type { KnowledgeResult } from "../types/core";
import { unavailable, GAP_GUIDANCE, available } from "../types/core";

/**
 * Visa categories in the V2 model.
 *
 * These are Visaworx's own navigational groupings ("study", "tourism"), not
 * legal visa classes. That distinction is deliberate: naming a specific class
 * such as F-1 or Subclass 500 as applicable to a person is an eligibility
 * determination, which the product rules reserve for human experts. The engine
 * resolves to a category to explore, never to a class the applicant qualifies
 * for.
 */
export type VisaCategory = {
  id: string;
  label: string;
  purpose: TravelPurpose;
  /** Slug of the matching V1 service page, for linking rather than duplication. */
  legacyServiceSlug?: string;
  description: string;
};

export const visaCategoryRegistry: VisaCategory[] = [
  {
    id: "cat-tourist",
    label: "Tourism and visitor travel",
    purpose: "tourism",
    legacyServiceSlug: "tourist-visa",
    description: "Short-stay leisure or visitor travel.",
  },
  {
    id: "cat-business",
    label: "Business travel",
    purpose: "business",
    legacyServiceSlug: "business-visa",
    description: "Meetings, conferences and short-term business activity.",
  },
  {
    id: "cat-student",
    label: "Study",
    purpose: "study",
    legacyServiceSlug: "student-visa",
    description: "Enrolment at an educational institution abroad.",
  },
  {
    id: "cat-work",
    label: "Work",
    purpose: "work",
    legacyServiceSlug: "work-visa",
    description: "Employment or assignment in the destination country.",
  },
  {
    id: "cat-family",
    label: "Family visit",
    purpose: "family-visit",
    legacyServiceSlug: "family-visa",
    description: "Visiting relatives, including sponsored family travel.",
  },
];

export function findCategoryById(id: string): VisaCategory | undefined {
  return visaCategoryRegistry.find((c) => c.id === id);
}

export function findCategoryByPurpose(purpose: TravelPurpose): VisaCategory | undefined {
  return visaCategoryRegistry.find((c) => c.purpose === purpose);
}

/**
 * Resolves a travel purpose to a category to explore.
 *
 * Purposes with no modelled category (transit, medical) return an explicit gap
 * rather than being quietly mapped to the nearest-looking category.
 */
export function resolveCategory(purpose: TravelPurpose): KnowledgeResult<VisaCategory> {
  const found = findCategoryByPurpose(purpose);
  if (!found) {
    return unavailable(
      "not-modelled",
      `Visaworx does not yet model a visa category for ${purpose} travel. ${GAP_GUIDANCE["not-modelled"]}`
    );
  }
  return available(found);
}
