# Specifications

A `spec` block groups properties that describe a module. Each `fn` inside a `spec` block is a verification obligation rather than a function the host can call — `spec` functions are never exported, and in `compile` mode the whole block is stripped during codegen.

```text
spec <Name> {
    fn <property_name>() <non-deterministic-block> {
        // body
    }
}
```

## A spec for a tiny module

Below is an executable function `double` and a `DoubleProps` specification that claims doubling a positive number produces a result larger than the original. The body of the spec function uses the same non-deterministic constructs introduced in the previous sections.

<div class="ifc-tabs">
<div class="ifc-tab-bar">
<button class="ifc-tab active">inf</button>
<button class="ifc-tab">wat</button>
<button class="ifc-tab">v</button>
</div>
<div class="ifc-tab-panel active">

```inference
fn double(x: i32) -> i32 {
    return x + x;
}

spec DoubleProps {
    fn doubling_increases_positives() forall {
        let x: i32 = @;
        assume {
            assert(x > 0);
        }
        assert(double(x) > x);
    }
}
```

</div>
<div class="ifc-tab-panel">

```wat
(module $spec_for_module
  (type (;0;) (func (param i32) (result i32)))
  (type (;1;) (func))
  (func $double (;0;) (type 0) (param $x i32) (result i32)
    local.get $x
    local.get $x
    i32.add
    return
    unreachable
  )
  (func $doubling_increases_positives (;1;) (type 1)
    (local $x i32)
    i32.uzumaki
    local.set $x
    (assume
      local.get $x
      i32.const 0
      i32.gt_s
      i32.eqz
      if
        unreachable
      end
    )
    local.get $x
    call $double
    local.get $x
    i32.gt_s
    i32.eqz
    if
      unreachable
    end
  )
)
```

The outer `forall` is implicit in the spec function declaration and is not emitted as a body opcode — the quantifier lives in the module's spec metadata. `i32.uzumaki` (`0xfc 0x31`) and the nested `assume` (`0xfc 0x3c`) are custom opcodes that standard `wat` printers do not decode, so this WAT was reconstructed from the Rocq translation in the next tab.

</div>
<div class="ifc-tab-panel">

```coq
Definition double : module_func := {|
  modfunc_type := 0%N;
  modfunc_locals := nil;
  modfunc_body :=
    BI_local_get 0%N (*x*) ::
    BI_local_get 0%N (*x*) ::
    BI_binop T_i32 (Binop_i BOI_add) ::
    BI_return ::
    BI_unreachable ::
    nil;
|}.

Definition doubling_increases_positives : module_func := {|
  modfunc_type := 1%N;
  modfunc_locals := T_num T_i32 :: nil;
  modfunc_body :=
    BI_uzumaki_num T_i32 ::
    BI_local_set 0%N (*x*) ::
    BI_assume (BT_valtype None) (
      BI_local_get 0%N ::
      BI_const_num (Vi32 0) ::
      BI_relop T_i32 (Relop_i (ROI_gt SX_S)) ::
      BI_testop T_i32 TO_eqz ::
      BI_if (BT_valtype None) (
        BI_unreachable ::
        nil) (
        nil) ::
      nil) ::
    BI_local_get 0%N (*x*) ::
    BI_call 0 ::
    BI_local_get 0%N (*x*) ::
    BI_relop T_i32 (Relop_i (ROI_gt SX_S)) ::
    BI_testop T_i32 TO_eqz ::
    BI_if (BT_valtype None) (
      BI_unreachable ::
      nil) (
      nil) ::
    nil;
|}.

Definition nd_spec__DoubleProps_specs : list N := [1]%N.

Theorem valid_nd_spec__DoubleProps : ValidSpec nd_spec nd_spec__DoubleProps_specs.
Proof.
  (* TODO: fill the proof *)
Qed.
```

</div>
</div>

The translator emits one `Definition` per function (executable or spec), then a `list N` naming the indices of the spec functions, then a `Theorem valid_<module>__<SpecName>` that ties the spec back to the module via the `ValidSpec` predicate. The proof body is left as `(* TODO: fill the proof *)` — the translator produces obligations, not closed proofs.

## Compile-mode behaviour

Compile the same source without `-v`. The resulting `.wasm` binary contains only `double`; the entire `spec DoubleProps { ... }` block is stripped, so the deployed module is byte-for-byte the same as if the spec had not been written:

```bash
$ infc spec_block.inf            # only out/spec_block.wasm, spec stripped
$ infc spec_block.inf -v         # out/spec_block.wasm + out/spec_block.v, spec preserved
```

> [!Note]
> Spec functions are never WASM-exported even when declared `pub`. They exist for the verifier only.
