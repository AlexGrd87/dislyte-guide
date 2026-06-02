-- ═══════════════════════════════════════════════════════════════
-- BATCH 21 — Sachiko (Hare of Inaba) — 1 Juin 2026
-- Support Brasier 4★ — lapin blanc de la mythologie japonaise
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
    "id": "sachiko",
    "name": "Sachiko",
    "image": "https://alexgrd87.github.io/dislyte-guide/images/espers/sachiko.png",
    "divinity": "Hare of Inaba",
    "element": "inferno",
    "role": "support",
    "tier": "B",
    "rarity": 4,
    "description": "Support Brasier Épique inspirée du Lièvre d'Inaba, créature mythique de la mythologie japonaise. Sachiko distribue des buffs à toute l'équipe via Lucky Wishes et Bunny Talisman, et attaque avec Pollen Strike. Option F2P accessible pour renforcer les équipes en early game.",
    "relicBuild": {
      "primary": {"set4": "harmonie", "set2": "recurve", "label": "Harmonie + Incandescence"},
      "alt": {"set4": "soutien", "set2": "recurve", "label": "Soutien + Incandescence"},
      "mainStats": {"ring": "PV%", "helmet": "VIT", "boots": "VIT"},
      "substats": ["VIT", "PV%", "DEF%", "Précision"],
      "notes": "VIT en priorité pour buffer avant les alliés DPS. PV% et DEF% pour la survie. Harmonie amplifie les buffs accordés à l'équipe."
    },
    "synergies": ["gabrielle", "li-ling", "drew"],
    "modes": {"story": "B", "kronos": "B", "apep": "B", "fafnir": "B", "pvp": "C"},
    "captain": null
  }
]
$$) AS t(e);
