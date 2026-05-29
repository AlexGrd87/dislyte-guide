-- ═══════════════════════════════════════════════════════════════
-- BATCH 01 — 10 nouveaux espers (29 Mai 2026)
-- Meredith, Cecilia, Lian, Tang Xuan, Ethan, Cang Ji,
-- Farrah, Feng Nuxi, Yamato, Elaine
-- Sources : playdislyte.com, onechilledgamer.com, driffle.com
-- ═══════════════════════════════════════════════════════════════
-- Déjà exécuté sur Supabase le 29 Mai 2026 (56 espers en DB)
-- Ce fichier sert de documentation / re-seed si besoin

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
    "id": "meredith",
    "name": "Meredith",
    "image": "https://playdislyte.com/wp-content/uploads/2022/05/Meredith_avatar.png",
    "divinity": "Scylla",
    "element": "wind",
    "role": "healer",
    "tier": "SS",
    "rarity": 4,
    "description": "Soigneuse Épique inspirée de Scylla. Réduit les PV max ennemis, soigne toute l'équipe, accorde VIT Up et des boucliers issus des soins excédentaires. Peut aussi dispel des buffs ennemis. L'une des meilleures soigneuses du jeu, très utile en Fafnir.",
    "relicBuild": {
      "primary": {"set4":"wind","set2":"lumiere","label":"Vent + Lumière"},
      "alt": {"set4":"wind","set2":"egide","label":"Vent + Égide"},
      "mainStats": {"ring":"PV%","helmet":"PV%","boots":"VIT"},
      "substats": ["VIT","PV%","DEF%","Résistance%"],
      "notes": "Healer scale sur les PV : prioriser PV% partout. Le set Vent lui permet d'agir avant les ennemis et de soigner plus vite."
    },
    "synergies": ["gabrielle","sally","sienna"],
    "modes": {"story":"S","kronos":"B","apep":"B","fafnir":"S","pvp":"A"},
    "captain": "Augmente la VIT de tous les alliés de 25% en Miracle Rituel, Miracle Sonique, Terres Désolées et Chasse Sentinelle."
  },
  {
    "id": "cecilia",
    "name": "Cecilia",
    "image": "https://playdislyte.com/wp-content/uploads/2022/02/Cecilia-Isis.png",
    "divinity": "Isis",
    "element": "shimmer",
    "role": "healer",
    "tier": "A",
    "rarity": 5,
    "description": "Soigneuse Légendaire inspirée d'Isis. Peut ressusciter des alliés tombés au combat, dispel tous les debuffs de l'équipe, accorder l'Immunité à tout le groupe et distribuer des boucliers. CD longs — pairer avec des réducteurs de CD pour optimiser.",
    "relicBuild": {
      "primary": {"set4":"wind","set2":"egide","label":"Vent + Égide"},
      "alt": {"set4":"panacee","set2":"lumiere","label":"Panacée + Lumière"},
      "mainStats": {"ring":"PV%","helmet":"PV% ou DEF%","boots":"VIT"},
      "substats": ["VIT","PV%","DEF%","Résistance%"],
      "notes": "Ses CDs très longs nécessitent soit le set Écume (réduction CD), soit des alliés qui réduisent les CDs."
    },
    "synergies": [],
    "modes": {"story":"B","kronos":"C","apep":"A","fafnir":"B","pvp":"A"},
    "captain": "Augmente les PV de tous les alliés de 40% en Point War."
  },
  {
    "id": "lian",
    "name": "Lian",
    "image": null,
    "divinity": "Jiao Tu",
    "element": "flow",
    "role": "healer",
    "tier": "S",
    "rarity": 5,
    "description": "Soigneuse Légendaire inspirée de Jiao Tu, l'un des neuf fils du Roi Dragon. Manipule les PA, accorde DEF Up et boucliers, soigne l'allié avec le moins de PV et peut ressusciter des alliés. Son buff Dream Bubble augmente le taux d'esquive ennemi. Très efficace contre Kronos.",
    "relicBuild": {
      "primary": {"set4":"wind","set2":"sylvestre","label":"Vent + Sylvestre"},
      "alt": {"set4":"panacee","set2":"egide","label":"Panacée + Égide"},
      "mainStats": {"ring":"PV%","helmet":"PV%","boots":"VIT"},
      "substats": ["VIT","PV%","DEF%","Précision%"],
      "notes": "Scale sur les PV max pour ses soins et boucliers. Très forte en Kronos grâce à sa réduction de PA et ses boucliers."
    },
    "synergies": [],
    "modes": {"story":"B","kronos":"S","apep":"B","fafnir":"A","pvp":"B"},
    "captain": "Augmente les PV de tous les alliés de 30%."
  },
  {
    "id": "tang-xuan",
    "name": "Tang Xuan",
    "image": "https://playdislyte.com/wp-content/uploads/2022/07/Tang-Xuan-Sun-Wukong.png",
    "divinity": "Sun Wukong",
    "element": "wind",
    "role": "dps",
    "tier": "S",
    "rarity": 5,
    "description": "DPS Légendaire inspiré de Sun Wukong. Spécialiste des debuffs variés (Étourdissement, Réduction de DEF, Brûlure...). Ses dégâts AoE sont puissants et il peut enchaîner des attaques bonus grâce à son buff unique. Solide en Story et Point War.",
    "relicBuild": {
      "primary": {"set4":"foudre","set2":"recurve","label":"Foudre + Incandescence"},
      "alt": {"set4":"war","set2":"recurve","label":"Guerre + Incandescence"},
      "mainStats": {"ring":"Dégâts Crit%","helmet":"ATQ%","boots":"ATQ%"},
      "substats": ["Taux de Crit ≥80%","Dégâts Crit%","ATQ%","VIT"],
      "notes": "Le set Foudre booste massivement les dégâts critiques. Viser 80% Taux de Crit avant d'investir en Dégâts Crit."
    },
    "synergies": ["raven","asenath","narmer"],
    "modes": {"story":"S","kronos":"C","apep":"A","fafnir":"B","pvp":"A"},
    "captain": "Augmente l'ATQ de tous les alliés de 30%."
  },
  {
    "id": "ethan",
    "name": "Ethan",
    "image": null,
    "divinity": "Pan",
    "element": "flow",
    "role": "support",
    "tier": "B",
    "rarity": 5,
    "description": "Support Légendaire inspiré de Pan, dieu grec des pâturages et de la musique. Accorde à toute l'équipe Taux de Crit Up, Dégâts Crit Up et VIT Up via son buff Magic Tune, tout en infligeant Panique et Réduction de DEF aux ennemis. Intéressant en farming PvE.",
    "relicBuild": {
      "primary": {"set4":"wind","set2":"roche","label":"Vent + Roche Inflexible"},
      "alt": {"set4":"wind","set2":"sylvestre","label":"Vent + Sylvestre"},
      "mainStats": {"ring":"DEF%","helmet":"PV%","boots":"VIT"},
      "substats": ["VIT","DEF%","PV%","Précision%"],
      "notes": "Sa survie dépend de la DEF. Prioriser la VIT pour agir en premier et buffler l'équipe avant le premier tour ennemi."
    },
    "synergies": [],
    "modes": {"story":"A","kronos":"B","apep":"B","fafnir":"A","pvp":"B"},
    "captain": "Augmente le Taux de Crit de tous les alliés de 30% en Histoire, Miracle Infini et Île Calamité."
  },
  {
    "id": "cang-ji",
    "name": "Cang Ji",
    "image": null,
    "divinity": "Cang Jie",
    "element": "inferno",
    "role": "defender",
    "tier": "A",
    "rarity": 5,
    "description": "Défenseur Légendaire inspiré de Cang Jie, inventeur légendaire des caractères chinois. Échange les PV et la jauge d'AP des ennemis avec ceux des alliés, permettant des renversements de situation spectaculaires. Scale sur la DEF pour ses dégâts. Inflige Étourdissement et Diseased.",
    "relicBuild": {
      "primary": {"set4":"wind","set2":"roche","label":"Vent + Roche Inflexible"},
      "alt": {"set4":"wind","set2":"fortification","label":"Vent + Fortification"},
      "mainStats": {"ring":"DEF%","helmet":"DEF%","boots":"VIT"},
      "substats": ["VIT","DEF%","PV%","Précision%"],
      "notes": "Ses dégâts scalent sur la DEF — maximiser DEF% tout en maintenant une bonne VIT. La Précision aide à faire atterrir ses debuffs."
    },
    "synergies": [],
    "modes": {"story":"B","kronos":"A","apep":"B","fafnir":"B","pvp":"A"},
    "captain": "Augmente la DEF de tous les alliés de 30%."
  },
  {
    "id": "farrah",
    "name": "Farrah",
    "image": null,
    "divinity": "Abzu & Tiamat",
    "element": "wind",
    "role": "controller",
    "tier": "A",
    "rarity": 5,
    "description": "Contrôleuse Légendaire inspirée d'Abzu et Tiamat, dieux primordiaux de la mythologie mésopotamienne. Première esper Légendaire à infliger Gel sur tous les ennemis. Son buff unique Synergie la rend immune aux réductions de PA et lui octroie 25% de PA à chaque coup reçu.",
    "relicBuild": {
      "primary": {"set4":"foudre","set2":"recurve","label":"Foudre + Incandescence"},
      "alt": {"set4":"wind","set2":"recurve","label":"Vent + Incandescence"},
      "mainStats": {"ring":"Dégâts Crit%","helmet":"PV%","boots":"VIT ou Précision%"},
      "substats": ["Précision%","VIT","Taux de Crit","Dégâts Crit%"],
      "notes": "Garantit un critique contre les ennemis Gelés — maximiser Taux de Crit pour en profiter. La Précision est cruciale pour faire atterrir ses debuffs."
    },
    "synergies": [],
    "modes": {"story":"B","kronos":"B","apep":"A","fafnir":"B","pvp":"S"},
    "captain": "Augmente l'ATQ de tous les alliés de 30%."
  },
  {
    "id": "feng-nuxi",
    "name": "Feng Nuxi",
    "image": "https://playdislyte.com/wp-content/uploads/2023/01/Feng_Nuxi_avatar.png",
    "divinity": "Nüwa",
    "element": "shimmer",
    "role": "controller",
    "tier": "S",
    "rarity": 5,
    "description": "Contrôleuse Légendaire inspirée de Nüwa, déesse créatrice de la mythologie chinoise. L'une des meilleures strippeuses de buffs du jeu — son ultime attaque 4 fois tous les ennemis en volant un buff à chaque hit. Manipule aussi les CDs et la jauge d'AP de toute l'équipe.",
    "relicBuild": {
      "primary": {"set4":"wind","set2":"lumiere","label":"Vent + Lumière"},
      "alt": {"set4":"wind","set2":"egide","label":"Vent + Égide"},
      "mainStats": {"ring":"PV%","helmet":"Précision%","boots":"VIT"},
      "substats": ["VIT","Précision%","PV%","Résistance%"],
      "notes": "Ses CDs longs nécessitent une VIT maximale pour les cycler rapidement. La Précision garantit que ses debuffs atterrissent. Idéale en Point War contre les équipes à gros buffs."
    },
    "synergies": ["gabrielle","raven"],
    "modes": {"story":"A","kronos":"S","apep":"A","fafnir":"A","pvp":"S"},
    "captain": "Augmente la Précision de tous les alliés de 40%."
  },
  {
    "id": "yamato",
    "name": "Yamato",
    "image": null,
    "divinity": "Izanagi",
    "element": "wind",
    "role": "support",
    "tier": "S",
    "rarity": 5,
    "description": "Support Légendaire inspiré d'Izanagi, créateur divin de la mythologie japonaise. Buffer et debuffeur polyvalent : inflige Buff Blocker et Étourdissement, accorde ATQ Up et DEF Up à toute l'équipe. Son buff unique Rashomon s'accumule et est consommé pour des dégâts vrais supplémentaires.",
    "relicBuild": {
      "primary": {"set4":"domination","set2":"recurve","label":"Domination + Incandescence"},
      "alt": {"set4":"wind","set2":"recurve","label":"Vent + Incandescence"},
      "mainStats": {"ring":"PV%","helmet":"Précision%","boots":"VIT"},
      "substats": ["VIT","Précision%","PV%","Résistance%"],
      "notes": "Son bonus capitaine en Histoire et Île Calamité est l'un des meilleurs du jeu (+35% VIT). Investir en VIT et Précision pour maximiser ses debuffs."
    },
    "synergies": [],
    "modes": {"story":"A","kronos":"B","apep":"A","fafnir":"A","pvp":"B"},
    "captain": "Augmente la VIT de tous les alliés de 35% en Histoire, Miracle Infini et Île Calamité."
  },
  {
    "id": "elaine",
    "name": "Elaine",
    "image": null,
    "divinity": "Nyx",
    "element": "wind",
    "role": "dps",
    "tier": "A",
    "rarity": 5,
    "description": "DPS Légendaire inspirée de Nyx, déesse grecque de la nuit. Ses critiques transfèrent 1 debuff de chaque allié vers la cible. Inflige Sommeil et accumule des stacks de Dégâts Crit via son buff unique Duskglow (actif en présence de Leora). Niche mais redoutable sur Fafnir et certains Sentinel Hunts.",
    "relicBuild": {
      "primary": {"set4":"foudre","set2":"recurve","label":"Foudre + Incandescence"},
      "alt": {"set4":"war","set2":"recurve","label":"Guerre + Incandescence"},
      "mainStats": {"ring":"Taux de Crit%","helmet":"ATQ%","boots":"ATQ% ou VIT"},
      "substats": ["Taux de Crit ≥80%","Dégâts Crit%","ATQ%","Précision%"],
      "notes": "Garantir 80% de Taux de Crit pour profiter du transfert de debuffs via les critiques. La Précision aide à faire atterrir Sommeil."
    },
    "synergies": [],
    "modes": {"story":"B","kronos":"B","apep":"B","fafnir":"A","pvp":"B"},
    "captain": "Augmente le Taux de Crit de tous les alliés de 25%."
  }
]
$$) AS t(e)
ON CONFLICT (id) DO NOTHING;
