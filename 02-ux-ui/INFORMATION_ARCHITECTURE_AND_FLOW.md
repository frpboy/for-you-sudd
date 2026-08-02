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
