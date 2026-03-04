# Bitwise Operators

| Operator | Name         | Example    |
|----------|--------------|------------|
| `&`      | Bitwise AND  | `a & b`    |
| `\|`     | Bitwise OR   | `a \| b`   |
| `^`      | Bitwise XOR  | `a ^ b`    |
| `~`      | Bitwise NOT  | `~a`       |
| `<<`     | Left shift   | `a << b`   |
| `>>`     | Right shift  | `a >> b`   |

All operators work with every integer type. `>>` is arithmetic for signed types, logical for unsigned types.

## Example

```inference
pub fn get_bit(x: i32, pos: i32) -> i32 {
    return (x >> pos) & 1;
}

pub fn set_bit(x: i32, pos: i32) -> i32 {
    return x | (1 << pos);
}

pub fn clear_bit(x: i32, pos: i32) -> i32 {
    return x & ~(1 << pos);
}

pub fn is_power_of_two(n: i32) -> bool {
    if n <= 0 {
        return false;
    }
    return (n & (n - 1)) == 0;
}
```
