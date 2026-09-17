---
name: diagram
description: Produce a Mermaid diagram of the requested code, architecture, or data flow.
disable-model-invocation: true
---

## Purpose

Visualize relationships, flow, or structure. Chat output unless the user gave a file path. Do not invent architecture that is not in the sources. Do not invent PRODUCT.md.

## Steps

1. If the request is product, journey, or architecture docs, read `PRODUCT.md` and named MDX and emit at most two Mermaid diagrams from those sources. Flag contradictions between docs and code without proposing a new methodology.
2. Otherwise inspect the named code or docs. Choose flowchart, sequence, class, er, state, or journey only when it matches the question.
3. Keep labels short. Split oversized graphs. Wrap output in a mermaid fence.
4. Explain what the diagram shows in a few sentences.

## Verification

- [ ] Nodes and edges map to inspected sources.
- [ ] The diagram type matches the question.
- [ ] Product-doc diagrams do not invent a second product brief.

## Handoff

Return the diagram and what to inspect next if anything is still unclear.
