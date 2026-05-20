# Non-Deterministic Blocks

There are four block forms. Each appears either as the body of a spec function — written `fn <name>() <quantifier> { ... }` — or, in the case of `assume`, as a nested filter inside another quantifier's body.

| Block | Verifier reads it as |
|---|---|
| `forall { ... }` | Every execution path completes without trapping |
| `exists { ... }` | At least one execution path completes without trapping |
| `assume { ... }` | Filters out execution paths that do not satisfy the condition; only the surviving paths continue |
| `unique { ... }` | Exactly one execution path completes without trapping |

Inside the body of any of these blocks you can use `let` bindings, calls to ordinary `fn`s, `assert` statements, and `@` values. Quantifier blocks may also nest — most commonly, `assume` appears inside the body of a `forall`, `exists`, or `unique` spec function.

## `forall`

Every execution path through the body must complete without trapping. For each `@` value in scope, the verifier considers every value of that type; the property holds iff no `assert` in the body fails on any of those paths.

<div class="ifc-tabs">
<div class="ifc-tab-bar">
<button class="ifc-tab active">inf</button>
<button class="ifc-tab">wat</button>
<button class="ifc-tab">v</button>
</div>
<div class="ifc-tab-panel active">

```inference
spec Props {
    fn add_zero_is_identity() forall {
        let x: i32 = @;
        assert(x + 0 == x);
    }
}
```

</div>
<div class="ifc-tab-panel">

```wat
(module $blocks_forall
  (type (;0;) (func))
  (func $add_zero_is_identity (;0;) (type 0)
    (local $x i32)
    i32.uzumaki
    local.set $x
    local.get $x
    i32.const 0
    i32.add
    local.get $x
    i32.eq
    i32.eqz
    if
      unreachable
    end
  )
)
```

The `forall` quantifier is implicit in the spec function declaration and is not emitted as a body opcode — it lives in the module's spec metadata. The body contains only `i32.uzumaki` (custom opcode `0xfc 0x31`) followed by the assertion code. Standard `wat` printers do not decode `i32.uzumaki`, so this WAT was reconstructed from the Rocq translation in the next tab.

</div>
<div class="ifc-tab-panel">

```coq
Definition add_zero_is_identity : module_func := {|
  modfunc_type := 0%N;
  modfunc_locals := T_num T_i32 :: nil;
  modfunc_body :=
    BI_uzumaki_num T_i32 ::
    BI_local_set 0%N (*x*) ::
    BI_local_get 0%N (*x*) ::
    BI_const_num (Vi32 0) ::
    BI_binop T_i32 (Binop_i BOI_add) ::
    BI_local_get 0%N (*x*) ::
    BI_relop T_i32 (Relop_i ROI_eq) ::
    BI_testop T_i32 TO_eqz ::
    BI_if (BT_valtype None) (
      BI_unreachable ::
      nil) (
      nil) ::
    nil;
|}.
```

</div>
</div>

## `exists`

At least one execution path through the body must complete without trapping. Equivalently: there is at least one assignment to the `@` values for which no `assert` in the body fails.

<div class="ifc-tabs">
<div class="ifc-tab-bar">
<button class="ifc-tab active">inf</button>
<button class="ifc-tab">wat</button>
<button class="ifc-tab">v</button>
</div>
<div class="ifc-tab-panel active">

```inference
spec Props {
    fn equation_has_a_root() exists {
        let x: i32 = @;
        assert(x * x == 16);
    }
}
```

</div>
<div class="ifc-tab-panel">

```wat
(module $blocks_exists
  (type (;0;) (func))
  (func $equation_has_a_root (;0;) (type 0)
    (local $x i32)
    i32.uzumaki
    local.set $x
    local.get $x
    local.get $x
    i32.mul
    i32.const 16
    i32.eq
    i32.eqz
    if
      unreachable
    end
  )
)
```

The `exists` quantifier is implicit in the spec function declaration. The body bytecode is identical in shape to the `forall` case above — the quantifier metadata distinguishes how a verifier should read it.

</div>
<div class="ifc-tab-panel">

```coq
Definition equation_has_a_root : module_func := {|
  modfunc_type := 0%N;
  modfunc_locals := T_num T_i32 :: nil;
  modfunc_body :=
    BI_uzumaki_num T_i32 ::
    BI_local_set 0%N (*x*) ::
    BI_local_get 0%N (*x*) ::
    BI_local_get 0%N (*x*) ::
    BI_binop T_i32 (Binop_i BOI_mul) ::
    BI_const_num (Vi32 16) ::
    BI_relop T_i32 (Relop_i ROI_eq) ::
    BI_testop T_i32 TO_eqz ::
    BI_if (BT_valtype None) (
      BI_unreachable ::
      nil) (
      nil) ::
    nil;
|}.
```

</div>
</div>

The verifier discharges this claim by finding any value of `x` for which the body does not trap — for example `4` or `-4`.

## `unique`

Exactly one execution path through the body completes without trapping. There is one and only one assignment to the `@` values for which no `assert` fails.

<div class="ifc-tabs">
<div class="ifc-tab-bar">
<button class="ifc-tab active">inf</button>
<button class="ifc-tab">wat</button>
<button class="ifc-tab">v</button>
</div>
<div class="ifc-tab-panel active">

```inference
spec Props {
    fn only_one_zero() unique {
        let x: i32 = @;
        assert(x == 0);
    }
}
```

</div>
<div class="ifc-tab-panel">

```wat
(module $blocks_unique
  (type (;0;) (func))
  (func $only_one_zero (;0;) (type 0)
    (local $x i32)
    i32.uzumaki
    local.set $x
    local.get $x
    i32.const 0
    i32.eq
    i32.eqz
    if
      unreachable
    end
  )
)
```

The `unique` quantifier is implicit in the spec function declaration. Replacing the inner condition with one that holds for many values — say `x >= 0` — would leave more than one non-trapping path and the claim would fail.

</div>
<div class="ifc-tab-panel">

```coq
Definition only_one_zero : module_func := {|
  modfunc_type := 0%N;
  modfunc_locals := T_num T_i32 :: nil;
  modfunc_body :=
    BI_uzumaki_num T_i32 ::
    BI_local_set 0%N (*x*) ::
    BI_local_get 0%N (*x*) ::
    BI_const_num (Vi32 0) ::
    BI_relop T_i32 (Relop_i ROI_eq) ::
    BI_testop T_i32 TO_eqz ::
    BI_if (BT_valtype None) (
      BI_unreachable ::
      nil) (
      nil) ::
    nil;
|}.
```

</div>
</div>

## `assume`

`assume` is a filter. It appears as a nested block inside the body of another quantifier — typically `forall` — and drops every execution path on which the `assume` body would trap. Only the surviving paths continue into the code that follows.

The example below proves that for every `i32` value of `x` in `(-1000, 1000)`, `abs(x)` is non-negative. Without the `assume`, the `forall` would have to consider values where `0 - x` overflows, and the property would not hold.

<div class="ifc-tabs">
<div class="ifc-tab-bar">
<button class="ifc-tab active">inf</button>
<button class="ifc-tab">wat</button>
<button class="ifc-tab">v</button>
</div>
<div class="ifc-tab-panel active">

```inference
fn abs(x: i32) -> i32 {
    if x >= 0 {
        return x;
    }
    return 0 - x;
}

spec Props {
    fn abs_is_non_negative_for_small() forall {
        let x: i32 = @;
        assume {
            assert(x > -1000);
            assert(x < 1000);
        }
        assert(abs(x) >= 0);
    }
}
```

</div>
<div class="ifc-tab-panel">

```wat
(module $blocks_assume
  (type (;0;) (func (param i32) (result i32)))
  (type (;1;) (func))
  (func $abs (;0;) (type 0) (param $x i32) (result i32)
    local.get $x
    i32.const 0
    i32.ge_s
    if
      local.get $x
      return
    end
    i32.const 0
    local.get $x
    i32.sub
    return
    unreachable
  )
  (func $abs_is_non_negative_for_small (;1;) (type 1)
    (local $x i32)
    i32.uzumaki
    local.set $x
    (assume
      local.get $x
      i32.const -1000
      i32.gt_s
      i32.eqz
      if
        unreachable
      end
      local.get $x
      i32.const 1000
      i32.lt_s
      i32.eqz
      if
        unreachable
      end
    )
    local.get $x
    call $abs
    i32.const 0
    i32.ge_s
    i32.eqz
    if
      unreachable
    end
  )
)
```

The outer `forall` is implicit in the spec function declaration. The inner `assume` is a nested block and gets the explicit `(assume ... )` opcode in the body (`0xfc 0x3c`).

</div>
<div class="ifc-tab-panel">

```coq
Definition abs : module_func := {|
  modfunc_type := 0%N;
  modfunc_locals := nil;
  modfunc_body :=
    BI_local_get 0%N (*x*) ::
    BI_const_num (Vi32 0) ::
    BI_relop T_i32 (Relop_i (ROI_ge SX_S)) ::
    BI_if (BT_valtype None) (
      BI_local_get 0%N ::
      BI_return ::
      nil) (
      nil) ::
    BI_const_num (Vi32 0) ::
    BI_local_get 0%N (*x*) ::
    BI_binop T_i32 (Binop_i BOI_sub) ::
    BI_return ::
    BI_unreachable ::
    nil;
|}.

Definition abs_is_non_negative_for_small : module_func := {|
  modfunc_type := 1%N;
  modfunc_locals := T_num T_i32 :: nil;
  modfunc_body :=
    BI_uzumaki_num T_i32 ::
    BI_local_set 0%N (*x*) ::
    BI_assume (BT_valtype None) (
      BI_local_get 0%N ::
      BI_const_num (Vi32 -1000) ::
      BI_relop T_i32 (Relop_i (ROI_gt SX_S)) ::
      BI_testop T_i32 TO_eqz ::
      BI_if (BT_valtype None) (
        BI_unreachable ::
        nil) (
        nil) ::
      BI_local_get 0%N ::
      BI_const_num (Vi32 1000) ::
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
```

</div>
</div>
