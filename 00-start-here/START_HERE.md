# Start Here

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Give the owner and AI agents a deterministic path from client intake to launch.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


## Outcome

Deliver a private, emotionally paced, phone-first birthday experience that is reliable on iPhone and Android, protects personal media, and can be completed safely before 8 August 2026.

## Step 1 - Freeze facts

Confirm names, letter, music rights, media order, domain, access policy, and deletion date. Record decisions in `DECISIONS_AND_OPEN_ITEMS.md`. Never let an agent infer relationship facts.

## Step 2 - Prepare media

Use the media inventory workbook/CSV. Every asset needs a stable ID, owner approval, chronology, caption, alt text, rights status, and optimized derivative. Keep originals outside the public repository.

## Step 3 - Build the P0 spine first

Implement access, start gesture, countdown, timeline, gallery, video, voice note, quiz, letter, finale, navigation, and error recovery. P1/P2 interactions are allowed only after P0 passes mobile QA.

## Step 4 - Run agent tasks in order

Use `04-ai-agents/IMPLEMENTATION_SEQUENCE.md`. Each task must begin with repository inspection and end with tests, changed-file list, risks, and handoff notes.

## Step 5 - Validate real devices

At minimum test one current iPhone/Safari and one Android/Chrome device on Wi-Fi and throttled mobile data. Check audio interruptions, rotation, safe areas, background/foreground restoration, and accidental refresh.

## Step 6 - Launch and retire safely

Deploy behind the approved gate, use generic metadata and `noindex`, verify the production URL from an unauthenticated device, keep rollback available, and remove the deployment/media on the approved retention date.

## Release gates

- **Content gate:** all facts, copy, answers, media, consent, and rights approved.
- **Engineering gate:** typecheck, lint, unit, component, E2E, accessibility, and production build pass.
- **Privacy gate:** direct asset URLs, metadata, repository history, logs, and social previews reviewed.
- **Experience gate:** complete 10-15 minute journey works one-handed without instruction.
- **Owner gate:** client/friend signs UAT and launch approval.
