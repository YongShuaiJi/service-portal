# Service Portal

A dependency-free static portal for the public services operated by YongShuaiJi.

## Local development

```bash
npm run build
npm run dev
```

The preview is available at `http://127.0.0.1:4173`.

## Deployment

Pushes to `main` build the static site and stream the approved artifact to the restricted
production deploy key. Nginx serves the active release and terminates HTTPS.

The service URLs are supplied by the GitHub Actions environment so they can move from the current
IP endpoints to domain names without editing the page source.

Until the public domain is active, the production routes are:

- Portal: `https://120.26.115.87/`
- XMind converter: `https://120.26.115.87:18443/`
- Kairo: `https://120.26.115.87:18380/`

The temporary non-standard service ports keep both applications at their original root path. Once
DNS and certificates are ready, set `XMIND_URL` and `KAIRO_URL` to the dedicated subdomains and
move their Nginx virtual hosts to port 443.
