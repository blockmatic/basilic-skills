# Review dimensions

Check the dimensions in scope for this change. Skip those that are clearly out of scope and say so.

- [ ] **Correctness**: success, empty, invalid, failure, and concurrency cases relevant to this change.
- [ ] **Callers**: existing call sites, generated clients, and public exports still match the new contract.
- [ ] **Failure paths**: error handling, denied access, and recovery are evidenced, not assumed.
- [ ] **Clarity**: names and control flow expose intent; refactoring removes complexity instead of moving it.
- [ ] **Architecture**: ownership, dependencies, generated sources, and existing shared helpers remain coherent. Generated files were not edited by hand.
- [ ] **Security**: changed input and authorization boundaries, secret exposure, and denied access paths are checked.
- [ ] **Performance**: changed queries, list bounds, repeated work, and client rendering have evidence appropriate to their risk.
- [ ] **Verification**: tests exercise behavior; claimed checks were actually run and cover the change. If a finding implies a new quality or security bar, point at existing testing or security docs instead of inventing policy.
- [ ] **Docs**: matching MDX and nearest README were updated when behavior, commands, or conventions changed.
