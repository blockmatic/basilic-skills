# Basilic Skills

[![skills.sh](https://skills.sh/b/blockmatic/basilic-skills)](https://skills.sh/blockmatic/basilic-skills)

Basilic-maintained [Agent Skills](https://agentskills.io) catalog. Install with the [skills CLI](https://github.com/vercel-labs/skills) — same flow as other skills.sh catalogs.

## Install

Use your package manager (flags are identical):

| npm | pnpm | bun |
| --- | --- | --- |
| `npx skills@latest` | `pnpm dlx skills@latest` | `bunx skills@latest` |

**Interactive** — pick skills, then pick agents (Cursor, Claude Code, Codex, and others the CLI detects). Run in a normal terminal; inside Cursor the CLI may auto-target Cursor only.

```bash
npx skills@latest add blockmatic/basilic-skills
```

**List without installing:**

```bash
npx skills@latest add blockmatic/basilic-skills --list
```

From a local clone: `npx skills@latest add . --list`

## Flags

| Intent | Example |
| --- | --- |
| One skill | `--skill next-v16` |
| Several skills | `--skill next-v16 --skill fastify-v5` |
| All skills | `--skill '*'` |
| Cursor only | `-a cursor` |
| Cursor + Claude Code | `-a cursor -a claude-code` |
| All detected agents | `--agent '*'` |
| User-wide (not project) | `-g` |
| Copy files (no symlinks) | `--copy` |
| Skip prompts | `-y` |

Examples:

```bash
npx skills@latest add blockmatic/basilic-skills --skill next-v16 -a cursor
npx skills@latest add blockmatic/basilic-skills --skill '*' -a cursor -a claude-code -y
```

Do not use `--all` unless you want every skill on every agent.

## Agents and paths

The CLI has no free-form `--dir`. Scope and agent flags choose the destination:

| Target | Project path | Global (`-g`) |
| --- | --- | --- |
| Canonical (symlink hub) | `.agents/skills/<name>/` | `~/.agents/skills/<name>/` |
| Cursor | `.cursor/skills/<name>/` | `~/.cursor/skills/<name>/` |
| Claude Code | `.claude/skills/<name>/` | `~/.claude/skills/<name>/` |
| Codex | `.codex/skills/<name>/` | `~/.codex/skills/<name>/` |

Other agents (`opencode`, `windsurf`, …) get their own paths — see [supported agents](https://github.com/vercel-labs/skills#supported-agents). Some agents support env overrides (`CLAUDE_CONFIG_DIR`, `CODEX_HOME`).

Default install method is **symlink** (canonical copy in `.agents/skills/`). Use `--copy` when symlinks are not supported.

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

Distribution is GitHub only. Do not publish this catalog to npm — `package.json` is intentionally `private`.

## Contribute

Edit this repository. Consumers update with:

```bash
npx skills@latest update
pnpm dlx skills@latest update
```

Do not rename a skill after install; lockfile keys follow skill names. Commit `skills-lock.json` in consuming projects when you vendor skills.
