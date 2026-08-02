# Error Handling and Recovery

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Define typed failures, user-facing recovery, and privacy-safe diagnostics.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


## Error classes

`AccessError`, `ContentValidationError`, `MediaLoadError`, `MediaPlaybackError`, `CapabilityUnavailable`, `NetworkInterruption`, `PersistenceError`, `UnexpectedStoryState`, and `DeploymentConfigurationError`.

## User behavior

- Access: retry without revealing whether content exists.
- Image/video/audio: retry, skip, and continue when optional.
- Quiz/content: never silently change accepted answers at runtime.
- Story state: restore nearest valid chapter and preserve a calm message.
- Network: retain loaded content and resume when connection returns.
- Fatal unexpected error: show generic recovery with Reload and Start Again; include an opaque incident code.

## Engineering behavior

Errors carry safe machine codes and causal context but exclude personal copy and secrets. Error boundaries exist at app shell, story chapter, and media overlay levels. Retry loops are bounded with backoff. CI treats content/configuration errors as build failures.
