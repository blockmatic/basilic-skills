# Workflow authoring pattern

One outcome per slash playbook. The frontmatter `name` equals the leaf folder that contains `SKILL.md`. Playbooks live at `workflow/<name>/` or `workflow/<group>/<name>/`. Group folders have no `SKILL.md`. Descriptions are one capability line; do not append invocation phrases. Keep `disable-model-invocation: true`.

Use these sections:

1. **Purpose**: when to use it, required context, and whether it plans, inspects, edits, or publishes.
2. **Steps**: inspect, act within scope, and verify; keep task-specific mechanics here.
3. **Verification**: short, observable exit conditions. Link shared completion or git-publish evidence instead of copying policy.
4. **Handoff**: the artifact returned, uncertainty, and next action. Include a stopping condition for investigative loops.

Compose playbooks (`/ship`, `/yolo`) inline their phase list. Link a child playbook only when that phase needs the full contract.

Supporting files belong inside `workflow/references/` so installing `workflow` carries them. Other catalogs are optional context, never install-time dependencies.

Avoid fixed interview quotas, mandatory plans for trivial edits, fabricated performance estimates, auto-commits from implementation, and silent expansion from review into fixes. Do not encode arbitrary line-count, timing, coverage, or security thresholds as repository policy.

Validate packaging with `pnpm validate` in the catalog. Exercise realistic prompts: `/workflow` lists without executing; extra tokens do not dispatch; review-only; implementation-only; failed verification; and a dirty working tree before commit. Structural validation proves packaging, not agent behavior.

Structure and evidence-oriented checklist ideas were informed by [Addy Osmani's agent-skills](https://github.com/addyosmani/agent-skills/tree/84ee50673804b95c287d1e4eb4f1c1dad7c5188a). These are Basilic-specific instructions, not a wholesale installation. See the catalog adoption analysis for tradeoffs.
