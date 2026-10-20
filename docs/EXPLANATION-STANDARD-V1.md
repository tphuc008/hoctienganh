# Explanation Standard V1 — Website Vocab

Status: Implemented as shared presentation and adapter layer for non-grammar learning pages.
Scope: Vocabulary (Grade 9, Grade 10, Grade 12, reviews), School Practice, Grade 10 Mid-term, Reading, Listening, and published Lesson Plans.
Excluded: Dedicated Grammar Testing, including the teacher-only Grammar Topic 21 preview and Grammar unit tests.

## Rendering contract

Every authorized answer has two presentation levels:

1. Quick explanation by default: authoritative answer, the strongest available verified reason, and a disclosure control.
2. Deep explanation using exactly three outward-facing stages:
   - **Bằng chứng**: source clue, reference, quoted information, and translation when verified.
   - **Phân tích A–D / cách giải**: reasoning and per-option differences when the source actually includes them.
   - **Vận dụng**: reusable patterns, examples, and specific takeaways.

For Vocabulary MCQ, the approved standard requires an analysis of each A–D choice and **one original, complete English example and one Vietnamese translation for each**. Neither the renderer nor migration adapters creates missing examples or guesses distractor rationales.

The common module is `features/explanation-v1.js` with styles in `features/explanation-v1.css`.
Its adapters accept existing authored data in memory and return a presentation model; they do **not** change grading, shuffle answers, access permissions, the answer key, or progress. Markup escapes source strings.

## Unverified content

When a source has no verified evidence, reasoning, per-option analyses or required Vocabulary examples, the component uses `data-review-status="needs_review"` and openly warns that review is needed. Content is retained, not silently rewritten. In particular, Listening currently has answer keys and timestamp pointers but no source-audited rationale; it must **not** fabricate audio quotes. A source can be considered `ready` only when it satisfies structural requirements and no adapter detects generic generated reasoning. `ready` is a presentation readiness marker, not a claim of independent human semantic verification.

## Access and sensitive data

**Rendering does not imply authorization.** Each existing module remains solely responsible for deciding when a released answer can be passed to Explanation V1:

- Vocabulary and School Practice: existing per-question checking.
- Reading: only after the existing submission state.
- Listening: only after submission **and** the explicit "Hiện đáp án" action.
- Lesson Plans: protected Supabase solution payload is requested and rendered only under the existing teacher/unlock checks (`accessAllowed()`). Keys never move into public lesson data or static repository files.
- Printing: only release modes allowed by each module; detailed print forces the nested explanation disclosure open to print all three stages. Answerless print paths remain separate.

For the Grade 10 Mid-term written exercises, the website maps three existing authored sections into the V1 stages; it does not invent new steps. Existing question-quality warnings remain visible.

## Content authoring and quality checklist

- Cite the precise question clause, passage location, verified audio timestamp or grammar rule.
- Link clue to correct answer with every necessary reasoning step.
- Explain every MCQ distractor individually; no "they are close in meaning but less suitable" templates.
- Avoid suffix-derived semantic claims ("-er" is not always a person), unsupported collocations, imaginary quotes, and generic filler.
- Match bilingual examples to the actual A–D option identities.
- Never force an unambiguous answer where the original question allows several readings; flag for review.
- Test answer parity, progress preservation, mobile reading width, print fidelity and student/teacher access before publishing content changes.

## Regression checks

`tests/explanation-v1.test.cjs` validates three stages, concise default, reference-only Listening evidence, four examples, output escaping, and permission boundaries.
Existing Lesson Plans print, universal print, and learner journey browser tests cover exercise workflows. Dedicated Grammar Testing remains unchanged.

## Future completion work

The shared interface is implemented; **content auditing is a separate process**. Older Grade 9–10 Vocabulary items without four verified bilingual examples and generated Grade 12 distractor analyses remain flagged for editorial review. Lesson Plans quiz-bank questions not yet supplied with authorized solution data cannot be given invented explanations. Use the status to prioritize curatorial work without exposing locked keys.
