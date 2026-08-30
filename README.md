# Basilic Skills

[![skills.sh](https://skills.sh/b/blockmatic/basilic-skills)](https://skills.sh/blockmatic/basilic-skills)

Basilic-maintained [Agent Skills](https://agentskills.io) catalog. Copies here are the canonical versions for Basilic forks; they may differ from Expo, Vercel, or Anthropic upstream.

## Install

Use the skills CLI via your package manager (same flags for all):

| npm | pnpm | bun |
| --- | --- | --- |
| `npx skills@latest` | `pnpm dlx skills@latest` | `bunx skills@latest` |

```bash
npx skills@latest add blockmatic/basilic-skills
pnpm dlx skills@latest add blockmatic/basilic-skills
bunx skills@latest add blockmatic/basilic-skills
```

The CLI lists skills and lets you pick a subset.

## List

```bash
npx skills@latest add blockmatic/basilic-skills --list
pnpm dlx skills@latest add blockmatic/basilic-skills --list
bunx skills@latest add blockmatic/basilic-skills --list
```

From a clone:

```bash
npx skills@latest add . --list
pnpm dlx skills@latest add . --list
bunx skills@latest add . --list
```

## One skill

```bash
npx skills@latest add blockmatic/basilic-skills --skill next-v16
pnpm dlx skills@latest add blockmatic/basilic-skills --skill next-v16
bunx skills@latest add blockmatic/basilic-skills --skill next-v16
```

## Several skills

```bash
npx skills@latest add blockmatic/basilic-skills --skill next-v16 --skill fastify-v5
pnpm dlx skills@latest add blockmatic/basilic-skills --skill next-v16 --skill fastify-v5
bunx skills@latest add blockmatic/basilic-skills --skill next-v16 --skill fastify-v5
```

## All skills

```bash
npx skills@latest add blockmatic/basilic-skills --skill '*' -a cursor
pnpm dlx skills@latest add blockmatic/basilic-skills --skill '*' -a cursor
bunx skills@latest add blockmatic/basilic-skills --skill '*' -a cursor
```

`--skill '*'` installs every skill and still asks which agent. Do not use `--all` unless you want every skill on every agent.

## Repository structure

```text
skills/<name>/SKILL.md           # tech skills (library major in the folder name)
skills/workflow/<playbook>/      # independently installable slash playbooks
```

There is no `SKILL.md` at `skills/workflow/` (that would hide nested playbooks).

## Canonical copies

These trees are Basilic-maintained. Folder names use the stack major already in Basilic (`typescript-v6`, `ai-sdk-core-v7`, `motion-v13`). Do not treat `npx skills add expo/skills` as a dependency of this catalog.

## License

This repository is MIT. Some skill trees keep upstream notices. `skills/frontend-design-v1/LICENSE.txt` is Apache License 2.0.

Distribution is GitHub only (`npx skills add blockmatic/basilic-skills`). Do not publish this catalog to npm — `package.json` is intentionally `private`.

## Contribute

Edit this repository. Consumers run `npx skills update` (or `pnpm dlx skills@latest update` / `bunx skills@latest update`). Do not rename a skill after install; lockfile keys follow skill names.

Basilic commits vendored copies under `.cursor/skills/` so Cloud Agents get real files. Refresh with `npx skills@latest add blockmatic/basilic-skills --copy` (or pnpm/bun equivalents above) and copy trees into the nested layout (see Basilic `cursor-skills` doc).
