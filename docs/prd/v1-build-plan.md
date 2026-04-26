# V1 Build Plan

## Purpose

This document converts the Kairos foundation into a practical execution plan for V1.

It is not the full roadmap of the company.

It is the near-term plan for building the first serious version that can be placed in front of real users and trusted communities.

## V1 objective

V1 exists to prove that Kairos can carry a real person from ambiguity to a concrete decision through a guided discernment process.

V1 is not trying to prove everything.

It is trying to prove the core loop.

## What V1 must validate

V1 must validate:

- that users understand the flow
- that users can complete the phases
- that the product can reduce ambiguity
- that users can reach a concrete decision
- that a meaningful portion of users can commit to action
- that trusted leaders would feel comfortable distributing it

## What V1 is not trying to solve yet

V1 is not trying to fully solve:

- broad multi-channel distribution
- enterprise church tooling
- full theology edge cases
- complete biblical content infrastructure
- advanced analytics
- growth automation
- polished brand marketing systems

## V1 release principle

V1 should be:

- narrow
- serious
- usable
- measurable
- safe enough to test responsibly

It should not be:

- broad
- feature-heavy
- overbuilt
- aesthetically over-optimized at the expense of clarity

## V1 definition of done

V1 is ready for live testing when all of the following are true:

1. A user can complete a full guided session.
2. The system preserves phase discipline.
3. The paywall and code logic work.
4. Escalation boundaries are represented in the flow.
5. The experience can be tested by trusted real users without live facilitation.
6. The team can observe completion and drop-off by phase.

## Primary V1 workstreams

V1 should be executed through five coordinated workstreams:

1. Product flow and UX
2. Prompting and orchestration
3. Data and state model
4. Safety and escalation
5. Access, testing, and measurement

## Workstream 1 — Product flow and UX

### Goal

Build a mobile-first guided experience that supports the six-phase Kairos flow.

### Must-have outputs

- entry screen or entry interaction
- phase-by-phase guided interaction
- structured options where needed
- pause / return handling
- paywall after phase 1
- completion and execution check

### Key requirements

- the user should always know what kind of step they are in
- the product should feel guided, not chaotic
- the interface should keep the user inside one decision

### Risks

- building it like a general chat tool
- making it too visually polished before the logic works
- letting the UI get ahead of the process integrity

## Workstream 2 — Prompting and orchestration

### Goal

Turn the phase prompt spec into actual operational prompts and routing logic.

### Must-have outputs

- system prompts by phase
- extraction prompts by phase
- option proposal logic
- completion checks by phase
- prompt overlays for safety conditions

### Key requirements

- prompts must remain phase-aware
- no single monolithic chat prompt
- prompts must return structured outputs usable by the application

### Risks

- letting the model drift into generic coaching
- over-trusting open-ended LLM behavior
- weak extraction that causes bad progression

## Workstream 3 — Data and state model

### Goal

Implement the minimum session architecture needed to persist one real decision journey.

### Must-have outputs

- user object or anonymous session identity
- session record
- current phase state
- extracted outputs by phase
- access state
- escalation state
- execution result state

### Key requirements

- raw messages and structured state must both be preserved
- the app must be resumable
- session transitions must be observable

### Risks

- storing only chat text and losing structured meaning
- weak session design that makes analytics impossible later

## Workstream 4 — Safety and escalation

### Goal

Implement the minimum viable safety posture for live testing.

### Must-have outputs

- escalation triggers
- stop-or-slow logic
- human support recommendation messages
- phase interruption support

### Key requirements

- unsafe or high-risk cases must not continue as normal
- escalation language must feel serious and clear
- the team must know which cases were escalated

### Risks

- treating safety as a later add-on
- false confidence in normal flow for dangerous cases

## Workstream 5 — Access, testing, and measurement

### Goal

Make the system testable in real communities and measurable from day one.

### Must-have outputs

- paywall event after phase 1
- code-based access
- session source tagging when possible
- basic funnel metrics

### Key requirements

- the team must be able to see phase completion
- the team must be able to compare paid and code-based usage
- trusted leaders should be able to distribute access simply

### Risks

- testing without instrumentation
- giving out codes without learning attribution

## Recommended build sequence

The build should proceed in a disciplined order.

## Stage 1 — Session foundation

### Goal

Create the skeleton of the product.

### Deliverables

- session model
- phase model
- routing logic
- basic persistence

### Exit condition

The system can create and maintain a session with phase state.

## Stage 2 — Core guided journey

### Goal

Make the six-phase experience operational from end to end.

### Deliverables

- phase interface states
- prompt orchestration by phase
- option rendering
- user input capture
- progression control

### Exit condition

A real user can complete the full flow in a test environment.

## Stage 3 — Commercial gate and code access

### Goal

Add the real V1 access model.

### Deliverables

- paywall after phase 1
- code entry flow
- access-state persistence

### Exit condition

The business logic for single-session unlocking works.

## Stage 4 — Safety layer

### Goal

Add minimum viable safety and escalation behavior.

### Deliverables

- trigger logic
- interruption paths
- escalation copy
- escalation logging

### Exit condition

The team can responsibly test the product with trusted users.

## Stage 5 — Measurement layer

### Goal

Capture enough behavioral data to learn from early usage.

### Deliverables

- phase funnel tracking
- access conversion tracking
- pause / return tracking
- escalation counts

### Exit condition

The team can observe what is working and where users drop.

## Stage 6 — Closed real-world pilot

### Goal

Put V1 in the hands of trusted leaders and real users.

### Deliverables

- a test cohort
- distributed codes
- clear feedback collection loop
- weekly review cadence

### Exit condition

The team has real usage data, real feedback, and real evidence of where the process holds or breaks.

## Suggested team roles

These do not need to be job titles yet, but responsibilities should be clear.

### Product lead

Owns:

- process integrity
- prioritization
- V1 scope discipline

### Interaction / prompt lead

Owns:

- phase behavior quality
- option quality
- clarity and tone

### Engineering lead

Owns:

- session architecture
- implementation quality
- reliability of flow and state

### Safety reviewer

Owns:

- escalation logic
- safety language
- high-risk case review

### Validation lead

Owns:

- pilot distribution
- learning loops
- user and leader feedback

In a small team, some people may hold multiple roles, but the responsibilities should still exist.

## V1 acceptance checklist

Before pilot launch, the team should be able to say yes to each of these:

- Can a user define one decision clearly?
- Can the system keep the user inside one decision?
- Can the system separate emotion from decision work?
- Can the user be guided through scripture and prayer without the product becoming spiritually inappropriate?
- Can the product reduce ambiguity in a usable way?
- Can the user leave with a concrete next action?
- Can the system escalate unsafe cases?
- Can the team observe where users stop?

If several answers are no, V1 is not ready.

## Pilot guidance

The first live distribution should be controlled.

Recommended pilot conditions:

- trusted leaders
- trusted churches or communities
- manageable volume
- code-based access
- explicit feedback path

Do not begin with:

- broad public release
- paid traffic
- large-scale distribution without visibility

## What to learn from V1

V1 should produce answers to questions such as:

- Which phase leaks the most users?
- Do users understand what Kairos is asking them to do?
- Does the process feel spiritually serious or merely novel?
- Do users reach real decisions?
- Do users come back?
- Do leaders trust the product enough to keep sharing it?

## Anti-drift reminders

During build, the team should keep remembering:

- V1 is a decision product, not a content product
- V1 is a process engine, not a chatbot
- V1 is a guided spiritual tool, not spiritual authority
- V1 is for serious testing, not feature accumulation

## Final build statement

The success of V1 will not come from how many features it has.

It will come from whether the first real users can say:

“This helped me move from confusion to a clear next step.”
