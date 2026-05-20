# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

User-facing book for the **Inference Programming Language**, built with [mdBook](https://rust-lang.github.io/mdBook/). The structure follows "The Rust Programming Language" book. The published artifact is a static site served from an `nginx:alpine` Docker image.

Inference itself lives in another repo; this one only contains the documentation. The language is statically typed, Rust-syntax-flavored, and compiles to WebAssembly — keep that mental model when writing or editing examples.

## Commands

```bash
mdbook build      # render src/ → book/  (book/ is gitignored)
mdbook serve      # local preview with live reload on http://localhost:3000
docker build .    # full publishable image (mdbook build + nginx serve)
```

There are no tests or linters — the only "build verification" is `mdbook build` succeeding and the Dockerfile completing.

## Architecture

- `src/SUMMARY.md` is the **single source of truth for the table of contents**. mdBook will not render a chapter unless it is linked from here. New pages require both a new `.md` file and a `SUMMARY.md` entry.
- `book.toml` configures mdBook (title, themes, smart-punctuation, definition-lists, admonitions). Don't add features here without also confirming `mdbook build` in the Docker image still works — the builder image installs a pinned `mdbook` via `cargo install mdbook --locked`.
- `theme/highlight.js` is a **custom stub that replaces** the default highlight.js bundled by mdBook. It tokenizes ```inference code blocks only, emitting standard `hljs-*` classes so all built-in mdBook themes work.
  - **When the Inference language gains a new keyword, builtin type, or syntactic form, update the `KEYWORDS` and `BUILTINS` regexes near the top of this file.** Otherwise new constructs render as plain identifiers.
  - This is also the reason there is no `highlight.css` override — the stub deliberately reuses mdBook's bundled hljs CSS.
- `book/` is the build output and is in `.gitignore`. Never commit it; never edit files there directly.
- CI: `.github/workflows/pr-build.yml` runs `docker build` on PRs (no push). `.github/workflows/publish.yml` runs on push to `main` and pushes `georgii4inferara/inference-book:latest` + a run-numbered tag to Docker Hub.

## Conventions for content

- Code samples use ```inference fenced blocks so the custom highlighter picks them up. Other languages (e.g. ```bash for shell) fall back to mdBook's default highlighting, which is fine.
- Internal cross-references use relative markdown links (e.g. `[Arrays](../arrays/arrays.md)`), not anchors built from chapter titles — these resolve correctly both on disk and in the rendered site.
- The book mirrors the Rust Book's tone and pedagogical order; preserve that voice when adding chapters.
