# D - infs CLI Reference

`infs` is the unified command-line interface for the Inference compiler toolchain. It wraps the `infc` compiler with project management, toolchain installation, and build/run commands.

## Compilation Commands

| Command | Description |
|---------|-------------|
| `infs build <file>` | Compile an Inference source file to WebAssembly |
| `infs run <file>` | Build and execute with wasmtime |

### Build Options

When no phase flag is given, `infs build` runs the full pipeline and writes `out/<name>.wasm`. The phase flags below stop the pipeline early — supplying one means only that phase (and any required predecessors) runs.

| Option | Description |
|--------|-------------|
| `--parse` | Parse only (syntax check). No output file written |
| `--analyze` | Run parse + type checking and semantic analysis. No output file written |
| `--codegen` | Run the full pipeline and generate WebAssembly. Use with `-o` to write the binary |
| `-o` | Write WASM binary to `out/<name>.wasm` (implied when no phase flag is given) |
| `-v` | Also generate Rocq (`.v`) translation file. Implies `proof` compilation mode — see [Compilation modes](#compilation-modes) below |

### Run Options

| Option | Description |
|--------|-------------|
| `--entry-point <NAME>` | Function to invoke (default: `main`) |
| `[ARGS]...` | Arguments passed to the invoked function |

### Examples

```bash
# Full compilation (writes out/example.wasm)
$ infs build example.inf

# Compile with Rocq translation (writes out/example.wasm and out/example.v)
$ infs build example.inf -v

# Build and run
$ infs run example.inf

# Run a specific exported function
$ infs run example.inf --entry-point my_function
```

### Using `infc` Directly

The underlying `infc` compiler accepts the same phase and output flags as `infs build` and can be invoked standalone — useful for embedding into custom build systems or CI without the toolchain wrapper:

```bash
$ infc example.inf
$ infc example.inf --parse
$ infc example.inf -v
```

When no flags are given, `infc` performs full compilation and writes the WASM binary — equivalent to `--codegen -o`.

> [!Note]
> `infc` currently supports single-file compilation only. Multi-file projects and project file (`.infp`) support are planned for future releases.

## Compilation modes

The compiler has two modes that change how `spec` blocks and non-deterministic constructs are handled:

- **`compile`** (default): produces a release-optimized WASM binary intended for execution. `spec` blocks are stripped during codegen, so non-deterministic constructs (`@`, `forall`, `exists`, `assume`, `unique`) that appear only inside `spec` blocks do not reach the output.
- **`proof`** (implied by `-v`): keeps `spec` functions unoptimized so the structure of the source survives into the Rocq translation. The compiler emits both `out/<name>.wasm` and `out/<name>.v`. The `.v` file is a Rocq (Coq) translation suitable for formal verification.

In other words: use the default mode when you want to run the program; pass `-v` when you want to prove things about it.

## Project Management

| Command | Description |
|---------|-------------|
| `infs new <name>` | Create a new project in a new directory |
| `infs init` | Initialize a project in the current directory |

### Creating a New Project

```bash
$ infs new myproject
```

This creates the following project structure:

```
myproject/
├── Inference.toml
├── src/
│   └── main.inf
├── tests/
└── proofs/
```

The generated `src/main.inf` contains a minimal program:

```inference
// Entry point for the Inference program

pub fn main() -> i32 {
    return 0;
}
```

Use `--no-git` to skip git initialization:

```bash
$ infs new myproject --no-git
```

### Initializing an Existing Directory

```bash
$ infs init
```

Creates `Inference.toml` and `src/main.inf` in the current directory. If a `.git` directory exists, it also creates `.gitignore` and `.gitkeep` files.

## Toolchain Management

| Command | Description |
|---------|-------------|
| `infs install [version]` | Install a toolchain version |
| `infs uninstall <version>` | Remove an installed toolchain |
| `infs list` | List installed toolchains |
| `infs versions` | List available toolchain versions |
| `infs default <version>` | Set the default toolchain |
| `infs doctor` | Check installation health |
| `infs self update` | Update infs itself |

### Installing a Toolchain

```bash
# Install latest stable version
$ infs install

# Install a specific version
$ infs install 0.1.0
```

On first install, `infs` automatically configures your system PATH:

- **Linux/macOS**: Adds `~/.inference/bin` to your shell profile (`~/.bashrc`, `~/.zshrc`, or `~/.config/fish/config.fish`)
- **Windows**: Updates the user PATH in the registry

After installation, restart your terminal or source your shell profile.

### Checking Installation Health

```bash
$ infs doctor
```

This runs diagnostic checks and provides recommendations if anything needs attention.

## Other Commands

| Command | Description |
|---------|-------------|
| `infs version` | Display version information |
| `infs` (no arguments) | Launch interactive TUI (experimental) |

## Compiler Resolution

When running `build` or `run`, `infs` locates the `infc` compiler using the following priority:

| Priority | Source | Description |
|----------|--------|-------------|
| 1 (highest) | `INFC_PATH` env var | Explicit path to a specific `infc` binary |
| 2 | System PATH | Finds `infc` via `which` |
| 3 (lowest) | Managed toolchain | Uses `~/.inference/toolchains/VERSION/infc` |

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `INFC_PATH` | Explicit path to `infc` binary (highest priority) |
| `INFERENCE_HOME` | Toolchain installation directory (default: `~/.inference`) |
| `INFS_NO_TUI` | Disable interactive TUI |
| `INFS_DIST_SERVER` | Distribution server URL (default: `https://inference-lang.org`) |
