# Content working notes

Strategy documents for published guides live here, one per guide (or per research pass).
They are working artifacts — keyword maps, entity maps, citation ledgers, open questions —
and are deliberately not reader-facing. The reader-facing article is the `Guide` entry in
`common/content/guides.ts`.

## House rules, learned the hard way

### 1. Never print a figure you could not verify

Every strategy doc carries a **citation ledger**: each fact, its value, the official source,
and the date verified. The rule the ledgers enforce is that nothing in an article states a
number absent from its ledger.

This has already stopped several plausible-but-unverifiable figures reaching the site:

- **Australia** is still unpublished because the subclass 600 Tourist stream charge came back
  as AUD 150 from one source and AUD 380 from another.
- **US appointment wait times** are deliberately absent; they differ by post and move weekly.
  The article explains why it will not quote one.
- **Minimum bank balances** are never stated for any destination, because no such official
  threshold exists. It is the most commonly invented number in this subject.
- **New Zealand's levy** was quoted as NZD 35 by one source; that is the pre-increase figure,
  and the current NZD 100 was taken from the levy page directly.

When a figure cannot be pinned down, the honest move is to name the mechanism, explain why no
single number applies, and route the reader to the official source. That is usually more
durable than the number would have been.

### 2. Attribute checklists to the mission that publishes them

Consular checklists are national, not universal. Where an article uses one — the German
missions checklist for India appears in several — it says so explicitly and tells the reader
that the consulate deciding their case governs. Presenting one mission's list as the standard
is the most common error in competing content.

### 3. Avoid generic filler in FAQ questions and answers

FAQs are indexed by the assistant's retriever: **question at weight 3, answer at weight 1.5,
category at 1.** The assistant test suite uses deliberately unmatchable queries to prove that
unsupported questions stay unsupported, and those queries are built from ordinary English.

Twice now a new FAQ has collided with one:

| Word | Where it appeared | Guard query it broke |
|---|---|---|
| `match` | a UK FAQ answer | `xyz999 nothing matches this` |
| `rules` | a UAE FAQ question, then two sponsorship FAQ answers | `What are the visa rules for Madagascar?` |

Because `visa` is a stopword, a query like "visa rules for Madagascar" reduces to two content
words, so a single hit on `rules` in an indexed field clears the relevance floor.

**Prefer the specific noun.** Write "entry process", "eligibility conditions", "requirements
published by the mission" rather than "rules". The retriever is not the problem — reaching for
filler is. Both times, rewording was the correct fix and changing the scorer was not.

### 4. No approval language, ever

`FORBIDDEN_MARKETING_PHRASES` is asserted against the whole content set in
`features/launch/launch.test.ts`. Beyond the literal phrases, the standing rule is that
Visaworx never implies a predicted or guaranteed outcome.

### 5. Adding a guide touches three files

1. `common/content/guides.ts` — the article.
2. `common/content/faqs.ts` — its FAQs, which render on the guide page via `faqIds`.
3. `features/resources/resources.test.ts` — the guide inventory pin, which exists so content
   additions are deliberate rather than accidental.

The sitemap, canonicals and internal links follow automatically.

## Published

| Guide | Cluster |
|---|---|
| `schengen-visa-from-india` | Country Guides |
| `uk-visitor-visa-from-india` | Country Guides |
| `uae-visa-from-india` | Country Guides |
| `us-visitor-visa-from-india` | Country Guides |
| `canada-visitor-visa-from-india` | Country Guides |
| `singapore-visa-from-india` | Country Guides |
| `new-zealand-visitor-visa-from-india` | Country Guides |
| `japan-visa-from-india` | Country Guides |
| `south-korea-visa-from-india` | Country Guides |
| `travel-authorisations-are-not-visas` | Visa Preparation |
| `what-indian-financial-documents-prove` | Documentation |
| `when-someone-else-funds-your-trip` | Documentation |

**Outstanding:** Australia (blocked, see above), plus the remaining supporting articles listed
in `south-korea-visa-from-india-strategy.md` and `schengen-visa-from-india-strategy.md`.
