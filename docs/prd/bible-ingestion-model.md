# Bible Ingestion Model

## Purpose

This document defines how Kairos should ingest Bible content into Supabase for V1.

Its purpose is not merely to store Bible files.

Its purpose is to make Bible content:

- trustworthy
- bilingual
- queryable
- repeatable to import
- safe to operationalize inside the product

Kairos should not depend on freeform LLM recall for Scripture.

The product should retrieve real, structured Bible text from the database and use the model only to guide reflection around it.

## Core principle

There are three different layers in the Bible pipeline:

1. source files
2. structured database records
3. application retrieval and prompting

They should not be collapsed into one.

### Source files

These are the raw Bible assets the team owns or licenses.

They live in:

- Supabase Storage bucket: `bible-source`

### Structured database records

These are the normalized records the product can query safely.

They live in:

- `bible_versions`
- `bible_verses`

### Application retrieval

This is the runtime layer where Kairos chooses the correct language and Scripture content for a live session.

It should query the database, not raw files.

## V1 ingestion objective

For V1, the ingestion model should support:

- at least one English Bible version
- at least one Spanish Bible version
- verse-level lookup
- reliable chapter and verse referencing
- language-specific retrieval during discernment
- a repeatable import process if a file changes or a new version is added

## Recommended source format

Kairos should choose one canonical source format per imported version.

The preferred order is:

1. JSON
2. JSONL
3. CSV
4. TSV

### Preferred JSON shape

The cleanest source shape is one row per verse, for example:

```json
[
  {
    "book": "John",
    "chapter": 14,
    "verse": 27,
    "text": "Peace I leave with you, my peace I give unto you..."
  }
]
```

### Preferred CSV or TSV columns

- `book`
- `chapter`
- `verse`
- `text`

Optional but useful:

- `book_order`
- `book_abbreviation`
- `reference`

### Operational normalized format

Even if the original source enters as a chapter-based ZIP, Kairos can use `JSONL` as its normalized intermediate format.

That is a strong fit because it gives:

- one line per verse
- easy inspection
- easy batching
- easy resumability for later loading

## Storage model

Each Bible source file should be uploaded into:

- `storage/bible-source/<language>/<version-code>/...`

Example:

- `bible-source/en/kjv/kjv.json`
- `bible-source/es/rvr1960/rvr1960.json`

This makes the source layer predictable and human-readable.

## Database model

The ingestion path should write into these two core tables:

## `bible_versions`

One row per version.

Example fields:

- `code`
- `language`
- `name`
- `abbreviation`
- `license_notes`
- `source_storage_path`
- `is_active`

Example rows:

- `kjv` / `en` / `King James Version`
- `rvr1960` / `es` / `Reina-Valera 1960`

## `bible_verses`

One row per verse.

Example fields:

- `version_id`
- `book`
- `chapter`
- `verse`
- `normalized_reference`
- `text`

Example normalized references:

- `john-14-27`
- `filipenses-4-7`

The exact normalization format can vary, but it must be stable.

## Operational ingestion tables

The ingestion process should also write into:

- `bible_ingestion_jobs`
- `bible_ingestion_errors`

This gives the team a serious operational trail.

It answers:

- what version was imported
- from which file
- in what format
- how many rows were processed
- how many rows failed
- what exactly broke

## Ingestion pipeline

The recommended V1 pipeline has six steps.

### Step 1. Upload the source asset

The team uploads the licensed or approved Bible file into `bible-source`.

This should happen through an admin or service-role path, not the public app.

### Step 2. Register the import job

Create a row in `bible_ingestion_jobs` with:

- version code
- language
- storage path
- source format
- job status = `queued`

Depending on the stage of the pipeline, `source_format` may refer either to:

- the original source file, such as `zip`
- or the normalized loader input, such as `jsonl`

### Step 3. Parse and normalize

A server-side ingestion script should:

- download the file from Storage
- parse the file format
- validate required fields
- normalize book names
- normalize references
- trim malformed whitespace
- reject empty verse text

### Step 4. Create or update the Bible version

The importer should upsert a row into `bible_versions`.

That row becomes the parent record for all imported verses.

### Step 5. Insert verses

For each verse:

- resolve `version_id`
- insert into `bible_verses`
- preserve exact verse text

If a row fails:

- increment the error count
- write a row into `bible_ingestion_errors`

### Step 6. Complete and validate

At the end of the import:

- mark the ingestion job as `completed` or `failed`
- store totals
- validate expected verse count
- verify random sample references manually

## Normalization rules

Kairos should normalize aggressively at import time, not at runtime.

### 1. Language is explicit

Every imported version must declare:

- `en`
- or `es`

### 2. Book names should be stored in the language of the source version

Examples:

- English version: `John`
- Spanish version: `Juan`

This preserves textual fidelity.

### 3. References should also have a normalized lookup string

Example:

- display reference: `John 14:27`
- normalized reference: `john-14-27`

For Spanish:

- display reference: `Juan 14:27`
- normalized reference: `juan-14-27`

### 4. Verse text should not be paraphrased

Kairos should store the source text exactly as approved.

No rewriting should happen during import.

### 5. Empty or malformed rows should not silently pass

Bad rows should be logged into `bible_ingestion_errors`.

## Validation checks

Before a version is considered ready for product use, the ingestion process should confirm:

- the version row exists in `bible_versions`
- all verses belong to the correct `version_id`
- no duplicate `book/chapter/verse` rows exist
- the version has the expected row count
- random spot checks match the source file
- the language field matches the intended version

## Activation rule

An imported Bible version should not automatically become active for runtime use unless it has passed validation.

Recommended rollout:

1. import the version
2. validate the version
3. set `is_active = true`

This protects the discernment experience from half-imported or malformed Scripture data.

## Runtime retrieval model

When Kairos needs Scripture during a session:

1. detect session language
2. choose the active Bible version for that language
3. retrieve the relevant verses from `bible_verses`
4. pass the exact Scripture text into the prompt context
5. let the LLM guide the reflection around that text

This preserves the proper boundary:

- database provides the Scripture
- model provides the interaction

## V1 import strategy

For V1, Kairos does not need every translation immediately.

It needs a trustworthy import path.

Recommended V1 sequence:

1. import one English version
2. import one Spanish version
3. validate retrieval and runtime language selection
4. add more versions later under the same pipeline

## Suggested file and process layout

Inside the repo, the next practical structure could be:

- `supabase/schema-v1.sql`
- `supabase/bible-ingestion/`
- `supabase/bible-ingestion/README.md`
- `supabase/bible-ingestion/import-bible.ts`
- `supabase/bible-ingestion/validators.ts`
- `supabase/bible-ingestion/reference-normalizer.ts`

This keeps ingestion separate from the product UI and prompt logic.

## Final principle

Bible ingestion in Kairos is not a content upload problem.

It is a trust infrastructure problem.

If Scripture enters the system carelessly, the discernment process becomes unstable.

If Scripture enters the system cleanly, the product gains reliability, spiritual seriousness, and long-term leverage.

---

**Continue reading**

- [Back to START HERE](../START-HERE.md)
- [Previous: Supabase Schema V1](supabase-schema-v1.md)
- [Next: V1 Build Plan](v1-build-plan.md)
