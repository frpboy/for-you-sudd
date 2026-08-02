# Deployment and Environment Strategy

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Define environments, promotion, rollback, DNS, verification, and retirement.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


## Environments

| Environment | Personal content | Access | Purpose |
|---|---|---|---|
| Local | Approved subset or fixtures | Local secret | Development |
| CI | Synthetic fixtures only | Test secret | Automated validation |
| Preview | Approved personal content only when protected | Mandatory protection | Client review/UAT |
| Production | Final approved content | Mandatory protection | Recipient experience |

## Environment variables

Server-only access secret/hash, session signing secret, birthday timestamp/timezone, protected storage credentials, optional error-monitoring DSN with privacy controls, and feature flags. Validate all at startup/build. Never commit `.env` files.

## Promotion

Merge protected main branch -> create content-approved preview -> run automated and manual checks -> record evidence -> promote exact immutable deployment -> attach custom domain -> verify from unauthenticated and authenticated clean devices.

## Rollback

Keep the previous known-good immutable deployment. Rollback triggers include access failure, private exposure, fatal flow, missing media, wrong personal copy, audio loop, or severe performance regression. Rollback must be executable without rebuilding.

## Post-launch

Monitor only operational health. Re-test after DNS/certificate changes. Freeze non-critical changes. On the retirement date, execute the deletion runbook and verify all aliases/previews/storage are removed.
