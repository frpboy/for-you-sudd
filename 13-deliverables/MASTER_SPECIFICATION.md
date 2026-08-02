# Our Story - Mobile Birthday Experience

## Master Product, UX, Technical, AI-Agent, QA, and Release Specification

**Target birthday:** 8 August 2026  
**Baseline date:** 2 August 2026  
**Status:** Planning and client-content intake  
**Primary platform:** Mobile web, portrait-first

This consolidated document is the principal human review artifact. Detailed operational templates, role prompts, machine-readable schemas, and starter assets remain in their respective package folders.


---

# Decisions and Open Items

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Separate approved facts from unresolved content and technical decisions.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


## Confirmed baseline

| Item | Value | Status |
|---|---|---|
| Birthday Date | 2026-08-08 | Confirmed |
| First Message | 2025-12-19 | Confirmed |
| Committed Date | 2025-12-26 | Confirmed |
| Committed Time | 18:12 | Confirmed |
| First Meet Date | 2026-01-06 | Confirmed |
| First Meet Time | 04:20 | Confirmed |
| First Meet Location | Krishnarajapuram Railway Station, Bengaluru | Confirmed |
| Dream Destination | Switzerland | Confirmed |
| Quiz Favourite Answer | Spending time together after fights | Confirmed |
| Theme | Beige and light green | Confirmed |
| Primary Device | Mobile phone in portrait orientation | Confirmed |
| Greeting | Happy Birthday to the most special person in my life! | Confirmed |

## Architectural decisions

| ID | Decision | Reason |
|---|---|---|
| D-01 | Mobile portrait is the primary experience; desktop is a centered adaptive presentation. | The recipient is expected to use a phone. |
| D-02 | Use one state-driven story route instead of a route for every screen. | Reduces reloads, audio interruption, navigation bugs, and agent fragmentation. |
| D-03 | Use Motion plus CSS; do not add GSAP by default. | One animation system is sufficient and reduces bundle/coordination risk. |
| D-04 | Use typed file-based content; no database/CMS for this deadline. | Content volume is small and privacy is easier to reason about. |
| D-05 | Treat microphone, vibration, shake, and wake lock as progressive enhancement. | Browser/device support and permissions vary. |
| D-06 | The Switzerland question is narrative, not security. | Its answer is present in relationship content and can be guessed or inspected. |
| D-07 | Require a real server-side access layer for private media. | Client-only gates do not protect source files or URLs. |
| D-08 | Instrumental or rights-cleared music only. | Avoid copyright and playback disputes. |
| D-09 | Freeze P0 scope on 6 August 2026 at 18:00 IST. | Preserve time for real-device QA and production verification. |

## Open items

| ID | Item | Owner | Status |
|---|---|---|---|
| OI-01 | Recipient name, exact spelling, nickname, and preferred salutation | Client / owner | Open |
| OI-02 | Sender name, nickname, and final signature | Client / owner | Open |
| OI-03 | Domain/subdomain and launch URL | Client / owner | Open |
| OI-04 | Final access policy: private link, passphrase, or managed protection | Client / owner | Open |
| OI-05 | Final birthday letter and exact on-screen copy approvals | Client / owner | Open |
| OI-06 | Final media files, chronology, captions, and consent/rights confirmation | Client / owner | Open |
| OI-07 | Voice-note file and approved transcript/caption | Client / owner | Open |
| OI-08 | Background music selection and evidence of usage rights | Client / owner | Open |
| OI-09 | Exact list of reasons, memories, inside jokes, and future dreams | Client / owner | Open |
| OI-10 | Whether content may remain online after the birthday and deletion date | Client / owner | Open |

## Change control

A decision is valid only when its ID, date, owner, selected option, and effect are recorded. Any change after the P0 freeze must include rollback impact and the tests that will be rerun.


---

# Product Requirements Document (PRD)

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Define the product outcome, scope, users, capabilities, metrics, constraints, and release plan.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


## 1. Product summary

“Our Story” is a private, mobile-first interactive birthday experience for one intended recipient. It retells the couple’s relationship through verified milestones, photos, short videos, voice notes, a quiz, a letter, and a final birthday reveal. It should feel like a polished personal app rather than a conventional scrolling microsite.

## 2. Problem statement

A generic greeting page cannot convey the emotional history contained in dozens of personal media files and relationship milestones. The product must organize those assets into a coherent 10-15 minute journey while remaining fast, private, accessible, and stable on a phone under a fixed deadline.

## 3. Goals

1. Create a memorable, emotionally paced story that works naturally with one thumb.
2. Preserve and present approved relationship facts accurately.
3. Keep personal media private and prevent accidental search/social exposure.
4. Make the implementation deterministic for multiple AI agents.
5. Launch safely by 8 August 2026 with a documented rollback and retirement plan.

## 4. Non-goals

- A public social network, permanent photo hosting product, CMS, or account system.
- A native iOS/Android application.
- Real security based solely on the Switzerland quiz answer.
- Heavy 3D or sensor interactions that can block completion.
- Analytics that collect answers, names, media, or intimate behavior.
- A desktop-first, multi-column marketing site.

## 5. Users and stakeholders

| Role | Need | Authority |
|---|---|---|
| Recipient | Enjoy the story privately and without technical friction. | Experience user; no configuration. |
| Client/sender | Approve facts, media, message, access, and launch. | Final content approver. |
| Project owner | Coordinate client, agents, testing, domain, deployment, and deletion. | Product/release owner. |
| AI agents | Implement narrow tasks against explicit contracts. | No authority to invent content or change scope. |
| Test reviewer | Verify real-device quality and privacy. | Can block release. |

## 6. Product principles

- **Emotion through pacing, not clutter.** One focal element per view.
- **Content before effects.** No animation compensates for missing or incorrect copy.
- **Private by architecture.** Personal media is not protected by a cosmetic input screen.
- **Every flourish has a fallback.** Tap always works; sensors are optional.
- **Fast first meaningful moment.** Do not preload the entire media library.
- **Respect the recipient.** Music, motion, and haptics remain controllable.

## 7. Release scope

### P0 - launch-blocking

Private access, explicit start/audio consent, welcome, date-aware countdown, four verified timeline chapters, grouped photo gallery, video playback, voice note, five-question quiz, readable love letter, final gift reveal, music controls, forward/back navigation, progress restoration, mobile safe areas, reduced-motion mode, media error recovery, privacy headers/metadata, QA, deployment, rollback, and deletion procedure.

### P1 - include only after P0 is stable

Memory jar, reasons sequence, future dreams, tap-based cake, local progress persistence, secret-memory easter egg, lightweight confetti, optional screen wake lock.

### P2 - deliberately deferrable

Microphone candle detection, shake-to-open, vibration cues, complex scratch card, multiple synchronized soundtrack chapters, 3D cake, advanced parallax, cursor follower, and complex hidden gestures.

## 8. Core journey

Private entry -> explicit start -> welcome -> countdown/birthday state -> story chapters -> galleries -> videos -> voice note -> quiz -> optional memories/reasons/dreams -> love letter -> cake -> final gift -> ending/replay.

The user may move backward, mute at any time, skip non-critical media after a load error, and complete the experience without granting sensor or microphone permissions.

## 9. Content baseline

Confirmed facts are listed in `SOURCE_REQUIREMENTS_BASELINE.md`. Names, letter, media, captions, rights, and music remain approval inputs. All content must be represented in typed data with stable IDs and review status.

## 10. Success measures

| Measure | Target |
|---|---|
| P0 completion | 100% of required sections reachable on supported test devices |
| Fatal errors | 0 during three consecutive production end-to-end runs |
| Mobile overflow | 0 at required viewport widths |
| Content accuracy | 100% approved facts and quiz answers match sign-off sheet |
| Private exposure checks | No story copy/media before valid authorization; no search indexing directives missing |
| Performance | LCP <= 2.5 s p75 target on representative mobile testing; no full-library preloading |
| Accessibility | No critical automated violations; manual reduced-motion, focus, labels, captions, and contrast pass |
| Client UAT | Written approval before production launch |

## 11. Constraints

- Fixed event date and compressed implementation window.
- Personal content may arrive late or unordered.
- Mobile browsers restrict autoplay and some sensor APIs.
- Network quality is unknown.
- Recipient device model is unknown.
- Private media and copyrighted music create legal/privacy obligations.

## 12. Dependencies

Client content approval, media delivery, rights confirmation, domain choice, hosting/access decision, production environment variables, real-device testers, and ownership of the deployment account.

## 13. Release policy

No P2 enhancement may enter production after the scope freeze unless it fixes a release blocker and passes the full affected regression suite. The release owner may ship a simpler polished experience rather than a fragile feature-rich one.


---

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


---

# Non-Functional Requirements

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Define quality attributes that constrain all implementation decisions.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


| ID | Quality attribute | Requirement | Priority |
|---|---|---|---|
| NFR-001 | Performance | LCP <= 2.5 s at p75 on representative mobile production tests after the initial private gate. | P0 |
| NFR-002 | Responsiveness | No horizontal overflow at 320, 360, 375, 390, 412, and 430 CSS px. | P0 |
| NFR-003 | Accessibility | Target WCAG 2.2 AA for keyboard, contrast, names, focus, captions, reduced motion, and touch targets. | P0 |
| NFR-004 | Privacy | Personal assets shall not be embedded in public source control or exposed before authorization. | P0 |
| NFR-005 | Security | Secrets and access verification shall execute server-side; no plaintext passphrase in client bundles. | P0 |
| NFR-006 | Reliability | Core story remains usable when audio, vibration, microphone, wake lock, or motion sensors are unavailable. | P0 |
| NFR-007 | Compatibility | Support current Safari iOS and Chrome Android; graceful degradation on other modern browsers. | P0 |
| NFR-008 | Maintainability | Typed content, stable IDs, lint/type/test gates, and documented agent handoffs are mandatory. | P0 |
| NFR-009 | Media efficiency | Images shall be resized and encoded to AVIF/WebP with a JPEG fallback; video shall use phone-friendly MP4. | P0 |
| NFR-010 | Observability | Production shall expose privacy-safe operational errors without collecting story answers or personal content. | P1 |
| NFR-011 | Motion safety | Non-essential motion shall be disabled or simplified under prefers-reduced-motion. | P0 |
| NFR-012 | Asset integrity | A build-time manifest shall detect missing and orphaned media. | P0 |

## Quality budgets

| Budget | Initial threshold |
|---|---|
| Initial JavaScript | Prefer <= 180 KB compressed for the story shell; justify exceptions |
| First critical images | Hero/poster derivatives only; no gallery-wide preload |
| Individual photo derivative | Target <= 250 KB for common mobile display sizes |
| Video | H.264/AAC MP4, optimized for progressive playback; poster required |
| Audio | Compressed AAC/MP3; no unnecessary high bitrate |
| Animation | Transform/opacity preferred; avoid layout-thrashing loops |
| Third-party scripts | None by default; each requires privacy and performance approval |

## Verification

Every NFR maps to an automated or manual test in `06-quality-assurance/`. A quality requirement cannot be waived silently; waivers require owner, rationale, expiry, and residual risk.


---

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


---

# Information Architecture and Experience Flow

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Define the complete story sequence, branching, navigation, and recovery paths.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


## Primary flow

| ID | Screen / chapter | Purpose | Priority |
|---|---|---|---|
| S01 | Preflight Loader | Load only critical assets; never block indefinitely. | P0 |
| S02 | Private Entry | Server-validated access plus narrative Switzerland question. | P0 |
| S03 | Start / Audio Consent | Explicit tap begins the experience and enables audio. | P0 |
| S04 | Birthday Welcome | Recipient name, greeting, and Begin button. | P0 |
| S05 | Countdown / Birthday State | Countdown before 8 August; celebration state on/after date. | P0 |
| S06 | Story Chapters | Swipe/tap progression through relationship milestones. | P0 |
| S07 | Photo Albums | Grouped, swipeable, zoomable, captioned photo memories. | P0 |
| S08 | Video Memories | Inline poster cards and accessible full-screen playback. | P0 |
| S09 | Voice Message | Focused player; music ducks or pauses. | P0 |
| S10 | Relationship Quiz | One question per view; five approved questions. | P0 |
| S11 | Memory Jar | Tap to reveal short memories from approved content. | P1 |
| S12 | Why I Love You | Progressive reveal of approved reasons. | P1 |
| S13 | Future Dreams | Shared goals, including Switzerland. | P1 |
| S14 | Love Letter | Readable letter with optional restrained typewriter reveal. | P0 |
| S15 | Birthday Cake | Tap candle; microphone detection is progressive enhancement. | P1 |
| S16 | Final Gift | Tap gift; device shake is progressive enhancement. | P0 |
| S17 | Ending / Replay | Final message, replay, and safe share behavior. | P0 |
| S18 | Secret Memories | Optional hidden gallery after deliberate easter egg. | P2 |

## Navigation model

- One state-driven story shell at `/story`; access entry may be separate.
- Primary advance: large lower-screen button or tap target; swipe-up is an optional equivalent.
- Previous: explicit back control after the welcome screen; browser Back must not unexpectedly exit without a safe confirmation behavior.
- Progress: subtle segmented indicator with accessible text such as “Chapter 4 of 12.”
- Global: mute/unmute, pause/resume where relevant, and close for overlays.
- No bottom navigation bar, hamburger menu, or hover-only interaction.

## Branches

- Before birthday: countdown appears and then allows preview only if approved.
- On/after birthday: welcome transitions directly to celebration state.
- Media failure: retry -> skip -> continue; mandatory missing content is a pre-launch failure.
- Reduced motion: dissolve/instant transitions instead of parallax, typewriter, floating particles, and motion-heavy reveals.
- No sensor permission/support: tap-based cake and gift remain available.

## Completion model

The quiz may gate the letter but never trap the recipient permanently. After a configurable number of retries, an affectionate hint or alternate accepted input is shown. The final reveal cannot be lost due to refresh; a safe progress marker is stored locally.


---

# Mobile UX Specification

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Define phone-first layout, gestures, safe areas, ergonomics, and browser behavior.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


## Viewport and layout

- Design baseline: 390x844 CSS px portrait; verify 320-430 px widths.
- Use `min-height: 100svh` for stable initial viewport and `100dvh` only where dynamic resize is intended.
- Respect `env(safe-area-inset-*)`; no control sits under a notch, home indicator, or browser chrome.
- Desktop/tablet: center the experience in a restrained max-width shell; do not expand text into wide columns.
- Keep primary action in the lower thumb zone with at least 16 px edge clearance plus safe-area inset.

## Touch and gestures

- Minimum target 44x44 CSS px; increase for primary actions.
- Every swipe action has a visible tap alternative.
- Do not hijack vertical scrolling inside the letter, captions, or zoomed media.
- Prevent double-trigger during transitions with short input locking, not long arbitrary delays.
- Never depend on long-press, hover, device shake, or precision drag for required completion.

## Orientation and interruptions

Portrait is primary. On landscape, preserve controls and offer a gentle rotate suggestion only if layout quality is materially reduced; never hard-block. On background/foreground or phone-call interruption, pause foreground media and restore UI state without unexpectedly restarting sound.

## In-app browsers

Test common in-app browser behavior. Provide an “Open in browser” suggestion only when a capability is genuinely unavailable, not as the default. Keep URL and access flow simple enough to open from messaging apps.

## One-thumb pacing

One main decision per view. Keep reading blocks short except the letter. Avoid dense navigation. Progress should reassure rather than pressure. The total journey target is 10-15 minutes, but users may pause or replay.


---

# Screen Specifications

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Provide the normative screen-by-screen contract for design, content, and implementation.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.

## S01 - Preflight Loader (P0)

**Purpose:** Load only critical assets; never block indefinitely.

**Required elements:** Heart/monogram, short loader label, progress only when real.

**Interaction:** No user action; 2.5 s maximum before recoverable state.

**States:** default, loading where applicable, active, success, recoverable error, reduced motion, and unavailable-feature fallback.

**Implementation notes:** Do not fake long loading; preload only shell and next critical image.

**Acceptance:** Usable at 320 px width, no hidden required action, semantic labels, visible focus, and completion without gesture/sensor dependency.

## S02 - Private Entry (P0)

**Purpose:** Server-validated access plus narrative Switzerland question.

**Required elements:** Generic private-entry copy, answer input, continue, error region.

**Interaction:** Submit, trim/normalize, rate-limit server verification.

**States:** default, loading where applicable, active, success, recoverable error, reduced motion, and unavailable-feature fallback.

**Implementation notes:** Narrative question may follow real access; never expose answer in client security logic.

**Acceptance:** Usable at 320 px width, no hidden required action, semantic labels, visible focus, and completion without gesture/sensor dependency.

## S03 - Start / Audio Consent (P0)

**Purpose:** Explicit tap begins the experience and enables audio.

**Required elements:** “Tap to begin,” sound disclosure, mute-first alternative.

**Interaction:** Tap starts audio context and initializes story state.

**States:** default, loading where applicable, active, success, recoverable error, reduced motion, and unavailable-feature fallback.

**Implementation notes:** Autoplay must not be assumed.

**Acceptance:** Usable at 320 px width, no hidden required action, semantic labels, visible focus, and completion without gesture/sensor dependency.

## S04 - Birthday Welcome (P0)

**Purpose:** Recipient name, greeting, and Begin button.

**Required elements:** Recipient name placeholder, confirmed greeting, short intro, Begin.

**Interaction:** Single thumb-reachable CTA.

**States:** default, loading where applicable, active, success, recoverable error, reduced motion, and unavailable-feature fallback.

**Implementation notes:** No personal name until approved.

**Acceptance:** Usable at 320 px width, no hidden required action, semantic labels, visible focus, and completion without gesture/sensor dependency.

## S05 - Countdown / Birthday State (P0)

**Purpose:** Countdown before 8 August; celebration state on/after date.

**Required elements:** Days/hours/minutes/seconds or birthday message.

**Interaction:** Updates without disruptive announcements; continue available.

**States:** default, loading where applicable, active, success, recoverable error, reduced motion, and unavailable-feature fallback.

**Implementation notes:** Timezone must be explicit and boundary-tested.

**Acceptance:** Usable at 320 px width, no hidden required action, semantic labels, visible focus, and completion without gesture/sensor dependency.

## S06 - Story Chapters (P0)

**Purpose:** Swipe/tap progression through relationship milestones.

**Required elements:** Date, time, chapter title, approved copy, image/map-style card.

**Interaction:** Swipe/tap forward/back; subtle progress.

**States:** default, loading where applicable, active, success, recoverable error, reduced motion, and unavailable-feature fallback.

**Implementation notes:** Map visual is decorative unless client approves external map link.

**Acceptance:** Usable at 320 px width, no hidden required action, semantic labels, visible focus, and completion without gesture/sensor dependency.

## S07 - Photo Albums (P0)

**Purpose:** Grouped, swipeable, zoomable, captioned photo memories.

**Required elements:** Album cards, photo viewer, captions, close, previous/next.

**Interaction:** Tap album; swipe images; pinch zoom where library supports it.

**States:** default, loading where applicable, active, success, recoverable error, reduced motion, and unavailable-feature fallback.

**Implementation notes:** Lazy-load and never decode all originals at once.

**Acceptance:** Usable at 320 px width, no hidden required action, semantic labels, visible focus, and completion without gesture/sensor dependency.

## S08 - Video Memories (P0)

**Purpose:** Inline poster cards and accessible full-screen playback.

**Required elements:** Video poster, title, duration, play/pause, captions if speech.

**Interaction:** Tap play; pause/duck music; return to exact position.

**States:** default, loading where applicable, active, success, recoverable error, reduced motion, and unavailable-feature fallback.

**Implementation notes:** Do not autoplay videos.

**Acceptance:** Usable at 320 px width, no hidden required action, semantic labels, visible focus, and completion without gesture/sensor dependency.

## S09 - Voice Message (P0)

**Purpose:** Focused player; music ducks or pauses.

**Required elements:** Voice-note title, waveform/progress, elapsed/duration, transcript.

**Interaction:** Tap play/pause/seek; background music pauses/ducks.

**States:** default, loading where applicable, active, success, recoverable error, reduced motion, and unavailable-feature fallback.

**Implementation notes:** Transcript/caption required when intelligible speech is essential.

**Acceptance:** Usable at 320 px width, no hidden required action, semantic labels, visible focus, and completion without gesture/sensor dependency.

## S10 - Relationship Quiz (P0)

**Purpose:** One question per view; five approved questions.

**Required elements:** One question, progress, appropriate input, feedback, next.

**Interaction:** Date or choice input; accepted-answer normalization.

**States:** default, loading where applicable, active, success, recoverable error, reduced motion, and unavailable-feature fallback.

**Implementation notes:** Wrong answers are gentle and privacy-safe.

**Acceptance:** Usable at 320 px width, no hidden required action, semantic labels, visible focus, and completion without gesture/sensor dependency.

## S11 - Memory Jar (P1)

**Purpose:** Tap to reveal short memories from approved content.

**Required elements:** Jar illustration, tap affordance, approved memory card.

**Interaction:** Tap reveals one unused memory; repeat or continue.

**States:** default, loading where applicable, active, success, recoverable error, reduced motion, and unavailable-feature fallback.

**Implementation notes:** No invented memories.

**Acceptance:** Usable at 320 px width, no hidden required action, semantic labels, visible focus, and completion without gesture/sensor dependency.

## S12 - Why I Love You (P1)

**Purpose:** Progressive reveal of approved reasons.

**Required elements:** One approved reason per card with count/progress.

**Interaction:** Tap/swipe reveal; skip to end available.

**States:** default, loading where applicable, active, success, recoverable error, reduced motion, and unavailable-feature fallback.

**Implementation notes:** Avoid excessive mandatory taps.

**Acceptance:** Usable at 320 px width, no hidden required action, semantic labels, visible focus, and completion without gesture/sensor dependency.

## S13 - Future Dreams (P1)

**Purpose:** Shared goals, including Switzerland.

**Required elements:** Approved future goals with simple illustrations.

**Interaction:** Swipe/tap; Switzerland may be one card.

**States:** default, loading where applicable, active, success, recoverable error, reduced motion, and unavailable-feature fallback.

**Implementation notes:** Mark all unapproved future claims as placeholders.

**Acceptance:** Usable at 320 px width, no hidden required action, semantic labels, visible focus, and completion without gesture/sensor dependency.

## S14 - Love Letter (P0)

**Purpose:** Readable letter with optional restrained typewriter reveal.

**Required elements:** Readable paper surface, full letter, sender signature.

**Interaction:** Scroll within page; optional reveal can be skipped.

**States:** default, loading where applicable, active, success, recoverable error, reduced motion, and unavailable-feature fallback.

**Implementation notes:** Letter is visible immediately under reduced motion.

**Acceptance:** Usable at 320 px width, no hidden required action, semantic labels, visible focus, and completion without gesture/sensor dependency.

## S15 - Birthday Cake (P1)

**Purpose:** Tap candle; microphone detection is progressive enhancement.

**Required elements:** Cake/candle visual, tap instruction, optional mic enhancement.

**Interaction:** Tap candle always works; mic request only after explicit action.

**States:** default, loading where applicable, active, success, recoverable error, reduced motion, and unavailable-feature fallback.

**Implementation notes:** No microphone recording or upload.

**Acceptance:** Usable at 320 px width, no hidden required action, semantic labels, visible focus, and completion without gesture/sensor dependency.

## S16 - Final Gift (P0)

**Purpose:** Tap gift; device shake is progressive enhancement.

**Required elements:** Gift box, tap instruction, final copy, confetti.

**Interaction:** Tap always opens; shake optional after permission/support check.

**States:** default, loading where applicable, active, success, recoverable error, reduced motion, and unavailable-feature fallback.

**Implementation notes:** Confetti stops and respects reduced motion.

**Acceptance:** Usable at 320 px width, no hidden required action, semantic labels, visible focus, and completion without gesture/sensor dependency.

## S17 - Ending / Replay (P0)

**Purpose:** Final message, replay, and safe share behavior.

**Required elements:** Ending copy, replay, optional close/share guidance.

**Interaction:** Replay resets view state while retaining authorization.

**States:** default, loading where applicable, active, success, recoverable error, reduced motion, and unavailable-feature fallback.

**Implementation notes:** No public share button containing personal preview by default.

**Acceptance:** Usable at 320 px width, no hidden required action, semantic labels, visible focus, and completion without gesture/sensor dependency.

## S18 - Secret Memories (P2)

**Purpose:** Optional hidden gallery after deliberate easter egg.

**Required elements:** Optional secret album with clear exit.

**Interaction:** Deliberate easter egg only; no accidental discovery requirement.

**States:** default, loading where applicable, active, success, recoverable error, reduced motion, and unavailable-feature fallback.

**Implementation notes:** P2; must not destabilize release.

**Acceptance:** Usable at 320 px width, no hidden required action, semantic labels, visible focus, and completion without gesture/sensor dependency.


---

# Visual Design System

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Define an implementable premium beige and light-green visual language.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


## Design direction

Soft, romantic, elegant, minimal, and premium. Use the restraint of a luxury invitation or editorial photo essay. Avoid neon pink, dense heart motifs, loud gradients, or novelty UI.

## Color tokens

| Token | Value | Use |
|---|---|---|
| `--color-canvas` | `#F8F4EC` | Main background |
| `--color-surface` | `#F3EBDD` | Cards and paper surfaces |
| `--color-primary` | `#A8C7A0` | Primary accents and gentle fills |
| `--color-primary-strong` | `#5B7553` | Buttons, icons, high-contrast accents |
| `--color-accent` | `#DFC8A8` | Warm decorative accent |
| `--color-text` | `#2E2E2E` | Primary text |
| `--color-text-muted` | `#6E6A65` | Secondary text; verify contrast |
| `--color-danger` | `#9B4A4A` | Recoverable error only |
| `--color-overlay` | `rgba(24,22,20,.72)` | Media viewer overlay |

All final combinations must pass contrast tests. Decorative pale colors must not carry essential text alone.

## Typography

- Display/script: use a licensed web-safe or self-hosted approved font; limit to names and short headings.
- Editorial quotes: a readable serif.
- Interface/body: a highly legible sans-serif.
- Do not depend on externally hosted fonts for private content without privacy/performance approval.
- Body minimum: 16 px; letter typically 17-19 px; controls 16 px; avoid ultra-light weights.

Suggested fallback stacks:

```css
--font-display: "Great Vibes", "Segoe Script", cursive;
--font-editorial: "Playfair Display", Georgia, serif;
--font-ui: Poppins, Inter, system-ui, sans-serif;
```

## Spacing and geometry

Use a 4 px base scale; common spacing 8, 12, 16, 24, 32, 48. Cards use 20-28 px padding, 20-28 px radius, and soft restrained shadow. One primary card per screen; avoid nested glass panels.

## Components

Primary button, quiet secondary button, icon control, progress indicator, story card, media card, album card, quiz option, feedback banner, paper letter, audio player, video player, modal viewer, cake/gift interaction, and error recovery panel. Every component documents focus, disabled, loading, reduced-motion, and error states.

## Imagery

Preserve original emotional meaning and avoid aggressive crops. Use object-position metadata per asset. Never apply filters that materially alter skin tones or obscure subjects. Blurred backgrounds are generated from approved images and never replace alt/caption content.


---

# Motion and Microinteractions

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Set a restrained motion system that supports emotion without harming performance or accessibility.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


## Motion principles

- Motion explains progression and focus; it is not constant decoration.
- Use one primary animation system: Motion for React plus CSS transitions/keyframes.
- Prefer opacity and transform; avoid animating layout properties on large surfaces.
- Default transition 220-450 ms. Emotional chapter transitions may reach 700 ms but must remain interruptible.
- No infinite non-essential animation except a very subtle, low-cost active indicator.

## Motion tokens

| Token | Value |
|---|---|
| Fast | 160 ms |
| Standard | 280 ms |
| Narrative | 520 ms |
| Enter easing | cubic-bezier(0.22, 1, 0.36, 1) |
| Exit easing | cubic-bezier(0.4, 0, 1, 1) |
| Spring | low-bounce, critically controlled |

## Approved patterns

Fade/slide reveal, gentle photo scale, card lift on press, subtle heart burst for correct answers, restrained confetti, flame flicker, and gift anticipation. Typewriter is optional and skippable. Parallax is P2 and disabled in reduced motion.

## Reduced motion

Under `prefers-reduced-motion: reduce`:

- Replace slides, zoom, parallax, particle fields, typewriter, shake, and auto-sequenced reveals with instant or short fades.
- Keep all information and controls visible.
- Stop non-essential looping animation.
- Do not force the user to wait through decorative sequencing.

## Haptic-style feedback

Visual scale/opacity feedback is the baseline. Browser vibration, where supported and explicitly appropriate, is a tiny optional cue and never the only feedback.


---

# Accessibility Specification

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Define the WCAG-aligned accessibility contract for the complete experience.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


## Target

WCAG 2.2 AA as a practical release target, with manual checks for mobile touch, motion, sound, captions, and focus.

## Requirements

- Semantic landmarks and a logical heading hierarchy.
- Correct button/link/input elements; no clickable generic containers.
- Visible focus and predictable focus movement when overlays open/close.
- Every image has intentional alt: informative, decorative empty alt, or caption relationship.
- Video with meaningful speech has captions or an approved text alternative.
- Voice note has an approved transcript or equivalent message text.
- Color is never the sole indicator of quiz success/error.
- Text and controls meet contrast requirements.
- Touch targets are at least 44x44 CSS px.
- Reduced-motion preference is honored globally.
- Music and media controls have accessible names, state, and keyboard operation.
- Countdown does not announce every second; screen readers receive a restrained summary.
- Errors are programmatically associated with the relevant input.
- Letter content remains selectable/readable and is not rendered only on canvas.

## Gesture alternatives

Swipe -> Next/Previous buttons. Pinch -> zoom buttons or accessible viewer. Blow -> tap candle. Shake -> tap gift. Scratch -> reveal button. Long press -> explicit control.

## Test matrix

Automated axe/Lighthouse checks are necessary but insufficient. Manually test screen-reader labels, keyboard traversal, focus trapping, 200% text zoom, reduced motion, captions, muted use, and high-contrast/forced-color behavior where available.


---

# Technical Architecture

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Define the production architecture, boundaries, runtime flow, and implementation decisions.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


## 1. Recommended baseline

- Next.js App Router, current supported LTS line at implementation time.
- TypeScript in strict mode.
- React Server Components by default; client components only for stateful story/media interaction.
- Tailwind CSS for tokens/utilities and a small global CSS layer.
- Motion for React plus CSS for animation; no second animation framework by default.
- Zod or equivalent runtime schema validation for content and environment configuration.
- Playwright for end-to-end testing, Vitest for unit/component logic, axe for accessibility automation.
- Managed deployment with TLS, preview environments, environment secrets, and rollback.

## 2. Logical architecture

```text
Browser
  -> TLS / hosting edge
  -> server-side access guard
  -> authorized story shell
  -> typed content manifest
  -> client story state machine
  -> media controller / global audio coordinator
  -> protected or approved media delivery
```

## 3. Route design

```text
/                 generic private landing or redirect
/access           access verification UI
/story            state-driven experience shell
/api/access       server-side credential/passphrase verification
/api/media/*      optional guarded delivery/signing layer
/health           minimal non-personal health response (optional)
```

Do not create a Next.js route for each story screen. A route-per-screen causes extra navigation complexity, audio resets, loading flashes, privacy inconsistencies, and conflicting agent ownership. Use one story state reducer with stable chapter IDs and optional URL hash/query synchronization.

## 4. Server/client boundary

### Server responsibilities

Authorization, secure cookie/session creation, environment validation, generic metadata, robots headers, protected asset authorization/signing, and content delivery that must not be exposed before access.

### Client responsibilities

Story state, gestures, animations, local non-sensitive progress, audio/video events, quiz input, reduced-motion adaptation, and optional device capability detection.

No passphrase, access secret, or privileged media key is placed in client bundles or `NEXT_PUBLIC_*` variables.

## 5. Content architecture

Content is data, not component code. A build-time loader validates `content-config.json` against a schema, verifies stable IDs and media references, then supplies only authorized content to the story shell. Components render generic structures such as `StoryChapter`, `Album`, `QuizQuestion`, and `Letter`.

## 6. State management

Use a typed reducer/state machine with explicit events:

```text
AUTHORIZED, STARTED, NEXT, PREVIOUS, OPEN_MEDIA, CLOSE_MEDIA,
MEDIA_PLAY, MEDIA_PAUSE, ANSWER_SUBMIT, ANSWER_ACCEPTED,
ANSWER_REJECTED, FEATURE_UNAVAILABLE, RETRY, SKIP, REPLAY
```

Keep transient animation state separate from durable story progress. Persist only safe chapter/quiz progress locally; never store the access secret or personal answers in analytics.

## 7. Media architecture

- Originals remain outside public source control.
- Build pipeline produces web derivatives, posters, dimensions, blur placeholders, duration, and checksums.
- Image delivery selects appropriate sizes and modern formats.
- Video uses H.264/AAC MP4 baseline, poster frame, `playsInline`, metadata preload, and no autoplay.
- Voice/music use one coordinator so tracks never compete.
- Direct asset protection must match the chosen privacy model; `public/` is not private.

## 8. Resilience

Every asynchronous boundary has loading, timeout/retry, skip, and logging behavior. The shell renders without optional media. Error boundaries expose a gentle recovery screen, not a framework error. Production source maps and logs are configured to avoid personal-content leakage.

## 9. Observability

Prefer no analytics for this one-recipient experience. Operational monitoring may record route status, build/deployment health, aggregate Web Vitals, and anonymous error fingerprints. Never record names, answers, captions, media URLs with embedded identifiers, letter text, or voice/video content.

## 10. Deployment topology

Development -> preview -> content-approved preview -> production. Production promotion requires signed checklists. Retain the previous known-good deployment for instant rollback. On retirement, delete production alias, preview deployments containing personal content, protected storage objects, and temporary transfer files as approved.


---

# Data Model and Content Schema

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Define normalized, typed, reviewable content independent of UI implementation.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


## Core entities

### ProjectConfig

`id`, `title`, `birthdayAt`, `timezone`, `locale`, `participants`, `access`, `theme`, `featureFlags`, `chapters`, `albums`, `media`, `quiz`, `memories`, `reasons`, `dreams`, `letter`, `music`, `finale`, `privacy`.

### Participant

`id`, `role`, `displayName`, `nickname`, `pronouns` (optional), `signature`, `approvalStatus`.

### StoryChapter

`id`, `order`, `type`, `title`, `date`, `time`, `location`, `body`, `mediaIds`, `quote`, `approvalStatus`.

### MediaAsset

`id`, `kind`, `sourceRef`, `derivatives`, `albumId`, `capturedAt`, `duration`, `width`, `height`, `caption`, `alt`, `objectPosition`, `sensitive`, `rightsStatus`, `approvalStatus`, `checksum`.

### QuizQuestion

`id`, `order`, `inputType`, `prompt`, `acceptedAnswers`, `displayAnswer`, `hint`, `successCopy`, `retryCopy`, `maxAttemptsBeforeHint`, `required`.

### MusicCue

`id`, `assetId`, `startSection`, `endSection`, `loop`, `gain`, `fadeInMs`, `fadeOutMs`, `rightsStatus`.

## Validation rules

- IDs are unique, kebab-case, and immutable.
- All referenced media IDs exist and are approved.
- Required P0 fields are non-empty and not placeholder tokens in production.
- Dates are ISO-8601; times are 24-hour strings with explicit timezone at project level.
- Quiz answer normalization is declared per input type.
- Personal content cannot be marked `approved` without approver/date metadata.
- Music cannot be production-approved without `rightsStatus: licensed|royalty-free|owned`.
- Sensitive assets require the protected delivery strategy.
- Production validation rejects unresolved `TODO`, `TBD`, and `{{...}}` tokens in required fields.

See `08-templates/content-config.example.json` and `08-templates/content-schema.json`.


---

# Media Processing Pipeline

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Control quality, performance, privacy, naming, derivatives, and validation for personal assets.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


## Intake

1. Receive originals through an approved private channel.
2. Record each in the inventory before renaming or editing.
3. Hash originals, preserve a read-only archive, and work on copies.
4. Remove accidental screenshots, duplicates, and unapproved people/details.
5. Confirm chronology, caption, alt text, crop, sensitivity, consent, and rights.

## Images

- Correct orientation and strip unnecessary metadata from public derivatives.
- Produce practical widths such as 480, 768, 1080, and 1440 px where useful.
- Encode AVIF/WebP plus fallback based on framework support.
- Preserve dimensions/aspect ratio in the manifest.
- Generate a tiny blur placeholder or dominant-color token.
- Inspect faces and meaningful context at each crop; no automatic crop ships without review.

## Video

- Baseline MP4 using H.264 video and AAC audio for broad mobile compatibility.
- Preserve portrait orientation and `playsInline` behavior.
- Remove unnecessary metadata, trim dead time if approved, normalize rotation, and generate a reviewed poster frame.
- Provide captions or text alternative when spoken content carries meaning.
- Test seek, pause, return, interruption, and low-bandwidth startup.

## Audio

- Convert voice/music to a broadly supported compressed format.
- Normalize loudness conservatively; do not alter emotional tone.
- Record duration and waveform data if displayed.
- Keep voice notes separate from background music and coordinate through one manager.

## Build verification

The pipeline verifies file existence, case-sensitive paths, checksums, duplicate IDs, missing derivatives, missing posters, unsupported codecs, unapproved assets, and orphaned files. It outputs a machine-readable manifest and human review report.

## Privacy

Originals, transfer folders, temporary renders, EXIF/location metadata, and preview deployments are included in the retirement plan. Do not assume deleting a Git working file removes it from history.


---

# Audio and Media State Management

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Prevent competing audio, surprise playback, and inconsistent restoration.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


## Single coordinator

One `MediaCoordinator` owns background music and the relationship between music, video, and voice. Individual components emit intents; they do not independently manipulate global tracks.

## State

```text
consent: unknown | granted | muted
music: stopped | fading-in | playing | ducked | paused | fading-out
foreground: none | video:<id> | voice:<id>
visibility: visible | hidden
interruption: none | system | navigation | error
```

## Rules

1. No sound before explicit user action.
2. Only one foreground media item plays.
3. Starting voice/video pauses or ducks music according to configuration.
4. Closing/ending foreground media restores prior music state, unless user manually muted/paused.
5. Page visibility loss pauses foreground media; return never unexpectedly starts sound.
6. User mute takes precedence over automatic cues.
7. Track changes crossfade only after both assets are ready; failure retains silence or previous track.
8. Controls expose labels, state, duration, and errors.

## Tests

Start muted, start with sound, video start/end, voice start/end, manual mute during video, media failure, phone interruption simulation, background/foreground, rapid taps, route/hash change, and reduced-motion behavior.


---

# Security and Privacy Architecture

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Protect intimate content across access, storage, delivery, logs, previews, and retirement.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


## Security objective

Only approved viewers should receive personalized HTML/data/media, and no deployment artifact should unnecessarily expose relationship content.

## Threat model

- URL forwarding and guessing.
- Direct media URL discovery.
- Client-bundle inspection.
- Search engine or social preview caching.
- Public repository or Git history leakage.
- Preview deployment leakage.
- Analytics/error logs capturing personal data.
- Misconfigured storage, environment variables, or cookies.
- Stale deployments remaining after the event.

## Required controls

### Access

Use managed deployment protection or a server-side passphrase/session flow. Verification is rate-limited and returns a secure, HTTP-only, same-site cookie. The Switzerland question may be shown after real authorization as part of the story, or combined only as a low-risk convenience—not as the sole protection.

### Asset delivery

Do not place sensitive assets in an unguarded `public/` directory. Use guarded application routes, private object storage with short-lived signed URLs, or a hosting feature that protects all deployment assets. Verify direct asset requests while unauthenticated.

### Metadata and indexing

Use generic page title/description, `noindex,nofollow,noarchive`, no sitemap entries for private routes, no personalized Open Graph image, and restrictive referrer policy. Assume directives reduce accidental indexing but do not replace authentication.

### Secrets and sessions

Secrets are server-only, rotated if exposed, and separated by environment. Cookies use `Secure`, `HttpOnly`, and appropriate `SameSite`. Avoid long-lived bearer tokens in local storage.

### Repository

Private repository preferred. Personal media, final content configuration, `.env*`, exports, and transfer directories are ignored. Run secret and large-file scans before every push. If an asset enters history accidentally, rotate URLs/secrets and rewrite history according to a documented incident response.

### Logging

Do not log answers, letter text, names, filenames that reveal identity, access secrets, signed URLs, or media payloads. Use opaque IDs and sanitized error categories.

### Headers

Set CSP appropriate to the final asset/font/media origins, `X-Content-Type-Options: nosniff`, restrictive `Referrer-Policy`, frame restrictions, permissions policy disabling unused sensors, and HSTS through the platform.

## Data minimization

No account database, no relationship analytics, no voice recording, no microphone upload, and no server storage of quiz answers. Local progress contains only opaque section/question IDs.

## Retirement

Delete production alias/domain mapping, all personal preview deployments, object-storage files and versions, build artifacts, temporary transfers, monitoring attachments, and local working copies according to approval. Record completion without retaining personal content.


---

# Performance Engineering Plan

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Keep a media-heavy experience fast and stable on mobile networks.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


## Critical strategy

Render the authorized shell and first emotional moment quickly. Do not preload the full journey. Prefetch only the current and next likely chapter, cancel stale work, and release decoded media when appropriate.

## Budgets

- Small initial route JavaScript; client islands only where interactive.
- No duplicate animation framework.
- No third-party analytics, chat, or font scripts by default.
- First-screen image sized to viewport and compressed.
- Gallery thumbnails separate from full-screen derivatives.
- Video `preload="metadata"` or `none`; poster always present.
- Audio preloaded only after start consent and close to use.

## Techniques

Server-render static copy, reserve media dimensions, use responsive image `sizes`, lazy-load below-current content, dynamically import optional P1/P2 features, avoid large JSON blobs in client source, virtualize only if needed, and keep animations on compositor-friendly properties.

## Test profiles

Fast Wi-Fi, throttled 4G, cold cache, warm cache, low-end Android emulation, current iPhone Safari, background/foreground, and near-storage/memory pressure where practical. Record Web Vitals and interaction stalls from production builds—not development mode.

## Failure policy

If budget is missed, remove or defer effects before reducing legibility or privacy. Optimize assets before adding loading theater.


---

# Deployment and Environment Strategy

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Define environments, promotion, rollback, DNS, verification, and retirement.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


## Environments

| Environment | Personal content | Access | Purpose |
|---|---|---|---|
| Local | Approved subset or fixtures | Local secret | Development |
| CI | Synthetic fixtures only | Test secret | Automated validation |
| Preview | Approved personal content only when protected | Mandatory protection | Client review/UAT |
| Production | Final approved content | Mandatory protection | Recipient experience |

## Environment variables

Server-only access secret/hash, session signing secret, birthday timestamp/timezone, protected storage credentials, optional error-monitoring DSN with privacy controls, and feature flags. Validate all at startup/build. Never commit `.env` files.

## Promotion

Merge protected main branch -> create content-approved preview -> run automated and manual checks -> record evidence -> promote exact immutable deployment -> attach custom domain -> verify from unauthenticated and authenticated clean devices.

## Rollback

Keep the previous known-good immutable deployment. Rollback triggers include access failure, private exposure, fatal flow, missing media, wrong personal copy, audio loop, or severe performance regression. Rollback must be executable without rebuilding.

## Post-launch

Monitor only operational health. Re-test after DNS/certificate changes. Freeze non-critical changes. On the retirement date, execute the deletion runbook and verify all aliases/previews/storage are removed.


---

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


---

# AI Agent Operating Manual

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Define roles, coordination, context control, review, and escalation for an AI-first build.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


## Operating model

Use an orchestrator to decompose work and specialist agents to execute isolated tasks. Agents do not coordinate through assumptions; they coordinate through task contracts, interface definitions, Git commits/branches, and handoff files.

## Roles

| Role | Responsibility | Cannot approve |
|---|---|---|
| Orchestrator | Dependency map, task assignment, merge sequencing, scope control | Personal content, privacy waiver, launch |
| Product/requirements | Traceability, acceptance, open questions | Invented facts |
| UX/accessibility | Screen behavior, tokens, responsive/a11y review | Personal copy |
| Frontend platform | App shell, tokens, state, shared primitives | Security shortcuts |
| Feature agent | One bounded feature plus tests | Cross-cutting architecture changes |
| Media pipeline | Inventory, transforms, manifests, quality checks | Rights/consent |
| Security/privacy | Threat model, gate, headers, secret/log audit | Risk acceptance |
| QA/release | Test automation/evidence, production verification | Final client sign-off |
| Documentation | Keep docs/contracts aligned with merged behavior | Unapproved product changes |

## Context packet for every task

Task ID, objective, requirement IDs, files/interfaces, dependencies, non-goals, input fixtures, acceptance criteria, test commands, privacy notes, and expected handoff. Do not give an agent the entire repository context when a narrow packet is sufficient.

## Branch and merge discipline

One task per branch/commit sequence. Rebase/merge only after interfaces are stable. Integrate foundation before dependent features. The orchestrator resolves conflicts; feature agents do not rewrite adjacent systems opportunistically.

## Review loop

Implementer self-check -> automated gates -> independent reviewer -> preview evidence -> merge. For access/security, media pipeline, audio coordinator, and state machine, require a second-agent review.

## Escalation

Escalate when facts are missing, documents conflict, a dependency is needed, personal content could leak, a release budget is threatened, or a requested feature violates the P0 freeze. Record the decision rather than hiding it in code.


---

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


---

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


---

# Deadline Delivery Plan: 2-8 August 2026

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Provide a realistic date-specific plan for the fixed birthday deadline.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


## Release objective

Production must be verified and frozen before the recipient is expected to open it on 8 August 2026. Treat 7 August as the launch-readiness day, not the main development day.

| Date | Primary outcomes | Exit criteria |
|---|---|---|
| Sun 2 Aug | Requirements pack, open-item request, repository/CI, architecture and synthetic fixtures | Client input request sent; project builds and tests in CI |
| Mon 3 Aug | Foundation, tokens, content schema, story state, access/security spike, media inventory | Interfaces frozen; private-delivery option selected |
| Tue 4 Aug | P0 story spine: start, welcome, countdown, timeline, navigation; media pipeline | Core journey works with synthetic assets |
| Wed 5 Aug | Gallery, video, voice, quiz, letter, finale; final media intake cutoff | All P0 features integrated; client media/config available |
| Thu 6 Aug | Content integration, accessibility, error recovery, performance; **P0 freeze 18:00 IST** | Protected preview ready; no open critical build defects |
| Fri 7 Aug | Real-device UAT, privacy checks, production deployment, DNS/TLS, rollback drill | Written UAT and launch approval; production verified clean-device |
| Sat 8 Aug | Controlled monitoring only; no non-critical changes | Experience available; rollback owner reachable |

## Daily control points

09:30 scope/risks, 13:00 integration state, 18:00 test evidence, 21:00 release-blocker review. Adjust to team availability but keep one authoritative status update.

## Escalation

By 5 August, missing letter/music/media triggers a simplified content plan. By the 6 August freeze, any unstable P1/P2 item is removed. Privacy or content-accuracy defects remain release blockers regardless of date.


---

# Prioritized Backlog

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Provide an implementation-ready backlog with ownership and dependencies.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


| ID | Item | Priority | Owner role | Depends on |
|---|---|---|---|---|
| GOV-001 | Initialize private repository, CI, branch protection, ignored private paths | P0 | Orchestrator | - |
| ARCH-001 | Implement typed content schema and build validation | P0 | Frontend Platform | GOV-001 |
| ARCH-002 | Implement story reducer and transition tests | P0 | Frontend Platform | GOV-001 |
| SEC-001 | Select and implement server-side access model | P0 | Security | GOV-001 |
| MEDIA-001 | Create inventory and derivative pipeline | P0 | Media | ARCH-001 |
| AUDIO-001 | Implement global media coordinator | P0 | Frontend Platform | GOV-001 |
| UX-001 | Implement tokens, shell, safe areas, primitives | P0 | UX/Frontend | GOV-001 |
| FEAT-001 | Start, welcome, birthday state | P0 | Feature | ARCH-002,UX-001,AUDIO-001 |
| FEAT-002 | Timeline/story chapters | P0 | Feature | ARCH-001,ARCH-002,UX-001 |
| FEAT-003 | Gallery and viewer | P0 | Feature | MEDIA-001,UX-001 |
| FEAT-004 | Video and voice players | P0 | Feature | MEDIA-001,AUDIO-001 |
| FEAT-005 | Quiz | P0 | Feature | ARCH-001,ARCH-002,UX-001 |
| FEAT-006 | Letter and finale | P0 | Feature | ARCH-001,ARCH-002,UX-001 |
| SEC-002 | Protected media, headers, metadata, direct-URL tests | P0 | Security | SEC-001,MEDIA-001 |
| QA-001 | Automated P0 E2E and accessibility tests | P0 | QA | FEAT-001..006 |
| CONTENT-001 | Integrate approved content and media manifest | P0 | Content/Media | ARCH-001,MEDIA-001 |
| QA-002 | Real-device/UAT/production verification | P0 | QA/Owner | CONTENT-001,QA-001,SEC-002 |
| REL-001 | Production promotion, DNS, rollback drill | P0 | Release | QA-002 |
| P1-001 | Memory jar/reasons/future dreams/tap cake | P1 | Feature | P0 green |
| RET-001 | Schedule and execute retirement/deletion | P0 | Owner | REL-001 |

Each backlog item must become a task contract before execution. P1 cannot consume QA capacity needed for unresolved P0 defects.


---

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


---

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


---

# Content Inventory and Gap Analysis

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Show what is known, what is referenced, and what must be collected before final build.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


## Confirmed structured content

- Birthday: 8 August 2026.
- Greeting: Happy Birthday to the most special person in my life!
- First message: 19 December 2025.
- Commitment: 26 December 2025, 6:12 PM.
- First meeting: 6 January 2026, 4:20 AM.
- First-meet location: Krishnarajapuram Railway Station, Bengaluru.
- Dream destination: Switzerland.
- Favourite quiz answer: spending time together after fights.
- Theme: beige and light green.

## Referenced media

Approximately 25-40+ photos, about four short videos, voice notes, and four explicitly named PNG files. None of the named image binaries were available in the working attachment. Treat all media as missing until entered into the inventory and physically verified.

## Required content gaps

Recipient/sender names, exact hero/welcome copy, letter, album names and chronology, photo captions/alt text, video titles/posters/captions, voice-note transcript, memory jar entries, reasons, future dreams, inside jokes, finale message, music, domain, access policy, and retention/deletion date.

## Production rule

Required content cannot ship with guesses or generic AI filler. Synthetic fixtures are allowed only in development and must fail production validation if unresolved.


---

# Consent, Rights, and Privacy Checklist

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Reduce legal and personal risk around private images, recordings, music, and online publication.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


- [ ] Client confirms authority/permission to use each photo, video, and voice note.
- [ ] Media containing third parties is reviewed for consent, crop, blur, or exclusion.
- [ ] No minors or highly sensitive content is published without explicit appropriate permission.
- [ ] Music, fonts, icons, illustrations, and stock assets have web-use rights.
- [ ] No personal documents, phone numbers, addresses, tickets, screens, or location metadata are exposed unintentionally.
- [ ] Recipient is unlikely to be embarrassed, endangered, or pressured by the selected content.
- [ ] Access method and risk of forwarded URL are explained to the client.
- [ ] Analytics/logging is minimized and excludes personal content.
- [ ] Retention/deletion date and owner are agreed.
- [ ] Client approves final production preview and acknowledges remaining limitations.

This is an operational checklist, not legal advice. Obtain local legal advice where the content, jurisdiction, or rights are uncertain.


---

# Retirement and Deletion Runbook

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Ensure the finite birthday campaign and its personal assets do not remain exposed indefinitely.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


1. Confirm approved retirement date and whether an offline copy is requested.
2. Export only the agreed source/derivative package through a private encrypted channel.
3. Detach custom domain and verify old URLs no longer serve personalized content.
4. Delete production and personal preview deployments.
5. Delete private storage objects, versions, signed URL keys where appropriate, and transfer links.
6. Delete private QA screenshots/video and local working media according to retention schedule.
7. Remove secrets and revoke service tokens.
8. Audit repository/history and archive/delete according to ownership agreement.
9. Check search/social caches and request removal where applicable.
10. Record systems checked, result, date, operator, and approved exceptions without attaching personal content.
