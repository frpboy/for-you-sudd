# Technical Architecture

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Define the production architecture, boundaries, runtime flow, and implementation decisions.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


## 1. Recommended baseline

- Next.js App Router, current supported LTS line at implementation time.
- TypeScript in strict mode.
- React Server Components by default; client components only for stateful story/media interaction.
- Tailwind CSS for tokens/utilities and a small global CSS layer.
- Motion for React plus CSS for animation; no second animation framework by default.
- Zod or equivalent runtime schema validation for content and environment configuration.
- Playwright for end-to-end testing, Vitest for unit/component logic, axe for accessibility automation.
- Managed deployment with TLS, preview environments, environment secrets, and rollback.

## 2. Logical architecture

```text
Browser
  -> TLS / hosting edge
  -> server-side access guard
  -> authorized story shell
  -> typed content manifest
  -> client story state machine
  -> media controller / global audio coordinator
  -> protected or approved media delivery
```

## 3. Route design

```text
/                 generic private landing or redirect
/access           access verification UI
/story            state-driven experience shell
/api/access       server-side credential/passphrase verification
/api/media/*      optional guarded delivery/signing layer
/health           minimal non-personal health response (optional)
```

Do not create a Next.js route for each story screen. A route-per-screen causes extra navigation complexity, audio resets, loading flashes, privacy inconsistencies, and conflicting agent ownership. Use one story state reducer with stable chapter IDs and optional URL hash/query synchronization.

## 4. Server/client boundary

### Server responsibilities

Authorization, secure cookie/session creation, environment validation, generic metadata, robots headers, protected asset authorization/signing, and content delivery that must not be exposed before access.

### Client responsibilities

Story state, gestures, animations, local non-sensitive progress, audio/video events, quiz input, reduced-motion adaptation, and optional device capability detection.

No passphrase, access secret, or privileged media key is placed in client bundles or `NEXT_PUBLIC_*` variables.

## 5. Content architecture

Content is data, not component code. A build-time loader validates `content-config.json` against a schema, verifies stable IDs and media references, then supplies only authorized content to the story shell. Components render generic structures such as `StoryChapter`, `Album`, `QuizQuestion`, and `Letter`.

## 6. State management

Use a typed reducer/state machine with explicit events:

```text
AUTHORIZED, STARTED, NEXT, PREVIOUS, OPEN_MEDIA, CLOSE_MEDIA,
MEDIA_PLAY, MEDIA_PAUSE, ANSWER_SUBMIT, ANSWER_ACCEPTED,
ANSWER_REJECTED, FEATURE_UNAVAILABLE, RETRY, SKIP, REPLAY
```

Keep transient animation state separate from durable story progress. Persist only safe chapter/quiz progress locally; never store the access secret or personal answers in analytics.

## 7. Media architecture

- Originals remain outside public source control.
- Build pipeline produces web derivatives, posters, dimensions, blur placeholders, duration, and checksums.
- Image delivery selects appropriate sizes and modern formats.
- Video uses H.264/AAC MP4 baseline, poster frame, `playsInline`, metadata preload, and no autoplay.
- Voice/music use one coordinator so tracks never compete.
- Direct asset protection must match the chosen privacy model; `public/` is not private.

## 8. Resilience

Every asynchronous boundary has loading, timeout/retry, skip, and logging behavior. The shell renders without optional media. Error boundaries expose a gentle recovery screen, not a framework error. Production source maps and logs are configured to avoid personal-content leakage.

## 9. Observability

Prefer no analytics for this one-recipient experience. Operational monitoring may record route status, build/deployment health, aggregate Web Vitals, and anonymous error fingerprints. Never record names, answers, captions, media URLs with embedded identifiers, letter text, or voice/video content.

## 10. Deployment topology

Development -> preview -> content-approved preview -> production. Production promotion requires signed checklists. Retain the previous known-good deployment for instant rollback. On retirement, delete production alias, preview deployments containing personal content, protected storage objects, and temporary transfer files as approved.
