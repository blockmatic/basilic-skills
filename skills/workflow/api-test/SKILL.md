---
name: api-test
description: Add API tests that exercise public HTTP behavior against existing harnesses.
disable-model-invocation: true
---

## Purpose

Test endpoints through the public interface using this repo's API or Playwright harness. Do not hit production. Do not hardcode secrets.

## Steps

1. Read the API testing MDX and existing `*.test.ts` or e2e specs.
2. Cover the requested operations, authz denials, and contract-shaped responses.
3. Use sandbox or local servers from package scripts. Clean up created resources.
4. Run the documented API or e2e command for those tests.

## Verification

- [ ] Tests go through public HTTP, not internals.
- [ ] No production URL or hardcoded secret.
- [ ] The test command was run.

## Handoff

Report specs added and remaining untested routes. Read [completion evidence](../references/completion.md).
