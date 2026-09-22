---
name: w-architecture
description: Plan an implementation structure; durable decisions belong in ADRs and architecture docs.
disable-model-invocation: true
---

Produce an implementation-structure plan for the user's question. Durable system decomposition belongs in existing ADRs and architecture MDX. Do not mint a second ADR tree. Do not create a branch.

1. If this turn has no reconciled exploration for the area, follow [council](../w-council/SKILL.md) steps 1–3, then continue.
2. Read the matching architecture MDX and ADRs. If the change is a durable boundary, stop and document it in the existing ADR/docs system.
3. State implementation goals vs nice-to-haves. Stay inside the existing architecture unless the user already authorized a durable architecture decision.
4. List constraints, trade-offs, and alternatives that affect this change. Flag high-risk items for a human. State 3–5 assumptions.
5. Add Mermaid only when structure or flow is otherwise unclear.
6. Save only if the user gave a path; otherwise return in chat. Include Assumptions and **References** (plain paths). Commands and generated-source owners come from inspected docs.
