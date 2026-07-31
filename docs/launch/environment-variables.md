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
