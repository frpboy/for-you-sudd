# Responsive and Safe-Area Rules

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Make layouts deterministic across phone sizes and browser chrome states.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


## Required widths

320, 360, 375, 390, 412, 430, 768, 1024, and 1440 CSS px. Portrait phones are normative; wider layouts preserve a centered story frame.

## CSS rules

- Root prevents horizontal overflow but does not hide layout defects during testing.
- Interactive footer uses `padding-bottom: max(16px, env(safe-area-inset-bottom))`.
- Top controls use `padding-top: max(12px, env(safe-area-inset-top))`.
- Use container queries only when they simplify components; do not over-fragment breakpoints.
- Letter and caption text wraps normally; never truncate essential personal copy.
- Media uses explicit aspect ratio and reserved space to prevent layout shift.

## Device QA

Test notch, home indicator, browser address-bar expansion/collapse, keyboard opening on the lock/quiz, 200% text, rotation, and in-app browser. Screenshots alone do not validate touch or media behavior.
