# Visaworx Production Environment Variables Reference

## Klar CRM Integration
- `KLAR_CRM_API_URL`: Base URL for Klar CRM server API (e.g. `https://crm.klartravels.com`).
- `KLAR_CRM_API_TOKEN`: Bearer token for server-side CRM authentication.
- `KLAR_CRM_TENANT_ID`: Tenant ID header (`X-Tenant-ID`).
- `KLAR_CRM_CONSULTATION_ENDPOINT`: Path for consultation creation (default: `/api/v1/consultations`).
- `KLAR_CRM_TIMEOUT_MS`: Request timeout in milliseconds (default: `10000`).

## AI Visa Intelligence Assistant
- `AI_PROVIDER`: AI provider name (e.g. `openai`).
- `AI_MODEL`: Model identifier (e.g. `gpt-4o-mini`).
- `AI_API_KEY`: Server-side API key for AI provider.
- `AI_TIMEOUT_MS`: Request timeout in milliseconds (default: `15000`).

## Fallback / Legacy Integration
- `KLAR_CONSULTATION_API_URL`: Legacy Klar Travels API endpoint.
- `VISAWORX_CONSULTATION_WEBHOOK_URL`: Backup webhook endpoint.
- `VISAWORX_CONSULTATION_EMAIL`: Backup consultation destination email.

## Search and indexing
- `NEXT_PUBLIC_SITE_URL`: The absolute origin this deployment is actually served
  from, no trailing slash. Canonical tags, `sitemap.xml`, `robots.txt` and
  `metadataBase` are all derived from it.

  **This is the one that breaks indexing when it is wrong.** A canonical naming a
  domain that does not host the app tells Google to index a page that is not
  there, so nothing gets indexed — not the wrong page, no page. Set it per
  environment: the preview host for previews, the production domain once
  Visaworx is mounted under it. Production is `https://visaworx.klartravels.com`,
  which is also the built-in fallback.

- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`: Search Console verification token,
  meta-tag method. Leave unset and no tag is emitted at all. The HTML-file
  method also works — drop `google<token>.html` into `public/` and it is served
  from the site root.
