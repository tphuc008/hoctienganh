-- Backwards-compatible extension for a unified learning-result pipeline.
-- Existing rows, grades, question banks and RLS policies are retained.
BEGIN;
ALTER TABLE public.practice_submissions
  DROP CONSTRAINT IF EXISTS practice_submissions_category_check;
ALTER TABLE public.practice_submissions
  ADD CONSTRAINT practice_submissions_category_check
  CHECK (category IN ('school','listening','grammar','vocabulary','reading'));
CREATE INDEX IF NOT EXISTS practice_submissions_user_category_created_idx
  ON public.practice_submissions(user_id,category,created_at DESC);

CREATE OR REPLACE FUNCTION public.record_tutoring_activity(p_event_type text DEFAULT 'study'::text)
 RETURNS public.learner_daily_activity
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_user uuid := auth.uid();
  v_day date := (now() AT TIME ZONE 'Asia/Ho_Chi_Minh')::date;
  v_event text;
  v_row public.learner_daily_activity;
BEGIN
  IF v_user IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;
  v_event := CASE WHEN p_event_type IN (
    'study','vocabulary_set','grammar_set','listening_entertainment_part',
    'listening_news_part','reading_submission','school_set'
  ) THEN p_event_type ELSE 'study' END;

  INSERT INTO public.learner_daily_activity
    (user_id,activity_date,activity_count,last_event_type,first_activity_at,last_activity_at)
  VALUES (v_user,v_day,1,v_event,now(),now())
  ON CONFLICT (user_id,activity_date)
  DO UPDATE SET
    activity_count=public.learner_daily_activity.activity_count+1,
    last_event_type=excluded.last_event_type,
    last_activity_at=now()
  RETURNING * INTO v_row;
  RETURN v_row;
END;
$function$;
COMMIT;
