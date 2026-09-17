---
name: release
description: Advisory review of release impact, changelog, and template contracts.
disable-model-invocation: true
---

## Purpose

Advisory only. Do not bump versions, merge a release PR, or use publish credentials.

## Steps

1. Diff against `main` (feature PR) or the previous `v*` tag (release PR). List payload paths (`apps/api|web|mobile`, `packages/`, `tools/`, `scripts/`, `.cursor/`, `.agents/`, generator).
2. Suggest a conventional title. Flag `docs`/`chore`/`test`/`ci`/`style` when payload paths changed unless the body has `skip-release: true`.
3. Note generator CLI, template include/exclude, and docs snapshot impact. Generated trees must not gain the documentation app or the generator.
4. Draft user-facing changelog bullets and required adopter actions. Keep Release Please's deterministic changelog authoritative.
5. Link tests, classification, and (on a release PR) scaffold acceptance. Stop if a human gate is missing.

## Verification

- [ ] Findings are advisory and cite paths.
- [ ] No version bump or publish occurred.

## Handoff

Return advisory findings without changing versions or publishing. Read [completion evidence](../references/completion.md).
