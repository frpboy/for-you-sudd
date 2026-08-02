# For U Sudd

Private, mobile-first birthday experience built with Next.js, TypeScript, Motion, and server-authorized media delivery.

## Local development

```powershell
Copy-Item .env.example .env.local
# Demo mode: use the passphrase "demo" locally.
npm ci
npm run dev
```

Open `http://localhost:3000/access`. The demo contains no personal content.

## Private content preview

The supplied local media, handwritten notes, and voice note are mapped in the ignored `content/content-config.private.json`. It is deliberately not production-approved: final captions/alt text, rights/consent, the remaining quiz content, and final approval still require review.

```powershell
$env:CONTENT_CONFIG_PATH='content/content-config.private.json'
$env:PRIVATE_MEDIA_ROOT='E:\K4NN4N\for-you-sudd'
$env:ACCESS_PASSPHRASE='set-this-only-in-your-local-environment'
$env:SESSION_SECRET='use-a-long-random-secret'
npm run dev
```

Do not put client media in `public/`, source control, `NEXT_PUBLIC_*`, or deployment logs.

## Checks

```powershell
npm run validate:content
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:e2e
```

To enforce the production content gate, run `CONTENT_VALIDATION_PRODUCTION=true npm run validate:content`. It fails unless a private, approved manifest is used (or the explicitly documented preview override is set).

## Deploy

1. Create a private repository; do not commit `content/content-config.private.json` or media.
2. Vercel has no persistent local-media disk. Store the real media and private manifest in an authenticated storage/data provider, then configure the production provider before launch. The pushed repository deliberately deploys only safe demo content until that provider is configured.
3. Set `ACCESS_PASSPHRASE`, `SESSION_SECRET`, `CONTENT_CONFIG_PATH`, and production media-provider credentials as server-only environment secrets.
4. Run the full checks on a content-approved preview, including `CONTENT_VALIDATION_PRODUCTION=true`.
5. Verify `/story` and `/api/media/<id>` while unauthenticated, then test the recipient journey on iPhone Safari and Android Chrome.
6. Promote the preview only after the release checklist is signed. Keep the previous deployment for rollback; remove domain aliases, previews, and storage assets on the approved retention date.

### Vercel environment setup

The ignored `.env.vercel` file contains the real local access secret and session secret for pasting into Vercel. The production default is the supplied private manifest and `private-media/` directory; set `CONTENT_CONFIG_PATH=content/content-config.demo.json` only for an intentionally synthetic demo. Private assets are not in `public/`, are included only in the authorized media function, and are served solely through `/api/media/:id`. The GitHub repository and Vercel project must remain private because their administrators can access build artifacts. For a stronger separation later, set `MEDIA_PROVIDER=remote`, `PRIVATE_MEDIA_BASE_URL`, and `PRIVATE_MEDIA_TOKEN` for an authenticated HTTPS media service; the app proxies it through the same authorized endpoint, including byte-range requests.

If Vercel logs show `ENOENT ... content-config.demo.json`, deploy the latest commit: the content manifests are bundled into the server-only loader and Next.js traces `private-media/**` into the protected media route. In Vercel, add the values from the ignored `.env.vercel` file for **Production**, then redeploy with cache disabled once.

## Current content gaps

The actual supplied photos, videos, handwritten notes, and voice note are locally mapped but remain pending approval. A rights confirmation for the selected music, final captions/alt text, five quiz questions, domain, and retention date are still required before production approval.
