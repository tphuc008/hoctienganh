-- Add one new practice category without touching existing data or policies.
BEGIN;
ALTER TABLE public.practice_submissions DROP CONSTRAINT IF EXISTS practice_submissions_category_check;
ALTER TABLE public.practice_submissions
 ADD CONSTRAINT practice_submissions_category_check
 CHECK (category IN ('school','listening','grammar','vocabulary','reading','exam'));
COMMIT;
