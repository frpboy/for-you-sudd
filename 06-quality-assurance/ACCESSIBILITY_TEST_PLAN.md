# Accessibility Test Plan

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Verify semantic, keyboard, touch, visual, motion, and media accessibility.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


## Automated

Run axe against access, welcome, timeline, gallery overlay, quiz, letter, and finale; run Lighthouse accessibility; lint semantic/ARIA misuse where configured.

## Manual

- Keyboard complete journey and overlay focus behavior.
- Screen-reader control names, headings, question/error association, media state.
- 200% text zoom and 320 px reflow.
- Contrast and non-color success/error cues.
- Touch targets and one-thumb reach.
- Reduced motion at OS/browser level.
- Muted completion and captions/transcript.
- Gesture alternatives for swipe, pinch, blow, shake, scratch, and long press.
- Countdown announcement frequency.

## Release rule

No critical/serious accessibility issue in a P0 path. Any accepted limitation requires documented workaround, owner, and post-release irrelevance/retirement rationale.
