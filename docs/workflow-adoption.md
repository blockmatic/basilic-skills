# Basilic workflow adoption

## Decision

Keep the Basilic catalog and adopt selected structure from Addy Osmani's agent-skills. Use one installable `b` tree, a `/b` dispatcher, and nested `/b-*` playbooks. FIRST remains the durable decision framework; this catalog implements development tasks. This is a local catalog change until published, not a claim that the GitHub catalog already exposes `b`.

## Evidence and comparison

Research inspected [the site](https://skills.addy.ie/) and [source revision 84ee506](https://github.com/addyosmani/agent-skills/tree/84ee50673804b95c287d1e4eb4f1c1dad7c5188a). The site explains the lifecycle; the repository exposes the actual commands, skill bodies, supporting checklists, installation constraints, and evaluation fixtures. Marketing claims such as “production-grade” do not establish effectiveness in Basilic.

| Concern | Addy's approach | Basilic decision |
|---|---|---|
| Discovery | Lifecycle commands and a meta-skill route work | `/b` routes explicit requests; `/f-*` continues to route durable decisions |
| Authoring | Purpose, use conditions, procedure, warning signs, and verification | Concise inputs, steps, observable checklist, and handoff; add detail where it changes behavior |
| Planning | Dependencies, acceptance conditions, and verification per task | Adopt these in the existing plan location; no automatic branch creation |
| Implementation | Small increments with tests and commits | Add `/b-build`; verification is proportional to change, publishing remains separately requested |
| Review | Multiple dimensions, severity, and verification scrutiny | Review correctness, clarity, architecture, security, and performance with concrete findings |
| Debugging | Reproduction and progressively narrowed diagnosis | Evidence before fixes, one hypothesis at a time, original-scenario verification, explicit unresolved state |
| Checklists | Shared completion and domain references | Keep a compact evidence reference inside the installed `b` package; existing repository policies own thresholds |
| Distribution | Skills plus several native integrations and repository-level references | Preserve the existing skills CLI and Cursor-first layout; no additional plugin or harness configuration |
| Evaluation | Structural, lexical routing, and agent behavior checks | Strengthen structural/package checks now; use realistic manual scenarios before claiming behavioral improvement |

The relevant source discussions are [skill anatomy](https://github.com/addyosmani/agent-skills/blob/84ee50673804b95c287d1e4eb4f1c1dad7c5188a/docs/skill-anatomy.md), [planning](https://github.com/addyosmani/agent-skills/blob/84ee50673804b95c287d1e4eb4f1c1dad7c5188a/skills/planning-and-task-breakdown/SKILL.md), [review](https://github.com/addyosmani/agent-skills/blob/84ee50673804b95c287d1e4eb4f1c1dad7c5188a/skills/code-review-and-quality/SKILL.md), and [debugging](https://github.com/addyosmani/agent-skills/blob/84ee50673804b95c287d1e4eb4f1c1dad7c5188a/skills/debugging-and-error-recovery/SKILL.md).

## Why not replace the catalog

Basilic already carries stack-specific patterns, generated-client ownership, repository validation scripts, docs destinations, and FIRST boundaries. Wholesale replacement would require overlays to reconstruct them. It would also overlap existing planning, review, debugging, API, UI, and security skills, increasing ambiguity about which instruction owns a decision.

Addy's [incremental implementation](https://github.com/addyosmani/agent-skills/blob/84ee50673804b95c287d1e4eb4f1c1dad7c5188a/skills/incremental-implementation/SKILL.md) treats commits as part of each increment. Basilic distinguishes implementation from a user-requested commit/push. Its existing `use-tdd` playbook is explicit; importing universal TDD would change that contract and add unnecessary work to low-impact documentation edits.

The planning source defaults to `tasks/plan.md` and a task list, with support for external trackers. Basilic already has work state and FIRST artifacts. Keeping those destinations avoids another partially maintained plan tree. Similarly, a second constraints or definition-of-done policy would compete with repository rules and the Quality/Workflow stations. We borrow evidence questions, not new policy ownership.

## Where the checklists help most

The previous four-line review sequence named concerns but did not specify the evidence returned. The new review checklist makes affected callers, failure paths, generated-source ownership, and the author's verification claims explicit. Optional style suggestions remain distinguishable from defects.

The former debugging workflow mostly suggested tools and remedies. The new sequence requires a symptom-to-cause explanation and a repeat of the original scenario. Inconclusive diagnosis is reported as such instead of being converted into a speculative fix.

The previous planning skill mixed planning with branch creation. The old Git helpers could stage everything, and `exec-push` created an empty PR description. These are concrete local problems; separating deliverables and specifying handoffs directly addresses them.

Specialty playbooks retain their existing mechanics under consistent headings and a shared evidence reference. They have not all received a domain-by-domain rewrite. Security and performance thresholds should only change with their owning repository decisions and current primary sources.

## Packaging and migration

The skills CLI installs the parent containing `SKILL.md`; the entire `b` directory carries its children and references. This avoids the per-skill shared-reference portability limitation acknowledged in Addy's [README](https://github.com/addyosmani/agent-skills/blob/84ee50673804b95c287d1e4eb4f1c1dad7c5188a/README.md). Nested children are not independent CLI install targets.

For local preview, from the consuming repository:

```bash
pnpm dlx skills@latest add /path/to/basilic-skills --skill b -a cursor --copy -y
```

After the catalog change is published, use the same command with `blockmatic/basilic-skills` as source. Verify `b` and all references installed before removing the previous installed `workflow` package with the skills CLI. Inspect local modifications before removal. Review the generated lockfile; do not fabricate a GitHub hash for an unpublished local preview.

Migration is explicit: `/workflow` becomes `/b`; `/plan-feature` becomes `/b-plan-feature`, and similarly for every old child. `/b plan` is a dispatcher shortcut to `/b-plan-feature`. Old standalone names are not registered aliases. Update pinned prompts, documentation, and exact file references. Reload skill discovery in the agent if needed.

## Validation and limits

`pnpm validate` checks names, invocation metadata, catalog grouping, expected counts, dispatcher index coverage of every `b-*` folder, and relative references from playbook SKILL.md files and `skills/b/references/*.md`. A packaged install should contain 51 child playbooks plus the dispatcher and references, with no second workflow tree.

Evaluate these scenarios in an isolated workspace: `/b` lists without executing; an unknown token does not publish; review-only leaves files unchanged; build-only does not commit; a commit with unrelated staged files preserves them; failed verification does not become a success claim. These are behavior acceptance criteria, not evidence of a completed agent evaluation.

Addy's [eval design](https://github.com/addyosmani/agent-skills/blob/84ee50673804b95c287d1e4eb4f1c1dad7c5188a/evals/README.md) usefully separates structural checks from real execution. Its lexical routing score approximates discovery; it does not prove correct reasoning. A full multi-harness evaluation system would be a separate maintenance commitment. No measured productivity or reliability improvement is claimed here.

## References

- Catalog `AGENTS.md`, `README.md`, and `scripts/validate-catalog.mjs`
- `skills/b/references/authoring.md` and `skills/b/references/completion.md`
- Basilic repository rules: `base/general`, `base/git`, `cursor/skills`, `base/docs`, `base/readme`
- Basilic technical docs: `development/ai-workflow.mdx`, `development/cursor-skills.mdx`
- FIRST: `_first/AGENTS.md`, `_first/ABOUT.md`, `_first/FIRST.md`, `f-workflow`, and the Workflow instance
- Addy source links above; its MIT license permits reuse with required notices for copied material. This adaptation uses original Basilic wording and credits the source of the structural ideas.
