---
name: workflow
description: Catalog of Basilic slash playbooks. List the shortcuts and stop; do not start work.
disable-model-invocation: true
---

# Basilic playbooks

List the shortcuts below and stop. Do not start a lifecycle or execute all playbooks. Extra tokens (`/workflow plan`) do not dispatch — tell the user to invoke `/plan` (or the matching shortcut) directly.

Direct `/<name>` loads the child. `/plan` and `/build` are the everyday short-hands for planning and implementation. Durable product facts live in the consuming repo's `PRODUCT.md`; technical facts live in that repo's docs. `/tdd` is opt-in.

## Shortcuts

| Invocation | Playbook |
|---|---|
| `/plan` | [plan](plan/SKILL.md) |
| `/build` | [build](build/SKILL.md) |
| `/review` | [review](review/SKILL.md) |
| `/debug` | [debug](debug/SKILL.md) |
| `/test` | [test](test/SKILL.md) |
| `/commit` | [commit](git/commit/SKILL.md) |
| `/push` | [push](git/push/SKILL.md) |
| `/pr` | [pr](git/pr/SKILL.md) |
| `/retro` | [retro](retro/SKILL.md) |
| `/ui` | [ui](ui/SKILL.md) |

`/build` ends at verified local changes. `/commit`, `/push`, `/pr`, `/fix-push`, and `/ship` request their named Git actions; none requests merging or deploying. `/ship` is implement through a described PR. `/yolo` is the full local gate without publish.

## Git

- [/commit](git/commit/SKILL.md)
- [/push](git/push/SKILL.md)
- [/pr](git/pr/SKILL.md)
- [/comments](git/comments/SKILL.md)
- [/issues](git/issues/SKILL.md)
- [/fix-push](git/fix-push/SKILL.md)
- [/ship](git/ship/SKILL.md)

## CI

- [/gha](ci/gha/SKILL.md)
- [/vercel](ci/vercel/SKILL.md)
- [/docker](ci/docker/SKILL.md)

## Quality

- [/lint](qa/lint/SKILL.md)
- [/yolo](qa/yolo/SKILL.md)
- [/test](test/SKILL.md)
- [/tdd](tdd/SKILL.md)
- [/unit](unit/SKILL.md)
- [/api-test](api-test/SKILL.md)

## Review and security

- [/review](review/SKILL.md)
- [/review-plan](review-plan/SKILL.md)
- [/security](security/SKILL.md)
- [/release](release/SKILL.md)
- [/rabbit](rabbit/SKILL.md)
- [/deslop](deslop/SKILL.md)

## Product and docs

- [/clarify](clarify/SKILL.md)
- [/council](council/SKILL.md)
- [/roadmap](product/roadmap/SKILL.md)
- [/overview](product/overview/SKILL.md)
- [/architecture](product/architecture/SKILL.md)
- [/info](product/info/SKILL.md)
- [/docs](doc/docs/SKILL.md)
- [/api-docs](doc/api-docs/SKILL.md)
- [/onboard](doc/onboard/SKILL.md)
- [/diagram](doc/diagram/SKILL.md)

## UI and craft

- [/ui](ui/SKILL.md)
- [/shadcn](shadcn/SKILL.md)
- [/v0](v0/SKILL.md)
- [/form](form/SKILL.md)
- [/a11y](a11y/SKILL.md)
- [/perf](perf/SKILL.md)
- [/refactor](refactor/SKILL.md)
- [/errors](errors/SKILL.md)
- [/debug-browser](debug-browser/SKILL.md)

## Authoring

For skill changes, read [the authoring pattern](references/authoring.md). For delivery evidence, read [completion evidence](references/completion.md). Git publish rules: [git publish](references/git-publish.md).
