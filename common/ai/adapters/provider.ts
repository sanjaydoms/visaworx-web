import type { AssistantRequestPayload, AssistantResponse } from "../types/assistant";
import { sanitizeUserInput, detectPromptInjection, getPromptInjectionRefusal, detectFraudOrMisrepresentation, getFraudRefusalResponse } from "../guardrails/safety-rules";
import { detectEscalationTopic, getEscalationResponse } from "../guardrails/escalation-rules";
import { searchApprovedContent } from "../retrieval/search-approved-content";
import { buildRetrievalContext } from "../retrieval/build-context";
import { assistantResponseSchema } from "../schemas/assistant-response";
import { routes } from "../../config/routes";

export async function processAssistantQuery(
  payload: AssistantRequestPayload
): Promise<AssistantResponse> {
  const cleanInput = sanitizeUserInput(payload.message);

  // 1. Guardrail: Prompt Injection Defense
  if (detectPromptInjection(cleanInput)) {
    return getPromptInjectionRefusal();
  }

  // 2. Guardrail: Fraud / Misrepresentation Refusal
  if (detectFraudOrMisrepresentation(cleanInput)) {
    return getFraudRefusalResponse();
  }

  // 3. Guardrail: Escalation Rules Trigger
  const escalationCheck = detectEscalationTopic(cleanInput);
  if (escalationCheck.shouldEscalate) {
    return getEscalationResponse(escalationCheck.reason);
  }

  // 4. Execute Retrieval over Approved Visaworx Content
  const ragResult = searchApprovedContent(cleanInput, payload.context);
  const retrievalContext = buildRetrievalContext(ragResult, payload.context);

  const apiKey = process.env.AI_API_KEY;

  // 5. External Provider Integration (if API key is configured)
  if (apiKey) {
    try {
      // Mock / real fetch logic
      const response = await fetch(process.env.AI_PROVIDER_ENDPOINT || "https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: process.env.AI_MODEL || "gpt-4o-mini",
          messages: [
            { role: "system", content: retrievalContext },
            { role: "user", content: cleanInput },
          ],
        }),
        signal: AbortSignal.timeout(Number(process.env.AI_TIMEOUT_MS) || 15000),
      });

      if (response.ok) {
        const json = await response.json();
        const rawContent = json.choices?.[0]?.message?.content;
        if (rawContent) {
          const parsed = assistantResponseSchema.safeParse(JSON.parse(rawContent));
          if (parsed.success) {
            return parsed.data;
          }
        }
      }
    } catch {
      // Fall through to deterministic fallback if API call fails or times out
    }
  }

  // 6. The query named a destination Visaworx holds no reviewed guidance for.
  //
  // This takes precedence over the generic fallback below even when other
  // content matched. "Mexico document requirements" retrieves the general
  // documentation guides, and answering from those alone would present
  // destination-agnostic material as if it described Mexico. The gap is stated
  // first; anything genuinely relevant is still offered underneath.
  if (ragResult.unpublishedDestinations.length > 0) {
    const destination = ragResult.unpublishedDestinations[0];
    const hasGeneralContent =
      ragResult.matchedServices.length > 0 ||
      ragResult.matchedGuides.length > 0 ||
      ragResult.matchedFaqs.length > 0;

    return {
      answer:
        `Visaworx supports consultations for ${destination.name}, but we have not published reviewed visa guidance for it yet, so I cannot describe its requirements.` +
        (hasGeneralContent
          ? " I can point you to general preparation material, though it is not specific to this destination."
          : ""),
      explanation:
        "Publishing requirements we have not verified against the official authority is how applicants end up preparing the wrong documents. A consultant can review the current rules with you instead.",
      sources: ragResult.sources,
      limitation: `Visaworx holds no reviewed ${destination.name} guidance. Confirm current requirements with the ${destination.officialSourceLabel}.`,
      nextSteps: [
        {
          label: `Speak to an expert about ${destination.name}`,
          href: `${routes.consultation}?source=assistant&topic=unpublished-destination`,
          type: "consultation",
        },
        { label: "Browse published destinations", href: routes.countriesList, type: "country" },
      ],
      escalation: { required: true, reason: "Destination without published guidance" },
    };
  }

  // 7. Deterministic Approved Fallback Engine (RAG-backed)
  if (ragResult.sources.length > 0) {
    const primarySource = ragResult.sources[0];
    return {
      answer: `Visaworx intelligence provides clear preparation guidance regarding "${cleanInput}".`,
      explanation: `Our approved content repository contains guidance and document checklists relevant to your query.`,
      sources: ragResult.sources,
      limitation: "Visaworx AI provides general educational guidance based on approved Visaworx content. It does not provide legal advice, determine eligibility, or guarantee visa approval.",
      nextSteps: [
        { label: `Explore ${primarySource.label}`, href: primarySource.href, type: primarySource.type as "country" | "service" | "guide" },
        { label: "Check My Readiness", href: routes.readiness, type: "readiness" },
        { label: "Speak to an Expert", href: `${routes.consultation}?source=assistant&topic=intelligence-query`, type: "consultation" },
      ],
      escalation: { required: false },
    };
  }

  // 8. Unsupported Query Fallback
  return {
    answer: "I do not have enough approved information to answer that confidently. A Visaworx expert can review your situation.",
    explanation: "Visaworx AI only responds using verified, approved content to prevent misinformation or unsupported claims.",
    sources: [
      { label: "Visa Intelligence Centre", href: routes.resourcesHub, type: "guide" },
    ],
    limitation: "Visaworx AI provides general educational guidance based on approved content.",
    nextSteps: [
      { label: "Explore Visa Guides", href: routes.guidesList, type: "guide" },
      { label: "Speak to an Expert", href: `${routes.consultation}?source=assistant&topic=unsupported-query`, type: "consultation" },
    ],
    escalation: { required: true, reason: "Unsupported query context" },
  };
}
