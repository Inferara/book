# Conditional Statements

## `if` / `else`

```inference
pub fn max(a: i32, b: i32) -> i32 {
    if a > b {
        return a;
    } else {
        return b;
    }
}
```

## `if` / `else if` / `else`

```inference
pub fn classify(x: i32) -> i32 {
    if x > 0 {
        return 1;
    } else if x < 0 {
        return -1;
    } else {
        return 0;
    }
}
```

## Important Differences

**`if` is a statement, not an expression.** You cannot write `let x: i32 = if condition { 1 } else { 2 };`. Use a mutable variable instead:

```inference
pub fn example(condition: bool) -> i32 {
    let mut result: i32 = 0;
    if condition {
        result = 1;
    } else {
        result = 2;
    }
    return result;
}
```

**The condition must be `bool`.** Inference does not coerce integers to booleans. Write `if x != 0 { ... }` instead of `if x { ... }`.

**Curly braces are required**, even for single-statement branches.
