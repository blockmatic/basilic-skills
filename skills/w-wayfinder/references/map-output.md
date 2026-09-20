# Wayfinder map

The map is an index, not a store. A decision lives in one ticket; the map gists it and points at that ticket.

Write these sections:

- **Destination**: one or two lines for what “the way is clear” looks like. Every session orients here first.
- **Notes**: domain pointers, skills this effort should consult, standing preferences. Planning by default; execution only if Notes say so.
- **Decisions so far**: one line per resolved ticket (name + gist). Do not restate the full answer.
- **Frontier**: open, unblocked tickets takeable now. Name them. List blockers on tickets that wait.
- **Not yet specified**: in-scope fog too coarse to ticket. Ticket when the question is already sharp; keep fog when it is not.
- **Out of scope**: work beyond this destination. Never graduates. A mis-scoped ticket is closed and listed here, not under Decisions so far.

Each ticket is a named decision (or a task that unblocks a decision), sized to one session:

```markdown
## Question

<the decision this ticket resolves>
```

Refer to tickets by **name**, not bare numbers. Save to the user’s path, else the repo’s existing plan file, else chat. Do not create GitHub issues or a second backlog. Do not overwrite another unfinished map.
