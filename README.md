# Visaworx OS

Working Next.js starter for the Visaworx vertical inside Klar Travels.

## Run

```bash
pnpm install
pnpm dev
```

Open:

```text
http://localhost:3000/visaworx
```

## Folder model

```text
app/                 Routes and page composition
common/              Every reusable artifact in one place
features/            Feature-specific page sections
public/              Public static assets
```

## Required before production integration

Set the destination used by consultation actions in `common/config/site.ts`.

Replace or update brand assets only with exact official supplied files. Do not recreate either logo.

## Scope deliberately excluded

- Authentication
- CRM
- Analytics dashboard
- Customer dashboard
- Payment gateway
- Visa tracking
