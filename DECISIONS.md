# Architecture Decisions

## ADR-001 — Embedded vertical (superseded by ADR-009)
Visaworx lives within Klar Travels under `/visaworx`.

## ADR-002 — No authentication
The public MVP has no customer login or account.

## ADR-003 — No CRM or analytics
The website passes consultation requests to an existing configurable destination only.

## ADR-004 — Human-first AI
AI educates, structures and summarizes. Human consultants provide judgement.

## ADR-005 — Immutable logos
Official supplied Visaworx and Klar Travels logos must be used without recreation or modification.

## ADR-006 — Central shared layer
All reusable assets, components, design tokens, content, routes and rules live under `common/`.

## ADR-007 — Content before code duplication
Countries, services, trust points and FAQs are structured data, not repeated JSX.

## ADR-008 — India-origin audience
Visaworx content addresses travellers applying from India. Pages remain organised
by destination; the origin is the reader, not the taxonomy.

Audience framing (summaries, page copy, SEO metadata) is India-specific. Statements
about what applies to a specific nationality — visa-vs-eTA routes, visa-on-arrival
eligibility, e-visa availability — are only made once verified against that
destination's official source, and are dated in `lastReviewed`. Where a requirement
branches on nationality and has not yet been verified, the branch is left stated as
the authority states it rather than resolved for Indian passport holders.

## ADR-009 — Subdomain, served at the root
Visaworx is served from `visaworx.klartravels.com`, not from a path under the main
domain. Routes therefore live at the site root: `/countries/schengen`, not
`/visaworx/countries/schengen`. Repeating the vertical name in every path on a
subdomain already named for it is redundant.

This supersedes ADR-001. Visaworx remains a Klar Travels vertical in every other
respect - shared brand, shared consultation destination, no separate identity.
Only the hosting shape changed.
