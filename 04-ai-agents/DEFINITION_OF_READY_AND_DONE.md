# Definition of Ready and Definition of Done

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Prevent agents from starting ambiguous work or declaring incomplete work finished.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


## Definition of Ready

A task is ready when it has a unique ID, owner role, requirement IDs, one objective, dependencies satisfied, owned files/interfaces, input fixtures, non-goals, acceptance criteria, test method, and no unresolved personal-content decision required for implementation.

## Definition of Done

- Acceptance criteria pass.
- Existing behavior is preserved unless explicitly changed.
- Unit/component/E2E tests appropriate to risk pass.
- Typecheck, lint, build, content validation, and privacy scan pass.
- Loading, empty, error, retry/skip, reduced-motion, keyboard, and mobile states are handled.
- No new secret/personal-data exposure.
- Documentation and traceability are updated.
- Evidence and handoff are recorded.
- Independent review completed for cross-cutting/high-risk modules.

## Release Done

In addition to task Done: client content approval, real-device UAT, production authorization checks, direct asset checks, domain/TLS, rollback, monitoring privacy, and retirement ownership are verified.
