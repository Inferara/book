# Functions

A program is a sequence of instructions (or operations) that the computer executes to perform a specific task. Conceptually, a program is a function: it takes some input and produces some output. To write complex programs, we use functions as building blocks to decompose a program into smaller, manageable pieces. Similarly, libraries provide reusable functions that can be called from different programs. The Inference programming language is all about writing functions. As we saw in [Hello World](../getting-started/hello-world.md), the smallest Inference program is a function.

## Anatomy of a Function

```inference
pub fn function_name(param1: Type1, param2: Type2) -> ReturnType {
    // function body
}
```

- `pub` makes the function exported from the compiled WebAssembly module. Without `pub`, a function is private to the file.
- `-> ReturnType` declares the return type. Functions without it return nothing.
- `return` is required to return a value — there are no implicit returns.

## Parameters

Each parameter has a name and a type annotation:

```inference
pub fn add(a: i32, b: i32) -> i32 {
    return a + b;
}
```

Parameters are immutable by default. Declare with `mut` to allow modification inside the function body. All values are passed by copy — mutating a parameter does not affect the caller:

```inference
pub fn increment_and_return(mut x: i32) -> i32 {
    x = x + 1;
    return x;
}
```

## Calling Functions

```inference
pub fn example() -> i32 {
    let result: i32 = add(10, 20);
    return result;
}
```

## Function Body

A function body is a sequence of statements enclosed in curly braces `{}`.
