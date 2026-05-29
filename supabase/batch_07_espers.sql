-- ═══════════════════════════════════════════════════════════════
-- BATCH 07 — 10 nouveaux espers Légendaires (29 Mai 2026)
-- Leora, Ginny, Mateo, Yuuhime, Toland, Valeria, Anna, Archibald, Mavis, Jin Qiu
-- Images confirmées via Fandom CDN (HTTP 200) ✅
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
    "id": "leora",
    "name": "Leora",
    "image": "https://static.wikia.nocookie.net/dislyte/images/b/b9/Leora_avatar.png/revision/latest",
    "divinity": "Athéna",
    "element": "flow",
    "role": "dps",
    "tier": "SS",
    "rarity": 5,
    "description": "DPS Aquatique Légendaire inspirée d'Athéna, déesse grecque de la sagesse et de la guerre stratégique. Leora est définie comme la DPS meta par excellence — elle peut tout faire : infliger de lourds dégâts, dissiper les buffs ennemis, protéger ses alliés et appliquer des debuffs. Ses modes Warfront alternent son style de combat, et ses attaques Skyrend ignorent une partie significative de la DEF ennemie. Redoutable en vague PvE (Kronos) et véritable cauchemar à affronter en Guerre des Points.",
    "relicBuild": {
      "primary": {"set4": "foudre", "set2": "recurve", "label": "Foudre + Incandescence"},
      "alt": {"set4": "foudre", "set2": "sinueux", "label": "Foudre + Sinueux"},
      "mainStats": {"ring": "Taux de Crit", "helmet": "ATQ%", "boots": "VIT"},
      "substats": ["Taux de Crit", "ATQ%", "Précision", "Dégâts Crit", "VIT"],
      "notes": "Foudre maximise les dégâts critiques (+50% C.DMG, +30% vs boss). Taux de Crit ≥ 80% avant d'investir en C.DMG. La Précision permet de faire passer ses debuffs. Viser ≥ 180 VIT pour un bon ratio d'actions."
    },
    "synergies": ["gabrielle", "tiye", "sander"],
    "modes": {"story": "S", "kronos": "S", "apep": "A", "fafnir": "B", "pvp": "S"},
    "captain": null
  },
  {
    "id": "ginny",
    "name": "Ginny",
    "image": "https://static.wikia.nocookie.net/dislyte/images/1/15/Ginny_avatar.png/revision/latest",
    "divinity": "Hestia",
    "element": "inferno",
    "role": "dps",
    "tier": "S",
    "rarity": 5,
    "description": "DPS Brasier Légendaire inspirée d'Hestia, déesse grecque du foyer et de l'hospitalité. Ginny est un combattant défensif atypique : son buff Intense Heat amplifie ses dégâts en fonction de l'écart d'ATQ avec l'ennemi, et elle inflige Taunt pour forcer les attaques ennemies sur elle-même. Son set Avatara lui permet de contre-attaquer fréquemment. Excellente en contenu où la survie est clé.",
    "relicBuild": {
      "primary": {"set4": "war", "set2": "avatara", "label": "Guerre + Avatara"},
      "alt": {"set4": "war", "set2": "recurve", "label": "Guerre + Incandescence"},
      "mainStats": {"ring": "ATQ%", "helmet": "ATQ%", "boots": "VIT"},
      "substats": ["ATQ%", "PV%", "Taux de Crit", "VIT"],
      "notes": "Guerre maximise l'ATQ qui alimente son buff Intense Heat. Avatara déclenche ses contre-attaques passives. HP% en sustats pour encaisser les attaques qu'elle attire avec Taunt. VIT pour fréquence d'actions."
    },
    "synergies": ["gabrielle", "sander", "clara"],
    "modes": {"story": "A", "kronos": "A", "apep": "B", "fafnir": "B", "pvp": "S"},
    "captain": null
  },
  {
    "id": "mateo",
    "name": "Mateo",
    "image": "https://static.wikia.nocookie.net/dislyte/images/7/74/Mateo_avatar.png/revision/latest",
    "divinity": "Prométhée",
    "element": "wind",
    "role": "dps",
    "tier": "S",
    "rarity": 5,
    "description": "DPS Vent Légendaire inspiré de Prométhée, titan grec qui offrit le feu aux mortels. Mateo excelle en PvE grâce à son buff Eternal Flame qui augmente ses dégâts tout en réduisant les dégâts subis. Son debuff Spark génère de la PA à chaque fois qu'un ennemi est touché, accélérant son équipe. Polyvalent, il peut build sur la survie (Nether) ou le pur DPS (War+Thunder).",
    "relicBuild": {
      "primary": {"set4": "en-bas", "set2": "war", "label": "Vol de Vie + Guerre"},
      "alt": {"set4": "foudre", "set2": "recurve", "label": "Foudre + Incandescence"},
      "mainStats": {"ring": "Taux de Crit", "helmet": "ATQ%", "boots": "VIT"},
      "substats": ["Taux de Crit", "ATQ%", "Précision", "Dégâts Crit", "VIT"],
      "notes": "Vol de Vie (Nether) le rend auto-suffisant en PvE — 35% des dégâts convertis en PV. Guerre en 2-pièces booste encore l'ATQ. Alt pure DPS avec Foudre pour les boss. Précision nécessaire pour faire passer Spark."
    },
    "synergies": ["gabrielle", "lin-xiao", "tiye"],
    "modes": {"story": "A", "kronos": "A", "apep": "B", "fafnir": "B", "pvp": "B"},
    "captain": "Augmente la VIT de tous les alliés de 35%."
  },
  {
    "id": "yuuhime",
    "name": "Yuuhime",
    "image": "https://static.wikia.nocookie.net/dislyte/images/8/89/Yuuhime_avatar.png/revision/latest",
    "divinity": "Izanami",
    "element": "inferno",
    "role": "dps",
    "tier": "SS",
    "rarity": 5,
    "description": "Meilleure DPS Zone Brasier du jeu, inspirée d'Izanami, déesse japonaise de la création et de la mort. Yuuhime accumule des stacks de Hell's Hand pour amplifier massivement les dégâts de ses attaques de base (+45% ATQ par stack). Sa troisième capacité inflige Diseased sur tous les ennemis tout en générant des stacks supplémentaires selon le nombre de debuffs actifs — exceptionnellement efficace contre Apep.",
    "relicBuild": {
      "primary": {"set4": "foudre", "set2": "recurve", "label": "Foudre + Incandescence"},
      "alt": {"set4": "foudre", "set2": "sinueux", "label": "Foudre + Sinueux"},
      "mainStats": {"ring": "Taux de Crit", "helmet": "ATQ%", "boots": "VIT"},
      "substats": ["Taux de Crit", "ATQ%", "Dégâts Crit", "VIT"],
      "notes": "Foudre est le set optimal — ses stacks de Hell's Hand maximisent l'impact du C.DMG. Taux de Crit ≥ 80% puis investir en C.DMG. Sinueux en alt si les debuffs ne passent pas. Viser ≥ 170 VIT."
    },
    "synergies": ["gabrielle", "ahmed", "lin-xiao"],
    "modes": {"story": "A", "kronos": "A", "apep": "SS", "fafnir": "B", "pvp": "A"},
    "captain": null
  },
  {
    "id": "toland",
    "name": "Toland",
    "image": "https://static.wikia.nocookie.net/dislyte/images/d/d0/Toland_avatar.png/revision/latest",
    "divinity": "Tezcatlipoca",
    "element": "shimmer",
    "role": "controller",
    "tier": "A",
    "rarity": 5,
    "description": "Contrôleur Scintillant Légendaire inspiré de Tezcatlipoca, dieu aztèque de la guerre et du conflit. Toland est l'un des espers les plus rapides du jeu grâce à son passif Trackback : il gagne 3 stacks au départ + 1 par tour, chaque stack ajoutant +10 VIT (max 5 stacks avec pleine Résonance). Avec 50 VIT bonus, il peut atteindre des vitesses de 250+ pour dominer l'ordre des tours.",
    "relicBuild": {
      "primary": {"set4": "wind", "set2": "sinueux", "label": "Vent + Sinueux"},
      "alt": {"set4": "wind", "set2": "avatara", "label": "Vent + Avatara"},
      "mainStats": {"ring": "PV%", "helmet": "VIT", "boots": "VIT"},
      "substats": ["VIT", "PV%", "Précision", "DEF%"],
      "notes": "Vent amplifie encore sa vitesse déjà exceptionnelle. Sinueux garantit que ses contrôles atterrissent. VIT maximum sur helmet et boots pour exploiter son passif. Précision pour fiabiliser les effets de contrôle."
    },
    "synergies": ["unas", "raven", "gabrielle"],
    "modes": {"story": "A", "kronos": "B", "apep": "B", "fafnir": "B", "pvp": "S"},
    "captain": "Augmente la VIT de tous les alliés de 25%."
  },
  {
    "id": "valeria",
    "name": "Valeria",
    "image": "https://static.wikia.nocookie.net/dislyte/images/b/ba/Valeria_avatar.png/revision/latest",
    "divinity": "Quetzalcoatl",
    "element": "flow",
    "role": "dps",
    "tier": "S",
    "rarity": 5,
    "description": "DPS Aquatique Légendaire inspirée de Quetzalcoatl, dieu aztèque de la sagesse et du vent. Valeria est un damage dealer basé sur la vitesse : ses capacités s'amplifient en fonction de sa VIT, et elle peut réduire la PA ennemie tout en montant la sienne. Plus elle est rapide, plus elle est dangereuse — elle excelle particulièrement en Guerre des Points où les équipes rapides dominent.",
    "relicBuild": {
      "primary": {"set4": "war", "set2": "wind", "label": "Guerre + Vent"},
      "alt": {"set4": "foudre", "set2": "recurve", "label": "Foudre + Incandescence"},
      "mainStats": {"ring": "Taux de Crit ou ATQ%", "helmet": "ATQ% ou Dégâts Crit", "boots": "VIT"},
      "substats": ["Taux de Crit", "ATQ%", "Dégâts Crit", "VIT"],
      "notes": "Guerre + Vent exploite sa double scaling ATQ et VIT. Alt Foudre pour les builds orientés boss. VIT sur boots obligatoire pour amplifier ses dégâts. Taux de Crit ≥ 80% puis Dégâts Crit. Viser ≥ 200 VIT total."
    },
    "synergies": ["sander", "gabrielle", "unas"],
    "modes": {"story": "A", "kronos": "A", "apep": "B", "fafnir": "B", "pvp": "S"},
    "captain": "Augmente l'ATQ de tous les alliés de 30%."
  },
  {
    "id": "anna",
    "name": "Anna",
    "image": "https://static.wikia.nocookie.net/dislyte/images/c/c5/Anna_avatar.png/revision/latest",
    "divinity": "Perséphone",
    "element": "shimmer",
    "role": "dps",
    "tier": "S",
    "rarity": 5,
    "description": "DPS Scintillante Légendaire inspirée de Perséphone, reine des Enfers et déesse du printemps. Anna possède des mécaniques défensives uniques : Rainbow Shield bloque les attaques ennemies avec une contre-attaque, et Rainbow Seed la ressuscite à 50% de ses PV si elle tombe. Ses dégâts s'amplifient avec la VIT et ignorent partiellement la DEF ennemie. Elle vole également les buffs adverses et booste les Dégâts Crit de ses alliés.",
    "relicBuild": {
      "primary": {"set4": "wind", "set2": "recurve", "label": "Vent + Incandescence"},
      "alt": {"set4": "wind", "set2": "avatara", "label": "Vent + Avatara"},
      "mainStats": {"ring": "Taux de Crit", "helmet": "ATQ%", "boots": "VIT"},
      "substats": ["Taux de Crit", "ATQ%", "Dégâts Crit", "VIT"],
      "notes": "Vent est central — plus elle est rapide, plus ses dégâts sont élevés (scaling VIT). Incandescence en 2-pièces pour atteindre le seuil de 80% Taux de Crit. Avatara en alt pour maximiser ses contre-attaques. Viser ≥ 200 VIT."
    },
    "synergies": ["toland", "raven", "gabrielle"],
    "modes": {"story": "A", "kronos": "B", "apep": "B", "fafnir": "B", "pvp": "S"},
    "captain": "Augmente l'ATQ de tous les alliés de 40% en Guerre des Points et en Éliminatoire."
  },
  {
    "id": "archibald",
    "name": "Archibald",
    "image": "https://static.wikia.nocookie.net/dislyte/images/d/d6/Archibald_avatar.png/revision/latest",
    "divinity": "Mictlantecuhtli",
    "element": "wind",
    "role": "dps",
    "tier": "A",
    "rarity": 5,
    "description": "DPS Vent Légendaire inspiré de Mictlantecuhtli, dieu aztèque de la mort et des enfers. Archibald excelle dans le contenu multi-rounds comme la Tour du Miracle et le Cube grâce à sa capacité à infliger des dégâts basés sur les PV max ennemis. L'ATQ est sa priorité absolue car ses 2e et 3e capacités scalent dessus pour amplifier ces dégâts % PV. Idéal contre les boss à PV élevés.",
    "relicBuild": {
      "primary": {"set4": "war", "set2": "recurve", "label": "Guerre + Incandescence"},
      "alt": {"set4": "foudre", "set2": "recurve", "label": "Foudre + Incandescence"},
      "mainStats": {"ring": "ATQ%", "helmet": "ATQ% ou Dégâts Crit", "boots": "VIT"},
      "substats": ["ATQ%", "Taux de Crit", "Dégâts Crit", "VIT"],
      "notes": "ATQ est la priorité absolue — ses dégâts basés sur les PV max ennemis scalent massivement avec l'ATQ. Guerre maximise cette stat. Taux de Crit ≥ 80% secondaire. Excelle dans les tours PvE (contenu multi-rounds)."
    },
    "synergies": ["gabrielle", "sander", "sally"],
    "modes": {"story": "A", "kronos": "B", "apep": "C", "fafnir": "B", "pvp": "B"},
    "captain": "Augmente le Taux de Critique de tous les alliés de 25%."
  },
  {
    "id": "mavis",
    "name": "Mavis",
    "image": "https://static.wikia.nocookie.net/dislyte/images/5/57/Mavis_avatar.png/revision/latest",
    "divinity": "Mictecacihuatl",
    "element": "inferno",
    "role": "support",
    "tier": "A",
    "rarity": 5,
    "description": "Supporteuse Brasier Légendaire inspirée de Mictecacihuatl, déesse aztèque des morts. Mavis maintient ses alliés en vie grâce à ses buffs uniques Graveless et Soul qui réduisent les dégâts subis et procurent des effets de survie. Sa captain +50% Résistance en PvP en fait une pièce défensive précieuse dans les équipes Point War. Ses cooldowns peuvent être réduits par le set Écume pour une fréquence d'actions accrue.",
    "relicBuild": {
      "primary": {"set4": "ecume", "set2": "sylvestre", "label": "Écume + Sylvestre"},
      "alt": {"set4": "ecume", "set2": "egide", "label": "Écume + Égide"},
      "mainStats": {"ring": "PV%", "helmet": "PV%", "boots": "VIT ou PV%"},
      "substats": ["VIT", "PV%", "DEF%", "Précision"],
      "notes": "Écume réduit les cooldowns de ses capacités de support (35% de chance/tour). Sylvestre augmente ses PV pour la survie. Précision pour que ses debuffs atterrissent. PV% partout pour maximiser ses buffs basés sur les PV."
    },
    "synergies": ["raven", "abigail", "gabrielle"],
    "modes": {"story": "B", "kronos": "B", "apep": "B", "fafnir": "B", "pvp": "S"},
    "captain": "Augmente la Résistance de tous les alliés de 50% en Guerre des Points et en Éliminatoire."
  },
  {
    "id": "jin-qiu",
    "name": "Jin Qiu",
    "image": "https://static.wikia.nocookie.net/dislyte/images/8/85/Jin_Qiu_avatar.png/revision/latest",
    "divinity": "Ru Shou",
    "element": "wind",
    "role": "dps",
    "tier": "S",
    "rarity": 5,
    "description": "DPS Vent Légendaire inspiré de Ru Shou, dieu chinois de l'Ouest et de l'automne. Jin Qiu inflige des Dégâts Vrais (True Damage) qui ignorent la DEF ennemie. Son attaque de base étend tous les debuffs actifs de 1 tour, son S2 s'auto-buff en sacrifiant des PV pour un tour bonus, et son ultime applique Sear et Saignement sur tous les ennemis. Puissant en PvP pour sa capacité à étendre les debuffs indéfiniment.",
    "relicBuild": {
      "primary": {"set4": "foudre", "set2": "war", "label": "Foudre + Guerre"},
      "alt": {"set4": "war", "set2": "recurve", "label": "Guerre + Incandescence"},
      "mainStats": {"ring": "Taux de Crit", "helmet": "ATQ%", "boots": "VIT"},
      "substats": ["Précision", "Taux de Crit", "ATQ%", "Dégâts Crit", "VIT"],
      "notes": "Foudre maximise les Dégâts Vrais amplifiés par ses C.DMG. Précision en première priorité de substat pour que Sear et Saignement atterrissent. ATQ% pour amplifier ses dégâts. Ses extensions de debuffs rendent la Précision critique."
    },
    "synergies": ["gabrielle", "lin-xiao", "ahmed"],
    "modes": {"story": "A", "kronos": "B", "apep": "B", "fafnir": "B", "pvp": "S"},
    "captain": "Augmente l'ATQ de tous les alliés de 40% en Miracle Rituel, Sonique, Terres Désolées, Chasse Sentinelle et Falsetto Fantasy."
  }
]
$$) AS t(e);
