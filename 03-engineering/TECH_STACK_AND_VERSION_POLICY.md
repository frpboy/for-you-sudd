# Technology Stack and Version Policy

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Define allowed technologies and rules for selecting versions safely.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


## Approved stack

| Concern | Selection | Policy |
|---|---|---|
| Framework | Next.js App Router | Use an officially supported patched release; pin exact version in lockfile. |
| Runtime | Node.js LTS | Pin major/minor through project metadata and CI. |
| Language | TypeScript strict | No untyped content boundary; avoid broad `any`. |
| Styling | Tailwind CSS + CSS variables | Tokens live in one source; avoid ad hoc colors. |
| Animation | Motion for React + CSS | No GSAP unless an approved ADR proves a unique need. |
| Schema | Zod or equivalent | Validate content and environment at build/start. |
| Unit tests | Vitest | Pure logic, reducers, validators, date/answer normalization. |
| E2E | Playwright | Mobile emulation plus real-device manual pass. |
| Accessibility | axe + manual | Automated tools do not replace manual checks. |
| Deployment | Vercel or equivalent managed host | Must support server logic, secrets, TLS, rollback, and protection model. |

## Version selection rule

At project initialization, consult official release/security documentation and select a currently supported patched release. Record exact choices in an ADR and lockfile. Do not copy stale version numbers from the original chat. Dependency upgrades after P0 freeze require targeted regression and security justification.

## Dependency admission checklist

A new dependency requires: capability gap, size/runtime impact, maintenance status, license, security review, privacy implications, browser support, alternatives, and removal cost. Prefer platform APIs and small focused packages.
