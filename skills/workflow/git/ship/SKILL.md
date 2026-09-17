---
name: ship
description: Implement the requested change, validate, commit, push, and create its PR.
disable-model-invocation: true
---

## Purpose

Invocation requests the complete implementation-to-PR path, not a lone commit (`/commit`) and not merge or deploy. Read the task or plan, repository instructions, branch state, affected docs, and scripts. Follow [git publish](../../references/git-publish.md).

## Steps

1. Follow git-publish branch rules (dirty tree stops; fetch; new branch from `origin/main`).
2. Implement in complete slices. Open [build](../../build/SKILL.md) only if the increment is blocked.
3. Run the repository's full pre-push gate (`pnpm qa` in Basilic, or the consuming repo's documented equivalent). Diagnose failures before publishing.
4. Commit task-owned changes, then push the inspected upstream. Open [commit](../commit/SKILL.md) or [push](../push/SKILL.md) only if a Git step is blocked.
5. Create or update the PR. Open [pr](../pr/SKILL.md) only if PR creation is blocked.

## Verification

- [ ] Requested acceptance criteria and required validation pass.
- [ ] Commit and push contain only intended work, with hooks enabled.
- [ ] PR targets the correct base and explains the final behavior.

## Handoff

Return the commit, branch, PR link, and checks. If a gate fails, report the blocker and the completed local work; do not present an unpublished change as shipped. Read [completion evidence](../../references/completion.md).
