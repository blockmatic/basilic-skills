---
name: lint
description: Run project linters, apply the smallest fixes, and re-run until the suite is clean.
disable-model-invocation: true
---

## Purpose

Run the repository lint scripts and apply the smallest idiomatic fixes. This is not a merge gate and does not commit.

## Steps

1. Run the documented lint command with autofix when the repo provides one. Capture remaining errors.
2. Fix remaining issues with minimal diffs. Change suppressions or config only with evidence they belong.
3. Re-run lint. Spot-check the diff. Do not stage or commit.

## Verification

- [ ] Lint was re-run after edits.
- [ ] Remaining failures are listed with files.
- [ ] Working tree was not committed.

## Handoff

Report lint result. Use `/commit` only if the user asked to publish. Read [completion evidence](../../references/completion.md).
