# Gesture and Optional Capability Test Plan

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Verify that optional phone capabilities never block the experience.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


| Capability | Test | Required fallback |
|---|---|---|
| Swipe | Fast/slow/diagonal; nested letter/gallery scroll | Next/Previous buttons |
| Pinch zoom | Supported/unsupported; close after zoom | Zoom controls or normal viewer |
| Microphone | Unsupported, denied, allowed, noisy room | Tap candle |
| Device motion | Unsupported, permission denied, weak/false shake | Tap gift |
| Vibration | Unsupported or disabled | Visual feedback |
| Wake lock | Unsupported, rejected, page hidden | Normal screen behavior and resume |
| Long press | Conflicts with browser image menu | Explicit secret/reveal button |
| Scratch | Pointer/touch failure, reduced motion | Reveal message button |

Permission prompts appear only after a relevant user action and concise explanation. No captured microphone data is retained or transmitted.
