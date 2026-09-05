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

Validate the catalog before pushing (frontmatter, cross-links, `skills.sh.json` sync):

```bash
pnpm validate
```

## Flags

| Intent | Example |
| --- | --- |
| One skill | `--skill next-v16` (GitHub) or `--skill b` (local clone until published) |
| Several skills | `--skill next-v16 --skill fastify-v5` |
| All skills | `--skill '*'` |
| Cursor only | `-a cursor` |
| Cursor + Claude Code | `-a cursor -a claude-code` |
| All detected agents | `--agent '*'` |
| User-wide (not project) | `-g` |
| Copy files (no symlinks) | `--copy` |
| Skip prompts | `-y` |

Examples (tech skills from GitHub; **`b` is unpublished** — GitHub `main` still ships `workflow`):

```bash
npx skills@latest add blockmatic/basilic-skills --skill next-v16 -a cursor
npx skills@latest add /path/to/basilic-skills --skill b -a cursor -y
npx skills@latest add blockmatic/basilic-skills --skill '*' -a cursor -a claude-code -y
```

Do not use `--all` unless you want every skill on every agent.

## Agents and paths

The CLI has no free-form `--dir`. Scope and agent flags choose the destination. With `-a cursor`, the **project** install path is `.agents/skills/<name>/` (not `.cursor/skills/`). Cursor also reads `.cursor/skills/` if you place files there manually; this catalog relies on the CLI layout.

| Agent | Project path (`-a <agent>`) | Global (`-g`) |
| --- | --- | --- |
| Cursor | `.agents/skills/<name>/` | `~/.cursor/skills/<name>/` |
| Claude Code | `.claude/skills/<name>/` | `~/.claude/skills/<name>/` |
| Codex | `.agents/skills/<name>/` | `~/.codex/skills/<name>/` |
| Canonical hub (symlink default) | `.agents/skills/<name>/` | `~/.agents/skills/<name>/` |

With **symlink** (default), the CLI stores files under `.agents/skills/` and links agent-specific dirs when applicable. With **`--copy`**, it writes independent copies into `.agents/skills/` (and into each `-a` agent dir when that agent uses a separate path).

Examples:

```bash
# Cursor, one skill — lands in .agents/skills/next-v16/
npx skills@latest add blockmatic/basilic-skills --skill next-v16 -a cursor -y

# Cursor, playbooks — local preview until `b` is on GitHub main
npx skills@latest add /path/to/basilic-skills --skill b -a cursor -y

# Cursor, all skills, copies (CI-friendly)
npx skills@latest add blockmatic/basilic-skills --skill '*' -a cursor --copy -y
```

Other agents (`opencode`, `windsurf`, …): [supported agents](https://github.com/vercel-labs/skills#supported-agents). Env overrides: `CLAUDE_CONFIG_DIR`, `CODEX_HOME`.

## Repository structure

```text
skills/<name>/SKILL.md                 # tech skills (library major in the folder name)
skills/b/SKILL.md               # required parent — installs as one skill named b
skills/b/b-<playbook>/SKILL.md    # nested slash playbooks (not independently installable)
```

The parent `SKILL.md` is required so the CLI copies the whole tree to `.agents/skills/b/`. Cursor still loads nested playbooks as `/b-<playbook>`. Claude Code: read `.agents/skills/b/b-<playbook>/SKILL.md`.

## Canonical copies

These trees are Basilic-maintained. Folder names use the stack major already in Basilic (`typescript-v6`, `ai-sdk-core-v7`, `motion-v13`). Do not treat `npx skills add expo/skills` as a dependency of this catalog.

Vendored from upstream (renamed and overlaid in this repo):

- `nuqs-v2` ← `nuqs` in [pproenca/dot-skills](https://github.com/pproenca/dot-skills)
- `vitest-v4` ← `vitest` in [pproenca/dot-skills](https://github.com/pproenca/dot-skills)
- `viem-v2` ← `viem-integration` in [uniswap/uniswap-ai](https://github.com/uniswap/uniswap-ai)
- `nodejs-keccak256-v1` ← `nodejs-keccak256` in [affaan-m/ecc](https://github.com/affaan-m/ecc)
- `next-v16` ← `nextjs` in [pproenca/dot-skills](https://github.com/pproenca/dot-skills)
- `frontend-design-v1` ← [anthropics/skills](https://github.com/anthropics/skills) `frontend-design`
- `emilkowal-animations-v1` ← pproenca/dot-skills `emilkowal-animations`
- `vercel-react-v1` ← `react-best-practices` in [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills)

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

## Basilic workflows

Use `/b` for the catalog, `/b plan`, `/b build`, `/b review`, or a full `/b-<playbook>` name. FIRST `/f-*` remains separate. See [adoption and migration](docs/workflow-adoption.md) for structure, checklists, and the move from `workflow` to `b`.
