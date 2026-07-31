import { countriesData } from "../../content/countries";
import { servicesData } from "../../content/services";
import { guidesData } from "../../content/guides";
import { faqsData } from "../../content/faqs";
import { glossaryData } from "../../content/glossary";
import { searchResources } from "../../utils/resource-search";
import type { SourceItem } from "../types/assistant";
import { routes } from "../../config/routes";

export type RAGSearchResult = {
  matchedCountries: typeof countriesData;
  matchedServices: typeof servicesData;
  matchedGuides: typeof guidesData;
  matchedFaqs: typeof faqsData;
  matchedGlossary: typeof glossaryData;
  sources: SourceItem[];
};

export function searchApprovedContent(query: string): RAGSearchResult {
  const rawResults = searchResources(query);
  const sources: SourceItem[] = [];

  // Match countries
  for (const c of rawResults.countries.slice(0, 2)) {
    sources.push({
      label: `${c.name} Visa Guide`,
      href: routes.countryDetail(c.slug),
      type: "country",
    });
  }

  // Match services
  for (const s of rawResults.services.slice(0, 2)) {
    sources.push({
      label: s.title,
      href: routes.serviceDetail(s.slug),
      type: "service",
    });
  }

  // Match guides
  for (const g of rawResults.guides.slice(0, 2)) {
    sources.push({
      label: g.title,
      href: routes.guideDetail(g.slug),
      type: "guide",
    });
  }

  // Match FAQs
  if (rawResults.faqs.length > 0) {
    sources.push({
      label: "Visaworx FAQ Base",
      href: routes.faqsPage,
      type: "faq",
    });
  }

  return {
    matchedCountries: rawResults.countries,
    matchedServices: rawResults.services,
    matchedGuides: rawResults.guides,
    matchedFaqs: rawResults.faqs,
    matchedGlossary: rawResults.glossary,
    sources,
  };
}
