# C - Inference Compiler

`infc` is the official compiler for the Inference programming language. It takes `.inf` source files and produces WebAssembly modules directly, with no external toolchain needed.

`infs` is the unified CLI that wraps `infc` with project management, toolchain installation, and build/run commands. See [Appendix D](./d-infs-reference.md) for the full `infs` reference.

Both tools are open source and available in the [`inference`](https://github.com/Inferara/inference) GitHub repository. Refer there for the latest releases, discussions, and feature or bug tracking.

For a deep dive into how the compiler is built — the parser, static-analysis rules, WASM codegen, the memory model, the linker, and the `infs` project model — see [The Inference Compiler Book](https://inference-lang.org/compiler-book/), a set of design and implementation notes for the toolchain.
