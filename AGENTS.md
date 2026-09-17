# AGENTS.md

Basilic-maintained Agent Skills catalog. Skills are packaged instructions that extend coding agents.

## Layout

```
skills/
  {skill-name}/          # kebab-case; name in SKILL.md must equal this folder
    SKILL.md
    scripts/             # optional
    references/          # optional; load on demand
  workflow/
    SKILL.md             # required parent — CLI copies this tree as one skill
    {playbook}/          # everyday leaf; slash /<name>
      SKILL.md
    {group}/             # grouping folder; no SKILL.md
      {playbook}/        # slash is the leaf name
        SKILL.md
```

`skills/workflow/SKILL.md` is required. The skills CLI does not preserve category parents; it copies the folder that contains `SKILL.md`. The parent makes dest `.agents/skills/workflow/`. Nested playbooks are not independently installable (`--skill plan` will not match). Cursor walks the tree recursively; `/<name>` is the leaf folder.

## Naming

- Library/SDK skills: `<topic>-v<major>` (the package or framework major, e.g. `next-v16`, `motion-v13`, Expo `*-v55`)
- Pattern, guideline, and craft skills: unversioned kebab-case (`composition-patterns`, `better-ui`, `emil-design-eng`)
- Playbooks: unversioned leaf folders under `workflow/` (`plan`, `git/commit`)
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

Install playbooks with `--skill workflow`. Nested children are not independent CLI targets.

Canonical copies land in `.agents/skills/`; agent flags (`-a cursor`, `-a claude-code`, …) write to each agent's skills directory. See README for full flag reference.

For workflow changes, edit this catalog (`skills/workflow/`), then refresh consumers with the skills CLI. Installed copies under a product repo's `.agents/skills/workflow/` are not the source of truth. The parent catalog and references ship as one installable `workflow` skill. Nested playbooks are invoked as `/<leaf>` (`/plan`, `/commit`). `/workflow` lists the catalog and stops. Do not retain a leftover `b` tree after migration.
