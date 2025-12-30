# Installation

To install Inference you need to download binary files for your operating system from the [`infc` GitHub Releases page](https://github.com/inference/infc/releases).

>**Command Line Notation**
>
> In this book, commands you should type in a terminal start with `$`. Do not type the `$` itself; it is just the prompt. Lines without `$` show the output of the previous command. PowerShell examples use `>` instead of `$`.

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

`infc` is distributed with required dependencies in a compressed archive. After downloading the appropriate package for your operating system, extract its contents to a directory of your choice. And verify that you have the following files in the extracted directory:

```
infc-directory
├──bin
│   └── inf-llvm            (or inf-llvm.exe on Windows)
│   └── rust-lld            (or rust-lld.exe on Windows)
├──lib                      (Linux only)
│    └── libLLVM.so.*       (LLVM shared library)
├──check_deps.ps1           (Windows only)
└──infc                     (or infc.exe on Windows)
```

Understading the files:

- `infc` is the Inference compiler executable;
- `inf-llvm` is a custom LLVM toolchain used by the Inference compiler to generate binaries;
- `rust-lld` is a Rust linker used by the Inference compiler to link compiled modules into executable binaries.
- `libLLVM.so.*` is the LLVM shared library required by `inf-llvm` on Linux systems;
- `check_deps.ps1` is a PowerShell script to verify that all required dependencies are installed on Windows systems.

## Ensure Required Dependencies are Installed on Windows

On Windows, open PowerShell, navigate to the extracted `infc` directory, and run the following command to check for required dependencies:

```powershell
> .\check_deps.ps1
```

>[!Tip]
>If you encounter an execution policy error, right click the check_deps.ps1 file in file explorer, select `Properties`, and choosing `Unblock` if that option appears at the bottom of the `Properties` tab.

This script will verify that all necessary dependencies are installed on your system. If any dependencies are missing, the script will ask your permission to install them automatically using `pacman`.

>[!Note]
>The script assumes you have  MSYS2 installed in C:\msys64

As a final result, you should see the following output:

```plaintext
--- INFC Dependency Check Starting ---
Directory: D:\GitHub\infc
[FOUND]    libwinpthread-1.dll (in PATH: C:\msys64\ucrt64\bin\libwinpthread-1.dll)
[FOUND]    libffi-8.dll (in PATH: C:\msys64\ucrt64\bin\libffi-8.dll)
[FOUND]    libgcc_s_seh-1.dll (in PATH: C:\msys64\ucrt64\bin\libgcc_s_seh-1.dll)
[FOUND]    libzstd.dll (in PATH: C:\msys64\ucrt64\bin\libzstd.dll)
[FOUND]    zlib1.dll (in PATH: C:\msys64\ucrt64\bin\zlib1.dll)
---------------------------------
SUCCESS: All identified dependencies are present.
Ready to run Inference
```

## Add `infc` to your system PATH:

On Linux/macOS, add the following line to your shell configuration file (e.g., `~/.bashrc`, `~/.zshrc`):

```bash
$ export PATH=$PATH:/path/to/infc
```

On Windows, run the following command in PowerShell:

```powershell
> $env:Path += ";C:\path\to\infc"
```
