---
name: workflow
description: Catalog of Basilic slash playbooks. List the shortcuts and stop; do not start work.
disable-model-invocation: true
---

# Basilic playbooks

List the shortcuts below and stop. Do not start a lifecycle or execute all playbooks. Extra tokens (`/workflow plan`) do not dispatch — tell the user to invoke `/w-plan` (or the matching shortcut) directly.

Direct `/<name>` loads the child. Everyday: `/w-plan` `/w-build` `/w-review` `/w-debug` `/w-test` `/w-commit` `/w-push` `/w-pr` `/w-retro` `/w-ui`. Feature work uses `/w-plan`; a durable boundary uses `/w-architecture`; a missing product fact uses `/w-clarify`; a large plan uses `/w-review-plan` before `/w-build`. Durable product facts live in the consuming repo's `PRODUCT.md`; technical facts live in that repo's docs. `/w-tdd` is opt-in.

`/w-build` ends at verified local changes. `/w-commit`, `/w-push`, `/w-pr`, `/w-fix-push`, and `/w-ship` request their named Git actions; none requests merging or deploying. `/w-ship` is implement through a described PR and is the only playbook that requires `pnpm qa` (or the repo's full pre-push suite). `/w-yolo` fixes failing or requested local checks without publish.

## Debug

- [/w-debug](w-debug/SKILL.md)
- [/w-debug-browser](w-debug-browser/SKILL.md)

## Lifecycle

- [/w-plan](w-plan/SKILL.md)
- [/w-build](w-build/SKILL.md)
- [/w-retro](w-retro/SKILL.md)

## Git

- [/w-commit](git/w-commit/SKILL.md)
- [/w-push](git/w-push/SKILL.md)
- [/w-pr](git/w-pr/SKILL.md)
- [/w-comments](git/w-comments/SKILL.md)
- [/w-git-repair](git/w-git-repair/SKILL.md)
- [/w-fix-push](git/w-fix-push/SKILL.md)
- [/w-ship](git/w-ship/SKILL.md)

## CI

- [/w-gha](ci/w-gha/SKILL.md)
- [/w-vercel](ci/w-vercel/SKILL.md)

## Quality

- [/w-lint](qa/w-lint/SKILL.md)
- [/w-yolo](qa/w-yolo/SKILL.md)
- [/w-test](w-test/SKILL.md)
- [/w-tdd](w-tdd/SKILL.md)
- [/w-unit](w-unit/SKILL.md)
- [/w-api-test](w-api-test/SKILL.md)

## Review and security

- [/w-review](w-review/SKILL.md)
- [/w-review-plan](w-review-plan/SKILL.md)
- [/w-security](w-security/SKILL.md)
- [/w-release](w-release/SKILL.md)
- [/w-coderabbit](w-coderabbit/SKILL.md)
- [/w-deslop](w-deslop/SKILL.md)

## Product and docs

- [/w-clarify](w-clarify/SKILL.md)
- [/w-council](w-council/SKILL.md)
- [/w-roadmap](product/w-roadmap/SKILL.md)
- [/w-architecture](product/w-architecture/SKILL.md)
- [/w-docs](doc/w-docs/SKILL.md)
- [/w-api-docs](doc/w-api-docs/SKILL.md)
- [/w-onboard](doc/w-onboard/SKILL.md)
- [/w-diagram](doc/w-diagram/SKILL.md)

## UI and craft

- [/w-ui](w-ui/SKILL.md)
- [/w-shadcn](w-shadcn/SKILL.md)
- [/w-v0](w-v0/SKILL.md)
- [/w-form](w-form/SKILL.md)
- [/w-a11y](w-a11y/SKILL.md)
- [/w-perf](w-perf/SKILL.md)
- [/w-refactor](w-refactor/SKILL.md)
- [/w-errors](w-errors/SKILL.md)

## Authoring

For skill changes, read [the authoring pattern](references/authoring.md). Git publish rules: [git publish](references/git-publish.md). Review dimensions: [review dimensions](references/review-dimensions.md).
