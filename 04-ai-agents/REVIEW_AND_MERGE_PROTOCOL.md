# Review and Merge Protocol

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Define how AI-generated changes are reviewed, tested, and integrated.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


## Review order

1. Requirement/contract compliance.
2. Privacy and security boundary.
3. Correctness and state/error behavior.
4. Accessibility and mobile ergonomics.
5. Performance and dependency impact.
6. Maintainability and documentation.
7. Visual polish.

## Mandatory second review

Access/session, protected media, global audio coordinator, story reducer, content schema, release configuration, and any code handling secrets or personal asset URLs.

## Merge gates

Clean diff, no unowned changes, tests pass, production build passes, generated artifacts are expected, no personal fixtures in public tests, documentation updated, and handoff complete. Squash only if history is not needed for audit; preserve meaningful release commits.

## Conflict policy

Resolve against authoritative architecture, not whichever branch is newer. If two agents changed a shared interface, stop and reconcile the interface with tests before feature code.
