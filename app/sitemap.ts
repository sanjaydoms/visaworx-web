import type { MetadataRoute } from "next";
import { countriesData } from "../common/content/countries";
import { servicesData } from "../common/content/services";
import { guidesData } from "../common/content/guides";
import { site } from "../common/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = site.url;

  const countryUrls = countriesData.map((country) => ({
    url: `${baseUrl}/countries/${country.slug}`,
    lastModified: new Date(country.lastReviewed || "2026-07-01"),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const serviceUrls = servicesData.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(service.lastReviewed || "2026-07-01"),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const guideUrls = guidesData.map((guide) => ({
    url: `${baseUrl}/resources/guides/${guide.slug}`,
    lastModified: new Date(guide.lastReviewed || "2026-07-01"),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/countries`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...countryUrls,
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...serviceUrls,
    {
      url: `${baseUrl}/readiness`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/resources/guides`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...guideUrls,
    {
      url: `${baseUrl}/resources/faqs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resources/glossary`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/consultation`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/assistant`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];
}




