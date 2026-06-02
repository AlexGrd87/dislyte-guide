-- ═══════════════════════════════════════════════════════════════
-- TABLE events — Événements en cours
-- ═══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.events (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  title       TEXT        NOT NULL,
  description TEXT,
  type        TEXT        DEFAULT 'event',   -- 'event' | 'banner' | 'challenge' | 'login'
  rewards     TEXT,
  start_date  TIMESTAMPTZ,
  end_date    TIMESTAMPTZ,
  is_active   BOOLEAN     DEFAULT TRUE,
  image_url   TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "events_read" ON public.events FOR SELECT USING (TRUE);
GRANT ALL ON public.events TO service_role, anon, authenticated;

-- ═══════════════════════════════════════════════════════════════
-- TABLE build_votes — Votes 👍/👎 sur les builds d'espers
-- ═══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.build_votes (
  id        UUID    DEFAULT gen_random_uuid() PRIMARY KEY,
  esper_id  TEXT    NOT NULL,
  user_id   UUID    NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  vote      SMALLINT NOT NULL CHECK (vote IN (1, -1)),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (esper_id, user_id)
);
ALTER TABLE public.build_votes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "votes_read"   ON public.build_votes FOR SELECT USING (TRUE);
CREATE POLICY "votes_insert" ON public.build_votes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "votes_update" ON public.build_votes FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "votes_delete" ON public.build_votes FOR DELETE USING (auth.uid() = user_id);
GRANT ALL ON public.build_votes TO service_role, authenticated;

-- ═══════════════════════════════════════════════════════════════
-- Colonne is_public sur teams
-- ═══════════════════════════════════════════════════════════════
ALTER TABLE public.user_teams ADD COLUMN IF NOT EXISTS is_public BOOLEAN DEFAULT FALSE;
ALTER TABLE public.user_teams ADD COLUMN IF NOT EXISTS likes INTEGER DEFAULT 0;
