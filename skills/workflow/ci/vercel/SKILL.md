---
name: vercel
description: Retrieve Vercel build logs, analyze failures, and fix the local build.
disable-model-invocation: true
---

## Purpose

Triage a Vercel build failure for the current branch. Use Vercel MCP when available. Fix the local build. Do not deploy. Follow [git publish](../../references/git-publish.md).

## Steps

1. Retrieve build logs for the current branch via Vercel MCP (or the user-supplied log).
2. Parse TypeScript, ESLint, missing deps, env, imports, and config errors.
3. Apply the owning fix. Run the app or package build script from `package.json`.
4. Stop at verified local build.

## Verification

- [ ] The log error maps to a file that was changed.
- [ ] The local build command for that app passed, failed, or was not applicable with a reason.
- [ ] No deployment and no unsolicited commit.

## Handoff

Report the build error, the fix, and the local build result.
