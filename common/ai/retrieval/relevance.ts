/**
 * Term-based relevance scoring for retrieval over approved Visaworx content.
 *
 * The previous retriever substring-matched the entire query against each field,
 * so any natural-language question - the only kind users actually ask - matched
 * nothing: no title contains "how do i prepare financial evidence for a uk
 * student visa". Queries that did match matched everything, because "visa"
 * appears in nearly every record, and the caller then took the first two in
 * data order. This scores per term, weights fields, and ranks.
 */

/**
 * Words carrying no retrieval signal. "visa" and "visas" are included
 * deliberately: they appear in almost every approved record, so treating them
 * as signal ranks the corpus at random.
 */
const STOPWORDS = new Set([
  "a", "about", "all", "am", "an", "and", "any", "are", "as", "at", "be", "been",
  "by", "can", "could", "did", "do", "does", "for", "from", "get", "give", "had",
  "has", "have", "how", "i", "if", "in", "into", "is", "it", "its", "me", "my",
  "need", "of", "on", "or", "our", "should", "show", "so", "some", "than",
  "that", "the", "their", "them", "then", "there", "these", "they", "this",
  "to", "up", "was", "we", "what", "when", "where", "which", "who", "why",
  "will", "with", "would", "you", "your", "visa", "visas",
]);

/** Light suffix folding so "documents" matches "document", "applying" "apply". */
function stem(word: string): string {
  if (word.length > 4 && word.endsWith("ies")) return `${word.slice(0, -3)}y`;
  if (word.length > 4 && word.endsWith("es")) return word.slice(0, -2);
  if (word.length > 3 && word.endsWith("s")) return word.slice(0, -1);
  if (word.length > 5 && word.endsWith("ing")) return word.slice(0, -3);
  if (word.length > 4 && word.endsWith("ed")) return word.slice(0, -2);
  return word;
}

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 1 && !STOPWORDS.has(word))
    .map(stem);
}

export type WeightedField = {
  text: string;
  /** Higher weight means a match here says more about relevance. */
  weight: number;
};

/**
 * Score one record against the query terms.
 *
 * A term matched as a whole word scores its field weight in full; a term found
 * only inside a longer word scores a third, enough to rank above nothing
 * without letting incidental substrings outrank real matches. The result is
 * divided by the term count so long questions are not inherently higher-scoring
 * than short ones, which keeps a single threshold meaningful.
 */
export function scoreFields(queryTerms: string[], fields: WeightedField[]): number {
  if (queryTerms.length === 0) return 0;

  let score = 0;

  for (const term of queryTerms) {
    let best = 0;

    for (const field of fields) {
      if (!field.text) continue;

      const haystack = tokenize(field.text);
      if (haystack.includes(term)) {
        best = Math.max(best, field.weight);
      } else if (haystack.some((word) => word.includes(term) || term.includes(word))) {
        best = Math.max(best, field.weight / 3);
      }
    }

    score += best;
  }

  return score / queryTerms.length;
}

/**
 * Score floor a record must exceed to count as a match.
 *
 * Set so that a single weak partial hit on one term of a multi-term question is
 * not enough, and neither is a lone hit on the lowest-weighted field of a
 * three-term question, which lands exactly on the floor and is almost always an
 * ordinary English word rather than a subject. Retrieving nothing is a safe
 * outcome - the assistant says it does not have enough approved information and
 * routes to a human - whereas retrieving something irrelevant invites an answer
 * built on the wrong content.
 */
export const RELEVANCE_THRESHOLD = 0.5;

export type Scored<T> = { item: T; score: number };

export function rank<T>(
  items: T[],
  queryTerms: string[],
  toFields: (item: T) => WeightedField[],
  limit: number
): Scored<T>[] {
  return items
    .map((item) => ({ item, score: scoreFields(queryTerms, toFields(item)) }))
    .filter((scored) => scored.score > RELEVANCE_THRESHOLD)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
