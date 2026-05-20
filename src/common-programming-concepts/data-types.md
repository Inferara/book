# Data Types

Inference is a statically typed language — every value and variable must have a known type at compile time.

## Integer Types

Inference supports both signed and unsigned integer types:

| Length (in bits) | Signed | Unsigned |
|------------------|--------|----------|
| 8                | `i8`   | `u8`     |
| 16               | `i16`  | `u16`    |
| 32               | `i32`  | `u32`    |
| 64               | `i64`  | `u64`    |

```inference
let small: i8 = 127;
let byte: u8 = 255;
let number: i32 = 42;
let big: i64 = 1000000;
let positive: u32 = 0;
```

`i32` is the most common integer type and maps directly to a 32-bit integer in WebAssembly.

## Boolean Type

```inference
let flag: bool = true;
let done: bool = false;
```

## Array Type

Fixed-size arrays are written as `[T; N]`, where `T` is the element type and `N` is a compile-time constant:

```inference
let numbers: [i32; 3] = [1, 2, 3];
```

See [Arrays](../arrays/arrays.md) for full coverage.

## Struct Type

User-defined types with named fields:

```inference
struct Point {
    x: i32;
    y: i32;
}

let p: Point = Point { x: 10, y: 20 };
```

Methods are declared inside the struct body, after the fields — see [Functions](functions.md) for details.

## Enum Type

A type with a fixed set of named variants:

```inference
enum Color { Red, Green, Blue }

let c: Color = Color::Red;
```

See [Enums](../enums/enums.md) for full coverage.

## Floating-Point Types

Inference does not support floating-point types. It uses integer arithmetic to ensure determinism and precision in computations.
