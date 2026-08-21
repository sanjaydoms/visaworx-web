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

### 3. Avoid filler that a realistic query would also use

FAQs are indexed by the assistant's retriever: **question at weight 3, answer at weight 1.5,
category at 1.** The assistant suite proves unsupported questions stay unsupported by asking
things that should retrieve nothing.

One of those is realistic. *"What are the visa rules for Madagascar?"* is a question a traveller
would genuinely type, and the assistant must treat it as unsupported rather than serving UAE
content. Because `visa` is a stopword it reduces to two content words, so a single hit on
`rules` in an indexed field clears the relevance floor. **Prefer the specific noun** — "entry
process", "eligibility conditions", "requirements published by the mission".

Watch the **stem**, not the word. `rules` and `ruling` both reduce to `rul`, which is how a FAQ
mentioning a court ruling started matching a query about Madagascar. The guard in
`features/resources/resources.test.ts` uses the retriever's own `tokenize`, so it compares
stems and cannot drift from production.

The purely artificial fixtures — the ones built around `xyz999` — now use tokens that cannot
occur in prose (`qqzzx`, `frobnitz`). They were previously assembled from ordinary English like
"nothing matches this", which meant the growing corpus kept colliding with them and the writing
was being contorted to satisfy a badly chosen fixture.

**Fix the fixture, not the prose — unless the query is one a real traveller would ask.**
Changing the scorer was tried twice, and was wrong both times.

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
| `first-time-applicant-no-travel-history` | Visa Preparation |
| `self-employed-visa-applications-from-india` | Documentation |
| `travelling-with-children-indian-passport` | Family Travel |
| `after-a-refusal-appeal-review-or-reapply` | Refusals |
| `transit-and-layovers-indian-passport` | Visa Preparation |
| `visa-free-and-visa-on-arrival-for-indian-passports` | Visa Preparation |
| `schengen-travel-insurance-explained` | Documentation |

**Outstanding:** Australia (blocked, see above), plus the remaining supporting articles listed
in `south-korea-visa-from-india-strategy.md` and `schengen-visa-from-india-strategy.md`.
