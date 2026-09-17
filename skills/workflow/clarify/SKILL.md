---
name: clarify
description: Resolve consequential missing requirements from inspected context.
disable-model-invocation: true
---

## Purpose

Ask only for decisions that block correct work. Stay inside the request. Do not invent product scope.

## Steps

1. Inspect code, docs, and `PRODUCT.md` for answers that already exist.
2. List remaining consequential gaps (behavior, trust boundary, destructive ops). Skip reversible details.
3. Ask the smallest set of questions. Continue with stated assumptions when the user already covered them.

## Verification

- [ ] Each question is blocking, not ceremonial.
- [ ] Inspected sources were checked before asking.

## Handoff

Return resolved decisions, remaining assumptions, and whether `/plan` or `/build` can proceed.
