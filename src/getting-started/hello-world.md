# Hello World

Traditionally, the very first program you write when learning a new programming language is one that prints "Hello, World!" to the screen. In Inference, however, we do not have built-in string and printing functionality. Instead, we will write a simple program that returns a magic number from a function. Later, by executing this program, we will see the result in the terminal.

## Writing the Program

First, we need to create a new file for our program. Inference uses the `.inf` file extension for its source code files. Create a new file named `hello_world.inf` and open it in your favorite text editor. Then, add the following code to the file:

```inference
pub fn hello_world() -> i32 {
    return 42;
}
```

This code defines a function named `hello_world` that takes no parameters and returns a 32-bit signed integer (`i32`). The function simply returns the number `42`.

### Understanding the Code

Let's break down the code to understand its components:
- `pub` is a visibility keyword that marks the function as exported from the compiled WebAssembly module, making it callable from outside;
- `fn` is a keyword used to define a function in Inference;
- `hello_world` is the name of the function;
- `()` is a pair of parentheses that groups the function parameters. In this case, there are no parameters;
- `->` reads as "right arrow" and indicates the return type of the function;
- `i32` specifies that the function returns a 32-bit signed integer;
- `return` is a keyword used to return a value from a function;
- `42` is the integer value (or literal) being returned by the function.

> In the appendix, [Language Reference](../appendix/a-language-reference.md), you can find more information about Inference keywords and data types.

## Compiling the Program

To compile an `.inf` file into a WebAssembly module, use the `infs build` command. Open your terminal, navigate to the directory where you saved `hello_world.inf`, and run the following command:

On Linux or macOS:

```bash
$ infs build hello_world.inf
```

On Windows:

```powershell
> infs build hello_world.inf
```

The compiler will generate a WebAssembly binary module at `out/hello_world.wasm`.

## Formal Verification and Rocq

A unique feature of the Inference programming language is its focus on *formal verification*. This means you can mathematically prove that your code is correct and follows its specification.

To support this, the compiler can translate your Inference code into **Rocq** (formerly known as Coq), a powerful interactive theorem prover. These translations are stored in files with a `.v` extension.

While you do not need to know Rocq to write and run Inference programs, you will see `.v` files and Rocq translations mentioned throughout this book. Many code examples include a **v** tab that shows how the code is represented for the theorem prover.

For more information on how to generate and use these files, see [Appendix D - Compilation modes](../appendix/d-infs-reference.md#compilation-modes).

> [!Note]
> You can also use the `infc` compiler directly as an alternative:
>
> ```bash
> $ infc hello_world.inf
> ```
>
> Both commands produce the same output.

## Running the Program

To execute the compiled WebAssembly module, we can use any preferred Wasm runtime. In this example and throughout this book, we will use `wasmtime`, a popular and easy-to-use Wasm runtime. You can install and learn more about `wasmtime` from its [official website](https://wasmtime.dev/).

Once you have `wasmtime` installed, you can run the compiled module using the following command:

On Linux or macOS:

```bash
$ wasmtime out/hello_world.wasm --invoke hello_world
```

On Windows:

```powershell
> wasmtime out/hello_world.wasm --invoke hello_world
```

As a result, you will see the output `42` printed in the terminal, which is the value returned by the `hello_world` function.

Congratulations! You have successfully written, compiled, and executed your first Inference program. In the next chapters, we will explore more features of the Inference programming language.
