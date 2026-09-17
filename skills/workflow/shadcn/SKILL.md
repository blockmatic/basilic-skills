---
name: shadcn
description: Install shadcn/ui primitives in the shared UI package using monorepo import paths.
disable-model-invocation: true
---

## Purpose

Install or extend a shadcn primitive. Reshaping a screen stays on `/ui`. Follow `shadcn-v3`.

## Steps

1. Use shadcn MCP only when unsure about variants or when hitting an install error.
2. Install in the shared UI package from `components.json` (Basilic example: `packages/ui/src/components/`).
3. Import from that package's public subpath (Basilic example: `@repo/ui/components/*`), not a deep source path. Use that package's `cn` and Radix re-exports.
4. After the primitive exists, reshape screens with `/ui` if the job is a surface, not only a component.

## Verification

- [ ] The primitive lives in the shared UI package.
- [ ] Consuming apps import the public subpath.
- [ ] Lint on the changed files passed or remaining issues are listed.

## Handoff

Report the component path and whether `/ui` is still needed. Read [completion evidence](../references/completion.md).
