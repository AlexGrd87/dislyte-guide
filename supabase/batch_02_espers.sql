-- ═══════════════════════════════════════════════════════════════
-- BATCH 02 — 10 nouveaux espers (29 Mai 2026)
-- Yun Chuan, Everett, Ife, Catherine, Intisar,
-- Ren Si, Xiao Yin, Jiang Man, Jin Yuyao, Zora
-- Sources : playdislyte.com (images, data, rôles confirmés via HTML classes)
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
    "id": "yun-chuan",
    "name": "Yun Chuan",
    "image": "https://playdislyte.com/wp-content/uploads/2022/12/Yun_Chuan_avatar.png",
    "divinity": "Yang Jian",
    "element": "wind",
    "role": "defender",
    "tier": "S",
    "rarity": 5,
    "description": "Défenseur Légendaire inspiré de Yang Jian, divinité guerrière de la mythologie chinoise. Ses attaques triples infligent Réduction de Précision et marquent les ennemis du Sceau du Troisième Œil via ses critiques. En passif, bloque 15% des attaques et invoque Screamer pour voler des buffs ennemis. Son ultime inflige Réduction de VIT à tous les ennemis et accorde Immunité + Hausse de VIT à toute l'équipe. Polyvalent, solide en Kronos et Apep.",
    "relicBuild": {
      "primary": {"set4":"wind","set2":"egide","label":"Vent + Égide"},
      "alt": {"set4":"astrale","set2":"egide","label":"Astrale + Égide"},
      "mainStats": {"ring":"PV%","helmet":"PV%","boots":"VIT"},
      "substats": ["VIT","PV%","DEF%","Résistance%"],
      "notes": "Scale sur les PV pour ses dégâts. Le set Vent lui permet d'agir tôt pour poser Immunité sur l'équipe. Prioriser VIT et PV% pour maximiser survie et dégâts."
    },
    "synergies": [],
    "modes": {"story":"A","kronos":"S","apep":"S","fafnir":"A","pvp":"A"},
    "captain": "Augmente l'ATQ de tous les alliés de 40% en Miracle Rituel, Miracle Sonique, Terres Désolées et Chasse Sentinelle."
  },
  {
    "id": "everett",
    "name": "Everett",
    "image": "https://playdislyte.com/wp-content/uploads/2022/10/Everett_avatar.png",
    "divinity": "Tyr",
    "element": "shimmer",
    "role": "defender",
    "tier": "S",
    "rarity": 5,
    "description": "Défenseur Légendaire inspiré de Tyr, dieu norse de la justice. Scale sur les PV max pour ses dégâts. Inflige Étourdissement et Réduction de Précision. Son passif réduit de 40% le Taux de Crit des attaques ennemies sur lui, contre-attaque les coups non-critiques (30% de chance) et automatiquement les coups critiques (100%). Son ultime inflige Provocation et réduit les dégâts subis par toute l'équipe de 20% tant qu'il est en CD.",
    "relicBuild": {
      "primary": {"set4":"foudre","set2":"egide","label":"Foudre + Égide"},
      "alt": {"set4":"wind","set2":"egide","label":"Vent + Égide"},
      "mainStats": {"ring":"PV%","helmet":"PV%","boots":"VIT"},
      "substats": ["VIT","PV%","DEF%","Taux de Crit"],
      "notes": "Scale sur les PV — maximiser PV% partout. Le Taux de Crit booste ses contre-attaques. La réduction de 40% du Taux de Crit ennemi le rend extrêmement difficile à tuer en PvP."
    },
    "synergies": ["ren-si"],
    "modes": {"story":"B","kronos":"B","apep":"B","fafnir":"A","pvp":"S"},
    "captain": null
  },
  {
    "id": "ife",
    "name": "Ife",
    "image": "https://playdislyte.com/wp-content/uploads/2022/10/Ife_avatar.png",
    "divinity": "Meretseger",
    "element": "inferno",
    "role": "debuffer",
    "tier": "A",
    "rarity": 5,
    "description": "Affaiblisseuse Légendaire inspirée de Meretseger, déesse serpent égyptienne gardienne des nécropoles. Sa compétence de base empoisonne et se répète si l'ennemi est debuffé. Inflige AoE Réduction de VIT avec 60% de chance d'Étourdissement. Son ultime frappe toute l'équipe ennemie 3 fois pour infliger Poison + Réduction d'ATQ + absorption de 5% de PA par coup. Redoutable pour accumuler les debuffs et drainer les PA ennemies.",
    "relicBuild": {
      "primary": {"set4":"domination","set2":"enchanteur","label":"Domination + Enchanteur"},
      "alt": {"set4":"calamite","set2":"enchanteur","label":"Calamité + Enchanteur"},
      "mainStats": {"ring":"PV%","helmet":"DEF%","boots":"VIT"},
      "substats": ["VIT","Précision%","PV%","DEF%"],
      "notes": "La Précision est cruciale pour faire atterrir tous ses debuffs. Ses CDs sont courts — prioriser VIT pour cycler ses compétences rapidement et accumuler les Poisons."
    },
    "synergies": [],
    "modes": {"story":"B","kronos":"B","apep":"A","fafnir":"B","pvp":"A"},
    "captain": "Augmente la Précision de tous les alliés de 40%."
  },
  {
    "id": "catherine",
    "name": "Catherine",
    "image": "https://playdislyte.com/wp-content/uploads/2022/07/Catherine-Hela.png",
    "divinity": "Hela",
    "element": "shimmer",
    "role": "support",
    "tier": "S",
    "rarity": 4,
    "description": "Supporteuse Épique inspirée de Hela, déesse norse des morts. Son passif absorbe automatiquement 1 debuff de chaque allié en début de tour et accorde 5% de PA à toute l'équipe par debuff absorbé — une mécanique unique et très puissante. Son ultime frappe tous les ennemis et accorde le buff Standoff à toute l'équipe. Incontournable en PvP et Fafnir.",
    "relicBuild": {
      "primary": {"set4":"wind","set2":"lumiere","label":"Vent + Lumière"},
      "alt": {"set4":"wind","set2":"egide","label":"Vent + Égide"},
      "mainStats": {"ring":"PV%","helmet":"PV% ou DEF%","boots":"VIT"},
      "substats": ["VIT","PV%","DEF%","Résistance%"],
      "notes": "La VIT est cruciale — Catherine doit agir le plus tôt possible pour absorber les debuffs et booster les PA de l'équipe. Prioriser PV et DEF pour sa survie."
    },
    "synergies": ["jin-yuyao","ren-si"],
    "modes": {"story":"B","kronos":"B","apep":"B","fafnir":"S","pvp":"S"},
    "captain": null
  },
  {
    "id": "intisar",
    "name": "Intisar",
    "image": "https://playdislyte.com/wp-content/uploads/2023/01/Intisar_avatar.png",
    "divinity": "Kauket",
    "element": "flow",
    "role": "dps",
    "tier": "S",
    "rarity": 5,
    "description": "DPS Légendaire inspirée de Kauket, déesse de l'obscurité primordiale de la mythologie égyptienne. Gagne Furtivité au début du combat pendant 2 tours, infligeant des Dégâts Vrais (15% des PV max ennemis/tour). Sans Furtivité, déclenche automatiquement Transmit Virus en poursuite. Son ultime accorde Hausse d'ATQ à toute l'équipe et inflige Réduction de DEF + Réduction d'ATQ. Très forte en PvP et contenu avancé.",
    "relicBuild": {
      "primary": {"set4":"foudre","set2":"recurve","label":"Foudre + Incandescence"},
      "alt": {"set4":"war","set2":"recurve","label":"Guerre + Incandescence"},
      "mainStats": {"ring":"Dégâts Crit%","helmet":"ATQ%","boots":"ATQ%"},
      "substats": ["Taux de Crit ≥80%","Dégâts Crit%","ATQ%","VIT"],
      "notes": "DPS critique standard. Maximiser Taux de Crit avant d'investir en Dégâts Crit. Sa Furtivité initiale lui confère une meilleure survie en début de combat."
    },
    "synergies": [],
    "modes": {"story":"B","kronos":"B","apep":"A","fafnir":"B","pvp":"S"},
    "captain": "Augmente le Taux de Crit de tous les alliés de 25%."
  },
  {
    "id": "ren-si",
    "name": "Ren Si",
    "image": "https://playdislyte.com/wp-content/uploads/2022/07/Ren-Si-Black-Tortoise.png",
    "divinity": "Xuan Wu",
    "element": "inferno",
    "role": "defender",
    "tier": "S",
    "rarity": 4,
    "description": "Défenseur Épique inspiré de Xuan Wu (Tortue Noire), l'une des quatre créatures célestes de la mythologie chinoise. Ses dégâts scalent sur la DEF. Son passif légendaire lui permet de survivre un coup fatal en entrant en Standoff (1 tour), récupérant 30% de ses PV max et réinitialisant son ultime. Son ultime inflige Réduction de DEF et Provocation à tous les ennemis. Référence du PvP et du Cube Miracle.",
    "relicBuild": {
      "primary": {"set4":"wind","set2":"roche","label":"Vent + Roche Inflexible"},
      "alt": {"set4":"wind","set2":"fortification","label":"Vent + Fortification"},
      "mainStats": {"ring":"DEF%","helmet":"DEF%","boots":"VIT"},
      "substats": ["VIT","DEF%","PV%","Taux de Crit"],
      "notes": "Ses dégâts scalent sur la DEF — maximiser DEF% tout en maintenant une bonne VIT. Son passif de survie le rend extrêmement difficile à éliminer en PvP."
    },
    "synergies": ["everett","donar"],
    "modes": {"story":"B","kronos":"B","apep":"B","fafnir":"B","pvp":"S"},
    "captain": "Augmente la DEF de tous les alliés de 24%."
  },
  {
    "id": "xiao-yin",
    "name": "Xiao Yin",
    "image": "https://playdislyte.com/wp-content/uploads/2022/07/Xiao_Yin_sprite.png",
    "divinity": "Qinglong",
    "element": "flow",
    "role": "dps",
    "tier": "S",
    "rarity": 4,
    "description": "DPS Épique inspiré de Qinglong (Dragon d'Azur), l'une des quatre créatures célestes de la mythologie chinoise. Gagne Furtivité au début du combat et lors de certaines compétences, augmentant ses dégâts de 30%. Ses attaques multiples absorbent la PA ennemie (10% par coup) et son ultime réduit la PA ennemie de 20% par hit avec 50% de chance. Excellent en Kronos et Fafnir grâce à ses multi-coups et manipulation de PA.",
    "relicBuild": {
      "primary": {"set4":"foudre","set2":"recurve","label":"Foudre + Incandescence"},
      "alt": {"set4":"war","set2":"recurve","label":"Guerre + Incandescence"},
      "mainStats": {"ring":"ATQ% ou Taux de Crit%","helmet":"ATQ%","boots":"ATQ%"},
      "substats": ["Taux de Crit ≥80%","Dégâts Crit%","ATQ%","VIT"],
      "notes": "DPS cible unique avec manipulation de PA. Viser 80% Taux de Crit. Sa Furtivité augmente ses dégâts de 30% et améliore sa survie en combat."
    },
    "synergies": ["lu-yi","dhalia"],
    "modes": {"story":"B","kronos":"S","apep":"B","fafnir":"S","pvp":"A"},
    "captain": "Augmente l'ATQ de tous les alliés de 30% en Miracle Rituel, Miracle Sonique, Terres Désolées et Chasse Sentinelle."
  },
  {
    "id": "jiang-man",
    "name": "Jiang Man",
    "image": "https://playdislyte.com/wp-content/uploads/2022/07/Jiang-Man-Meng-Po.png",
    "divinity": "Meng Po",
    "element": "flow",
    "role": "dps",
    "tier": "B",
    "rarity": 4,
    "description": "DPS Épique inspirée de Meng Po, gardienne de l'oubli et du Thé de l'Oubli dans la mythologie chinoise. Spécialiste du debuff Floraison des Enfers (Netherbloom) : ses compétences appliquent ce marqueur qui explose après 5 attaques pour infliger des dégâts AoE, 50% de chance de Silence et Poison. Son ultime frappe toute l'équipe ennemie 3 fois pour 110% ATQ. Utile contre les groupes nombreux.",
    "relicBuild": {
      "primary": {"set4":"war","set2":"recurve","label":"Guerre + Incandescence"},
      "alt": {"set4":"wind","set2":"recurve","label":"Vent + Incandescence"},
      "mainStats": {"ring":"Dégâts Crit%","helmet":"ATQ%","boots":"ATQ% ou VIT"},
      "substats": ["Taux de Crit","Dégâts Crit%","ATQ%","Précision%"],
      "notes": "La Précision est importante pour faire atterrir le Silence du Netherbloom. Idéale contre les vagues ennemies nombreuses grâce aux explosions en chaîne."
    },
    "synergies": [],
    "modes": {"story":"B","kronos":"C","apep":"B","fafnir":"B","pvp":"B"},
    "captain": "Augmente l'ATQ de tous les alliés de 30% en Holocomba."
  },
  {
    "id": "jin-yuyao",
    "name": "Jin Yuyao",
    "image": "https://playdislyte.com/wp-content/uploads/2022/07/Jin-Yuyao-Queen-Mother.png",
    "divinity": "Xi Wangmu",
    "element": "inferno",
    "role": "support",
    "tier": "S",
    "rarity": 5,
    "description": "Supporteuse Légendaire inspirée de Xi Wangmu, la Reine Mère de l'Ouest dans la mythologie chinoise. Immune aux Immobilisations. Son passif enlève un debuff aléatoire de chaque allié en début de tour et soigne 5% de leurs PV max. Boost sa PA de 20% quand un allié reçoit un debuff. Son ultime transfère tous les debuffs de l'équipe sur un ennemi et lui inflige des dégâts basés sur ses PV max. Excellente en PvP et Tour du Miracle.",
    "relicBuild": {
      "primary": {"set4":"wind","set2":"sylvestre","label":"Vent + Sylvestre"},
      "alt": {"set4":"wind","set2":"egide","label":"Vent + Égide"},
      "mainStats": {"ring":"PV%","helmet":"PV%","boots":"VIT"},
      "substats": ["VIT","PV%","DEF%","Précision%"],
      "notes": "Doit agir souvent pour maximiser son passif de cleanse. VIT maximale conseillée. La Précision aide son ultime à mieux infliger des dégâts sur la cible."
    },
    "synergies": ["clara","gabrielle","ren-si"],
    "modes": {"story":"B","kronos":"C","apep":"B","fafnir":"B","pvp":"S"},
    "captain": "Augmente les PV de tous les alliés de 30%."
  },
  {
    "id": "zora",
    "name": "Zora",
    "image": "https://playdislyte.com/wp-content/uploads/2022/07/Zora_sprite.png",
    "divinity": "Amunet",
    "element": "flow",
    "role": "dps",
    "tier": "A",
    "rarity": 5,
    "description": "DPS Légendaire inspirée d'Amunet, déesse de l'air primordial de la mythologie égyptienne. Sa compétence de base frappe tous les ennemis, inflige Diseased et soigne 15% des dégâts infligés. Ses attaques ciblent un ennemi 3 fois avec +30% de Dégâts Crit, et ont 40% de chance de dispel un buff par coup. Son ultime frappe toute l'équipe ennemie et pose Buff Blocker. Polyvalente, excellente en Apep.",
    "relicBuild": {
      "primary": {"set4":"foudre","set2":"recurve","label":"Foudre + Incandescence"},
      "alt": {"set4":"war","set2":"recurve","label":"Guerre + Incandescence"},
      "mainStats": {"ring":"ATQ%","helmet":"ATQ%","boots":"ATQ%"},
      "substats": ["Taux de Crit ≥80%","Dégâts Crit%","ATQ%","VIT"],
      "notes": "DPS polyvalent avec auto-soin et dispel de buffs. Viser 80% Taux de Crit. Le set Foudre maximise ses dégâts critiques. Excellent en Apep grâce à ses attaques AoE."
    },
    "synergies": ["gabrielle","sander"],
    "modes": {"story":"B","kronos":"B","apep":"S","fafnir":"A","pvp":"A"},
    "captain": "Augmente l'ATQ de tous les alliés de 40% en Miracle Rituel, Miracle Sonique et Terres Désolées."
  }
]
$$) AS t(e)
ON CONFLICT (id) DO NOTHING;
