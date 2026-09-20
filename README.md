# Basilic skills

[![skills.sh](https://skills.sh/b/blockmatic/basilic-skills)](https://skills.sh/blockmatic/basilic-skills)

Slash playbooks for coding agents ([Agent Skills](https://agentskills.io)). They work in any IDE or agent that can read a `SKILL.md`. Invoke them as `/w-plan`, `/w-build`, `/w-ship`, and the rest.

`/w-plan` explores via `/w-council` first. Git, TDD, lint, generate, and publish stay single-writer.

This page is an index. Read each `SKILL.md` for the body.

## Install

```bash
npx skills@latest add blockmatic/basilic-skills --skill w-plan
npx skills@latest add blockmatic/basilic-skills --all
```

Interactive pick: `npx skills@latest add blockmatic/basilic-skills`. List: add `--list`.

[skills CLI](https://github.com/vercel-labs/skills).

## Playbooks

### Lifecycle

- [`/w-plan`](skills/w-plan/SKILL.md)
- [`/w-council`](skills/w-council/SKILL.md)
- [`/w-build`](skills/w-build/SKILL.md)
- [`/w-retro`](skills/w-retro/SKILL.md)

### Git

- [`/w-commit`](skills/w-commit/SKILL.md)
- [`/w-push`](skills/w-push/SKILL.md)
- [`/w-pr`](skills/w-pr/SKILL.md)
- [`/w-comments`](skills/w-comments/SKILL.md)
- [`/w-git-repair`](skills/w-git-repair/SKILL.md)
- [`/w-fix-push`](skills/w-fix-push/SKILL.md)
- [`/w-ship`](skills/w-ship/SKILL.md)

### Debug

- [`/w-debug`](skills/w-debug/SKILL.md)
- [`/w-debug-browser`](skills/w-debug-browser/SKILL.md)

### CI

- [`/w-gha`](skills/w-gha/SKILL.md)
- [`/w-vercel`](skills/w-vercel/SKILL.md)

### Quality

- [`/w-lint`](skills/w-lint/SKILL.md)
- [`/w-yolo`](skills/w-yolo/SKILL.md)
- [`/w-test`](skills/w-test/SKILL.md)
- [`/w-tdd`](skills/w-tdd/SKILL.md)
- [`/w-unit`](skills/w-unit/SKILL.md)
- [`/w-api-test`](skills/w-api-test/SKILL.md)

### Review and security

- [`/w-review`](skills/w-review/SKILL.md)
- [`/w-review-plan`](skills/w-review-plan/SKILL.md)
- [`/w-security`](skills/w-security/SKILL.md)
- [`/w-release`](skills/w-release/SKILL.md)
- [`/w-coderabbit`](skills/w-coderabbit/SKILL.md)
- [`/w-deslop`](skills/w-deslop/SKILL.md)

### Product and docs

- [`/w-clarify`](skills/w-clarify/SKILL.md)
- [`/w-roadmap`](skills/w-roadmap/SKILL.md)
- [`/w-architecture`](skills/w-architecture/SKILL.md)
- [`/w-docs`](skills/w-docs/SKILL.md)
- [`/w-api-docs`](skills/w-api-docs/SKILL.md)
- [`/w-onboard`](skills/w-onboard/SKILL.md)
- [`/w-diagram`](skills/w-diagram/SKILL.md)

### UI and craft

- [`/w-ui`](skills/w-ui/SKILL.md)
- [`/w-shadcn`](skills/w-shadcn/SKILL.md)
- [`/w-v0`](skills/w-v0/SKILL.md)
- [`/w-form`](skills/w-form/SKILL.md)
- [`/w-a11y`](skills/w-a11y/SKILL.md)
- [`/w-perf`](skills/w-perf/SKILL.md)
- [`/w-refactor`](skills/w-refactor/SKILL.md)
- [`/w-errors`](skills/w-errors/SKILL.md)

## Contribute

Add `skills/w-<name>/SKILL.md`. Frontmatter `name` matches the folder, starts with `w-`, and sets `disable-model-invocation: true`. One-line `description`. Numbered steps. Git playbooks carry their own `references/git-publish.md` copy. `/w-plan` ships `references/plan-output.md`. Run `node scripts/validate-catalog.mjs` before pushing. Consumers refresh with `npx skills@latest update`. MIT.
