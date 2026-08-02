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
