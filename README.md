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
| One skill | `--skill next-v16` or `--skill workflow` |
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
npx skills@latest add /path/to/basilic-skills --skill workflow -a cursor -y
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

# Cursor, playbooks
npx skills@latest add /path/to/basilic-skills --skill workflow -a cursor -y

# Cursor, all skills, copies (CI-friendly)
npx skills@latest add blockmatic/basilic-skills --skill '*' -a cursor --copy -y
```

Basilic consumers pin **only** this catalog in `skills-lock.json`. Extra upstream skills (for example `react-email`) belong in this repo, not as a second lock source. `pnpm setup:skills` in Basilic runs that `add --skill '*'` once and restores the lockfile so hashes stay pinned.

Other agents (`opencode`, `windsurf`, …): [supported agents](https://github.com/vercel-labs/skills#supported-agents). Env overrides: `CLAUDE_CONFIG_DIR`, `CODEX_HOME`.

## Repository structure

```text
skills/<name>/SKILL.md                            # library skills use -v<major>; craft/pattern skills do not
skills/workflow/SKILL.md                          # required parent — installs as one skill named workflow
skills/workflow/<playbook>/SKILL.md               # everyday slash playbooks
skills/workflow/<group>/<playbook>/SKILL.md       # grouped specialists; slash is the leaf name
```

The parent `SKILL.md` is required so the CLI copies the whole tree to `.agents/skills/workflow/`. Cursor walks that tree recursively; `/<name>` is the leaf folder (`/plan`, `/commit`). `/workflow` lists the catalog and stops. Claude Code: read `.agents/skills/workflow/` (or `.claude/skills/workflow/` if that agent flag is used).

## Canonical copies

These trees are Basilic-maintained. Library/SDK folders use the stack major already in Basilic (`typescript-v6`, `ai-sdk-core-v7`, `motion-v13`). Pattern, guideline, and craft skills stay unversioned. Do not treat `npx skills add expo/skills` as a dependency of this catalog.

Vendored from upstream (renamed and overlaid in this repo):

- `nuqs-v2` ← `nuqs` in [pproenca/dot-skills](https://github.com/pproenca/dot-skills)
- `vitest-v5` ← `vitest` in [pproenca/dot-skills](https://github.com/pproenca/dot-skills) (folder major follows `vitest` ^5; was `vitest-v4`)
- `viem-v2` ← `viem-integration` in [uniswap/uniswap-ai](https://github.com/uniswap/uniswap-ai)
- `nodejs-keccak256-v1` ← `nodejs-keccak256` in [affaan-m/ecc](https://github.com/affaan-m/ecc)
- `next-v16` ← `nextjs` in [pproenca/dot-skills](https://github.com/pproenca/dot-skills)
- `frontend-design` ← [anthropics/skills](https://github.com/anthropics/skills) `frontend-design`
- `emilkowal-animations` ← pproenca/dot-skills `emilkowal-animations`
- `vercel-react` ← `react-best-practices` in [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills)
- `web-design-guidelines` ← `web-design-guidelines` in [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) (MIT; fetches a pinned [web-interface-guidelines `command.md`](https://github.com/vercel-labs/web-interface-guidelines/blob/e3d624baaf29dc1fc645aff3e38f03e564d2d6b1/command.md) revision)
- `composition-patterns` ← `composition-patterns` in [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) (MIT)

Vendored from upstream (folder names unchanged):

- [emilkowalski/skills](https://github.com/emilkowalski/skills) at [`85e8e2363b713506e1d5b6e07a0eb2da66be1bc3`](https://github.com/emilkowalski/skills/commit/85e8e2363b713506e1d5b6e07a0eb2da66be1bc3) (MIT): `emil-design-eng`, `review-animations`, `animation-vocabulary`, `apple-design`, `improve-animations`, `find-animation-opportunities`, `pick-ui-library`, `prototype`, `animate`, `ask-sonner`, `animate-expo`
- `better-ui` ← [jakubkrehel/skills](https://github.com/jakubkrehel/skills) at [`267330e1adfc66a718fb65fa6918c1f06d0a689e`](https://github.com/jakubkrehel/skills/commit/267330e1adfc66a718fb65fa6918c1f06d0a689e) (MIT). Sibling `better-*` skills are not in this catalog.
- `react-email` ← [resend/react-email](https://github.com/resend/react-email) `skills/react-email` (MIT)

Not vendored: Vercel `writing-guidelines`, `react-view-transitions`, and `react-native-guidelines`. Craft ideas from [Impeccable](https://github.com/pbakaus/impeccable) (Apache 2.0) are adapted in original wording in `/ui` and `frontend-design/references/product-ui.md`; the Impeccable CLI, hooks, and PRODUCT/DESIGN generators are not in this catalog.

## License

This repository is MIT. Some skill trees keep upstream notices. `skills/frontend-design/LICENSE.txt` is Apache License 2.0.

Distribution is GitHub only. Do not publish this catalog to npm — `package.json` is intentionally `private`.

## Contribute

Edit this repository. Consumers update with:

```bash
npx skills@latest update
pnpm dlx skills@latest update
```

Do not rename a skill after install; lockfile keys follow skill names. A catalog rename is a breaking consumer key change — re-add the skill under the new name and commit `skills-lock.json`. Commit `skills-lock.json` in consuming projects when you vendor skills.

## Basilic playbooks

This repository is the source of truth for `/plan`, `/build`, `/review`, `/test`, `/pr`, and the rest of the `workflow` tree. Consumers install with `--skill workflow`; do not treat a vendored `.agents/skills/workflow/` copy as canonical.

Invoke playbooks with `/<name>`. `/workflow` lists the catalog and stops; it does not dispatch `/workflow plan`. `/tdd` is opt-in. See [adoption and migration](docs/workflow-adoption.md) for structure and checklists.
