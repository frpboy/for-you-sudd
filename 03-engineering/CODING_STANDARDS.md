# Coding Standards

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Define implementation quality, naming, component, state, and review rules.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


## TypeScript

Strict mode, explicit public types, discriminated unions for story/media states, exhaustive switches, immutable data, and no silent type assertions around content. Parse unknown data at boundaries.

## React / Next.js

Server components by default. Add `use client` only at the lowest interactive boundary. Avoid effects for derived state. Clean all listeners/timers/media handlers. Use semantic HTML before ARIA. Keep components focused and composable.

## Naming

- Components: PascalCase.
- Hooks: `use...`.
- Stable content IDs: lowercase kebab-case and never recycled.
- Test IDs: only when semantic selectors are not practical.
- Feature flags: positive names such as `enableMemoryJar`.
- Assets: `YYYY-MM-DD_album_subject_sequence.ext` where date is known.

## Error handling

Never swallow errors. Convert technical failures to typed domain errors, log privacy-safe details, and render user recovery. Do not expose file paths, secrets, stack traces, or personal data.

## Styling

Use tokens and shared primitives. No hardcoded one-off colors outside approved tokens. Avoid `!important`. Test text scaling and safe areas. Respect reduced motion in both CSS and JavaScript.

## Testing

Every pure domain function requires unit tests. Every P0 component requires success, error, and reduced-motion coverage. Every user-critical path requires E2E. A bug fix includes a regression test where feasible.

## Pull requests

Small and single-purpose. Include requirement IDs, screenshots/video where relevant, test evidence, accessibility notes, privacy impact, dependency changes, and rollback considerations.
