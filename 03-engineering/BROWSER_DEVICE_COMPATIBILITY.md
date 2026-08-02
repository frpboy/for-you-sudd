# Browser and Device Compatibility

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Define support levels and progressive enhancement behavior.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


## Tier 1

Current iOS Safari and current Android Chrome on portrait phones. Full P0 journey, audio/video, gallery, quiz, letter, finale, access, and reduced motion must work.

## Tier 2

Current desktop Safari, Chrome, Edge, and Firefox. Full content and controls work in a centered adaptive layout; phone-specific sensor enhancements are optional.

## Progressive capabilities

| Capability | Baseline | Enhancement |
|---|---|---|
| Music | Tap-to-start HTML audio | Crossfade cues |
| Candle | Tap | Microphone amplitude detection |
| Gift | Tap | Device motion/shake |
| Feedback | Visual state | Tiny vibration cue |
| Keep awake | Normal browser behavior | Screen Wake Lock while active |
| Gallery | Tap/swipe/controls | Pinch zoom |
| Motion | Fade/instant | Narrative transitions/parallax |

## Unsupported behavior

Never display a raw browser permission error. Detect support, request only after a relevant tap, explain the purpose briefly, and reveal the baseline control immediately on denial or failure.
