import type { MetadataRoute } from "next";
import { countriesData } from "../common/content/countries";
import { servicesData } from "../common/content/services";
import { guidesData } from "../common/content/guides";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.klartravels.com";

  const countryUrls = countriesData.map((country) => ({
    url: `${baseUrl}/visaworx/countries/${country.slug}`,
    lastModified: new Date(country.lastReviewed || "2026-07-01"),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const serviceUrls = servicesData.map((service) => ({
    url: `${baseUrl}/visaworx/services/${service.slug}`,
    lastModified: new Date(service.lastReviewed || "2026-07-01"),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const guideUrls = guidesData.map((guide) => ({
    url: `${baseUrl}/visaworx/resources/guides/${guide.slug}`,
    lastModified: new Date(guide.lastReviewed || "2026-07-01"),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: `${baseUrl}/visaworx`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/visaworx/countries`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...countryUrls,
    {
      url: `${baseUrl}/visaworx/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...serviceUrls,
    {
      url: `${baseUrl}/visaworx/resources`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/visaworx/resources/guides`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...guideUrls,
    {
      url: `${baseUrl}/visaworx/resources/faqs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/visaworx/resources/glossary`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/visaworx/consultation`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/visaworx/assistant`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];
}




