# Assertions

`assert(cond)` evaluates a `bool` expression. If `cond` is `false`, the program traps and the WebAssembly runtime reports unreachable code reached. If `cond` is `true`, execution continues to the next statement.

Assertions are intended for invariants you expect to always hold — preconditions on function arguments, postconditions on intermediate results, or sanity checks around tricky logic.

## Simple Assertion

<div class="ifc-tabs">
<div class="ifc-tab-bar">
<button class="ifc-tab active">inf</button>
<button class="ifc-tab">wat</button>
<button class="ifc-tab">v</button>
</div>
<div class="ifc-tab-panel active">

```inference
pub fn checked_div(numerator: i32, denominator: i32) -> i32 {
    assert(denominator != 0);
    return numerator / denominator;
}
```

</div>
<div class="ifc-tab-panel">

```wat
(module $assert_simple
  (type (;0;) (func (param i32 i32) (result i32)))
  (export "checked_div" (func $checked_div))
  (func $checked_div (;0;) (type 0) (param $numerator i32) (param $denominator i32) (result i32)
    local.get $denominator
    i32.const 0
    i32.ne
    i32.eqz
    if ;; label = @1
      unreachable
    end
    local.get $numerator
    local.get $denominator
    i32.div_s
    return
    unreachable
  )
)
```

</div>
<div class="ifc-tab-panel">

```coq
Definition checked_div : module_func := {|
  modfunc_type := 0%N;
  modfunc_locals := nil;
  modfunc_body :=
    BI_local_get 1%N (*denominator*) ::
    BI_const_num (Vi32 0) ::
    BI_relop T_i32 (Relop_i ROI_ne) ::
    BI_testop T_i32 TO_eqz ::
    BI_if (BT_valtype None) (
      BI_unreachable ::
      nil) (
      nil) ::
    BI_local_get 0%N (*numerator*) ::
    BI_local_get 1%N (*denominator*) ::
    BI_binop T_i32 (Binop_i (BOI_div SX_S)) ::
    BI_return ::
    BI_unreachable ::
    nil;
|}.
```

</div>
</div>

The compiler lowers `assert(cond)` to `cond; i32.eqz; if; unreachable; end` — the smallest WASM shape that traps when the condition fails. In the Rocq translation, the same pattern becomes a `BI_if` block whose only effect on the failing branch is `BI_unreachable`.

## Compound Conditions

`assert` accepts any boolean expression, including conjunctions, disjunctions, negations, and comparisons.

<div class="ifc-tabs">
<div class="ifc-tab-bar">
<button class="ifc-tab active">inf</button>
<button class="ifc-tab">wat</button>
<button class="ifc-tab">v</button>
</div>
<div class="ifc-tab-panel active">

```inference
pub fn in_range(value: i32, low: i32, high: i32) -> i32 {
    assert((value >= low) && (value <= high));
    return value;
}
```

</div>
<div class="ifc-tab-panel">

```wat
(module $assert_compound
  (type (;0;) (func (param i32 i32 i32) (result i32)))
  (export "in_range" (func $in_range))
  (func $in_range (;0;) (type 0) (param $value i32) (param $low i32) (param $high i32) (result i32)
    local.get $value
    local.get $low
    i32.ge_s
    local.get $value
    local.get $high
    i32.le_s
    i32.and
    i32.eqz
    if ;; label = @1
      unreachable
    end
    local.get $value
    return
    unreachable
  )
)
```

</div>
<div class="ifc-tab-panel">

```coq
Definition in_range : module_func := {|
  modfunc_type := 0%N;
  modfunc_locals := nil;
  modfunc_body :=
    BI_local_get 0%N (*value*) ::
    BI_local_get 1%N (*low*) ::
    BI_relop T_i32 (Relop_i (ROI_ge SX_S)) ::
    BI_local_get 0%N (*value*) ::
    BI_local_get 2%N (*high*) ::
    BI_relop T_i32 (Relop_i (ROI_le SX_S)) ::
    BI_binop T_i32 (Binop_i BOI_and) ::
    BI_testop T_i32 TO_eqz ::
    BI_if (BT_valtype None) (
      BI_unreachable ::
      nil) (
      nil) ::
    BI_local_get 0%N (*value*) ::
    BI_return ::
    BI_unreachable ::
    nil;
|}.
```

</div>
</div>

> [!Note]
> Assertions are emitted in both compilation modes — `compile` and `proof`. They are not a verification-only construct; the trap is part of the deployed program. See [Appendix D - Compilation modes](../appendix/d-infs-reference.md#compilation-modes) for the difference between the two modes.
