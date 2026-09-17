---
name: diagram
description: Produce a Mermaid diagram of the requested code, architecture, or data flow.
disable-model-invocation: true
---

## Purpose

Visualize relationships, flow, or structure. Chat output unless the user gave a file path. Do not invent architecture that is not in the sources.

## Steps

1. Inspect the named code or docs. Choose flowchart, sequence, class, er, state, or journey only when it matches the question.
2. Keep labels short. Split oversized graphs. Wrap output in a mermaid fence.
3. Explain what the diagram shows in a few sentences.

## Verification

- [ ] Nodes and edges map to inspected sources.
- [ ] The diagram type matches the question.

## Handoff

Return the diagram and what to inspect next if anything is still unclear.
