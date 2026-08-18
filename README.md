# Service Portal

A dependency-free static portal for Yondavo products.

## Local development

```bash
npm run build
npm run dev
```

The preview is available at `http://127.0.0.1:4173`.

## Deployment

Pushes to `main` build the static site and stream the approved artifact to the restricted
production deploy key. Nginx serves the active release and terminates HTTPS.

The service URLs are supplied by the GitHub Actions environment and use the public domain names
in production.

The production routes are:

- Portal: `https://yondavo.com/`
- XMind converter: `https://xmind.yondavo.com/`
- Kairo: `https://kairo.yondavo.com/`

`yondavo.cn`, `www.yondavo.cn`, and `www.yondavo.com` redirect to the canonical `.com` portal.
The former IP and non-standard port endpoints remain available temporarily during migration.
