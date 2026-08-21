import type { MetadataRoute } from "next";
import { site } from "../common/config/site";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = site.url;

  return {
    rules: {
      userAgent: "*",
      allow: [
        "/",
        "/countries",
        "/countries/*",
        "/services",
        "/services/*",
        "/readiness",
        "/resources",
        "/resources/*",
        "/consultation",
        "/assistant",
      ],
      disallow: [
        "/readiness/result",
        "/consultation/success",
        "/api/*",
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
