---
name: security
description: Review the change or tree against repository security docs and existing checks.
disable-model-invocation: true
---

## Purpose

Find security defects relative to repository security docs and existing scanners. Do not invent CORS, encryption, password, or header policy. Stay report-only unless the user asked to fix.

## Steps

1. Read the repository security docs. If missing, stop and ask; do not invent a bar.
2. Check authn/authz, input validation, secret handling, and data exposure on the changed paths.
3. Validate each suspected issue with a trigger and consequence. Skip invented CVEs and timings.
4. If authorized, run existing security scripts or CI jobs from the docs or package.json. Record passed, failed, or not run.
5. If fixes are authorized, change the owning cause. Policy changes need a human.

## Verification

- [ ] Findings have file/line or check evidence.
- [ ] Documented thresholds were not expanded.
- [ ] No unsolicited commit.

## Handoff

Report defects, residual risk, suggested remedies, and whether a security-doc follow-up is required. Read [completion evidence](../references/completion.md).
