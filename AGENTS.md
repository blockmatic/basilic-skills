# AGENTS.md

This repository is an [Agent Skills](https://agentskills.io) catalog. Each skill is `skills/workflow/w-<name>/SKILL.md`. Frontmatter `name` equals the folder. Playbooks set `disable-model-invocation: true`. One outcome per skill. Numbered steps.

Explore and review playbooks spawn 2–3 read-only explorers via [w-council](skills/workflow/w-council/SKILL.md). Git, TDD, lint, generate, and publish stay single-writer. Explorers return file:line evidence in one wave. New branches: `git fetch origin` then `git switch -c <name> --no-track origin/main` — never a stale local `main`.

Install: `npx skills@latest add blockmatic/basilic-skills --all` or `--skill w-plan`. Validate: `node scripts/validate-catalog.mjs`. Index: [README.md](README.md).
