---
name: ship
description: Implement the requested change, validate, commit, push, and create its PR.
disable-model-invocation: true
---

## Purpose

Invocation requests the complete implementation-to-PR path. Read the task or plan, repository instructions, branch state, affected docs, and scripts. Do not broaden the request to merge or deployment. Follow [git publish](../../references/git-publish.md).

## Steps

1. Inspect the working tree and current branch. If the tree is dirty, stop — do not stash and do not pull into a dirty checkout.
   - `git fetch origin`.
   - If a **new** branch is needed: fast-forward local `main` from `origin/main` then create and check out `<name>`, or `git switch -c <name> --no-track origin/main` after fetch. Never branch from a stale local `main`.
   - If already on the intended feature branch, do not reset it to `main`.
2. Implement in complete slices: inspect owned files, change owning sources, run the smallest meaningful check, update matching docs. Open [build](../../build/SKILL.md) only if the increment is blocked.
3. Run the repository's full pre-push gate (`pnpm qa` in Basilic); diagnose failures before publishing.
4. Commit task-owned changes (Conventional Commit, hooks on), then push the inspected upstream. Open [commit](../commit/SKILL.md) or [push](../push/SKILL.md) only if a Git step is blocked.
5. Create or update the PR: template body, nonempty description, `BREAKING CHANGE:` footer when the title uses `!`. Open [pr](../pr/SKILL.md) only if PR creation is blocked.

## Verification

- [ ] Requested acceptance criteria and required validation pass.
- [ ] Commit and push contain only intended work, with hooks enabled.
- [ ] PR targets the correct base and explains the final behavior.

## Handoff

Return the commit, branch, PR link, and checks. If a gate fails, report the blocker and the completed local work; do not present an unpublished change as shipped.
