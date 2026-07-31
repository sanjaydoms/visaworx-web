# Architecture Decisions

## ADR-001 — Embedded vertical
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
