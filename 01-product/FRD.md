# Functional Requirements Document (FRD)

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Specify observable product behavior and business rules.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


## Functional requirements

| ID | Area | Requirement | Priority |
|---|---|---|---|
| FR-001 | Access | The system shall deny story content until the configured access rule succeeds. | P0 |
| FR-002 | Narrative lock | The experience shall accept Switzerland case-insensitively after trim/normalization. | P0 |
| FR-003 | Audio consent | The system shall start music only after a user gesture and retain a visible mute control. | P0 |
| FR-004 | Birthday state | The system shall derive countdown and celebration state using Asia/Kolkata unless configured otherwise. | P0 |
| FR-005 | Story progression | The user shall navigate forward and backward using taps and gestures without losing progress. | P0 |
| FR-006 | Deep-link safety | Protected internal routes shall not expose private copy or media when opened directly. | P0 |
| FR-007 | Photo gallery | Photos shall support lazy loading, swipe, zoom, captions, and an accessible close action. | P0 |
| FR-008 | Video playback | Opening video shall pause or duck background music and restore it after playback. | P0 |
| FR-009 | Voice playback | Voice-note playback shall pause or duck background music and expose elapsed/duration state. | P0 |
| FR-010 | Quiz | The quiz shall present one question at a time, normalize answers, and provide gentle retry feedback. | P0 |
| FR-011 | Quiz completion | Completing all required questions shall unlock the next story section. | P0 |
| FR-012 | Letter | The letter shall be readable without waiting for animation and respect reduced-motion settings. | P0 |
| FR-013 | Finale | The finale shall provide a tap fallback for every sensor-based interaction. | P0 |
| FR-014 | Progress persistence | The experience shall retain non-sensitive local progress across accidental refreshes. | P1 |
| FR-015 | Content validation | Build shall fail when required content IDs, media references, or answer definitions are invalid. | P0 |
| FR-016 | No indexing | Production shall use noindex/nofollow directives and generic social metadata. | P0 |
| FR-017 | Error recovery | Media failures shall show an emotionally neutral retry/skip state rather than a broken page. | P0 |
| FR-018 | Replay | The ending shall allow replay without requiring the user to re-enter personal answers unless configured. | P1 |
| FR-019 | Admin-free content | All personalized content shall be file-driven and deployable without a database or CMS for this release. | P0 |
| FR-020 | Deletion | The deployment owner shall be able to remove the site and media using a documented retirement procedure. | P0 |

## Business rules

1. The target birthday instant is configured explicitly; baseline timezone is `Asia/Kolkata`.
2. Before the target day, show a countdown; on or after the configured day, show the celebration state.
3. Normalize text quiz answers by Unicode normalization, trim, whitespace collapse, and case folding. Date answers use explicit ISO values internally.
4. Quiz failures never shame the user and never expose technical details.
5. Background music begins only after the user taps Start. Mute state remains visible throughout.
6. Voice and video are foreground media: background music pauses or ducks and then restores predictably.
7. Sensor interactions may enhance but never gate the ending.
8. Personal media is served only through the approved protected delivery path.
9. The app records only local, non-sensitive progress unless the client explicitly approves privacy-safe telemetry.
10. Missing optional media must not break the story. Missing P0 content must fail validation before deployment.

## State model

`locked -> ready -> welcome -> countdown|birthday -> story -> gallery -> video -> voice -> quiz -> memories -> letter -> cake -> finale -> ending`

Each transition has a forward path, back path where emotionally appropriate, and a recoverable error path. Browser refresh restores the nearest safe section, not an unstable animation frame.

## Error states

- Access failure: generic retry message; no indication whether an asset exists.
- Media failure: Retry, Skip, and Continue controls where content is not mandatory.
- Offline/interrupted network: retain current copy and loaded asset; provide resume when online.
- Unsupported sensor/microphone: silently present tap alternative.
- Invalid content build: fail CI with file, field, and stable ID.
- Date configuration failure: production build fails; no fallback to system guess.

## Administrative operations

There is no runtime admin UI. Content changes occur through version-controlled typed files, media manifests, review status, CI validation, preview deployment, and explicit production promotion.
