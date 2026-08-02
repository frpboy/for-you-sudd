# Backup, Rollback, and Retirement Architecture

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Protect work during delivery while ensuring intimate content can be removed afterward.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


## Backup

Keep encrypted/private originals, an optimized derivative archive, approved content configuration, source code, lockfile, release evidence, and deployment identifiers. Backups must have an owner and deletion date.

## Rollback

The release is immutable. Retain at least one known-good deployment and the exact content/media manifest used. Changes after launch create a new deployment; never patch unknown production state manually.

## Retirement

Remove domain mapping, production deployment, personal previews, storage objects and versions, build logs/attachments containing filenames, temporary transfer links, local staging folders, and third-party caches under owner control. Confirm search/social caches separately where relevant.

## Evidence

Retain only a minimal deletion record: project ID, systems checked, date, operator, outcome, and exceptions. Do not attach intimate content to the record.
