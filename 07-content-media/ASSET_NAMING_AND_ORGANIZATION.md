# Asset Naming and Organization

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Make media deterministic for agents, manifests, reviews, and deployment.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


## Stable ID format

`kind-context-date-sequence`, lowercase kebab-case. Example: `photo-first-meet-2026-01-06-01`.

## Working filenames

`2026-01-06_first-meet_station_01_original.jpg`  
`2026-01-06_first-meet_station_01_1080.webp`  
`2026-01-06_first-meet_station_01_blur.webp`

For unknown dates use `undated`, not guessed dates. Do not put full personal names, phone numbers, access secrets, or intimate descriptions in filenames/URLs.

## Albums

`first-meet`, `bangalore`, `selfies`, `random-happy-moments`, and `favourites` are suggested categories but require approval and actual asset mapping.

## Immutability

Once an asset ID is referenced by content, keep the ID stable. Replace derivatives/checksum through the manifest rather than renaming casually.
