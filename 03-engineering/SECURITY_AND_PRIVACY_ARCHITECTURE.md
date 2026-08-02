# Security and Privacy Architecture

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Protect intimate content across access, storage, delivery, logs, previews, and retirement.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


## Security objective

Only approved viewers should receive personalized HTML/data/media, and no deployment artifact should unnecessarily expose relationship content.

## Threat model

- URL forwarding and guessing.
- Direct media URL discovery.
- Client-bundle inspection.
- Search engine or social preview caching.
- Public repository or Git history leakage.
- Preview deployment leakage.
- Analytics/error logs capturing personal data.
- Misconfigured storage, environment variables, or cookies.
- Stale deployments remaining after the event.

## Required controls

### Access

Use managed deployment protection or a server-side passphrase/session flow. Verification is rate-limited and returns a secure, HTTP-only, same-site cookie. The Switzerland question may be shown after real authorization as part of the story, or combined only as a low-risk convenience—not as the sole protection.

### Asset delivery

Do not place sensitive assets in an unguarded `public/` directory. Use guarded application routes, private object storage with short-lived signed URLs, or a hosting feature that protects all deployment assets. Verify direct asset requests while unauthenticated.

### Metadata and indexing

Use generic page title/description, `noindex,nofollow,noarchive`, no sitemap entries for private routes, no personalized Open Graph image, and restrictive referrer policy. Assume directives reduce accidental indexing but do not replace authentication.

### Secrets and sessions

Secrets are server-only, rotated if exposed, and separated by environment. Cookies use `Secure`, `HttpOnly`, and appropriate `SameSite`. Avoid long-lived bearer tokens in local storage.

### Repository

Private repository preferred. Personal media, final content configuration, `.env*`, exports, and transfer directories are ignored. Run secret and large-file scans before every push. If an asset enters history accidentally, rotate URLs/secrets and rewrite history according to a documented incident response.

### Logging

Do not log answers, letter text, names, filenames that reveal identity, access secrets, signed URLs, or media payloads. Use opaque IDs and sanitized error categories.

### Headers

Set CSP appropriate to the final asset/font/media origins, `X-Content-Type-Options: nosniff`, restrictive `Referrer-Policy`, frame restrictions, permissions policy disabling unused sensors, and HSTS through the platform.

## Data minimization

No account database, no relationship analytics, no voice recording, no microphone upload, and no server storage of quiz answers. Local progress contains only opaque section/question IDs.

## Retirement

Delete production alias/domain mapping, all personal preview deployments, object-storage files and versions, build artifacts, temporary transfers, monitoring attachments, and local working copies according to approval. Record completion without retaining personal content.
