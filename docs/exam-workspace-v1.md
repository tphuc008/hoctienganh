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


## Verified original Hai Phong paper rules (audit, 2026-10-23)

The **10 displayed website Parts are logical learning units**; they are not a literal transcription of the paper's original Part labels. For example, the advertisement and letter are separated into website Parts 2 and 3 even though both belong to the original Guided Cloze grouping. The original paper also contains a final paragraph-writing prompt. It is **excluded from online practice by user decision**, not absent from the original source. Website question coverage intentionally remains Q21–100 (80 questions).

Rules confirmed by reading the compressed original source `content/hsg-tinh/hai-phong.txt`:

- **Q51–55 — Error Correction:** find *five* errors in one shared passage. The original printed source has **12 numbered lines**. The website presents five response slots alongside this passage; it must not treat the text as five independent passages.
- **Q91–95 — keyword transformation:** use the given keyword **without changing it**, and enter **3–6 words including that keyword**. Word count is a guidance indicator; automated scoring does not establish semantic equivalence for every possible valid rewriting.
- **Q96–100 — sentence completion:** complete the second sentence while preserving the meaning. **Do not apply Q91–95's mandatory keyword or 3–6-word constraint** to these five questions.
- **Q100 — next-task boundary:** the question is the last numbered item on its source page, followed by the original paper’s **Part 3. Paragraph writing**. Screen extraction stops at this heading, preventing the removed essay prompt from appearing in Q100. The validated print-source extractor likewise stops at the next Part heading.
- **Q29 — physical page boundary:** the question stem is at the end of original source page 2, while its A–D options begin source page 3. The shared source extractor recovers a complete next-page A–D sequence *only* from the prefix preceding the next numbered question. The preserved answer choices are "Were you to require", "Should you require", "Required", "Had you required".
- **Q21–40** have 20 MCQs; **Q56–60** are five standalone word-form questions; **Q91–100** have ten rewriting stems. These four source-extracted groups still need an editorial proofread before a full 10/10 source-normalization claim.

Manifest fields `task` (shared error passage) and `subtasks` (rewrite constraints) are validated by `HSGWorkspaceV1` and interpreted by the Hai Phong renderer. The display shows the distinct rewrite instructions and a non-blocking 3–6-word counter for Q91–95. **Answers remain saved in their original draft keys** and no result or print pipelines were replaced.

### Regression tests

Run both commands in the repository root:

- `node tests/hsg-workspace-v1.test.cjs` — schema integrity, layout count and invalid-config rejection.
- `node tests/hsg-hai-phong-source-audit.test.cjs` — decompresses the original paper, checks original numbered error lines and rewriting instructions, and checks complete Q21–40 / Q56–60 / Q91–100 question parsing (including Q29 options across pages and the Q100 essay boundary).

The original source is a PDF-text extraction, not an independently authenticated official final answer key. Keep original exam text and editorial/reference answers separate. A code-level audit does not replace checking the actual screen, mobile behavior and print preview after publication.

## Reuse with a second province

When adding another provincial exam, do not copy Hai Phong ID-specific CSS selectors or its answers. Build a new verified workspace manifest for that exam and use the shared `HSGWorkspaceV1` validator and `hsg-exam-ws-v1` / `hsg-exam-mode--*` CSS classes. This V1 contract assumes contiguous question numbering; exams with multiple question-number sequences (e.g. an essay numbered 1) need an extended coverage policy first.

Results may use a separate answer key and evaluation policy. The workspace never changes grading rules. The paper print pipeline is independent of this screen-only layout.

## Regression checks

Run `node tests/hsg-workspace-v1.test.cjs`. Also smoke-test in a browser: ten Part options, selecting and returning to a Part preserves draft answers, independent passage/question scroll for Part 9, mobile tabs, review/result dashboard, and A4 print of all or selected Parts.
