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

## Solution structure (review-first, verified-only)

Both exams load a companion `*.solutions.json` with schema:

- `correctAnswer`: verified reference answer
- `explanation`: why this answer is correct in the source context
- `evidence`: location and quotation in the original task
- `distractorAnalysis`: why incorrect choices are not suitable
- `transferablePattern`: reusable grammar, vocabulary or reasoning insight

No answer records have been authored or verified for these two exams at this point. The UI therefore shows **answer coverage**, the learner's **saved responses**, source question previews and a way to reopen each question, not fabricated correctness marks or an official score. Each unverified response is explicitly flagged as awaiting an answer/explanation. When verified records are added, the shared module validates their provenance and can show structured explanatory panels in review mode.

Do **not** use Hải Phòng's exam-specific answer keys or automatic scoring for Vinh or Phú Thọ. Even if matching Part IDs appear across exams, the sources and correct responses are different.

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

## Regression and limitations

Run `node tests/hsg-workspace-two-provinces.test.cjs` at the repository root. Validate existing saved answers per group, switch among Part and Essay, test scrolling on desktop/mobile, print a subset and all parts, submit for ungraded review and resume.

Both new exams currently use the original source text extractor; they **do not** have fully transcribed, independently verified structured question datasets or answer keys. Interface normalization is complete at the manifest and renderer level, but a browser-level UX check and content audit are still required before calling each exam fully verified. Older province exams retain their previous UX and grading behavior until explicitly migrated.
