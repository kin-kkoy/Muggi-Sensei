# Feature Specification: CLI Foundation

**Feature Branch**: `001-cli-foundation`
**Created**: 2026-03-15
**Status**: Draft
**Input**: User description: "Basic CLI entry point, interactive session loop, and command parsing for Muggi-Sensei"

## Out of Scope

The following capabilities are intentionally deferred to later features:

- Rich markdown rendering and syntax highlighting (planned: 002+)
- Visual activity indicator / spinner while awaiting LLM response
- Ctrl+C cancellation of in-flight LLM requests
- Model-switching commands (e.g., `/model ...`)
- Session persistence across restarts
- Any commands beyond `/help` and `/exit`

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Launch and Converse (Priority: P1)

A developer opens their terminal and launches Muggi-Sensei. They see a
welcome message and an input prompt. They type a question in plain
language, press enter, and receive a plain-text response from the LLM.
They continue the conversation for several exchanges — the LLM
remembers what was said earlier in the session. When done, they type
`/exit` to end the session.

**Why this priority**: Without a working interactive loop connected to
the LLM, nothing else in Muggi-Sensei functions. This is the minimum
slice that delivers a usable conversational tutor.

**Independent Test**: Launch the tool, send a message, verify a
response appears, send a follow-up that references the first message,
verify context is retained, then exit.

**Acceptance Scenarios**:

1. **Given** the tool is installed, **When** the user runs `muggi`,
   **Then** a welcome message is displayed and an input prompt appears.
2. **Given** the session is active, **When** the user types a message
   and presses enter, **Then** the system sends it to the LLM and
   displays the plain-text response.
3. **Given** the user has sent multiple messages, **When** they
   reference something from an earlier exchange, **Then** the LLM
   response demonstrates awareness of prior context.
4. **Given** the session is active, **When** the user types `/exit`
   or presses Ctrl+D, **Then** the session ends with a farewell
   message.
5. **Given** the session is active, **When** the user submits empty
   input (whitespace only or bare enter), **Then** the prompt
   re-appears without sending anything to the LLM.

---

### User Story 2 - Use Built-in Commands (Priority: P2)

During a conversation, the developer types `/help` to see what
commands are available. The system lists the available commands. If
the developer mistypes a command, they get a clear error pointing
them to `/help`.

**Why this priority**: The command system is the extensibility
mechanism for all future features. Establishing the pattern of
command parsing, registration, and error handling now means later
features can add commands without modifying the core loop.

**Independent Test**: Launch the tool, type `/help`, verify it
lists commands. Type `/foobar`, verify an error message appears
suggesting `/help`.

**Acceptance Scenarios**:

1. **Given** the session is active, **When** the user types `/help`,
   **Then** the system displays a list of available commands with
   brief descriptions.
2. **Given** the session is active, **When** the user types an
   unrecognized command like `/foobar`, **Then** the system displays
   an error message that includes a suggestion to use `/help`.
3. **Given** the session is active, **When** the user types a
   command with arguments like `/help something`, **Then** the
   system parses the command name and arguments separately.

---

### Edge Cases

- What happens when the LLM API is unreachable or returns an error?
  The system MUST display a user-friendly error message and allow the
  user to continue typing or exit — not crash or hang.
- What happens when the user sends an extremely long message? The
  system MUST either forward it to the LLM (letting the API enforce
  limits) or inform the user of a length constraint before sending.
- What happens when the LLM returns an empty response? The system
  MUST display a message indicating no response was received rather
  than printing nothing.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide a single entry-point command
  (`muggi`) that launches an interactive terminal session.
- **FR-002**: System MUST display a welcome message on session start
  that identifies the tool and mentions `/help`.
- **FR-003**: System MUST accept free-text user input and send it to
  the configured LLM backend for response generation.
- **FR-004**: System MUST display LLM responses as plain text in the
  terminal.
- **FR-005**: System MUST maintain conversation history in memory
  within a session so the LLM receives prior context with each
  new message.
- **FR-006**: System MUST support a `/exit` command and Ctrl+D
  (EOF) to end the session gracefully with a farewell message.
- **FR-007**: System MUST support a `/help` command that lists all
  registered commands with descriptions.
- **FR-008**: System MUST parse user input starting with `/` as
  commands, separating the command name from any trailing arguments.
- **FR-009**: System MUST display a clear error message for
  unrecognized commands and suggest `/help`.
- **FR-010**: System MUST provide a command registration mechanism
  so that future features can add new commands without modifying
  the core input loop.
- **FR-011**: System MUST handle LLM API errors gracefully by
  displaying a user-friendly message and returning to the input
  prompt.
- **FR-012**: System MUST ignore empty input (whitespace-only or
  bare enter) and re-display the prompt.

### Key Entities

- **Session**: A single interactive run of the tool from launch to
  exit. Contains a sequence of exchanges. Lives only in memory —
  not persisted.
- **Exchange**: A single user message paired with the corresponding
  LLM response. Ordered within a session.
- **Command**: A registered action identified by a slash-prefixed
  name (e.g., `/help`). Has a name, description, and handler.
  New commands can be registered without changing the core loop.

### Assumptions

- The CLI uses a swappable LLM adapter. The current implementation
  uses a local mock backend so the app can run without external API
  access.
- A real remote backend can be added later behind the same adapter
  without changing the session loop.
- LLM responses are displayed as plain text. No markdown rendering,
  syntax highlighting, or rich formatting in this feature.
- No visual activity indicator while awaiting the LLM response.
  The terminal simply blocks until the response arrives.
- No Ctrl+C handling for cancelling in-flight requests. Standard
  terminal behavior applies (Ctrl+C may terminate the process).
- The only built-in commands are `/help` and `/exit`. The command
  registry exists for extensibility but ships with just these two.
- Conversation history is not persisted. Closing the session
  discards all context.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: User can launch the tool, send a message, and receive
  a response within 30 seconds of first use (including startup).
- **SC-002**: User can hold a multi-turn conversation (5+ exchanges)
  without loss of context within a single session.
- **SC-003**: User can discover available commands via `/help` on
  first use without external documentation.
- **SC-004**: LLM errors do not crash the tool — the user can
  continue the session after any API error 100% of the time.
