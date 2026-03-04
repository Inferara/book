# Array Basics

## Declaration

Array type is `[T; N]`, where `T` is the element type and `N` is a compile-time constant. Supported element types: all integers and `bool`. Every element must be provided at initialization.

```inference
let numbers: [i32; 3] = [10, 20, 30];
let flags: [bool; 4] = [true, false, true, false];
let bytes: [u8; 2] = [255, 0];
```

## Reading and Writing Elements

```inference
pub fn modify_array() -> i32 {
    let mut data: [i32; 3] = [1, 2, 3];
    let first: i32 = data[0];     // read
    data[0] = 99;                  // write (requires mut)
    data[2] = data[0] + data[1];
    return data[2];                // returns 101
}
```

The index can be any integer expression, not just a literal.

> [!WARNING]
> Inference does not perform array bounds checking at compile time or runtime. Accessing an element beyond the array's size results in undefined behavior.
