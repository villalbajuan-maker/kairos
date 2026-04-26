# Product Architecture

This document captures the conceptual architecture, not the final implementation architecture.

## Architectural principle

Kairos is not a generic chatbot.

Kairos is a guided process engine for discernment.

The architecture must reflect that.

## Main layers

### 1. Process engine

This is the structural core.

It defines:

- phases
- transitions
- success conditions
- block conditions
- when ambiguity must be reduced
- when the user must pause

This layer behaves like a state machine.

### 2. Interaction engine

This is where language happens.

It is responsible for:

- asking questions
- reframing
- paraphrasing
- proposing clearer formulations
- confronting gently
- helping the user converge

This layer should always be governed by phase and state.

### 3. Scripture and discernment layer

This layer exists to support intentional engagement with biblical material and prayer.

Important boundary:

- technology can guide interaction
- technology cannot replace spiritual source or authority

Therefore this layer should help:

- select relevant scriptural paths
- present references or passages appropriately
- structure reflection questions
- maintain reverence and accuracy

### 4. Session memory layer

Kairos is not a one-message system.

It needs session memory for:

- the exact decision
- what the person feels, wants, fears
- what they believe they perceived
- what they decided
- what action they committed to

### 5. Learning layer

This layer should not learn doctrine.

It should learn process effectiveness.

Examples:

- where users get stuck
- which prompts reduce ambiguity best
- which interventions increase return after a pause
- which formulations lead to completion

## Interaction contract

Kairos should never behave as unconstrained free chat.

Its interaction contract should be:

- phase-aware
- objective-aware
- clarity-seeking
- spiritually respectful
- non-authoritarian
- non-vague

## Commercial layer

The product architecture also includes a monetization checkpoint.

Current thesis:

- Phase 1 is free
- the paywall appears after the decision is clearly defined
- the user can either pay or enter a code

This placement is intentional because the user has already felt the first moment of value but has not yet received the full process.
