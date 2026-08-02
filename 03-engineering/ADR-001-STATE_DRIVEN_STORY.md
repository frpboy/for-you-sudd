# ADR-001: State-Driven Story Shell

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Record the decision to use one story shell rather than route-per-screen navigation.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


## Status
Accepted.

## Context

The experience must preserve audio, progress, gestures, and transitions across many short chapters. Multiple agents could otherwise create inconsistent routing and authorization.

## Decision

Use a single `/story` route with a typed reducer/state machine and stable chapter IDs. Use URL hash/query only for safe resume/debug, not as the source of authorization.

## Consequences

Simpler audio and transition management, fewer navigation flashes, centralized privacy, and clearer testing. Requires disciplined state design and explicit deep-link behavior.
