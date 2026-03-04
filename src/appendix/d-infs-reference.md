# D - infs CLI Reference

`infs` is the unified command-line interface for the Inference compiler toolchain. It wraps the `infc` compiler with project management, toolchain installation, and build/run commands.

## Compilation Commands

| Command | Description |
|---------|-------------|
| `infs build <file>` | Compile an Inference source file to WebAssembly |
| `infs run <file>` | Build and execute with wasmtime |

### Build Flags

| Flag | Description |
|------|-------------|
| `--parse` | Parse only (syntax check) |
| `--analyze` | Run type checking |
| `--codegen` | Generate WebAssembly |
| `-o` | Write WASM binary to the `out/` directory |
| `-v` | Generate Rocq (.v) translation file |

When no flags are given, `infs build` performs full compilation and writes the WASM binary to disk — equivalent to `--codegen -o`.

### Examples

```bash
# Full compilation (default)
$ infs build example.inf

# Parse only (syntax check)
$ infs build example.inf --parse

# Type checking
$ infs build example.inf --analyze

# Build and run
$ infs run example.inf
```

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
