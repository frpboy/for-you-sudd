# Performance Engineering Plan

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Keep a media-heavy experience fast and stable on mobile networks.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


## Critical strategy

Render the authorized shell and first emotional moment quickly. Do not preload the full journey. Prefetch only the current and next likely chapter, cancel stale work, and release decoded media when appropriate.

## Budgets

- Small initial route JavaScript; client islands only where interactive.
- No duplicate animation framework.
- No third-party analytics, chat, or font scripts by default.
- First-screen image sized to viewport and compressed.
- Gallery thumbnails separate from full-screen derivatives.
- Video `preload="metadata"` or `none`; poster always present.
- Audio preloaded only after start consent and close to use.

## Techniques

Server-render static copy, reserve media dimensions, use responsive image `sizes`, lazy-load below-current content, dynamically import optional P1/P2 features, avoid large JSON blobs in client source, virtualize only if needed, and keep animations on compositor-friendly properties.

## Test profiles

Fast Wi-Fi, throttled 4G, cold cache, warm cache, low-end Android emulation, current iPhone Safari, background/foreground, and near-storage/memory pressure where practical. Record Web Vitals and interaction stalls from production builds—not development mode.

## Failure policy

If budget is missed, remove or defer effects before reducing legibility or privacy. Optimize assets before adding loading theater.
