# AI Agent Task Contract

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Standardize every implementation task so work is bounded, reviewable, and handoff-safe.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


## Required task header

```yaml
task_id: STORY-001
title: Implement typed story reducer
owner_role: frontend-platform
requirement_ids: [FR-005, FR-014, NFR-008]
depends_on: [ARCH-001]
owned_files:
  - src/state/story-machine.ts
  - tests/unit/story-machine.test.ts
non_goals:
  - UI animation
  - access verification
privacy_class: internal-no-personal-data
```

## Required task body

- Objective.
- Current behavior and inspected files.
- Inputs/interfaces.
- Acceptance criteria in Given/When/Then form.
- Edge cases and reduced-motion/accessibility implications.
- Test commands and expected evidence.
- Rollback/revert scope.

## Completion response

```text
Result:
Requirements satisfied:
Files changed:
Behavior added/changed:
Tests run and results:
Manual checks:
Privacy/security impact:
Performance impact:
Dependencies/config changes:
Known limitations:
Next-agent handoff:
```

## Rejection conditions

Task is rejected if it mixes unrelated work, changes unowned architecture, lacks tests/evidence, invents personal content, leaks assets/secrets, or leaves the repository failing existing gates.
