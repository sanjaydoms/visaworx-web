import type { CountryCode } from "../types/core";

/**
 * Multi-tenant configuration scaffolding.
 *
 * NOTE FOR REVIEW: this conflicts with PROJECT.md, which states that Visaworx
 * is an embedded Klar Travels vertical and "not a standalone website". Licensing
 * the engine to other brands is a product-strategy change that needs an ADR and
 * business sign-off, not just an implementation. This module therefore defines
 * the shape only: it is not exported from the package index, no route reads it,
 * and no tenant UI exists.
 *
 * The load-bearing rule is that core visa knowledge is shared and never
 * duplicated per tenant. A tenant may restrict which countries and categories
 * it exposes; it can never hold its own copy of a photo specification, because
 * divergent copies are how one tenant ends up serving a stale requirement.
 */
export type TenantConfig = {
  id: string;
  brandName: string;
  /** Path to the tenant's own supplied logo asset. Never generated. */
  logoPath: string;
  theme: TenantTheme;
  /** Visibility filter over shared knowledge, never a private copy of it. */
  visibility: TenantVisibility;
  consultationRoute: string;
  escalationDestination: string;
  disclaimer: string;
  language: string;
};

export type TenantTheme = {
  primaryColor: string;
  accentColor: string;
};

export type TenantVisibility = {
  /** Empty means every modelled country is visible. */
  countries: CountryCode[];
  /** Empty means every modelled category is visible. */
  visaCategoryIds: string[];
  serviceSlugs: string[];
};

/** The only tenant that exists today, matching current production behaviour. */
export const defaultTenant: TenantConfig = {
  id: "klar-visaworx",
  brandName: "Visaworx",
  logoPath: "/brand/visaworx-logo.png",
  theme: { primaryColor: "#071f4a", accentColor: "#c92027" },
  visibility: { countries: [], visaCategoryIds: [], serviceSlugs: [] },
  consultationRoute: "/consultation",
  escalationDestination: "support@klartravels.com",
  disclaimer:
    "Visaworx provides consultation and preparation guidance. Visa decisions are made by the relevant authority.",
  language: "en",
};

/**
 * Applies a tenant's visibility filter to shared knowledge.
 *
 * Filtering rather than copying is what keeps a single source of truth: every
 * tenant reads the same underlying records.
 */
export function visibleTo<T>(
  tenant: TenantConfig,
  items: T[],
  key: (item: T) => string,
  allowList: string[]
): T[] {
  if (allowList.length === 0) return items;
  return items.filter((item) => allowList.includes(key(item)));
}
