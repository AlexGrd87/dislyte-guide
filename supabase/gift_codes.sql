-- ═══════════════════════════════════════════════════════════════
-- TABLE gift_codes — Codes cadeaux Dislyte
-- ═══════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.gift_codes (
  id         UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  code       TEXT        NOT NULL UNIQUE,
  rewards    TEXT        NOT NULL,
  expires_at TIMESTAMPTZ,
  is_active  BOOLEAN     DEFAULT TRUE,
  notes      TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Lecture publique (anon peut lire)
ALTER TABLE public.gift_codes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "gift_codes_read" ON public.gift_codes
  FOR SELECT USING (TRUE);

-- Seed — codes connus au 2 Juin 2026
INSERT INTO public.gift_codes (code, rewards, expires_at, is_active, notes) VALUES
  ('LILITH13TH', 'Récompenses exclusives (Nexus Crystals + items)', '2026-06-09T23:59:59Z', TRUE, 'Anniversaire Lilith Games — 13 ans'),
  ('Dislyte4tparty', 'Récompenses exclusives', '2026-05-13T23:59:59Z', FALSE, 'Expiré')
ON CONFLICT (code) DO NOTHING;
