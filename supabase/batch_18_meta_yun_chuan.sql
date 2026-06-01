-- ═══════════════════════════════════════════════════════════════
-- BATCH 18 — Meta Yun Chuan (Meta Yang Jian) — 1 Juin 2026
-- DPS Vent 5★ Awakening — version Meta de Yun Chuan
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
    "id": "meta-yun-chuan",
    "name": "Meta Yun Chuan",
    "image": "https://alexgrd87.github.io/dislyte-guide/images/espers/meta-yun-chuan.png",
    "divinity": "Meta Yang Jian",
    "element": "wind",
    "role": "dps",
    "tier": "SS",
    "rarity": 5,
    "description": "Version Meta Légendaire de Yun Chuan, le défenseur Vent inspiré de Yang Jian. Meta Yun Chuan devient un DPS dévastateur qui répand Sear, Taux d'Esquive Up et Third Eye Seal via son compagnon Screamer. Guardian Lord frappe tous les ennemis, ralentit l'équipe adverse et accélère les alliés tout en gagnant l'Immunité. Redoutable en PvP et en contenu end-game.",
    "relicBuild": {
      "primary": {"set4": "war", "set2": "recurve", "label": "Guerre + Incandescence"},
      "alt": {"set4": "wind", "set2": "recurve", "label": "Vent + Incandescence"},
      "mainStats": {"ring": "Taux de Crit", "helmet": "ATQ%", "boots": "VIT"},
      "substats": ["ATQ%", "Taux de Crit", "Dégâts Crit", "VIT"],
      "notes": "Taux de Crit ≥ 80% pour déclencher Third Eye Seal systématiquement. Vent en alt si VIT insuffisante. ATQ% et Dégâts Crit pour maximiser les dégâts de Screamer."
    },
    "synergies": ["gabrielle", "wenlock", "lu-shang"],
    "modes": {"story": "SS", "kronos": "S", "apep": "SS", "fafnir": "S", "pvp": "SS"},
    "captain": null
  }
]
$$) AS t(e);
