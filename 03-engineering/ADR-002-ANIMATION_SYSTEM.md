# ADR-002: One Animation System

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Record the decision to use Motion plus CSS and avoid GSAP by default.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


## Status
Accepted.

## Decision

Use Motion for React for component transitions/gestures and CSS for simple loops/states. Add no second animation library unless a measured, approved use case cannot be implemented adequately.

## Consequences

Lower bundle and cognitive load, consistent reduced-motion behavior, easier AI-agent coordination, and fewer animation lifecycle bugs. Extremely custom timeline choreography is intentionally deprioritized.
