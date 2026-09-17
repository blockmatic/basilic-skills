---
name: onboard
description: Get a new developer from clone to a running local app.
disable-model-invocation: true
---

## Purpose

Walk setup using this repository's scripts and docs. Do not open a PR unless asked.

## Steps

1. Run the repo root setup script (`pnpm setup` in Basilic).
2. Decide local-only vs remote from the development-environments page named in `AGENTS.md`.
3. Start the documented web and API dev command (`pnpm dev` in Basilic).
4. Optional: start mobile with the filter command in the mobile README.
5. Verify the app loads and reaches the API. Point at `/pr` when they are ready to publish work.

## Verification

- [ ] Setup and dev commands came from inspected scripts.
- [ ] The app reached the API or the blocker is named.

## Handoff

Report what is running and the next documented command. Read [completion evidence](../../references/completion.md).
