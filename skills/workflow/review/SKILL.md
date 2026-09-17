---
name: review
description: Review a change for evidenced defects and risks without editing it.
disable-model-invocation: true
---

## Purpose

Use the specified diff, branch, or PR and its intended behavior. Establish the review base and inspect existing tests and surrounding implementation. Remain read-only unless fixes are also requested. An inspection is not a request to implement. For a quick pass on the current working tree, skip dimensions that are clearly out of scope and say so.

## Steps

1. Understand the trigger and expected result before judging the implementation. Read tests to learn which claims are actually exercised.
2. Check the in-scope [review dimensions](../references/review-dimensions.md), concentrating on changed behavior, affected callers, and failure paths. Read domain rules when a boundary changes.
3. Validate suspected defects with a concrete execution path, failing case, or source evidence. Do not invent timings or vulnerabilities from appearances.
4. Challenge verification claims. An unrun check is a finding only when the repository requires it or concrete evidence shows failure. A typecheck that cannot prove a browser path is not a defect when that path is out of scope. Order findings by impact with file/line, trigger, consequence, and smallest useful remedy.

## Verification

- [ ] Review scope and skipped dimensions are explicit.
- [ ] Findings cite an execution path, failing case, or source evidence.
- [ ] No edits unless the user also requested fixes.

## Handoff

Report actionable findings first, then unresolved questions and verification limits. If none are found, say so with the review scope and residual risks. An inspection is not proof that tests passed and is not approval to merge. Read [completion evidence](../references/completion.md).
