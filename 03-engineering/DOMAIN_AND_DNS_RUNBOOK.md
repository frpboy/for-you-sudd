# Domain and DNS Runbook

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Prevent last-minute domain, certificate, redirect, and preview mistakes.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


## Decision

Choose a neutral, private-looking domain or subdomain that does not expose both names publicly. Record registrar, owner account, renewal setting, DNS provider, and retirement behavior.

## Steps

1. Purchase/select domain early and verify account ownership/MFA.
2. Configure required A/AAAA/CNAME records using the hosting provider’s exact instructions.
3. Verify TLS issuance and automatic renewal.
4. Redirect canonical host consistently; avoid multiple public aliases.
5. Ensure previews remain protected and are not linked from the public domain.
6. Test DNS from mobile data and clean browsers.
7. Confirm generic title/social preview and noindex headers.
8. Document how to detach/delete the domain after the approved retention period.

## Never

Do not paste access secrets into DNS, expose a personal email publicly, use a domain controlled only by an intermediary without transfer terms, or wait until launch day for certificate/DNS validation.
