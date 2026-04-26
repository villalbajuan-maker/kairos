# Implementation Blueprint

## Purpose

This document translates the Kairos project from strategic definition into buildable system design.

It is not a low-level engineering spec.

It is the operational bridge between:

- the product thesis
- the interaction contract
- the safety policy
- the phase prompt spec
- the first implementation plan

Its purpose is to answer:

- what must exist in the system
- how the parts relate
- what we build first
- what must remain constrained in V1

## Implementation principle

Kairos should not be built as a generic chatbot with spiritual language on top.

It should be built as a guided discernment engine with conversational interfaces attached to it.

That means the implementation must be driven by:

- state
- phase progression
- extraction
- safety overlays
- structured prompting

not by free chat alone.

## System overview

At a high level, Kairos consists of five interacting layers:

1. Experience layer
2. Session and flow layer
3. Discernment intelligence layer
4. Safety and escalation layer
5. Commercial and distribution layer

## 1. Experience layer

This is the user-facing interaction surface.

Its job is not to contain the business logic.

Its job is to render and support the process.

### Responsibilities

- capture user input
- display assistant guidance
- present structured options
- handle pauses and returns
- show paywall and code access moments
- show completion and follow-through states

### V1 expectation

The first implementation should support one primary experience:

- mobile-first guided conversation interface

This may later expand to:

- WhatsApp
- web app
- voice-assisted surfaces

But V1 should stay narrow.

## 2. Session and flow layer

This is the structural core of Kairos.

It is the layer that ensures Kairos behaves like a process rather than freeform chat.

### Responsibilities

- create and persist a decision session
- track the current phase
- store extracted outputs from each phase
- determine whether a phase is complete
- decide whether to advance, repeat, pause, or escalate

### Implementation model

This layer should behave like a state machine.

Each session should know:

- the current phase
- prior phase outputs
- current completion status
- current escalation status
- access status

### Core state transitions

- `phase_1_define`
- `phase_2_separate`
- `phase_3_seek`
- `phase_4_clarify`
- `phase_5_commit`
- `phase_6_execute`
- `paused`
- `escalated`
- `complete`

## 3. Discernment intelligence layer

This is where language-model behavior is orchestrated.

Its role is not to “decide for the user.”

Its role is to make the guided process operational.

### Responsibilities

- interpret freeform user input
- extract structured state from responses
- propose option sets when ambiguity remains high
- generate phase-appropriate assistant messages
- help classify completion state
- support scriptural reflection paths

### Architectural principle

This layer should be modular, phase-aware, and constrained.

It should not use one monolithic prompt for the whole product.

It should be orchestrated through:

- phase system prompts
- extraction prompts
- option-generation prompts
- safety overlays

## 4. Safety and escalation layer

This layer ensures Kairos does not continue ordinary flow when the case is unsafe or beyond product boundaries.

### Responsibilities

- detect risk patterns
- set escalation flags
- interrupt or reroute normal flow
- recommend human support
- log escalation type for review and learning

### Minimum escalation categories

- abuse / violence / coercion
- self-harm or harm to others
- severe destabilization
- marriage / divorce / covenant rupture requiring added caution
- specialized domains such as legal, medical, or crisis matters

### Implementation note

In V1 this may begin with:

- explicit keyword / rule checks
- manual risk heuristics
- prompt-level escalation instructions

Later it can become more sophisticated.

## 5. Commercial and distribution layer

This layer handles the transition from value discovery to paid usage and community distribution.

### Responsibilities

- identify access state
- gate the process after phase 1
- support direct payment
- support code-based entry
- record source of access when possible

### V1 thesis

Phase 1 remains free.

After the decision is clearly defined, Kairos presents:

- pay now
- enter a code

This keeps the commercial logic aligned with value revelation.

## Core domain objects

The blueprint should treat the following objects as first-class.

### User

Represents the person using Kairos.

Key fields:

- `id`
- `name` or anonymous identifier
- `contact_channel`
- `created_at`
- `source`

### Session

Represents one decision journey.

Key fields:

- `id`
- `user_id`
- `status`
- `current_phase`
- `access_state`
- `created_at`
- `updated_at`
- `completed_at`

### Decision record

Represents the specific decision under discernment.

Key fields:

- `session_id`
- `decision_statement`
- `decision_category`
- `decision_context_summary`

### Phase state

Represents outputs captured from each phase.

Key fields:

- `session_id`
- `phase_name`
- `raw_user_input`
- `assistant_output`
- `extracted_state`
- `phase_complete`
- `completion_reason`

### Reflection state

Represents internal and spiritual processing state.

Key fields may include:

- `feelings`
- `desires`
- `fears`
- `selected_scripture_lens`
- `scripture_reflection`
- `prayer_reflection`
- `clarity_status`
- `resistance_signal`

### Commitment state

Represents decision closure and action commitment.

Key fields:

- `final_decision`
- `next_action`
- `action_timing`
- `execution_status`
- `execution_notes`

### Escalation record

Represents safety or human-support escalation.

Key fields:

- `session_id`
- `escalation_level`
- `escalation_type`
- `trigger_source`
- `recommended_human_support`
- `resolved_state`

### Access record

Represents pricing and entry path.

Key fields:

- `session_id`
- `access_type` (`paid`, `code`, `grant`)
- `code_used`
- `payment_status`
- `price_point`

## Suggested V1 system modules

The first implementation should separate concerns into modules like these:

### 1. Session orchestrator

Coordinates the entire session.

Responsible for:

- phase routing
- state loading
- state updates
- advancement checks

### 2. Phase runner

Executes logic for one specific phase.

Responsible for:

- calling prompts
- validating phase completion
- returning next actions

### 3. Prompt router

Selects which prompt family to use.

Responsible for:

- phase-specific prompt loading
- inserting relevant context
- combining safety overlays

### 4. Extraction engine

Converts freeform text into structured state.

Responsible for:

- decision extraction
- feeling / desire / fear extraction
- clarity classification
- action extraction

### 5. Safety engine

Detects cases requiring caution or escalation.

Responsible for:

- rule checks
- escalation flags
- interruption of ordinary progression

### 6. Scripture path layer

Supports structured spiritual engagement.

Responsible for:

- presenting a scriptural lens
- referencing the right reflection path
- storing user reflection on the selected path

### 7. Access and checkout module

Handles monetization and codes.

Responsible for:

- paywall trigger
- code validation
- access state changes

## Phase implementation logic

### Phase 1

System tasks:

- intake raw situation
- detect whether a decision exists
- synthesize candidate decision statements
- confirm one exact decision
- trigger paywall gate when complete

### Phase 2

System tasks:

- collect emotional, desire, and fear inputs
- categorize them explicitly
- surface attachments and resistance clues

### Phase 3

System tasks:

- introduce the shift from analysis to seeking
- present a lens
- support prayer and Scripture engagement
- store spiritual reflection
- support pause and return

### Phase 4

System tasks:

- collect post-reflection input
- classify clarity state
- detect resistance versus uncertainty
- narrow toward a directional statement

### Phase 5

System tasks:

- capture explicit decision
- capture next action
- capture timing
- verify commitment quality

### Phase 6

System tasks:

- capture execution result
- detect reversal versus new information
- support follow-through or identify blockage

## Data persistence strategy

V1 should prioritize persistence of meaning, not analytics complexity.

The minimum persistent layer should store:

- session identity
- phase progression
- decision statement
- extracted state from each phase
- escalation state
- access state

The system should preserve both:

- raw user messages
- normalized structured state

This matters because later learning depends on both.

## AI integration approach

V1 should use AI in a bounded, functional role.

### AI is useful for

- summarizing user input
- identifying candidate decision statements
- extracting structured information
- reducing ambiguity through option proposals
- generating phase-appropriate guided language

### AI should not be trusted for

- spiritual authority
- uncontrolled scriptural interpretation
- unconstrained case handling
- deciding whether to ignore safety concerns

### Recommended architecture

The system should call AI through narrowly-scoped functions such as:

- `extractDecision()`
- `proposeDecisionOptions()`
- `extractInternalState()`
- `suggestReflectionOptions()`
- `classifyClarityState()`
- `extractCommitment()`

This is better than one chat endpoint that tries to do everything.

## Scripture handling in implementation

The product should eventually have a mature approach to biblical content, but V1 should stay practical.

### V1 options

- curated reflection lenses with selected passages or references
- controlled prompt-based scriptural guidance
- limited dynamic flexibility with strong constraints

### Long-term direction

- licensed translations where needed
- structured internal scripture layer
- consistent reflection paths by category

## Commercial implementation path

### V1

- show value in phase 1
- trigger paywall after decision definition
- support one-time paid unlock and code-based unlock

### V2

- add pack handling
- add better access tracking
- add distribution reporting for leader channels

### V3

- support more sophisticated community and referral mechanics

## Analytics blueprint

The first analytics layer should answer:

- how many users complete phase 1
- how many pass the paywall
- how many reach phase 3
- how many return after pause
- how many reach phase 5
- how many state a real decision
- how many confirm execution
- how many sessions escalate

These analytics should map to the actual thesis of the product, not vanity metrics.

## Suggested V1 technology posture

The initial stack should optimize for speed, control, and iteration.

At a high level:

- one web-based guided interface
- one orchestration backend
- one persistence layer
- one AI integration layer
- one access / code system

The exact framework can change.

The important thing is preserving modularity and phase-based control.

## Suggested implementation stages

### Stage 1 — Foundation

Build:

- session model
- phase model
- routing logic
- persistence basics

### Stage 2 — Guided interaction core

Build:

- phase prompts
- extraction logic
- assistant response rendering
- options handling

### Stage 3 — Safety and gating

Build:

- escalation checks
- phase interruption logic
- paywall and code system

### Stage 4 — Reflection and follow-through

Build:

- pause / return states
- completion tracking
- execution confirmation

### Stage 5 — Instrumentation

Build:

- phase analytics
- funnel visibility
- escalation visibility

## V1 implementation boundaries

V1 should not attempt:

- full multi-channel support
- full automation of all theological nuance
- broad case coverage without controlled prompts
- complex subscriptions
- advanced personalization
- broad enterprise tooling

V1 should attempt:

- one strong guided session flow
- one coherent access model
- one serious first-use experience
- one measurable funnel from ambiguity to decision

## Blueprint success criteria

This blueprint is successful if it enables the team to build a first version that is:

- structurally faithful to the thesis
- safe enough to test responsibly
- narrow enough to ship
- clear enough to measure

## Final implementation statement

Kairos should be implemented as a disciplined decision system with AI-assisted interaction, not as a loose conversation product.

If that principle remains intact, the implementation can evolve without losing the essence of the project.

## Continue reading

- [Back to START HERE](../START-HERE.md)
- Previous: [Phase Prompt Spec](phase-prompt-spec.md)
- Next: [Brand Narrative](../11-brand-narrative.md)
