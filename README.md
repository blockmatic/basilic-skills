# Basilic workflow skills

[![skills.sh](https://skills.sh/b/blockmatic/basilic-skills)](https://skills.sh/blockmatic/basilic-skills)

Slash **playbooks** for coding agents ([Agent Skills](https://agentskills.io)). They are workflows: plan, implement, review, git, CI, docs, UI. Invoke them as `/w-plan`, `/w-build`, `/w-ship`, and the rest. `/workflow` lists this catalog and stops.

Stack (tech/pattern) skills are **not** in this repo. Basilic commits those in the product tree and can also install [mattpocock/skills](https://github.com/mattpocock/skills) (unprefixed names such as `/grill-me` and `/tdd`). This catalog stays `/w-*` so the two packs do not collide.

Bodies live in each `SKILL.md`. Read those files; this page is only an index.

## Install

```bash
npx skills@latest add blockmatic/basilic-skills --skill workflow -a cursor --copy -y
```

Interactive pick: `npx skills@latest add blockmatic/basilic-skills`. List: add `--list`. The CLI copies the parent `workflow` skill to `.agents/skills/workflow/`. Nested playbooks are not separate `--skill` targets.

[skills CLI flags](https://github.com/vercel-labs/skills). Cursor project path: `.agents/skills/workflow/`.

## Playbooks

Parent: [`/workflow`](skills/workflow/SKILL.md)

### Lifecycle

- [`/w-plan`](skills/workflow/w-plan/SKILL.md)
- [`/w-build`](skills/workflow/w-build/SKILL.md)
- [`/w-retro`](skills/workflow/w-retro/SKILL.md)

### Git

- [`/w-commit`](skills/workflow/git/w-commit/SKILL.md)
- [`/w-push`](skills/workflow/git/w-push/SKILL.md)
- [`/w-pr`](skills/workflow/git/w-pr/SKILL.md)
- [`/w-comments`](skills/workflow/git/w-comments/SKILL.md)
- [`/w-git-repair`](skills/workflow/git/w-git-repair/SKILL.md)
- [`/w-fix-push`](skills/workflow/git/w-fix-push/SKILL.md)
- [`/w-ship`](skills/workflow/git/w-ship/SKILL.md)

### Debug

- [`/w-debug`](skills/workflow/w-debug/SKILL.md)
- [`/w-debug-browser`](skills/workflow/w-debug-browser/SKILL.md)

### CI

- [`/w-gha`](skills/workflow/ci/w-gha/SKILL.md)
- [`/w-vercel`](skills/workflow/ci/w-vercel/SKILL.md)

### Quality

- [`/w-lint`](skills/workflow/qa/w-lint/SKILL.md)
- [`/w-yolo`](skills/workflow/qa/w-yolo/SKILL.md)
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
- [`/w-council`](skills/workflow/w-council/SKILL.md)
- [`/w-roadmap`](skills/workflow/product/w-roadmap/SKILL.md)
- [`/w-architecture`](skills/workflow/product/w-architecture/SKILL.md)
- [`/w-docs`](skills/workflow/doc/w-docs/SKILL.md)
- [`/w-api-docs`](skills/workflow/doc/w-api-docs/SKILL.md)
- [`/w-onboard`](skills/workflow/doc/w-onboard/SKILL.md)
- [`/w-diagram`](skills/workflow/doc/w-diagram/SKILL.md)

### UI and craft

- [`/w-ui`](skills/workflow/w-ui/SKILL.md)
- [`/w-shadcn`](skills/workflow/w-shadcn/SKILL.md)
- [`/w-v0`](skills/workflow/w-v0/SKILL.md)
- [`/w-form`](skills/workflow/w-form/SKILL.md)
- [`/w-a11y`](skills/workflow/w-a11y/SKILL.md)
- [`/w-perf`](skills/workflow/w-perf/SKILL.md)
- [`/w-refactor`](skills/workflow/w-refactor/SKILL.md)
- [`/w-errors`](skills/workflow/w-errors/SKILL.md)

Authoring for this catalog: [`references/authoring.md`](skills/workflow/references/authoring.md).

## Contribute

Edit `skills/workflow/`. Run `pnpm validate` before pushing. Consumers refresh with `npx skills@latest update`. MIT. Private `package.json` — GitHub only, not npm.
