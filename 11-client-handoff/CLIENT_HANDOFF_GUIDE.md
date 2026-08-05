# Client Handoff Guide

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Preview handoff — V2/V3 experience
**Target date:** 8 August 2026  
**Document purpose:** Explain ownership, access, updates, and shutdown after delivery.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


## Deliver at handoff

Production URL/domain, access instructions through a secure channel, deployment/hosting account ownership, repository ownership, DNS details, final content/media manifest, rights/consent record, release evidence, known limitations, rollback procedure, and retirement date.

## Demonstrate

How to open from a phone, mute/unmute, replay, handle a media error, verify access from a private browser, roll back, rotate access, replace approved content through the documented pipeline, and remove the site.

## Experience behaviour to confirm with the client

### Birthday gate

- Before **8 August 2026, 00:00 in the recipient device's local timezone**, the story shows a live birthday countdown immediately before the existing “Happy Birthday, Sudd” welcome screen.
- The countdown updates each second and requires no action.
- At midnight, it automatically moves to the existing welcome screen. On or after the birthday, the countdown is skipped with no visible flash.
- Optional enhancement: during the final 10 seconds, show a prominent 10-to-1 countdown before the automatic transition. Confirm approval before it is added to the release scope.

### How the story is navigated

- There are no general “Continue” buttons. Swipe left/right, or tap the outer 30% of the screen: left goes back and right goes forward.
- The centre remains available for controls such as quiz answers, media players and inputs. Navigation ignores small or vertical drags.
- The bars at the top show story progress. Verify the experience on a real iPhone and Android device before launch, including browser edge gestures and pull-to-refresh behaviour.

### Sound

- One ambient track is intended to remain continuous through the authenticated story. The music control in the top-right pauses it and changes only its volume.
- When a voice message plays, the ambient track should smoothly lower to roughly 25%, then return after the message ends. Starting another voice stops the current one.
- If the recipient has manually paused ambient music, voice messages still play and the site does not resume ambient music automatically.
- Browser audio policies can require a first user gesture before playback. Confirm the desired soundtrack is approved for this private deployment and provide a separate pre-access, public-safe/licensed track only if music must begin during the opening prologue.

### Content and privacy review still required

- Supply and approve any additional voice recordings, anonymous display labels, durations, transcripts, and consent for each recording. The UI intentionally does not reveal senders or relationships.
- Approve the handwritten Malayalam note, its transcription/translation for accessibility if appropriate, final captions/alt text, quiz content, and media retention date.
- Do not send access credentials, quiz answers, or surprise-only details through public channels. Keep them in the private handoff and deployment secrets only.
- Review repository access, analytics, hosting, domain ownership, media rights, and deletion/retention procedures before public launch.

## Ownership

The client/project owner must know who controls the domain, hosting, storage, repository, and renewal billing. Avoid a permanent dependency on an intermediary account without written transfer/support terms.

## Support boundary

Record included support period, response channel, what counts as a defect versus new scope, costs/approval for changes, and emergency privacy contact.
