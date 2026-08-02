# Software Requirements Specification (SRS)

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Consolidate system context, interfaces, data, constraints, and verification for implementation.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


## 1. System context

The application is a Next.js web experience deployed to a managed web platform. A server-side access layer protects the story. Personalized content is validated at build time and rendered in a client-side state machine after authorization. Media is delivered from an approved protected origin or guarded route.

## 2. External interfaces

### User interface

Touch-first portrait interface, semantic HTML, visible focus, 44x44 CSS px minimum interactive targets, safe-area padding, no required hover, and no hidden critical controls.

### Browser media

HTML audio/video with explicit user initiation. The application listens for play, pause, ended, error, visibility, and interruption-related events and maintains a single audio coordination state.

### Optional device capabilities

Vibration, microphone input, screen wake lock, and device motion may be requested only in direct response to user action and always have a tap fallback.

### Hosting

Environment-specific secrets, protected previews, production domain, TLS, deployment logs, rollback, and retirement/removal procedure.

## 3. Data requirements

The content model includes project metadata, participants, important dates, chapters, albums, media, quiz definitions, reasons, memories, dreams, letter, music tracks, finale copy, feature flags, and privacy settings. Stable IDs are immutable once referenced.

No personal content is hardcoded in UI components. No secret is exposed through `NEXT_PUBLIC_*` variables. Media records include approval, rights, and alt/caption fields.

## 4. Software requirements

The normative functional requirements are FR-001 through FR-020. The normative quality requirements are NFR-001 through NFR-012. Screen behavior is defined in the screen specification; conflicts are resolved by the authority order in the package README.

## 5. Security and privacy

Threats include direct asset URL discovery, client-bundle inspection, repository leakage, social preview leakage, logs, analytics, stale preview deployments, and domain reuse. Controls are defined in `03-engineering/SECURITY_AND_PRIVACY_ARCHITECTURE.md`.

## 6. Verification model

- Static: schema validation, typecheck, lint, dependency audit, secret scan, orphaned media check.
- Unit: date state, answer normalization, audio state, transition reducer, content validation.
- Component: controls, error states, reduced motion, keyboard/focus, media events.
- E2E: locked/unlocked flows, complete story, refresh recovery, media errors, direct URLs, production build.
- Manual: real-device touch, sound, interruptions, safe areas, performance, emotional pacing, copy approval.

## 7. Acceptance

A requirement is accepted only when its evidence link, tester, device/browser, result, and date are recorded. “Looks good” without evidence is not acceptance.
