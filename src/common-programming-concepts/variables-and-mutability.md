# Variables and Mutability

## Variables

Variables are declared with `let`, and require a type annotation and an initial value:

```inference
let x: i32 = 42;
let flag: bool = true;
```

Inference does not infer types — every variable must have an explicit type annotation.

## Immutability by Default

Variables are immutable by default. Use `let mut` to allow reassignment:

```inference
let x: i32 = 5;
// x = 6;  // compiler error: x is not mutable

let mut y: i32 = 5;
y = 6;  // OK
```

## Constants

Constants are declared with `const` and must be initialized with a literal value:

```inference
const MAX_SIZE: i32 = 100;
const THRESHOLD: i64 = 50000;
const ENABLED: bool = true;
```
