# AGENTS.md - Repository Operating Rules

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Give every AI coding agent binding instructions for safe, coordinated implementation.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


## Mission

Build the approved “Our Story” birthday experience exactly from the authoritative requirements. Optimize for privacy, mobile reliability, content accuracy, accessibility, and release safety—not feature count.

## Authority order

1. Decisions/open items.
2. Master specification.
3. PRD/FRD/SRS.
4. Technical architecture.
5. Screen specifications.
6. Approved content configuration.
7. Task issue and handoff.

Stop and flag a conflict; do not choose silently.

## Mandatory behavior before editing

1. Read the task, relevant requirements, ADRs, tests, and current code.
2. Inspect existing functionality and `git diff/status`.
3. Identify files owned by the task and active-agent conflicts.
4. State assumptions and unresolved dependencies in the task notes.
5. Create or update tests before declaring completion.

## Prohibited behavior

- Invent names, memories, captions, relationship facts, letter text, or accepted answers.
- Put personal media, final content, or secrets in public source control.
- Implement client-only access as security.
- Add GSAP, a state library, analytics, CMS, database, or other dependency without approved ADR.
- Create route-per-screen story navigation.
- Remove working behavior or tests to make a task pass.
- Use sensors/microphone as the only completion method.
- expose personal text in logs, test snapshots, screenshots, issue titles, or telemetry.
- mark a task done without evidence.

## Engineering defaults

TypeScript strict, server components by default, smallest client boundary, typed reducer/state machine, schema validation, stable IDs, semantic HTML, 44 px touch targets, safe-area support, reduced motion, explicit audio consent, and privacy-safe errors.

## Task size

One independently reviewable outcome, normally under 300 net changed lines excluding generated files/tests. Larger work must be decomposed by interfaces and file ownership.

## Required task output

- Summary and requirement IDs.
- Files changed.
- Commands/tests run and results.
- Screens/device widths checked.
- Accessibility/privacy/performance impact.
- New dependencies or configuration.
- Remaining risks/TODOs.
- Handoff instructions for the next agent.

## Definition of complete

Implementation, tests, documentation, content validation, error states, reduced-motion behavior, mobile layout, and evidence are all present. “Code compiles” is insufficient.
