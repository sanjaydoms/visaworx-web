/**
 * The destinations the V2 engine knows exist.
 *
 * This file holds identity only — name, ISO code, region, and whether the
 * destination is a country or a travel area. It deliberately contains NO visa
 * requirements, checklists, timelines or fees. Those are verified knowledge and
 * live behind the verification gate; listing a destination here means "we can
 * resolve this name", not "we have guidance for it".
 *
 * Region is included because it is a stable geographic fact and useful for
 * grouping in search, not because it implies anything about visa policy.
 */
export type DestinationKind =
  /** A sovereign state with an ISO 3166-1 alpha-2 code. */
  | "country"
  /** A multi-country travel area sharing one visa regime. */
  | "area";

export type Region =
  | "north-america"
  | "latin-america"
  | "europe"
  | "middle-east"
  | "africa"
  | "south-asia"
  | "east-asia"
  | "southeast-asia"
  | "oceania"
  | "caucasus-central-asia";

export type Destination = {
  /** ISO 3166-1 alpha-2 for countries. Areas use an explicit non-ISO key. */
  code: string;
  name: string;
  kind: DestinationKind;
  region: Region;
  /** Slug of the existing V1 country page, where one exists. */
  legacySlug?: string;
  /**
   * Alternative names people actually type. Search must match "Schengen",
   * "UK" and "USA" - nobody types "Schengen Area" or "United Kingdom" in full.
   */
  aliases?: string[];
};

/**
 * Fifty destinations covering the highest-volume outbound visa routes.
 *
 * The ten carrying `legacySlug` are those with existing Visaworx content; the
 * other forty are identity records only, so the engine can recognise and route
 * a query about them while honestly reporting that no verified guidance is held.
 */
export const destinations: Destination[] = [
  // North America
  { code: "US", name: "United States", kind: "country", region: "north-america", legacySlug: "united-states", aliases: ["usa", "u.s.", "america", "united states of america"] },
  { code: "CA", name: "Canada", kind: "country", region: "north-america", legacySlug: "canada" },
  { code: "MX", name: "Mexico", kind: "country", region: "north-america" },

  // Europe
  { code: "GB", name: "United Kingdom", kind: "country", region: "europe", legacySlug: "united-kingdom", aliases: ["uk", "britain", "great britain", "england"] },
  // Not a country: a 29-state travel area. Modelled explicitly rather than
  // forced into a country code, which is what broke the V1 mapping.
  { code: "SCHENGEN", name: "Schengen Area", kind: "area", region: "europe", legacySlug: "schengen", aliases: ["schengen", "europe visa", "eu visa"] },
  { code: "IE", name: "Ireland", kind: "country", region: "europe" },
  { code: "TR", name: "Turkey", kind: "country", region: "europe" },

  // Oceania
  { code: "AU", name: "Australia", kind: "country", region: "oceania", legacySlug: "australia" },
  { code: "NZ", name: "New Zealand", kind: "country", region: "oceania", legacySlug: "new-zealand", aliases: ["nz"] },

  // Middle East
  { code: "AE", name: "United Arab Emirates", kind: "country", region: "middle-east", legacySlug: "united-arab-emirates", aliases: ["uae", "emirates", "dubai", "abu dhabi"] },
  { code: "SA", name: "Saudi Arabia", kind: "country", region: "middle-east" },
  { code: "QA", name: "Qatar", kind: "country", region: "middle-east" },
  { code: "KW", name: "Kuwait", kind: "country", region: "middle-east" },
  { code: "BH", name: "Bahrain", kind: "country", region: "middle-east" },
  { code: "OM", name: "Oman", kind: "country", region: "middle-east" },
  { code: "JO", name: "Jordan", kind: "country", region: "middle-east" },
  { code: "IL", name: "Israel", kind: "country", region: "middle-east" },

  // East Asia
  { code: "JP", name: "Japan", kind: "country", region: "east-asia", legacySlug: "japan" },
  { code: "KR", name: "South Korea", kind: "country", region: "east-asia", legacySlug: "south-korea", aliases: ["korea"] },
  { code: "CN", name: "China", kind: "country", region: "east-asia" },
  { code: "HK", name: "Hong Kong", kind: "country", region: "east-asia" },
  { code: "TW", name: "Taiwan", kind: "country", region: "east-asia" },

  // Southeast Asia
  { code: "SG", name: "Singapore", kind: "country", region: "southeast-asia", legacySlug: "singapore" },
  { code: "TH", name: "Thailand", kind: "country", region: "southeast-asia" },
  { code: "MY", name: "Malaysia", kind: "country", region: "southeast-asia" },
  { code: "ID", name: "Indonesia", kind: "country", region: "southeast-asia" },
  { code: "VN", name: "Vietnam", kind: "country", region: "southeast-asia" },
  { code: "PH", name: "Philippines", kind: "country", region: "southeast-asia" },

  // South Asia
  { code: "IN", name: "India", kind: "country", region: "south-asia" },
  { code: "LK", name: "Sri Lanka", kind: "country", region: "south-asia" },
  { code: "NP", name: "Nepal", kind: "country", region: "south-asia" },
  { code: "BD", name: "Bangladesh", kind: "country", region: "south-asia" },
  { code: "PK", name: "Pakistan", kind: "country", region: "south-asia" },
  { code: "MV", name: "Maldives", kind: "country", region: "south-asia" },

  // Africa
  { code: "ZA", name: "South Africa", kind: "country", region: "africa", aliases: ["sa"] },
  { code: "EG", name: "Egypt", kind: "country", region: "africa" },
  { code: "MA", name: "Morocco", kind: "country", region: "africa" },
  { code: "KE", name: "Kenya", kind: "country", region: "africa" },
  { code: "TZ", name: "Tanzania", kind: "country", region: "africa" },
  { code: "NG", name: "Nigeria", kind: "country", region: "africa" },
  { code: "GH", name: "Ghana", kind: "country", region: "africa" },
  { code: "MU", name: "Mauritius", kind: "country", region: "africa" },

  // Latin America
  { code: "BR", name: "Brazil", kind: "country", region: "latin-america" },
  { code: "AR", name: "Argentina", kind: "country", region: "latin-america" },
  { code: "CL", name: "Chile", kind: "country", region: "latin-america" },
  { code: "CO", name: "Colombia", kind: "country", region: "latin-america" },
  { code: "PE", name: "Peru", kind: "country", region: "latin-america" },

  // Caucasus and Central Asia
  { code: "GE", name: "Georgia", kind: "country", region: "caucasus-central-asia" },
  { code: "AZ", name: "Azerbaijan", kind: "country", region: "caucasus-central-asia" },
  { code: "UZ", name: "Uzbekistan", kind: "country", region: "caucasus-central-asia" },
];

export function findDestinationByCode(code: string): Destination | undefined {
  return destinations.find((d) => d.code === code.toUpperCase());
}

export function findDestinationBySlug(slug: string): Destination | undefined {
  return destinations.find((d) => d.legacySlug === slug);
}

/** Destinations that already have published Visaworx content. */
export function destinationsWithContent(): Destination[] {
  return destinations.filter((d) => Boolean(d.legacySlug));
}

/** Destinations recognised but with no published content yet. */
export function destinationsAwaitingContent(): Destination[] {
  return destinations.filter((d) => !d.legacySlug);
}
