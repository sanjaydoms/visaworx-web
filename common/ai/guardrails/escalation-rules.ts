import type { AssistantResponse } from "../types/assistant";
import { routes } from "../../config/routes";

export function detectEscalationTopic(input: string): { shouldEscalate: boolean; reason?: string } {
  const lower = input.toLowerCase();

  if (
    lower.includes("chance of approval") ||
    lower.includes("approval percentage") ||
    lower.includes("probability of getting visa") ||
    lower.includes("will i get approved") ||
    lower.includes("guarantee approval") ||
    lower.includes("success rate")
  ) {
    return { shouldEscalate: true, reason: "Approval probability request" };
  }

  if (
    lower.includes("am i eligible") ||
    lower.includes("can i definitely apply") ||
    lower.includes("qualify for visa")
  ) {
    return { shouldEscalate: true, reason: "Personal eligibility determination" };
  }

  // A disclosed refusal must reach a human. The literal phrases below were too
  // narrow - "I have a prior refusal from 2024" matched none of them, and only
  // escalated because retrieval happened to return nothing and the unsupported
  // branch escalates too. Once retrieval started finding refusal content, that
  // accident stopped holding, so the intent is now expressed directly.
  if (
    lower.includes("214(b)") ||
    lower.includes("refusal letter") ||
    /\b(prior|previous|past|earlier|my|a)\s+(visa\s+)?(refusal|rejection)\b/.test(lower) ||
    /\b(was|been|got|were)\s+(refused|rejected|denied)\b/.test(lower) ||
    /\bvisa\s+(refusal|was\s+(refused|rejected|denied))\b/.test(lower) ||
    /\breappl\w*\s+after\s+(a\s+)?(refusal|rejection)\b/.test(lower)
  ) {
    return { shouldEscalate: true, reason: "Previous visa refusal" };
  }

  if (
    lower.includes("criminal record") ||
    lower.includes("arrest history") ||
    lower.includes("overstayed") ||
    lower.includes("deported") ||
    lower.includes("unlawful presence")
  ) {
    return { shouldEscalate: true, reason: "Complex legal/immigration history" };
  }

  return { shouldEscalate: false };
}

export function getEscalationResponse(reason = "Complex situation requiring human review"): AssistantResponse {
  return {
    answer: "This situation needs individual review. I can help you find the relevant guide, but a Visaworx expert should assess the details before you proceed.",
    explanation: `Questions regarding ${reason.toLowerCase()} depend on individual personal circumstances, consular discretion, and home-country ties that require professional human review.`,
    sources: [
      { label: "Understanding Visa Refusal Reasons", href: routes.guideDetail("understanding-visa-refusal-reasons"), type: "guide" },
      { label: "Visa Readiness Review Service", href: routes.serviceDetail("visa-readiness-review"), type: "service" },
    ],
    limitation: "AI assistants cannot predict embassy decisions, calculate percentage probabilities, or evaluate legal eligibility.",
    nextSteps: [
      { label: "Speak to an Expert", href: `${routes.consultation}?source=assistant&topic=expert-review`, type: "consultation" },
      { label: "Check My Readiness", href: routes.readiness, type: "readiness" },
    ],
    escalation: { required: true, reason },
  };
}
