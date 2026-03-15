<!--
  Sync Impact Report
  ===================
  Version change: N/A → 1.0.0 (initial ratification)
  Modified principles: N/A (first version)
  Added sections:
    - Core Principles (5 principles)
    - Technical Constraints
    - Development Workflow
    - Governance
  Removed sections: N/A
  Templates requiring updates:
    - .specify/templates/plan-template.md ✅ no updates needed
      (Constitution Check section is generic, will be filled per-feature)
    - .specify/templates/spec-template.md ✅ no updates needed
      (spec template is principle-agnostic by design)
    - .specify/templates/tasks-template.md ✅ no updates needed
      (task categorization compatible with current principles)
  Follow-up TODOs: None
-->

# Muggi-Sensei Constitution

## Core Principles

### I. Simplicity First (YAGNI)

Every feature, abstraction, and dependency MUST justify its existence
against an immediate, concrete need. Premature abstraction is treated as
a defect.

- Build only what is needed for the current milestone.
- Three similar lines of code are preferred over a premature helper.
- New dependencies MUST solve a problem that cannot be reasonably
  solved with existing tools or standard library.
- When in doubt, choose the simpler path and revisit when complexity
  is actually required.

**Rationale**: Muggi-Sensei is a solo hobby project built in short
sessions. Unnecessary complexity compounds across sessions and destroys
momentum — the very problem the tool aims to solve for its users.

### II. CLI-First Interface

The terminal is the primary and authoritative interface. All
functionality MUST be accessible via CLI before any alternative
interface (GUI, IDE plugin, web) is considered.

- Every user-facing feature MUST work in a terminal session.
- Text in/out protocol: user input via stdin/args, output via stdout,
  errors via stderr.
- Rich terminal rendering (markdown, colors) is encouraged but MUST
  degrade gracefully to plain text.
- IDE integrations (e.g., VSCode) are supplementary and MUST NOT
  gate core functionality.

**Rationale**: CLI-first ensures the tool remains lightweight, scriptable,
and accessible in any development environment. It aligns with the
project's identity as a developer companion, not a GUI application.

### III. Modular Architecture

Features MUST be organized as independent, well-bounded modules with
clear interfaces. Each module SHOULD be developable, testable, and
replaceable without requiring changes to unrelated modules.

- Module boundaries MUST align with functional responsibilities
  (e.g., session management, skill assessment, file observation).
- Inter-module communication MUST use explicit, documented interfaces
  — no shared mutable state or implicit coupling.
- A module MAY be extracted into a separate package if it demonstrates
  independent utility, but extraction is not required by default.

**Rationale**: Modular design enables incremental development in short
sessions, reduces cognitive load when resuming work after breaks, and
allows the pedagogical engine to evolve independently from storage or
UI concerns.

### IV. Pedagogical Integrity

The Muggi Loop (Assess → Guide → Try → Reflect → Solidify) is the
architectural backbone of the system. All feature decisions MUST
preserve and reinforce this teaching methodology.

- Features MUST NOT shortcut the learning cycle by providing
  immediate answers without guiding the user through reasoning.
- Teaching posture adaptation (Patient Mentor, Challenging Peer,
  Quick-Reference Atlas) MUST be discovery-driven, not menu-selected.
- Confidence tracking MUST be per-domain and behavioral (measuring
  validation-seeking vs. autonomous decisions), not self-reported.
- Observation and intervention MUST follow the severity tier system
  (Critical → Architectural → Learning Opportunity → Nitpick).

**Rationale**: This is the core differentiator. If pedagogical
integrity is compromised for convenience, Muggi-Sensei becomes just
another ChatGPT wrapper. The teaching methodology is not a feature —
it is the product.

### V. Test-After Discipline

All shipped features MUST have tests, written after implementation.
Tests validate behavior, not implementation details.

- Tests MUST be written for every completed feature before it is
  considered done.
- Test scope priorities: integration tests for module contracts,
  unit tests for complex logic, end-to-end tests for critical user
  journeys.
- Tests MUST be runnable in isolation and MUST NOT depend on
  external services or network access.
- Mocking is permitted for external boundaries (LLM API, filesystem)
  but MUST NOT replace real integration tests for internal module
  contracts.

**Rationale**: Test-after fits the exploratory nature of a solo hobby
project where interfaces evolve during implementation. Requiring tests
before "done" ensures quality without the overhead of strict TDD in a
discovery-heavy context.

## Technical Constraints

- **Language/Runtime**: To be determined during first feature
  implementation. Once chosen, the decision is recorded here and
  becomes binding for the project.
- **LLM Backend**: Claude API via Claude Code / Claude Max
  subscription. No additional API cost budget.
- **Storage**: Human-readable formats (Markdown + YAML) for all
  persistent data. SQLite MAY be introduced post-MVP for queryable
  metrics only.
- **Performance**: Response latency MUST maintain conversational
  flow (target < 3 seconds for non-LLM operations). Memory footprint
  MUST stay under 50 MB idle, 150 MB active.
- **Dependencies**: Every external dependency MUST be justified.
  Prefer standard library solutions. No dependency may be added
  solely for developer convenience if a reasonable alternative exists.
- **File Storage Layout**:
  - Global: `~/.muggi/config.yaml`, `~/.muggi/profile.md`
  - Project: `<project>/.muggi/config.yaml`,
    `<project>/.muggi/sessions/`
  - Project config overrides global config.

## Development Workflow

- **Session-Based Development**: Work happens in 30–60 minute
  sessions with occasional 2-hour deep dives. Features MUST be
  scoped to fit this cadence.
- **Branching**: Feature branches off `main`. Branch naming follows
  `<issue-number>-<short-description>` convention.
- **Commits**: Atomic commits with descriptive messages. Each commit
  SHOULD represent a single logical change.
- **PR Process**: All changes merge to `main` via pull request.
  Self-review is acceptable for a solo project but MUST still occur
  before merge.
- **Documentation**: Changes to public interfaces or user-facing
  behavior MUST include documentation updates in the same PR.
- **Specify Framework**: Feature development follows the Specify
  workflow: spec → plan → tasks → implement. Skip steps only when
  the change is trivially small (< 30 minutes total effort).

## Governance

This constitution is the highest-authority document for development
decisions in Muggi-Sensei. When practices conflict with these
principles, the constitution prevails.

- **Amendments**: Any principle change MUST be documented with
  rationale, recorded in the Sync Impact Report, and reflected in
  dependent templates.
- **Versioning**: Constitution follows semantic versioning:
  - MAJOR: Principle removed or fundamentally redefined.
  - MINOR: New principle added or existing principle materially
    expanded.
  - PATCH: Clarifications, wording fixes, non-semantic refinements.
- **Compliance Review**: Each feature plan MUST include a
  Constitution Check verifying alignment with all five principles.
- **Guidance**: Runtime development guidance lives in `CLAUDE.md`
  and project documentation. This constitution governs what is built
  and why; guidance files govern how.

**Version**: 1.0.0 | **Ratified**: 2026-03-15 | **Last Amended**: 2026-03-15
