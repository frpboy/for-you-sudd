# Audio and Media State Management

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Prevent competing audio, surprise playback, and inconsistent restoration.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


## Single coordinator

One `MediaCoordinator` owns background music and the relationship between music, video, and voice. Individual components emit intents; they do not independently manipulate global tracks.

## State

```text
consent: unknown | granted | muted
music: stopped | fading-in | playing | ducked | paused | fading-out
foreground: none | video:<id> | voice:<id>
visibility: visible | hidden
interruption: none | system | navigation | error
```

## Rules

1. No sound before explicit user action.
2. Only one foreground media item plays.
3. Starting voice/video pauses or ducks music according to configuration.
4. Closing/ending foreground media restores prior music state, unless user manually muted/paused.
5. Page visibility loss pauses foreground media; return never unexpectedly starts sound.
6. User mute takes precedence over automatic cues.
7. Track changes crossfade only after both assets are ready; failure retains silence or previous track.
8. Controls expose labels, state, duration, and errors.

## Tests

Start muted, start with sound, video start/end, voice start/end, manual mute during video, media failure, phone interruption simulation, background/foreground, rapid taps, route/hash change, and reduced-motion behavior.
