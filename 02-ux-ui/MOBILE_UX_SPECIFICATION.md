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
