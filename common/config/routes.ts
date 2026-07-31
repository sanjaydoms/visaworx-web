export const routes = {
  home: "/visaworx",
  countriesList: "/visaworx/countries",
  countryDetail: (slug: string) => `/visaworx/countries/${slug}`,
  servicesList: "/visaworx/services",
  serviceDetail: (slug: string) => `/visaworx/services/${slug}`,
  readiness: "/visaworx/readiness",
  readinessResult: "/visaworx/readiness/result",
  resourcesHub: "/visaworx/resources",
  guidesList: "/visaworx/resources/guides",
  guideDetail: (slug: string) => `/visaworx/resources/guides/${slug}`,
  faqsPage: "/visaworx/resources/faqs",
  glossaryPage: "/visaworx/resources/glossary",
  consultation: "/visaworx/consultation",
  consultationSuccess: "/visaworx/consultation/success",
  services: "/visaworx/services",
  countries: "/visaworx/countries",
  resources: "/visaworx/resources",
  faq: "/visaworx/resources/faqs",
} as const;





