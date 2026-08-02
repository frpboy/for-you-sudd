# User Stories and Acceptance Criteria

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Translate the product intent into testable user outcomes.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


| ID | Story | Priority |
|---|---|---|
| US-001 | As the recipient, I can enter through a private gate so the story feels intended only for me. | P0 |
| US-002 | As the recipient, I can deliberately start the experience so sound never surprises me. | P0 |
| US-003 | As the recipient, I can see how long remains until the birthday or immediately receive the birthday message. | P0 |
| US-004 | As the recipient, I can move through relationship milestones one focused chapter at a time. | P0 |
| US-005 | As the recipient, I can browse grouped photos with touch gestures and readable captions. | P0 |
| US-006 | As the recipient, I can watch videos and hear a voice note without competing background music. | P0 |
| US-007 | As the recipient, I can answer playful questions and retry gently. | P0 |
| US-008 | As the recipient, I can read the full letter at my own pace. | P0 |
| US-009 | As the recipient, I can reach the finale even if my phone lacks sensors or permissions. | P0 |
| US-010 | As the recipient, I can mute, go back, resume after refresh, and replay. | P1 |
| US-011 | As the client, I can approve all facts and media before publication. | P0 |
| US-012 | As the owner, I can remove the site and assets after the agreed date. | P0 |
| US-013 | As an AI agent, I can find authoritative requirements, ownership, dependencies, and tests for a task. | P0 |

## Global acceptance criteria

- Given a supported phone viewport, no required text or control is clipped or unreachable.
- Given sound is blocked or muted, all meaning remains available through visible copy/captions.
- Given reduced motion is enabled, the complete journey works with simplified transitions.
- Given an asset fails, the user receives retry/skip/recovery rather than a blank view.
- Given an unauthenticated request, story content and protected assets are unavailable.
- Given a direct internal URL, authorization is still enforced.
- Given P0 content is missing or invalid, CI fails before deployment.
