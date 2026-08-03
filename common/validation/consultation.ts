import { z } from "zod";
import {
  CONTACT_FIELD_LIMITS,
  CONTACT_METHOD_OPTIONS,
  CONTACT_WINDOW_OPTIONS,
  PRIOR_REFUSAL_OPTIONS,
  SITUATION_SUMMARY_LIMITS,
  SOURCE_PAGE_TYPES,
  UNDECIDED_LABELS,
} from "../config/consultation";

export const consultationSchema = z
  .object({
    id: z.string().optional(),
    submittedAt: z.string().optional(),
    honeypot: z.string().max(0, "Bot detected").optional(),
    source: z.object({
      pageType: z.enum(SOURCE_PAGE_TYPES),
      sourcePath: z.string().optional(),
      countrySlug: z.string().optional(),
      serviceSlug: z.string().optional(),
      guideSlug: z.string().optional(),
      readinessBand: z.string().optional(),
    }),
    destination: z.object({
      countrySlug: z.string().optional(),
      undecided: z.boolean(),
    }),
    service: z.object({
      serviceSlug: z.string().optional(),
      undecided: z.boolean(),
    }),
    situation: z.object({
      travelTimeframe: z.string().optional(),
      summary: z
        .string()
        .min(
          SITUATION_SUMMARY_LIMITS.min,
          `Please describe your situation in at least ${SITUATION_SUMMARY_LIMITS.min} characters so the expert can prepare.`
        )
        .max(
          SITUATION_SUMMARY_LIMITS.max,
          `Situation summary cannot exceed ${SITUATION_SUMMARY_LIMITS.max.toLocaleString("en-US")} characters.`
        ),
      priorRefusal: z.enum(PRIOR_REFUSAL_OPTIONS),
      preferredLanguage: z.string().optional(),
    }),
    contact: z.object({
      fullName: z.string().min(CONTACT_FIELD_LIMITS.fullNameMin, "Enter your full name."),
      email: z.string().email("Enter a valid email address."),
      phone: z
        .string()
        .min(CONTACT_FIELD_LIMITS.phoneMin, "Enter a valid phone number with country code."),
      preferredMethod: z.enum(CONTACT_METHOD_OPTIONS),
      preferredWindow: z.enum(CONTACT_WINDOW_OPTIONS),
      preferredDate: z.string().optional(),
      preferredTime: z.string().optional(),
    }),
    consent: z.object({
      contactPermission: z.literal(true, {
        errorMap: () => ({ message: "Please confirm that Visaworx may contact you." }),
      }),
      privacyAccepted: z.literal(true, {
        errorMap: () => ({ message: "Please accept the privacy policy to proceed." }),
      }),
    }),
  })
  .refine(
    (data) => data.destination.undecided || Boolean(data.destination.countrySlug),
    {
      message: `Choose a destination or select "${UNDECIDED_LABELS.destination}."`,
      path: ["destination", "countrySlug"],
    }
  )
  .refine(
    (data) => data.service.undecided || Boolean(data.service.serviceSlug),
    {
      message: `Choose a service or select "${UNDECIDED_LABELS.service}."`,
      path: ["service", "serviceSlug"],
    }
  );

export type ConsultationFormInput = z.infer<typeof consultationSchema>;
