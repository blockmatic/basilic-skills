---
name: unit
description: Add unit tests for the current change using the repo test skill and colocated files.
disable-model-invocation: true
---

Cover the requested behavior with unit tests. Follow `vitest-v4` (or the stack's test skill) and existing file conventions. Do not chase coverage percentage.

1. Read neighboring tests and the test skill. Colocate `*.test.ts` beside the implementation.
2. Test the behavior that can fail: public API, error paths, and the regression this change needs.
3. Mock only at documented boundaries. Prefer real types and factories the repo already uses.
4. Run the focused file, then the package test script.
5. Docs: `/docs` if behavior or commands changed.
