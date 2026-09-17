# Basilic workflow adoption

## Decision

This catalog is **only** the `workflow` tree. Everyday short-hands are `/w-plan`, `/w-build`, `/w-review`, `/w-test`, `/w-commit`, `/w-push`, `/w-pr`. Durable product facts live in the consuming repo's `PRODUCT.md`; technical facts live in that repo's docs. `/w-tdd` is opt-in.

Basilic also installs [mattpocock/skills](https://github.com/mattpocock/skills) (`/grill-me`, `/tdd`, `/implement`). The `w-` prefix keeps Basilic playbooks from colliding with that pack.

Playbook bodies follow the Agent Skills / Cursor spec (`name`, `description`, `disable-model-invocation`) plus numbered instructions. Do not install or mimic Addy Osmani's Purpose / Steps / Verification / Handoff anatomy. Do not auto-commit in `/w-build`, write `tasks/plan.md`, or make TDD the default. Playbooks are a list of skills invoked directly, not a `/workflow <token>` router. Full `pnpm qa` is `/w-ship` only.

## Evidence and comparison

Research inspected [the site](https://skills.addy.ie/) and [source revision 84ee506](https://github.com/addyosmani/agent-skills/tree/84ee50673804b95c287d1e4eb4f1c1dad7c5188a). Marketing claims such as “production-grade” do not establish effectiveness in Basilic. His pack is comparison context, not the template.

| Concern | Addy's approach | Basilic decision |
|---|---|---|
| Discovery | Lifecycle commands and a meta-skill route work | Direct `/w-<name>`; `/workflow` lists and stops |
| Authoring | Purpose, use conditions, procedure, warning signs, and verification | Spec frontmatter; numbered steps; no Purpose/Handoff headings |
| Planning | Dependencies, acceptance conditions, and verification per task | Goals, Assumptions (3–5), Tasks, Risks, References; no automatic branch creation |
| Implementation | Small increments with tests and commits | `/w-build` verifies locally; publishing remains separately requested |
| Review | Multiple dimensions, severity, and verification scrutiny | Review with concrete findings; read-only unless fixes are requested |
| Debugging | Reproduction and progressively narrowed diagnosis | Evidence before fixes; original-scenario verification |
| Shared policy | Shared completion and domain references | `git-publish.md` and `review-dimensions.md` inside the installed `workflow` package |
| Distribution | Skills plus several native integrations | Existing skills CLI and Cursor-first layout |

The relevant source discussions are [skill anatomy](https://github.com/addyosmani/agent-skills/blob/84ee50673804b95c287d1e4eb4f1c1dad7c5188a/docs/skill-anatomy.md), [planning](https://github.com/addyosmani/agent-skills/blob/84ee50673804b95c287d1e4eb4f1c1dad7c5188a/skills/planning-and-task-breakdown/SKILL.md), [review](https://github.com/addyosmani/agent-skills/blob/84ee50673804b95c287d1e4eb4f1c1dad7c5188a/skills/code-review-and-quality/SKILL.md), and [debugging](https://github.com/addyosmani/agent-skills/blob/84ee50673804b95c287d1e4eb4f1c1dad7c5188a/skills/debugging-and-error-recovery/SKILL.md).

## Why not replace the catalog

Basilic already carries stack-specific patterns (in the product repo), generated-client ownership, repository validation scripts, and docs destinations. Wholesale replacement would overlap existing planning, review, debugging, API, UI, and security skills.

Addy's [incremental implementation](https://github.com/addyosmani/agent-skills/blob/84ee50673804b95c287d1e4eb4f1c1dad7c5188a/skills/incremental-implementation/SKILL.md) treats commits as part of each increment. Basilic distinguishes implementation from a user-requested commit/push. `/w-tdd` stays explicit.

The planning source defaults to `tasks/plan.md` and a task list. Basilic uses one plan location (or the user's chosen file) and GitHub Issues/PRs for work state.

## Packaging and migration

The skills CLI installs the parent containing `SKILL.md`; the entire `workflow` directory carries its children and references. Nested children are not independent CLI install targets. Specialists may live at `workflow/<group>/w-<name>/`; the slash command is the leaf name.

For local preview, from the consuming repository:

```bash
pnpm dlx skills@latest add /path/to/basilic-skills --skill workflow -a cursor --copy -y
```

After the catalog change is published, use the same command with `blockmatic/basilic-skills` as source. Basilic's `pnpm setup:skills` installs `--skill workflow` from this catalog and [mattpocock/skills](https://github.com/mattpocock/skills), then restores `skills-lock.json`. Review the generated lockfile; do not fabricate a GitHub hash for an unpublished local preview.

Slash names match leaf folders (`/w-plan`). Removed public names map as follows; there are no alias playbooks. Do not invoke `/workflow plan`; type `/w-plan`. Reload skill discovery after installing.

| Removed | Current |
|---|---|
| `/plan` | `/w-plan` |
| `/build` | `/w-build` |
| `/review` | `/w-review` |
| `/commit` | `/w-commit` |
| `/push` | `/w-push` |
| `/pr` | `/w-pr` |
| `/ship` | `/w-ship` |
| `/tdd` | `/w-tdd` |
| `/git-commit` | `/w-commit` |
| `/git-push` | `/w-push` |
| `/git-create-pr` | `/w-pr` |
| `/exec-push` | `/w-ship` |
| `/use-frontend` | `/w-ui` |
| `/use-tdd` | `/w-tdd` |
| `/plan-architecture` | `/w-architecture` |
| `/refactor-code` | `/w-refactor` |
| `/overview` | `/w-diagram` |
| `/docker` | `/w-debug` |
| `/info` | `/w-docs` |
| `/issues` | `/w-git-repair` |
| `/rabbit` | `/w-coderabbit` |

## Validation and limits

`pnpm validate` checks names, invocation metadata, catalog grouping, expected counts, parent index coverage of every playbook folder, and relative references from playbook SKILL.md files and `skills/workflow/references/*.md`. A packaged install should contain 42 child playbooks plus the parent catalog and references, with no leftover `b` tree.

Evaluate these scenarios in an isolated workspace: `/workflow` lists without executing; extra tokens do not dispatch or publish; review-only leaves files unchanged; build-only does not commit; a commit with unrelated staged files preserves them; failed verification does not become a success claim.

## References

- Catalog `AGENTS.md`, `README.md`, and `scripts/validate-catalog.mjs`
- `skills/workflow/references/authoring.md`, `git-publish.md`, and `review-dimensions.md`
- Basilic repository rules: `base/general`, `base/git`, `cursor/skills`, `base/docs`, `base/readme`
- Basilic technical docs: `development/ai-workflow.mdx`, `development/cursor-skills.mdx`
- Addy source links above; its MIT license permits reuse with required notices for copied material. This adaptation uses original Basilic wording.
