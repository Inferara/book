# Data Types

Inference is a statically typed language, which means every value and variable must have a known type at compile time. This allows the compiler to catch type-related errors early in the development process, leading to more reliable and maintainable code.

## Integer Types

An integer is a numeric type that represents whole numbers without fractional components. We already encountered the `i32` integer type in the [Hello World](../getting-started/hello-world.md) example. The leading `i` stands for "integer," and the number `32` indicates how many bits are used to represent the value. The highest-order bit is used for the sign: `0` for non-negative values and `1` for negative values. Thus, the standard calculation for the range of values that can be represented by a signed integer type is from `-2^(n-1)` to `2^(n-1) - 1`, where `n` is the number of bits.

Integer types are language primitives and cannot be extended or modified. Inference supports the following integer types:

| Length (in bits) | Type name|
|------------------|----------|
| `32`             | `i32`    |

## Floating-Point Types

Inference does not support floating-point types. Instead, it focuses on integer and fixed-point arithmetic to ensure determinism and precision in computations. This design choice is particularly important for applications requiring high assurance and correctness.
