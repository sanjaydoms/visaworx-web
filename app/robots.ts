import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://www.klartravels.com";

  return {
    rules: {
      userAgent: "*",
      allow: [
        "/visaworx",
        "/visaworx/countries",
        "/visaworx/countries/*",
        "/visaworx/services",
        "/visaworx/services/*",
        "/visaworx/readiness",
        "/visaworx/resources",
        "/visaworx/resources/*",
        "/visaworx/consultation",
        "/visaworx/assistant",
      ],
      disallow: [
        "/visaworx/readiness/result",
        "/visaworx/consultation/success",
        "/api/*",
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
