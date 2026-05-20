# A - Language Reference

## Keywords

| Keyword  | Description |
|----------|-------------|
| `fn`       | Defines a function. |
| `pub`      | Marks a function as publicly exported from the compiled WebAssembly module. |
| `return`   | Returns a value from a function. |
| `let`      | Declares a local variable. |
| `mut`      | Makes a variable or function parameter mutable (reassignable). |
| `const`    | Declares a compile-time constant. |
| `if`       | Begins a conditional statement. |
| `else`     | Defines the branch taken when an `if` condition is false. |
| `loop`     | Begins an infinite or conditional loop. |
| `break`    | Exits the innermost enclosing `loop`. |
| `assert`   | Statement that traps on a `false` condition. |
| `true`     | Boolean literal for the true value. |
| `false`    | Boolean literal for the false value. |
| `struct`   | Defines a user-defined type with named fields and methods. |
| `self`     | References the current instance in a method. |
| `enum`     | Defines an enumeration type. |
| `forall`   | Non-deterministic block where all computation paths must hold. |
| `exists`   | Non-deterministic block where at least one computation path must hold. |
| `assume`   | Filters execution paths inside a non-deterministic block. |
| `unique`   | Non-deterministic block where exactly one computation path must hold. |
| `spec`     | Specification block for formal verification. |

> [!Note]
> The grammar reserves `type`, `external`, `use`, and `module` for future use. These are recognised as keywords but the corresponding language features are not yet fully implemented and using them today will result in a compilation error.

## Data Types

| Data Type | Description |
|-----------|-------------|
| `i8`      | 8-bit signed integer. Range: -128 to 127. |
| `i16`     | 16-bit signed integer. Range: -32,768 to 32,767. |
| `i32`     | 32-bit signed integer. Range: -2,147,483,648 to 2,147,483,647. |
| `i64`     | 64-bit signed integer. Range: -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807. |
| `u8`      | 8-bit unsigned integer. Range: 0 to 255. |
| `u16`     | 16-bit unsigned integer. Range: 0 to 65,535. |
| `u32`     | 32-bit unsigned integer. Range: 0 to 4,294,967,295. |
| `u64`     | 64-bit unsigned integer. Range: 0 to 18,446,744,073,709,551,615. |
| `bool`    | Boolean type. Values: `true` or `false`. |
| `[T; N]`  | Fixed-size array of `N` elements of type `T`. Both `T` and `N` must be known at compile time. |
| `struct`  | User-defined type with named fields. Defined with `struct Name { field: Type; ... }`. |
| `enum`  | Enumeration type with named variants. Defined with `enum Name { Variant1, Variant2, ... }`. |

## Operators

### Arithmetic Operators

| Operator | Description | Example |
|----------|-------------|---------|
| `+`      | Addition | `a + b` |
| `-`      | Subtraction | `a - b` |
| `*`      | Multiplication | `a * b` |
| `/`      | Division | `a / b` |
| `%`      | Remainder (modulo) | `a % b` |
| `-`      | Unary negation | `-a` |

> [!Note]
> Integer arithmetic wraps on overflow. For example, adding 1 to the maximum `i32` value wraps around to the minimum `i32` value.

### Comparison Operators

Comparison operators evaluate to a `bool` value.

| Operator | Description | Example |
|----------|-------------|---------|
| `==`     | Equal to | `a == b` |
| `!=`     | Not equal to | `a != b` |
| `<`      | Less than | `a < b` |
| `<=`     | Less than or equal to | `a <= b` |
| `>`      | Greater than | `a > b` |
| `>=`     | Greater than or equal to | `a >= b` |

> [!Note]
> Enum values support only `==` and `!=`. Ordering comparisons (`<`, `<=`, `>`, `>=`) require numeric types.

### Logical Operators

Logical operators work on `bool` values and produce a `bool` result.

| Operator | Description | Example |
|----------|-------------|---------|
| `&&`     | Logical AND | `a && b` |
| <code>&#124;&#124;</code> | Logical OR | <code>a &#124;&#124; b</code> |
| `!`      | Logical NOT (unary) | `!a` |

### Bitwise Operators

Bitwise operators work on the binary representation of integer values.

| Operator | Description | Example |
|----------|-------------|---------|
| `&`      | Bitwise AND | `a & b` |
| <code>&#124;</code> | Bitwise OR | <code>a &#124; b</code> |
| `^`      | Bitwise XOR | `a ^ b` |
| `~`      | Bitwise NOT (unary complement) | `~a` |
| `<<`     | Left shift | `a << b` |
| `>>`     | Right shift | `a >> b` |

### Access Operators

| Operator | Description | Example |
|----------|-------------|---------|
| `.`      | Member access (field or method) | `point.x`, `counter.get()` |
| `::`     | Type-associated access | `Point::new()` |
