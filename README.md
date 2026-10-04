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
npm run build
npm run deploy -- --dry-run
```

To preview locally without deploying:

```powershell
npm run build
npx wrangler dev
```

## Production deployment

The `main` branch is connected to Cloudflare Workers Builds. No framework build
is needed. The build command stages only the site pages and assets; the deploy
command is `npm run deploy`.

The Worker serves the staged site as static assets. It uses no database,
storage bucket, admin panel, or runtime API.
