# Functions

A program is a sequence of instructions (or operations) that the computer executes to perform a specific task. Conceptually, a program is a function: it takes some input and produces some output. To write complex programs, we use functions as building blocks to decompose a program into smaller, manageable pieces. Similarly, libraries provide reusable functions that can be called from different programs. The Inference programming language is all about writing functions. As we saw in [Hello World](../getting-started/hello-world.md), the smallest Inference program is a function.

## Anatomy of a Function

```inference
pub fn function_name(param1: Type1, param2: Type2) -> ReturnType {
    // function body
}
```

- `pub` makes the function exported from the compiled WebAssembly module. Without `pub`, a function is private to the file.
- `-> ReturnType` declares the return type. Functions without it return nothing.
- `return` is required to return a value — there are no implicit returns.

## Parameters

Each parameter has a name and a type annotation:

```inference
pub fn add(a: i32, b: i32) -> i32 {
    return a + b;
}
```

Parameters are immutable by default. Declare with `mut` to allow modification inside the function body. All values are passed by copy — mutating a parameter does not affect the caller:

```inference
pub fn increment_and_return(mut x: i32) -> i32 {
    x = x + 1;
    return x;
}
```

## Calling Functions

```inference
pub fn example() -> i32 {
    let result: i32 = add(10, 20);
    return result;
}
```

## Function Body

A function body is a sequence of statements enclosed in curly braces `{}`.

## Methods

Methods are declared **inside the struct body**, after the field list. Instance methods take `self` (or `mut self`) as the first parameter. Associated functions omit `self` and are called with `::`.

In the code example below, the **v** tab shows the Rocq translation of the Inference code, which is used for formal verification.

<div class="ifc-tabs">
<div class="ifc-tab-bar">
<button class="ifc-tab active">inf</button>
<button class="ifc-tab">wat</button>
<button class="ifc-tab">v</button>
</div>
<div class="ifc-tab-panel active">

```inference
struct Counter {
    value: i32;

    fn get(self) -> i32 {
        return self.value;
    }
    fn increment(mut self) {
        self.value = self.value + 1;
    }
    fn new(v: i32) -> Counter {
        return Counter { value: v };
    }
}

pub fn example() -> i32 {
    let c: Counter = Counter::new(10);
    c.increment();
    return c.get();
}
```

</div>
<div class="ifc-tab-panel">

```wat
(module $methods
  (type (;0;) (func (result i32)))
  (type (;1;) (func (param i32) (result i32)))
  (type (;2;) (func (param i32)))
  (type (;3;) (func (param i32 i32)))
  (memory (;0;) 1 1)
  (global (;0;) (mut i32) i32.const 65536)
  (export "example" (func $example))
  (export "memory" (memory 0))
  (export "__stack_pointer" (global 0))
  (func $example (;0;) (type 0) (result i32)
    (local $c i32) (local $__frame_ptr i32)
    global.get 0
    i32.const 16
    i32.sub
    local.tee $__frame_ptr
    global.set 0
    local.get $__frame_ptr
    i32.const 0
    i32.const 16
    memory.fill
    local.get $__frame_ptr
    i32.const 10
    call $Counter.new
    local.get $__frame_ptr
    local.set $c
    local.get $c
    call $Counter.increment
    local.get $c
    call $Counter.get
    local.get $__frame_ptr
    i32.const 16
    i32.add
    global.set 0
    return
    unreachable
  )
  (func $Counter.get (;1;) (type 1) (param $self i32) (result i32)
    local.get $self
    i32.load
    return
    unreachable
  )
  (func $Counter.increment (;2;) (type 2) (param $self i32)
    (local $__frame_ptr i32)
    global.get 0
    i32.const 16
    i32.sub
    local.tee $__frame_ptr
    global.set 0
    local.get $__frame_ptr
    i32.const 0
    i32.const 16
    memory.fill
    local.get $__frame_ptr
    local.get $self
    i32.const 4
    memory.copy
    local.get $__frame_ptr
    local.set $self
    local.get $self
    local.get $self
    i32.load
    i32.const 1
    i32.add
    i32.store
    local.get $__frame_ptr
    i32.const 16
    i32.add
    global.set 0
  )
  (func $Counter.new (;3;) (type 3) (param $sret i32) (param $v i32)
    local.get $sret
    local.get $v
    i32.store
    return
    unreachable
  )
)
```

</div>
<div class="ifc-tab-panel">

```coq
Definition example : module_func := {|
  modfunc_type := 0%N;
  modfunc_locals := T_num T_i32 :: T_num T_i32 :: nil;
  modfunc_body :=
    BI_global_get 0%N ::
    BI_const_num (Vi32 16) ::
    BI_binop T_i32 (Binop_i BOI_sub) ::
    BI_local_tee 1%N (*__frame_ptr*) ::
    BI_global_set 0%N ::
    BI_local_get 1%N (*__frame_ptr*) ::
    BI_const_num (Vi32 10) ::
    BI_call 3 ::
    BI_local_get 1%N (*__frame_ptr*) ::
    BI_local_set 0%N (*c*) ::
    BI_local_get 0%N (*c*) ::
    BI_call 2 ::
    BI_local_get 0%N (*c*) ::
    BI_call 1 ::
    BI_return ::
    nil;
|}.

(* The Counter.get / Counter.increment / Counter.new definitions and the
   final `Definition methods : module := { ... }` are produced in the same
   file. See `out/<name>.v` for the complete translation. *)
```

</div>
</div>

`Counter::new(10)` is an associated function call — note the `::` — and produces a fresh `Counter`. `c.increment()` and `c.get()` are instance method calls using `.`.

> [!Note]
> `mut self` lets the method body mutate its own copy of the receiver, but the caller's value is not affected. Like every other parameter, `self` is passed by copy — after `c.increment()` returns, `c` in the caller is unchanged. This is enforced by the same value-copy semantics described under [Parameters](#parameters) above.
