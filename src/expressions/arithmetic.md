# Arithmetic Operators

| Operator | Name           | Example    |
|----------|----------------|------------|
| `+`      | Addition       | `a + b`    |
| `-`      | Subtraction    | `a - b`    |
| `*`      | Multiplication | `a * b`    |
| `/`      | Division       | `a / b`    |
| `%`      | Remainder      | `a % b`    |
| `-`      | Unary negation | `-a`       |

All operators work with every integer type. Parentheses control evaluation order: `(a + b) * c`.

## Integer Overflow

Integer arithmetic wraps on overflow, matching WebAssembly semantics. For `i8`, `127 + 1` wraps to `-128`. For `u8`, `0 - 1` wraps to `255`. No runtime error is raised.

## Division by Zero

Division and remainder by zero trap at runtime. Guard against it if the divisor may be zero:

```inference
pub fn safe_divide(a: i32, b: i32) -> i32 {
    if b == 0 {
        return 0;
    }
    return a / b;
}
```
