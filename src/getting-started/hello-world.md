# Hello World

Traditionally, the very first program you write when learning a new programming language is one that prints "Hello, World!" to the screen. In Inference, however, we do not have built-in string and printing functionality. Instead, we will write a simple program that returns a magic number from a function. Later, by executing this program, we will see the result in the terminal.

## Writing the Program

First, we need to create a new file for our program. Inference uses the `.inf` file extension for its source code files. Create a new file named `hello_world.inf` and open it in your favorite text editor. Then, add the following code to the file:

```inference
fn hello_world() -> i32 {
    return 42;
}
```

This code defines a function named `hello_world` that takes no parameters and returns a 32-bit signed integer (`i32`). The function simply returns the number `42`.

### Understanding the Code

Let's break down the code to understand its components:
- `fn` is a keyword used to define a function in Inference;
- `hello_world` is the name of the function;
- `()` is a pair of parentheses that groups the function parameters. In this case, there are no parameters;
- `->` reads as "right arrow" and indicates the return type of the function;
- `i32` specifies that the function returns a 32-bit signed integer;
- `return` is a keyword used to return a value from a function;
- `42` is the integer value (or literal) being returned by the function.

> In the appendix, [Language Reference](../appendix/language-reference.md), you can find more information about Inference keywords and data types.

We see that the `hello_world` function is defined without any container or module. If Inference sees such a function in a file, a standard module is created automatically and the function is placed inside it. To be able to call this function from outside the module, the `export` attribute is added automatically to the function.

## Compiling the Program

To compile an `.inf` file into an executable binary, we use the Inference compiler, which is invoked via the command line using the `infc` command. Open your terminal, navigate to the directory where you saved `hello_world.inf`, and run the following command:

On Linux or macOS:
```bash
$ infc hello_world.inf
```

On Windows:
```powershell
> infc hello_world.inf
```

As a result, the compiler will generate a Wasm binary module named `hello_world.wasm` in the same directory.

## Running the Program

To execute the compiled Wasm binary, we can use any preferred Wasm runtime. In this example and in this book, we will use `wasmtime`, a popular and easy-to-use Wasm runtime. You can install and learn more about `wasmtime` from its [official website](https://wasmtime.dev/).

Once you have `wasmtime` installed, you can run the `hello_world.wasm` binary using the following command:

On Linux or macOS:
```bash
$ wasmtime hello_world.wasm --invoke hello_world
```

On Windows:
```powershell
> wasmtime hello_world.wasm --invoke hello_world
```

As a result, you will see the output `42` printed in the terminal, which is the value returned by the `hello_world` function.
Congratulations! You have successfully written, compiled, and executed your first Inference program. In the next chapters, we will explore more features of the Inference programming language.