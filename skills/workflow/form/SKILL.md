---
name: form
description: Build a Next.js form using the app's existing mutation path, not a second stack.
disable-model-invocation: true
---

## Purpose

Implement a form in the current Next app. Follow `next-v16` and `shadcn-v3`. If the app already mutates through an API client (Fastify + TanStack Query), do not introduce Server Actions, `useFormStatus`, or `useOptimistic` for those flows.

## Steps

1. Inspect how neighboring forms submit. Reuse that path.
2. Share one Zod schema for client UX and server validation.
3. Wire accessible labels, errors, pending, and empty/error/success states with existing UI primitives.
4. Run lint and exercise submit, validation failure, and keyboard path.

## Verification

- [ ] The mutation path matches the rest of the app.
- [ ] Validation runs on the server for that path.
- [ ] Keyboard and error states were checked.

## Handoff

Report the form files and remaining unverified states. Read [completion evidence](../references/completion.md).
