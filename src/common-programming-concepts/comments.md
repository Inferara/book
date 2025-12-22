# Comments

Programmers often use comments to explain parts of the code that might be hard to understand or that need additional context. Comments can also describe, at a high level, what a file or function is responsible for. For these purposes, Inference supports two kinds of comments: single-line comments and docstring-style comments. Both kinds of comments are ignored by the compiler and are not part of the program itself.

Here is a simple single-line comment:

```inference
// This is a single-line comment
```

This is treated as a comment because the line starts with the two characters `//`. Everything that follows `//` on the same line is considered a comment and is ignored by the compiler.

You can attach a comment to a line of code, for example:

```inference
42; // The universal answer
```

For more descriptive explanations, Inference supports docstring-style comments that can span multiple lines. These comments start with triple forward slashes `///`. Each line that begins with `///` is treated as part of the same docstring comment block. For example:

```inference
/// This library provides verified cryptographic functions and primitives
/// for working with zero-knowledge proofs.
```
