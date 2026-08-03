/**
 * Behavioural configuration for the consultation flow.
 *
 * Copy lives in `common/content/consultation.ts`; this file holds the rules the
 * flow enforces - field limits, allowed option values, step bounds and the
 * session key. These were previously duplicated across the Zod schema, the
 * flow hook and the page, where the three could drift apart: the schema and
 * the textarea could disagree about the character limit and the applicant
 * would only find out at submit time.
 */

/**
 * Free-text limits for the situation summary. Both bounds are surfaced to the
 * applicant in the character counter and enforced by the schema.
 */
export const SITUATION_SUMMARY_LIMITS = {
  min: 20,
  max: 1000,
} as const;

/** Minimum lengths for contact fields. Format is validated separately. */
export const CONTACT_FIELD_LIMITS = {
  fullNameMin: 2,
  phoneMin: 7,
} as const;

/**
 * Progress is held in sessionStorage under this key and cleared on successful
 * submission. Personal data (contact details, consent) is deliberately never
 * written to it - see `toStorableProgress` in the flow hook.
 */
export const CONSULTATION_SESSION_KEY = "visaworx_consultation_form";

/** Step bounds for the five-step flow: destination, service, situation, contact, review. */
export const CONSULTATION_FIRST_STEP = 1;
export const CONSULTATION_LAST_STEP = 5;

/** Applied when the applicant expresses no preference. */
export const CONSULTATION_DEFAULT_LANGUAGE = "English";

/**
 * Entry points that may preselect context via query parameters. Anything else
 * is recorded as `direct`.
 */
export const SOURCE_PAGE_TYPES = [
  "homepage",
  "country",
  "service",
  "readiness",
  "guide",
  "direct",
  "other",
] as const;

/**
 * Prior refusal deliberately offers an opt-out. A refusal is sensitive and the
 * applicant may prefer to raise it with a human rather than a form.
 *
 * Order is the approved on-screen order, since the step renders these directly.
 */
export const PRIOR_REFUSAL_OPTIONS = ["no", "yes", "prefer-not-to-say"] as const;

export const CONTACT_METHOD_OPTIONS = ["phone", "whatsapp", "email"] as const;

export const CONTACT_WINDOW_OPTIONS = [
  "morning",
  "afternoon",
  "evening",
  "no-preference",
] as const;

/**
 * Both selection steps are required, but "undecided" is a valid answer - an
 * applicant who does not yet know their destination still deserves a
 * consultation. These labels are referenced in validation messages and in the
 * review summary, so they must read identically in both.
 */
export const UNDECIDED_LABELS = {
  destination: "Not decided yet",
  service: "Not sure yet",
} as const;

export type SourcePageType = (typeof SOURCE_PAGE_TYPES)[number];
export type PriorRefusalOption = (typeof PRIOR_REFUSAL_OPTIONS)[number];
export type ContactMethodOption = (typeof CONTACT_METHOD_OPTIONS)[number];
export type ContactWindowOption = (typeof CONTACT_WINDOW_OPTIONS)[number];
