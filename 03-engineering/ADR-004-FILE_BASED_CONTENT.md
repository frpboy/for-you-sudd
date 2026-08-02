# ADR-004: Typed File-Based Content

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Record the no-database content approach for the fixed-scope event.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


## Status
Accepted.

## Decision

Use schema-validated file-based content and an asset manifest. No CMS/database/admin UI for this release.

## Consequences

Lower delivery risk, easier review, reproducible builds, and smaller attack surface. Content updates require a build/deployment, which is acceptable for a one-recipient finite event.
