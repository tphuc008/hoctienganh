# Hải Phòng → Đại học Vinh, Phú Thọ, Sơn La: type-specific explanation rollout

2026-10-28 — Applies the existing Hải Phòng's per-question explanation architecture to the **next three papers in the website's exam catalogue order** (Vinh → Phú Thọ → Sơn La), without copying its subject-specific keys, passages or distractors.

## Published reference coverage

| Paper | Total assessed response items (including non-scored writing) | Source-based solution records | Sentence Transformation |
| --- | ---: | ---: | ---: |
| Đại học Vinh | 91 | 90 | 10/10 |
| Phú Thọ | 71 | 70 | 10/10 |
| Sơn La | 57 | 55 source-analyzed answers | 5/5 |

Sơn La now has source-analyzed answers for **all 55 objective/fill/rewrite questions**. Its two open writing tasks have **original model responses and task-specific guidance**, but correctly remain unscored because they have no single fixed answer. The model email is 77 words and the volunteerism paragraph is 147 words.

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

- Phú Thọ Grammar 21–35: 15 original contextual Vietnamese translations and **60 original bilingual examples** (one each for A–D). Phú Thọ Word Formation 36–45 also identifies the root word, target part of speech and specific confusion traps.
- Phú Thọ G30: both **at loggerheads over** and **at daggers drawn over** can be grammatical in context. The original reference prefers A, but C is explicitly marked **review**, not automatically incorrect.
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

## 2026-10-28 completion and re-check

- Solved 43 previously blank Sơn La items (33–75) against the stored exam source, covering grammar, word form, prepositions, open cloze, matching, AI reading, heading matching and TFNG. All 55 non-essay questions now have answer plus language or evidence-based reasoning.
- Added 60 original A–D bilingual practice examples and per-choice explanations for Sơn La questions 26–40. The 10 other Sơn La word/cloze entries have morphology, grammar rules, or textual clues.
- Independently cross-checked with the nonofficial Springboard explanatory key and corrected misleading claims: Q34 **reach a milestone** (A), while **hit a milestone** (C) is also natural; Q38 supports both **come up against** (B) and **run up against** (C); Q36 is worded awkwardly, with **looks through** (A) and the public key's **sets up** (B) treated as reviewer decisions rather than a certain exclusion.
- Open cloze Q54 allows **since, because, as**; Q55 allows **well, fully, better** as meaningful modifiers; all accepted alternatives are stored in grading data.
- Vinh telemedicine 24–33 now have direct original-paper text quotes, while Vinh word formation 31–40 has root, class, derivation and confusion notes. Both Vinh and Phú Thọ error-correction sets now have additional authentic application sentences.
- Removed the generic, repeated source-warning label from the subject-specific answer cards. Individual disputed questions still show a substantive linguistic explanation instead of a scary general notice, and source provenance remains linked. No paper or user answer is changed by the format layer.
