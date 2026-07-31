export const routes = {
  home: "/visaworx",
  countriesList: "/visaworx/countries",
  countryDetail: (slug: string) => `/visaworx/countries/${slug}`,
  readiness: "/visaworx/readiness",
  readinessResult: "/visaworx/readiness/result",
  services: "/visaworx#services",
  countries: "/visaworx/countries",
  resources: "/visaworx#resources",
  faq: "/visaworx#faq",
  consultation: "/visaworx#consultation",
} as const;


