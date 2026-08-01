import type { KnowledgeResult } from "../types/core";
import type { SourceRef } from "../sources/types";
import type { IsoDate } from "../types/core";

/**
 * Scenario-aware coaching layer for the AI assistant.
 *
 * The V1 assistant answered from whatever approved content matched the words in
 * a question. That is fine for "what is a B1 visa" and wrong for "what size
 * photo do I need", because the second question has a precise answer that
 * depends on context the user has not given.
 *
 * This layer's job is to decide, before any model call, whether the question
 * can be answered at all: whether it needs more context, whether it must be
 * escalated to a human, and which verified facts may be cited.
 */

/** Questions with an exact answer that depends on unstated context. */
export type ExactQuestionTopic =
  | "photo-specification"
  | "biometrics"
  | "fees"
  | "processing-time"
  | "document-list";

export type CoachDecision =
  | { kind: "answer"; requiredFacts: ExactQuestionTopic[] }
  | { kind: "clarify"; topic: ExactQuestionTopic; missingContext: string[]; question: string }
  | { kind: "escalate"; reason: string }
  | { kind: "refuse"; reason: string };

/** Context the coach must have before answering an exact question. */
const REQUIRED_CONTEXT: Record<ExactQuestionTopic, string[]> = {
  "photo-specification": ["destination", "visa category", "who the photo is for", "how you will submit"],
  biometrics: ["destination", "visa category", "age of the applicant"],
  fees: ["destination", "visa category", "where you are applying"],
  "processing-time": ["destination", "visa category", "where you are applying"],
  "document-list": ["destination", "visa category", "who is travelling"],
};

const TOPIC_PATTERNS: Array<[ExactQuestionTopic, RegExp]> = [
  ["photo-specification", /\bphoto|photograph|picture\b.*\b(size|dimension|mm|pixel|background)\b|\b(size|dimension|background)\b.*\bphoto/i],
  ["biometrics", /\bbiometric|fingerprint|finger print\b/i],
  ["fees", /\bfee|cost|price|how much\b/i],
  ["processing-time", /\bhow long|processing time|take to process|turnaround\b/i],
  ["document-list", /\bwhat documents|document list|documents.*(need|require)\b/i],
];

export function detectExactTopic(question: string): ExactQuestionTopic | null {
  for (const [topic, pattern] of TOPIC_PATTERNS) {
    if (pattern.test(question)) return topic;
  }
  return null;
}

/**
 * Decides how to handle a question.
 *
 * An exact question with missing context produces a clarifying question rather
 * than a general answer, because a general answer to "what size photo" reads as
 * authoritative and gets acted on.
 */
export function decide(input: {
  question: string;
  knownContext: Record<string, string | undefined>;
}): CoachDecision {
  const topic = detectExactTopic(input.question);
  if (!topic) return { kind: "answer", requiredFacts: [] };

  const missing = REQUIRED_CONTEXT[topic].filter((needed) => {
    const key = needed.split(" ")[0].toLowerCase();
    return !input.knownContext[key];
  });

  if (missing.length > 0) {
    return {
      kind: "clarify",
      topic,
      missingContext: missing,
      question: buildClarifyingQuestion(topic, missing),
    };
  }

  return { kind: "answer", requiredFacts: [topic] };
}

function buildClarifyingQuestion(topic: ExactQuestionTopic, missing: string[]): string {
  const list =
    missing.length === 1
      ? missing[0]
      : `${missing.slice(0, -1).join(", ")} and ${missing[missing.length - 1]}`;

  const subject: Record<ExactQuestionTopic, string> = {
    "photo-specification": "Photo requirements differ by country, visa type, applicant age and how you submit",
    biometrics: "Biometric requirements differ by country, visa type and age",
    fees: "Fees differ by country, visa type and where you apply",
    "processing-time": "Processing times differ by country, visa type and where you apply",
    "document-list": "Document requirements differ by country, visa type and who is travelling",
  };

  return `${subject[topic]}. Could you tell me your ${list}?`;
}

/**
 * Wraps an answer with its provenance.
 *
 * A coached answer can only be produced from resolved knowledge, so an answer
 * without a source and a verification date is unrepresentable.
 */
export type CoachedAnswer = {
  text: string;
  sources: SourceRef[];
  lastVerified: IsoDate;
  /** Always present, so currency is never implied to be better than it is. */
  currencyNote: string;
  /** Shown whenever the answer touches an exact requirement. */
  verifyWithAuthority: boolean;
};

export function toCoachedAnswer(
  text: string,
  knowledge: { sources: SourceRef[]; lastVerified: IsoDate },
  isExactRequirement: boolean
): CoachedAnswer {
  return {
    text,
    sources: knowledge.sources,
    lastVerified: knowledge.lastVerified,
    currencyNote: `Last verified ${knowledge.lastVerified}. Requirements can change without notice.`,
    verifyWithAuthority: isExactRequirement,
  };
}

/** Turns a knowledge gap into an honest reply instead of a guess. */
export function gapToReply(gap: Extract<KnowledgeResult<unknown>, { available: false }>): string {
  const suffix =
    gap.missingContext && gap.missingContext.length > 0
      ? ` To narrow this down I would need: ${gap.missingContext.join(", ")}.`
      : "";
  return `${gap.guidance}${suffix}`;
}
