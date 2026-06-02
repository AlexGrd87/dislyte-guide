-- ═══════════════════════════════════════════════════════════════
-- TIER VOTES — Votes communautaires sur les tiers
-- À exécuter dans Supabase SQL Editor
-- ═══════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.tier_votes (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  esper_id   TEXT NOT NULL REFERENCES public.espers(id) ON DELETE CASCADE,
  user_id    UUID NOT NULL,
  vote       TEXT NOT NULL CHECK (vote IN ('SS', 'S', 'A', 'B', 'C')),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(esper_id, user_id)
);

ALTER TABLE public.tier_votes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "tier_votes_read"   ON public.tier_votes;
DROP POLICY IF EXISTS "tier_votes_insert" ON public.tier_votes;
DROP POLICY IF EXISTS "tier_votes_update" ON public.tier_votes;
DROP POLICY IF EXISTS "tier_votes_delete" ON public.tier_votes;

CREATE POLICY "tier_votes_read"   ON public.tier_votes FOR SELECT USING (true);
CREATE POLICY "tier_votes_insert" ON public.tier_votes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "tier_votes_update" ON public.tier_votes FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "tier_votes_delete" ON public.tier_votes FOR DELETE USING (auth.uid() = user_id);
