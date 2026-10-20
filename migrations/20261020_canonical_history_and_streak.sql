-- Priority 3: additive link between legacy score and canonical submission;
-- streaks become a single server-side consequence of accepted practice results.
BEGIN;
ALTER TABLE public.scores
  ADD COLUMN IF NOT EXISTS practice_submission_id uuid;
CREATE UNIQUE INDEX IF NOT EXISTS scores_practice_submission_id_unique_idx
  ON public.scores(practice_submission_id);
COMMENT ON COLUMN public.scores.practice_submission_id IS
  'Same UUID as practice_submissions.submission_id for unambiguous history reconciliation. Historical rows remain NULL.';

CREATE OR REPLACE FUNCTION public.credit_completed_practice_streak()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER
SET search_path = ''
AS $fn$
DECLARE
  v_day date := (statement_timestamp() AT TIME ZONE 'Asia/Ho_Chi_Minh')::date;
  v_event text;
  v_answered text;
BEGIN
  -- Only a new, RLS-accepted canonical submission awards credit.
  -- ON CONFLICT DO NOTHING (retry by identical UUID) does not fire this trigger.
  IF NEW.category = 'listening' THEN
    v_answered := COALESCE(NEW.details->>'answered','');
    -- Preserve existing Listening policy: every question in the Part is answered.
    IF v_answered !~ '^[0-9]{1,3}$' THEN RETURN NEW; END IF;
    IF v_answered::integer <> NEW.total_questions THEN RETURN NEW; END IF;
  ELSIF NEW.category = 'exam' THEN
    v_answered := COALESCE(NEW.details->>'checked','');
    IF v_answered !~ '^[0-9]{1,3}$' THEN RETURN NEW; END IF;
    IF COALESCE(NEW.details->>'sourceQuestions','') !~ '^[0-9]{1,3}
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

-- End direct client-side streak mutation. Existing accounts and history stay intact.
REVOKE ALL ON FUNCTION public.record_tutoring_activity(text) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.credit_completed_practice_streak() FROM PUBLIC, anon, authenticated;
NOTIFY pgrst, 'reload schema';
COMMIT;
 THEN
      RETURN NEW;
    END IF;
    IF v_answered::integer <> (NEW.details->>'sourceQuestions')::integer THEN
      RETURN NEW;
    END IF;
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

-- End direct client-side streak mutation. Existing accounts and history stay intact.
REVOKE ALL ON FUNCTION public.record_tutoring_activity(text) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.credit_completed_practice_streak() FROM PUBLIC, anon, authenticated;
NOTIFY pgrst, 'reload schema';
COMMIT;
