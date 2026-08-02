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
