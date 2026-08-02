# Deadline Delivery Plan: 2-8 August 2026

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Provide a realistic date-specific plan for the fixed birthday deadline.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


## Release objective

Production must be verified and frozen before the recipient is expected to open it on 8 August 2026. Treat 7 August as the launch-readiness day, not the main development day.

| Date | Primary outcomes | Exit criteria |
|---|---|---|
| Sun 2 Aug | Requirements pack, open-item request, repository/CI, architecture and synthetic fixtures | Client input request sent; project builds and tests in CI |
| Mon 3 Aug | Foundation, tokens, content schema, story state, access/security spike, media inventory | Interfaces frozen; private-delivery option selected |
| Tue 4 Aug | P0 story spine: start, welcome, countdown, timeline, navigation; media pipeline | Core journey works with synthetic assets |
| Wed 5 Aug | Gallery, video, voice, quiz, letter, finale; final media intake cutoff | All P0 features integrated; client media/config available |
| Thu 6 Aug | Content integration, accessibility, error recovery, performance; **P0 freeze 18:00 IST** | Protected preview ready; no open critical build defects |
| Fri 7 Aug | Real-device UAT, privacy checks, production deployment, DNS/TLS, rollback drill | Written UAT and launch approval; production verified clean-device |
| Sat 8 Aug | Controlled monitoring only; no non-critical changes | Experience available; rollback owner reachable |

## Daily control points

09:30 scope/risks, 13:00 integration state, 18:00 test evidence, 21:00 release-blocker review. Adjust to team availability but keep one authoritative status update.

## Escalation

By 5 August, missing letter/music/media triggers a simplified content plan. By the 6 August freeze, any unstable P1/P2 item is removed. Privacy or content-accuracy defects remain release blockers regardless of date.
