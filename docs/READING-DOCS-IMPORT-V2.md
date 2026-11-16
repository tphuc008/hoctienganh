# Smart Reading Import V2 — Google Docs → Reading Engine

## Purpose
Import explanations **authored by the teacher** into already verified IELTS Reading question banks.
Never generate explanations during import; never modify the passage, question prompts, answer keys or existing learner submissions.

## Public architecture
- \`content/reading-*-docs.js\`: passage/questions/answer key and imported explanations; output of verified import
- \`features/reading-docs-engine.js\`: one shared exam renderer for YNNG/TFNG, MCQ, matching, endings, input and choose-two
- \`scripts/reading-docs-import-core.cjs\`: reusable parser, answer validator, unique exact quote matcher
- \`content/manifest.js\`: register route with source engine and bank dependency
- \`features/universal-print.js\`: add route to the universal print provider
- \`grade12-reading.css\`: read-only explanation presentation, styled as three expandable sections

## How to import another document
1. Use authenticated connected Google Drive \`get_document_text(document_url)\` to read the desired tab; do not embed the Google Doc ID into public JS.
2. Load the **existing verified PDF question bank** and the import-core library. Call \`parse(paragraphs)\`, then \`apply(bank, paragraphs, {allowPartial:false})\` for a full lesson. An isolated correction can instead use \`allowPartial:true\`.
3. Review \`errors\` and \`warnings\`. The import returns \`ready:false\` and no lesson when a key, question, or exact evidence anchor fails validation. Only explicitly reviewed warning exceptions may be published.
4. Do not overwrite PDF questions with \`ĐỀ\` lines from Google Docs; they are fingerprints and may contain teacher paraphrases or source errata. Do not overwrite PDF answers with \`ĐÁP ÁN\` lines.
5. After verifying the resulting \`lesson\`, serialize it into the lesson's bank file, preserving the surrounding \`SMART_READING_BANK[slug]\` registration, then commit to GitHub.
6. Run reading tests and verify render, score, PDF printer, evidence navigation, highlight, dictionary and mobile tabs.
7. Ensure the manifest references the current cache-busted bank and engine resources. Do not claim public deploy is live until verification.

## Google Docs headings
The Pacific reference document has one \`HEADING_2\` per question:

- \`Câu 1 — YES | ...\`
- \`ĐỀ: ...\`
- \`ĐÁP ÁN: YES\`
- \`1. Hiểu câu chuyện / logic: ...\`
- \`2. Bằng chứng + paraphrase: ...\`
- \`3. Phân tích đáp án sai / bẫy: ...\`

Existing \`HEADING_1\` group titles help humans but aren't used to guess question identity. For a Choose TWO group, use \`Câu 7–8 — C, D\` with two IDs, one shared explanation, one shared answer set, two score slots and order-independent grading.

## Evidence anchor rules
Evidence must be an **unambiguous exact substring of the PDF passage**; matching ignores only case when necessary, preserving passage characters in the resulting anchor. When an excerpt has \`…\`, split at the ellipsis and accept only exact unique snippets. A missing or duplicated snippet must remain in \`needs_review\`, not silently map to the nearest paragraph.

Reading navigation:
- Normal question switching preserves \`mis-passage-pane.scrollTop\`.
- Only an explicit **Trỏ đến dẫn chứng** action scrolls the left pane and highlights the anchored text.
- User highlights and dictionary selections remain independent of teacher evidence highlights.
- The evidence action must not modify the question-side scroll position or student answer.

## Source editorial exceptions
The Pacific PDF contains nonstandard wording in some stems. Those stems remain sourced from the supplied PDF; Google Docs' corrected phrasing is explanation-only. Question 14 key \`E\` is retained from PDF, with \`needsReview\` and the author's explanation of why its claim is stronger than the passage supports.

## Layout
Initial site implementation: Robots-and-us split reading workspace, compact A/B/C/D buttons for MCQ, shared A–F bank above the four Matching Sentence Endings and one set of A–F letter buttons for each stem. Three expandable explanation steps preserve full original text. Alternative matching layouts may be added after user preference without changing data or grading.
