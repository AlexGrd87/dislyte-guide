-- ═══════════════════════════════════════════════════════════════
-- BATCH 11 — 10 espers SS/A tier (30 Mai 2026)
-- Badrun, Chu Yao, Sui Zai, Tirrel, Petros, Andreas, Sieg, Maria, Zhou Hong, Su Jue
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
    "id": "badrun",
    "name": "Badrun",
    "image": "https://static.wikia.nocookie.net/dislyte/images/5/5b/Badrun_avatar.png/revision/latest",
    "divinity": "Khonsou",
    "element": "inferno",
    "role": "support",
    "tier": "SS",
    "rarity": 5,
    "description": "Support Brasier Légendaire inspiré de Khonsou, dieu égyptien de la lune et du temps. Badrun peut ressusciter des alliés tombés avec Omnipotent Elixir, réinitialise les cooldowns, dissipe les buffs de survie ennemis et réduit massivement les PV max adverses. Support de fin de partie redoutable.",
    "relicBuild": {
      "primary": {"set4": "wind", "set2": "sylvestre", "label": "Vent + Sylvestre"},
      "alt": {"set4": "wind", "set2": "lumiere", "label": "Vent + Lumière"},
      "mainStats": {"ring": "PV%", "helmet": "VIT", "boots": "VIT"},
      "substats": ["VIT", "PV%", "DEF%", "Résistance"],
      "notes": "VIT haute pour agir en priorité et déclencher les résurrections à temps. PV% pour la survie en PvP."
    },
    "synergies": ["gabrielle", "yu-jing", "raven"],
    "modes": {"story": "A", "kronos": "S", "apep": "A", "fafnir": "A", "pvp": "SS"},
    "captain": null
  },
  {
    "id": "chu-yao",
    "name": "Chu Yao",
    "image": "https://static.wikia.nocookie.net/dislyte/images/6/6f/Chu_Yao_avatar.png/revision/latest",
    "divinity": "Taiyi",
    "element": "flow",
    "role": "controller",
    "tier": "SS",
    "rarity": 5,
    "description": "Contrôleur Aquatique Légendaire inspiré de Taiyi, dieu taoïste de la médecine et de l'alchimie. Chu Yao propage des debuffs dévastateurs, accorde Spirit Aegis à son équipe, prolonge les durées de debuffs et déclenche des attaques d'assistance incessantes. Polyvalent en PvE et dangereux en PvP.",
    "relicBuild": {
      "primary": {"set4": "wind", "set2": "recurve", "label": "Vent + Incandescence"},
      "alt": {"set4": "calamite", "set2": "recurve", "label": "Calamité + Incandescence"},
      "mainStats": {"ring": "PV%", "helmet": "VIT", "boots": "VIT"},
      "substats": ["VIT", "Précision", "PV%", "Taux de Crit"],
      "notes": "Précision importante pour que tous ses debuffs passent. VIT pour multiplier les attaques d'assistance et les tours."
    },
    "synergies": ["moroyama", "sander", "tiye"],
    "modes": {"story": "S", "kronos": "SS", "apep": "S", "fafnir": "A", "pvp": "S"},
    "captain": null
  },
  {
    "id": "sui-zai",
    "name": "Sui Zai",
    "image": "https://static.wikia.nocookie.net/dislyte/images/c/c4/Sui_Zai_avatar.png/revision/latest",
    "divinity": "Bête Nian",
    "element": "wind",
    "role": "dps",
    "tier": "A",
    "rarity": 5,
    "description": "DPS Vent Légendaire inspiré de la Bête Nian, monstre du Nouvel An chinois. Sui Zai domine les combats via des contre-attaques incessantes, se soigne à travers ses frappes et accumule des stacks Doom's Grasp pour déclencher Untamed Fury — une attaque AoE aux dégâts réels dévastateurs.",
    "relicBuild": {
      "primary": {"set4": "war", "set2": "avatara", "label": "Guerre + Avatara"},
      "alt": {"set4": "war", "set2": "recurve", "label": "Guerre + Incandescence"},
      "mainStats": {"ring": "Taux de Crit", "helmet": "ATQ%", "boots": "VIT"},
      "substats": ["Taux de Crit", "ATQ%", "Dégâts Crit", "PV%", "VIT"],
      "notes": "Avatara maximise les contre-attaques. PV% important pour la mécanique de self-heal. Taux de Crit ≥ 80%."
    },
    "synergies": ["gabrielle", "sally", "sander"],
    "modes": {"story": "S", "kronos": "A", "apep": "A", "fafnir": "S", "pvp": "A"},
    "captain": null
  },
  {
    "id": "tirrel",
    "name": "Tirrel",
    "image": "https://static.wikia.nocookie.net/dislyte/images/6/64/Tirrel_avatar.png/revision/latest",
    "divinity": "Uttu",
    "element": "umbra",
    "role": "controller",
    "tier": "A",
    "rarity": 5,
    "description": "Contrôleur Ombre Légendaire inspiré d'Uttu, déesse sumérienne du tissage. Tirrel immobilise les ennemis avec les debuffs Gossamer et Cobweb, puis leur inflige des dégâts réels massifs proportionnels à leurs PV max contre les cibles piégées. Excellent contre les boss à PV élevés.",
    "relicBuild": {
      "primary": {"set4": "wind", "set2": "recurve", "label": "Vent + Incandescence"},
      "alt": {"set4": "calamite", "set2": "recurve", "label": "Calamité + Incandescence"},
      "mainStats": {"ring": "PV%", "helmet": "ATQ%", "boots": "VIT"},
      "substats": ["VIT", "Précision", "ATQ%", "PV%"],
      "notes": "Précision critique pour que Gossamer et Cobweb passent. VIT pour contrôler avant les ennemis. ATQ% amplifie les dégâts réels."
    },
    "synergies": ["gabrielle", "sander", "chu-yao"],
    "modes": {"story": "A", "kronos": "S", "apep": "A", "fafnir": "A", "pvp": "A"},
    "captain": null
  },
  {
    "id": "petros",
    "name": "Petros",
    "image": "https://static.wikia.nocookie.net/dislyte/images/1/1d/Petros_avatar.png/revision/latest",
    "divinity": "Minotaure",
    "element": "shimmer",
    "role": "dps",
    "tier": "A",
    "rarity": 5,
    "description": "DPS Scintillant Légendaire inspiré du Minotaure, monstre mi-homme mi-taureau de la mythologie grecque. Petros écrase les ennemis affaiblis avec des frappes critiques garanties, survit aux coups mortels, se soigne et traque les cibles prioritaires avec des attaques de poursuite dévastatrices.",
    "relicBuild": {
      "primary": {"set4": "foudre", "set2": "recurve", "label": "Foudre + Incandescence"},
      "alt": {"set4": "war", "set2": "recurve", "label": "Guerre + Incandescence"},
      "mainStats": {"ring": "Taux de Crit", "helmet": "ATQ%", "boots": "VIT"},
      "substats": ["ATQ%", "Dégâts Crit", "PV%", "VIT"],
      "notes": "Ses crits sont garantis sur cibles affaiblies donc ATQ% et Dégâts Crit > Taux de Crit. PV% pour sa mécanique de survie."
    },
    "synergies": ["sander", "gabrielle", "chu-yao"],
    "modes": {"story": "S", "kronos": "S", "apep": "A", "fafnir": "A", "pvp": "A"},
    "captain": null
  },
  {
    "id": "andreas",
    "name": "Andreas",
    "image": "https://static.wikia.nocookie.net/dislyte/images/6/62/Andreas_avatar.png/revision/latest",
    "divinity": "Achille",
    "element": "inferno",
    "role": "dps",
    "tier": "A",
    "rarity": 5,
    "description": "DPS Brasier Légendaire inspiré d'Achille, héros invulnérable de la mythologie grecque. Andreas riposte contre ses attaquants, accumule un pouvoir Warheart considérable, ignore les protections défensives et dévaste les ennemis avec des frappes critiques garanties. Très efficace en début de combat.",
    "relicBuild": {
      "primary": {"set4": "foudre", "set2": "avatara", "label": "Foudre + Avatara"},
      "alt": {"set4": "war", "set2": "avatara", "label": "Guerre + Avatara"},
      "mainStats": {"ring": "Taux de Crit", "helmet": "ATQ%", "boots": "VIT"},
      "substats": ["ATQ%", "Dégâts Crit", "Taux de Crit", "VIT"],
      "notes": "Avatara déclench ses contre-attaques passives. Foudre pour maximiser les dégâts critiques boss. Dégâts Crit prioritaire car ses crits s'accumulent."
    },
    "synergies": ["gabrielle", "sally", "sander"],
    "modes": {"story": "S", "kronos": "A", "apep": "A", "fafnir": "A", "pvp": "S"},
    "captain": null
  },
  {
    "id": "sieg",
    "name": "Sieg",
    "image": "https://static.wikia.nocookie.net/dislyte/images/e/ed/Sieg_avatar.png/revision/latest",
    "divinity": "Siegfried",
    "element": "umbra",
    "role": "dps",
    "tier": "A",
    "rarity": 5,
    "description": "DPS Ombre Légendaire inspiré de Siegfried, héros invincible de la mythologie germanique. Sieg traque les ennemis prioritaires, ignore la DEF adverse, gagne de la PA rapidement et inflige des dégâts d'assassinat massifs en ciblage unique. Excellent en PvP pour éliminer les supports ennemis.",
    "relicBuild": {
      "primary": {"set4": "foudre", "set2": "recurve", "label": "Foudre + Incandescence"},
      "alt": {"set4": "war", "set2": "recurve", "label": "Guerre + Incandescence"},
      "mainStats": {"ring": "Taux de Crit", "helmet": "ATQ%", "boots": "VIT"},
      "substats": ["ATQ%", "Taux de Crit", "Dégâts Crit", "VIT"],
      "notes": "VIT haute pour agir avant les cibles et les one-shot. Dégâts Crit ≥ 150% idéal. Foudre avantageux contre les boss."
    },
    "synergies": ["wu-you", "gabrielle", "raven"],
    "modes": {"story": "A", "kronos": "A", "apep": "A", "fafnir": "B", "pvp": "S"},
    "captain": null
  },
  {
    "id": "maria",
    "name": "Maria",
    "image": "https://static.wikia.nocookie.net/dislyte/images/c/cf/Maria_avatar.png/revision/latest",
    "divinity": "Chalchiuhtlicue",
    "element": "shimmer",
    "role": "support",
    "tier": "A",
    "rarity": 5,
    "description": "Support Scintillant Légendaire inspirée de Chalchiuhtlicue, déesse aztèque des eaux et des tempêtes. Maria gèle les ennemis avec des stacks d'Hypothermie, soigne massivement ses alliés, pose des boucliers et manipule les jauges de PA. Support offensif et défensif à la fois.",
    "relicBuild": {
      "primary": {"set4": "wind", "set2": "sylvestre", "label": "Vent + Sylvestre"},
      "alt": {"set4": "panacee", "set2": "sylvestre", "label": "Panacée + Sylvestre"},
      "mainStats": {"ring": "PV%", "helmet": "VIT", "boots": "VIT"},
      "substats": ["VIT", "PV%", "DEF%", "Précision"],
      "notes": "VIT haute pour geler les ennemis avant qu'ils n'agissent. Panacée (+30% efficacité soins) si utilisée comme healeur principal."
    },
    "synergies": ["gabrielle", "yu-jing", "badrun"],
    "modes": {"story": "S", "kronos": "A", "apep": "S", "fafnir": "A", "pvp": "S"},
    "captain": null
  },
  {
    "id": "zhou-hong",
    "name": "Zhou Hong",
    "image": "https://static.wikia.nocookie.net/dislyte/images/1/13/Zhou_Hong_avatar.png/revision/latest",
    "divinity": "Gonggong",
    "element": "inferno",
    "role": "dps",
    "tier": "A",
    "rarity": 5,
    "description": "DPS Brasier Légendaire inspiré de Gonggong, dieu chinois des eaux et des inondations. Zhou Hong affaiblit les ennemis avec des stacks Overtime, entre dans le mode dévastateur Tough it Out et se réinitialise après chaque kill. Excellent en vague pour nettoyer rapidement les ennemis.",
    "relicBuild": {
      "primary": {"set4": "war", "set2": "recurve", "label": "Guerre + Incandescence"},
      "alt": {"set4": "foudre", "set2": "recurve", "label": "Foudre + Incandescence"},
      "mainStats": {"ring": "Taux de Crit", "helmet": "ATQ%", "boots": "VIT"},
      "substats": ["Taux de Crit", "ATQ%", "Dégâts Crit", "VIT"],
      "notes": "Taux de Crit ≥ 80% pour déclencher ses réinitialisations régulièrement. ATQ% et Dégâts Crit pour maximiser les kills."
    },
    "synergies": ["gabrielle", "sander", "tiye"],
    "modes": {"story": "SS", "kronos": "A", "apep": "S", "fafnir": "A", "pvp": "A"},
    "captain": null
  },
  {
    "id": "su-jue",
    "name": "Su Jue",
    "image": "https://static.wikia.nocookie.net/dislyte/images/1/19/Su_Jue_avatar.png/revision/latest",
    "divinity": "Daji",
    "element": "inferno",
    "role": "controller",
    "tier": "A",
    "rarity": 5,
    "description": "Contrôleuse Brasier Légendaire inspirée de Daji, renarde à neuf queues de la mythologie chinoise. Su Jue manipule les ennemis avec Puppet Art, les contre-attaque sans relâche, renforce la survie alliée avec Funeral Rites et inflige des dégâts réels massifs. Redoutable en PvP.",
    "relicBuild": {
      "primary": {"set4": "wind", "set2": "recurve", "label": "Vent + Incandescence"},
      "alt": {"set4": "calamite", "set2": "recurve", "label": "Calamité + Incandescence"},
      "mainStats": {"ring": "PV%", "helmet": "VIT", "boots": "VIT"},
      "substats": ["VIT", "Précision", "ATQ%", "PV%"],
      "notes": "Précision haute pour imposer Puppet Art. VIT pour multiplier les contre-attaques. ATQ% améliore les dégâts réels."
    },
    "synergies": ["wu-you", "gabrielle", "chu-yao"],
    "modes": {"story": "A", "kronos": "A", "apep": "A", "fafnir": "B", "pvp": "S"},
    "captain": null
  }
]
$$) AS t(e);
