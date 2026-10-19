-- Account-scoped read access for pre-existing Vocabulary result history.
-- Never exposes another learner's scores.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname='public' AND tablename='scores'
      AND policyname='Learners can read own vocabulary scores'
  ) THEN
    CREATE POLICY "Learners can read own vocabulary scores"
      ON public.scores FOR SELECT TO authenticated
      USING (user_id = (SELECT auth.uid()));
  END IF;
END $$;
