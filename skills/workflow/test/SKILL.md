---
name: test
description: Run the repository test scripts and fix failures until they pass.
disable-model-invocation: true
---

## Purpose

Run the documented test scripts from package.json (filtered to the change when the repo supports it). Fix owning causes. Do not publish.

## Steps

1. Identify the test command for the affected packages (`pnpm test`, Turbo filters, or the app E2E script). Prefer the narrowest suite that covers the change; use the full suite when the failure is unknown or the user asked for it.
2. Run the command. Capture failing tests, not a paraphrase.
3. Fix one owning cause at a time. Re-run the failed command. Do not weaken assertions or skip tests to obtain a pass.
4. Stop when the suite is green or remaining failures need a human (secrets, env, flaky infra).

## Verification

- [ ] The command that was run is named.
- [ ] Failures caused here are fixed or listed with files.
- [ ] No commit or push.

## Handoff

Report the command, result, and remaining failures. Read [completion evidence](../references/completion.md).
