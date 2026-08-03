import type { RAGSearchResult } from "./search-approved-content";
import type { AssistantPageContext } from "../types/assistant";

/**
 * Upper bound on the retrieved context handed to the model. Retrieval is ranked,
 * so truncation drops the least relevant material first.
 */
const MAX_CONTEXT_CHARS = 6000;

/**
 * Render retrieved content as the model's grounding context.
 *
 * Two rules hold throughout: never emit a heading with nothing under it, and
 * never emit an empty field. A line reading "- Brazil: " invites the model to
 * fill the silence, which is exactly the fabrication the approved-content
 * architecture exists to prevent.
 */
export function buildRetrievalContext(
  searchResult: RAGSearchResult,
  pageContext?: AssistantPageContext
): string {
  const parts: string[] = [];

  if (pageContext?.pageType) {
    const details = [
      pageContext.countrySlug ? `country: ${pageContext.countrySlug}` : "",
      pageContext.serviceSlug ? `service: ${pageContext.serviceSlug}` : "",
      pageContext.guideSlug ? `guide: ${pageContext.guideSlug}` : "",
      pageContext.readinessBand ? `readiness band: ${pageContext.readinessBand}` : "",
    ].filter(Boolean);

    parts.push(
      details.length > 0
        ? `CURRENT PAGE CONTEXT: ${pageContext.pageType} (${details.join(", ")})`
        : `CURRENT PAGE CONTEXT: ${pageContext.pageType}`
    );
  }

  const countryLines = searchResult.matchedCountries
    .map((c) => line(c.name, [c.summary, c.overview]))
    .filter(Boolean);
  if (countryLines.length > 0) {
    parts.push(["APPROVED COUNTRY KNOWLEDGE:", ...countryLines].join("\n"));
  }

  const serviceLines = searchResult.matchedServices
    .map((s) =>
      line(s.title, [
        s.shortDescription,
        s.idealFor.length > 0 ? `Ideal for: ${s.idealFor.join("; ")}` : "",
      ])
    )
    .filter(Boolean);
  if (serviceLines.length > 0) {
    parts.push(["APPROVED SERVICE KNOWLEDGE:", ...serviceLines].join("\n"));
  }

  const guideLines = searchResult.matchedGuides
    .map((g) => line(g.title, [g.summary]))
    .filter(Boolean);
  if (guideLines.length > 0) {
    parts.push(["APPROVED GUIDE KNOWLEDGE:", ...guideLines].join("\n"));
  }

  const faqLines = searchResult.matchedFaqs
    .filter((f) => f.question && f.answer)
    .map((f) => `- Q: ${f.question}\n  A: ${f.answer}`);
  if (faqLines.length > 0) {
    parts.push(["APPROVED FAQ KNOWLEDGE:", ...faqLines].join("\n"));
  }

  const glossaryLines = searchResult.matchedGlossary
    .map((t) => line(t.term, [t.definition]))
    .filter(Boolean);
  if (glossaryLines.length > 0) {
    parts.push(["APPROVED GLOSSARY KNOWLEDGE:", ...glossaryLines].join("\n"));
  }

  // Stated explicitly rather than left as an absence, so the model reports the
  // gap instead of reasoning about the destination from general knowledge.
  if (searchResult.unpublishedDestinations.length > 0) {
    const names = searchResult.unpublishedDestinations.map((c) => c.name).join(", ");
    parts.push(
      [
        "DESTINATIONS WITHOUT PUBLISHED GUIDANCE:",
        `- ${names}: Visaworx recognises this destination and offers consultations for it, but holds NO reviewed guidance.`,
        "- Say that guidance is not published yet and route the traveller to a human expert. Do not supply requirements, timelines or fees for it from any other source.",
      ].join("\n")
    );
  }

  if (parts.length === 0) {
    return "NO APPROVED CONTENT MATCHED THIS QUERY. Say you do not have enough approved information and route the traveller to a Visaworx expert. Do not answer from general knowledge.";
  }

  const context = parts.join("\n\n");
  return context.length > MAX_CONTEXT_CHARS
    ? `${context.slice(0, MAX_CONTEXT_CHARS)}\n[context truncated]`
    : context;
}

function line(label: string, values: string[]): string {
  const body = values.map((v) => v?.trim()).filter(Boolean).join(". ");
  return body ? `- ${label}: ${body}` : "";
}
