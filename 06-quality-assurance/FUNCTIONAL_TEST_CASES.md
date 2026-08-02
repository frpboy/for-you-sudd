# Functional Test Cases

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Provide core end-to-end and feature verification scenarios.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


| ID | Scenario | Expected result |
|---|---|---|
| FN-001 | Open root unauthenticated | Generic access UI only; no personalized payload/media. |
| FN-002 | Wrong access credential | Generic retry; no content existence leak; rate limit applies. |
| FN-003 | Valid access | Secure session established; authorized story available. |
| FN-004 | Direct `/story` without session | Redirect/deny before personal content. |
| FN-005 | Enter ` Switzerland ` with case variation | Narrative answer accepted after normalization. |
| FN-006 | Tap Start with sound | Music begins at approved volume; mute visible. |
| FN-007 | Tap Start muted | Story works silently; state remains visible. |
| FN-010 | Date before 8 Aug in configured timezone | Correct positive countdown. |
| FN-011 | Boundary at 8 Aug 00:00 IST | Birthday state appears once. |
| FN-020 | Move forward/back through timeline | Correct chapter order and preserved state. |
| FN-021 | Refresh mid-story | Restore nearest safe chapter if enabled. |
| FN-030 | Open photo album/viewer | Correct album, swipe/controls, caption, close focus restoration. |
| FN-031 | Missing optional image | Retry/skip/continue; no broken layout. |
| FN-040 | Start video while music plays | Music pauses/ducks; video plays inline. |
| FN-041 | Close/end video | Prior music state restores unless user muted. |
| FN-045 | Start voice note | Music pauses/ducks; transcript available. |
| FN-050 | Answer each quiz correctly | Success copy and next question. |
| FN-051 | Wrong answer | Gentle retry; no technical answer leak. |
| FN-052 | Quiz completion | Next section unlocks; progress correct. |
| FN-060 | Read letter under reduced motion | Full text available without typewriter wait. |
| FN-070 | Tap candle | Candle extinguishes and proceeds without microphone. |
| FN-071 | Tap gift | Finale opens without device motion. |
| FN-080 | Replay | Story restarts safely; authorization retained per policy. |
| FN-090 | Media/network interruption | Current state remains recoverable. |
