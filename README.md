# Basilic Skills

[![skills.sh](https://skills.sh/b/blockmatic/basilic-skills)](https://skills.sh/blockmatic/basilic-skills)

Basilic slash playbooks as [Agent Skills](https://agentskills.io). Stack (tech/pattern) skills live in the Basilic repo, not this catalog. Pair this pack with [mattpocock/skills](https://github.com/mattpocock/skills) in Basilic: this catalog is `/w-*`; Matt’s pack is unprefixed (`/grill-me`, `/tdd`, `/implement`).

Install with the [skills CLI](https://github.com/vercel-labs/skills).

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
| Playbooks | `--skill workflow` |
| All skills (this catalog is only `workflow`) | `--skill '*'` |
| Cursor only | `-a cursor` |
| Cursor + Claude Code | `-a cursor -a claude-code` |
| All detected agents | `--agent '*'` |
| User-wide (not project) | `-g` |
| Copy files (no symlinks) | `--copy` |
| Skip prompts | `-y` |

Examples:

```bash
npx skills@latest add blockmatic/basilic-skills --skill workflow -a cursor --copy -y
npx skills@latest add /path/to/basilic-skills --skill workflow -a cursor -y
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

```bash
npx skills@latest add blockmatic/basilic-skills --skill workflow -a cursor --copy -y
```

Other agents (`opencode`, `windsurf`, …): [supported agents](https://github.com/vercel-labs/skills#supported-agents). Env overrides: `CLAUDE_CONFIG_DIR`, `CODEX_HOME`.

## Repository structure

```text
skills/workflow/SKILL.md                          # required parent — installs as one skill named workflow
skills/workflow/w-<playbook>/SKILL.md             # everyday slash playbooks (`/w-plan`)
skills/workflow/<group>/w-<playbook>/SKILL.md     # grouped specialists; slash is the leaf name
```

The parent `SKILL.md` is required so the CLI copies the whole tree to `.agents/skills/workflow/`. Cursor walks that tree recursively; `/w-<name>` is the leaf folder (`/w-plan`, `/w-commit`). `/workflow` lists the catalog and stops. Claude Code: read `.agents/skills/workflow/` (or `.claude/skills/workflow/` if that agent flag is used).

## License

This repository is MIT.

Distribution is GitHub only. Do not publish this catalog to npm — `package.json` is intentionally `private`.

## Contribute

Edit this repository. Consumers update with:

```bash
npx skills@latest update
pnpm dlx skills@latest update
```

Do not rename a skill after install; lockfile keys follow skill names. A catalog rename is a breaking consumer key change — re-add the skill under the new name and commit `skills-lock.json`.

## Basilic playbooks

This repository is the source of truth for `/w-plan`, `/w-build`, `/w-review`, `/w-test`, `/w-pr`, and the rest of the `workflow` tree. Consumers install with `--skill workflow`; do not treat a vendored `.agents/skills/workflow/` copy as canonical.

Invoke playbooks with `/w-<leaf>`. `/workflow` lists the catalog and stops; it does not dispatch `/workflow plan`. `/w-tdd` is opt-in. See [adoption and migration](docs/workflow-adoption.md) for structure and checklists.
