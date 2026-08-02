# Release Checklist

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Provide the final go/no-go gate for production.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


## Product/content

- [ ] Names, dates, times, location, answers, letter, captions, memories, reasons, dreams, and finale approved.
- [ ] No required placeholder/TODO remains.
- [ ] Media order/crops and sensitive details reviewed.
- [ ] Music/visual asset rights and consent confirmed.

## Engineering

- [ ] Clean install, lint, typecheck, unit, component, E2E, accessibility, content validation, and production build pass.
- [ ] P0 complete; unstable P1/P2 removed.
- [ ] Error/retry/skip, reduced motion, safe areas, refresh, and interruption pass.
- [ ] Bundle/media budgets reviewed.

## Privacy/security

- [ ] Unauthorized root/story/API/direct media/preview/alternate host tests pass.
- [ ] Secrets server-only; cookies and rate limits verified.
- [ ] Generic metadata, noindex, robots, referrer, CSP/headers verified.
- [ ] Repository/history, CI artifacts, logs, and source maps audited.

## Release operations

- [ ] Client UAT signed for exact deployment.
- [ ] Domain/DNS/TLS verified from mobile data.
- [ ] Production checked on clean authenticated and unauthenticated devices.
- [ ] Known-good rollback deployment identified and rollback rehearsed.
- [ ] Monitoring/owner contact and no-change window active.
- [ ] Retirement date and deletion owner scheduled.

**Go/No-Go:** ______  **Owner:** ______  **Date/time IST:** ______
