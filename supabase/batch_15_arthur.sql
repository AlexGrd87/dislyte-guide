-- ═══════════════════════════════════════════════════════════════
-- BATCH 15 — Arthur (Taranis) + corrections images (30 Mai 2026)
-- Premier esper du panthéon celtique (patch v3.4.41)
-- Images corrigées : Jin-Hee (h minuscule), Meta espers (Awakening format)
-- ═══════════════════════════════════════════════════════════════

-- 1. Arthur (Taranis)
INSERT INTO public.espers
  (id, name, image, divinity, element, role, tier, rarity, description, relic_build, synergies, modes, captain)
SELECT
  e->>'id', e->>'name', NULLIF(e->>'image', 'null'), e->>'divinity',
  e->>'element', e->>'role', e->>'tier', (e->>'rarity')::smallint,
  e->>'description', e->'relicBuild',
  ARRAY(SELECT json_array_elements_text(e->'synergies')),
  e->'modes', NULLIF(e->>'captain', 'null')
FROM json_array_elements($$
[
  {
    "id": "arthur",
    "name": "Arthur",
    "image": "https://static.wikia.nocookie.net/dislyte/images/5/50/Arthur.png/revision/latest",
    "divinity": "Taranis",
    "element": "umbra",
    "role": "dps",
    "tier": "SS",
    "rarity": 5,
    "description": "DPS Ombre Légendaire inspiré de Taranis, dieu celte du tonnerre et de la foudre. Premier esper du panthéon celtique (patch v3.4.41). Arthur inflige des dégâts AoE massifs via Transmission, attaque 5 fois aléatoirement en priorisant les ennemis non touchés, et ses dégâts scalent sur sa VIT grâce à Flashbolt. Gagne Trailblazer au début du combat et applique Transmission à 2 cibles. Redoutable en farming et en boss multi-ennemis.",
    "relicBuild": {
      "primary": {"set4": "wind", "set2": "recurve", "label": "Vent + Incandescence"},
      "alt": {"set4": "foudre", "set2": "recurve", "label": "Foudre + Incandescence"},
      "mainStats": {"ring": "Taux de Crit", "helmet": "ATQ%", "boots": "VIT"},
      "substats": ["VIT", "Taux de Crit", "ATQ%", "Dégâts Crit"],
      "notes": "Ses dégâts scalent sur la VIT — VIT est la stat numéro 1. Vent (+25% VIT) est le set optimal. Taux de Crit ≥ 80%, puis ATQ% et Dégâts Crit."
    },
    "synergies": ["gabrielle", "lu-shang", "wu-you"],
    "modes": {"story": "SS", "kronos": "A", "apep": "SS", "fafnir": "S", "pvp": "S"},
    "captain": null
  }
]
$$) AS t(e);

-- 2. Corrections images
UPDATE public.espers SET image = 'https://static.wikia.nocookie.net/dislyte/images/e/ea/Jin-hee_avatar.png/revision/latest' WHERE id = 'jin-hee';
UPDATE public.espers SET image = 'https://static.wikia.nocookie.net/dislyte/images/2/26/Mona_Awakening.png/revision/latest' WHERE id = 'meta-mona';
UPDATE public.espers SET image = 'https://static.wikia.nocookie.net/dislyte/images/e/e8/Freddy_Awakening_avatar.png/revision/latest' WHERE id = 'meta-freddy';
UPDATE public.espers SET image = 'https://static.wikia.nocookie.net/dislyte/images/8/88/Li_Ling_Awakening_avatar.png/revision/latest' WHERE id = 'meta-li-ling';
UPDATE public.espers SET image = 'https://static.wikia.nocookie.net/dislyte/images/d/dd/Ollie_Awakening_avatar.png/revision/latest' WHERE id = 'meta-ollie';
UPDATE public.espers SET image = 'https://static.wikia.nocookie.net/dislyte/images/3/3a/Drew_Awakening_avatar.png/revision/latest' WHERE id = 'meta-drew';
UPDATE public.espers SET image = 'https://static.wikia.nocookie.net/dislyte/images/1/14/Alexa_Awakening_avatar.png/revision/latest' WHERE id = 'meta-alexa';
