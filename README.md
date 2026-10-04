# Harbour & Pine Kitchen

Static restaurant website served by Cloudflare Workers Static Assets.

## Pages

- `/` — Home
- `/menu.html` — Menu
- `/about.html` — About
- `/events.html` — Events
- `/gallery.html` — Gallery
- `/contact.html` — Contact

## Local preview

```powershell
npm ci
npm run deploy -- --dry-run
```

To preview locally without deploying:

```powershell
npx wrangler dev
```

## Production deployment

The `main` branch is connected to Cloudflare Workers Builds. No framework build
step is needed; the deploy command is `npm run deploy`.

The Worker serves the files in this repository root as static assets. It uses
no database, storage bucket, admin panel, or runtime API.
