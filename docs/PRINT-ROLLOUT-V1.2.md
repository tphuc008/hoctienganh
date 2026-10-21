# Print Design System V1.2 — Website Vocab rollout

**Approved by user:** 21/10/2026, after reviewing the HSG V1.1 sample.
**Reference:** EXAM-PRINT-DESIGN-SYSTEM-V1.md.
**Goal:** one A4/typography/page-flow standard, but exercise-specific text layouts.

## Ownership

| File | Role |
|---|---|
| features/hsg-print.css / features/hsg-print-engine.js | HSG-specific typed renderer; keeps code/Part selection and OCR fallbacks. |
| features/print-design-system.js | Shared A4 CSS and presentation helpers for all other printable exercises. |
| features/universal-print.js | Vocabulary, Grammar, School/Midterm, Reading, Listening; context-aware passages and option grids. |
| features/lesson-plans.js | Protected Lesson Plans; uses shared design but does not alter access checks or answer data. |
| features/lesson-plans.css | Aligns browser preview with printed paper tokens. |
| index.html | Loads shared print design before UniversalPrint. |
| tests/print-design-v12.test.cjs | Guards shared tokens, options, paragraph boundaries, and security gates. |

## Shared paper tokens

- A4 portrait; margin **16mm top, 17mm right, 17mm bottom, 17mm left**.
- White paper, text #273241, burgundy #800040, blush #FCF0F0 limited to accents.
- Inter 10.5pt, line-height 1.58.
- Document hierarchy: title → Part → instruction → passage → question → options/answer space → optional solutions → footer.
- Preserve true paragraphs, bullets and salutations; allow long reading to flow across pages.
- A–D short choices: two columns when each <=50 characters and all <=150 total; otherwise one column.
- Fill/word formation: numbered answer lines or grid, no invented multiple choices.
- Long Reading: shared passage once and then comprehension questions.
- Listening: note to play the audio on the website; no invented transcript.
- Protected answers remain protected; printable keys and detailed solutions obey existing user's print-mode and Supabase/role/unlock access checks.
- HSG Matching/Error/Writing remain type-specific and require OCR preflight when source text is uncertain.

## Route coverage

- Grades 9/10/12 Vocabulary and Grammar sets: MCQ/input/context.
- School Grade 10 and Midterm tests: choice and short answer questions.
- Reading Grade 12 Marketing, Robots: shared passage once, question items after passage.
- Listening Entertainment and News: questions/options and audio notice.
- Grade 12 Lesson Plans Unit 7: protected answer key / detailed printing and Part selector.
- HSG tỉnh: structured Cloze/Open Cloze/Reading/Word Formation plus existing fallback printers for Matching, Error Correction, Writing.

## Quality gates

- Run Node pure unit tests, particularly tests/print-design-v12.test.cjs.
- Run tests/universal-print-browser.cjs and tests/lesson-quiz-print-browser.cjs for real PDF validation.
- Run tests/hsg-print-standard-v11.test.cjs for the HSG type renderer.
- Inspect real A4 PDF pages for long passage fragmentation, option wrapping, widow/orphan problems, and near-empty last pages.
- Deploying successfully is not a guarantee of visual quality; overall workflow failures must be resolved or qualified.
- New formats must explicitly provide suitable typed print data. Do not claim unsupported routes are printable.

## Constraints

Never rewrite source questions/options/passages or alter scores/progress.
Never leak private Lesson Plans answers into publicly served repositories or client bundles.
Do not pre-emptively rewrite or fabricate answers for formatting purposes.

## Versions

- V1.0 — exam-paper standard.
- V1.1 — HSG sample reviewed and approved by user.
- **V1.2 — 21/10/2026** — shared typesetting for other printable learning routes, preserving HSG's specialized type renderers.
