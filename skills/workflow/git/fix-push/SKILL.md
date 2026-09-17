---
name: fix-push
description: Fix reported issues, validate, then commit and push.
disable-model-invocation: true
---

## Purpose

Invocation requests fix → validate → commit → push for the named issues. This is not `/ship` (no PR) and not a merge or deploy. Follow [git publish](../../references/git-publish.md).

## Steps

1. Address the reported errors, warnings, or feedback (lint, types, tests, reviews).
2. Run `pnpm qa` in Basilic (or the consuming repo's documented full gate). Fix failures before publishing.
3. Commit intended paths only using the `/commit` rules: task-owned hunks, Conventional Commit, hooks enabled.
4. Push using the `/push` rules: inspected upstream, no force-push, no hook bypass. Open [commit](../commit/SKILL.md) or [push](../push/SKILL.md) only if a step is blocked.

## Verification

- [ ] The reported issues and the full gate were addressed.
- [ ] Commit and push used the Git publish rules.
- [ ] Unrelated local changes remain intact.

## Handoff

Report commit, branch, and push result. Do not open a PR unless the user asked `/pr` or `/ship`.
