# Implementation Sequence

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Give the orchestrator a dependency-aware execution order optimized for the fixed deadline.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


## Wave 0 - repository and governance

Initialize private repository, branch protection, package/lockfile, strict TypeScript, formatting/lint/test/build scripts, CI, environment schema, ADR log, Git ignores, synthetic fixtures, and task board.

## Wave 1 - foundation

Design tokens, global layout/safe areas, UI primitives, error boundaries, content schema/loader, date utilities, story reducer/state machine, feature flags, and test harness.

## Wave 2 - privacy and media foundations

Server-side access/session, protected asset strategy, headers/robots/metadata, media manifest validation, image/video/audio pipeline scripts, and global media coordinator. These are integration blockers and receive independent review.

## Wave 3 - P0 experience spine

Start/audio consent, welcome, birthday state, story chapters, navigation/progress, gallery, video, voice, quiz, letter, and finale. Implement against synthetic content first; inject approved personal content later.

## Wave 4 - resilience and accessibility

Loading/error/retry/skip, refresh recovery, reduced motion, focus/keyboard, captions/transcript, viewport/safe-area testing, interruption handling, and privacy-safe diagnostics.

## Wave 5 - approved P1

Memory jar, reasons, future dreams, tap cake, replay, restrained confetti, and optional safe easter egg. Each may be cut independently.

## Wave 6 - content integration

Process approved assets, populate inventory/config, client content review, crop/caption/alt review, music rights verification, and protected preview. Never let content integration bypass schema/manifest validation.

## Wave 7 - release

Automated regression, real-device matrix, performance/privacy/accessibility audits, UAT, production promotion, clean-device verification, rollback drill, launch freeze, and retirement scheduling.

## Parallelization boundaries

Safe parallel work: design tokens/primitives, content schema, test harness, documentation, synthetic fixtures. Unsafe parallel work without interface freeze: story reducer, audio coordinator, access/auth, media delivery, and global navigation.
