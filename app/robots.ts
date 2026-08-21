import type { MetadataRoute } from "next";
import { site } from "../common/config/site";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = site.url;

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
