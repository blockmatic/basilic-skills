# Basilic workflow adoption

## Decision

Keep the Basilic catalog. Everyday short-hands are `/plan`, `/build`, `/review`, `/test`, `/commit`, `/push`, `/pr`, and the other unprefixed shortcuts. Durable product facts live in the consuming repo's `PRODUCT.md`; technical facts live in that repo's docs. `/tdd` is opt-in.

Addy Osmani's agent-skills remain a **later** editorial reference for progressive polish, not a rewrite list for this pass. Do not install his pack, auto-commit in `/build`, write `tasks/plan.md`, or make TDD the default. Playbooks are a list of skills invoked directly, not a `/workflow <token>` router.

## Evidence and comparison

Research inspected [the site](https://skills.addy.ie/) and [source revision 84ee506](https://github.com/addyosmani/agent-skills/tree/84ee50673804b95c287d1e4eb4f1c1dad7c5188a). Marketing claims such as “production-grade” do not establish effectiveness in Basilic.

| Concern | Addy's approach | Basilic decision |
|---|---|---|
| Discovery | Lifecycle commands and a meta-skill route work | Direct `/<name>`; `/workflow` lists and stops |
| Authoring | Purpose, use conditions, procedure, warning signs, and verification | Concise inputs, steps, observable checklist, and handoff |
| Planning | Dependencies, acceptance conditions, and verification per task | One feature-specific plan; no automatic branch creation |
| Implementation | Small increments with tests and commits | `/build` verifies locally; publishing remains separately requested |
| Review | Multiple dimensions, severity, and verification scrutiny | Review with concrete findings; read-only unless fixes are requested |
| Debugging | Reproduction and progressively narrowed diagnosis | Evidence before fixes; original-scenario verification |
| Checklists | Shared completion and domain references | Compact evidence reference inside the installed `workflow` package |
| Distribution | Skills plus several native integrations | Existing skills CLI and Cursor-first layout |

The relevant source discussions are [skill anatomy](https://github.com/addyosmani/agent-skills/blob/84ee50673804b95c287d1e4eb4f1c1dad7c5188a/docs/skill-anatomy.md), [planning](https://github.com/addyosmani/agent-skills/blob/84ee50673804b95c287d1e4eb4f1c1dad7c5188a/skills/planning-and-task-breakdown/SKILL.md), [review](https://github.com/addyosmani/agent-skills/blob/84ee50673804b95c287d1e4eb4f1c1dad7c5188a/skills/code-review-and-quality/SKILL.md), and [debugging](https://github.com/addyosmani/agent-skills/blob/84ee50673804b95c287d1e4eb4f1c1dad7c5188a/skills/debugging-and-error-recovery/SKILL.md).

## Why not replace the catalog

Basilic already carries stack-specific patterns, generated-client ownership, repository validation scripts, and docs destinations. Wholesale replacement would overlap existing planning, review, debugging, API, UI, and security skills.

Addy's [incremental implementation](https://github.com/addyosmani/agent-skills/blob/84ee50673804b95c287d1e4eb4f1c1dad7c5188a/skills/incremental-implementation/SKILL.md) treats commits as part of each increment. Basilic distinguishes implementation from a user-requested commit/push. `/tdd` stays explicit.

The planning source defaults to `tasks/plan.md` and a task list. Basilic uses one plan location (or the user's chosen file) and GitHub Issues/PRs for work state.

Further Addy or Matt checklist items can land later, one gap at a time.

## Packaging and migration

The skills CLI installs the parent containing `SKILL.md`; the entire `workflow` directory carries its children and references. Nested children are not independent CLI install targets. Specialists may live at `workflow/<group>/<name>/`; the slash command is the leaf name.

For local preview, from the consuming repository:

```bash
pnpm dlx skills@latest add /path/to/basilic-skills --skill workflow -a cursor --copy -y
```

After the catalog change is published, use the same command with `blockmatic/basilic-skills` as source. Basilic's `pnpm setup:skills` installs `--skill '*'` from this catalog only and restores `skills-lock.json`. Review the generated lockfile; do not fabricate a GitHub hash for an unpublished local preview.

Slash names match leaf folders. Removed public names map as follows; there are no alias playbooks. Do not invoke `/workflow plan`; type `/plan`. Reload skill discovery after installing.

| Removed | Current |
|---|---|
| `/git-commit` | `/commit` |
| `/git-push` | `/push` |
| `/git-create-pr` | `/pr` |
| `/exec-push` | `/ship` |
| `/use-frontend` | `/ui` |
| `/use-tdd` | `/tdd` |
| `/plan-architecture` | `/architecture` |
| `/refactor-code` | `/refactor` |
| `/overview` | `/diagram` |
| `/docker` | `/debug` |
| `/info` | `/docs` |
| `/issues` | `/git-repair` |
| `/rabbit` | `/coderabbit` |

## Validation and limits

`pnpm validate` checks names, invocation metadata, catalog grouping, expected counts, parent index coverage of every playbook folder, and relative references from playbook SKILL.md files and `skills/workflow/references/*.md`. A packaged install should contain 42 child playbooks plus the parent catalog and references, with no leftover `b` tree.

Evaluate these scenarios in an isolated workspace: `/workflow` lists without executing; extra tokens do not dispatch or publish; review-only leaves files unchanged; build-only does not commit; a commit with unrelated staged files preserves them; failed verification does not become a success claim.

## References

- Catalog `AGENTS.md`, `README.md`, and `scripts/validate-catalog.mjs`
- `skills/workflow/references/authoring.md`, `completion.md`, `git-publish.md`, and `review-dimensions.md`
- Basilic repository rules: `base/general`, `base/git`, `cursor/skills`, `base/docs`, `base/readme`
- Basilic technical docs: `development/ai-workflow.mdx`, `development/cursor-skills.mdx`
- Addy source links above; its MIT license permits reuse with required notices for copied material. This adaptation uses original Basilic wording and credits the source of the structural ideas.
