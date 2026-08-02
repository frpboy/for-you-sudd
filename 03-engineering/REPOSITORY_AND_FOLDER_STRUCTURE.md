# Repository and Folder Structure

**Project:** Our Story - Mobile Birthday Experience  
**Status:** Baseline v1.0  
**Target date:** 8 August 2026  
**Document purpose:** Provide deterministic file ownership for humans and AI agents.

> Confirmed client facts are marked **Confirmed**. Missing personal content is marked **Client input required**. Optional ideas are marked **Enhancement**.


```text
app/
  access/page.tsx
  story/page.tsx
  api/access/route.ts
  layout.tsx
  robots.ts
  sitemap.ts                 # omit or generic; no private routes
src/
  components/
    access/
    audio/
    gallery/
    media/
    quiz/
    story/
    ui/
  content/
    content-config.json      # ignored/private or injected securely
    schema.ts
    loader.server.ts
    manifest.server.ts
  features/
    access/
    countdown/
    finale/
    gallery/
    quiz/
    story/
  lib/
    accessibility/
    audio/
    dates/
    media/
    privacy/
    storage/
  state/
    story-machine.ts
    story-persistence.ts
  styles/
    tokens.css
    globals.css
  types/
public/
  illustrations/             # non-personal only
scripts/
  validate-content.ts
  inventory-media.ts
  optimize-images.ts
  transcode-video.sh
  generate-posters.ts
  verify-manifest.ts
  privacy-audit.ts
  release-evidence.ts
tests/
  unit/
  component/
  e2e/
  fixtures/
docs/
  decisions/
  evidence/
```

## Ownership rules

- Components never own personalized text or answers.
- `src/content/` owns schema/loader; approved personalized data is injected through the chosen secure workflow.
- Global audio is owned by one module.
- Story transitions are owned by one reducer/state machine.
- Agents must not edit another active task’s owned files without an explicit handoff.
- Generated derivatives and personal originals are ignored by Git unless the repository itself is private and the owner explicitly approves storage.
