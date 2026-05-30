-- ═══════════════════════════════════════════════════════════════
-- PATCH — Renommage Fu Shi → Leo (patch Lilith Games)
-- ═══════════════════════════════════════════════════════════════

UPDATE public.espers
SET
  id          = 'leo',
  name        = 'Leo',
  description = REPLACE(description, 'Fu Shi', 'Leo')
WHERE id = 'fu-shi';

-- Mettre à jour les synergies des autres espers qui référencent 'fu-shi'
UPDATE public.espers
SET synergies = array_replace(synergies, 'fu-shi', 'leo')
WHERE 'fu-shi' = ANY(synergies);
