# Privacy Incident Response Mini-Runbook

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Give the owner a rapid response if a secret or personal asset is exposed.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


1. Stop exposure: disable production/preview access or remove domain alias.
2. Preserve minimal facts: time, system, opaque asset/secret ID, reporter.
3. Rotate access/session/storage secrets and invalidate signed URLs.
4. Remove leaked asset/deployment and inspect alternate hosts, caches, logs, artifacts, and Git history.
5. Determine what was accessible, for how long, and whether it was accessed.
6. Notify the client through the agreed private channel with facts and corrective action.
7. Rebuild from a known clean source, rerun privacy tests, and obtain approval before restoring.
8. Record lessons and update controls; do not attach leaked intimate material to the incident record.
