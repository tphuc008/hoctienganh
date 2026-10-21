# Website Vocab — Contributor / AI Instructions

## Canonical solution explanation structure

Read **[docs/EXPLANATION-STANDARD-V1.md](docs/EXPLANATION-STANDARD-V1.md)** before creating, editing, transforming, importing, evaluating or displaying **any solution/explanation** in this repository, including protected **Lesson Plans** answer content.

The approved Explanation Standard V1.1 is:

- **Quick Explanation:** correct answer + 1–2 useful sentences connecting a decisive clue to that answer; further reasoning available on demand.
- **01. Bằng chứng:** precise question interpretation/translation → real clue/source evidence → explicit mechanism that connects the clue to the required answer.
- **02. Phân tích A–D:** separate and specific meaning, usage and correctness analysis for all actual A–D choices; for non-MCQ items, analyze the derivation/solution instead.
- **03. Vận dụng:** for Vocabulary A–D, **one correct complete English sentence and accurate Vietnamese translation for each of the four options**; add a question-specific transferable pattern if truly useful.

Do **not** pad solutions with generic advice, tautologies or unsupported lexical distinctions. An explanation is not acceptable solely because its HTML has three steps. Mark missing evidence or per-option analyses as **needs_review**, never fabricate them.

**Scope:** every non-Grammar-Testing website section (Vocabulary, Reading, Listening, School, Mid-term, Lesson Plans and others). **Exception:** existing experimental **Grammar Testing**, including teacher-only Grammar Topic 21, is excluded unless separately requested.

Preserve the existing answer keys, access checks, Supabase-protected Lesson Plans solutions, printing permissions, user progress and scoring. Do not expose private solutions in public data or client bundles. Review the canonical standard for the full quality gates, worked example and implementation notes.


## Canonical print design standard

Read [docs/EXAM-PRINT-DESIGN-SYSTEM-V1.md](docs/EXAM-PRINT-DESIGN-SYSTEM-V1.md)
and [docs/PRINT-ROLLOUT-V1.2.md](docs/PRINT-ROLLOUT-V1.2.md)
before editing any website print/PDF renderer.

- Use **one A4 layout standard**: 16mm top, 17mm remaining margins, white paper, Inter 10.5pt / 1.58 line-height, #800040 as accent.
- Choose **a distinct semantic print structure per exercise kind**: MCQ, Guided/Open Cloze, Reading, Matching, Error Correction, short answer, Writing, Listening; do not pour raw text into a page.
- Share source passages once; preserve original text, numbering, gaps, bullet lists, instructions and question order. Use 2-column A–D only when options fit; long answers use 1 column.
- Public exercises and permitted Lesson Plans use features/print-design-system.js; HSG retains features/hsg-print-engine.js and features/hsg-print.css with matching A4 tokens.
- Preserve existing key/detailed-print choices and all protected solution/permission checks. Never embed protected answer content into public repositories.
- Run print unit tests and render/check the final PDF; a successful GitHub Pages deployment alone is not print quality assurance.
