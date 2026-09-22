# Basilic skills

[![skills.sh](https://skills.sh/b/blockmatic/basilic-skills)](https://skills.sh/blockmatic/basilic-skills)

Slash playbooks for coding agents ([Agent Skills](https://agentskills.io)). They work in any IDE or agent that can read a `SKILL.md`. Invoke them as `/w-plan`, `/w-build`, `/w-ship`, and the rest.

`/w-plan` explores via `/w-council` first. Git, TDD, lint, generate, and publish stay single-writer. `/w-clarify` is blocking gaps; `/w-grill` is a design-tree interview; `/w-wayfinder` is fog bigger than one session.

This page is an index. Read each `SKILL.md` for the body.

## Install

```bash
npx skills@latest add blockmatic/basilic-skills --skill workflow
npx skills@latest add blockmatic/basilic-skills --all
```

Installs one pack at `.agents/skills/workflow/` with nested `/w-*` playbooks (`.agents/skills/workflow/w-plan`, …). Invoke `/w-plan` as before.

Interactive pick: `npx skills@latest add blockmatic/basilic-skills`. List: add `--list`.

[skills CLI](https://github.com/vercel-labs/skills).

## Playbooks

### Lifecycle

- [`/w-plan`](skills/workflow/w-plan/SKILL.md)
- [`/w-council`](skills/workflow/w-council/SKILL.md)
- [`/w-grill`](skills/workflow/w-grill/SKILL.md)
- [`/w-wayfinder`](skills/workflow/w-wayfinder/SKILL.md)
- [`/w-build`](skills/workflow/w-build/SKILL.md)
- [`/w-retro`](skills/workflow/w-retro/SKILL.md)

### Git

- [`/w-commit`](skills/workflow/w-commit/SKILL.md)
- [`/w-push`](skills/workflow/w-push/SKILL.md)
- [`/w-pr`](skills/workflow/w-pr/SKILL.md)
- [`/w-comments`](skills/workflow/w-comments/SKILL.md)
- [`/w-git-repair`](skills/workflow/w-git-repair/SKILL.md)
- [`/w-fix-push`](skills/workflow/w-fix-push/SKILL.md)
- [`/w-ship`](skills/workflow/w-ship/SKILL.md)

### Debug

- [`/w-debug`](skills/workflow/w-debug/SKILL.md)
- [`/w-debug-browser`](skills/workflow/w-debug-browser/SKILL.md)

### CI

- [`/w-gha`](skills/workflow/w-gha/SKILL.md)
- [`/w-vercel`](skills/workflow/w-vercel/SKILL.md)

### Quality

- [`/w-lint`](skills/workflow/w-lint/SKILL.md)
- [`/w-yolo`](skills/workflow/w-yolo/SKILL.md)
- [`/w-test`](skills/workflow/w-test/SKILL.md)
- [`/w-tdd`](skills/workflow/w-tdd/SKILL.md)
- [`/w-unit`](skills/workflow/w-unit/SKILL.md)
- [`/w-api-test`](skills/workflow/w-api-test/SKILL.md)

### Review and security

- [`/w-review`](skills/workflow/w-review/SKILL.md)
- [`/w-review-plan`](skills/workflow/w-review-plan/SKILL.md)
- [`/w-security`](skills/workflow/w-security/SKILL.md)
- [`/w-release`](skills/workflow/w-release/SKILL.md)
- [`/w-coderabbit`](skills/workflow/w-coderabbit/SKILL.md)
- [`/w-deslop`](skills/workflow/w-deslop/SKILL.md)

### Product and docs

- [`/w-clarify`](skills/workflow/w-clarify/SKILL.md)
- [`/w-roadmap`](skills/workflow/w-roadmap/SKILL.md)
- [`/w-architecture`](skills/workflow/w-architecture/SKILL.md)
- [`/w-docs`](skills/workflow/w-docs/SKILL.md)
- [`/w-api-docs`](skills/workflow/w-api-docs/SKILL.md)
- [`/w-onboard`](skills/workflow/w-onboard/SKILL.md)
- [`/w-diagram`](skills/workflow/w-diagram/SKILL.md)

### UI and craft

- [`/w-ui`](skills/workflow/w-ui/SKILL.md)
- [`/w-shadcn`](skills/workflow/w-shadcn/SKILL.md)
- [`/w-v0`](skills/workflow/w-v0/SKILL.md)
- [`/w-form`](skills/workflow/w-form/SKILL.md)
- [`/w-a11y`](skills/workflow/w-a11y/SKILL.md)
- [`/w-perf`](skills/workflow/w-perf/SKILL.md)
- [`/w-refactor`](skills/workflow/w-refactor/SKILL.md)
- [`/w-errors`](skills/workflow/w-errors/SKILL.md)

## Contribute

Keep the pack at `skills/workflow/SKILL.md`. Add `skills/workflow/w-<name>/SKILL.md` under it. Frontmatter `name` matches the folder, starts with `w-`, and sets `disable-model-invocation: true`. One-line `description`. Numbered steps. Git playbooks carry their own `references/git-publish.md` copy. `/w-plan` ships `references/plan-output.md`. Run `node scripts/validate-catalog.mjs` before pushing. Consumers refresh with `npx skills@latest update`. MIT.
