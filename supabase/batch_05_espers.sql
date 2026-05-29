-- ═══════════════════════════════════════════════════════════════
-- BATCH 05 — 10 nouveaux espers (29 Mai 2026)
-- Alexa, Anesidora, Djoser, Arcana, Bardon,
-- Brynn, David, Falken, Hall, Freddy
-- Sources images : playdislyte.com (toutes confirmées ✅)
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
    "id": "alexa",
    "name": "Alexa",
    "image": "https://playdislyte.com/wp-content/uploads/2022/07/Alexa-Aphrodite.png",
    "divinity": "Aphrodite",
    "element": "inferno",
    "role": "support",
    "tier": "C",
    "rarity": 4,
    "description": "Supporteuse Épique inspirée d'Aphrodite, déesse grecque de l'amour et de la beauté. Star glamoureuse de Whirlpool City, Alexa protège ses alliés et punit les ennemis. Son ultime Dance of the Nightingale confère Kiss of the Nightingale à un allié — un buff unique qui réfléchit 75% des dégâts subis et immunise aux debuffs. Son S2 Phantasia redistribue les PV entre alliés et dispel leurs debuffs. Sa captain booste les PV de toute l'équipe. Utile en Tour du Miracle, limitée sur les boss endgame.",
    "relicBuild": {
      "primary": {"set4": "wind", "set2": "sylvestre", "label": "Vent + Sylvestre"},
      "alt": {"set4": "ecume", "set2": "egide", "label": "Écume + Égide"},
      "mainStats": {"ring": "PV%", "helmet": "PV% ou DEF%", "boots": "VIT"},
      "substats": ["VIT", "PV%", "DEF%", "Résistance%"],
      "notes": "VIT pour agir avant les ennemis et placer l'Immunité en premier. L'Écume réduit le CD de son ultime. Sa captain +24% PV améliore la survie de toute l'équipe — intéressante pour les modes de progression."
    },
    "synergies": ["gabrielle", "sally", "clara"],
    "modes": {"story": "B", "kronos": "C", "apep": "C", "fafnir": "B", "pvp": "C"},
    "captain": "Augmente les PV de tous les alliés de 24%."
  },
  {
    "id": "anesidora",
    "name": "Anesidora",
    "image": "https://playdislyte.com/wp-content/uploads/2022/01/Anesidora-Pandora.png",
    "divinity": "Pandora",
    "element": "shimmer",
    "role": "dps",
    "tier": "A",
    "rarity": 4,
    "description": "DPS Épique inspirée de Pandore, figure de la mythologie grecque dont la jarre libéra tous les maux du monde. Calme et rationnelle, Anesidora inflige des dégâts basés sur les PV max de ses cibles via son ultime Pandora's Box. Elle excelle dans la Tour du Miracle où elle atteint le rang SS et dans le Cube Miracle. Ses debuffs persistent et font d'elle une pièce maîtresse des équipes de progression PvE. Sa captain booste les PV de toute l'équipe en PvP.",
    "relicBuild": {
      "primary": {"set4": "wind", "set2": "lumiere", "label": "Vent + Lumière"},
      "alt": {"set4": "wind", "set2": "sylvestre", "label": "Vent + Sylvestre"},
      "mainStats": {"ring": "PV%", "helmet": "PV% ou DEF%", "boots": "VIT"},
      "substats": ["VIT", "PV%", "Précision%", "DEF%"],
      "notes": "Ses dégâts scalent sur les PV max ennemis — maximiser la VIT pour multiplier les tours et accumuler les dégâts. La Lumière lui confère l'Immunité au début du combat. Précision utile pour garantir ses debuffs en PvP."
    },
    "synergies": ["ren-si", "jeanne", "sally", "long-mian"],
    "modes": {"story": "A", "kronos": "B", "apep": "B", "fafnir": "A", "pvp": "B"},
    "captain": "Augmente les PV de tous les alliés de 30% en Guerre des Points."
  },
  {
    "id": "djoser",
    "name": "Djoser",
    "image": "https://playdislyte.com/wp-content/uploads/2022/07/Djoser-Atum.png",
    "divinity": "Atum",
    "element": "inferno",
    "role": "defender",
    "tier": "B",
    "rarity": 4,
    "description": "Défenseur Épique inspiré d'Atoum, dieu primordial de la création de la mythologie égyptienne. Guerrier implacable qui chérit sa famille par-dessus tout, Djoser accumule des charges de Bull Rage à chaque attaque pour décupler ses dégâts. Sa mécanique combine tank offensif et sustain — il absorbe les coups tout en infligeant des dégâts croissants, se soignant grâce au Vol de Vie. Solide sur Apep grâce à sa résistance et ses dégâts soutenus.",
    "relicBuild": {
      "primary": {"set4": "en-bas", "set2": "roche", "label": "Vol de Vie + Roche Inflexible"},
      "alt": {"set4": "en-bas", "set2": "sylvestre", "label": "Vol de Vie + Sylvestre"},
      "mainStats": {"ring": "DEF%", "helmet": "DEF%", "boots": "DEF%"},
      "substats": ["DEF%", "PV%", "VIT", "Résistance%"],
      "notes": "Le Vol de Vie lui permet de s'auto-soigner en combat prolongé. Roche Inflexible booste sa DEF de base. Viser maximum de DEF% pour maximiser les stacks Bull Rage et sa résistance aux dégâts."
    },
    "synergies": ["gabrielle", "luo-yan", "ahmed"],
    "modes": {"story": "B", "kronos": "B", "apep": "A", "fafnir": "B", "pvp": "B"},
    "captain": null
  },
  {
    "id": "arcana",
    "name": "Arcana",
    "image": "https://playdislyte.com/wp-content/uploads/2022/07/Arcana-Hermes.png",
    "divinity": "Hermès",
    "element": "inferno",
    "role": "ap-controller",
    "tier": "B",
    "rarity": 4,
    "description": "Contrôleur de PA Épique inspiré d'Hermès, messager des dieux et dieu du commerce, des voyageurs et des voleurs dans la mythologie grecque. Sa spécialité est le vol de buffs : son ultime Scouring Whip vole TOUS les buffs de chaque ennemi et lui génère de la PA en fonction du nombre de buffs dérobés. Son S2 Imprisonment frappe 2 fois avec chance d'Étourdissement et vole 25% de PA à toute l'équipe ennemie. Redoutable en PvP contre les équipes buff-lourdes.",
    "relicBuild": {
      "primary": {"set4": "wind", "set2": "sinueux", "label": "Vent + Sinueux"},
      "alt": {"set4": "guerre", "set2": "recurve", "label": "Guerre + Incandescence"},
      "mainStats": {"ring": "PV%", "helmet": "Précision%", "boots": "VIT"},
      "substats": ["VIT", "Précision%", "PV%", "DEF%"],
      "notes": "Précision essentielle pour garantir les étourdissements et maximiser l'efficacité du vol de buffs. VIT élevée pour agir avant les ennemis et leur voler les buffs avant qu'ils agissent. Sa captain +30% ATQ est utile en PvP offensif."
    },
    "synergies": ["raven", "jiang-jiuli", "elliot"],
    "modes": {"story": "B", "kronos": "C", "apep": "C", "fafnir": "B", "pvp": "B"},
    "captain": "Augmente l'ATQ de tous les alliés de 30% en Guerre des Points."
  },
  {
    "id": "bardon",
    "name": "Bardon",
    "image": "https://playdislyte.com/wp-content/uploads/2022/07/Bardon-Baldr.png",
    "divinity": "Baldr",
    "element": "inferno",
    "role": "defender",
    "tier": "C",
    "rarity": 3,
    "description": "Défenseur Rare inspiré de Baldr, dieu de la lumière, de la pureté et de la beauté dans la mythologie nordique. Star de cinéma affiliée à l'Union Esper, Bardon est un protecteur d'équipe qui distribue des boucliers aux alliés en difficulté grâce à son passif Honorbound — chaque fois qu'un allié est attaqué à bas PV, il reçoit un bouclier. Son ultime Rise to Honor octroie une Hausse de DEF à toute l'équipe 2 tours. Sa captain booste la DEF en Guerre des Points.",
    "relicBuild": {
      "primary": {"set4": "guerre", "set2": "roche", "label": "Guerre + Roche Inflexible"},
      "alt": {"set4": "en-bas", "set2": "sylvestre", "label": "Vol de Vie + Sylvestre"},
      "mainStats": {"ring": "DEF%", "helmet": "DEF%", "boots": "DEF%"},
      "substats": ["DEF%", "PV%", "VIT", "Résistance%"],
      "notes": "Maximiser la DEF pour renforcer ses boucliers de protection. Ses stats de base sont limitées par sa rareté 3 étoiles. À réserver aux débutants manquant de défenseurs ou pour compléter la collection."
    },
    "synergies": ["gabrielle", "luo-yan", "donar"],
    "modes": {"story": "B", "kronos": "C", "apep": "C", "fafnir": "B", "pvp": "C"},
    "captain": "Augmente la DEF de tous les alliés de 24% en Guerre des Points."
  },
  {
    "id": "brynn",
    "name": "Brynn",
    "image": "https://playdislyte.com/wp-content/uploads/2022/07/Brynn-Valkyrie.png",
    "divinity": "Valkyrie",
    "element": "wind",
    "role": "support",
    "tier": "C",
    "rarity": 3,
    "description": "Supporteuse Rare inspirée des Valkyries, guerrières célestes choisissant les morts au combat dans la mythologie nordique. Musicienne dont la voix résonne dans les cieux, Brynn alterne entre attaques offensives et soutien d'équipe. Son S2 Rock'n'Roll accorde la Hausse d'ATQ à toute l'équipe 3 tours. Son ultime Advent of the Goddess inflige des dégâts et gèle la cible. Solide dans son rôle de soutien offensif pour les débutants.",
    "relicBuild": {
      "primary": {"set4": "wind", "set2": "sylvestre", "label": "Vent + Sylvestre"},
      "alt": {"set4": "guerre", "set2": "recurve", "label": "Guerre + Incandescence"},
      "mainStats": {"ring": "PV%", "helmet": "ATQ%", "boots": "VIT"},
      "substats": ["VIT", "ATQ%", "PV%", "Taux de Crit%"],
      "notes": "Rareté 3 étoiles avec stats de base limitées. Utile en early game pour le buff ATQ d'équipe. À remplacer par Gabrielle (Njord) ou Sally (Sif) dès qu'ils sont disponibles."
    },
    "synergies": ["gabrielle", "li-ling", "lin-xiao"],
    "modes": {"story": "B", "kronos": "C", "apep": "C", "fafnir": "C", "pvp": "C"},
    "captain": null
  },
  {
    "id": "david",
    "name": "David",
    "image": "https://playdislyte.com/wp-content/uploads/2022/07/David-Jason.png",
    "divinity": "Jason",
    "element": "wind",
    "role": "dps",
    "tier": "C",
    "rarity": 3,
    "description": "DPS Rare inspiré de Jason, héros de la mythologie grecque chef des Argonautes et conquistador de la Toison d'Or. Offensif avec des capacités de taunt et de dispel, David dispel automatiquement ses propres debuffs et provoque un ennemi aléatoire grâce à son passif Moonwalk. Son ultime Curtain Call frappe multiple fois, vole jusqu'à 3 buffs ennemis et étourdit la cible tout en réduisant sa PA. Limité par sa rareté Rare dans le contenu avancé.",
    "relicBuild": {
      "primary": {"set4": "guerre", "set2": "recurve", "label": "Guerre + Incandescence"},
      "alt": {"set4": "wind", "set2": "recurve", "label": "Vent + Incandescence"},
      "mainStats": {"ring": "ATQ%", "helmet": "ATQ%", "boots": "ATQ% ou VIT"},
      "substats": ["Taux de Crit ≥80%", "Dégâts Crit%", "ATQ%", "VIT"],
      "notes": "Stats de base limitées par sa rareté 3 étoiles. Son passif de dispel personnel le rend légèrement plus résilient que d'autres 3 étoiles. À utiliser uniquement en early game ou pour la collection."
    },
    "synergies": ["gabrielle", "sander", "tang-yun"],
    "modes": {"story": "B", "kronos": "C", "apep": "C", "fafnir": "C", "pvp": "C"},
    "captain": null
  },
  {
    "id": "falken",
    "name": "Falken",
    "image": "https://playdislyte.com/wp-content/uploads/2022/01/Falken-Horus.png",
    "divinity": "Horus",
    "element": "inferno",
    "role": "defender",
    "tier": "B",
    "rarity": 4,
    "description": "Défenseur Épique inspiré d'Horus, dieu faucon du ciel et de la royauté de la mythologie égyptienne. Sa mécanique unique Eye of Horus marque les ennemis qui attaquent : les alliés ont alors 60% de chance de contre-attaquer automatiquement lorsqu'un ennemi marqué frappe. Son ultime Falconer frappe toute l'équipe ennemie avec 100% de chance d'infliquer Réduction d'ATQ 2 tours, dont les dégâts sont amplifiés par les PV perdus. Sa captain booste la VIT de toute l'équipe.",
    "relicBuild": {
      "primary": {"set4": "en-bas", "set2": "recurve", "label": "Vol de Vie + Incandescence"},
      "alt": {"set4": "guerre", "set2": "avatara", "label": "Guerre + Avatara"},
      "mainStats": {"ring": "PV%", "helmet": "PV%", "boots": "PV% ou VIT"},
      "substats": ["PV%", "VIT", "DEF%", "Taux de Crit%"],
      "notes": "Le Vol de Vie lui permet de se soigner en frappant. Avatara ajoute une contre-attaque supplémentaire qui synergise avec ses marques Eye of Horus. Plus les alliés frappent des cibles marquées, plus les dégâts d'équipe explosent."
    },
    "synergies": ["gabrielle", "berenice", "tang-yun"],
    "modes": {"story": "B", "kronos": "C", "apep": "C", "fafnir": "B", "pvp": "C"},
    "captain": "Augmente la VIT de tous les alliés de 20%."
  },
  {
    "id": "hall",
    "name": "Hall",
    "image": "https://playdislyte.com/wp-content/uploads/2022/07/Hall-Hodur.png",
    "divinity": "Höðr",
    "element": "wind",
    "role": "dps",
    "tier": "B",
    "rarity": 3,
    "description": "DPS Rare inspiré de Höðr (Hodur), dieu aveugle de la nuit et frère de Baldr dans la mythologie nordique. Étrangement lié à sa divinité dans son ressentiment pour un frère aîné, Hall est un spécialiste des attaques de poursuite. Son passif unique lui permet de déclencher une frappe supplémentaire à 40% d'ATQ chaque fois qu'un allié attaque — une mécanique qui accumule des dégâts constants au fil du combat. Efficace en Fafnir grâce au volume de frappes élevé.",
    "relicBuild": {
      "primary": {"set4": "guerre", "set2": "avatara", "label": "Guerre + Avatara"},
      "alt": {"set4": "foudre", "set2": "recurve", "label": "Foudre + Incandescence"},
      "mainStats": {"ring": "Dégâts Crit%", "helmet": "ATQ%", "boots": "ATQ%"},
      "substats": ["Taux de Crit ≥80%", "Dégâts Crit%", "ATQ%", "VIT"],
      "notes": "Guerre + Avatara lui permet de se battre et contre-attaquer simultanément pour maximiser ses attaques de poursuite. Ses stats de base sont limitées par sa rareté 3 étoiles, mais son passif de suivi en fait un choix solide pour Fafnir."
    },
    "synergies": ["tang-yun", "berenice", "lu-yi"],
    "modes": {"story": "B", "kronos": "C", "apep": "C", "fafnir": "A", "pvp": "C"},
    "captain": null
  },
  {
    "id": "freddy",
    "name": "Freddy",
    "image": "https://playdislyte.com/wp-content/uploads/2022/01/Freddy-Fenrir.png",
    "divinity": "Fenrir",
    "element": "inferno",
    "role": "dps",
    "tier": "A",
    "rarity": 3,
    "description": "DPS Rare d'exception inspiré de Fenrir, le loup géant et redoutable fils de Loki dans la mythologie nordique. Malgré sa rareté 3 étoiles, Freddy est A-tier en PvP, Kronos et Apep. Sa mécanique signature décuple ses dégâts à mesure que ses PV baissent : Claw of Greed frappe deux fois avec un boost de Taux de Crit quand il est sous 50% PV, et Thrill of the Hunt inflige des dégâts amplifiés de 5% par tranche de 10% de PV perdus, tout en dissipant 2 buffs ennemis. Plus il est blessé, plus il est dangereux.",
    "relicBuild": {
      "primary": {"set4": "en-bas", "set2": "recurve", "label": "Vol de Vie + Incandescence"},
      "alt": {"set4": "guerre", "set2": "recurve", "label": "Guerre + Incandescence"},
      "mainStats": {"ring": "Dégâts Crit%", "helmet": "ATQ%", "boots": "ATQ% ou VIT"},
      "substats": ["Taux de Crit ≥80%", "Dégâts Crit%", "ATQ%", "VIT"],
      "notes": "Le Vol de Vie maintient ses PV à un niveau idéal — ni trop hauts (perd le bonus de dégâts) ni trop bas (risque de mourir). La stratégie optimale est de le laisser descendre sous 50% PV pour déclencher le double coup. Exceptionnellement puissant pour un 3 étoiles."
    },
    "synergies": ["tiye", "dhalia", "tang-yun"],
    "modes": {"story": "A", "kronos": "A", "apep": "A", "fafnir": "B", "pvp": "A"},
    "captain": null
  }
]
$$) AS t(e)
ON CONFLICT (id) DO NOTHING;
