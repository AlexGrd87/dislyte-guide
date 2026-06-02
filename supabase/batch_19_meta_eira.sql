-- ═══════════════════════════════════════════════════════════════
-- BATCH 19 — Meta Eira (Meta Freya) — 1 Juin 2026
-- Contrôleur PA Aquatique 5★ Awakening — version Meta de Eira
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
    "id": "meta-eira",
    "name": "Meta Eira",
    "image": "https://alexgrd87.github.io/dislyte-guide/images/espers/meta-eira.png",
    "divinity": "Meta Freya",
    "element": "flow",
    "role": "ap-controller",
    "tier": "SS",
    "rarity": 5,
    "description": "Version Meta Légendaire de Eira, la support Aquatique inspirée de Freya, déesse nordique de l'amour et de la guerre. Meta Eira devient un contrôleur PA redoutable : Seabreeze Sonata frappe tous les ennemis, réduit leur PA et inflige SPD Down. Elle nettoie les debuffs des alliés, réduit les cooldowns et accorde Brisingamen's Watch pour des cycles de PA ultra-rapides. Incontournable en PvP offensif.",
    "relicBuild": {
      "primary": {"set4": "domination", "set2": "recurve", "label": "Domination + Incandescence"},
      "alt": {"set4": "wind", "set2": "recurve", "label": "Vent + Incandescence"},
      "mainStats": {"ring": "Précision", "helmet": "VIT", "boots": "VIT"},
      "substats": ["VIT", "Précision", "PV%", "DEF%"],
      "notes": "VIT maximale pour cycler avant les ennemis. Précision ≥ 60% pour que SPD Down et la réduction PA passent. Domination amplifie la réduction PA de Seabreeze Sonata."
    },
    "synergies": ["gabrielle", "asnath", "meta-ollie"],
    "modes": {"story": "S", "kronos": "A", "apep": "S", "fafnir": "A", "pvp": "SS"},
    "captain": null
  }
]
$$) AS t(e);
