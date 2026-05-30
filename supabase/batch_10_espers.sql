-- ═══════════════════════════════════════════════════════════════
-- BATCH 10 — 10 espers SS tier (30 Mai 2026)
-- Ivana, Sloan, Lapis, Yu Jing, Zi He, Moroyama, Morris, Pindar, Lü Shang, Wu You
-- Images via Fandom CDN (MD5 hash) — à confirmer HTTP 200
-- ⚠️ Lü Shang : URL avec ü (Lü_Shang_avatar.png). Fallback : Lu_Shang (hash 3/3f/)
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
    "id": "ivana",
    "name": "Ivana",
    "image": "https://static.wikia.nocookie.net/dislyte/images/1/11/Ivana_avatar.png/revision/latest",
    "divinity": "Morana",
    "element": "wind",
    "role": "dps",
    "tier": "SS",
    "rarity": 5,
    "description": "DPS Vent Légendaire inspirée de Morana, déesse slave de la mort et de l'hiver. Ivana se spécialise dans le gel des ennemis et inflige des dégâts massifs aux cibles gelées. Premier esper du panthéon slave, indispensable en contenu PvE et PvP grâce à son contrôle par le gel.",
    "relicBuild": {
      "primary": {"set4": "war", "set2": "recurve", "label": "Guerre + Incandescence"},
      "alt": {"set4": "foudre", "set2": "recurve", "label": "Foudre + Incandescence"},
      "mainStats": {"ring": "Taux de Crit", "helmet": "ATQ%", "boots": "VIT"},
      "substats": ["Taux de Crit", "ATQ%", "Dégâts Crit", "VIT"],
      "notes": "Viser Taux de Crit ≥ 80% puis Dégâts Crit ≥ 150%. VIT important pour agir avant les ennemis et déclencher le gel."
    },
    "synergies": ["gabrielle", "yukine", "wu-you"],
    "modes": {"story": "S", "kronos": "A", "apep": "A", "fafnir": "B", "pvp": "SS"},
    "captain": null
  },
  {
    "id": "sloan",
    "name": "Sloan",
    "image": "https://static.wikia.nocookie.net/dislyte/images/2/21/Sloan_avatar.png/revision/latest",
    "divinity": "Ereshkigal",
    "element": "flow",
    "role": "dps",
    "tier": "SS",
    "rarity": 5,
    "description": "DPS Aquatique Légendaire inspirée d'Ereshkigal, reine sumérienne des Enfers. Sloan est une DPS à haut potentiel de dégâts capable d'infliger des debuffs puissants. Elle tire le meilleur parti des alliés qui accordent Immunité ou Dissipation à l'équipe.",
    "relicBuild": {
      "primary": {"set4": "foudre", "set2": "recurve", "label": "Foudre + Incandescence"},
      "alt": {"set4": "war", "set2": "recurve", "label": "Guerre + Incandescence"},
      "mainStats": {"ring": "Taux de Crit", "helmet": "ATQ%", "boots": "VIT"},
      "substats": ["Taux de Crit", "ATQ%", "Dégâts Crit", "Précision", "VIT"],
      "notes": "Foudre maximise les dégâts critiques, idéal en boss. Précision importante pour que ses debuffs passent. VIT pour agir tôt dans le tour."
    },
    "synergies": ["gabrielle", "raven", "unas"],
    "modes": {"story": "S", "kronos": "SS", "apep": "A", "fafnir": "A", "pvp": "S"},
    "captain": null
  },
  {
    "id": "lapis",
    "name": "Lapis",
    "image": "https://static.wikia.nocookie.net/dislyte/images/2/2a/Lapis_avatar.png/revision/latest",
    "divinity": "Maat",
    "element": "wind",
    "role": "dps",
    "tier": "SS",
    "rarity": 5,
    "description": "DPS Vent Légendaire inspirée de Maat, déesse égyptienne de la vérité et de l'ordre. Lapis accélère sa propre VIT via les buffs AP Up de ses alliés et enchaîne des attaques dévasta trices avec Absolute Order. Une des meilleures DPS speed-scaling du jeu.",
    "relicBuild": {
      "primary": {"set4": "wind", "set2": "recurve", "label": "Vent + Incandescence"},
      "alt": {"set4": "war", "set2": "recurve", "label": "Guerre + Incandescence"},
      "mainStats": {"ring": "Taux de Crit", "helmet": "VIT", "boots": "VIT"},
      "substats": ["VIT", "Taux de Crit", "ATQ%", "Dégâts Crit"],
      "notes": "Set Vent (+25% VIT) pour maximiser la synergie avec ses buffs AP. Plus elle est rapide, plus elle est dangereuse. VIT > tout le reste."
    },
    "synergies": ["unas", "gabrielle", "tiye"],
    "modes": {"story": "S", "kronos": "S", "apep": "A", "fafnir": "A", "pvp": "SS"},
    "captain": null
  },
  {
    "id": "yu-jing",
    "name": "Yu Jing",
    "image": "https://static.wikia.nocookie.net/dislyte/images/a/af/Yu_Jing_avatar.png/revision/latest",
    "divinity": "Princesse Longji",
    "element": "inferno",
    "role": "support",
    "tier": "SS",
    "rarity": 5,
    "description": "Support Brasier Légendaire inspirée de la Princesse Longji, déesse du feu dans la mythologie chinoise. Yu Jing protège ses alliés avec Immunité, accélère leur jauge de PA et peut les ressusciter avec Warm Welcome. Support défensif ultra-polyvalent en PvE comme en PvP.",
    "relicBuild": {
      "primary": {"set4": "wind", "set2": "sylvestre", "label": "Vent + Sylvestre"},
      "alt": {"set4": "wind", "set2": "lumiere", "label": "Vent + Lumière"},
      "mainStats": {"ring": "PV%", "helmet": "PV%", "boots": "VIT"},
      "substats": ["VIT", "PV%", "DEF%", "Résistance"],
      "notes": "VIT primordiale pour accorder Immunité avant l'attaque ennemie. PV% et DEF% pour survivre. Résistance pour éviter les debuffs en PvP."
    },
    "synergies": ["gabrielle", "raven", "sloan"],
    "modes": {"story": "S", "kronos": "S", "apep": "S", "fafnir": "A", "pvp": "SS"},
    "captain": null
  },
  {
    "id": "zi-he",
    "name": "Zi He",
    "image": "https://static.wikia.nocookie.net/dislyte/images/5/58/Zi_He_avatar.png/revision/latest",
    "divinity": "Shiji Niangniang",
    "element": "shimmer",
    "role": "support",
    "tier": "SS",
    "rarity": 5,
    "description": "Support Scintillant Légendaire inspirée de Shiji Niangniang, démone-pierre de la mythologie chinoise (Fengshen Yanyi). Zi He pétrif ie les ennemis, redirige les dégâts alliés sur elle-même, survit aux coups mortels et renforce l'équipe grâce à Stone Steady. Défense redoutable en PvP.",
    "relicBuild": {
      "primary": {"set4": "wind", "set2": "sylvestre", "label": "Vent + Sylvestre"},
      "alt": {"set4": "wind", "set2": "fortification", "label": "Vent + Fortification"},
      "mainStats": {"ring": "PV%", "helmet": "PV%", "boots": "VIT"},
      "substats": ["VIT", "PV%", "DEF%", "Résistance"],
      "notes": "PV% élevé pour encaisser les redirections de dégâts. VIT pour agir rapidement. Fortification réduit les dégâts reçus."
    },
    "synergies": ["yu-jing", "gabrielle", "unas"],
    "modes": {"story": "A", "kronos": "S", "apep": "A", "fafnir": "B", "pvp": "SS"},
    "captain": null
  },
  {
    "id": "moroyama",
    "name": "Moroyama",
    "image": "https://static.wikia.nocookie.net/dislyte/images/3/33/Moroyama_avatar.png/revision/latest",
    "divinity": "Yamata no Orochi",
    "element": "shimmer",
    "role": "dps",
    "tier": "SS",
    "rarity": 5,
    "description": "DPS Scintillant Légendaire inspiré de Yamata no Orochi, le serpent à huit têtes de la mythologie japonaise. Moroyama inflige des debuffs incessants, ignore la DEF ennemie et survit à la mort grâce à Warrior Reborn. Extremely puissant en PvE longue durée.",
    "relicBuild": {
      "primary": {"set4": "calamite", "set2": "recurve", "label": "Calamité + Incandescence"},
      "alt": {"set4": "foudre", "set2": "recurve", "label": "Foudre + Incandescence"},
      "mainStats": {"ring": "Taux de Crit", "helmet": "ATQ%", "boots": "VIT"},
      "substats": ["Taux de Crit", "ATQ%", "Dégâts Crit", "Précision", "VIT"],
      "notes": "Calamité synergise avec ses nombreux debuffs (+20% dégâts vs cibles debuffées). Précision pour assurer le passage des debuffs."
    },
    "synergies": ["gabrielle", "sander", "chu-yao"],
    "modes": {"story": "S", "kronos": "SS", "apep": "S", "fafnir": "A", "pvp": "A"},
    "captain": null
  },
  {
    "id": "morris",
    "name": "Morris",
    "image": "https://static.wikia.nocookie.net/dislyte/images/0/03/Morris_avatar.png/revision/latest",
    "divinity": "Enki",
    "element": "wind",
    "role": "defender",
    "tier": "SS",
    "rarity": 5,
    "description": "Défenseur Vent Légendaire inspiré d'Enki, dieu mésopotamien de l'eau et de la sagesse. Morris renforce la DEF de ses coéquipiers et les protège avec des boucliers massifs. Support défensif polyvalent, particulièrement efficace pour protéger les DPS fragiles.",
    "relicBuild": {
      "primary": {"set4": "wind", "set2": "defense", "label": "Vent + Défense"},
      "alt": {"set4": "wind", "set2": "sylvestre", "label": "Vent + Sylvestre"},
      "mainStats": {"ring": "DEF%", "helmet": "PV%", "boots": "VIT"},
      "substats": ["VIT", "DEF%", "PV%", "Résistance"],
      "notes": "DEF% élevée maximise la valeur de ses boucliers. Set Défense (+12% DEF base aux alliés) amplifie son rôle de soutien défensif."
    },
    "synergies": ["gabrielle", "yu-jing", "gorath"],
    "modes": {"story": "A", "kronos": "A", "apep": "A", "fafnir": "B", "pvp": "S"},
    "captain": null
  },
  {
    "id": "pindar",
    "name": "Pindar",
    "image": "https://static.wikia.nocookie.net/dislyte/images/c/c0/Pindar_avatar.png/revision/latest",
    "divinity": "Orphée",
    "element": "wind",
    "role": "support",
    "tier": "SS",
    "rarity": 5,
    "description": "Support Vent Légendaire inspiré d'Orphée, poète et musicien de la mythologie grecque. Pindar améliore l'allié le plus à gauche grâce à Harmonic Control, lui accordant des tours supplémentaires, des buffs massifs et une réduction de cooldown. Support ultra-spécialisé pour amplifier un DPS unique.",
    "relicBuild": {
      "primary": {"set4": "wind", "set2": "sylvestre", "label": "Vent + Sylvestre"},
      "alt": {"set4": "wind", "set2": "lumiere", "label": "Vent + Lumière"},
      "mainStats": {"ring": "PV%", "helmet": "VIT", "boots": "VIT"},
      "substats": ["VIT", "PV%", "DEF%", "Résistance"],
      "notes": "VIT maximale pour accorder les tours supplémentaires en priorité. Il doit toujours agir avant le DPS qu'il soutient."
    },
    "synergies": ["gaius", "sloan", "lapis"],
    "modes": {"story": "S", "kronos": "SS", "apep": "S", "fafnir": "S", "pvp": "S"},
    "captain": null
  },
  {
    "id": "lu-shang",
    "name": "Lü Shang",
    "image": "https://static.wikia.nocookie.net/dislyte/images/8/82/Lü_Shang_avatar.png/revision/latest",
    "divinity": "Jiang Ziya",
    "element": "flow",
    "role": "support",
    "tier": "SS",
    "rarity": 5,
    "description": "Support Aquatique Légendaire inspiré de Jiang Ziya, sage stratège de la mythologie chinoise. Lü Shang renforce ses alliés avec les buffs Accentuated adaptés à leur rôle, inflige Silence aux ennemis et les protège grâce à Enlightened. Support polyvalent qui s'adapte à toute composition.",
    "relicBuild": {
      "primary": {"set4": "wind", "set2": "sylvestre", "label": "Vent + Sylvestre"},
      "alt": {"set4": "harmonie", "set2": "sylvestre", "label": "Harmonie + Sylvestre"},
      "mainStats": {"ring": "PV%", "helmet": "VIT", "boots": "VIT"},
      "substats": ["VIT", "PV%", "DEF%", "Précision"],
      "notes": "VIT haute pour accorder ses buffs en priorité. Précision pour que Silence passe sur les cibles résistantes."
    },
    "synergies": ["gabrielle", "pindar", "sloan"],
    "modes": {"story": "S", "kronos": "SS", "apep": "S", "fafnir": "S", "pvp": "S"},
    "captain": null
  },
  {
    "id": "wu-you",
    "name": "Wu You",
    "image": "https://static.wikia.nocookie.net/dislyte/images/4/48/Wu_You_avatar.png/revision/latest",
    "divinity": "Dijiang",
    "element": "shimmer",
    "role": "ap-controller",
    "tier": "SS",
    "rarity": 5,
    "description": "Contrôleur de PA Scintillant Légendaire inspiré de Dijiang, créature divine sans visage de la mythologie chinoise. Wu You est l'un des meilleurs contrôleurs de PA du jeu — il manipule les jauges d'action de toute l'équipe pour s'assurer que les alliés agissent en priorité. Incontournable en PvP.",
    "relicBuild": {
      "primary": {"set4": "wind", "set2": "lumiere", "label": "Vent + Lumière"},
      "alt": {"set4": "wind", "set2": "infini", "label": "Vent + Infini"},
      "mainStats": {"ring": "PV%", "helmet": "VIT", "boots": "VIT"},
      "substats": ["VIT", "PV%", "DEF%", "Résistance"],
      "notes": "VIT maximale — c'est son seule stat vraiment importante. Plus il est rapide, plus il agit souvent pour distribuer de la PA à ses alliés."
    },
    "synergies": ["gabrielle", "unas", "raven"],
    "modes": {"story": "A", "kronos": "S", "apep": "A", "fafnir": "A", "pvp": "SS"},
    "captain": "+25% VIT à toute l'équipe"
  }
]
$$) AS t(e);
