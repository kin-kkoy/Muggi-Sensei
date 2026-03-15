# Quickstart: CLI Foundation

## Prerequisites

- Node.js 20+ installed

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

This launches the interactive session using the default mock tutor
adapter via `tsx` (no build step).

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
You asked about: What is a closure in JavaScript?
Start by breaking the problem into one small step you can explain in your own words.
If you want, ask for an example or a simpler version next.

muggi> Can you give me an example?
Here is a simple example related to your earlier question about: What is a closure in JavaScript?
1. Start with a tiny input.
2. Describe what the code should do.
3. Trace the result one line at a time.

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
- **SC-004**: The CLI should keep running without any network or API
  key requirement when using the default mock backend.
