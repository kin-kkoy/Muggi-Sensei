# Research: CLI Foundation

**Feature**: 001-cli-foundation
**Date**: 2026-03-15

## 1. Language & Runtime

**Decision**: TypeScript on Node.js (ES modules, `"type": "module"`)

**Rationale**: User choice. Strong Anthropic SDK support, fast
prototyping, good CLI ecosystem. TypeScript provides type safety
without the overhead of compiled languages.

**Alternatives considered**: Python (rich CLI tooling, but user
preference is TypeScript), Go (single binary but weaker LLM
ecosystem), Rust (too much overhead for hobby project).

## 2. Provider Backend

**Decision**: Small provider abstraction with `codex exec` as the
first backend

**Rationale**:
- Keeps Muggi focused on the CLI shell while delegating response
  generation to Codex
- Preserves a clean seam for later backend swaps
- Conversation history is manual: maintain a message array and
  append user/assistant messages each turn
- `codex exec --output-last-message` gives a simple way to capture
  the final assistant reply

**Alternatives considered**: Direct Anthropic integration, and a
local mock backend. Rejected because the current goal is to run Muggi
through Codex while still keeping the CLI shell separate.

## 3. Interactive CLI

**Decision**: `node:readline/promises` (Node.js built-in)

**Rationale**:
- Zero dependencies. Available in all current Node.js LTS versions.
- `rl.question('muggi> ')` for prompt + input in one call.
- Ctrl+D handled via `'close'` event or try/catch on question().
- Empty input: check `input.trim() === ''` and continue.
- Command parsing: `input.startsWith('/')` — no framework needed
  for two commands.

**Alternatives considered**: inquirer, prompts, vorpal — all
unnecessary overhead for a REPL loop with two slash commands.

## 4. Testing

**Decision**: Vitest

**Rationale**:
- TypeScript support out of the box — no ts-jest or babel config.
- Native ESM support (aligns with project's `"type": "module"`).
- Jest-compatible API (`describe`, `it`, `expect`).
- Faster cold start and watch mode than Jest.
- Zero-config for basic usage — picks up tsconfig.json automatically.

**Alternatives considered**: Jest 30 (improved but still requires
more configuration for TypeScript + ESM).

## 5. Dependency Audit

**Decision**: Minimal dependency set.

| Dependency | Type | Purpose |
|---|---|---|
| `typescript` | dev | Compiler |
| `vitest` | dev | Testing |
| `tsx` | dev | Run .ts directly during development |

**Not needed (YAGNI)**:
- Commander/yargs/oclif — two commands, simple string parsing
- Anthropic SDK — backend responses come from `codex exec`
- chalk/colors — plain text output for MVP
- ora/spinners — out of scope for this feature
- inquirer/prompts — readline/promises is sufficient

## 6. Project Configuration

**Decision**: ES modules with `nodenext` module resolution.

**Key config choices**:
- `tsconfig.json`: target ES2022, module/moduleResolution nodenext,
  strict mode, outDir dist, rootDir src
- `package.json`: `"type": "module"`, bin entry `"muggi": "./dist/index.js"`
- Dev workflow: `tsx src/index.ts` for rapid iteration without build
- Build: `tsc` compiles to dist/
- Shebang `#!/usr/bin/env node` at entry point for bin command
