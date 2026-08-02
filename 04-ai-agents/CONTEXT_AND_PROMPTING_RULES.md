# Context and Prompting Rules

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Minimize agent drift, hallucinated content, and broad destructive edits.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


## Prompt composition

Every agent prompt should contain: role, one objective, authoritative files, requirement IDs, current behavior, owned files, interfaces, constraints, non-goals, acceptance, tests, and completion format.

## Content boundary

Personal content is immutable input until approved. Agents may use synthetic placeholders in development, but placeholders must be machine-detectable and blocked in production. Never ask an agent to “make it romantic” without providing approved source notes and a review step.

## Repository inspection

Prompts must require inspection before changes. Agents should cite exact files/functions, avoid duplicate implementations, and preserve existing conventions. If the repository contradicts the prompt, the agent reports the conflict before broad refactoring.

## Long tasks

Split by contract, not by arbitrary file count. Each subtask should produce an interface or vertically complete feature. Do not ask one agent to “build the whole website” in a single unreviewed operation.

## Validation

Require exact commands and observed results. “Should pass” is not evidence. Screenshots must use synthetic content unless the approved private review process permits personal media.
