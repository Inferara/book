# Non-Determinism

Inference's non-deterministic constructs — `@`, `forall`, `exists`, `assume`, `unique` — exist for writing **specifications**, not for writing executable code. They appear only inside a `spec` block: as the body of a spec function, or nested within another non-deterministic block in such a body.

Outside a `spec`, the analysis phase rejects these constructs:

```text
error[A006]: uzumaki (@) is only valid inside a non-deterministic block
```

A non-deterministic value (`@`) is a value attribute that represents *every* value its type can hold — the entire domain in one expression, not a single arbitrary pick. The enclosing non-deterministic block decides how the verifier reads that domain:

- `forall` — every execution path completes without trapping.
- `exists` — at least one execution path completes without trapping.
- `unique` — exactly one execution path completes without trapping.
- `assume` — filters out execution paths that do not satisfy a condition; only the surviving paths continue.

In `compile` mode `spec` blocks are stripped from the WebAssembly output entirely, so non-deterministic constructs have no effect on the deployed program. In `proof` mode (with `-v`) they are preserved and translated to Rocq alongside the rest of the module — see [Appendix D - Compilation modes](../appendix/d-infs-reference.md#compilation-modes).

This chapter has three sections:

- [Non-Deterministic Values](./uzumaki.md) — the `@` operator.
- [Non-Deterministic Blocks](./blocks.md) — `forall`, `exists`, `assume`, `unique` as the body of a spec function and as nested filters.
- [Specifications](./spec-blocks.md) — `spec` blocks that group properties about a module.
