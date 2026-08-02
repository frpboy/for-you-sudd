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
