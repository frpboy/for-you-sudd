# Optional Easter Egg: Secret Memories

## Purpose

The P2 Secret Memories gallery adds an optional final surprise without changing or blocking the main birthday journey.

## Recipient interaction

At the ending screen, activate the small heart three times within 1.5 seconds. This opens a focused, protected gallery with an explicit **Return to the ending** control.

## Privacy and accessibility

- The gallery uses the same authorized `/api/media/:id` delivery as every other private asset.
- It is enabled only when `features.secretMemories` is true and `secretMediaIds` is non-empty.
- The trigger is a keyboard-operable button with an accessible name; no sensor, swipe, or precision gesture is required.
- It is optional and never required to complete or replay the story.

## Content control

Only approved opaque media IDs belong in `secretMediaIds`. The current private preview uses three existing supplied photos; their captions remain subject to owner approval before public release.
