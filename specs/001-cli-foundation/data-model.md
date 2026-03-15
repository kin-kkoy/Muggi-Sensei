# Data Model: CLI Foundation

**Feature**: 001-cli-foundation
**Date**: 2026-03-15

## Entities

### Session

An in-memory representation of one interactive run from launch to
exit. Not persisted (persistence is a later feature).

| Field | Type | Description |
|---|---|---|
| exchanges | Exchange[] | Ordered list of user/assistant exchanges |
| startedAt | Date | Timestamp when session launched |

**Constraints**:
- Exchanges are append-only within a session.
- Session exists only in memory; garbage collected on process exit.

### Exchange

A single conversational turn: one user message and one assistant
response.

| Field | Type | Description |
|---|---|---|
| userMessage | string | The raw text the user typed |
| assistantMessage | string | The plain-text LLM response |

**Constraints**:
- userMessage is always non-empty (empty input is filtered before
  creating an Exchange).
- assistantMessage may be empty if the LLM returns no content
  (edge case — surfaced to user as an error message).

### Command

A registered slash command. Commands are defined at startup and
cannot be added or removed during a session.

| Field | Type | Description |
|---|---|---|
| name | string | The command name without slash (e.g., "help") |
| description | string | One-line description shown in /help output |
| handler | function | Async function that executes the command |

**Constraints**:
- name MUST be unique across all registered commands.
- name MUST be lowercase alphanumeric (no spaces or special chars).
- handler receives the raw argument string (everything after the
  command name) and returns void.

## Relationships

```text
Session 1──* Exchange
CommandRegistry 1──* Command
```

- A Session contains zero or more Exchanges in order.
- The CommandRegistry holds all registered Commands. It is
  independent of Session — commands exist regardless of
  conversation state.

## LLM Message Format

The conversation history sent to the Claude API maps directly
from the Exchange list:

```text
Exchange[0].userMessage     → { role: "user", content: "..." }
Exchange[0].assistantMessage → { role: "assistant", content: "..." }
Exchange[1].userMessage     → { role: "user", content: "..." }
...current user input       → { role: "user", content: "..." }
```

The system prompt (defining Muggi-Sensei's persona and teaching
behavior) is sent as the `system` parameter on every API call,
not as a message in the array.
