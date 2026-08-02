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
