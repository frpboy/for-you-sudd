# Data Model and Content Schema

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Define normalized, typed, reviewable content independent of UI implementation.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


## Core entities

### ProjectConfig

`id`, `title`, `birthdayAt`, `timezone`, `locale`, `participants`, `access`, `theme`, `featureFlags`, `chapters`, `albums`, `media`, `quiz`, `memories`, `reasons`, `dreams`, `letter`, `music`, `finale`, `privacy`.

### Participant

`id`, `role`, `displayName`, `nickname`, `pronouns` (optional), `signature`, `approvalStatus`.

### StoryChapter

`id`, `order`, `type`, `title`, `date`, `time`, `location`, `body`, `mediaIds`, `quote`, `approvalStatus`.

### MediaAsset

`id`, `kind`, `sourceRef`, `derivatives`, `albumId`, `capturedAt`, `duration`, `width`, `height`, `caption`, `alt`, `objectPosition`, `sensitive`, `rightsStatus`, `approvalStatus`, `checksum`.

### QuizQuestion

`id`, `order`, `inputType`, `prompt`, `acceptedAnswers`, `displayAnswer`, `hint`, `successCopy`, `retryCopy`, `maxAttemptsBeforeHint`, `required`.

### MusicCue

`id`, `assetId`, `startSection`, `endSection`, `loop`, `gain`, `fadeInMs`, `fadeOutMs`, `rightsStatus`.

## Validation rules

- IDs are unique, kebab-case, and immutable.
- All referenced media IDs exist and are approved.
- Required P0 fields are non-empty and not placeholder tokens in production.
- Dates are ISO-8601; times are 24-hour strings with explicit timezone at project level.
- Quiz answer normalization is declared per input type.
- Personal content cannot be marked `approved` without approver/date metadata.
- Music cannot be production-approved without `rightsStatus: licensed|royalty-free|owned`.
- Sensitive assets require the protected delivery strategy.
- Production validation rejects unresolved `TODO`, `TBD`, and `{{...}}` tokens in required fields.

See `08-templates/content-config.example.json` and `08-templates/content-schema.json`.
