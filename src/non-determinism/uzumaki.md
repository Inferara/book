# Non-Deterministic Values

The expression `@` (read *uzumaki*) is a value attribute that represents **every** value the surrounding type can hold — not a single arbitrary pick, but the entire domain in one expression. Binding `let x: i32 = @;` makes `x` carry all `2^32` integers of type `i32` at once; the enclosing non-deterministic block then decides how the verifier reads that — by quantifying over the whole domain (`forall`, `exists`, `unique`) or by narrowing it (`assume`).

`@` is only valid inside a non-deterministic block (`forall`, `exists`, `unique`, or `assume`) that lives inside a `spec`. Using `@` anywhere else — directly in a `pub fn`, in an ordinary helper function, in a top-level expression — is rejected at the analysis phase:

```text
error[A006]: uzumaki (@) is only valid inside a non-deterministic block
```

## A minimal use

Below, `square` is the executable function we want to reason about. `SquareProps` is a `spec` block whose single property claims that for every `i32` value of `x`, `square(x)` is at least zero. `let x: i32 = @;` binds `x` to the whole `i32` domain; the surrounding `forall` requires the final `assert` to hold for every one of those values — except those the inner `assume` filters out.

<div class="ifc-tabs">
<div class="ifc-tab-bar">
<button class="ifc-tab active">inf</button>
<button class="ifc-tab">wat</button>
<button class="ifc-tab">v</button>
</div>
<div class="ifc-tab-panel active">

```inference
fn square(x: i32) -> i32 {
    return x * x;
}

spec SquareProps {
    fn square_is_non_negative() forall {
        let x: i32 = @;
        assume {
            assert(x > -46340);
            assert(x < 46340);
        }
        assert(square(x) >= 0);
    }
}
```

</div>
<div class="ifc-tab-panel">

```wat
(module $uzumaki_intro
  (type (;0;) (func (param i32) (result i32)))
  (type (;1;) (func))
  (func $square (;0;) (type 0) (param $x i32) (result i32)
    local.get $x
    local.get $x
    i32.mul
    return
    unreachable
  )
  (func $square_is_non_negative (;1;) (type 1)
    (local $x i32)
    i32.uzumaki
    local.set $x
    (assume
      local.get $x
      i32.const -46340
      i32.gt_s
      i32.eqz
      if
        unreachable
      end
      local.get $x
      i32.const 46340
      i32.lt_s
      i32.eqz
      if
        unreachable
      end
    )
    local.get $x
    call $square
    i32.const 0
    i32.ge_s
    i32.eqz
    if
      unreachable
    end
  )
)
```

`i32.uzumaki` is a custom opcode (`0xfc 0x31`) that standard `wat` printers do not decode. The outer `forall` is implicit in the spec function declaration (`fn ... () forall { ... }`) and is not emitted as an opcode in the function body — the quantifier lives in the module's spec metadata. The inner `assume` is an ordinary nested block and gets the explicit `(assume ... )` form.

</div>
<div class="ifc-tab-panel">

```coq
Definition square : module_func := {|
  modfunc_type := 0%N;
  modfunc_locals := nil;
  modfunc_body :=
    BI_local_get 0%N (*x*) ::
    BI_local_get 0%N (*x*) ::
    BI_binop T_i32 (Binop_i BOI_mul) ::
    BI_return ::
    BI_unreachable ::
    nil;
|}.

Definition square_is_non_negative : module_func := {|
  modfunc_type := 1%N;
  modfunc_locals := T_num T_i32 :: nil;
  modfunc_body :=
    BI_uzumaki_num T_i32 ::
    BI_local_set 0%N (*x*) ::
    BI_assume (BT_valtype None) (
      BI_local_get 0%N ::
      BI_const_num (Vi32 -46340) ::
      BI_relop T_i32 (Relop_i (ROI_gt SX_S)) ::
      BI_testop T_i32 TO_eqz ::
      BI_if (BT_valtype None) (
        BI_unreachable ::
        nil) (
        nil) ::
      BI_local_get 0%N ::
      BI_const_num (Vi32 46340) ::
      BI_relop T_i32 (Relop_i (ROI_lt SX_S)) ::
      BI_testop T_i32 TO_eqz ::
      BI_if (BT_valtype None) (
        BI_unreachable ::
        nil) (
        nil) ::
      nil) ::
    BI_local_get 0%N (*x*) ::
    BI_call 0 ::
    BI_const_num (Vi32 0) ::
    BI_relop T_i32 (Relop_i (ROI_ge SX_S)) ::
    BI_testop T_i32 TO_eqz ::
    BI_if (BT_valtype None) (
      BI_unreachable ::
      nil) (
      nil) ::
    nil;
|}.

Definition uzumaki_intro__SquareProps_specs : list N := [1]%N.

Theorem valid_uzumaki_intro__SquareProps : ValidSpec uzumaki_intro uzumaki_intro__SquareProps_specs.
Proof.
  (* TODO: fill the proof *)
Qed.
```

</div>
</div>

The `assume` block narrows the universe of `x` values: only paths where `x` stays within a range that does not overflow `x * x` continue to the final `assert`. Without that filter, the `forall` would have to consider paths where `square(x)` wraps to a negative value, and the property would not hold.

> [!Note]
> The type of `@` is inferred from its context. In `let x: i32 = @;` it is `i32`. In `let y: u64 = @;` it is `u64`. The compiler emits a different non-det opcode per type — `i32.uzumaki` is `0xfc 0x31`, `i64.uzumaki` is `0xfc 0x32`.
