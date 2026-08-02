# AI Agent Operating Manual

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Define roles, coordination, context control, review, and escalation for an AI-first build.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


## Operating model

Use an orchestrator to decompose work and specialist agents to execute isolated tasks. Agents do not coordinate through assumptions; they coordinate through task contracts, interface definitions, Git commits/branches, and handoff files.

## Roles

| Role | Responsibility | Cannot approve |
|---|---|---|
| Orchestrator | Dependency map, task assignment, merge sequencing, scope control | Personal content, privacy waiver, launch |
| Product/requirements | Traceability, acceptance, open questions | Invented facts |
| UX/accessibility | Screen behavior, tokens, responsive/a11y review | Personal copy |
| Frontend platform | App shell, tokens, state, shared primitives | Security shortcuts |
| Feature agent | One bounded feature plus tests | Cross-cutting architecture changes |
| Media pipeline | Inventory, transforms, manifests, quality checks | Rights/consent |
| Security/privacy | Threat model, gate, headers, secret/log audit | Risk acceptance |
| QA/release | Test automation/evidence, production verification | Final client sign-off |
| Documentation | Keep docs/contracts aligned with merged behavior | Unapproved product changes |

## Context packet for every task

Task ID, objective, requirement IDs, files/interfaces, dependencies, non-goals, input fixtures, acceptance criteria, test commands, privacy notes, and expected handoff. Do not give an agent the entire repository context when a narrow packet is sufficient.

## Branch and merge discipline

One task per branch/commit sequence. Rebase/merge only after interfaces are stable. Integrate foundation before dependent features. The orchestrator resolves conflicts; feature agents do not rewrite adjacent systems opportunistically.

## Review loop

Implementer self-check -> automated gates -> independent reviewer -> preview evidence -> merge. For access/security, media pipeline, audio coordinator, and state machine, require a second-agent review.

## Escalation

Escalate when facts are missing, documents conflict, a dependency is needed, personal content could leak, a release budget is threatened, or a requested feature violates the P0 freeze. Record the decision rather than hiding it in code.
