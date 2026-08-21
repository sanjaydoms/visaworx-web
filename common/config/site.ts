/**
 * The absolute origin the site is served from, without a trailing slash.
 *
 * Single source for sitemap entries, robots.txt and the metadataBase that makes
 * every page canonical absolute. Getting this wrong is not cosmetic: a canonical
 * pointing at a domain that does not host the content tells Google to index a
 * page that is not there, so nothing gets indexed at all.
 *
 * Set NEXT_PUBLIC_SITE_URL per environment to whatever actually serves the app -
 * the preview deployment, staging, or the production domain once Visaworx is
 * mounted under it. The fallback is the intended production origin.
 */
const origin = (process.env.NEXT_PUBLIC_SITE_URL || "https://visaworx.klartravels.com").replace(
  /\/+$/,
  "",
);

export const site = {
  name: "Visaworx",
  parentBrand: "Klar Travels",
  basePath: "",
  tagline: "Visa Intelligence. Expert Guidance. Confident Journeys.",
  supportEmail: "support@klartravels.com",
  url: origin,
  klarTravelsUrl: "https://www.klartravels.com/",
  consultationUrl: "/consultation",
} as const;
