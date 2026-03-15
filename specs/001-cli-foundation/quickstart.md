# Quickstart: CLI Foundation

## Prerequisites

- Node.js 20+ installed
- `codex` installed and available on your `PATH`

## Setup

```bash
# Clone and install
git clone <repo-url>
cd muggi-sensei
npm install
```

## Run (Development)

```bash
npm run dev
```

This launches the interactive session using Muggi as the shell and
`codex exec` as the response backend via `tsx` (no build step).

## Run (Built)

```bash
npm run build
npm start
# or, after npm link:
muggi
```

## Usage

```text
Welcome to Muggi-Sensei! Type /help for commands.

muggi> What is a closure in JavaScript?
A closure is a function that can keep access to variables from its
outer scope even after that outer function has finished running.

muggi> Can you give me an example?
Sure. A common example is a function that returns another function
which still remembers a counter variable.

muggi> /exit
Goodbye!
```

## Run Tests

```bash
npm test
```

## Verify Success Criteria

- **SC-001**: Launch with `npm run dev`, type a message — response
  should appear within 30 seconds.
- **SC-002**: Hold 5+ exchanges referencing earlier context — LLM
  should maintain awareness.
- **SC-003**: Type `/help` — command list should appear.
- **SC-004**: If `codex exec` fails during a request, Muggi should
  show an error and remain usable.
