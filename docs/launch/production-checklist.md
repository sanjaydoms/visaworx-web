# Visaworx Production Launch Checklist

## 1. Branding & Identity
- [x] Official Visaworx logo used exactly as supplied (`/brand/visaworx-logo.png`).
- [x] Official Klar Travels logo used exactly as supplied (`/brand/klar-travels-logo.png`).
- [x] Zero recoloring, distortion, white bounding boxes, or `brightness-0 invert` filters.
- [x] Correct brand name `Visaworx` used across all pages; zero `Visionworx` typos.

## 2. Content & Ethics Integrity
- [x] Zero approval guarantees, 100% success promises, or embassy decision predictions.
- [x] Mandatory disclaimers present on Homepage, Country pages, Service pages, Readiness results, Guides, Consultation, and AI Assistant.
- [x] Primary government portal source links provided on all country and guide pages.

## 3. Module Functional Audit
- [x] Homepage (`/visaworx`) — Header, Hero, Clarity Panel, Trust Strip, CTA.
- [x] Countries Module (`/visaworx/countries` & 10 detail routes).
- [x] Services Module (`/visaworx/services` & 9 detail routes).
- [x] Visa Readiness Engine (`/visaworx/readiness` & `/visaworx/readiness/result`).
- [x] Visa Intelligence Resources Module (`/visaworx/resources`, `/guides`, `/faqs`, `/glossary`).
- [x] Consultation Module (`/visaworx/consultation` & `/visaworx/consultation/success`).
- [x] AI Visa Intelligence Assistant (`/visaworx/assistant` & floating launcher).

## 4. Integration Verification
- [x] Klar CRM Adapter (`common/services/klar-crm/`) configured with idempotency `VISAWORX-{requestId}` and fallback logging.
- [x] AI Provider Adapter (`common/ai/adapters/provider.ts`) configured with RAG content search and guardrails.

## 5. Security & Privacy
- [x] HTTPS security headers (`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`).
- [x] Personal data redacted in error logs. No client-side API secrets.
- [x] Session data cleared immediately after successful consultation submission.

## 6. Accessibility & SEO
- [x] WCAG AA contrast compliance and min 48px touch targets.
- [x] Canonical URLs, OpenGraph metadata, Article JSON-LD, FAQ JSON-LD, Breadcrumb JSON-LD schemas.
- [x] Dynamic `sitemap.xml` (49 routes) and `robots.txt` with disallow rules on result/success pages.
