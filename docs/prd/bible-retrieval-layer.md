# Bible Retrieval Layer

## Purpose

This document defines how Kairos should retrieve Scripture at runtime once Bible content has already been ingested into Supabase.

It sits after:

- source selection
- ingestion
- validation
- activation

Its purpose is to make Scripture retrieval:

- language-aware
- version-safe
- runtime-friendly
- consistent across product surfaces

## Retrieval principle

Kairos should not retrieve Scripture by asking the model to remember verses.

Kairos should retrieve Scripture from Supabase first, then give exact text to the model as prompt context.

That means the retrieval layer must answer:

1. which version is active for this language
2. which verse or passage should be returned
3. what exact text should be handed to the interaction layer

## Retrieval scope for V1

V1 does not need semantic Scripture search yet.

It needs three reliable retrieval patterns:

1. active version by language
2. single verse by normalized reference
3. passage by book, chapter, and optional verse range

## Database functions

The retrieval layer is implemented first as database functions.

### `get_active_bible_version(target_language text)`

Returns the first active Bible version for a given language.

Use case:

- determine which version Kairos should use for `en`
- determine which version Kairos should use for `es`

### `get_bible_verse_by_reference(target_language text, target_reference text)`

Returns a single verse for an active version in the requested language using a normalized reference.

Example:

- `john-14-27`
- `genesis-1-1`
- `juan-14-27`

Use case:

- prompt context
- reflection handoff
- exact verse rendering

### `get_bible_verse_by_location(target_language text, target_book text, target_chapter integer, target_verse integer)`

Returns one verse using explicit book / chapter / verse coordinates.

Use case:

- deterministic lookups
- UI direct retrieval
- internal validation

### `get_bible_passage(target_language text, target_book text, target_chapter integer, start_verse integer default null, end_verse integer default null)`

Returns an ordered passage in the active version for that language.

Use case:

- phase 3 Scripture presentation
- short reading plans
- guided reflection blocks

## Why this structure is good for Kairos

It preserves the correct boundary:

- `bible_versions` decides what version is active
- `bible_verses` stores the authoritative text
- database functions expose stable retrieval paths
- the application layer does not rebuild SQL rules every time
- the LLM receives exact text, not freeform memory

## Retrieval examples

### Active version

```sql
select * from public.get_active_bible_version('es');
```

### Single verse by normalized reference

```sql
select * from public.get_bible_verse_by_reference('en', 'john-14-27');
```

### Single verse by location

```sql
select * from public.get_bible_verse_by_location('es', 'Juan', 14, 27);
```

### Passage

```sql
select * from public.get_bible_passage('en', 'Genesis', 1, 1, 5);
```

## Application-layer usage

The application should call the retrieval layer in this order:

1. determine session language
2. retrieve exact verse or passage
3. render the text to the user
4. pass the text into the prompt context
5. guide reflection around the text

This keeps the product serious:

- Scripture comes from the database
- interpretation guidance comes from Kairos
- discernment remains anchored in real text

## V1 limitations

The retrieval layer does not yet handle:

- theme search
- fuzzy search
- cross-language reference mapping
- topic clustering
- semantic similarity

Those can come later.

For V1, exact retrieval is enough.

## Future extension

Later, Kairos may add:

- `scripture_paths`
- theme-to-reference mapping
- verse bundles per discernment lens
- caching of high-frequency retrieval paths

But those should sit on top of this exact retrieval layer, not replace it.

## Final principle

The retrieval layer is not a convenience feature.

It is part of Kairos’s spiritual and technical integrity.

If Kairos retrieves Scripture carelessly, the discernment process becomes unstable.

If Kairos retrieves Scripture exactly and consistently, the interaction layer remains trustworthy.

---

**Continue reading**

- [Back to START HERE](../START-HERE.md)
- [Previous: Bible Ingestion Model](bible-ingestion-model.md)
- [Next: V1 Build Plan](v1-build-plan.md)
