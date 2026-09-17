---
name: shadcn
description: Install shadcn/ui primitives in the shared UI package using monorepo import paths.
disable-model-invocation: true
---

Install or extend a shadcn primitive. Reshaping a screen stays on `/ui`. Follow `shadcn-v3`.

1. Use shadcn MCP only when unsure about variants or when hitting an install error.
2. Install in the shared UI package from `components.json` (Basilic example: `packages/ui/src/components/`).
3. Import `@repo/ui/components/*` and that package’s `cn`. Rare primitives: `@repo/ui/base` (not `@base-ui/react`, not `@radix-ui/*`, not deleted `@repo/ui/radix`). Keep `components.json` `"style": "base-vega"`. Compose with `render` + `data-slot` / `data-open` (not `asChild` / `data-state`).
4. After the primitive exists, reshape screens with `/ui` if the job is a surface, not only a component. Run lint on the changed files.
5. Docs: `/docs` if behavior or commands changed.
