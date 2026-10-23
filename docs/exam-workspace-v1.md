# Exam Workspace Standard V1 — Hai Phong reference

The Hai Phong provincial English examination is the first reference exam for a reusable presentation contract. **Layout declarations and answer content are different concerns.** Do not include answer keys in this manifest.

## Files and responsibilities

| File | Responsibility |
| --- | --- |
| `content/hsg-tinh/hai-phong.workspace.json` | Validated layout, input type, scroll flow, source status and passage width for 10 Part entries |
| `features/hsg-workspace-v1.js` | Reusable schema validator and lookup functions |
| `features/hsg-workspace-v1.css` | Reusable screen-only presentation tokens and layout rules |
| `features/hsg-tinh.js` | Existing renderer, draft state, Part selection, result entry points and printing, now consuming workspace declarations |
| `content/hsg-tinh/hai-phong.structured.json` | Six fully typed passage-based Part datasets |
| `features/hsg-hai-phong-workspace-v2.css` | Legacy Hai Phong styling retained during progressive migration |
| `features/hsg-print.css` | Existing A4 layout, intentionally left unchanged |

## Four layouts

- `focused`: one question at a time, question-number rail; Grammar & Vocabulary, standalone Word Formation and Sentence Transformation
- `split`: source left and scrollable question list right; Guided Cloze, Word Formation passage and Open Cloze
- `error`: a source text and correction form, with original line anchors where verified
- `reading`: original passage on the left and all questions 81–90 scrollable in the right pane

Layout is **not** the same as the question input type. Both Grammar and Reading Comprehension can be multiple-choice (`mcq`), but use different layouts.

All split passages use a 54/46 baseline ratio, with existing adjustable-width controls. Desktop panes scroll independently; smaller screens use Passage / Questions tabs. The compact Part selector is persistent. Ordinary autosave success messages are hidden, but save errors remain visible. Draft keys (`partId:questionNumber`) do not change.

## Dataset contract and migration status

The validator checks schema version, exam ID, the ordered canonical list of Part IDs, contiguous question ranges (21–100), total coverage (80), input kind, supported display mode, question flow, passage ratios, and structured-source declarations. It rejects wrong labels and uncovered or overlapping question ranges.

Six entries are marked `structured`: `g2a`, `g2b`, `wp`, `oc`, `rc`, `r`. Four are intentionally marked `source-extracted`: `g1`, `e`, `wf`, `w`. **This is accurate status labeling, not a claim that these four Part datasets have been fully normalized or independently verified.**

For full data normalization later, compare against the original question-paper source:

1. `g1` (21–40): transcribe exact stems and all A–D options, cross-check 20 items.
2. `e` (51–55): preserve original passage and authentic line numbers; validate each correction prompt.
3. `wf` (56–60): capture exact stem, root word and expected answer field for each question.
4. `w` (91–100): capture verbatim source sentence, word prompts and rewrite constraints.

The existing `HSGPartSystem` currently accepts typed `guided_cloze`, `open_cloze`, `word_formation` and `reading_comprehension` records. New typed kinds or separate standalone question schema support must be introduced and tested **before** moving the four remaining sections to `structured`.

## Reuse with a second province

When adding another provincial exam, do not copy Hai Phong ID-specific CSS selectors or its answers. Build a new verified workspace manifest for that exam and use the shared `HSGWorkspaceV1` validator and `hsg-exam-ws-v1` / `hsg-exam-mode--*` CSS classes. This V1 contract assumes contiguous question numbering; exams with multiple question-number sequences (e.g. an essay numbered 1) need an extended coverage policy first.

Results may use a separate answer key and evaluation policy. The workspace never changes grading rules. The paper print pipeline is independent of this screen-only layout.

## Regression checks

Run `node tests/hsg-workspace-v1.test.cjs`. Also smoke-test in a browser: ten Part options, selecting and returning to a Part preserves draft answers, independent passage/question scroll for Part 9, mobile tabs, review/result dashboard, and A4 print of all or selected Parts.
