# Exam Workspace Standard — Đại học Vinh & Phú Thọ

Implemented from the Hải Phòng reference workspace, with each original provincial exam's question IDs and Part boundaries preserved.

## Deployment

| Exam | URL fragment | Part count | Response items | Numbering |
| --- | --- | ---: | ---: | --- |
| Đại học Vinh | `#teacher/hsg-tinh/dh-vinh` | 11 | 91 | local to each original section; IDs may repeat |
| Phú Thọ | `#teacher/hsg-tinh/phu-tho` | 8 | 71 | includes an independently numbered essay |

The counts above include the Essay item. A learner's answer is always addressed by `partId:questionNumber`, never only the question number.

## Shared UX with Hải Phòng

- Full-width distraction-free screen when a validated workspace manifest is available; the existing site header/breadcrumb are hidden during the exam, not in the results dashboard
- Small header with the correct exam title, Part selector, Part progress, paper printing and Finish controls
- Focused standalone question display; Split source passage and scrollable answer list; numbered Error Correction passage and answer form; scrollable Reading Comprehension or Matching questions
- Passage and question panes scroll independently, with 54/46 default passage ratio and existing adjustable width controls
- Mobile source/question tabs; answer autosave remains active with quiet success state, errors still visible
- Full-width Essay writing surface without a redundant question map
- Existing A4 print engine and printable source files unchanged

Both manifests are `exam-workspace-v1`, validated by `features/hsg-workspace-v1.js`. The extension `numbering: "per-part"` allows overlapping local question numbers without the globally contiguous constraint used by Hải Phòng. The source files remain in their existing compressed original form and the editor's answer-draft keys are unchanged.

## Solution structure — published reference answers (2026-10-23)

**Đại học Vinh**: 90 sourced reference answers (11 Parts, 91 items with one essay); the suggested key was found in the non-official *Đáp án đề nghị Chuyên Anh Đại học Vinh 2026–2027* and checked against the test topic and numbering. **Phú Thọ**: 70 worked/cross-checked answers (8 Parts, 71 items with one essay) based on the matching 2026 official paper and the Springboard 2026 explanation article. A similarly named *Phú Thọ mock test answer key* is for a DIFFERENT test and was intentionally not used.

URLs:
- Đại học Vinh: https://www.scribd.com/document/1052832015
- Phú Thọ: https://springboard.vn/de-thi-chuyen-anh-phu-tho-2026/
- Phú Thọ annotated paper: https://www.scribd.com/document/1070081848

Each record has the reference answer, explanatory reasoning in Vietnamese, task/source locator, potential distractor notes, transferable pattern, reference provenance and non-official source flag. The answer structure is open to future editorial improvements; a sourced answer is not an official answer key, and the notes do not claim that the original examiners have confirmed every accepted alternative.

The shared solution module now:
- Compares MCQ, YES/NO/NOT GIVEN and letter matching with the published reference, marking **correct** or **wrong**
- Marks a matching Word Formation, Cloze or Sentence Transformation answer **correct**, but unmatched free-text answers **need review**, not automatically incorrect
- Leaves Error Correction answers requiring reviewer judgment, since original passages ask for several errors in one text and answers may be entered in different slots
- Treats written essays as non-scored, shows an illustrative AI-written model after finishing (269 words for Vinh, 146 words for Phú Thọ) and a short rubric
- Displays item-level explanation panels only in the answer-review stage, with links to the non-official external answer/reference source
- Shows the dashboard status breakdown **correct / wrong / needs review / blank**, preserving the learner's draft data and supporting resume

No 100%-accurate official score is promised. The user-facing result includes a non-official-grading notice, so a valid alternate rewriting will not be marked wrong merely because it differs from the sample reference.

Do not use Hải Phòng's exam-specific answer keys or automatic scoring for Vinh or Phú Thọ. Even if matching Part IDs appear across exams, the sources and correct responses are different.

## Files

- `content/hsg-tinh/dh-vinh.workspace.json`
- `content/hsg-tinh/phu-tho.workspace.json`
- `content/hsg-tinh/dh-vinh.solutions.json`
- `content/hsg-tinh/phu-tho.solutions.json`
- `features/hsg-workspace-v1.js` (shared presentation validation)
- `features/hsg-workspace-v1.css` (shared screen-only styling)
- `features/hsg-exam-solutions-v1.js` (reusable solution contract and ungraded answer review)
- `features/hsg-tinh.js` (three provincial exams now routed through the same workspace UI)
- `tests/hsg-workspace-two-provinces.test.cjs` (validation and synthetic rendering regression)
- `tests/hsg-two-provinces-answers.test.cjs` (reference keys, essays, aliases and grading safeguards)

## Regression and limitations

Run `node tests/hsg-workspace-two-provinces.test.cjs` at the repository root. Validate existing saved answers per group, switch among Part and Essay, test scrolling on desktop/mobile, print a subset and all parts, submit for ungraded review and resume.

Both exams still render the original compressed paper via source extraction, rather than a fully transcribed typed question JSON. Browser-level QA and independent proofreading of solution alternatives remain advisable.