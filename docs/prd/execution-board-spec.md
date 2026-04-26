# Execution Board Spec

## Purpose

This document translates the V1 Build Plan into an execution structure the team can actually operate.

It is designed to support:

- sprint planning
- board creation
- ownership assignment
- delivery tracking

It is not yet a ticket board.

It is the specification from which a ticket board should be created.

## Planning principle

The board should not be organized around random technical tasks.

It should be organized around meaningful product outcomes.

That means the top-level unit should be:

- epic

Each epic should contain:

- deliverables
- concrete tasks
- dependencies
- exit criteria

## Recommended board columns

The team can later adapt this, but the default suggested columns are:

- Backlog
- Ready
- In Progress
- Review
- Blocked
- Done

## Execution principle

V1 should be built in a disciplined order.

Do not parallelize everything blindly.

Some workstreams can move together, but the team should preserve sequence where sequence matters.

## Epic 1 — Repository and product foundation

### Objective

Prepare the repository and working environment so execution starts from a clean and shared base.

### Deliverables

- repository structure is clear
- documentation is the source of truth
- prototype code is clearly secondary
- execution docs are accessible from README

### Tasks

- confirm root repo structure
- confirm documentation map
- confirm prototype isolation
- confirm README navigation
- create initial working conventions for the team

### Exit criteria

- a new team member can enter the repo and understand where to start
- there is no ambiguity about where the product definition lives

## Epic 2 — Session architecture and state model

### Objective

Build the structural backbone of a Kairos session.

### Deliverables

- session model
- phase state model
- progression logic
- persistence design for one decision session

### Tasks

- define session entity fields
- define phase state entity fields
- define decision record structure
- define reflection state structure
- define commitment state structure
- define escalation record structure
- define access record structure
- define allowed state transitions
- define paused, escalated, and complete states

### Dependencies

- implementation blueprint
- phase prompt spec
- safety policy

### Exit criteria

- the team can describe exactly what data must exist in one session
- phase progression can be represented cleanly in code

## Epic 3 — Guided phase experience

### Objective

Create the product experience for the six-phase journey.

### Deliverables

- UI/UX structure for all phases
- interaction patterns for freeform and structured input
- pause / return interaction
- completion interaction

### Tasks

- define the user journey screen/state map
- define entry flow
- define phase 1 interaction states
- define phase 2 interaction states
- define phase 3 interaction states
- define phase 4 interaction states
- define phase 5 interaction states
- define phase 6 interaction states
- define pause state behavior
- define session completion state
- define empty, loading, error, and blocked states

### Dependencies

- session architecture
- interaction contract

### Exit criteria

- the full user journey is mapped and implementable
- each phase has a clear interface pattern

## Epic 4 — Prompt orchestration system

### Objective

Implement the prompt architecture that powers phase-specific Kairos behavior.

### Deliverables

- phase prompts
- extraction prompts
- option proposal logic
- completion classification logic

### Tasks

- define prompt contract schema
- implement phase 1 system prompt
- implement phase 2 system prompt
- implement phase 3 system prompt
- implement phase 4 system prompt
- implement phase 5 system prompt
- implement phase 6 system prompt
- define extraction prompt patterns
- define structured prompt outputs
- define fallback behavior for invalid outputs
- define how prompts receive prior-state context

### Dependencies

- phase prompt spec
- interaction contract
- session state model

### Exit criteria

- prompts can be called phase by phase with predictable outputs
- the system can determine whether a phase is complete

## Epic 5 — Decision extraction and ambiguity reduction

### Objective

Implement the logic that converts raw user language into structured discernment state.

### Deliverables

- decision extraction
- internal-state extraction
- clarity-state classification
- action extraction

### Tasks

- implement decision extraction logic
- implement candidate decision proposal logic
- implement feeling / desire / fear extraction
- implement reflection summary extraction
- implement clarity classification
- implement resistance signal detection
- implement commitment extraction
- implement action timing extraction

### Dependencies

- prompt orchestration
- session state model

### Exit criteria

- the system can move from freeform input to structured progression signals

## Epic 6 — Safety and escalation implementation

### Objective

Represent the safety policy in product behavior.

### Deliverables

- escalation triggers
- escalation interruption flow
- escalation messaging
- escalation logging

### Tasks

- define initial escalation trigger set
- define abuse / violence trigger rules
- define self-harm / harm trigger rules
- define destabilization trigger rules
- define covenant-sensitive trigger rules
- define escalation levels in product logic
- define escalation assistant copy
- define how escalation interrupts phase progression
- define logging for escalated sessions

### Dependencies

- spiritual safety policy
- prompt orchestration
- session state model

### Exit criteria

- unsafe sessions do not continue as ordinary sessions
- the team can observe when and why escalation occurred

## Epic 7 — Scripture path implementation

### Objective

Implement the first controlled spiritual-reflection layer for Kairos.

### Deliverables

- reflection lens structure
- scripture path selection behavior
- reflection prompts for scripture and prayer

### Tasks

- define initial reflection lenses
- define V1 scripture handling approach
- define scripture path presentation logic
- define prayer prompt templates
- define reflection questions per lens
- define pause instructions and return framing

### Dependencies

- interaction contract
- safety policy
- phase prompt spec

### Exit criteria

- phase 3 can be executed with seriousness and consistency

## Epic 8 — Paywall, pricing, and code access

### Objective

Implement the V1 commercial gate.

### Deliverables

- paywall after phase 1
- code-based access
- access-state persistence

### Tasks

- define paywall state
- define single-session unlock behavior
- define code validation logic
- define access status persistence
- define source tracking for code-based entry
- define post-unlock continuation behavior

### Dependencies

- session architecture
- V1 commercial model

### Exit criteria

- a user can unlock by payment or code and continue cleanly

## Epic 9 — Analytics and observation layer

### Objective

Make V1 learnable from real usage.

### Deliverables

- event model
- funnel visibility
- pause / return visibility
- escalation visibility

### Tasks

- define event taxonomy
- instrument phase start events
- instrument phase completion events
- instrument paywall view events
- instrument unlock events
- instrument pause and return events
- instrument escalation events
- instrument completion events
- define dashboard or reporting view for the core funnel

### Dependencies

- session architecture
- paywall logic
- safety layer

### Exit criteria

- the team can answer where users are entering, stopping, converting, and escalating

## Epic 10 — Pilot readiness

### Objective

Prepare Kairos for a controlled real-world pilot.

### Deliverables

- pilot cohort definition
- code distribution plan
- feedback collection plan
- pilot operating rhythm

### Tasks

- define who receives initial access
- define how many codes are issued
- define feedback collection format
- define pilot check-in rhythm
- define weekly review ritual
- define success and stop conditions for pilot

### Dependencies

- V1 product completeness
- access system
- analytics layer

### Exit criteria

- the team can responsibly place V1 in real users’ hands

## Suggested implementation order

The board should respect this approximate order:

1. Epic 1 — Repository and product foundation
2. Epic 2 — Session architecture and state model
3. Epic 3 — Guided phase experience
4. Epic 4 — Prompt orchestration system
5. Epic 5 — Decision extraction and ambiguity reduction
6. Epic 7 — Scripture path implementation
7. Epic 8 — Paywall, pricing, and code access
8. Epic 6 — Safety and escalation implementation
9. Epic 9 — Analytics and observation layer
10. Epic 10 — Pilot readiness

Some overlap is possible, but this should remain the dominant order.

## Suggested ownership logic

Each epic should have:

- one direct owner
- one reviewer or partner

The project should avoid “shared by everyone, owned by no one.”

## Suggested task sizing principle

When translating this spec into a board:

- each task should be completable in a short working window
- tasks should produce visible progress
- tasks should not mix unrelated concerns

If a task sounds like a mini-epic, split it.

## Suggested definition of ready

A task is ready when:

- its purpose is clear
- its dependency is available
- its output is observable
- its acceptance condition is understandable

## Suggested definition of done

A task is done when:

- the intended output exists
- the acceptance condition is met
- it does not break the documented Kairos principles
- it is reviewable by someone else on the team

## Board anti-patterns

The team should avoid:

- creating tasks with no product outcome
- mixing design, prompting, and backend concerns into one ticket
- opening build work before the prerequisite structure exists
- treating “chat works” as success
- tracking motion instead of real product milestones

## First board creation recommendation

When this spec is turned into a real board, start by creating:

- 10 epic cards
- deliverable checklists under each
- first-wave tasks only for Epics 1–3

Do not explode the entire plan into 100 small tickets on day one.

Let the board grow with real execution.

## Final execution statement

The purpose of the execution board is not to make Kairos feel busy.

It is to make Kairos buildable in a disciplined, traceable, and team-operable way.
