# Explanation Standard V1 — HSG tỉnh roll-out (2026-10-23)

## The reference format is the website's ORIGINAL three-stage renderer

Source of truth: `features/explanation-v1.js` and `features/explanation-v1.css`.

Every published, unlocked HSG solution uses:
1. **Bằng chứng** — exact source statement/phrase plus where it appears and the linguistic relevance
2. **Phân tích A–D / cách giải** — scope, grammar, collocation, comparison, distractors and reasoning; omit missing analysis rather than making up polished filler
3. **Vận dụng** — reusable pattern, authentic new example and Vietnamese interpretation where available

Short answer, quick reason and editorial `needs_review` state are part of the same `ExplanationV1.render(spec)` component. Do not invent option-specific reasons or four examples just to satisfy a visual template. `features/hsg-exam-solutions-v1.js` provides `asExplanationV1(record,question,section)` and `essayExplanationV1(essay)` to convert verified-only references into the standard; `features/hsg-tinh.js` invokes it ONLY after finishing, and keeps Hai Phong's already working adapter unchanged.

## Coverage and fidelity

| Exam | Workspace Parts | Response items | Published reference answers | Notes |
| --- | ---: | ---: | ---: | --- |
| Hải Phòng | 10 | 80 | Existing independently authored 80-item system | Existing answer/explanation module preserved |
| Đại học Vinh | 11 | 91 | 90 | One essay has no fixed answer; 65 prompt excerpts upgraded from original source, 25 remain source-review |
| Phú Thọ | 8 | 71 | 70 | One essay has no fixed answer; 65 prompt excerpts upgraded, 5 original correction lines remain source-review |
| Sơn La | 12 | 57 | 7 | New reasoning, phrase clues, some option analysis and real bilingual examples |
| Tây Ninh | 9 | 66 | 10 | Original prompt/collocation and A-D analysis for 5 items |
| Thanh Hóa | 11 | 71 | 10 | IPA/stress A-D analysis on phonetics, five verb-form explanations |
| Phan Bội Châu | 11 | 77 | 10 | Ten lexico-grammar items with grammar, collocations, bilingual transfer examples |
| Phổ thông Năng khiếu | Four exam codes | 520 | 0 | Adaptive source-driven layout; no verified answer bank yet |

This is **infrastructure coverage**, not full answer completeness. PBC and PTNK have local question numbering; the stable key is always `partId:questionNumber` and never number alone. PTNK retains the original mixed-mode per-block page switcher; an unattempted item is not eagerly source-parsed when reviewing the 520-item summary.

## Source references

- Sơn La: https://springboard.vn/de-thi-chuyen-anh-son-la-2026/
- Tây Ninh: https://springboard.vn/de-thi-chuyen-anh-tay-ninh-2026/
- Thanh Hóa: https://springboard.vn/de-thi-chuyen-anh-thanh-hoa-2026/
- Phan Bội Châu: https://springboard.vn/de-thi-chuyen-anh-pbc-nghe-an-2026/
- Earlier Vinh and Phu Tho references are documented in `docs/exam-workspace-next-two-provinces.md`.

Source pages are nonofficial study references. Each newly added solution is independently paraphrased/reasoned with a link to its task and a new bilingual transfer example; source responses are not copied wholesale. Source-extraction uncertainties and unclear alternatives MUST stay marked for editorial review. A reference-key choice is NOT automatically an authoritative exam-board answer.

## User-visible behavior

- Practice stage: no answer/reference explanations.
- After finishing: same V1 explanation card as the rest of the website; Evidence, Analysis, Application and a sample or skill transfer.
- Corrections and sentence transformations: accept equivalence uncertainty. Do not label every unmatched paraphrase **wrong**.
- Disputed alternatives (`reviewChoices`), reference excerpts lacking a reliable prompt (`editorialStatus: source-quote-needs-review`), and all essays: show **Cần kiểm tra**.
- Essay model: display a genuinely illustrative answer, not a machine-generated numerical score.
- Original Hai Phong results, A4 print, and saved draft identifiers remain unchanged.

## Storage and security caveat

The website is currently GitHub Pages, a publicly delivered frontend. Hidden HTML or a post-finish UI switch is **not** a secure answer-release mechanism; clients can inspect public JSON files. Protected tests would require private server-side distribution with authentication.

## Testing and remaining editorial work

`tests/hsg-explanation-seven-exams.test.cjs` (now checks all eight exams) covers manifest/question counts and solution specs from the live repo, including PTNK; existing Hai Phong and two-province tests were adjusted to the current build version. The test scripts were syntax-checked and the layout/solution schemas checked through the connected repo, but a full Node CI run and browser E2E must still be performed.

**Not yet complete:** solve/source-check remaining exam questions; repair the 30 Vinh/Phu Tho excerpts that could not be safely reconstructed; deepen per-option distractor analysis for the existing 160 references; validate the PTNK four answer keys; audit real mobile and desktop rendering and printing. Do not imply that unfilled answers are done.
