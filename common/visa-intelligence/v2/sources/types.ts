import type { CountryCode, IsoDate } from "../types/core";

/**
 * An official source of visa information.
 *
 * "Official" means a government, consular, or authorised visa-service
 * operator's own publication. Arbitrary web content, blogs, aggregators and
 * AI-generated summaries are explicitly not official and must never be
 * registered here.
 */
export type SourceAuthority =
  | "government"
  | "consulate-or-embassy"
  | "authorised-visa-operator";

export type OfficialSource = {
  id: string;
  /** Human-readable name shown alongside any fact drawn from it. */
  label: string;
  url: string;
  authority: SourceAuthority;
  /** Country whose rules this source is authoritative for. */
  jurisdiction: CountryCode;
  /** When a human last checked this source's content. */
  retrievedAt: IsoDate;
};

/** A reference from a fact back to the source that supports it. */
export type SourceRef = {
  sourceId: string;
  /** Optional deep link to the specific page the fact came from. */
  url?: string;
};

export function isOfficial(source: OfficialSource): boolean {
  return (
    source.authority === "government" ||
    source.authority === "consulate-or-embassy" ||
    source.authority === "authorised-visa-operator"
  );
}
