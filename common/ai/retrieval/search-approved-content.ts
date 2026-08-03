import { countriesData, isPublished, type Country } from "../../content/countries";
import { servicesData, type Service } from "../../content/services";
import { guidesData, type Guide } from "../../content/guides";
import { faqsData, type FAQItem } from "../../content/faqs";
import { glossaryData, type GlossaryTermItem } from "../../content/glossary";
import type { AssistantPageContext, SourceItem } from "../types/assistant";
import { routes } from "../../config/routes";
import { rank, tokenize, type Scored } from "./relevance";

/** Per-type caps. The context window is finite; relevance beats volume. */
const LIMITS = {
  countries: 2,
  services: 2,
  guides: 3,
  faqs: 3,
  glossary: 3,
} as const;

export type RAGSearchResult = {
  matchedCountries: Country[];
  matchedServices: Service[];
  matchedGuides: Guide[];
  matchedFaqs: FAQItem[];
  matchedGlossary: GlossaryTermItem[];

  /**
   * Destinations the query named that Visaworx recognises but holds no reviewed
   * guidance for. Kept separate from matchedCountries so their empty content is
   * never presented as knowledge - the assistant must say guidance is not
   * published rather than answer from nothing.
   */
  unpublishedDestinations: Country[];

  sources: SourceItem[];
};

const EMPTY: RAGSearchResult = {
  matchedCountries: [],
  matchedServices: [],
  matchedGuides: [],
  matchedFaqs: [],
  matchedGlossary: [],
  unpublishedDestinations: [],
  sources: [],
};

/**
 * Retrieve approved Visaworx content relevant to a query.
 *
 * Page context contributes terms - a question asked on the Canada page is about
 * Canada even when the user does not repeat the word - but never invents a
 * match on its own: an empty query retrieves nothing regardless of context.
 */
export function searchApprovedContent(
  query: string,
  context?: AssistantPageContext
): RAGSearchResult {
  const queryTerms = tokenize(query);
  if (queryTerms.length === 0) return { ...EMPTY };

  const terms = [...new Set([...queryTerms, ...contextTerms(context)])];

  const countries = rank(
    countriesData,
    terms,
    (c) => [
      { text: c.name, weight: 3 },
      { text: c.shortName || "", weight: 3 },
      { text: c.summary, weight: 1.5 },
      { text: c.overview, weight: 1 },
    ],
    LIMITS.countries + 2
  );

  // Split before capping so a recognised-but-unpublished destination cannot
  // crowd out a published one that actually carries guidance.
  const publishedCountries = countries.filter((c) => isPublished(c.item)).slice(0, LIMITS.countries);
  const unpublished = countries.filter((c) => !isPublished(c.item)).slice(0, LIMITS.countries);

  const services = rank(
    servicesData,
    terms,
    (s) => [
      { text: s.title, weight: 3 },
      { text: s.shortDescription, weight: 2 },
      { text: s.category, weight: 1.5 },
      { text: s.idealFor.join(" "), weight: 1 },
      { text: s.outcomes.join(" "), weight: 1 },
    ],
    LIMITS.services
  );

  const guides = rank(
    guidesData,
    terms,
    (g) => [
      { text: g.title, weight: 3 },
      { text: g.summary, weight: 2 },
      { text: g.category, weight: 1.5 },
    ],
    LIMITS.guides
  );

  const faqs = rank(
    faqsData,
    terms,
    (f) => [
      { text: f.question, weight: 3 },
      { text: f.answer, weight: 1.5 },
      { text: f.category, weight: 1 },
    ],
    LIMITS.faqs
  );

  const glossary = rank(
    glossaryData,
    terms,
    (t) => [
      { text: t.term, weight: 3 },
      { text: t.definition, weight: 1.5 },
    ],
    LIMITS.glossary
  );

  return {
    matchedCountries: unwrap(publishedCountries),
    matchedServices: unwrap(services),
    matchedGuides: unwrap(guides),
    matchedFaqs: unwrap(faqs),
    matchedGlossary: unwrap(glossary),
    unpublishedDestinations: unwrap(unpublished),
    sources: buildSources(publishedCountries, services, guides, faqs, unpublished),
  };
}

function unwrap<T>(scored: Scored<T>[]): T[] {
  return scored.map((s) => s.item);
}

function contextTerms(context?: AssistantPageContext): string[] {
  if (!context) return [];
  return tokenize(
    [context.countrySlug, context.serviceSlug, context.guideSlug]
      .filter(Boolean)
      .join(" ")
      .replace(/-/g, " ")
  );
}

/**
 * Citations, ordered by relevance across types so the strongest match leads
 * regardless of which content type it came from.
 */
function buildSources(
  countries: Scored<Country>[],
  services: Scored<Service>[],
  guides: Scored<Guide>[],
  faqs: Scored<FAQItem>[],
  unpublished: Scored<Country>[]
): SourceItem[] {
  const scored: Array<{ score: number; source: SourceItem }> = [];

  for (const { item, score } of countries) {
    scored.push({
      score,
      source: { label: `${item.name} Visa Guide`, href: routes.countryDetail(item.slug), type: "country" },
    });
  }

  for (const { item, score } of services) {
    scored.push({
      score,
      source: { label: item.title, href: routes.serviceDetail(item.slug), type: "service" },
    });
  }

  for (const { item, score } of guides) {
    scored.push({
      score,
      source: { label: item.title, href: routes.guideDetail(item.slug), type: "guide" },
    });
  }

  // Unpublished destinations are still worth linking - the page states plainly
  // that guidance is not published and offers a consultant - but they rank
  // below anything carrying real content.
  for (const { item, score } of unpublished) {
    scored.push({
      score: score - 1,
      source: { label: `${item.name} consultation`, href: routes.countryDetail(item.slug), type: "country" },
    });
  }

  if (faqs.length > 0) {
    scored.push({
      score: faqs[0].score - 0.5,
      source: { label: "Visaworx FAQ Base", href: routes.faqsPage, type: "faq" },
    });
  }

  return scored.sort((a, b) => b.score - a.score).map((s) => s.source);
}
