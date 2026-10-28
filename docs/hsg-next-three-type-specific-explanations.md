# Hải Phòng → Đại học Vinh, Phú Thọ, Sơn La: type-specific explanation rollout

2026-10-28 — Applies the existing Hải Phòng's per-question explanation architecture to the **next three papers in the website's exam catalogue order** (Vinh → Phú Thọ → Sơn La), without copying its subject-specific keys, passages or distractors.

## Published reference coverage

| Paper | Total assessed response items (including non-scored writing) | Source-based solution records | Sentence Transformation |
| --- | ---: | ---: | ---: |
| Đại học Vinh | 91 | 90 | 10/10 |
| Phú Thọ | 71 | 70 | 10/10 |
| Sơn La | 57 | 12 | 5/5 |

The remaining **45 Sơn La questions** do not have a cross-checked published answer record. Its two open writing tasks also have no fixed single answer. The site must not synthesize an answer key or imply 100% coverage.

## Explanation layouts

- Grammar/Lexico-Grammar: answer; evidence and specific grammar/collocation reasoning; Vietnamese meaning or an explicit warning when a full translation is absent; A–D analysis when available; four original bilingual usage examples when available, otherwise an explicit coverage gap.
- Error Correction: source line if verified, wrong form → correction, relevant grammar rule/why it is wrong, and transferable example when one is genuinely available.
- Word Formation: answer and word class **only if source provides it**, source-word derivation when available, contextual rationale and common confusion if reviewed.
- Open Cloze: answer/meaning, source clue, reasoning, optional elimination, takeaway.
- Guided Cloze: Context Clue, Coherence, Elimination and Key Takeaway. Missing inter-sentential evidence is marked, not fabricated.
- Reading comprehension/matching/TFNG: Question Focus, source evidence with record locator, option logic or proof analysis, Key Takeaway.
- Sentence Transformation: exactly four ordered sections: **Đáp án → Câu hoàn chỉnh → Cấu trúc ngữ pháp (formula and meaning) → Ghi nhớ (two reusable expressions)**. All 25 written completions are scoped by exam ID, section, question number, original quote, answer and printed prefix. Sơn La Writing 76–80 has newly source-reasoned explanations.

For genuine multiple-choice explanation records that lack four A–D bilingual examples or full option notes, the UI openly labels the missing editorial material. Formatting coverage is not the same as **completed, independently verified teaching content**. No dynamic generation happens during student review; the results screen uses stored canonical material.

## Source corrections and safeguards

- Vinh D7: the idiom is **in a positive light**. The fragment must include final **a** so that the fixed printed suffix makes a grammatical complete sentence.
- Phú Thọ W90: retains **suddenly**, which is part of the original meaning; it remains within the 2–6-word constraint.
- Sơn La W76–80: source-checked teacher-authored suggestions, marked needs-review (not official keys).
- Vinh D4: the printed destination includes the awkward phrase **to the victory**; the source's wording is preserved while the natural common form **lead to victory** is explained.
- Other exams (including Hải Phòng and Tây Ninh) keep their own unchanged renderers. Essay remains unscored and uses the existing guide.
- Answers stay hidden until the learner finishes, use the preexisting user-permission controls and provenance links, and retain the conservative written-answer review status.
- Source traceability depends on the original reference's quality. Some earlier citations are only placeholders or insufficient to prove paragraph/line position; the new renderer explicitly says so.

## Code / tests

- `features/hsg-next-three-explanation-formats.js` — scoped, non-mutating type-specific renderer.
- `features/hsg-tinh.js` — after-unlock type-specific renderer with existing V1 fallback.
- `index.html` — loads the type-specific file before the HSG view.
- `content/hsg-tinh/{dh-vinh,phu-tho,son-la}.solutions.json` — source-preserving corrections and Sơn La Writing records.
- `tests/hsg-next-three-explanation-formats.test.cjs` — all 172 cards, all 25 four-section sentence transformations, prompt-source checks, no cross-exam leakage.
