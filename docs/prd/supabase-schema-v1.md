# Supabase Schema V1

## Purpose

This document defines the first serious Supabase schema for Kairos V1.

It translates the product flow, commercial gate, bilingual requirement, and safety model into a relational backend structure.

It is intentionally practical.

The goal is not to model every possible future feature.

The goal is to create a schema that can support:

- real sessions
- real users
- real phase progression
- real access control
- real pilot analytics
- real bilingual operation

## Stack assumption

This schema assumes:

- Supabase Auth for authenticated users
- Supabase Postgres for application state
- Supabase Storage for source assets such as Bible files
- Vercel as the application runtime
- OpenAI as the orchestration and prompting layer

For V1, Kairos may still support low-friction entry patterns, but the serious backend model should already assume that authenticated identity is the canonical path.

## Design principles

### 1. One decision session is the core unit

The schema should revolve around one Kairos session, not around generic chats.

### 2. Raw data and structured state must both exist

We need:

- raw user inputs and assistant outputs
- extracted structured state for querying and progression

### 3. Safety must be first-class

Escalations cannot be hidden inside generic notes.

They must be queryable.

### 4. Bilingual support is foundational

English and Spanish should be represented in the data model from the start.

### 5. Storage and query should be separated

Bible source files can live in Storage, but product use should rely on structured database tables.

## Schema overview

The V1 schema is organized into seven groups:

1. Identity and access
2. Session and flow
3. Reflection and outcomes
4. Safety and escalation
5. Commercial and code access
6. Analytics
7. Bible content

## Supabase-specific operational layer

In Supabase, schema design is not only about tables.

For Kairos V1, the backend should also include:

- profile creation or sync from `auth.users`
- Row Level Security on user-facing tables
- server-side handling for privileged operations such as access-code generation
- a private Storage bucket for Bible source files

This keeps the product aligned with trust, pilot control, and future scale.

## 1. Identity and access

### Table: `profiles`

Purpose:

Represents a person in Kairos, whether they entered through normal auth or later through a richer identity layer.

Key fields:

- `id`
- `auth_user_id`
- `email`
- `display_name`
- `preferred_language`
- `role`
- `created_at`
- `updated_at`

Notes:

- `auth_user_id` links to `auth.users(id)`
- `preferred_language` should initially support `en` and `es`
- `role` can support `user`, `leader`, and `admin`
- profiles should be created automatically from Supabase Auth through a trigger or sync function

## 2. Session and flow

### Table: `decision_sessions`

Purpose:

Represents one Kairos discernment journey around one decision.

Key fields:

- `id`
- `profile_id`
- `language`
- `status`
- `current_phase`
- `decision_category`
- `decision_statement`
- `context_summary`
- `gate_unlocked`
- `source`
- `source_detail`
- `started_at`
- `completed_at`
- `last_user_message_at`
- `last_assistant_message_at`
- `created_at`
- `updated_at`

Notes:

- this is the operational center of the product
- one row = one decision journey
- `language` preserves the active session language

### Table: `session_messages`

Purpose:

Stores the conversational trace of the session.

Key fields:

- `id`
- `session_id`
- `phase_name`
- `role`
- `content`
- `content_json`
- `created_at`

Notes:

- `role` should support `user`, `assistant`, and `system`
- `content_json` allows future structured message extensions

### Table: `session_phase_states`

Purpose:

Stores structured progression state for each phase.

Key fields:

- `id`
- `session_id`
- `phase_name`
- `phase_order`
- `status`
- `raw_user_input`
- `assistant_output`
- `extracted_state`
- `completion_reason`
- `started_at`
- `completed_at`
- `created_at`
- `updated_at`

Notes:

- one row per phase per session
- `extracted_state` should hold normalized JSON from prompt extraction
- `status` should support values like `in_progress`, `completed`, `paused`, `escalated`

## 3. Reflection and outcomes

### Table: `session_outcomes`

Purpose:

Stores the most important normalized discernment outputs for a session.

Key fields:

- `id`
- `session_id`
- `feelings`
- `desires`
- `fears`
- `selected_lens`
- `scripture_reflection`
- `prayer_reflection`
- `clarity_state`
- `resistance_signal`
- `final_decision`
- `next_action`
- `next_action_due_at`
- `execution_status`
- `execution_notes`
- `created_at`
- `updated_at`

Notes:

- this table is the easiest place to query the “meaningful result” of a session
- array types work well for `feelings`, `desires`, and `fears`

## 4. Safety and escalation

### Table: `session_escalations`

Purpose:

Tracks safety events and human-support escalation inside Kairos.

Key fields:

- `id`
- `session_id`
- `escalation_level`
- `escalation_type`
- `trigger_source`
- `summary`
- `recommended_support`
- `status`
- `created_at`
- `updated_at`

Notes:

- `escalation_level` should align with the safety policy
- `recommended_support` can be stored as a text array
- this table should be queryable for pilot review

## 5. Commercial and code access

### Table: `pilot_cohorts`

Purpose:

Represents a pilot group, church, leader distribution cluster, or testing cohort.

Key fields:

- `id`
- `name`
- `description`
- `source_type`
- `owner_profile_id`
- `is_active`
- `created_at`
- `updated_at`

### Table: `access_codes`

Purpose:

Stores codes used to unlock sessions during pilot or community distribution.

Key fields:

- `id`
- `code`
- `label`
- `cohort_id`
- `granted_sessions`
- `max_redemptions`
- `redeemed_count`
- `is_active`
- `expires_at`
- `created_by_profile_id`
- `created_at`
- `updated_at`

Notes:

- codes can be attached to a cohort
- `granted_sessions` allows future multi-session logic

### Table: `code_redemptions`

Purpose:

Tracks actual use of codes.

Key fields:

- `id`
- `access_code_id`
- `profile_id`
- `session_id`
- `redeemed_at`
- `metadata`

Notes:

- useful for pilot analysis and distribution accountability
- code generation and redemption validation should be handled through secure server logic, not unrestricted direct client writes

## 6. Analytics

### Table: `analytics_events`

Purpose:

Captures lightweight product events for V1 analytics.

Key fields:

- `id`
- `session_id`
- `profile_id`
- `event_name`
- `phase_name`
- `properties`
- `occurred_at`

Notes:

- this should power funnel and pilot learning
- `properties` can store event metadata as JSONB

## 7. Bible content

### Storage bucket: `bible-source`

Purpose:

Holds source files for Bible versions in English and Spanish.

Examples:

- raw JSON
- CSV
- import-ready text sources

Important:

Storage is the source file layer, not the live query layer for the product.

Recommended setup:

- keep the bucket private
- upload Bible source files through admin or service-role processes
- import structured content from those files into `bible_versions` and `bible_verses`
- use database retrieval for product logic, not direct file reads

### Table: `bible_versions`

Purpose:

Tracks each Bible version loaded into the product.

Key fields:

- `id`
- `code`
- `language`
- `name`
- `abbreviation`
- `license_notes`
- `source_storage_path`
- `is_active`
- `created_at`

### Table: `bible_verses`

Purpose:

Stores structured verse-level Bible text for retrieval and reflection.

Key fields:

- `id`
- `version_id`
- `book`
- `chapter`
- `verse`
- `normalized_reference`
- `text`
- `created_at`

Notes:

- this table is where product queries should land
- use a uniqueness constraint on `version_id + book + chapter + verse`

### Optional V1.1 table: `scripture_paths`

Purpose:

Represents guided reflection paths such as:

- peace
- wisdom
- fruit
- commitment

This can be implemented later if needed, but it may become useful quickly.

### Operational ingestion tables

For serious ingestion, it is helpful to also track import jobs and row-level failures.

Recommended supporting tables:

- `bible_ingestion_jobs`
- `bible_ingestion_errors`

These tables do not power the user experience directly.

They power:

- repeatable imports
- validation visibility
- rollback confidence
- operational debugging

## Recommended language handling

The schema should support language in three places:

1. `profiles.preferred_language`
2. `decision_sessions.language`
3. `bible_versions.language`

This allows:

- user preference
- session-level language integrity
- language-specific Bible retrieval

## RLS approach for V1

Row Level Security should be enabled on every user-facing table.

The V1 access model should be simple:

- users can read and update their own profile
- users can create and access their own sessions and related session records
- users should not directly manage cohort, code, or admin distribution structures
- privileged tables should remain server-driven through trusted backend routes
- Bible content can be exposed read-only if the application needs direct retrieval, but it is safer to query it through server-side logic

### Tables that should be user-owned

- `profiles`
- `decision_sessions`
- `session_messages`
- `session_phase_states`
- `session_outcomes`
- `session_escalations`

### Tables that should be server-controlled

- `pilot_cohorts`
- `access_codes`
- `code_redemptions`
- `analytics_events` (inserted by application logic)

### Tables that should be read-only or server-mediated

- `bible_versions`
- `bible_verses`

## Recommended status values

### `decision_sessions.status`

- `active`
- `paused`
- `escalated`
- `completed`
- `abandoned`

### `decision_sessions.current_phase`

- `language_select`
- `phase1_define`
- `phase1_confirm`
- `paywall`
- `phase2_separate`
- `phase3_seek`
- `phase3_pause`
- `phase4_clarify`
- `phase5_commit`
- `phase6_execute`
- `complete`

### `session_phase_states.status`

- `not_started`
- `in_progress`
- `completed`
- `paused`
- `escalated`
- `skipped`

### `session_outcomes.execution_status`

- `pending`
- `executed`
- `not_executed`

## Recommended V1 sequence for database setup

1. Create `profiles`
2. Create `decision_sessions`
3. Create `session_messages`
4. Create `session_phase_states`
5. Create `session_outcomes`
6. Create `session_escalations`
7. Create `pilot_cohorts`
8. Create `access_codes`
9. Create `code_redemptions`
10. Create `analytics_events`
11. Create `bible_versions`
12. Create `bible_verses`
13. Create Storage bucket `bible-source`
14. Enable RLS on all user-facing tables
15. Add profile-sync trigger from `auth.users`
16. Add base policies for own-session access and protected commercial tables

## Final schema principle

The Kairos schema should reflect the product’s real nature:

not generic chat,
but one guided discernment session at a time,
with enough structure to support trust, clarity, safety, learning, and scale.

For the operational import path that feeds `bible_versions` and `bible_verses`, see [Bible Ingestion Model](bible-ingestion-model.md).

---

**Continue reading**

- [Back to START HERE](../START-HERE.md)
- [Previous: Implementation Blueprint](implementation-blueprint.md)
- [Next: Bible Ingestion Model](bible-ingestion-model.md)
