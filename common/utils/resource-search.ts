import { guidesData, type Guide } from "../content/guides";
import { faqsData, type FAQItem } from "../content/faqs";
import { glossaryData, type GlossaryTermItem } from "../content/glossary";
import { countriesData, type Country } from "../content/countries";
import { servicesData, type Service } from "../content/services";

export type SearchResultItem =
  | { type: "guide"; item: Guide }
  | { type: "faq"; item: FAQItem }
  | { type: "glossary"; item: GlossaryTermItem }
  | { type: "country"; item: Country }
  | { type: "service"; item: Service };

export type SearchResults = {
  guides: Guide[];
  faqs: FAQItem[];
  glossary: GlossaryTermItem[];
  countries: Country[];
  services: Service[];
  totalCount: number;
};

export function searchResources(query: string): SearchResults {
  const q = query.trim().toLowerCase();

  if (!q) {
    return {
      guides: [],
      faqs: [],
      glossary: [],
      countries: [],
      services: [],
      totalCount: 0,
    };
  }

  const matchedGuides = guidesData.filter(
    (g) =>
      g.title.toLowerCase().includes(q) ||
      g.summary.toLowerCase().includes(q) ||
      g.category.toLowerCase().includes(q)
  );

  const matchedFaqs = faqsData.filter(
    (f) =>
      f.question.toLowerCase().includes(q) ||
      f.answer.toLowerCase().includes(q) ||
      f.category.toLowerCase().includes(q)
  );

  const matchedGlossary = glossaryData.filter(
    (term) =>
      term.term.toLowerCase().includes(q) ||
      term.definition.toLowerCase().includes(q)
  );

  const matchedCountries = countriesData.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.summary.toLowerCase().includes(q) ||
      (c.shortName && c.shortName.toLowerCase().includes(q))
  );

  const matchedServices = servicesData.filter(
    (s) =>
      s.title.toLowerCase().includes(q) ||
      s.shortDescription.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q)
  );

  const totalCount =
    matchedGuides.length +
    matchedFaqs.length +
    matchedGlossary.length +
    matchedCountries.length +
    matchedServices.length;

  return {
    guides: matchedGuides,
    faqs: matchedFaqs,
    glossary: matchedGlossary,
    countries: matchedCountries,
    services: matchedServices,
    totalCount,
  };
}
