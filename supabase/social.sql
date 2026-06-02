-- ═══════════════════════════════════════════════════════════════
-- SOCIAL — Commentaires + métadonnées user dans user_teams
-- À exécuter dans Supabase SQL Editor
-- ═══════════════════════════════════════════════════════════════

-- 1. Ajouter user_name et user_avatar dans user_teams
ALTER TABLE public.user_teams
  ADD COLUMN IF NOT EXISTS user_name   TEXT,
  ADD COLUMN IF NOT EXISTS user_avatar TEXT;

-- 2. Table commentaires
CREATE TABLE IF NOT EXISTS public.team_comments (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  team_id     UUID        NOT NULL REFERENCES public.user_teams(id) ON DELETE CASCADE,
  user_id     UUID        NOT NULL,
  user_name   TEXT,
  user_avatar TEXT,
  content     TEXT        NOT NULL CHECK (char_length(content) <= 500),
  created_at  TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.team_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Commentaires lisibles par tous"
  ON public.team_comments FOR SELECT USING (true);

CREATE POLICY "Utilisateurs connectés peuvent commenter"
  ON public.team_comments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Auteur peut supprimer son commentaire"
  ON public.team_comments FOR DELETE
  USING (auth.uid() = user_id);

GRANT SELECT, INSERT, DELETE ON public.team_comments TO anon, authenticated;
