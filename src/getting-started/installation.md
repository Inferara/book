# Installation

The recommended way to install Inference is via `infs`, the unified toolchain manager. `infs` downloads the compiler, manages multiple toolchain versions, and configures your `PATH` automatically.

> **Command Line Notation**
>
> In this book, commands you should type in a terminal start with `$`. Do not type the `$` itself; it is just the prompt. Lines without `$` show the output of the previous command. PowerShell examples use `>` instead of `$`.

## Recommended: install with `infs`

Download the `infs` binary for your platform from the [GitHub Releases](https://github.com/Inferara/inference/releases) page, place it on your `PATH`, then install a compiler toolchain:

```bash
$ infs install
```

On first install, `infs` configures your shell `PATH` automatically:

- **Linux/macOS**: appends `~/.inference/bin` to `~/.bashrc`, `~/.zshrc`, or `~/.config/fish/config.fish`.
- **Windows**: updates the user `PATH` in the registry.

After installation, restart your terminal (or source your shell profile) and verify:

```bash
$ infs version
$ infc --version
```

You should see both versions printed.

To install a specific toolchain version instead of the latest:

```bash
$ infs install 0.0.1
```

See [Appendix D - infs CLI Reference](../appendix/d-infs-reference.md) for the full set of toolchain commands (`list`, `default`, `doctor`, `uninstall`, `self update`).

## Manual installation

If you prefer to manage the compiler binary yourself — for CI environments, sandboxed setups, or to integrate `infc` into an existing build system — download the standalone compiler from the [`infc` GitHub Releases page](https://github.com/Inferara/inference/releases). It is a single binary with no external dependencies.

### Linux and macOS

Download the release archive and extract the `infc` binary:

```bash
$ tar xzf infc-linux-x64.tar.gz
```

### Windows

Download the zip archive and extract `infc.exe`. No additional libraries or dependencies are required.

### Adding `infc` to your `PATH`

On Linux/macOS, add the following line to your shell configuration file (e.g., `~/.bashrc`, `~/.zshrc`):

```bash
$ export PATH=$PATH:/path/to/infc-directory
```

On Windows, run the following in PowerShell:

```powershell
> $env:Path += ";C:\path\to\infc-directory"
```

### Verifying the download

To verify the integrity of the downloaded package, check its SHA256 checksum. The checksum is listed on the GitHub Releases page.

On Linux/macOS:

```bash
$ sha256sum infc-linux-x64.tar.gz
```

On Windows:

```powershell
> Get-FileHash infc-windows-x64.zip -Algorithm SHA256
```

## Installing a WebAssembly runtime

To run compiled WebAssembly modules, you need a WASM runtime. This book uses [wasmtime](https://wasmtime.dev/), a popular and easy-to-use runtime. Visit its [official website](https://wasmtime.dev/) for installation instructions.

> [!Note]
> `wasmtime` is only needed if you want to execute compiled programs locally. The Inference compiler itself does not require it.

## Editor support

Inference has an official Visual Studio Code extension that provides syntax highlighting and language support. Install it from the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=inference-lang.inference) or search for "Inference" in the VS Code extensions panel.
