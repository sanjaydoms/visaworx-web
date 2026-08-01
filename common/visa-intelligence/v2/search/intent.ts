import type { TravelPurpose } from "../types/journey";
import type { TravelScenario } from "../family/types";
import { countryRegistry } from "../countries/registry";
import { visaCategoryRegistry } from "../visa-categories/registry";
import type { CountryCode } from "../types/core";

/**
 * Intent-aware search.
 *
 * Resolves a free-text query into the structured dimensions the engine can act
 * on. This is parsing, not knowledge: it decides what a user is asking about,
 * never what the answer is.
 */
export type SearchIntent = {
  query: string;
  country?: CountryCode;
  countryName?: string;
  visaCategoryId?: string;
  purpose?: TravelPurpose;
  scenario?: TravelScenario;
  applicantType?: "adult" | "minor" | "infant";
  topics: SearchTopic[];
};

export type SearchTopic =
  | "photo"
  | "biometrics"
  | "documents"
  | "family-or-minor"
  | "sponsorship"
  | "previous-refusal"
  | "invitation";

const TOPIC_PATTERNS: Array<[SearchTopic, RegExp]> = [
  ["photo", /\bphoto|photograph|picture|background\b/i],
  ["biometrics", /\bbiometric|fingerprint\b/i],
  ["documents", /\bdocument|paperwork|checklist|proof\b/i],
  ["family-or-minor", /\bchild|minor|infant|baby|kid|son|daughter|parent|family|guardian\b/i],
  ["sponsorship", /\bsponsor|sponsorship|fund(ed|ing)?\b/i],
  ["previous-refusal", /\brefus(al|ed)|reject(ion|ed)|reappl/i],
  ["invitation", /\binvitation|invite letter|business invitation\b/i],
];

const SCENARIO_PATTERNS: Array<[TravelScenario, RegExp]> = [
  ["minor-with-one-parent", /\b(child|minor|son|daughter)\b.*\b(one parent|single parent|only (my )?(mother|father|mum|dad))\b|travelling with (just|only) (one|my) (parent|mother|father)/i],
  ["unaccompanied-minor", /\b(unaccompanied|alone|by (him|her|them)self)\b.*\b(child|minor)\b|\b(child|minor)\b.*\b(unaccompanied|travelling alone)\b/i],
  ["minor-with-guardian", /\bguardian\b/i],
  ["student-funded-by-parents", /\bstudent\b.*\b(parent|father|mother)\b.*\b(fund|sponsor|pay)/i],
  ["parent-visiting-child", /\b(my )?(father|mother|parent)s? (can |could )?(visit|come)/i],
];

/**
 * Words users actually type, mapped to purposes. People search "tourist visa",
 * not "tourism visa", so the purpose name alone is not a usable matcher.
 */
const CATEGORY_ALIASES: Partial<Record<TravelPurpose, string[]>> = {
  tourism: ["tourist", "tourism", "visitor", "holiday", "leisure"],
  business: ["business", "conference", "meeting"],
  study: ["student", "study", "studying", "university", "college"],
  work: ["work", "employment", "job"],
  "family-visit": ["family visit", "visiting family", "family"],
};

const APPLICANT_PATTERNS: Array<["adult" | "minor" | "infant", RegExp]> = [
  ["infant", /\binfant|baby|newborn\b/i],
  ["minor", /\bchild|minor|kid|son|daughter|teenager\b/i],
];

export function parseSearchIntent(query: string): SearchIntent {
  const q = query.trim();
  const lower = q.toLowerCase();

  // Country: longest name first, so "United Kingdom" is not shadowed by a
  // shorter partial match.
  const countryMatch = [...countryRegistry]
    .sort((a, b) => b.value.name.length - a.value.name.length)
    .find((c) => lower.includes(c.value.name.toLowerCase()));

  const category = visaCategoryRegistry.find((c) =>
    (CATEGORY_ALIASES[c.purpose] ?? []).some((alias) => new RegExp(`\\b${alias}`, "i").test(lower))
  );

  const topics = TOPIC_PATTERNS.filter(([, re]) => re.test(lower)).map(([t]) => t);
  const scenario = SCENARIO_PATTERNS.find(([, re]) => re.test(lower))?.[0];
  const applicantType = APPLICANT_PATTERNS.find(([, re]) => re.test(lower))?.[0] ?? undefined;

  return {
    query: q,
    country: countryMatch?.value.code,
    countryName: countryMatch?.value.name,
    visaCategoryId: category?.id,
    purpose: category?.purpose,
    scenario,
    applicantType,
    topics,
  };
}

/**
 * True when the query names a topic with an exact answer but not enough
 * context to give one, so search should offer to clarify rather than guess.
 */
export function needsMoreContext(intent: SearchIntent): boolean {
  const exact = intent.topics.includes("photo") || intent.topics.includes("biometrics");
  return exact && (!intent.country || !intent.visaCategoryId);
}
