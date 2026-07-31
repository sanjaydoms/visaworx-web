import type { RAGSearchResult } from "./search-approved-content";
import type { AssistantPageContext } from "../types/assistant";

export function buildRetrievalContext(
  searchResult: RAGSearchResult,
  pageContext?: AssistantPageContext
): string {
  const parts: string[] = [];

  if (pageContext?.pageType) {
    parts.push(`Current Page Context: ${pageContext.pageType} (Country: ${pageContext.countrySlug || "N/A"}, Service: ${pageContext.serviceSlug || "N/A"}, Guide: ${pageContext.guideSlug || "N/A"})`);
  }

  if (searchResult.matchedCountries.length > 0) {
    parts.push("APPROVED COUNTRIES KNOWLEDGE:");
    for (const c of searchResult.matchedCountries.slice(0, 2)) {
      parts.push(`- ${c.name}: ${c.summary}. Overview: ${c.overview}`);
    }
  }

  if (searchResult.matchedServices.length > 0) {
    parts.push("APPROVED SERVICES KNOWLEDGE:");
    for (const s of searchResult.matchedServices.slice(0, 2)) {
      parts.push(`- ${s.title}: ${s.shortDescription}. Ideal For: ${s.idealFor.join("; ")}`);
    }
  }

  if (searchResult.matchedGuides.length > 0) {
    parts.push("APPROVED GUIDES KNOWLEDGE:");
    for (const g of searchResult.matchedGuides.slice(0, 2)) {
      parts.push(`- ${g.title}: ${g.summary}`);
    }
  }

  if (searchResult.matchedFaqs.length > 0) {
    parts.push("APPROVED FAQS KNOWLEDGE:");
    for (const f of searchResult.matchedFaqs.slice(0, 3)) {
      parts.push(`- Q: ${f.question} | A: ${f.answer}`);
    }
  }

  if (searchResult.matchedGlossary.length > 0) {
    parts.push("APPROVED GLOSSARY KNOWLEDGE:");
    for (const term of searchResult.matchedGlossary.slice(0, 3)) {
      parts.push(`- ${term.term}: ${term.definition}`);
    }
  }

  return parts.join("\n\n");
}
