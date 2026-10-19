# Website learning structure

The site uses one **shared contract** for every learning activity, while retaining subject-specific interfaces.

## Adding content
- Register each lesson with `LearningCore.register({id, route, title, category, grade?, unit?, render})`.
- Use a stable ID and URL slug. Avoid duplicating route literals in the main router or page cards.
- Quiz data should have a stable question ID, prompt, kind, answer(s), and explanations; add new content in a dedicated data file, not the main HTML.
- Each student's in-progress attempt uses `LearningCore.readDraft/writeDraft/clearDraft` and is keyed by authenticated account, lesson, and exercise.
- Completed attempts go to `practice_submissions` through `LearningCore.submitPractice`; submissions require a stable UUID to prevent duplicate results on retries.
- Existing vocabulary `scores` and IELTS Reading `reading_submissions` are retained for backwards compatibility and reporting.
- Record streak activity only when a new attempt is completed, not on restore/viewing results.
- Category-specific tools (Reading timers, Listening YouTube player, vocabulary explanations) remain distinct.

## Required quality gate
Before publishing: check syntax, route coverage, account-switch isolation, refresh/resume, completion/retry, offline errors, and desktop/mobile layouts. Never modify or remove existing question banks merely to refactor the shell.

## Database migration
Apply `migrations/20261019_learning_structure.sql` **before** deploying this branch to production. It extends `practice_submissions` to accept all exercise categories, and extends streak event types. Use a feature branch/PR review to coordinate rollout.
