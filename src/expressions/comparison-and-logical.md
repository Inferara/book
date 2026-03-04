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

## Logical Operators

Operate on `bool` values:

| Operator | Example    |
|----------|------------|
| `&&`     | `a && b`   |
| `\|\|`   | `a \|\| b` |
| `!`      | `!a`       |

## Example

```inference
pub fn is_in_range(x: i32, lo: i32, hi: i32) -> bool {
    return (x >= lo) && (x <= hi);
}
```
