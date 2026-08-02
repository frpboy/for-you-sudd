# Performance Test Plan

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Measure production performance and enforce media/bundle budgets.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


Test production builds on cold/warm cache, throttled mobile network, and representative phones. Record LCP, INP, CLS, route JS, image/video/audio transfer, memory growth through the full journey, and long tasks during gallery/finale.

Verify no full-gallery preload, correct image `sizes`, reserved dimensions, dynamic loading of P1/P2, video metadata/poster behavior, audio after consent, and cleanup of listeners/decoded media. Run at least three samples and use medians/p75 trends rather than a single score.

A regression that threatens completion on mobile is release-blocking. Remove effects or oversized assets before relaxing budgets.
