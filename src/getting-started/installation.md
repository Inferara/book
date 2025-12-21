# Installation

To install Inference you need to download binary files for your operating system from the [`infc` GitHub Releases page](https://github.com/inference/infc/releases).

>**Command Line Notation**
>
>In this chapter and throughout the book, we'll show some commands used in the terminal. Lines that you should enter in a terminal all start with `$`. You don't need to type the `$` character; it's the command line prompt shown to indicate the start of each command. Lines that don't start with `$` typically show the output of the previous command. Additionally, PowerShell-specific examples will use `>` rather than `$`.

## Installing Inference on Linux


## Installing Inference on Windows

## Verifying Downloaded Package

To verify the integrity of the downloaded package, you can check its SHA256 checksum. The checksum value is provided on the `infc` GitHub Releases page alongside the download links.

On Linux/macOS, run the following command in the terminal:

```bash
$ sha256sum infc-linux-x86_64.tar.gz
```
On Windows, run the following command in PowerShell:

```powershell
> Get-FileHash infc-windows-x86_64.zip -Algorithm SHA256
```

`infc` is distributed with required dependencies in a compressed archive. After downloading the appropriate package for your operating system, extract its contents to a directory of your choice. And verify having the following files in the extracted directory:

```
infc-directory
├──bin
│   └── inf-llvm (or inf-llvm.exe on Windows)
│   └── rust-lld (or rust-lld.exe on Windows)
└──infc (or infc.exe on Windows)
```

Understading the files:

- `infc` is the Inference compiler executable;
- `inf-llvm` is a custom LLVM toolchain used by the Inference compiler to generate binaries;
- `rust-lld` is a Rust linker used by the Inference compiler to link compiled modules into executable binaries.

## Add `infc` to your system PATH:

On Linux/macOS, add the following line to your shell configuration file (e.g., `~/.bashrc`, `~/.zshrc`):

```bash
export PATH=$PATH:/path/to/infc
```

On Windows, run the following command in PowerShell:

```powershell
$env:Path += ";C:\path\to\infc"
```
