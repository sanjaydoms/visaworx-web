import { z } from "zod";

export const sourceItemSchema = z.object({
  label: z.string(),
  href: z.string(),
  type: z.enum(["country", "service", "guide", "faq", "official-reference"]),
});

export const nextStepItemSchema = z.object({
  label: z.string(),
  href: z.string(),
  type: z.enum(["readiness", "consultation", "country", "service", "guide"]),
});

export const assistantResponseSchema = z.object({
  answer: z.string(),
  explanation: z.string().optional(),
  sources: z.array(sourceItemSchema).default([]),
  limitation: z.string().optional(),
  nextSteps: z.array(nextStepItemSchema).default([]),
  escalation: z
    .object({
      required: z.boolean(),
      reason: z.string().optional(),
    })
    .optional(),
});
