import { z } from "zod";

export const consultationSchema = z
  .object({
    id: z.string().optional(),
    submittedAt: z.string().optional(),
    honeypot: z.string().max(0, "Bot detected").optional(),
    source: z.object({
      pageType: z.enum(["homepage", "country", "service", "readiness", "guide", "direct", "other"]),
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
        .min(20, "Please describe your situation in at least 20 characters so the expert can prepare.")
        .max(1000, "Situation summary cannot exceed 1,000 characters."),
      priorRefusal: z.enum(["yes", "no", "prefer-not-to-say"]),
      preferredLanguage: z.string().optional(),
    }),
    contact: z.object({
      fullName: z.string().min(2, "Enter your full name."),
      email: z.string().email("Enter a valid email address."),
      phone: z.string().min(7, "Enter a valid phone number with country code."),
      preferredMethod: z.enum(["phone", "whatsapp", "email"]),
      preferredWindow: z.enum(["morning", "afternoon", "evening", "no-preference"]),
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
      message: 'Choose a destination or select "Not decided yet."',
      path: ["destination", "countrySlug"],
    }
  )
  .refine(
    (data) => data.service.undecided || Boolean(data.service.serviceSlug),
    {
      message: 'Choose a service or select "Not sure yet."',
      path: ["service", "serviceSlug"],
    }
  );

export type ConsultationFormInput = z.infer<typeof consultationSchema>;
