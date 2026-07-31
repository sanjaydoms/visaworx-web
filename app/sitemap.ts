import type { MetadataRoute } from "next";
import { countriesData } from "../common/content/countries";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.klartravels.com";

  const countryUrls = countriesData.map((country) => ({
    url: `${baseUrl}/visaworx/countries/${country.slug}`,
    lastModified: new Date(country.lastReviewed || "2026-07-01"),
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
  ];
}
