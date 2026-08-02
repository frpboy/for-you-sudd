# Prioritized Backlog

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Provide an implementation-ready backlog with ownership and dependencies.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


| ID | Item | Priority | Owner role | Depends on |
|---|---|---|---|---|
| GOV-001 | Initialize private repository, CI, branch protection, ignored private paths | P0 | Orchestrator | - |
| ARCH-001 | Implement typed content schema and build validation | P0 | Frontend Platform | GOV-001 |
| ARCH-002 | Implement story reducer and transition tests | P0 | Frontend Platform | GOV-001 |
| SEC-001 | Select and implement server-side access model | P0 | Security | GOV-001 |
| MEDIA-001 | Create inventory and derivative pipeline | P0 | Media | ARCH-001 |
| AUDIO-001 | Implement global media coordinator | P0 | Frontend Platform | GOV-001 |
| UX-001 | Implement tokens, shell, safe areas, primitives | P0 | UX/Frontend | GOV-001 |
| FEAT-001 | Start, welcome, birthday state | P0 | Feature | ARCH-002,UX-001,AUDIO-001 |
| FEAT-002 | Timeline/story chapters | P0 | Feature | ARCH-001,ARCH-002,UX-001 |
| FEAT-003 | Gallery and viewer | P0 | Feature | MEDIA-001,UX-001 |
| FEAT-004 | Video and voice players | P0 | Feature | MEDIA-001,AUDIO-001 |
| FEAT-005 | Quiz | P0 | Feature | ARCH-001,ARCH-002,UX-001 |
| FEAT-006 | Letter and finale | P0 | Feature | ARCH-001,ARCH-002,UX-001 |
| SEC-002 | Protected media, headers, metadata, direct-URL tests | P0 | Security | SEC-001,MEDIA-001 |
| QA-001 | Automated P0 E2E and accessibility tests | P0 | QA | FEAT-001..006 |
| CONTENT-001 | Integrate approved content and media manifest | P0 | Content/Media | ARCH-001,MEDIA-001 |
| QA-002 | Real-device/UAT/production verification | P0 | QA/Owner | CONTENT-001,QA-001,SEC-002 |
| REL-001 | Production promotion, DNS, rollback drill | P0 | Release | QA-002 |
| P1-001 | Memory jar/reasons/future dreams/tap cake | P1 | Feature | P0 green |
| RET-001 | Schedule and execute retirement/deletion | P0 | Owner | REL-001 |

Each backlog item must become a task contract before execution. P1 cannot consume QA capacity needed for unresolved P0 defects.
