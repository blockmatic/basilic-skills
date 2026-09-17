---
name: ui
description: Build or reshape UI with purpose, existing tokens, accessible interactions, and bounded rendered verification.
disable-model-invocation: true
---

## Purpose

Build or reshape a user-facing surface. Planning a feature without UI work stays on `/plan`. Installing a primitive stays on `/shadcn`. Do not invent PRODUCT.md or DESIGN.md. Follow existing tokens and root `DESIGN.md` when present. Do not install animation libraries or design-detector hooks.

Load `frontend-design` for visual direction, `composition-patterns` for reusable APIs, and `web-design-guidelines` for the UI code checklist. Durable product jobs belong in `PRODUCT.md`.

## Steps

1. Name the job, the person, and the surface mode: Operate (app/task), Persuade (marketing), or Read (docs). Durable jobs stay in `PRODUCT.md`.
2. Use the brief, existing screens, or a stated aesthetic. If the repo has tokens and shared components, inspect those first.
3. Prefer shared primitives. Compose at the second call site. Do not extract a compound API for a one-off route. Do not lift server data into a client provider.
4. Mobile-first layout, visible focus, keyboard path, `prefers-reduced-motion`. Do not add a new motion library.
5. Cover loading, empty, error, success, and overflow as applicable.
6. Implement the smallest slice that completes the job.
7. Inspect desktop and mobile together. Exercise primary interactions and keyboard navigation. Critique screenshots. Fix evidenced issues in one batch. Confirm with at most one more pass, then stop. If browser tools are missing, say so. A type check is not visual QA.
8. Optional: `/a11y` against existing a11y docs and tests (do not invent a WCAG level). Playwright E2E only when an existing spec covers the path.

## Verification

- [ ] Purpose, audience, and surface mode were stated.
- [ ] Existing tokens and primitives were inspected before new visual tokens.
- [ ] Loading, empty, error, and success (as applicable) exist.
- [ ] Desktop and mobile were inspected; keyboard was exercised.
- [ ] Visual inspection and automated tests are reported separately.
- [ ] At most two rendered passes (batch fix + confirm).

## Handoff

Return what changed, which viewports and states were inspected, remaining unverified behavior, and whether a11y still needs a pass. Read [completion evidence](../references/completion.md).
