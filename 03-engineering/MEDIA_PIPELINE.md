# Media Processing Pipeline

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Control quality, performance, privacy, naming, derivatives, and validation for personal assets.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


## Intake

1. Receive originals through an approved private channel.
2. Record each in the inventory before renaming or editing.
3. Hash originals, preserve a read-only archive, and work on copies.
4. Remove accidental screenshots, duplicates, and unapproved people/details.
5. Confirm chronology, caption, alt text, crop, sensitivity, consent, and rights.

## Images

- Correct orientation and strip unnecessary metadata from public derivatives.
- Produce practical widths such as 480, 768, 1080, and 1440 px where useful.
- Encode AVIF/WebP plus fallback based on framework support.
- Preserve dimensions/aspect ratio in the manifest.
- Generate a tiny blur placeholder or dominant-color token.
- Inspect faces and meaningful context at each crop; no automatic crop ships without review.

## Video

- Baseline MP4 using H.264 video and AAC audio for broad mobile compatibility.
- Preserve portrait orientation and `playsInline` behavior.
- Remove unnecessary metadata, trim dead time if approved, normalize rotation, and generate a reviewed poster frame.
- Provide captions or text alternative when spoken content carries meaning.
- Test seek, pause, return, interruption, and low-bandwidth startup.

## Audio

- Convert voice/music to a broadly supported compressed format.
- Normalize loudness conservatively; do not alter emotional tone.
- Record duration and waveform data if displayed.
- Keep voice notes separate from background music and coordinate through one manager.

## Build verification

The pipeline verifies file existence, case-sensitive paths, checksums, duplicate IDs, missing derivatives, missing posters, unsupported codecs, unapproved assets, and orphaned files. It outputs a machine-readable manifest and human review report.

## Privacy

Originals, transfer folders, temporary renders, EXIF/location metadata, and preview deployments are included in the retirement plan. Do not assume deleting a Git working file removes it from history.
