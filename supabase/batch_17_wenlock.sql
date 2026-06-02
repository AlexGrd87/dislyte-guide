-- ═══════════════════════════════════════════════════════════════
-- BATCH 17 — Wenlock (Huehuecoyotl) — 1 Juin 2026
-- Support Vent 5★ — dieu aztèque de la musique et du chaos
-- ═══════════════════════════════════════════════════════════════

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
    "id": "wenlock",
    "name": "Wenlock",
    "image": "https://alexgrd87.github.io/dislyte-guide/images/espers/wenlock.png",
    "divinity": "Huehuecoyotl",
    "element": "wind",
    "role": "support",
    "tier": "S",
    "rarity": 5,
    "description": "Support Vent Légendaire inspiré de Huehuecoyotl, dieu aztèque de la musique, de la danse et du chaos. Wenlock booste le Taux de Crit et les Dégâts Crit de ses alliés via ses skills Wild Howl et Star Turn, accélère l'équipe et amplifie massivement le potentiel offensif des DPS critiques. Esper de Championship exclusif.",
    "relicBuild": {
      "primary": {"set4": "wind", "set2": "recurve", "label": "Vent + Incandescence"},
      "alt": {"set4": "harmonie", "set2": "recurve", "label": "Harmonie + Incandescence"},
      "mainStats": {"ring": "PV%", "helmet": "VIT", "boots": "VIT"},
      "substats": ["VIT", "PV%", "DEF%", "Précision"],
      "notes": "Priorité absolue à la VIT pour buff en premier. Vent +25% VIT est le set optimal. PV% et DEF% pour la survie en PvP."
    },
    "synergies": ["gabrielle", "li-ling", "sander"],
    "modes": {"story": "A", "kronos": "A", "apep": "A", "fafnir": "A", "pvp": "SS"},
    "captain": null
  }
]
$$) AS t(e);
