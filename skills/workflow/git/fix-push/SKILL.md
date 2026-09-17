---
name: fix-push
description: Fix reported issues, validate, then commit and push.
disable-model-invocation: true
---

## Purpose

Invocation requests fix → validate → commit → push for the named issues. This is not `/ship` (no PR) and not a merge or deploy. Follow [git publish](../../references/git-publish.md).

## Steps

1. Address the reported errors, warnings, or feedback (lint, types, tests, reviews).
2. Run the documented full gate (`pnpm qa` in Basilic, or the consuming repo's equivalent). Fix failures before publishing.
3. Commit intended paths only. Open [commit](../commit/SKILL.md) only if the commit step is blocked.
4. Push the inspected upstream. Open [push](../push/SKILL.md) only if the push step is blocked.

## Verification

- [ ] The reported issues and the full gate were addressed.
- [ ] Commit and push used the Git publish rules.
- [ ] Unrelated local changes remain intact.

## Handoff

Report commit, branch, and push result. Do not open a PR unless the user asked `/pr` or `/ship`. Read [completion evidence](../../references/completion.md).
