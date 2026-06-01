-- ═══════════════════════════════════════════════════════════════
-- BATCH 20 — Nyles (Nidhogg) — 1 Juin 2026
-- DPS Ombre 5★ — dragon nordique rongeur de Yggdrasil
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
    "id": "nyles",
    "name": "Nyles",
    "image": "https://alexgrd87.github.io/dislyte-guide/images/espers/nyles.png",
    "divinity": "Nidhogg",
    "element": "umbra",
    "role": "dps",
    "tier": "S",
    "rarity": 5,
    "description": "DPS Ombre Légendaire inspiré de Nidhogg, le dragon nordique qui ronge les racines de Yggdrasil. Nyles excelle à réduire les PV max ennemis et à contrer les effets de dissipation. Son kit punit les équipes qui dépendent des buffs et inflige des dégâts en proportion des PV max adverses. Très efficace contre les équipes tankées en PvP.",
    "relicBuild": {
      "primary": {"set4": "war", "set2": "recurve", "label": "Guerre + Incandescence"},
      "alt": {"set4": "en-bas", "set2": "recurve", "label": "Vol de Vie + Incandescence"},
      "mainStats": {"ring": "Taux de Crit", "helmet": "ATQ%", "boots": "VIT"},
      "substats": ["ATQ%", "Taux de Crit", "Dégâts Crit", "VIT"],
      "notes": "Build DPS standard ATQ/Crit. En-bas en alt pour la survie via Vol de Vie. Taux de Crit ≥ 80% pour maximiser les procs de réduction PV max."
    },
    "synergies": ["gabrielle", "sander", "meta-drew"],
    "modes": {"story": "S", "kronos": "A", "apep": "A", "fafnir": "A", "pvp": "S"},
    "captain": null
  }
]
$$) AS t(e);
