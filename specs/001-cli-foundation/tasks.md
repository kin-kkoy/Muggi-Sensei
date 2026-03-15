# Tasks: CLI Foundation

**Input**: Design documents from `/specs/001-cli-foundation/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/

**Tests**: Included as test-after tasks per Constitution Principle V (Test-After Discipline).

**Organization**: Tasks grouped by user story. Setup and Foundational phases contain shared infrastructure needed by both stories.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Phase 1: Setup

**Purpose**: Project initialization and TypeScript/Node.js configuration

- [ ] T001 Initialize package.json with name "muggi-sensei", version "0.1.0", type "module", bin entry "muggi" → "./dist/index.js", scripts (build, dev, start, test) in package.json
- [ ] T002 [P] Create tsconfig.json with target ES2022, module nodenext, moduleResolution nodenext, strict true, outDir dist, rootDir src in tsconfig.json
- [ ] T003 [P] Add node_modules/ and dist/ to .gitignore
- [ ] T004 Install dependencies: typescript, vitest, tsx, and Node type support via npm install

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared types and command registry mechanism needed by both user stories

**CRITICAL**: No user story work can begin until this phase is complete

- [ ] T005 Define TypeScript interfaces for Exchange (userMessage, assistantMessage) and Session (exchanges, startedAt) in src/types.ts
- [ ] T006 Implement CommandRegistry class with register(name, description, handler), get(name), getAll(), and has(name) methods in src/commands.ts
- [ ] T007 Register /exit command in src/commands.ts that prints farewell message to stdout and calls process.exit(0)

**Checkpoint**: Foundation ready — command registry works, types defined, /exit available

---

## Phase 3: User Story 1 - Launch and Converse (Priority: P1) MVP

**Goal**: User can launch muggi, send messages to the LLM, receive plain-text responses, maintain multi-turn context, and exit

**Independent Test**: Run `npm run dev`, type a message, verify response appears, send follow-up referencing first message, verify context retained, type `/exit`

### Implementation for User Story 1

- [ ] T008 [US1] Implement provider wrapper in src/llm.ts: define provider interface, use `codex exec` to generate the next response from Muggi's conversation history, catch and rethrow backend errors with user-friendly messages, handle empty responses
- [ ] T009 [US1] Implement session loop in src/session.ts: create readline interface, display welcome message mentioning /help, prompt loop with rl.question(), skip empty/whitespace input, detect "/" prefix and dispatch to CommandRegistry, otherwise send accumulated conversation history to the provider, display plain-text response, handle Ctrl+D via close event
- [ ] T010 [US1] Create entry point in src/index.ts: shebang line (#!/usr/bin/env node), verify `codex` is available or print an error to stderr and exit(1), bootstrap session loop

**Checkpoint**: User Story 1 fully functional — launch, converse, context retention, exit all work

---

## Phase 4: User Story 2 - Built-in Commands (Priority: P2)

**Goal**: User can type /help to see available commands and gets a clear error for unrecognized commands

**Independent Test**: Launch muggi, type `/help`, verify command list appears. Type `/foobar`, verify error message with /help suggestion appears.

### Implementation for User Story 2

- [ ] T011 [US2] Register /help command in src/commands.ts that iterates getAll() and prints each command as "/name  - description" to stdout
- [ ] T012 [US2] Implement unknown command handling in src/session.ts: when CommandRegistry.has(name) returns false, print "Unknown command: /name. Type /help for available commands." to stderr, return to prompt

**Checkpoint**: Both user stories independently functional — converse and use commands

---

## Phase 5: Polish & Tests

**Purpose**: Test-after validation per Constitution Principle V

- [ ] T013 [P] Write tests for CommandRegistry in tests/commands.test.ts: register command, get registered command, has() for known/unknown, getAll() returns all, /help output format, /exit behavior
- [ ] T014 [P] Write tests for session input handling in tests/session.test.ts: empty input skipped, "/" prefix dispatched to commands, unknown command error message, free text sent to LLM client
- [ ] T015 [P] Write tests for LLM client in tests/llm.test.ts: successful message send returns string, API error caught and rethrown with user-friendly message, empty response handled
- [ ] T016 Run full test suite with npm test and verify all tests pass
- [ ] T017 Run quickstart.md validation: verify SC-001 through SC-004 pass manually

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Setup (T004 installs deps needed for T005-T007)
- **User Story 1 (Phase 3)**: Depends on Foundational (needs types, command registry, /exit)
- **User Story 2 (Phase 4)**: Depends on Foundational (needs command registry). Can run in parallel with US1 if desired, but US1 is MVP priority.
- **Polish (Phase 5)**: Depends on US1 and US2 completion (test-after discipline)

### Within Each Phase

- Phase 1: T001 first, then T002+T003 parallel, then T004
- Phase 2: T005 first (types), then T006 (registry uses types), then T007 (exit uses registry)
- Phase 3: T008 first (provider wrapper), then T009 (session uses provider), then T010 (entry point uses session)
- Phase 4: T011 first (help command), then T012 (unknown handling in session)
- Phase 5: T013+T014+T015 parallel, then T016, then T017

### Parallel Opportunities

```bash
# Phase 1 parallel:
Task: "Create tsconfig.json" (T002)
Task: "Add .gitignore" (T003)

# Phase 5 parallel (all test files):
Task: "Write command tests" (T013)
Task: "Write session tests" (T014)
Task: "Write LLM client tests" (T015)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T004)
2. Complete Phase 2: Foundational (T005-T007)
3. Complete Phase 3: User Story 1 (T008-T010)
4. **STOP and VALIDATE**: Run `npm run dev`, send messages, verify context, exit
5. Working conversational CLI with /exit

### Incremental Delivery

1. Setup + Foundational → Project builds and runs
2. Add User Story 1 → Conversational CLI (MVP!)
3. Add User Story 2 → Command system complete
4. Add Tests → Quality gate passed

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story is independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Test-after: All test tasks are in Phase 5 per constitution
- Total: 17 tasks across 5 phases
