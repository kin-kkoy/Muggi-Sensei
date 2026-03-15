# CLI Command Contract: CLI Foundation

**Feature**: 001-cli-foundation
**Date**: 2026-03-15

## Entry Point

```text
Command: muggi
Arguments: none
Environment: none required for the default mock backend
Behavior: Launches interactive session
Exit codes:
  0 — clean exit via /exit or Ctrl+D
  1 — fatal startup error
```

## Slash Commands

### /help

```text
Input:  /help [ignored-arguments]
Output: Prints list of all registered commands with descriptions
        to stdout. One command per line, format:
          /name  - description
Side effects: None
Returns to: input prompt
```

### /exit

```text
Input:  /exit [ignored-arguments]
Output: Prints farewell message to stdout
Side effects: Closes readline interface, terminates process
Exit code: 0
```

### Unknown command

```text
Input:  /<anything-not-registered> [arguments]
Output: Error message to stderr, format:
          Unknown command: /<name>. Type /help for available commands.
Side effects: None
Returns to: input prompt
```

## Input Handling

```text
Empty input (whitespace or bare enter):
  → Silently re-display prompt. No API call.

Text starting with "/":
  → Parse as command. First token is command name (without "/").
     Remaining text is argument string (may be empty).

All other text:
  → Treat as user message. Send to LLM with conversation history.
     Display response as plain text to stdout.
```

## Error Handling

```text
LLM API error (network, auth, rate limit, etc.):
  → Print user-friendly message to stderr
  → Return to input prompt (do NOT exit)

Empty LLM response:
  → Print notice to stdout: "No response received. Try again."
  → Return to input prompt

Default mock backend:
  → Runs locally with no network or API key

Future real backend:
  → May require environment configuration, but should keep the same
    command and session flow
```
