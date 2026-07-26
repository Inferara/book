# Comparison and Logical Operators

## Comparison Operators

All return `bool`. Work with all integer types. Sign-aware: `i32` uses signed comparison, `u32` uses unsigned.

| Operator | Example    |
|----------|------------|
| `==`     | `a == b`   |
| `!=`     | `a != b`   |
| `<`      | `a < b`    |
| `<=`     | `a <= b`   |
| `>`      | `a > b`    |
| `>=`     | `a >= b`   |

> [!Note]
> Enum values support `==` and `!=` only.

## Logical Operators

Operate on `bool` values:

| Operator | Example    |
|----------|------------|
| `&&`     | `a && b`   |
| `\|\|`   | `a \|\| b` |
| `!`      | `!a`       |

## Short-Circuit Evaluation

`&&` and `||` short-circuit: the right operand is evaluated only when the left
operand does not already determine the result. `a && b` skips `b` when `a` is
`false`; `a || b` skips `b` when `a` is `true`.

This makes guard expressions safe — the check on the left protects the
operation on the right:

```inference
pub fn is_big_ratio(y: i32, x: i32) -> bool {
    // `y / x` runs only when `x != 0` is true,
    // so this can never divide by zero.
    return x != 0 && y / x > 1;
}
```

The same pattern guards array accesses: `i < len && arr[i] > 0` never reads
out of bounds. If you need both operands evaluated unconditionally, use the
[bitwise operators](./bitwise.md) `&` and `|` — they do not short-circuit.

## Example

```inference
pub fn is_in_range(x: i32, lo: i32, hi: i32) -> bool {
    return (x >= lo) && (x <= hi);
}
```
