# Installation

To install Inference you need to download the compiler binary for your operating system from the [`infc` GitHub Releases page](https://github.com/Inferara/inference/releases).

> **Command Line Notation**
>
> In this book, commands you should type in a terminal start with `$`. Do not type the `$` itself; it is just the prompt. Lines without `$` show the output of the previous command. PowerShell examples use `>` instead of `$`.

## Downloading the Compiler

> [!Tip]
> If you prefer automated installation with PATH configuration, use the `infs` toolchain manager instead: `infs install`. See [Appendix D - infs CLI Reference](../appendix/d-infs-reference.md) for details.

The Inference compiler (`infc`) is distributed as a single standalone binary with no external dependencies. It compiles Inference source code directly to WebAssembly without requiring any additional tools for compilation.

Download the appropriate package for your operating system from the [GitHub Releases](https://github.com/Inferara/inference/releases) page.

## Installing on Linux and macOS

Download the release archive, extract it, and you will find the `infc` binary:

```bash
$ tar xzf infc-linux-x64.tar.gz
```

## Installing on Windows

Download the zip archive and extract it. You will find the `infc.exe` binary. No additional libraries or dependencies are required.

## Package Contents

After extracting the archive, you will have:

```
infc            (or infc.exe on Windows)
```

That's it — just the compiler binary. The Inference compiler generates WebAssembly modules directly, with no external toolchain needed.

## Verifying the Download

To verify the integrity of the downloaded package, check its SHA256 checksum. The checksum is listed on the GitHub Releases page.

On Linux/macOS:

```bash
$ sha256sum infc-linux-x64.tar.gz
```

On Windows:

```powershell
> Get-FileHash infc-windows-x64.zip -Algorithm SHA256
```

## Adding `infc` to your PATH

On Linux/macOS, add the following line to your shell configuration file (e.g., `~/.bashrc`, `~/.zshrc`):

```bash
$ export PATH=$PATH:/path/to/infc-directory
```

On Windows, run the following command in PowerShell:

```powershell
> $env:Path += ";C:\path\to\infc-directory"
```

> [!Tip]
> If you use the `infs` toolchain manager, it handles PATH configuration automatically. See [Appendix D - infs CLI Reference](../appendix/d-infs-reference.md) for details.

## Installing a WebAssembly Runtime

To run compiled WebAssembly modules, you need a WASM runtime. This book uses [wasmtime](https://wasmtime.dev/), a popular and easy-to-use runtime. Visit its [official website](https://wasmtime.dev/) for installation instructions.

> [!Note]
> `wasmtime` is only needed if you want to execute compiled programs locally. The Inference compiler itself does not require it.

## Editor Support

Inference has an official Visual Studio Code extension that provides syntax highlighting and language support. You can install it from the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=inference-lang.inference) or search for "Inference" in the VS Code extensions panel.

## Verifying the Installation

Once installed, verify that the compiler is available:

```bash
$ infc --version
$ infs version
```

You should see the version printed in the terminal.
