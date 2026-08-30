# Basilic Skills

[![skills.sh](https://skills.sh/b/blockmatic/basilic-skills)](https://skills.sh/blockmatic/basilic-skills)

Basilic-maintained [Agent Skills](https://agentskills.io) catalog. Copies here are the canonical versions for Basilic forks; they may differ from Expo, Vercel, or Anthropic upstream.

## Install

```bash
npx skills@latest add blockmatic/basilic-skills
```

The CLI lists skills and lets you pick a subset.

## List

```bash
npx skills@latest add blockmatic/basilic-skills --list
```

From a clone:

```bash
npx skills@latest add . --list
```

## One skill

```bash
npx skills@latest add blockmatic/basilic-skills --skill next-v16
```

## Several skills

```bash
npx skills@latest add blockmatic/basilic-skills --skill next-v16 --skill fastify-v5
```

## All skills

```bash
npx skills@latest add blockmatic/basilic-skills --skill '*' -a cursor
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

## Contribute

Edit this repository. Consumers run `npx skills update`. Do not rename a skill after install; lockfile keys follow skill names.

Basilic commits vendored copies under `.cursor/skills/` so Cloud Agents get real files. Refresh with `npx skills add blockmatic/basilic-skills --copy` and copy trees into the nested layout (see Basilic `cursor-skills` doc).
