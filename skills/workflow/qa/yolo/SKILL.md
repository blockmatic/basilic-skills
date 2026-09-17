---
name: yolo
description: Run the repository's full local quality gate and fix failures without publishing.
disable-model-invocation: true
---

## Purpose

Run the documented full gate and fix failures. This is not merge or deploy. Follow [git publish](../../references/git-publish.md). Do not delete features to make a gate pass.

## Steps

1. Detect the gate: `pnpm qa` when the repo defines it, plus `pnpm validate` when that script exists (catalog). If neither exists, use the equivalent lint, type, build, and test scripts from package.json.
2. Run those commands. Do not report completion until each is passed, failed, or not applicable with a reason.
3. Fix owning causes. Re-run the failed command. Open [lint](../lint/SKILL.md) or [test](../../test/SKILL.md) only if that phase is blocked.
4. Optionally review the task diff with `/review` (read-only). Apply fixes only for defects you can evidence.
5. If CodeRabbit or CI comments exist and the user asked to consume them, follow `/coderabbit` or `/comments` without committing.
6. Stop when the gate is green or when remaining failures need a human (secrets, product scope, missing env).

## Verification

- [ ] Each gate command is recorded as passed, failed, or not applicable.
- [ ] No secrets, `.env`, or unrelated dotfiles were edited.
- [ ] No Git publish happened.

## Handoff

Summarize failures, fixes, and remaining blockers. If they want a local commit, use `/commit`. Use `/push` only after they explicitly request publication of an already-committed branch. Read [completion evidence](../../references/completion.md).
