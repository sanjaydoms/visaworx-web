export const routes = {
  home: "/",
  countriesList: "/countries",
  countryDetail: (slug: string) => `/countries/${slug}`,
  servicesList: "/services",
  serviceDetail: (slug: string) => `/services/${slug}`,
  readiness: "/readiness",
  readinessResult: "/readiness/result",
  resourcesHub: "/resources",
  guidesList: "/resources/guides",
  guideDetail: (slug: string) => `/resources/guides/${slug}`,
  faqsPage: "/resources/faqs",
  glossaryPage: "/resources/glossary",
  consultation: "/consultation",
  consultationSuccess: "/consultation/success",
  assistant: "/assistant",
  services: "/services",
  countries: "/countries",
  resources: "/resources",
  faq: "/resources/faqs",
} as const;






