-- ═══════════════════════════════════════════════════════════════
-- BATCH 14 — 9 espers B/C tier + 6 Meta (30 Mai 2026)
-- Yalina, Feng Xun, Yorana + Meta Mona, Meta Freddy, Meta Li Ling, Meta Ollie, Meta Drew, Meta Alexa
-- ═══════════════════════════════════════════════════════════════

INSERT INTO public.espers
  (id, name, image, divinity, element, role, tier, rarity, description, relic_build, synergies, modes, captain)
SELECT
  e->>'id',
  e->>'name',
  NULLIF(e->>'image', 'null'),
  e->>'divinity',
  e->>'element',
  e->>'role',
  e->>'tier',
  (e->>'rarity')::smallint,
  e->>'description',
  e->'relicBuild',
  ARRAY(SELECT json_array_elements_text(e->'synergies')),
  e->'modes',
  NULLIF(e->>'captain', 'null')
FROM json_array_elements($$
[
  {
    "id": "yalina",
    "name": "Yalina",
    "image": "https://static.wikia.nocookie.net/dislyte/images/5/50/Yalina_avatar.png/revision/latest",
    "divinity": "Mamitu",
    "element": "shimmer",
    "role": "controller",
    "tier": "B",
    "rarity": 4,
    "description": "Contrôleuse Scintillant Épique inspirée de Mamitu, déesse babylonienne du destin et des serments. Yalina punit les ennemis qui se soignent avec Promise Breaker, inflige Saignement, dissipe les buffs et déclenche des attaques de poursuite dévastatrices. Niche mais efficace contre les soigneurs.",
    "relicBuild": {
      "primary": {"set4": "calamite", "set2": "recurve", "label": "Calamité + Incandescence"},
      "alt": {"set4": "wind", "set2": "recurve", "label": "Vent + Incandescence"},
      "mainStats": {"ring": "Taux de Crit", "helmet": "ATQ%", "boots": "VIT"},
      "substats": ["Précision", "ATQ%", "Taux de Crit", "Dégâts Crit", "VIT"],
      "notes": "Calamité synergise avec ses saignements. Précision pour que les debuffs passent. Build orienté anti-heal en PvP."
    },
    "synergies": ["sander", "gabrielle", "ossana"],
    "modes": {"story": "B", "kronos": "B", "apep": "B", "fafnir": "B", "pvp": "B"},
    "captain": null
  },
  {
    "id": "feng-xun",
    "name": "Feng Xun",
    "image": "https://static.wikia.nocookie.net/dislyte/images/5/50/Feng_Xun_avatar.png/revision/latest",
    "divinity": "Fu Xi",
    "element": "wind",
    "role": "dps",
    "tier": "B",
    "rarity": 5,
    "description": "DPS Vent Épique inspiré de Fu Xi, dieu civilisateur de la mythologie chinoise. Feng Xun crée des zones Marsh Wind, soigne ses alliés à travers ses attaques, dissipe les effets de contrôle sur l'équipe et déclenche des attaques de poursuite puissantes. Kit défensif-offensif intéressant.",
    "relicBuild": {
      "primary": {"set4": "war", "set2": "recurve", "label": "Guerre + Incandescence"},
      "alt": {"set4": "en-bas", "set2": "recurve", "label": "Vol de Vie + Incandescence"},
      "mainStats": {"ring": "Taux de Crit", "helmet": "ATQ%", "boots": "VIT"},
      "substats": ["ATQ%", "Taux de Crit", "Dégâts Crit", "VIT"],
      "notes": "Vol de Vie synergise avec sa mécanique de heal-on-hit. War pour maximiser les dégâts des poursuites."
    },
    "synergies": ["gabrielle", "sally", "lu-shang"],
    "modes": {"story": "B", "kronos": "B", "apep": "B", "fafnir": "B", "pvp": "B"},
    "captain": null
  },
  {
    "id": "yorana",
    "name": "Yorana",
    "image": "https://static.wikia.nocookie.net/dislyte/images/b/b8/Yorana_avatar.png/revision/latest",
    "divinity": "Kamaitachi",
    "element": "flow",
    "role": "support",
    "tier": "C",
    "rarity": 5,
    "description": "Support Aquatique Rare inspirée du Kamaitachi, créature mythique japonaise évoquant une belette tranchante. Yorana suit les alliés en Furtivité, lance des attaques de poursuite, accorde Tea Break pour la protection, nettoie les debuffs et affaiblit les ennemis. Option F2P correcte en early game.",
    "relicBuild": {
      "primary": {"set4": "wind", "set2": "sylvestre", "label": "Vent + Sylvestre"},
      "alt": {"set4": "en-bas", "set2": "sylvestre", "label": "Vol de Vie + Sylvestre"},
      "mainStats": {"ring": "PV%", "helmet": "VIT", "boots": "VIT"},
      "substats": ["VIT", "PV%", "DEF%"],
      "notes": "Build survie basique. VIT pour agir souvent. Remplacer dès qu'un meilleur support est disponible."
    },
    "synergies": ["gabrielle", "momo", "bi-tao"],
    "modes": {"story": "B", "kronos": "C", "apep": "C", "fafnir": "C", "pvp": "C"},
    "captain": null
  },
  {
    "id": "meta-mona",
    "name": "Meta Mona",
    "image": "https://static.wikia.nocookie.net/dislyte/images/e/e2/Meta_Mona_avatar.png/revision/latest",
    "divinity": "Meta Artémis",
    "element": "flow",
    "role": "dps",
    "tier": "SS",
    "rarity": 5,
    "description": "Version Meta Légendaire de Mona, le DPS zone Aquatique iconique de Dislyte. Meta Mona bombarde les ennemis de salves lunaires, se soigne à travers les dégâts, gagne des tours supplémentaires et amplifie ses dégâts critiques. Une version ultra-améliorée de Mona pour le contenu end-game.",
    "relicBuild": {
      "primary": {"set4": "foudre", "set2": "recurve", "label": "Foudre + Incandescence"},
      "alt": {"set4": "war", "set2": "recurve", "label": "Guerre + Incandescence"},
      "mainStats": {"ring": "Taux de Crit", "helmet": "ATQ%", "boots": "VIT"},
      "substats": ["Taux de Crit", "ATQ%", "Dégâts Crit", "VIT"],
      "notes": "Même logique que Mona mais amplifié. Foudre pour les boss. Taux de Crit ≥ 80% impératif pour déclencher les tours bonus."
    },
    "synergies": ["gabrielle", "lu-shang", "pindar"],
    "modes": {"story": "SS", "kronos": "S", "apep": "SS", "fafnir": "S", "pvp": "SS"},
    "captain": null
  },
  {
    "id": "meta-freddy",
    "name": "Meta Freddy",
    "image": "https://static.wikia.nocookie.net/dislyte/images/2/26/Meta_Freddy_avatar.png/revision/latest",
    "divinity": "Meta Fenrir",
    "element": "inferno",
    "role": "dps",
    "tier": "SS",
    "rarity": 5,
    "description": "Version Meta Légendaire de Freddy, le DPS Brasier. Meta Freddy entre en mode Wildstrike, accumule des stacks Brand, gagne Standoff, scale ses dégâts avec ses PV perdus et dévaste les boss en mode Meta. Version drastiquement améliorée par rapport au Freddy original.",
    "relicBuild": {
      "primary": {"set4": "en-bas", "set2": "recurve", "label": "Vol de Vie + Incandescence"},
      "alt": {"set4": "foudre", "set2": "recurve", "label": "Foudre + Incandescence"},
      "mainStats": {"ring": "Taux de Crit", "helmet": "ATQ%", "boots": "VIT"},
      "substats": ["ATQ%", "Taux de Crit", "Dégâts Crit", "PV%", "VIT"],
      "notes": "Vol de Vie pour le sustain en mode Wildstrike. PV% utile car ses dégâts scalent avec les PV perdus. Foudre alternatif pur boss."
    },
    "synergies": ["gabrielle", "lu-shang", "badrun"],
    "modes": {"story": "SS", "kronos": "SS", "apep": "S", "fafnir": "S", "pvp": "S"},
    "captain": null
  },
  {
    "id": "meta-li-ling",
    "name": "Meta Li Ling",
    "image": "https://static.wikia.nocookie.net/dislyte/images/3/31/Meta_Li_Ling_avatar.png/revision/latest",
    "divinity": "Meta Nezha",
    "element": "inferno",
    "role": "dps",
    "tier": "SS",
    "rarity": 5,
    "description": "Version Meta Légendaire de Li Ling, le DPS Brasier iconique. Meta Li Ling absorbe la PA en permanence, accumule des stacks Endless Fire, accorde de la PA aux alliés, ignore les Boucliers et déchaîne des attaques AoE dévastatrices. Puissance extrême en PvE et PvP.",
    "relicBuild": {
      "primary": {"set4": "foudre", "set2": "recurve", "label": "Foudre + Incandescence"},
      "alt": {"set4": "war", "set2": "recurve", "label": "Guerre + Incandescence"},
      "mainStats": {"ring": "Taux de Crit", "helmet": "ATQ%", "boots": "VIT"},
      "substats": ["Taux de Crit", "ATQ%", "Dégâts Crit", "VIT"],
      "notes": "Foudre maximise les dégâts AoE. VIT pour déclencher les absorptions de PA en priorité. Taux de Crit ≥ 80%."
    },
    "synergies": ["gabrielle", "lu-shang", "wu-you"],
    "modes": {"story": "SS", "kronos": "SS", "apep": "SS", "fafnir": "S", "pvp": "SS"},
    "captain": null
  },
  {
    "id": "meta-ollie",
    "name": "Meta Ollie",
    "image": "https://static.wikia.nocookie.net/dislyte/images/8/84/Meta_Ollie_avatar.png/revision/latest",
    "divinity": "Meta Osiris",
    "element": "flow",
    "role": "support",
    "tier": "SS",
    "rarity": 5,
    "description": "Version Meta Légendaire d'Ollie. Meta Ollie ressuscite les alliés tombés avec Vital Pact, amplifie les dégâts subis par les ennemis et scale ses capacités à travers les résurrections répétées. Support défensif révolutionnaire qui transforme la défaite en victoire.",
    "relicBuild": {
      "primary": {"set4": "wind", "set2": "sylvestre", "label": "Vent + Sylvestre"},
      "alt": {"set4": "wind", "set2": "lumiere", "label": "Vent + Lumière"},
      "mainStats": {"ring": "PV%", "helmet": "VIT", "boots": "VIT"},
      "substats": ["VIT", "PV%", "DEF%", "Résistance"],
      "notes": "VIT prioritaire pour agir avant les ennemis et déclencher les résurrections à temps. PV% pour sa survie."
    },
    "synergies": ["gabrielle", "meta-li-ling", "badrun"],
    "modes": {"story": "S", "kronos": "SS", "apep": "S", "fafnir": "S", "pvp": "SS"},
    "captain": null
  },
  {
    "id": "meta-drew",
    "name": "Meta Drew",
    "image": "https://static.wikia.nocookie.net/dislyte/images/8/83/Meta_Drew_avatar.png/revision/latest",
    "divinity": "Meta Anubis",
    "element": "inferno",
    "role": "dps",
    "tier": "SS",
    "rarity": 5,
    "description": "Version Meta Légendaire de Drew. Meta Drew vole les stats ennemies de façon permanente, ressuscite après les actions alliées, renforce ses coéquipiers avec Burden of Duat et scale massivement sa survie. Esper hybride offense/défense avec un kit unique en PvP.",
    "relicBuild": {
      "primary": {"set4": "war", "set2": "avatara", "label": "Guerre + Avatara"},
      "alt": {"set4": "foudre", "set2": "recurve", "label": "Foudre + Incandescence"},
      "mainStats": {"ring": "Taux de Crit", "helmet": "ATQ%", "boots": "VIT"},
      "substats": ["ATQ%", "Taux de Crit", "Dégâts Crit", "PV%", "VIT"],
      "notes": "Avatara déclenche des contre-attaques après ses résurrections. PV% pour la survie lors des cycles de résurrection."
    },
    "synergies": ["gabrielle", "wu-you", "meta-ollie"],
    "modes": {"story": "S", "kronos": "S", "apep": "A", "fafnir": "S", "pvp": "SS"},
    "captain": null
  },
  {
    "id": "meta-alexa",
    "name": "Meta Alexa",
    "image": "https://static.wikia.nocookie.net/dislyte/images/3/3a/Meta_Alexa_avatar.png/revision/latest",
    "divinity": "Meta Aphrodite",
    "element": "inferno",
    "role": "support",
    "tier": "SS",
    "rarity": 5,
    "description": "Version Meta Légendaire d'Alexa. Meta Alexa est un support Brasier ultra-puissant qui amplifie massivement les dégâts de son équipe. Ses capacités Meta lui permettent de dépasser largement la version originale d'Alexa en PvE comme en PvP.",
    "relicBuild": {
      "primary": {"set4": "wind", "set2": "sylvestre", "label": "Vent + Sylvestre"},
      "alt": {"set4": "harmonie", "set2": "sylvestre", "label": "Harmonie + Sylvestre"},
      "mainStats": {"ring": "PV%", "helmet": "VIT", "boots": "VIT"},
      "substats": ["VIT", "PV%", "DEF%", "Résistance"],
      "notes": "VIT prioritaire pour accorder ses buffs en premier. PV%/DEF% pour survivre et continuer à supporter l'équipe."
    },
    "synergies": ["gabrielle", "meta-li-ling", "pindar"],
    "modes": {"story": "S", "kronos": "SS", "apep": "S", "fafnir": "S", "pvp": "SS"},
    "captain": null
  }
]
$$) AS t(e);
