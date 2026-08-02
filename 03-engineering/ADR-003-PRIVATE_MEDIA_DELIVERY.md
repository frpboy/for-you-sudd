# ADR-003: Private Media Delivery

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Record that personal assets cannot rely on a cosmetic client-side gate.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


## Status
Accepted; final implementation option pending hosting plan.

## Decision

Protect personalized HTML/data and media using managed deployment protection or a server-side session plus guarded/signed media delivery. Do not store sensitive assets in an unauthenticated public directory.

## Options to finalize

1. Whole-deployment managed protection.
2. Server access route + private object storage signed URLs.
3. Guarded application media proxy for the small asset set.

Select based on hosting plan, cost, caching, complexity, and direct-URL verification. The Switzerland answer remains narrative only.
