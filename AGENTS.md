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
    {playbook}/          # independently installable slash playbooks
      SKILL.md
```

Do not add `skills/workflow/SKILL.md`. A shallower `SKILL.md` shadows nested playbooks.

## Naming

- Tech skills: `<topic>-v<major>` (library/SDK major, e.g. `next-v16`, `motion-v13`)
- Playbooks: unversioned folder names (`plan-feature`, `exec-push`)
- Do not invent majors. Do not keep `foo/` next to `foo-vN/`
- `name` is lowercase letters, digits, hyphens; max 64; equals the folder that contains `SKILL.md`

## Authoring

- Keep `SKILL.md` under 500 lines. Put depth in `references/`
- Required frontmatter: `name`, `description` (max 1024)
- Playbooks: `disable-model-invocation: true`; one-line `description`
- No install-time dependencies between skills. Cross-links are optional hints
- Do not reformat vendored skill bodies to match this repo's linter; `skills/` is ignored

## Install

```bash
npx skills@latest add blockmatic/basilic-skills --list
npx skills@latest add blockmatic/basilic-skills --skill next-v16
```
