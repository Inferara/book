# Loops

Inference uses `loop` for both conditional and infinite loops. There is no `while` or `for`.

## Conditional Loop

```inference
pub fn sum_to_n(n: i32) -> i32 {
    let mut sum: i32 = 0;
    let mut i: i32 = 1;
    loop i <= n {
        sum = sum + i;
        i = i + 1;
    }
    return sum;
}
```

`loop condition { body }` checks the condition before each iteration. If false initially, the body never runs.

## Infinite Loop

```inference
pub fn find_first_multiple(n: i32, target: i32) -> i32 {
    let mut x: i32 = n;
    loop {
        if x % target == 0 {
            break;
        }
        x = x + 1;
    }
    return x;
}
```

`loop { body }` runs until `break` or `return`.

## `break`

`break` exits the innermost enclosing loop. `continue` is not yet supported.

## Nested Loops

```inference
pub fn nested_count() -> i32 {
    let mut total: i32 = 0;
    let mut i: i32 = 0;
    loop i < 3 {
        let mut j: i32 = 0;
        loop j < 4 {
            total = total + 1;
            j = j + 1;
        }
        i = i + 1;
    }
    return total;
}
```
