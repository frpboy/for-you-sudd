# Decisions and Open Items

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Separate approved facts from unresolved content and technical decisions.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


## Confirmed baseline

| Item | Value | Status |
|---|---|---|
| Birthday Date | 2026-08-08 | Confirmed |
| First Message | 2025-12-19 | Confirmed |
| Committed Date | 2025-12-26 | Confirmed |
| Committed Time | 18:12 | Confirmed |
| First Meet Date | 2026-01-06 | Confirmed |
| First Meet Time | 04:20 | Confirmed |
| First Meet Location | Krishnarajapuram Railway Station, Bengaluru | Confirmed |
| Dream Destination | Switzerland | Confirmed |
| Quiz Favourite Answer | Spending time together after fights | Confirmed |
| Theme | Beige and light green | Confirmed |
| Primary Device | Mobile phone in portrait orientation | Confirmed |
| Greeting | Happy Birthday to the most special person in my life! | Confirmed |
| Recipient | Dhilsha K J (Sudd) | Confirmed |
| Sender display name | Rashimma | Confirmed |
| Product/domain label | For U Sudd | Confirmed; final registered hostname pending |
| Access policy | Private passphrase | Confirmed; value held only in deployment secret storage |
| Received visual media | 23 photos and 4 short videos | Confirmed; see `CURRENT_BUILD_CONTEXT.md` |

## Architectural decisions

| ID | Decision | Reason |
|---|---|---|
| D-01 | Mobile portrait is the primary experience; desktop is a centered adaptive presentation. | The recipient is expected to use a phone. |
| D-02 | Use one state-driven story route instead of a route for every screen. | Reduces reloads, audio interruption, navigation bugs, and agent fragmentation. |
| D-03 | Use Motion plus CSS; do not add GSAP by default. | One animation system is sufficient and reduces bundle/coordination risk. |
| D-04 | Use typed file-based content; no database/CMS for this deadline. | Content volume is small and privacy is easier to reason about. |
| D-05 | Treat microphone, vibration, shake, and wake lock as progressive enhancement. | Browser/device support and permissions vary. |
| D-06 | The Switzerland question is narrative, not security. | Its answer is present in relationship content and can be guessed or inspected. |
| D-07 | Require a real server-side access layer for private media. | Client-only gates do not protect source files or URLs. |
| D-08 | Instrumental or rights-cleared music only. | Avoid copyright and playback disputes. |
| D-09 | Freeze P0 scope on 6 August 2026 at 18:00 IST. | Preserve time for real-device QA and production verification. |

## Open items

| ID | Item | Owner | Status |
|---|---|---|---|
| OI-01 | Recipient name, exact spelling, nickname, and preferred salutation | Client / owner | Resolved: Dhilsha K J / Sudd; final salutation can use Sudd |
| OI-02 | Sender display name and final signature | Client / owner | Resolved: Rashimma |
| OI-03 | Domain/subdomain and launch URL | Client / owner | Open: product label is For U Sudd; registered hostname is needed |
| OI-04 | Final access policy: private link, passphrase, or managed protection | Client / owner | Resolved: private passphrase; server-side secret/session implementation required |
| OI-05 | Final birthday letter and exact on-screen copy approvals | Client / owner | Open |
| OI-06 | Final media files, chronology, captions, and consent/rights confirmation | Client / owner | In progress: 23 photos and 4 videos received; captions, chronology, and approval remain open |
| OI-07 | Voice-note file and approved transcript/caption | Client / owner | Open |
| OI-08 | Background music selection and evidence of usage rights | Client / owner | Open |
| OI-09 | Exact list of reasons, memories, inside jokes, and future dreams | Client / owner | Open |
| OI-10 | Whether content may remain online after the birthday and deletion date | Client / owner | Open |

## Change control

A decision is valid only when its ID, date, owner, selected option, and effect are recorded. Any change after the P0 freeze must include rollback impact and the tests that will be rerun.
