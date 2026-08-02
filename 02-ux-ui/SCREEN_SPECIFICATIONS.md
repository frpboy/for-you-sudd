# Screen Specifications

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Provide the normative screen-by-screen contract for design, content, and implementation.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.

## S01 - Preflight Loader (P0)

**Purpose:** Load only critical assets; never block indefinitely.

**Required elements:** Heart/monogram, short loader label, progress only when real.

**Interaction:** No user action; 2.5 s maximum before recoverable state.

**States:** default, loading where applicable, active, success, recoverable error, reduced motion, and unavailable-feature fallback.

**Implementation notes:** Do not fake long loading; preload only shell and next critical image.

**Acceptance:** Usable at 320 px width, no hidden required action, semantic labels, visible focus, and completion without gesture/sensor dependency.

## S02 - Private Entry (P0)

**Purpose:** Server-validated access plus narrative Switzerland question.

**Required elements:** Generic private-entry copy, answer input, continue, error region.

**Interaction:** Submit, trim/normalize, rate-limit server verification.

**States:** default, loading where applicable, active, success, recoverable error, reduced motion, and unavailable-feature fallback.

**Implementation notes:** Narrative question may follow real access; never expose answer in client security logic.

**Acceptance:** Usable at 320 px width, no hidden required action, semantic labels, visible focus, and completion without gesture/sensor dependency.

## S03 - Start / Audio Consent (P0)

**Purpose:** Explicit tap begins the experience and enables audio.

**Required elements:** “Tap to begin,” sound disclosure, mute-first alternative.

**Interaction:** Tap starts audio context and initializes story state.

**States:** default, loading where applicable, active, success, recoverable error, reduced motion, and unavailable-feature fallback.

**Implementation notes:** Autoplay must not be assumed.

**Acceptance:** Usable at 320 px width, no hidden required action, semantic labels, visible focus, and completion without gesture/sensor dependency.

## S04 - Birthday Welcome (P0)

**Purpose:** Recipient name, greeting, and Begin button.

**Required elements:** Recipient name placeholder, confirmed greeting, short intro, Begin.

**Interaction:** Single thumb-reachable CTA.

**States:** default, loading where applicable, active, success, recoverable error, reduced motion, and unavailable-feature fallback.

**Implementation notes:** No personal name until approved.

**Acceptance:** Usable at 320 px width, no hidden required action, semantic labels, visible focus, and completion without gesture/sensor dependency.

## S05 - Countdown / Birthday State (P0)

**Purpose:** Countdown before 8 August; celebration state on/after date.

**Required elements:** Days/hours/minutes/seconds or birthday message.

**Interaction:** Updates without disruptive announcements; continue available.

**States:** default, loading where applicable, active, success, recoverable error, reduced motion, and unavailable-feature fallback.

**Implementation notes:** Timezone must be explicit and boundary-tested.

**Acceptance:** Usable at 320 px width, no hidden required action, semantic labels, visible focus, and completion without gesture/sensor dependency.

## S06 - Story Chapters (P0)

**Purpose:** Swipe/tap progression through relationship milestones.

**Required elements:** Date, time, chapter title, approved copy, image/map-style card.

**Interaction:** Swipe/tap forward/back; subtle progress.

**States:** default, loading where applicable, active, success, recoverable error, reduced motion, and unavailable-feature fallback.

**Implementation notes:** Map visual is decorative unless client approves external map link.

**Acceptance:** Usable at 320 px width, no hidden required action, semantic labels, visible focus, and completion without gesture/sensor dependency.

## S07 - Photo Albums (P0)

**Purpose:** Grouped, swipeable, zoomable, captioned photo memories.

**Required elements:** Album cards, photo viewer, captions, close, previous/next.

**Interaction:** Tap album; swipe images; pinch zoom where library supports it.

**States:** default, loading where applicable, active, success, recoverable error, reduced motion, and unavailable-feature fallback.

**Implementation notes:** Lazy-load and never decode all originals at once.

**Acceptance:** Usable at 320 px width, no hidden required action, semantic labels, visible focus, and completion without gesture/sensor dependency.

## S08 - Video Memories (P0)

**Purpose:** Inline poster cards and accessible full-screen playback.

**Required elements:** Video poster, title, duration, play/pause, captions if speech.

**Interaction:** Tap play; pause/duck music; return to exact position.

**States:** default, loading where applicable, active, success, recoverable error, reduced motion, and unavailable-feature fallback.

**Implementation notes:** Do not autoplay videos.

**Acceptance:** Usable at 320 px width, no hidden required action, semantic labels, visible focus, and completion without gesture/sensor dependency.

## S09 - Voice Message (P0)

**Purpose:** Focused player; music ducks or pauses.

**Required elements:** Voice-note title, waveform/progress, elapsed/duration, transcript.

**Interaction:** Tap play/pause/seek; background music pauses/ducks.

**States:** default, loading where applicable, active, success, recoverable error, reduced motion, and unavailable-feature fallback.

**Implementation notes:** Transcript/caption required when intelligible speech is essential.

**Acceptance:** Usable at 320 px width, no hidden required action, semantic labels, visible focus, and completion without gesture/sensor dependency.

## S10 - Relationship Quiz (P0)

**Purpose:** One question per view; five approved questions.

**Required elements:** One question, progress, appropriate input, feedback, next.

**Interaction:** Date or choice input; accepted-answer normalization.

**States:** default, loading where applicable, active, success, recoverable error, reduced motion, and unavailable-feature fallback.

**Implementation notes:** Wrong answers are gentle and privacy-safe.

**Acceptance:** Usable at 320 px width, no hidden required action, semantic labels, visible focus, and completion without gesture/sensor dependency.

## S11 - Memory Jar (P1)

**Purpose:** Tap to reveal short memories from approved content.

**Required elements:** Jar illustration, tap affordance, approved memory card.

**Interaction:** Tap reveals one unused memory; repeat or continue.

**States:** default, loading where applicable, active, success, recoverable error, reduced motion, and unavailable-feature fallback.

**Implementation notes:** No invented memories.

**Acceptance:** Usable at 320 px width, no hidden required action, semantic labels, visible focus, and completion without gesture/sensor dependency.

## S12 - Why I Love You (P1)

**Purpose:** Progressive reveal of approved reasons.

**Required elements:** One approved reason per card with count/progress.

**Interaction:** Tap/swipe reveal; skip to end available.

**States:** default, loading where applicable, active, success, recoverable error, reduced motion, and unavailable-feature fallback.

**Implementation notes:** Avoid excessive mandatory taps.

**Acceptance:** Usable at 320 px width, no hidden required action, semantic labels, visible focus, and completion without gesture/sensor dependency.

## S13 - Future Dreams (P1)

**Purpose:** Shared goals, including Switzerland.

**Required elements:** Approved future goals with simple illustrations.

**Interaction:** Swipe/tap; Switzerland may be one card.

**States:** default, loading where applicable, active, success, recoverable error, reduced motion, and unavailable-feature fallback.

**Implementation notes:** Mark all unapproved future claims as placeholders.

**Acceptance:** Usable at 320 px width, no hidden required action, semantic labels, visible focus, and completion without gesture/sensor dependency.

## S14 - Love Letter (P0)

**Purpose:** Readable letter with optional restrained typewriter reveal.

**Required elements:** Readable paper surface, full letter, sender signature.

**Interaction:** Scroll within page; optional reveal can be skipped.

**States:** default, loading where applicable, active, success, recoverable error, reduced motion, and unavailable-feature fallback.

**Implementation notes:** Letter is visible immediately under reduced motion.

**Acceptance:** Usable at 320 px width, no hidden required action, semantic labels, visible focus, and completion without gesture/sensor dependency.

## S15 - Birthday Cake (P1)

**Purpose:** Tap candle; microphone detection is progressive enhancement.

**Required elements:** Cake/candle visual, tap instruction, optional mic enhancement.

**Interaction:** Tap candle always works; mic request only after explicit action.

**States:** default, loading where applicable, active, success, recoverable error, reduced motion, and unavailable-feature fallback.

**Implementation notes:** No microphone recording or upload.

**Acceptance:** Usable at 320 px width, no hidden required action, semantic labels, visible focus, and completion without gesture/sensor dependency.

## S16 - Final Gift (P0)

**Purpose:** Tap gift; device shake is progressive enhancement.

**Required elements:** Gift box, tap instruction, final copy, confetti.

**Interaction:** Tap always opens; shake optional after permission/support check.

**States:** default, loading where applicable, active, success, recoverable error, reduced motion, and unavailable-feature fallback.

**Implementation notes:** Confetti stops and respects reduced motion.

**Acceptance:** Usable at 320 px width, no hidden required action, semantic labels, visible focus, and completion without gesture/sensor dependency.

## S17 - Ending / Replay (P0)

**Purpose:** Final message, replay, and safe share behavior.

**Required elements:** Ending copy, replay, optional close/share guidance.

**Interaction:** Replay resets view state while retaining authorization.

**States:** default, loading where applicable, active, success, recoverable error, reduced motion, and unavailable-feature fallback.

**Implementation notes:** No public share button containing personal preview by default.

**Acceptance:** Usable at 320 px width, no hidden required action, semantic labels, visible focus, and completion without gesture/sensor dependency.

## S18 - Secret Memories (P2)

**Purpose:** Optional hidden gallery after deliberate easter egg.

**Required elements:** Optional secret album with clear exit.

**Interaction:** Deliberate easter egg only; no accidental discovery requirement.

**States:** default, loading where applicable, active, success, recoverable error, reduced motion, and unavailable-feature fallback.

**Implementation notes:** P2; must not destabilize release.

**Acceptance:** Usable at 320 px width, no hidden required action, semantic labels, visible focus, and completion without gesture/sensor dependency.
