# AGENTS.md

Basilic slash-playbook catalog. Skills are packaged instructions that extend coding agents. Tech and pattern skills are not in this repo.

## Layout

```
skills/
  workflow/
    SKILL.md             # required parent — CLI copies this tree as one skill
    w-{playbook}/        # everyday leaf; slash /w-<name>
      SKILL.md
    {group}/             # grouping folder; no SKILL.md
      w-{playbook}/      # slash is the leaf name
        SKILL.md
```

`skills/workflow/SKILL.md` is required. The skills CLI does not preserve category parents; it copies the folder that contains `SKILL.md`. The parent makes dest `.agents/skills/workflow/`. Nested playbooks are not independently installable (`--skill w-plan` will not match). Cursor walks the tree recursively; `/w-<name>` is the leaf folder.

## Naming

- Playbooks: `w-` prefix on the leaf folder and frontmatter `name` (`w-plan`, `git/w-commit`)
- `name` is lowercase letters, digits, hyphens; max 64; equals the folder that contains `SKILL.md`

## Authoring

- Keep `SKILL.md` under 500 lines. Put depth in `references/`
- Required frontmatter: `name`, `description` (max 1024, single line — no `description: |`)
- Playbooks: `disable-model-invocation: true`; one-line `description`
- Cross-link with catalog-relative paths, not `@cursor/skills/...`
- Run `pnpm validate` before push — checks all SKILL.md files and `skills.sh.json` sync
- No install-time dependencies between skills. Cross-links are optional hints
- Do not reformat skill bodies to match this repo's linter; `skills/` is ignored

## Install

Use the [skills CLI](https://github.com/vercel-labs/skills):

```bash
npx skills@latest add blockmatic/basilic-skills
npx skills@latest add blockmatic/basilic-skills --list
npx skills@latest add blockmatic/basilic-skills --skill workflow -a cursor --copy -y
```

Install playbooks with `--skill workflow`. Nested children are not independent CLI targets.

Canonical copies land in `.agents/skills/`; agent flags (`-a cursor`, `-a claude-code`, …) write to each agent's skills directory. See README for full flag reference.

For workflow changes, edit this catalog (`skills/workflow/`), then refresh consumers with the skills CLI. Installed copies under a product repo's `.agents/skills/workflow/` are not the source of truth. Nested playbooks are invoked as `/w-<leaf>` (`/w-plan`, `/w-commit`). `/workflow` lists the catalog and stops. Do not retain a leftover `b` tree after migration.
