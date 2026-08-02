# Master Test Strategy

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Define test levels, environments, evidence, exit criteria, and defect policy.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


## Test levels

1. Static validation: schema, references, secrets, licenses, lint, typecheck, build.
2. Unit: dates/timezone, answer normalization, reducer, persistence, audio coordinator.
3. Component: controls, media states, quiz inputs, overlays, reduced motion, errors.
4. E2E: authorization, complete story, direct routes/assets, refresh, media failures, finale.
5. Non-functional: accessibility, performance, privacy/security, compatibility, resilience.
6. Manual real-device: touch, safe areas, audio interruptions, in-app browser, emotional pacing.
7. UAT: verified personal facts, media order/crops, letter/music/finale, production URL.

## Environments

CI uses synthetic content only. Protected preview uses approved personal content. Production verification is performed from clean authenticated and unauthenticated devices.

## Evidence

Record test ID, build/deployment ID, device/browser/viewport, network, steps/data, expected, observed, result, tester, timestamp, and artifact location. Personal screenshots remain in the approved private evidence location.

## Defect severity

- S0: private exposure/secret compromise - immediate stop, remove access, incident response.
- S1: cannot enter/complete, wrong intimate content, fatal crash - release blocker.
- S2: major media/navigation/accessibility failure with workaround - normally blocker.
- S3: localized visual/copy defect - fix if safe before freeze.
- S4: optional polish - defer.

## Exit criteria

Zero open S0/S1, no unaccepted S2, all P0 requirements evidenced, content and rights approved, real-device pass, production authorization/direct asset checks pass, rollback verified, and client launch approval recorded.
