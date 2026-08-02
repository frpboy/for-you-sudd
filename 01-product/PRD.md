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
