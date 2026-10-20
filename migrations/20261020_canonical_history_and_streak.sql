-- Priority 3: exact legacy-score UUID linkage and server-owned streak credit.
BEGIN;
ALTER TABLE public.scores ADD COLUMN IF NOT EXISTS practice_submission_id uuid;
CREATE UNIQUE INDEX IF NOT EXISTS scores_practice_submission_id_unique_idx
 ON public.scores(practice_submission_id);
COMMENT ON COLUMN public.scores.practice_submission_id IS
 'Links future Vocabulary scores to their canonical practice submission UUID; historical rows remain NULL.';

CREATE OR REPLACE FUNCTION public.credit_completed_practice_streak()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER
SET search_path = ''
AS $fn$
DECLARE
 v_day date := (statement_timestamp() AT TIME ZONE 'Asia/Ho_Chi_Minh')::date;
 v_event text;
 v_answered text;
 v_source text;
BEGIN
 -- Only a new accepted row invokes this AFTER INSERT trigger.
 IF NEW.category = 'listening' THEN
   v_answered := COALESCE(NEW.details->>'answered','');
   IF v_answered !~ '^[0-9]{1,3}$' THEN RETURN NEW; END IF;
   IF v_answered::integer <> NEW.total_questions THEN RETURN NEW; END IF;
 ELSIF NEW.category = 'exam' THEN
   v_answered := COALESCE(NEW.details->>'checked','');
   v_source := COALESCE(NEW.details->>'sourceQuestions','');
   IF v_answered !~ '^[0-9]{1,3}$' THEN RETURN NEW; END IF;
   IF v_source !~ '^[0-9]{1,3}$' THEN RETURN NEW; END IF;
   IF v_answered::integer <> v_source::integer THEN RETURN NEW; END IF;
 END IF;

 v_event := CASE NEW.category
   WHEN 'vocabulary' THEN 'vocabulary_set'
   WHEN 'grammar' THEN 'grammar_set'
   WHEN 'school' THEN 'school_set'
   WHEN 'reading' THEN 'reading_submission'
   WHEN 'listening' THEN 'listening_part'
   WHEN 'exam' THEN 'exam_submission'
   ELSE 'study' END;

 INSERT INTO public.learner_daily_activity
   (user_id,activity_date,activity_count,last_event_type,first_activity_at,last_activity_at)
 VALUES (NEW.user_id,v_day,1,v_event,statement_timestamp(),statement_timestamp())
 ON CONFLICT (user_id,activity_date) DO UPDATE SET
   activity_count=public.learner_daily_activity.activity_count+1,
   last_event_type=excluded.last_event_type,
   last_activity_at=excluded.last_activity_at;
 RETURN NEW;
END;
$fn$;

DROP TRIGGER IF EXISTS credit_completed_practice_streak_on_insert ON public.practice_submissions;
CREATE TRIGGER credit_completed_practice_streak_on_insert
AFTER INSERT ON public.practice_submissions
FOR EACH ROW EXECUTE FUNCTION public.credit_completed_practice_streak();

-- Revoke direct client access; credit is now a trusted consequence of INSERT.
REVOKE ALL ON FUNCTION public.record_tutoring_activity(text) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.credit_completed_practice_streak() FROM PUBLIC, anon, authenticated;
NOTIFY pgrst, 'reload schema';
COMMIT;
