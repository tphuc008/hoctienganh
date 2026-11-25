# HSG reusable structured part system (v1)

This is a **data-driven examination interface**. New exams reuse `features/hsg-part-system.js` and `features/hsg-tinh.css`; they should not copy or redefine custom HTML/CSS for each province.

## Exam data

An exam still has its original compressed source `<exam-id>.txt`. Add a sibling file `<exam-id>.structured.json` to opt the exam into typed renderers. The website automatically discovers and validates the JSON file before rendering. Existing exams without structured data keep the legacy layout.

The JSON contract is:

- `version`: 1
- `examId`: matches the exam identifier in `CONFIGS`
- `parts`: array of separate Part objects
- Each Part: `id`, `title`, `kind`, `start`, `end`, `passage`, `questions`, optional `optionsLayout`.
- `kind`: `guided_cloze`, `open_cloze`, `word_formation`, or `reading_comprehension`.
- `optionsLayout`: `compact` for short A–D responses, `stacked` for long answer choices.
- `passage`: ordered array of `{type, text}` blocks. Supported types: `heading`, `paragraph`, `bullet`, `salutation`, `closing`. Preserve every word and the actual text order; do not include questions or answer options inside a passage.
- `questions`: exactly one `{number, stem, options? , word?}` for each item in the Part. MCQ questions require four complete strings in `options`. Word Formation requires the source word in `word`.

The Part ID and range must match its entry in `HSG_PARTS` within `features/hsg-tinh.js`. When adding a new exam, register its metadata in `CONFIGS` and declare its Part IDs, kinds, page hints, and question ranges in `HSG_PARTS`. **No new page or CSS is required.**

## Parsing and publication rules

1. Extract the source text from the original exam and preserve title, paragraph boundaries, bullet items, greetings, signatures, blanks and capitalization.
2. Separate every passage from its subsequent question bank. Never use the beginning of the next Part as the end of the final answer option.
3. Confirm all question numbers and the number of blanks match the source.
4. Confirm every MCQ has exactly four source options. Do not create artificial A–D placeholders, answers, or explanations.
5. For Open Cloze use one text field per gap. For Word Formation retain the root-word hint next to the corresponding input. For Reading Comprehension show full question stems and vertical A–D options.
6. Execute `npm test`, including `tests/hsg-structured-parts.test.cjs`; manually test desktop/mobile, autosave, question navigation and print.
7. Do not publish an incomplete Part. Invalid structured data must fail validation rather than silently mix unrelated PDF text.

## Pilot: Hải Phòng

`hai-phong.structured.json` is the first pilot. Its structured parts are:

- g2a: Guided Cloze Advertisement, 41–45 (compact)
- g2b: Guided Cloze Letter, 46–50 (compact)
- wp: Word Formation passage, 61–65
- oc: Open Cloze, 66–75
- rc: Guided Cloze, 76–80 (stacked)
- r: Reading Comprehension, 81–90 (stacked)

Error Correction, stand-alone Word Formation and Writing retain the existing renderer during the pilot. Saved answers to the old `oc:61`–`oc:65` keys are migrated into `wp:61`–`wp:65` when reopening the Hải Phòng paper.

The shared system is independent of the exam name, so adding another structured exam means authoring its data and mapping, not duplicating the interface.

## Following three exams (2026-10-28)

The next catalogue entries after Hải Phòng are **Đại học Vinh**, **Phú Thọ**, and **Sơn La**. Each now opts selected source-complete parts into the same structured passage/question workspace while other parts retain source-extracted fallback (no invented text).

- Đại học Vinh: `c2` (YES/NO/NOT GIVEN, 11–15) and `c4` (matching people, 19–23); both use the original oil passage. `c1`/`c5` remain legacy because their OCR source is incomplete or displaced across pages.
- Phú Thọ: `r1` (Bonsai guided cloze, 51–60), `r2` (East Africa open cloze, 61–70), `r3` (conversation reading comprehension, 71–80).
- Sơn La: `g1` (Green Transportation guided cloze, 26–30), `g2` (Paperless Exams guided cloze, 31–40), `oc` (soft skills open cloze, 51–55), `r` (AI reading comprehension, 61–67).

Additional kinds: `yes_no_not_given` maps to the existing `ynng` choice input and `matching` maps to `match`. These are evidence-based passage tasks, not cloze tasks: each question has a complete stem and uses the existing exam-specific answer labels, so there is no fabricated numbered gap in the source passage. All other validator restrictions still apply. Keep answer keys outside these JSON files; the existing verified-only solution release stays unchanged.
