# Lesson Plans & Practice — publishing contract

This is the live Grade 12 learning area, separate from the existing Vocabulary Units.

## Before class — publish the Google Docs URL

After a student-safe Google Doc has been created and verified, edit `content/lesson-plans-data.js`.
Set the appropriate Unit's `docUrl` to the actual Google Docs URL and `lessonPublished` to `true`.
The document must NOT contain solutions that are supposed to remain locked. The teacher's
private answer explanations must be stored in Supabase, never in Google Docs shared with
students or in public GitHub JavaScript.

## After class — publish an exercise bank

Use the **teacher-requested reread** of the same Google Doc, including comments and replies,
and prepare 10–30 original MCQs and 1–3 short Reading passages with exactly five questions each.
Use Master Structure V1.0 for item-writing quality and apply the explicitly requested
smaller counts for post-class work.

The public item structure is:

```js
{
  id: 7,
  title: "Unit 7",
  description: "",
  docUrl: "",
  lessonPublished: false,
  practicePublished: false,
  practice: {
    mcqs: [
      { id: "u7-mcq-01", text: "Complete the sentence: ______.", options: ["A choice", "B choice", "C choice", "D choice"], part: "context" }
    ],
    passages: [
      {
        id: "u7-reading-01",
        title: "A short reading title",
        passage: "A coherent reading passage in new contexts.",
        questions: [
          { id: "u7-reading-01-q1", text: "Question?", options: ["A", "B", "C", "D"] }
          // Five questions total for each passage.
        ]
      }
    ]
  }
}
```

All question IDs must be unique within a Unit. `options` must contain exactly four
plain-text strings. Use `target: "word"` if an underlined expression is needed.
Do NOT include `answer`, `correctIndex`, explanations, hidden words, or teacher comments in public files.

## Secure solutions, teacher Unlock

Supabase project: `ouicitkpfukterkilqzu`.

- `public.lesson_unlocks`: `unit_key` and `unlocked`, default false.
- `public.lesson_teacher_roles`: explicit teacher membership, provisioned only after verifying the correct learner account. Learners cannot self-assign this role.
- `public.lesson_solutions`: server-protected JSON `payload`, accessible to teachers, or learners after the Unit has been unlocked.

Unit 7 uses `unit_key = "grade12-unit7"`. For subsequent Units, insert a
`lesson_unlocks` row with `unlocked=false` before importing solutions.
Never identify an administrator by GitHub username, profile display name, or
client-editable metadata. Assign the teacher role only after an authorised account
is verified.

The protected payload is an array of solution entries. Each entry may contain:

```json
{
  "title": "Question 1",
  "questionId": "u7-mcq-01",
  "correctIndex": 1,
  "correctMeaning": "Meaning of the correct option",
  "why": "Detailed contextual justification",
  "choices": [
    { "label": "A choice", "explanation": "Why correct or incorrect" },
    { "label": "B choice", "explanation": "Why correct or incorrect" },
    { "label": "C choice", "explanation": "Why correct or incorrect" },
    { "label": "D choice", "explanation": "Why correct or incorrect" }
  ],
  "examples": "Real-world usage examples."
}
```

Store the detailed explanations for all published items in Supabase, not in the repository.
The UI checks Supabase RLS and exposes a teacher-only Unlock control only for
authorised teacher accounts.

## Print

Printing uses the student's selected MCQs and passages. Question-only printing
is available as soon as practice is published. Compact key and detailed-solution
printing are enabled only after the server authorises retrieval of the protected
solution payload.

The current Unit 7 is intentionally empty until its first Word/PDF Vocabulary
file is provided. No sample questions, placeholder answer keys, or fictitious
Google Docs links are published.


## Student-facing all-in-one page (Format 1)

The original Google Docs *student handout* is published as `originalExercises` (question IDs `u7-v10-01` ... `u7-v10-40`) in the public catalogue, grouped into context, synonyms and antonyms. There are **no answer keys in that catalogue**. The Google Doc link is a small reference link rather than the main page content.

Each question renders its complete sentence and A–D choices inline. Only when the server grants access does an adjacent, expandable answer explanation appear. Answers are matched using `questionId` in the protected Supabase `lesson_solutions` payload. Do not add solutions, comments, or student-private material to `originalExercises`.

The continuous page also contains after-class practice (published separately) and printing. Original questions can be printed even before the after-class bank has been published. Printing protected answer keys or explanations requires successful secure loading from Supabase.

## Three separate Unit 7 pages

The previous all-in-one layout has been split into three independently shareable route paths:
- `#grade-12/lesson-plans/unit-7` — the original handout, all 40 student questions, and secure in-context explanations.
- `#grade-12/lesson-plans/unit-7/practice` — teacher-published after-class MCQ and reading practice.
- `#grade-12/lesson-plans/unit-7/print` — print original handout or selected practice, with keys only when Supabase authorizes access.

All three pages share a compact Google Docs source link, a three-item navigation bar, and previous/next navigation. Switching pages in the same loaded session preserves in-browser student choice state and practice session state. Supabase authorization refreshes on navigation and answer payloads remain protected by RLS.
