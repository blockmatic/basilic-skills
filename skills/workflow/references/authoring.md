# Workflow authoring pattern

One outcome per slash playbook. The frontmatter `name` equals the leaf folder that contains `SKILL.md`. Playbooks live at `workflow/<name>/` or `workflow/<group>/<name>/`. Group folders have no `SKILL.md`. Descriptions are one capability line; do not append invocation phrases. Keep `disable-model-invocation: true`.

Body is YAML frontmatter, an optional stop line, then numbered steps. Do not use Purpose, Steps, Verification, or Handoff headings. Do not paste a shared close-out paragraph into every specialist.

Close-out:

- `/docs` owns the docs-layer table. Other editors end with **Docs: `/docs` if behavior or commands changed.** Do not copy `/build`'s paragraph.
- `/build` also updates matching MDX and nearest README when behavior/commands/conventions changed (`PRODUCT.md` only if product facts changed), or one line why not. Run the smallest existing check. Never commit. Never `pnpm qa`.
- `/commit` runs that docs check **before staging**. Task-owned hunks only. Never `git add -A`. Rely on commit hooks. Never `pnpm qa`.
- `/ship` is the only playbook that runs `pnpm qa` (or the consuming repo's full pre-push suite). Implement, docs as `/build`, then that gate, then commit/push/PR via [git publish](git-publish.md).
- Read-only playbooks (`/review`, `/review-plan`, `/clarify`, `/roadmap`, `/release`, `/council` inspect) have no docs close-out and no `pnpm qa`.

Compose `/ship` inline. Do not paraphrase [git publish](git-publish.md) or Conventional Commit format. Open a child playbook only when that phase is blocked.

Supporting files belong inside `workflow/references/` so installing `workflow` carries them: [authoring](authoring.md), [git publish](git-publish.md), and [review dimensions](review-dimensions.md). Other catalogs are optional context, never install-time dependencies.

Avoid fixed interview quotas, mandatory plans for trivial edits, fabricated performance estimates, auto-commits from implementation, and silent expansion from review into fixes. Do not encode arbitrary line-count, timing, coverage, or security thresholds as repository policy. Do not restore `git add -A`, branch-from-plan, empty PR bodies, `/yolo` editing `.env`, or FIRST/`_first` paths.

Validate packaging with `pnpm validate` in the catalog. Exercise realistic prompts: `/workflow` lists without executing; extra tokens do not dispatch; review-only; implementation-only; failed verification; and a dirty working tree before commit. Structural validation proves packaging, not agent behavior.
