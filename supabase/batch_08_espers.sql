-- ═══════════════════════════════════════════════════════════════
-- BATCH 08 — 10 nouveaux espers (29 Mai 2026)
-- Camille, Embla, Hilda, Javid, Norah, Xuan Pin, Koharu, Adrina, Alolin, Parmi
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
    "id": "camille",
    "name": "Camille",
    "image": "https://static.wikia.nocookie.net/dislyte/images/9/9f/Camille_avatar.png/revision/latest",
    "divinity": "Hati",
    "element": "wind",
    "role": "dps",
    "tier": "A",
    "rarity": 5,
    "description": "DPS Vent Légendaire inspirée de Hati, loup de la mythologie nordique qui poursuit la lune. Camille est une chasseuse AoE spécialisée dans les debuffs de durée : son attaque de base étend tous les debuffs ennemis de 1 tour, son S2 inflige Diseased (non résistable) sur zone et déclenche immédiatement le Saignement actif, et son ultime applique Sear et Saignement sur tous les ennemis. Synergise parfaitement avec d'autres espers de type DoT.",
    "relicBuild": {
      "primary": {"set4": "war", "set2": "foudre", "label": "Guerre + Foudre"},
      "alt": {"set4": "foudre", "set2": "recurve", "label": "Foudre + Incandescence"},
      "mainStats": {"ring": "Taux de Crit", "helmet": "ATQ%", "boots": "VIT"},
      "substats": ["Précision", "Taux de Crit", "ATQ%", "Dégâts Crit", "VIT"],
      "notes": "Précision prioritaire pour garantir que Diseased atterrit (debuff non résistable mais ACC reste utile pour les autres). Guerre + Foudre en 4+2 pour ATQ et C.DMG. Synergise avec Embla et Alolin sur les builds Saignement."
    },
    "synergies": ["embla", "alolin", "gabrielle"],
    "modes": {"story": "A", "kronos": "B", "apep": "B", "fafnir": "B", "pvp": "A"},
    "captain": "Augmente l'ATQ de tous les alliés de 40% en Histoire, Miracle Infini et Île Calamité."
  },
  {
    "id": "embla",
    "name": "Embla",
    "image": "https://static.wikia.nocookie.net/dislyte/images/3/30/Embla_avatar.png/revision/latest",
    "divinity": "Ymir",
    "element": "inferno",
    "role": "dps",
    "tier": "A",
    "rarity": 5,
    "description": "DPS Brasier Légendaire inspirée de Ymir, le premier géant de la mythologie nordique. Embla inflige son debuff unique Corrupted Seed à chaque attaque, permettant à toute l'équipe d'appliquer Diseased sur les cibles touchées tout en dissipant leurs buffs. Particulièrement efficace dans les équipes de contrôle ou de debuffs multiples. Sa captain +30% Taux de Crit en Guerre des Points en fait un choix défensif solide.",
    "relicBuild": {
      "primary": {"set4": "foudre", "set2": "avatara", "label": "Foudre + Avatara"},
      "alt": {"set4": "foudre", "set2": "recurve", "label": "Foudre + Incandescence"},
      "mainStats": {"ring": "Taux de Crit", "helmet": "ATQ%", "boots": "VIT"},
      "substats": ["Taux de Crit", "ATQ%", "Dégâts Crit", "VIT"],
      "notes": "Foudre maximise le C.DMG sur ses attaques fréquentes qui propagent Corrupted Seed. Avatara déclenche des contre-attaques supplémentaires pour plus d'applications de son debuff passif. Taux de Crit ≥ 80% avant C.DMG."
    },
    "synergies": ["camille", "alolin", "gabrielle"],
    "modes": {"story": "A", "kronos": "A", "apep": "B", "fafnir": "B", "pvp": "S"},
    "captain": "Augmente le Taux de Critique de tous les alliés de 30% en Guerre des Points."
  },
  {
    "id": "hilda",
    "name": "Hilda",
    "image": "https://static.wikia.nocookie.net/dislyte/images/3/3c/Hilda_avatar.png/revision/latest",
    "divinity": "Hypnos",
    "element": "flow",
    "role": "controller",
    "tier": "A",
    "rarity": 5,
    "description": "Contrôleuse Aquatique Légendaire inspirée d'Hypnos, dieu grec du sommeil. Hilda est une contrôleuse PvE spécialisée dans le Sommeil et le Poison : ses capacités endorment et empoisonnent les ennemis, amplifiant les dégâts des alliés via le set Calamité. Le set Océan réduit ses cooldowns pour des contrôles plus fréquents. Ses debuffs en couche rendent ses équipes très efficaces contre les gros packs d'ennemis.",
    "relicBuild": {
      "primary": {"set4": "calamite", "set2": "sinueux", "label": "Calamité + Sinueux"},
      "alt": {"set4": "ecume", "set2": "sinueux", "label": "Écume + Sinueux"},
      "mainStats": {"ring": "DEF%", "helmet": "PV%", "boots": "VIT ou Précision"},
      "substats": ["Précision", "DEF%", "PV%", "VIT"],
      "notes": "Calamité amplifie les dégâts des alliés contre ses cibles debuffées (+35% max). Sinueux est essentiel pour faire atterrir ses contrôles (Sommeil, Poison). Alt Écume pour réduire les cooldowns. Précision prioritaire en substats."
    },
    "synergies": ["gabrielle", "lin-xiao", "long-mian"],
    "modes": {"story": "A", "kronos": "B", "apep": "B", "fafnir": "B", "pvp": "A"},
    "captain": "Augmente la DEF de tous les alliés de 40% en Miracle Rituel, Sonique, Terres Désolées et Chasse Sentinelle."
  },
  {
    "id": "javid",
    "name": "Javid",
    "image": "https://static.wikia.nocookie.net/dislyte/images/0/08/Javid_avatar.png/revision/latest",
    "divinity": "Shamash",
    "element": "inferno",
    "role": "dps",
    "tier": "A",
    "rarity": 5,
    "description": "DPS Brasier Légendaire inspiré de Shamash, dieu mésopotamien du soleil et de la justice. Javid est un debuffeur offensif : il peut empiler DEF Down, Sear, Diseased et Judgment Seal sur les cibles. Son buff Sacred Flame dissipe tous ses propres DoTs pour lui permettre d'infliger des Dégâts Vrais supplémentaires. Excellent en PvE grâce à sa réduction de DEF et ses nombreux debuffs qui amplifient les dégâts de toute l'équipe.",
    "relicBuild": {
      "primary": {"set4": "foudre", "set2": "recurve", "label": "Foudre + Incandescence"},
      "alt": {"set4": "calamite", "set2": "sinueux", "label": "Calamité + Sinueux"},
      "mainStats": {"ring": "Taux de Crit", "helmet": "ATQ%", "boots": "VIT"},
      "substats": ["Taux de Crit", "ATQ%", "Précision", "Dégâts Crit", "VIT"],
      "notes": "Foudre pour le maximum de dégâts sur ses attaques critiques. Alt Calamité + Sinueux pour un build debuffeur pur — ses nombreux debuffs activent le bonus Calamité (+35%) sur toute l'équipe. Précision cruciale pour fiabiliser ses debuffs."
    },
    "synergies": ["gabrielle", "lin-xiao", "ahmed"],
    "modes": {"story": "A", "kronos": "A", "apep": "B", "fafnir": "B", "pvp": "A"},
    "captain": "Augmente l'ATQ de tous les alliés de 30%."
  },
  {
    "id": "norah",
    "name": "Norah",
    "image": "https://static.wikia.nocookie.net/dislyte/images/1/1a/Norah_avatar.png/revision/latest",
    "divinity": "Muse",
    "element": "wind",
    "role": "dps",
    "tier": "A",
    "rarity": 5,
    "description": "DPS Vent Légendaire inspirée de la Muse, divinité grecque de l'art et de l'inspiration. Norah cycle à travers trois effets de son buff Tempo Trio à chaque utilisation de sa 3e capacité, offrant des bonus variés à l'équipe. Son set Relief lui permet de lancer des Assist Attacks sur les alliés. Complément polyvalent qui peut jouer le rôle de DPS secondaire ou de support offensif selon les besoins.",
    "relicBuild": {
      "primary": {"set4": "soutien", "set2": "avatara", "label": "Soutien + Avatara"},
      "alt": {"set4": "war", "set2": "sinueux", "label": "Guerre + Sinueux"},
      "mainStats": {"ring": "ATQ%", "helmet": "ATQ%", "boots": "VIT"},
      "substats": ["ATQ%", "Précision", "VIT", "Taux de Crit"],
      "notes": "Soutien (Relief) déclenche des Assist Attacks quand ses alliés utilisent leur attaque de base — en équipe de DPS auto-attaque, elle multiplie les actions. ATQ% pour amplifier ses dégâts et ceux des Assist Attacks. Précision pour ses debuffs."
    },
    "synergies": ["gabrielle", "sander", "lin-xiao"],
    "modes": {"story": "A", "kronos": "B", "apep": "B", "fafnir": "B", "pvp": "B"},
    "captain": "Augmente l'ATQ de tous les alliés de 40% en Miracle Rituel, Sonique, Terres Désolées et Chasse Sentinelle."
  },
  {
    "id": "xuan-pin",
    "name": "Xuan Pin",
    "image": "https://static.wikia.nocookie.net/dislyte/images/a/a0/Xuan_Pin_avatar.png/revision/latest",
    "divinity": "Jiutian Xuannu",
    "element": "shimmer",
    "role": "support",
    "tier": "A",
    "rarity": 5,
    "description": "Supporteuse Scintillante Légendaire inspirée de Jiutian Xuannu, déesse chinoise de la guerre et de la longévité. Xuan Pin est une pusheuse de PA spécialisée : elle octroie à ses alliés des buffs uniques (Cannon, Chariot, Horse, Soldier, General) qui amplifient massivement leurs dégâts. Elle dissipe également les boucliers ennemis et monte la PA de toute son équipe. Sa captain +30% Taux de Crit en PvP en fait un excellent choix offensif.",
    "relicBuild": {
      "primary": {"set4": "wind", "set2": "avatara", "label": "Vent + Avatara"},
      "alt": {"set4": "wind", "set2": "sylvestre", "label": "Vent + Sylvestre"},
      "mainStats": {"ring": "PV%", "helmet": "DEF%", "boots": "VIT"},
      "substats": ["VIT", "PV%", "DEF%"],
      "notes": "VIT maximum pour agir en premier et pousser la PA de ses alliés avant qu'ils ne prennent leurs tours. Vent pour encore plus de vitesse. PV% et DEF% pour sa survie — elle doit rester en vie pour continuer à pousser. Pas besoin de stats offensives."
    },
    "synergies": ["gabrielle", "gaius", "li-ling"],
    "modes": {"story": "B", "kronos": "B", "apep": "B", "fafnir": "B", "pvp": "S"},
    "captain": "Augmente le Taux de Critique de tous les alliés de 30% en Guerre des Points et en Éliminatoire."
  },
  {
    "id": "koharu",
    "name": "Koharu",
    "image": "https://static.wikia.nocookie.net/dislyte/images/c/ce/Koharu_avatar.png/revision/latest",
    "divinity": "Ame-No-Uzume",
    "element": "inferno",
    "role": "support",
    "tier": "A",
    "rarity": 4,
    "description": "Supporteuse Brasier Épique inspirée d'Ame-No-Uzume, divinité japonaise de l'aube et des arts. Koharu est une supporteuse polyvalente qui booste les dégâts et les soins alliés via sa Kagura Dance. Elle peut également réduire la DEF ennemie et accélérer ses alliés. Son rôle est d'amplifier l'équipe tout en maintenant la pression offensive. Excellent support de PvE pour les joueurs F2P qui n'ont pas encore Gabrielle.",
    "relicBuild": {
      "primary": {"set4": "wind", "set2": "sylvestre", "label": "Vent + Sylvestre"},
      "alt": {"set4": "ecume", "set2": "sylvestre", "label": "Écume + Sylvestre"},
      "mainStats": {"ring": "PV%", "helmet": "PV%", "boots": "VIT"},
      "substats": ["VIT", "PV%", "Précision", "DEF%"],
      "notes": "Vent pour agir rapidement et distribuer ses buffs plus souvent. Sylvestre pour sa survie (support doit rester en vie). Précision pour que ses debuffs (réduction DEF) atterrissent. VIT prioritaire sur toutes les pièces."
    },
    "synergies": ["gabrielle", "lin-xiao", "sally"],
    "modes": {"story": "A", "kronos": "B", "apep": "B", "fafnir": "B", "pvp": "B"},
    "captain": "Augmente l'ATQ de tous les alliés de 30% en Histoire, Miracle Infini et Île Calamité."
  },
  {
    "id": "adrina",
    "name": "Adrina",
    "image": "https://static.wikia.nocookie.net/dislyte/images/b/ba/Adrina_avatar.png/revision/latest",
    "divinity": "Chantico",
    "element": "inferno",
    "role": "dps",
    "tier": "B",
    "rarity": 4,
    "description": "DPS/Contrôleuse Brasier Épique inspirée de Chantico, déesse aztèque des volcans et du foyer domestique. Adrina possède un passif unique : à chaque tour d'un allié, elle réduit sa propre PA de 99%, lui permettant d'agir en dernier tout en ayant une fréquence d'actions correcte. Elle peut étourdire et dispose d'une bonne puissance d'ATQ. La VIT peut être ignorée sur ses Relics grâce à ce passif.",
    "relicBuild": {
      "primary": {"set4": "war", "set2": "domination", "label": "Guerre + Domination"},
      "alt": {"set4": "foudre", "set2": "avatara", "label": "Foudre + Avatara"},
      "mainStats": {"ring": "Taux de Crit ou ATQ%", "helmet": "ATQ% ou Dégâts Crit", "boots": "ATQ%"},
      "substats": ["Taux de Crit", "ATQ%", "Précision", "Dégâts Crit", "PV%"],
      "notes": "La VIT peut être IGNORÉE — son passif PA lui permet de toujours agir sans en avoir besoin. Investir tout en ATQ et dégâts critiques. Domination (Tyranny) pour le 20% de chance d'Étourdissement supplémentaire. Boots ATQ% à la place de VIT."
    },
    "synergies": ["gabrielle", "lin-xiao", "ahmed"],
    "modes": {"story": "B", "kronos": "C", "apep": "C", "fafnir": "C", "pvp": "B"},
    "captain": "Augmente l'ATQ de tous les alliés de 24%."
  },
  {
    "id": "alolin",
    "name": "Alolin",
    "image": "https://static.wikia.nocookie.net/dislyte/images/0/08/Alolin_avatar.png/revision/latest",
    "divinity": "Pazuzu",
    "element": "wind",
    "role": "dps",
    "tier": "B",
    "rarity": 4,
    "description": "DPS Vent Épique inspiré de Pazuzu, démon mésopotamien du vent et des tempêtes. Alolin se spécialise dans les dégâts de type Saignement (Bleed) qui scalent sur son ATQ. Il fonctionne particulièrement bien dans les équipes DoT aux côtés d'Embla et Camille, prolongeant les effets de saignement et amplifiant les dégâts sur la durée. La Précision est cruciale pour faire atterrir ses debuffs de Saignement.",
    "relicBuild": {
      "primary": {"set4": "war", "set2": "sinueux", "label": "Guerre + Sinueux"},
      "alt": {"set4": "calamite", "set2": "sinueux", "label": "Calamité + Sinueux"},
      "mainStats": {"ring": "ATQ%", "helmet": "ATQ%", "boots": "VIT"},
      "substats": ["ATQ%", "Précision", "VIT", "Taux de Crit"],
      "notes": "Ses dégâts de Saignement scalent sur l'ATQ — maximiser cette stat. Sinueux (+25% ACC) pour que ses bleeds atterrissent. Alt Calamité si paired avec d'autres debuffeurs (le bonus +35% vs cibles debuffées est massif). VIT pour fréquence d'actions."
    },
    "synergies": ["embla", "camille", "gabrielle"],
    "modes": {"story": "B", "kronos": "B", "apep": "C", "fafnir": "C", "pvp": "B"},
    "captain": "Augmente l'ATQ de tous les alliés de 30% en Guerre des Points et en Éliminatoire."
  },
  {
    "id": "parmi",
    "name": "Parmi",
    "image": "https://static.wikia.nocookie.net/dislyte/images/2/2a/Parmi_avatar.png/revision/latest",
    "divinity": "Ninsun",
    "element": "flow",
    "role": "ap-controller",
    "tier": "B",
    "rarity": 4,
    "description": "Contrôleuse de PA Aquatique Épique inspirée de Ninsun, déesse mésopotamienne des vaches sauvages et mère de Gilgamesh. Parmi réduit la PA de toute l'équipe ennemie de 30% avec son S2, tout en pouvant Étourdrir et ralentir ses adversaires. Sa captain +20% VIT universelle en fait un excellent choix de capitaine pour des équipes PvE ou PvP basées sur la vitesse.",
    "relicBuild": {
      "primary": {"set4": "wind", "set2": "sinueux", "label": "Vent + Sinueux"},
      "alt": {"set4": "wind", "set2": "egide", "label": "Vent + Égide"},
      "mainStats": {"ring": "PV%", "helmet": "VIT", "boots": "VIT"},
      "substats": ["VIT", "PV%", "Précision", "DEF%"],
      "notes": "VIT maximum absolu — elle doit agir avant les ennemis pour réduire leur PA avant qu'ils n'attaquent. Vent + boots VIT + helmet VIT. Sinueux pour faire atterrir ses Étourdissements. PV% et DEF% pour sa survie (elle sera ciblée en priorité)."
    },
    "synergies": ["long-mian", "tiye", "gabrielle"],
    "modes": {"story": "A", "kronos": "B", "apep": "B", "fafnir": "B", "pvp": "A"},
    "captain": "Augmente la VIT de tous les alliés de 20%."
  }
]
$$) AS t(e);
