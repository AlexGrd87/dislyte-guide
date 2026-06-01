-- ═══════════════════════════════════════════════════════════════
-- BATCH 13 — 10 espers A/B tier (30 Mai 2026)
-- Bi Tao, Fatimah, Yu Ran, Momo, Gorath, Victor, Tetsuya, Amir, Yu Xu, Daniel
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
    "id": "bi-tao",
    "name": "Bi Tao",
    "image": "https://static.wikia.nocookie.net/dislyte/images/a/a6/Bi_Tao_avatar.png/revision/latest",
    "divinity": "Shen Gongbao",
    "element": "flow",
    "role": "controller",
    "tier": "A",
    "rarity": 5,
    "description": "Contrôleur Aquatique Légendaire inspiré de Shen Gongbao, antagoniste taoïste de Fengshen Yanyi. Bi Tao inflige des debuffs de contrôle variés, perturbe les formations ennemies et dispose d'un kit orienté désorganisation en PvP.",
    "relicBuild": {
      "primary": {"set4": "wind", "set2": "recurve", "label": "Vent + Incandescence"},
      "alt": {"set4": "domination", "set2": "recurve", "label": "Domination + Incandescence"},
      "mainStats": {"ring": "PV%", "helmet": "VIT", "boots": "VIT"},
      "substats": ["VIT", "Précision", "PV%", "DEF%"],
      "notes": "Précision critique pour que ses debuffs passent. VIT haute pour contrôler avant que les ennemis n'agissent."
    },
    "synergies": ["gabrielle", "wu-you", "chu-yao"],
    "modes": {"story": "A", "kronos": "A", "apep": "A", "fafnir": "B", "pvp": "S"},
    "captain": null
  },
  {
    "id": "fatimah",
    "name": "Fatimah",
    "image": "https://static.wikia.nocookie.net/dislyte/images/5/5a/Fatimah_avatar.png/revision/latest",
    "divinity": "Gilgamesh",
    "element": "inferno",
    "role": "dps",
    "tier": "A",
    "rarity": 5,
    "description": "DPS Brasier Légendaire inspirée de Gilgamesh, héros sumérien légendaire. Fatimah accumule des stacks Sunglory à partir des buffs ennemis, résiste aux effets de contrôle et enchaîne des attaques multi-coups dévastatrices contre son jugement. Excellente contre les ennemis avec beaucoup de buffs.",
    "relicBuild": {
      "primary": {"set4": "foudre", "set2": "recurve", "label": "Foudre + Incandescence"},
      "alt": {"set4": "war", "set2": "recurve", "label": "Guerre + Incandescence"},
      "mainStats": {"ring": "Taux de Crit", "helmet": "ATQ%", "boots": "VIT"},
      "substats": ["ATQ%", "Taux de Crit", "Dégâts Crit", "VIT"],
      "notes": "Ses attaques multi-coups profitent pleinement du set Foudre. ATQ% prioritaire avec ses nombreux multiplicateurs."
    },
    "synergies": ["gabrielle", "raven", "sander"],
    "modes": {"story": "A", "kronos": "S", "apep": "A", "fafnir": "S", "pvp": "A"},
    "captain": null
  },
  {
    "id": "yu-ran",
    "name": "Yu Ran",
    "image": "https://static.wikia.nocookie.net/dislyte/images/3/32/Yu_Ran_avatar.png/revision/latest",
    "divinity": "Bai Ze",
    "element": "flow",
    "role": "controller",
    "tier": "A",
    "rarity": 5,
    "description": "Contrôleur Aquatique Légendaire inspiré de Bai Ze, créature divine de la sagesse chinoise. Yu Ran inflige Sommeil à répétition, renforce ses alliés avec des buffs Apotropaic et des bonus de dégâts critiques, tout en activant des stratégies d'attaque d'assistance puissantes.",
    "relicBuild": {
      "primary": {"set4": "wind", "set2": "recurve", "label": "Vent + Incandescence"},
      "alt": {"set4": "domination", "set2": "recurve", "label": "Domination + Incandescence"},
      "mainStats": {"ring": "PV%", "helmet": "VIT", "boots": "VIT"},
      "substats": ["VIT", "Précision", "ATQ%", "PV%"],
      "notes": "Précision haute pour que Sommeil passe. VIT pour contrôler avant les ennemis. ATQ% améliore les dégâts d'assistance."
    },
    "synergies": ["gabrielle", "bi-tao", "wu-you"],
    "modes": {"story": "A", "kronos": "A", "apep": "A", "fafnir": "B", "pvp": "S"},
    "captain": null
  },
  {
    "id": "momo",
    "name": "Momo",
    "image": "https://static.wikia.nocookie.net/dislyte/images/3/39/Momo_avatar.png/revision/latest",
    "divinity": "Bakeneko",
    "element": "flow",
    "role": "dps",
    "tier": "A",
    "rarity": 4,
    "description": "DPS Aquatique Épique inspirée de Bakeneko, le chat métamorphe de la mythologie japonaise. Momo dévaste les ennemis avec des dégâts réels, applique Buff Blocker pour empêcher les buffs adverses, enchaîne des contre-attaques et accumule des stacks Rapt pour une pression PvP écrasante.",
    "relicBuild": {
      "primary": {"set4": "war", "set2": "avatara", "label": "Guerre + Avatara"},
      "alt": {"set4": "war", "set2": "recurve", "label": "Guerre + Incandescence"},
      "mainStats": {"ring": "Taux de Crit", "helmet": "ATQ%", "boots": "VIT"},
      "substats": ["Taux de Crit", "ATQ%", "Dégâts Crit", "VIT"],
      "notes": "Avatara maximise les contre-attaques. Ses dégâts réels scalent sur ATQ%. Taux de Crit ≥ 80%."
    },
    "synergies": ["gabrielle", "raven", "wu-you"],
    "modes": {"story": "A", "kronos": "B", "apep": "A", "fafnir": "B", "pvp": "S"},
    "captain": null
  },
  {
    "id": "gorath",
    "name": "Gorath",
    "image": "https://static.wikia.nocookie.net/dislyte/images/a/a4/Gorath_avatar.png/revision/latest",
    "divinity": "Roi Démon Taureau",
    "element": "umbra",
    "role": "defender",
    "tier": "B",
    "rarity": 5,
    "description": "Défenseur Ombre Légendaire inspiré du Roi Démon Taureau (Niu Mo Wang), grand démon de la mythologie chinoise. Gorath se spécialise dans la protection des autres Défenseurs, contre-attaque les ennemis, survit aux coups mortels et inflige une prévention de soin dévastatrice.",
    "relicBuild": {
      "primary": {"set4": "wind", "set2": "roche-inflexible", "label": "Vent + Roche Inflexible"},
      "alt": {"set4": "wind", "set2": "avatara", "label": "Vent + Avatara"},
      "mainStats": {"ring": "DEF%", "helmet": "PV%", "boots": "VIT"},
      "substats": ["DEF%", "PV%", "VIT", "Résistance"],
      "notes": "DEF% prioritaire pour la synergie Guard's Fury. VIT pour agir régulièrement. Utile uniquement dans les compos Defender-stacking."
    },
    "synergies": ["morris", "nathaniel", "gabrielle"],
    "modes": {"story": "B", "kronos": "B", "apep": "B", "fafnir": "B", "pvp": "A"},
    "captain": null
  },
  {
    "id": "victor",
    "name": "Victor",
    "image": "https://static.wikia.nocookie.net/dislyte/images/a/a1/Victor_avatar.png/revision/latest",
    "divinity": "Aton",
    "element": "shimmer",
    "role": "dps",
    "tier": "B",
    "rarity": 5,
    "description": "DPS Scintillant Épique inspiré d'Aton, disque solaire de la mythologie égyptienne. Victor alterne entre Death's Order et Life's Order, se ressuscite lui-même, inflige Sear inévitable et augmente son ATQ à chaque résurrection. Kit intéressant mais limité en PvP compétitif.",
    "relicBuild": {
      "primary": {"set4": "war", "set2": "recurve", "label": "Guerre + Incandescence"},
      "alt": {"set4": "en-bas", "set2": "recurve", "label": "Vol de Vie + Incandescence"},
      "mainStats": {"ring": "Taux de Crit", "helmet": "ATQ%", "boots": "VIT"},
      "substats": ["ATQ%", "Taux de Crit", "Dégâts Crit", "PV%", "VIT"],
      "notes": "PV% utile pour sa mécanique de résurrection. En-bas sécurise sa survie entre les résurrections. Standard ATQ/Crit sinon."
    },
    "synergies": ["gabrielle", "badrun", "sally"],
    "modes": {"story": "B", "kronos": "B", "apep": "B", "fafnir": "B", "pvp": "B"},
    "captain": null
  },
  {
    "id": "tetsuya",
    "name": "Tetsuya",
    "image": "https://static.wikia.nocookie.net/dislyte/images/d/d6/Tetsuya_avatar.png/revision/latest",
    "divinity": "Akuru",
    "element": "inferno",
    "role": "dps",
    "tier": "B",
    "rarity": 5,
    "description": "DPS Brasier Épique inspiré d'Akuru, divinité japonaise associée aux ancêtres. Tetsuya traque les ennemis prioritaires avec Umbrage, ignore la DEF adverse, gagne de la PA rapidement et inflige des dégâts d'assassinat en ciblage unique. Dépasse en niche mais limité en polyvalence.",
    "relicBuild": {
      "primary": {"set4": "foudre", "set2": "recurve", "label": "Foudre + Incandescence"},
      "alt": {"set4": "war", "set2": "recurve", "label": "Guerre + Incandescence"},
      "mainStats": {"ring": "Taux de Crit", "helmet": "ATQ%", "boots": "VIT"},
      "substats": ["ATQ%", "Taux de Crit", "Dégâts Crit", "VIT"],
      "notes": "Similaire à Sieg mais moins performant. Foudre compensé pour les boss. VIT haute pour l'assassinat prioritaire."
    },
    "synergies": ["gabrielle", "sander", "wu-you"],
    "modes": {"story": "B", "kronos": "B", "apep": "B", "fafnir": "B", "pvp": "B"},
    "captain": null
  },
  {
    "id": "amir",
    "name": "Amir",
    "image": "https://static.wikia.nocookie.net/dislyte/images/1/17/Amir_avatar.png/revision/latest",
    "divinity": "Enkidou",
    "element": "wind",
    "role": "dps",
    "tier": "B",
    "rarity": 4,
    "description": "DPS Vent Épique inspiré d'Enkidou, compagnon du héros Gilgamesh dans la mythologie sumérienne. Amir scale via ses PV, détruit les Boucliers adverses, accumule des stacks Zest, se soigne constamment et déclenche des attaques de poursuite puissantes.",
    "relicBuild": {
      "primary": {"set4": "en-bas", "set2": "sylvestre", "label": "Vol de Vie + Sylvestre"},
      "alt": {"set4": "war", "set2": "sylvestre", "label": "Guerre + Sylvestre"},
      "mainStats": {"ring": "PV%", "helmet": "PV%", "boots": "VIT"},
      "substats": ["PV%", "ATQ%", "Taux de Crit", "VIT"],
      "notes": "Ses dégâts scalent sur les PV donc PV% est la principale stat. Vol de Vie amplifie son self-sustain."
    },
    "synergies": ["gabrielle", "sally", "fatimah"],
    "modes": {"story": "B", "kronos": "B", "apep": "B", "fafnir": "B", "pvp": "B"},
    "captain": null
  },
  {
    "id": "yu-xu",
    "name": "Yu Xu",
    "image": "https://static.wikia.nocookie.net/dislyte/images/3/34/Yu_Xu_avatar.png/revision/latest",
    "divinity": "Jingwei",
    "element": "wind",
    "role": "defender",
    "tier": "B",
    "rarity": 4,
    "description": "Défenseur Vent Épique inspiré de Jingwei, oiseau mythique chinois qui remplit la mer de cailloux. Yu Xu vole les buffs ennemis avec Usurp, provoque les adversaires avec Taunt, génère des boucliers massifs basés sur sa DEF et scale ses dégâts à travers plusieurs buffs accumulés.",
    "relicBuild": {
      "primary": {"set4": "wind", "set2": "roche-inflexible", "label": "Vent + Roche Inflexible"},
      "alt": {"set4": "wind", "set2": "sylvestre", "label": "Vent + Sylvestre"},
      "mainStats": {"ring": "DEF%", "helmet": "PV%", "boots": "VIT"},
      "substats": ["DEF%", "PV%", "VIT", "Résistance"],
      "notes": "DEF% prioritaire pour maximiser les boucliers. Résistance pour éviter d'être contrôlé et de perdre ses buffs volés."
    },
    "synergies": ["gabrielle", "morris", "nathaniel"],
    "modes": {"story": "B", "kronos": "B", "apep": "B", "fafnir": "B", "pvp": "B"},
    "captain": null
  },
  {
    "id": "daniel",
    "name": "Daniel",
    "image": "https://static.wikia.nocookie.net/dislyte/images/8/86/Daniel_avatar.png/revision/latest",
    "divinity": "Chiron",
    "element": "inferno",
    "role": "controller",
    "tier": "B",
    "rarity": 4,
    "description": "Contrôleur Brasier Épique inspiré de Chiron, centaure sage et tuteur des héros grecs. Daniel est un DPS à dégâts constants avec un kit de contrôle solide. Bon choix polyvalent en PvE pour les joueurs sans meilleures options de contrôle.",
    "relicBuild": {
      "primary": {"set4": "wind", "set2": "recurve", "label": "Vent + Incandescence"},
      "alt": {"set4": "war", "set2": "recurve", "label": "Guerre + Incandescence"},
      "mainStats": {"ring": "Taux de Crit", "helmet": "ATQ%", "boots": "VIT"},
      "substats": ["VIT", "Précision", "ATQ%", "Taux de Crit"],
      "notes": "Précision pour ses effets de contrôle. VIT pour agir fréquemment. Build équilibré contrôle/dégâts."
    },
    "synergies": ["gabrielle", "sander", "long-mian"],
    "modes": {"story": "B", "kronos": "B", "apep": "B", "fafnir": "B", "pvp": "B"},
    "captain": null
  }
]
$$) AS t(e);
