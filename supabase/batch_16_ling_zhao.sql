-- ═══════════════════════════════════════════════════════════════
-- BATCH 16 — Ling Zhao (Tianfei) — 1 Juin 2026
-- Support Aquatique 5★ — déesse de la mer chinoise
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
    "id": "ling-zhao",
    "name": "Ling Zhao",
    "image": "https://alexgrd87.github.io/dislyte-guide/images/espers/ling-zhao.png",
    "divinity": "Tianfei",
    "element": "flow",
    "role": "support",
    "tier": "S",
    "rarity": 5,
    "description": "Support Aquatique Légendaire inspirée de Tianfei, déesse de la mer dans la mythologie chinoise. Ling Zhao soigne l'allié le plus faible via Seaflow, lui accorde l'Immunité et des soins massifs avec Tidal Grace. Son kit défensif orienté protection la rend indispensable en PvP et dans les contenus d'endurance.",
    "relicBuild": {
      "primary": {"set4": "panacee", "set2": "recurve", "label": "Panacée + Incandescence"},
      "alt": {"set4": "soutien", "set2": "recurve", "label": "Soutien + Incandescence"},
      "mainStats": {"ring": "PV%", "helmet": "VIT", "boots": "PV%"},
      "substats": ["PV%", "VIT", "DEF%", "Précision"],
      "notes": "Ses soins scalent sur ses PV max — maximiser PV% en priorité. VIT pour agir avant les ennemis et poser l'Immunité. Précision pour que les debuffs de Seaflow passent."
    },
    "synergies": ["gabrielle", "asnath", "lu-yi"],
    "modes": {"story": "A", "kronos": "S", "apep": "A", "fafnir": "S", "pvp": "SS"},
    "captain": null
  }
]
$$) AS t(e);
