-- ═══════════════════════════════════════════════════════════════
-- BATCH 04 — 10 nouveaux espers (29 Mai 2026)
-- Xie Chuyi, Xie Yuzhi, Odette, Taylor, Nick,
-- Bai Liuli, Aurelius, Kara, Jeanne, Chalmers
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
    "id": "xie-chuyi",
    "name": "Xie Chuyi",
    "image": "https://playdislyte.com/wp-content/uploads/2022/04/Death-Guard-Hei-Xie-Chuyi.png",
    "divinity": "Death Guard Hei",
    "element": "flow",
    "role": "dps",
    "tier": "A",
    "rarity": 4,
    "description": "DPS Épique incarnant Death Guard Hei, gardien des Enfers de la mythologie chinoise. Spécialiste des attaques multi-coups avec Brûlure et réduction de VIT ennemie. Sa synergie avec son jumeau Xie Yuzhi est exceptionnelle : Soul Dispel frappe 2 cibles supplémentaires en sa présence, et Luck in Pairs accorde 2 attaques bonus quand ils combattent ensemble. Son Taux de Critique augmente automatiquement à chaque utilisation de compétence — un DPS qui monte en puissance au fil du combat.",
    "relicBuild": {
      "primary": {"set4": "guerre", "set2": "recurve", "label": "Guerre + Incandescence"},
      "alt": {"set4": "foudre", "set2": "recurve", "label": "Foudre + Incandescence"},
      "mainStats": {"ring": "Dégâts Crit%", "helmet": "ATQ%", "boots": "ATQ% ou VIT"},
      "substats": ["Taux de Crit ≥80%", "Dégâts Crit%", "ATQ%", "VIT"],
      "notes": "Son Taux de Crit augmente automatiquement en combat — viser 60% initial suffit. Les dégâts explosent quand Xie Yuzhi est présent. Guerre booste ses dégâts de base, Foudre maximise les Dégâts Crit pour les kills instantanés."
    },
    "synergies": ["xie-yuzhi", "tang-yun", "lu-yi", "berenice"],
    "modes": {"story": "A", "kronos": "A", "apep": "B", "fafnir": "B", "pvp": "B"},
    "captain": null
  },
  {
    "id": "xie-yuzhi",
    "name": "Xie Yuzhi",
    "image": "https://playdislyte.com/wp-content/uploads/2022/04/Death-Guard-Bai-Xie-Yuzhi.png",
    "divinity": "Death Guard Bai",
    "element": "wind",
    "role": "ap-controller",
    "tier": "A",
    "rarity": 4,
    "description": "Contrôleur de PA Épique incarnant Death Guard Bai, acolyte des Enfers aux apparences innocentes trompeuses de la mythologie chinoise. Spécialiste de la réduction de PA et de l'Étourdissement en zone. Sa synergie avec Xie Chuyi est redoutable : Soul Dispel cible 2 ennemis supplémentaires en sa présence, et Luck in Pairs déclenche 2 attaques bonus avec Étourdissement AoE. Son ultime Heaven Awaits confère la Hausse de VIT, vole 20% de PA ennemie et prolonge tous leurs debuffs.",
    "relicBuild": {
      "primary": {"set4": "wind", "set2": "sinueux", "label": "Vent + Sinueux"},
      "alt": {"set4": "wind", "set2": "sylvestre", "label": "Vent + Sylvestre"},
      "mainStats": {"ring": "PV%", "helmet": "PV% ou DEF%", "boots": "VIT"},
      "substats": ["VIT", "PV%", "DEF%", "Précision%"],
      "notes": "VIT absolue priorité — plus il est rapide, plus ses réductions de PA paralysent les ennemis avant qu'ils agissent. Sinueux (+25% Précision) garantit que ses Étourdissements atterrissent. Excellent capitaine pour les équipes de contrôle PvP."
    },
    "synergies": ["xie-chuyi", "tang-yun", "berenice", "clara"],
    "modes": {"story": "B", "kronos": "B", "apep": "B", "fafnir": "B", "pvp": "A"},
    "captain": "Augmente la Précision de tous les alliés de 30%."
  },
  {
    "id": "odette",
    "name": "Odette",
    "image": "https://playdislyte.com/wp-content/uploads/2022/10/Odette_avatar-1.png",
    "divinity": "Skadi",
    "element": "wind",
    "role": "controller",
    "tier": "A",
    "rarity": 4,
    "description": "Contrôleuse Épique inspirée de Skadi, déesse nordique de la chasse et des hivers glacials. Venue des terres de glace, elle montre une froide cruauté envers les criminels Espers. Ses compétences gèlent les ennemis et protègent les alliés avec des boucliers absorbants. Son ultime Bitter Cold World gèle toute l'équipe ennemie tout en conférant l'Immunité aux alliés — une combinaison dévastatrice en PvP qui neutralise l'ennemi au moment où votre équipe devient intouchable. Sa captain booste la DEF de toute l'équipe en Point War.",
    "relicBuild": {
      "primary": {"set4": "wind", "set2": "egide", "label": "Vent + Égide"},
      "alt": {"set4": "ecume", "set2": "sinueux", "label": "Écume + Sinueux"},
      "mainStats": {"ring": "PV%", "helmet": "PV% ou DEF%", "boots": "VIT"},
      "substats": ["VIT", "PV%", "DEF%", "Précision%"],
      "notes": "VIT primordiale pour geler l'ennemi avant qu'il agisse. L'Égide renforce toute l'équipe dès le début du combat. Précision importante pour garantir le Gel. Combo Immunité + Gel de son ultime nécessite d'agir en premier — maximiser la VIT."
    },
    "synergies": ["raven", "tiye", "gabrielle"],
    "modes": {"story": "B", "kronos": "B", "apep": "B", "fafnir": "B", "pvp": "A"},
    "captain": "Augmente la DEF de tous les alliés de 30% en Guerre des Points."
  },
  {
    "id": "taylor",
    "name": "Taylor",
    "image": "https://playdislyte.com/wp-content/uploads/2022/07/Taylor-Hercules.png",
    "divinity": "Hercule",
    "element": "shimmer",
    "role": "dps",
    "tier": "B",
    "rarity": 4,
    "description": "DPS Épique inspiré d'Hercule, héros légendaire de la mythologie grecque réputé pour sa force surhumaine et ses Douze Travaux. Sa mécanique signature Hero's Wrath lui accorde un tour supplémentaire après chaque kill ennemi tout en empêchant leur résurrection — il peut ainsi enchaîner les éliminations en cascade. Son ultime Soul Blast dispel les buffs ennemis et inflige des dégâts massifs après s'être boosté ATQ et Taux de Crit. Un solide nettoyeur contre les équipes à cibles fragiles multiples.",
    "relicBuild": {
      "primary": {"set4": "foudre", "set2": "lumiere", "label": "Foudre + Lumière"},
      "alt": {"set4": "guerre", "set2": "recurve", "label": "Guerre + Incandescence"},
      "mainStats": {"ring": "ATQ%", "helmet": "Dégâts Crit%", "boots": "ATQ%"},
      "substats": ["Taux de Crit ≥80%", "Dégâts Crit%", "ATQ%", "VIT"],
      "notes": "Son passif de tour supplémentaire sur kill nécessite des dégâts suffisants pour déclencher la cascade. Foudre maximise les Dégâts Crit pour les one-shots. Lumière confère l'Immunité en début de combat pour éviter d'être contrôlé avant d'agir."
    },
    "synergies": ["dhalia", "li-ling", "drew", "unas"],
    "modes": {"story": "B", "kronos": "C", "apep": "C", "fafnir": "B", "pvp": "B"},
    "captain": "Augmente les PV de tous les alliés de 30% en Holocomba."
  },
  {
    "id": "nick",
    "name": "Nick",
    "image": "https://playdislyte.com/wp-content/uploads/2022/08/Nick_avatar.png",
    "divinity": "Magni",
    "element": "inferno",
    "role": "controller",
    "tier": "A",
    "rarity": 4,
    "description": "Contrôleur Épique inspiré de Magni, fils de Thor et dieu de la force dans la mythologie nordique. Spécialiste du Silence et de l'allongement de cooldowns. Son S2 Landslide frappe 2 fois et allonge les CDs ennemis (tout en réduisant les siens en cas de succès). Son ultime Skyfall dissipe les boucliers ennemis, silence toute l'équipe adverse 2 tours et génère de la PA proportionnellement aux ennemis silenciés. Redoutable en PvP pour neutraliser les supports adverses et perturber leurs rotations de compétences.",
    "relicBuild": {
      "primary": {"set4": "wind", "set2": "sinueux", "label": "Vent + Sinueux"},
      "alt": {"set4": "ecume", "set2": "sylvestre", "label": "Écume + Sylvestre"},
      "mainStats": {"ring": "PV%", "helmet": "PV%", "boots": "VIT"},
      "substats": ["VIT", "Précision%", "PV%", "DEF%"],
      "notes": "Précision indispensable pour garantir les Silences — viser 60%+. Le set Vent maximise sa fréquence d'action pour cycler son ultime. Utile contre les équipes buff-lourdes en PvP grâce à la dissipation de boucliers de son ultime."
    },
    "synergies": ["raven", "jiang-jiuli", "triki"],
    "modes": {"story": "B", "kronos": "B", "apep": "B", "fafnir": "B", "pvp": "A"},
    "captain": null
  },
  {
    "id": "bai-liuli",
    "name": "Bai Liuli",
    "image": "https://playdislyte.com/wp-content/uploads/2022/01/Bai-Liuli-White-Snake.png",
    "divinity": "Serpent Blanc",
    "element": "shimmer",
    "role": "dps",
    "tier": "C",
    "rarity": 3,
    "description": "DPS Rare inspirée du Serpent Blanc (Bai She Jing), figure du folklore chinois symbolisant la loyauté et la transformation mystique. Protectrice de sa famille, Bai Liuli vole les buffs ennemis à chaque attaque et inflige Brûlure sur ses cibles. Son S2 dispel les debuffs des alliés et les soigne légèrement. Ses statistiques de base sont limitées par sa rareté 3 étoiles — à réserver aux débutants en manque de DPS ou aux collections complètes.",
    "relicBuild": {
      "primary": {"set4": "guerre", "set2": "recurve", "label": "Guerre + Incandescence"},
      "alt": {"set4": "wind", "set2": "recurve", "label": "Vent + Incandescence"},
      "mainStats": {"ring": "Dégâts Crit%", "helmet": "ATQ%", "boots": "ATQ% ou VIT"},
      "substats": ["Taux de Crit ≥80%", "Dégâts Crit%", "ATQ%", "VIT"],
      "notes": "Ses stats de base sont plafonnées par sa rareté 3 étoiles. Pour le vol de buffs, Raven (Odin) est bien supérieure. À utiliser uniquement si aucun meilleur DPS n'est disponible ou pour compléter sa collection."
    },
    "synergies": ["raven", "sander", "gabrielle"],
    "modes": {"story": "B", "kronos": "C", "apep": "B", "fafnir": "B", "pvp": "C"},
    "captain": null
  },
  {
    "id": "aurelius",
    "name": "Aurelius",
    "image": "https://playdislyte.com/wp-content/uploads/2022/07/Aurelius-Ullr-Avatar.png",
    "divinity": "Ullr",
    "element": "flow",
    "role": "dps",
    "tier": "A",
    "rarity": 4,
    "description": "DPS Épique inspiré d'Ullr, dieu nordique de la chasse et du ski, archer légendaire des hivers glacials. Spécialiste des dégâts amplifiés sur cibles gelées : Icicle Darts ralentit la cible, Icebreak Fury retire l'état Gelé pour infliger des dégâts bonus massifs, et son ultime Frost Glory gèle TOUTE l'équipe ennemie avant d'infliger des dégâts amplifiés sur les cibles gelées. Un combo Gel + Burst très efficace en Kronos et dans la Tour du Miracle.",
    "relicBuild": {
      "primary": {"set4": "guerre", "set2": "recurve", "label": "Guerre + Incandescence"},
      "alt": {"set4": "foudre", "set2": "recurve", "label": "Foudre + Incandescence"},
      "mainStats": {"ring": "ATQ% ou Taux de Crit%", "helmet": "ATQ%", "boots": "ATQ%"},
      "substats": ["Taux de Crit ≥80%", "Dégâts Crit%", "ATQ%", "VIT"],
      "notes": "Utiliser Frost Glory (gèle toute l'équipe) puis immédiatement Icebreak Fury sur la cible prioritaire pour un burst maximal. Synergise avec d'autres sources de Gel comme le set Givre. Excellent contre Kronos grâce à l'avantage Flow."
    },
    "synergies": ["sander", "li-ling", "ye-suhua", "chloe"],
    "modes": {"story": "B", "kronos": "A", "apep": "B", "fafnir": "B", "pvp": "B"},
    "captain": null
  },
  {
    "id": "kara",
    "name": "Kara",
    "image": "https://playdislyte.com/wp-content/uploads/2022/01/Kara-Serket.png",
    "divinity": "Serket",
    "element": "flow",
    "role": "debuffer",
    "tier": "C",
    "rarity": 4,
    "description": "Debuffeur Épique inspirée de Serket, déesse égyptienne des scorpions et du venin, protectrice contre les poisons. Toutes ses attaques infligent du Poison qui se cumule en effets de plus en plus dévastateurs. Son kit est entièrement axé sur les stacks de Poison — chaque coup empoisonne, les Poisons se combinent en Poison Grave, et sa compétence ultime soumet les cibles à des dégâts toxiques massifs. Excellente contre Flow Runner grâce à l'avantage élémentaire, mais limitée sur Kronos et en PvP.",
    "relicBuild": {
      "primary": {"set4": "wind", "set2": "sinueux", "label": "Vent + Sinueux"},
      "alt": {"set4": "wind", "set2": "enchanteur", "label": "Vent + Enchanteur"},
      "mainStats": {"ring": "PV%", "helmet": "Précision%", "boots": "PV% ou VIT"},
      "substats": ["VIT", "Précision%", "PV%", "DEF%"],
      "notes": "La Précision est critique pour garantir l'application de Poison sur chaque coup. L'Enchanteur prolonge la durée des Poisons de 1 tour. Synergise avec Jacob (Jörmungandr) pour le combo Poison → Pétrification sur Apep."
    },
    "synergies": ["jacob", "hyde", "fatum-sisters"],
    "modes": {"story": "B", "kronos": "C", "apep": "B", "fafnir": "B", "pvp": "C"},
    "captain": null
  },
  {
    "id": "jeanne",
    "name": "Jeanne",
    "image": "https://playdislyte.com/wp-content/uploads/2022/01/Jeanne-Gerd.png",
    "divinity": "Gerd",
    "element": "flow",
    "role": "controller",
    "tier": "A",
    "rarity": 3,
    "description": "Contrôleuse Rare inspirée de Gerd, jotunn (géante) de la mythologie nordique dont la beauté illuminait les cieux. Rebelle et libre comme le vent, Jeanne assomme les ennemis avec des Étourdissements puissants et absorbe leur PA grâce à ses compétences de contrôle. Son S2 Cool Rhythms frappe 3 cibles aléatoires avec 100% de chance d'Étourdissement et absorbe 30% de leur PA. Son ultime Beat Burst inflige des dégâts importants, dispel les buffs ennemis et les étourdit. Malgré sa rareté 3 étoiles, elle est compétitive en Fafnir et en PvP.",
    "relicBuild": {
      "primary": {"set4": "wind", "set2": "sinueux", "label": "Vent + Sinueux"},
      "alt": {"set4": "domination", "set2": "sylvestre", "label": "Domination + Sylvestre"},
      "mainStats": {"ring": "PV%", "helmet": "Précision%", "boots": "VIT"},
      "substats": ["VIT", "Précision%", "PV%", "DEF%"],
      "notes": "La Précision est fondamentale pour garantir les Étourdissements à 100%. VIT élevée pour agir en premier et déployer les contrôles avant les ennemis. Sa captain +20% Précision la rend utile même hors combat pour les équipes de contrôle."
    },
    "synergies": ["raven", "triki", "pritzker"],
    "modes": {"story": "B", "kronos": "B", "apep": "B", "fafnir": "A", "pvp": "A"},
    "captain": "Augmente la Précision de tous les alliés de 20%."
  },
  {
    "id": "chalmers",
    "name": "Chalmers",
    "image": "https://playdislyte.com/wp-content/uploads/2022/01/Chalmers-Idun.png",
    "divinity": "Idun",
    "element": "shimmer",
    "role": "dps",
    "tier": "S",
    "rarity": 3,
    "description": "DPS Rare d'exception inspiré d'Idun, déesse nordique de la jeunesse et des pommes dorées d'immortalité maintenant les dieux en vie. Malgré sa rareté 3 étoiles, Chalmers est S-tier sur Kronos et Apep. Sa mécanique signature Gold Pulse inflige des dégâts basés sur les PV maximum de l'ennemi, applique Bloqueur de Buff (empêche les nouveaux buffs) et Malade (réduit la DEF). Il sacrifie ses propres PV pour alimenter ses dégâts — à associer avec le Vol de Vie pour compenser. L'un des rares 3 étoiles véritablement compétitifs en end-game PvE.",
    "relicBuild": {
      "primary": {"set4": "en-bas", "set2": "sylvestre", "label": "Vol de Vie + Sylvestre"},
      "alt": {"set4": "guerre", "set2": "recurve", "label": "Guerre + Incandescence"},
      "mainStats": {"ring": "Dégâts Crit%", "helmet": "ATQ%", "boots": "ATQ% ou VIT"},
      "substats": ["Taux de Crit ≥80%", "Dégâts Crit%", "ATQ%", "VIT"],
      "notes": "Le Vol de Vie compense sa perte de PV auto-infligée et le rend quasi immortel en PvE. Gold Pulse scale sur les PV max ennemis — encore plus dévastateur sur les boss à hauts PV comme Kronos et Apep. Synergise avec les teams Kronos rapides autour de Sander."
    },
    "synergies": ["sander", "ye-suhua", "lin-xiao", "gabrielle"],
    "modes": {"story": "A", "kronos": "S", "apep": "S", "fafnir": "C", "pvp": "C"},
    "captain": null
  }
]
$$) AS t(e)
ON CONFLICT (id) DO NOTHING;
