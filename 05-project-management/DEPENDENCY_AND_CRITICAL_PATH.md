# Dependency and Critical Path

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Identify integration blockers and schedule-critical decisions.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


## Critical path

Client facts/media -> content schema/inventory -> media derivatives/manifest -> P0 feature integration -> protected preview -> client approval/UAT -> production/domain verification.

Parallel engineering foundation cannot compensate for missing approved personal content. The access/protected-media decision and global story/audio interfaces are technical blockers; freeze them before broad feature parallelization.

## Integration checkpoints

- Foundation interface freeze.
- Protected synthetic end-to-end flow.
- P0 synthetic content complete.
- Final content manifest complete.
- Content-approved protected preview.
- Production exact-deployment verification.

## Schedule buffer

Protect 7 August for testing and release. Scope is the variable; privacy, correctness, and production verification are not.
