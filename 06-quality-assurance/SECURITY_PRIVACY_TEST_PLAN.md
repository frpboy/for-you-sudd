# Security and Privacy Test Plan

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Verify that personalized content is protected throughout the deployment lifecycle.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


## Access tests

Unauthenticated root, story route, API, static/data requests, image/video/audio URLs, source maps, manifest/config, preview URLs, and alternate hostnames. Verify rate limiting, cookie flags, logout/expiry policy, direct navigation, and cache behavior.

## Exposure tests

Search/robots headers, generic metadata and social preview, referrer policy, browser cache expectations, directory listing, Git history, CI artifacts, logs, monitoring events, environment variables, client bundles, and network responses before authorization.

## Header/config tests

CSP, frame restrictions, content-type nosniff, HSTS, permissions policy, TLS, and no sensitive wildcard origins.

## Incident drill

Simulate an exposed secret/asset: disable access, rotate secret/signing keys, invalidate URLs, remove deployment, inspect logs, rewrite repository history if required, and document minimal incident facts.
