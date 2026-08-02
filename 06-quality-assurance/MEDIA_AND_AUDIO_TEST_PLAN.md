# Media and Audio Test Plan

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Verify formats, playback, coordination, interruption, quality, and failure recovery.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


## Asset validation

Existence, checksum, dimensions/duration, orientation, color/crop, poster, codec, file size, metadata stripping, captions/transcript, rights/approval, case-sensitive path, and orphan/duplicate detection.

## Playback matrix

- Background music start/mute/unmute/loop/fade.
- Start video or voice while music plays, paused, or muted.
- Rapid play/close and switching between media.
- Seek, pause, end, replay, error, stalled network.
- Lock screen, app switch, phone call, Bluetooth/headphone changes where practical.
- Visibility hide/show and browser back.
- iOS inline video and Android Chrome.

## Quality

Speech intelligibility, no clipping, reasonable loudness differences, correct poster/caption, no stretched media, no accidental EXIF/location exposure, and no unexpected download of the full library.
