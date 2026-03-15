# Quickstart: CLI Foundation

## Prerequisites

- Node.js 20+ installed
- An Anthropic API key (set as `ANTHROPIC_API_KEY` environment
  variable)

## Setup

```bash
# Clone and install
git clone <repo-url>
cd muggi-sensei
npm install

# Set your API key
export ANTHROPIC_API_KEY="sk-ant-..."
```

## Run (Development)

```bash
npm run dev
```

This launches the interactive session using `tsx` (no build step).

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
A closure is a function that remembers the variables from its
outer scope even after that scope has finished executing...

muggi> Can you give me an example?
Sure! Here's a simple example...

muggi> /help
Available commands:
  /help  - Show this help message
  /exit  - End the session

muggi> /exit
Goodbye! Happy coding.
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
- **SC-004**: Disconnect network, send a message — error message
  should appear, session should remain active.
