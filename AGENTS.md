# AGENTS.md

Basilic-maintained Agent Skills catalog. Skills are packaged instructions that extend coding agents.

## Layout

```
skills/
  {skill-name}/          # kebab-case; name in SKILL.md must equal this folder
    SKILL.md
    scripts/             # optional
    references/          # optional; load on demand
  b/
    SKILL.md             # required parent — CLI copies this tree as one skill
    b-{playbook}/
      SKILL.md
```

`skills/b/SKILL.md` is required. The skills CLI does not preserve category parents; it copies the folder that contains `SKILL.md`. The parent makes dest `.agents/skills/b/b-<playbook>/`. Nested playbooks are not independently installable (`--skill b-git-push` will not match).

## Naming

- Tech skills: `<topic>-v<major>` (library/SDK major, e.g. `next-v16`, `motion-v13`)
- Playbooks: unversioned folder names (`b-plan-feature`, `b-exec-push`)
- Do not invent majors. Do not keep `foo/` next to `foo-vN/`
- `name` is lowercase letters, digits, hyphens; max 64; equals the folder that contains `SKILL.md`

## Authoring

- Keep `SKILL.md` under 500 lines. Put depth in `references/`
- Required frontmatter: `name`, `description` (max 1024, single line — no `description: |`)
- Playbooks: `disable-model-invocation: true`; one-line `description`
- Cross-link other skills with catalog-relative paths (`../fastify-v5/SKILL.md`), not `@cursor/skills/...`
- Run `pnpm validate` before push — checks all SKILL.md files and `skills.sh.json` sync
- No install-time dependencies between skills. Cross-links are optional hints
- Do not reformat vendored skill bodies to match this repo's linter; `skills/` is ignored

## Install

Use the [skills CLI](https://github.com/vercel-labs/skills). Interactive install picks skills and agents (Cursor included):

```bash
npx skills@latest add blockmatic/basilic-skills
npx skills@latest add blockmatic/basilic-skills --list
npx skills@latest add blockmatic/basilic-skills --skill next-v16 -a cursor
```

Until `b` is published, install playbooks from a local clone (`--skill b`). GitHub `main` still exposes `workflow`.

Canonical copies land in `.agents/skills/`; agent flags (`-a cursor`, `-a claude-code`, …) write to each agent's skills directory. See README for full flag reference.

For workflow changes, read `skills/b/references/authoring.md`. The dispatcher and references ship as one installable `b` skill. Do not retain a second workflow tree after migration.
