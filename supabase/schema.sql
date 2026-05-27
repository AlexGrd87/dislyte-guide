-- ============================================================
--  DISLYTE GUIDE FR — Schéma Supabase
--  Coller dans Supabase > SQL Editor > Run
-- ============================================================

-- 1. Profils (liés à auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username    TEXT,
  avatar_url  TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles: lecture publique"    ON public.profiles FOR SELECT USING (true);
CREATE POLICY "profiles: modif propriétaire"  ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles: insert propriétaire" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Trigger : crée le profil automatiquement à l'inscription
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, username, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- 2. Box — collection d'Espers du joueur
-- ============================================================
CREATE TABLE IF NOT EXISTS public.user_box (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  esper_id    TEXT NOT NULL,            -- 'gaius', 'clara', etc.
  owned       BOOLEAN DEFAULT TRUE,
  stars       SMALLINT DEFAULT 5 CHECK (stars BETWEEN 1 AND 6),
  ascension   SMALLINT DEFAULT 0 CHECK (ascension BETWEEN 0 AND 5),
  resonance   SMALLINT DEFAULT 0 CHECK (resonance BETWEEN 0 AND 5),
  lvl         SMALLINT DEFAULT 1 CHECK (lvl BETWEEN 1 AND 60),
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, esper_id)
);

ALTER TABLE public.user_box ENABLE ROW LEVEL SECURITY;
CREATE POLICY "box: lecture propriétaire"   ON public.user_box FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "box: insert propriétaire"    ON public.user_box FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "box: update propriétaire"    ON public.user_box FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "box: delete propriétaire"    ON public.user_box FOR DELETE USING (auth.uid() = user_id);

-- ============================================================
-- 3. Builds — configurations de Relics par Esper
-- ============================================================
CREATE TABLE IF NOT EXISTS public.user_builds (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  esper_id    TEXT NOT NULL,
  build_name  TEXT DEFAULT 'Mon Build',
  set4        TEXT,                     -- id du set 4 pièces
  set2        TEXT,                     -- id du set 2 pièces
  ring_stat   TEXT,                     -- stat principale Anneau
  helmet_stat TEXT,                     -- stat principale Casque
  boots_stat  TEXT,                     -- stat principale Bottes
  substats    TEXT[],                   -- substats visées
  notes       TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.user_builds ENABLE ROW LEVEL SECURITY;
CREATE POLICY "builds: lecture propriétaire"  ON public.user_builds FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "builds: insert propriétaire"   ON public.user_builds FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "builds: update propriétaire"   ON public.user_builds FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "builds: delete propriétaire"   ON public.user_builds FOR DELETE USING (auth.uid() = user_id);

-- ============================================================
-- 4. Teams — compositions sauvegardées
-- ============================================================
CREATE TABLE IF NOT EXISTS public.user_teams (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  team_name   TEXT NOT NULL DEFAULT 'Mon Équipe',
  mode        TEXT DEFAULT 'story',     -- 'kronos'|'apep'|'fafnir'|'pvp'|'story'
  esper_ids   TEXT[] NOT NULL,          -- tableau de 1 à 5 esper ids
  captain_idx SMALLINT DEFAULT 0,
  notes       TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.user_teams ENABLE ROW LEVEL SECURITY;
CREATE POLICY "teams: lecture propriétaire"  ON public.user_teams FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "teams: insert propriétaire"   ON public.user_teams FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "teams: update propriétaire"   ON public.user_teams FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "teams: delete propriétaire"   ON public.user_teams FOR DELETE USING (auth.uid() = user_id);

-- ============================================================
-- 5. Trigger updated_at automatique
-- ============================================================
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$;

CREATE TRIGGER box_updated_at    BEFORE UPDATE ON public.user_box    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER builds_updated_at BEFORE UPDATE ON public.user_builds FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER teams_updated_at  BEFORE UPDATE ON public.user_teams  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
