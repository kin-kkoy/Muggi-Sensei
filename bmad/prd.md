---
stepsCompleted:
  - step-01-init
  - step-02-discovery
  - step-02b-vision
  - step-02c-executive-summary
  - step-03-success
  - step-04-journeys
  - step-05-domain
  - step-06-innovation
  - step-07-project-type
  - step-08-scoping
  - step-09-functional
  - step-10-nonfunctional
  - step-11-polish
  - step-12-complete
workflow_completed: true
completion_date: 2026-03-15
inputDocuments:
  - product-brief-Muggi-Sensei-2026-03-14.md
  - brainstorming-session-2026-03-14-0730.md
documentCounts:
  briefs: 1
  research: 0
  brainstorming: 1
  projectDocs: 0
classification:
  projectType: cli_tool
  domain: edtech
  complexity: medium
  projectContext: greenfield
workflowType: 'prd'
---

# Product Requirements Document - Muggi-Sensei

**Author:** Boss
**Date:** 2026-03-14

## Executive Summary

Muggi-Sensei is a CLI-based coding tutor that teaches self-taught developers to trust their own thinking. It targets the gap between knowing syntax and confidently building systems — a gap caused not by lack of ability, but by shallow understanding that breeds dependency on external validation. Where tutorials teach in isolation, AI assistants spoonfeed answers, and human mentors lose context between sessions, Muggi-Sensei guides through discovery: asking what you think before telling you what to do, letting you fail safely, then solidifying understanding through reflection. The result is a developer who doesn't just write working code, but understands *why* it works — and stops needing to ask.

Built for a single user (its creator) as a personal learning tool, Muggi-Sensei is language and stack agnostic, CLI-first for direct file access and straightforward VSCode integration, and designed around a core pedagogical loop (Assess → Guide → Try → Reflect → Solidify) that encodes a teaching philosophy into every interaction. The differentiation isn't a feature — it's cumulative. One session plants the seed; sustained use closes the confidence gap.

### What Makes This Special

No existing tool distinguishes between "doesn't know" and "knows but doesn't trust themselves." Muggi-Sensei is built on the insight that confidence comes from understanding, not from being told you're right. The chain it targets: guided discovery → deep understanding → confidence → self-trust → independence. It validates reasoning, not just output. It compares implementations to teach *why*, not just *what*. It remembers context across sessions and breaks so momentum isn't destroyed by life getting in the way. The goal is a tool that teaches you to not need it — then stays valuable as a peer.

## Project Classification

- **Project Type:** CLI Tool — terminal-based interactive tutor with planned VSCode integration
- **Domain:** EdTech — developer education through guided discovery and mentorship
- **Complexity:** Medium — no regulatory burden, but meaningful design complexity in the adaptive pedagogical engine
- **Project Context:** Greenfield — new product built from scratch

## Success Criteria

### User Success

- **Confidence independence:** The ratio of "validate my thinking" requests to autonomous decisions shifts toward autonomy over time. Muggi tracks this ratio as a core metric. Early sessions will be validation-heavy; success is a visible trend toward self-directed decision-making.
- **Retention resilience:** After a 2+ week break, the user regains context and productive momentum within 5 minutes. Muggi re-bridges where the user left off, what was learned, and what's next — eliminating the "where was I?" spiral.
- **Failure comfort:** Encountering errors triggers investigation rather than frustration. The user treats debugging as a learning opportunity, not a motivation killer.
- **Comprehension proof:** The user can explain *why* their code works — not just *that* it works. If Muggi helped build something the user can't explain, Muggi failed.
- **Enjoyment signal:** Coding sessions feel engaging. The user voluntarily reaches for Muggi-Sensei instead of defaulting to raw AI chat.

### Business Success

N/A — personal hobby project. No revenue, growth, or market objectives. The "business case" is purely personal: the creator becomes a confident, independent developer who understands systems and architecture.

### Technical Success

- **Context persistence reliability:** Session notes and learning history survive across sessions and breaks without data loss or corruption. The user never has to re-explain what they were working on.
- **Response speed:** Muggi responds fast enough to maintain conversational flow. No noticeable lag that breaks the teaching rhythm.
- **Skill assessment accuracy:** Muggi correctly identifies the user's level, confidence gaps, and knowledge boundaries. Miscalibrated assessment leads to teaching that's too basic or too advanced — both are failure states.
- **Lightweight footprint:** Minimal RAM and CPU consumption. Muggi lives alongside VSCode and terminal without competing for system resources.
- **Pedagogical effectiveness:** The Muggi Loop (Assess → Guide → Try → Reflect → Solidify) produces real understanding, not surface-level familiarity. Measured by the user's ability to apply concepts independently in new contexts.

### Measurable Outcomes

| Milestone | Signal | Timeframe |
|---|---|---|
| **First value** | Muggi guides through a concept without giving the answer, user applies it correctly | Within first month |
| **Retention proof** | User returns after a break, regains context in under 5 minutes | Within 3 months |
| **Confidence shift** | Autonomous-to-validation ratio trends upward consistently | Within 6 months |
| **Teaching evolution** | Muggi's posture shifts from Patient Mentor toward Challenging Peer | Within 12 months |
| **Independence marker** | User builds a complete feature with minimal Muggi guidance, understanding every piece | Within 12 months |
| **Anti-dust test** | User reaches for Muggi-Sensei over raw AI chat as the default | Ongoing |

## User Journeys

### Journey 1: First Meeting — Boss Discovers Muggi-Sensei

**Opening Scene:** Boss has just finished building Muggi-Sensei's MVP. He fires it up in the terminal for the first time, half-skeptical of his own creation. He's been coding in React and Node lately, working on a side project, but he knows his architectural decisions are shaky — he builds things that work but can't explain *why* they work.

**Rising Action:** Muggi doesn't start with a quiz or a menu. It starts with a conversation. "What are you working on right now?" Boss describes his project. Muggi asks what part feels uncertain. Boss admits he's not sure if his folder structure makes sense. Muggi doesn't answer — it asks Boss to explain his reasoning. Boss stumbles through it, and Muggi says: "You just described separation of concerns. That's exactly what that pattern is called." Boss didn't know the term, but he had the instinct.

**Climax:** Muggi asks Boss to look at a specific file and explain what would happen if a certain prop was null. Boss traces the logic, finds a gap he hadn't noticed, and fixes it himself. Muggi confirms: "That's exactly right. You found it." No code snippet handed over. No copy-paste. Boss solved it by being asked the right question.

**Resolution:** The session ends. Boss thinks: "That felt different." Not revolutionary yet — but different. The seed is planted. He didn't get an answer; he found one. And someone confirmed his thinking was sound.

**Emotional Arc:** Skepticism → curiosity → mild surprise → quiet satisfaction

**Capabilities Revealed:** Conversational skill assessment, Socratic questioning, Validate-Then-Name, code-aware context reading, file access

---

### Journey 2: The Return — Boss Comes Back After Three Weeks

**Opening Scene:** Life happened. Work got busy, motivation dipped, and three weeks passed. Boss opens VSCode and stares at his project. He vaguely remembers what he was building but the details are gone. The usual dread settles in — the "where was I?" spiral that usually kills another hour before any real work happens.

**Rising Action:** He fires up Muggi. Instead of a blank slate, Muggi says: "Welcome back. Last time we were working on the notification service. You'd gotten comfortable with useEffect cleanup and were about to tackle the WebSocket connection. You had a question about whether to handle reconnection logic in the component or a custom hook. Want me to do a quick refresher before we dive back in?" Boss exhales. The context is *there*. Muggi walks him through a 3-minute refresher of the key concepts from the last session.

**Climax:** Within 4 minutes, Boss is productive again. Not just remembering — *working*. He picks up the WebSocket question and, with Muggi's refresher still fresh, says: "Custom hook. Because the reconnection logic isn't tied to any specific component." Muggi confirms. Boss made that call himself. Three weeks ago he would have asked Muggi to decide for him.

**Resolution:** The session flows. The break didn't destroy his momentum — Muggi bridged the gap. Boss realizes he remembers more than he thought because the previous sessions used reflection to solidify, not just exposure to teach.

**Emotional Arc:** Dread → relief → surprise at own recall → momentum → confidence

**Capabilities Revealed:** Session notes persistence, context re-bridging, concept refresher, learning history tracking

---

### Journey 3: The Wall — Boss Is Stuck and Frustrated

**Opening Scene:** Boss has been trying to implement authentication for 45 minutes. He's read three different tutorials, each doing it differently. He's confused, frustrated, and one bad error message away from closing his laptop. He opens Muggi not for teaching but for rescue.

**Rising Action:** Boss types: "I can't figure out auth. Just tell me how to do it." Muggi doesn't comply. But it doesn't ignore the frustration either. "I hear you — auth is one of those things that has ten right answers and they all look different. Let's slow down. Before we look at implementation, tell me what you're trying to protect and from whom." Boss pauses. He describes his app's needs. Muggi asks: "Based on that, do you think you need session-based auth or token-based?" Boss thinks. "Token... because it's an API?" Muggi: "Why tokens for an API specifically?" Boss works through it — statelessness, no server-side session storage. Muggi confirms and names the concept.

**Climax:** Muggi doesn't hand over an auth implementation. Instead, it walks Boss through the *decision tree* — what kind of auth, why, and what each piece does. Boss implements it himself, one piece at a time, with Muggi asking him to explain each step before moving to the next. It takes longer than copy-pasting a tutorial. But when it's done, Boss can explain every line.

**Resolution:** The frustration transformed into understanding. Boss didn't just implement auth — he understands *why* JWT works for his use case, what the alternatives are, and when he'd choose differently. The next time he needs auth, he won't need a tutorial.

**Emotional Arc:** Frustration → resistance to process → grudging engagement → growing clarity → ownership → pride

**Capabilities Revealed:** Emotional safety acknowledgment, Muggi Loop (full cycle), Delayed Answer Protocol, guided discovery, not giving in to "just tell me"

---

### Journey 4: The Flow — Boss Is Cooking and Muggi Stays Quiet

**Opening Scene:** Boss is deep in a feature build. He's been coding for 40 minutes straight, the architecture is clear in his head, and the code is flowing. He's in the zone — the rare state where everything clicks and interruption would be costly.

**Rising Action:** Muggi is watching. It notices Boss is using manual string concatenation for building SQL queries — a potential injection vulnerability. It also notices a repeated pattern across three files that could be extracted. And it sees a variable naming inconsistency. But Boss is *flowing*. Muggi categorizes: SQL injection is critical. The repeated pattern is a learning opportunity. The naming is a nitpick. Muggi stays silent on all of them — for now.

**Climax:** Boss saves a file. Muggi speaks up — but only about the critical issue: "Quick flag — line 47 is building a SQL query with string concatenation. That's an injection risk. Want to address it now or should I queue it?" Boss fixes it immediately. The other observations stay queued.

**Resolution:** At the end of the session, Boss wraps up. Muggi delivers the debrief: "While you were coding, I noticed two things worth discussing. You've got a repeated pattern across three files for fetching and transforming user data — want to explore extracting that? Also, you're mixing camelCase and snake_case in the new module." Boss addresses the pattern extraction — it's a real learning moment. He ignores the naming for now. Nothing was lost, nothing was forced, and flow state was respected.

**Emotional Arc:** Deep focus → brief acknowledgment of critical flag → continued flow → engaged reflection during debrief

**Capabilities Revealed:** Silent Observer Mode, severity-based interruption tiers, file-save trigger, session debrief queue, flow-state respect

---

### Journey Requirements Summary

| Journey | Key Capabilities Revealed |
|---|---|
| **First Meeting** | Skill assessment, Socratic questioning, Validate-Then-Name, file/codebase access |
| **The Return** | Context persistence, session notes, concept refresher, learning history |
| **The Wall** | Emotional safety, full Muggi Loop, Delayed Answer Protocol, resistance to spoonfeeding |
| **The Flow** | Silent observation, severity tiers, file-save triggers, debrief queue, flow-state respect |

**Cross-Journey Capabilities:**
- Tone scaling (present across all journeys, adapts to emotional state and skill level)
- Implementation comparison (can surface in any session at natural moments)
- Confidence tracking (ratio of validation requests vs. autonomous decisions, tracked across all interactions)

## Innovation & Novel Patterns

### Detected Innovation Areas

**1. Pedagogical Architecture as Product Core**
The Muggi Loop (Assess → Guide → Try → Reflect → Solidify) isn't a feature added to a coding tool — it's the fundamental interaction model. Every response, every observation, every piece of feedback flows through this cycle. No existing coding tool, AI assistant, or tutorial platform encodes a teaching philosophy as its core architecture.

**2. Confidence Gap Targeting**
Existing tools treat all developer struggles as knowledge problems. Muggi-Sensei distinguishes between "doesn't know" and "knows but doesn't trust themselves" — two states that require fundamentally different teaching approaches. A knowledge gap needs explanation; a confidence gap needs validation and guided success. No developer tool makes this distinction.

**3. Anti-Spoonfeeding as Design Principle**
The entire AI assistant market optimizes for delivering answers faster. Muggi-Sensei deliberately resists this — it asks what you think before telling you anything, lets you fail safely, and only reveals solutions after you've tried and reflected. This is intentional counter-positioning: the value is in the struggle, not the shortcut.

### Validation Approach

- **First value test:** Does the Muggi Loop produce understanding (user can explain what they built) vs. just completion (it works but user can't explain why)?
- **Confidence tracking:** Does the validate-my-thinking to autonomous-decision ratio shift over time?
- **Anti-dust test:** Does the user reach for Muggi over raw AI chat? If not, the anti-spoonfeeding approach may be calibrated too aggressively.

### Risk Mitigation

- **"Helpful frustration" calibration risk:** The line between guided discovery and annoying withholding is thin. Mitigation: Muggi's Delayed Answer Protocol has an escape valve — after genuine effort and reflection, the answer is revealed with full explanation. The user should never feel punished for asking.
- **Anti-spoonfeeding vs. user abandonment:** If Muggi is too resistant, the user defaults to ChatGPT. Mitigation: Muggi's proactivity (noticing patterns, asking about implementations) keeps engagement high even when it's not handing over code.

## CLI Tool Specific Requirements

### Project-Type Overview

Muggi-Sensei is an interactive-first CLI application modeled after tools like Claude Code and Codex. The user launches Muggi in a terminal session and interacts conversationally. Session-internal `/commands` provide quick access to tool functions (mode switching, session management, configuration) without leaving the conversation. No pipeable or scriptable external commands are needed — the tool's value is in the interactive teaching experience.

### Technical Architecture Considerations

**Interaction Model:**
- Interactive conversational session as primary interface
- `/command` system for in-session actions (e.g., `/recap`, `/model`, `/posture`, `/history`)
- Tab completion for `/commands` within the interactive session
- No external CLI flags or piped commands needed for MVP

**Storage Architecture (MVP) — Two-Tier Model:**

*Global (user-level):* `~/.muggi/`
- `config.yaml` — global defaults (LLM backend/auth, preferred language/stack, default teaching posture)
- `profile.md` — central user profile hub: overall skill level, confidence ratio trends, teaching posture assessment, list of all projects (with paths, last active dates, focus areas), key concepts mastered across all projects. Updated on session exit only when profile-level changes occurred (new concept mastered, confidence shift, new project added). Skips update if session had no profile-relevant changes.

*Project-level:* `<project-root>/.muggi/`
- `config.yaml` — project-specific overrides (language/stack for this project, posture overrides)
- `sessions/` — dated session files (e.g., `2026-03-14-session-01.md`)
- `context/` — where the user left off, current focus area, project-specific notes
- Project detection: Muggi identifies the active project by the working directory it's launched from (same pattern as Git, ESLint, Claude Code)

*Merge behavior:* Project config overrides global config. Global profile informs every project — when starting a new project, Muggi already knows the user's skill level from previous projects.

All files are markdown — human-readable, LLM-parseable, inspectable without tools.

**Storage Architecture (Future consideration):**
- If querying across sessions becomes a bottleneck, structured tracking data (confidence ratios, concept mastery, skill progression) can migrate to SQLite
- Migration path: markdown remains for human-readable notes, SQLite handles queryable metrics

**Configuration:**
- Two-tier YAML config: `~/.muggi/config.yaml` (global defaults) + `<project>/.muggi/config.yaml` (project overrides)
- First-run setup wizard generates the global config through conversation (Muggi teaches you about config while configuring itself)
- Project-level config created automatically when Muggi is first launched in a new project directory
- Configurable settings: LLM backend/auth, session storage location, default teaching posture, preferred language/stack
- Config file supports comments for self-documentation

### Implementation Considerations

**LLM Backend Integration:**
- Must support at least one LLM provider at MVP (architecture should allow swapping)
- Authentication method TBD in architecture phase (API key vs. subscription-based access like Claude Max)
- Graceful handling of API failures, rate limits, and latency spikes — Muggi should never crash mid-teaching

**Terminal Experience:**
- Rich text formatting in terminal (markdown rendering, code highlighting, side-by-side comparisons for implementation comparison feature)
- Responsive to terminal width — adapts output formatting
- Clean exit handling — session state saved on unexpected termination

**File System Access:**
- Muggi reads project files for codebase-aware teaching (implementation comparison, code review, observation)
- Read-only access to user's project files — Muggi never modifies the user's code
- VSCode integration planned for later MVP stage to enhance file awareness

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**MVP Approach:** Experience MVP — the minimum set of capabilities that lets the user feel the difference between Muggi-Sensei and a raw AI chat. The MVP proves the pedagogical approach works, not that every feature is polished.

**Resource Reality:** Solo developer, 30-60 minutes daily with occasional 2-hour sessions. MVP must be buildable incrementally in small, self-contained work sessions. Each feature should be independently functional — no features that require three other features to be useful.

### MVP Feature Set (Phase 1)

**Core User Journeys Supported:**
- Journey 1 (First Meeting) — fully supported
- Journey 2 (The Return) — supported via simple session notes
- Journey 3 (The Wall) — fully supported through Muggi Loop
- Journey 4 (The Flow) — supported via file-save observation trigger

**Must-Have Capabilities:**

1. **Conversational Skill Assessment** — Natural dialogue to discover level, gaps, and context. Sets teaching posture. *This is Muggi's first impression — it must feel different from minute one.*

2. **The Muggi Loop (Guided Discovery Engine)** — Assess → Guide → Try → Reflect → Solidify. Socratic questioning, Validate-Then-Name, guided hints, Delayed Answer Protocol. *This is the product. Everything else supports it.*

3. **Inline Efficiency Guidance (Lightweight)** — Muggi weaves improvement suggestions into teaching naturally ("this works, but you could make this more efficient by...") rather than formal side-by-side comparisons. *Delivers the "why not just what" value without extra UI complexity.*

4. **Tone Scaling** — Communication adapts to assessed skill level. Beginners get analogies and patience; growth shifts toward direct technical language. *Essential for the tool not feeling generic.*

5. **Session Notes (Simple Context Persistence)** — Two-tier storage: project-level sessions in `<project>/.muggi/sessions/` track where the user left off and project-specific context; global profile in `~/.muggi/profile.md` tracks overall skill level and cross-project concept mastery. Muggi detects the active project by working directory. Re-establishes context on return. *Prevents the "where was I?" spiral — a core pain point.*

6. **File-Save Observation Trigger** — Watches for file saves via OS-level file system events (inotify/FSEvents). Queues observations and surfaces them at natural stopping points. *Lightweight, essential for flow-state respect, and core to "Muggi feels alive."*

7. **VSCode Integration** — Muggi reads project files for codebase-aware teaching. Read-only access. *Delivered in later MVP stage but required for implementation guidance and observation to be meaningful.*

### Post-MVP Features

**Phase 2 (Growth):**
1. **Full Implementation Comparison** — Formal side-by-side analysis with detailed reasoning. Graduates from inline suggestions to structured comparison view.
2. **Failure Injection** — Deliberate problem introduction to teach debugging and resilience.
3. **Severity-Based Interruption Tiers** — Categorized observations (critical → architectural → learning opportunity → nitpick) with different delivery timing.
4. **Session Debrief Queue** — Non-critical observations queued and delivered at session end.
5. **Spaced Reinforcement** — Invisible concept re-testing at increasing intervals through natural conversation.

**Phase 3 (Expansion):**
1. **Curriculum Progression** — Structured progression from fundamentals through systems design, including AI-era skills.
2. **Canvas Mode (Tutor)** — Muggi writes code with deliberate mistakes to train critical thinking.
3. **Canvas Mode (Partner)** — Muggi becomes genuine co-developer, follows user's style, defers on architecture.
4. **Pattern Recognition Nudge** — Cross-codebase behavior detection that triggers concept introductions.
5. **Teaching Posture Spectrum** — Full dynamic range from Patient Mentor to Challenging Peer to Quick-Reference Atlas.

### Risk Mitigation Strategy

**Technical Risks:**
- *Most challenging aspect:* Getting the Muggi Loop to feel natural rather than scripted. The LLM prompt engineering for Socratic teaching that doesn't frustrate is the hardest calibration problem.
- *Mitigation:* Start with the teaching persona as a well-crafted system prompt. Iterate based on real usage. The user *is* the tester — feedback loop is immediate.

**Resource Risks:**
- *Solo developer with limited time:* Features must be independently buildable in 30-60 minute sessions.
- *Mitigation:* Modular architecture — each feature is a discrete capability that plugs into the core loop. No feature depends on three others to function. Session notes work without observation triggers. Tone scaling works without curriculum progression.
- *Contingency:* If time is tighter than expected, the absolute minimum is: Muggi Loop + Session Notes + File Access. Everything else enhances but isn't load-bearing.

**Motivation Risks:**
- *The creator is the user:* If building Muggi stops being fun or educational, the project dies regardless of how good the plan is.
- *Mitigation:* Build Muggi in a way that teaches the creator — the project itself should be a learning vehicle. Architecture decisions, LLM integration, file system watching, terminal UI — each feature teaches something new.

## Functional Requirements

### Skill Assessment & User Profiling

- **FR1:** User can engage in a natural conversational skill assessment that discovers their current level, confidence gaps, and knowledge boundaries
- **FR2:** User can specify their preferred language/stack and current project context during assessment
- **FR3:** System can determine the appropriate teaching posture (Patient Mentor, Challenging Peer, etc.) based on assessed skill level
- **FR4:** System can distinguish between knowledge gaps and confidence gaps in the user's responses
- **FR5:** User's skill assessment results persist in their global profile across all projects

### Guided Discovery (The Muggi Loop)

- **FR6:** System can ask the user what they think before providing any guidance (Socratic questioning)
- **FR7:** System can validate the user's reasoning and confirm correct intuitions before introducing technical terminology (Validate-Then-Name)
- **FR8:** System can provide hints and guidance that are specific enough to be actionable without revealing the complete answer
- **FR9:** System can let the user attempt a solution even when it suspects the approach is wrong (Try-and-See)
- **FR10:** System can reveal the full solution only after the user has attempted and reflected (Delayed Answer Protocol)
- **FR11:** System can ask the user to explain what they just did and why, to solidify understanding (Comprehension Checkpoint)
- **FR12:** System can resist giving direct answers when the user demands them, while acknowledging the user's frustration

### Inline Efficiency Guidance

- **FR13:** System can identify areas in the user's code that could be more efficient or better structured
- **FR14:** System can weave improvement suggestions into teaching naturally as part of ongoing guidance
- **FR15:** System can explain *why* an alternative approach is better, connecting to underlying principles

### Tone & Communication Scaling

- **FR16:** System can adapt its communication register based on the user's assessed skill level (analogies for beginners, technical terms for advanced)
- **FR17:** System can detect when a term isn't understood and explain it in the user's context
- **FR18:** System can acknowledge the user's emotional state (frustration, confusion, excitement) before proceeding with teaching

### Context Persistence & Session Management

- **FR19:** System can save session state (what was learned, where the user left off, key concepts covered) to project-level storage on session end
- **FR20:** System can update the global user profile on session exit when profile-level changes occurred (new concepts mastered, skill progression, confidence shifts)
- **FR21:** System can skip global profile updates when no profile-relevant changes occurred in the session
- **FR22:** System can re-establish context on session start by reading project-level session history and presenting a summary of where the user left off
- **FR23:** System can provide a quick concept refresher for topics covered in previous sessions
- **FR24:** System can detect the active project by the working directory it's launched from
- **FR25:** System can maintain separate session histories per project while sharing a single global user profile
- **FR26:** System can recognize when it's being launched in a new project and initialize project-level storage while using existing global profile data

### File System Observation

- **FR27:** System can watch for file save events using OS-level file system notifications (inotify/FSEvents)
- **FR28:** System can queue observations about the user's code without interrupting their flow
- **FR29:** System can surface queued observations at natural stopping points (file saves)
- **FR30:** System can read the user's project files to understand codebase context (read-only access)

### Session Commands

- **FR31:** User can execute `/commands` within an active session for quick actions (e.g., recap, history, posture, model)
- **FR32:** User can tab-complete available `/commands` within the interactive session
- **FR33:** User can view their session history and learning progress via commands

### Configuration & Setup

- **FR34:** System can guide a first-time user through initial setup via conversational wizard
- **FR35:** User can configure global defaults (LLM backend, preferred language/stack, teaching posture) in a global config file
- **FR36:** User can override global config with project-specific settings
- **FR37:** System can automatically create project-level configuration when launched in a new project directory

### Confidence Tracking

- **FR38:** System can track the ratio of "validate my thinking" requests to autonomous decisions per skill domain (e.g., JavaScript, Java, system design, databases) — not as a single aggregate number
- **FR39:** System can maintain per-domain confidence data at the project level, tied to the technologies used in that project
- **FR40:** System can aggregate project-level confidence data into the global profile as per-domain breakdowns on session exit
- **FR41:** System can use per-domain confidence data to adjust teaching posture when switching between projects or skill areas (e.g., Patient Mentor for unfamiliar domains, Challenging Peer for strong domains within the same session)
- **FR42:** System can track an overall confidence *trend* (directional indicator of growing independence) alongside the per-domain breakdowns

### Teaching Depth & Grounding

- **FR43:** System can ask the user to explain their own code before providing any feedback — using the user's self-explanation to identify gaps between their mental model and the code's actual behavior (Post-Code Reflection Interview)
- **FR44:** System can use the user's own codebase as primary teaching material — asking pointed questions about the user's own decisions and code structure rather than relying on abstract examples (Codebase Interrogation)
- **FR45:** System can pose questions about code that is actually correct to test whether the user second-guesses correct decisions — distinguishing knowledge gaps from confidence gaps to calibrate teaching approach (Dummy Questions / Confidence Traps)
- **FR46:** System can deliver surgically scoped mini-lectures when it detects missing foundational knowledge — tracing a concept from first principles, triggered by context rather than curriculum, and limited to exactly what the user needs right now (Contextual Backstory Lectures)
- **FR47:** System can anchor teaching to problems the user has previously encountered — connecting new concepts to past bugs, past frustrations, or past code decisions rather than abstract examples, when the user has sufficient history (Experience-Grounded Teaching)

## Non-Functional Requirements

### Performance

- **NFR1:** Muggi's local processing (file reading, session note loading, observation queuing) completes within 500ms
- **NFR2:** LLM response streaming begins as soon as the provider starts returning tokens — Muggi streams responses as they arrive rather than waiting for complete responses
- **NFR3:** File system event detection (save observation trigger) fires within 1 second of file save
- **NFR4:** Session startup (loading project context, reading session history, preparing welcome-back summary) completes within 6 seconds, with 10 seconds as absolute maximum
- **NFR5:** Session exit (saving session state, conditional global profile update) completes within 5 seconds

### Security

- **NFR6:** Any API credentials or auth tokens stored in config files are excluded from version control via default `.gitignore` entries created during project setup
- **NFR7:** Muggi never transmits the user's code or session data to any service other than the configured LLM provider as part of the teaching interaction

### Integration

- **NFR8:** Primary LLM integration leverages the user's existing subscriptions (Claude Max/Pro via Claude Code, ChatGPT Plus via Codex) to avoid additional API costs
- **NFR9:** Architecture supports a provider-agnostic interface so the LLM backend can be swapped (subscription-based CLI tools, direct API, or local LLM)
- **NFR10:** Local LLM fallback supported via Ollama or equivalent for offline/cost-free usage, with the understanding that pedagogical quality may be reduced with smaller models
- **NFR11:** LLM failures (timeouts, rate limits, network errors) are handled gracefully with clear user-facing messages — Muggi never crashes or loses session state due to a provider failure
- **NFR12:** Local features (session review, history browsing, file observation) remain available even when the LLM is unreachable

### Resource Efficiency

- **NFR13:** Muggi's idle memory footprint (watching files, not in conversation) stays under 50MB RAM — designed for systems where 8GB total is shared across IDE, browser, music, and OS
- **NFR14:** Active conversation memory footprint stays under 150MB RAM (excluding LLM response buffers)
- **NFR15:** File system watching uses OS-level event APIs (inotify/FSEvents), not polling — zero CPU cost when no files change
- **NFR16:** Muggi does not spawn background processes or services that persist after the user exits the session
- **NFR17:** Target hardware floor: 8GB total system RAM with IDE and browser running simultaneously

### Reliability

- **NFR18:** Session state is saved atomically — a crash or unexpected termination mid-save never corrupts existing session data
- **NFR19:** Global profile updates are written to a temporary file first, then renamed to the target — preventing partial writes from corrupting the profile
- **NFR20:** If session state save fails, Muggi retains the data in memory and retries on next save opportunity, notifying the user of the failure
- **NFR21:** All persistent data (session notes, profile, config) stored in human-readable markdown/YAML — recoverable by manual inspection if tooling fails
