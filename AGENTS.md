# AGENTS.md

This repository is a **workflow playbook** catalog for coding agents. Each leaf under `skills/workflow/` is a slash skill (`/w-plan`, `/w-build`, …). Tech and pattern skills are not here.

Layout: `skills/workflow/SKILL.md` is the parent (install name `workflow`). Everyday leaves are `w-<name>/`; grouped leaves are `<group>/w-<name>/`. Frontmatter `name` equals the leaf folder. Playbooks set `disable-model-invocation: true`. Run `pnpm validate` before push.

Humans: playbook index and install are in [README.md](README.md). Authoring: [skills/workflow/references/authoring.md](skills/workflow/references/authoring.md).
