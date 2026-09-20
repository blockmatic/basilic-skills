---
name: w-plan
description: Write an ordered plan without changing implementation.
disable-model-invocation: true
---

Planning does not implement, branch, or commit. A single already-clear change uses `/w-build`. A blocking product gap uses `/w-clarify`.

1. **Explore**: if this turn has no reconciled exploration for the area, follow [council](../w-council/SKILL.md) steps 1–3, then continue.
2. **Goals**: 3–7 bullets for scope, success, constraints, non-goals.
3. **Context**: matching glob rule and skill, then topic MDX (or this repo’s docs path). Rules override skills. Inspect affected packages, README, scripts. Durable architecture: matching MDX/ADR. Generated outputs name an owning source; commands come from inspected scripts.
4. **Assumptions**: 3–5 bullets. Defer product scope, secrets, and destructive ops.
5. **Tasks**: ordered work with likely files and dependencies. Uncertain work first. Diagram only if relationships need one.
6. **Output**: user’s path, else the repo’s existing plan file, else chat. Follow [plan output](references/plan-output.md).
