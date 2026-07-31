export const routes = {
  home: "/visaworx",
  countriesList: "/visaworx/countries",
  countryDetail: (slug: string) => `/visaworx/countries/${slug}`,
  services: "/visaworx#services",
  countries: "/visaworx/countries",
  readiness: "/visaworx#readiness",
  resources: "/visaworx#resources",
  faq: "/visaworx#faq",
  consultation: "/visaworx#consultation",
} as const;

