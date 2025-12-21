# Functions

A program is a sequence of instructions (or operations) that the computer executes to perform a specific task. Conceptually, a program is a function: it takes some input and produces some output. To write complex programs, we use functions as building blocks to decompose a program into smaller, manageable pieces. Similarly, libraries provide reusable functions that can be called from different programs. The Inference programming language is all about writing functions. As we have already done in the [Hello World](../getting-started/hello-world.md) chapter, the minimal Inference program is a function.

## Anatomy of a Function

In Inference, a general function blueprint looks like this:

```inference
fn function_name() -> return_type {
    ...
}
```

## Function Body

A function body is a sequence of statements enclosed in curly braces `{}`.
