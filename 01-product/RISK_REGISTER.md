# Risk Register

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Track product, privacy, schedule, content, and AI-delivery risks.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


| ID | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| R-01 | Late or disorganized media | High | High | Freeze media by 5 Aug; use inventory sheet and deterministic filenames. |
| R-02 | Copyrighted music without rights | High | High | Use licensed/royalty-free instrumental or client-supplied authorized track. |
| R-03 | Private photos exposed publicly | High | Critical | Server-side gate, non-public storage where feasible, noindex, generic metadata, retirement date. |
| R-04 | Heavy media causes slow load | High | High | Transcode, lazy-load, poster frames, prefetch only adjacent assets, bundle budgets. |
| R-05 | Autoplay blocked | Certain | Medium | Explicit start gesture; persistent music control; never rely on autoplay. |
| R-06 | Sensor APIs unavailable | High | Low | Tap fallback for candle and gift; progressive enhancement only. |
| R-07 | Too many animations | Medium | High | Use Motion + CSS only; define motion budget; reduced-motion mode. |
| R-08 | Scope growth near deadline | High | High | P0 freeze 6 Aug 18:00 IST; defer P2 without destabilizing P0. |
| R-09 | Incorrect personal facts/copy | Medium | High | Client sign-off matrix for dates, names, answers, letter, captions. |
| R-10 | AI agents overwrite working code | Medium | High | Small tasks, protected ownership, tests before/after, mandatory handoff. |
| R-11 | Repository contains personal assets | Medium | Critical | Gitignore media, use private artifact channel, secret scan before push. |
| R-12 | Timezone bug changes countdown | Medium | Medium | Use explicit Asia/Kolkata and test boundaries around midnight. |

## Risk handling rule

Critical privacy or content-accuracy risks block release. Schedule pressure is not an acceptable reason to waive access protection, media rights, or production verification.
