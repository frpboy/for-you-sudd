# UX Edge Cases

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Define expected behavior in non-ideal real-world conditions.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


| Scenario | Expected behavior |
|---|---|
| Opens before birthday | Show approved countdown state and allowed preview policy. |
| Opens exactly at midnight | Transition once using configured timezone; no duplicate timers. |
| System clock is wrong | Display is client-derived unless server time is implemented; document limitation and test. |
| Sound muted | Visible captions/copy preserve meaning; no blocking prompt. |
| Autoplay blocked | Start button initializes audio; UI remains coherent without sound. |
| Video interrupted by call | Pause and restore controls; never blast background music on return. |
| Refresh mid-quiz | Restore at safe question/progress point if enabled. |
| Private URL forwarded | Real access policy still applies; narrative answer alone is insufficient. |
| Slow connection | Show reserved layouts, progressive media, retry/skip; no endless loader. |
| Asset missing | Build fails for P0; optional runtime assets show recovery. |
| Reduced motion | Decorative sequencing removed; no content loss. |
| Microphone denied | Tap candle immediately available. |
| Device motion unavailable | Tap gift immediately available. |
| Landscape | Usable adaptive frame; optional rotate suggestion, never hard block. |
| Browser Back | Moves to safe prior story state or confirms exit at boundary. |
| Recipient reopens later | Authorization and progress behavior follow approved retention policy. |
