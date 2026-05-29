-- ═══════════════════════════════════════════════════════════════
-- BATCH 03 — 10 nouveaux espers (29 Mai 2026)
-- Elliot, Lewis, Fatum Sisters, Luo Yan, Pritzker, Celine,
-- Kaylee, Eira, Jacob, Zhong Nan
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
    "id": "elliot",
    "name": "Elliot",
    "image": "https://playdislyte.com/wp-content/uploads/2022/09/Elliot_avatar.png",
    "divinity": "Thoth",
    "element": "inferno",
    "role": "controller",
    "tier": "S",
    "rarity": 5,
    "description": "Contrôleur Légendaire inspiré de Thoth, dieu égyptien de la sagesse et de l'écriture. Son ultime dévastateur dissipe TOUS les buffs d'un ennemi ciblé et remet tous ses cooldowns au maximum — une mécanique qui annihile les Espers dépendants de leurs compétences. Son S2 frappe 3 fois avec chance de Provocation et lui confère un bouclier. Sa compétence de base peut provoquer les ennemis. Incontournable en PvP contre les supports et les Espers à CD critiques.",
    "relicBuild": {
      "primary": {"set4": "ecume", "set2": "egide", "label": "Écume + Égide"},
      "alt": {"set4": "wind", "set2": "sylvestre", "label": "Vent + Sylvestre"},
      "mainStats": {"ring": "PV%", "helmet": "PV%", "boots": "VIT"},
      "substats": ["VIT", "PV%", "DEF%", "Résistance%"],
      "notes": "Son S3 dissipe et allonge les CDs peu importe la résistance — pas besoin de Précision. Maximiser VIT pour agir souvent. L'Écume réduit ses propres CDs pour cycler son ultime plus vite."
    },
    "synergies": ["raven", "triki", "jiang-jiuli"],
    "modes": {"story": "S", "kronos": "B", "apep": "A", "fafnir": "B", "pvp": "S"},
    "captain": "Augmente les PV de tous les alliés de 40% en Holocomba."
  },
  {
    "id": "lewis",
    "name": "Lewis",
    "image": "https://playdislyte.com/wp-content/uploads/2022/01/Lewis-Ares.png",
    "divinity": "Arès",
    "element": "inferno",
    "role": "dps",
    "tier": "S",
    "rarity": 5,
    "description": "DPS Légendaire inspiré d'Arès, dieu grec de la guerre. Spécialiste du DPS cible unique avec auto-soin sur coups critiques. Son ultime Fire Palm triple frappe scale avec les PV perdus de l'ennemi — plus la cible est affaiblie, plus les dégâts explosent. En tuant une cible, réinitialise tous ses cooldowns et gagne Invincibilité pour enchaîner les kills. L'un des 3 Espers garantis au démarrage via le pool débutant.",
    "relicBuild": {
      "primary": {"set4": "foudre", "set2": "recurve", "label": "Foudre + Incandescence"},
      "alt": {"set4": "war", "set2": "recurve", "label": "Guerre + Incandescence"},
      "mainStats": {"ring": "Dégâts Crit%", "helmet": "ATQ%", "boots": "ATQ%"},
      "substats": ["Taux de Crit ≥80%", "Dégâts Crit%", "ATQ%", "VIT"],
      "notes": "DPS cible unique classique. Son passif de soin lui permet de tenir en combat. Sa réinitialisation de CD + Invincibilité sur kill le rend dévastateur contre des équipes avec plusieurs cibles fragiles."
    },
    "synergies": ["gabrielle", "sander", "sally"],
    "modes": {"story": "B", "kronos": "S", "apep": "B", "fafnir": "A", "pvp": "S"},
    "captain": "Augmente le Taux de Critique de tous les alliés de 20%."
  },
  {
    "id": "fatum-sisters",
    "name": "Fatum Sisters",
    "image": "https://playdislyte.com/wp-content/uploads/2022/12/Fatum_Sisters_avatar.png",
    "divinity": "Nornir",
    "element": "flow",
    "role": "ap-controller",
    "tier": "S",
    "rarity": 5,
    "description": "Support/CPA Légendaire incarnant les trois Nornir (Urd, Verdandi, Skuld), tisseuses du destin de la mythologie nordique — triple personnalité unique dans le jeu. Leur compétence de base réduit la PA ennemie de 20%. Leur S2 soigne toute l'équipe (18% PV max), dispel les debuffs d'un allié, lui accorde Invincibilité 1 tour et Hausse de VIT à tous. Leur ultime frappe 2 fois AoE, réduit la PA ennemie (−20%, voire −40% si leur VIT dépasse celle des ennemis), et accorde DEF Up à l'équipe 3 tours.",
    "relicBuild": {
      "primary": {"set4": "wind", "set2": "egide", "label": "Vent + Égide"},
      "alt": {"set4": "wind", "set2": "lumiere", "label": "Vent + Lumière"},
      "mainStats": {"ring": "PV%", "helmet": "PV% ou DEF%", "boots": "VIT"},
      "substats": ["VIT", "PV%", "DEF%", "Résistance%"],
      "notes": "VIT primordiale — leur ultime double sa réduction de PA si leur VIT dépasse celle des ennemis. L'Égide renforce l'équipe dès le début du combat. Priorité VIT absolue avant tout autre stat."
    },
    "synergies": ["sander", "tiye", "lucas"],
    "modes": {"story": "A", "kronos": "S", "apep": "S", "fafnir": "B", "pvp": "S"},
    "captain": "Augmente la VIT de tous les alliés de 35% en Miracle Rituel, Miracle Sonique, Terres Désolées et Chasse Sentinelle."
  },
  {
    "id": "luo-yan",
    "name": "Luo Yan",
    "image": "https://playdislyte.com/wp-content/uploads/2022/01/Luo-Yan-Yanluo-Wang.png",
    "divinity": "Yanluo Wang",
    "element": "wind",
    "role": "support",
    "tier": "S",
    "rarity": 4,
    "description": "Support/Soigneur Épique inspiré de Yanluo Wang, roi des Enfers et juge des âmes de la mythologie chinoise. Sa mécanique signature réduit le plafond de PV max d'un ennemi de 30% de façon permanente — un affaiblissement non dissipable en combat. Son S2 ressuscite un allié tombé et lui accorde Récupération + Hausse d'ATQ. Son ultime attaque tous les ennemis et soigne l'équipe. Redoutable en défense PvP grâce à sa résurrection qui surprend les adversaires.",
    "relicBuild": {
      "primary": {"set4": "panacee", "set2": "sylvestre", "label": "Panacée + Sylvestre"},
      "alt": {"set4": "wind", "set2": "sylvestre", "label": "Vent + Sylvestre"},
      "mainStats": {"ring": "PV%", "helmet": "PV%", "boots": "VIT"},
      "substats": ["VIT", "PV%", "DEF%", "Précision%"],
      "notes": "La Précision améliore la fiabilité de la réduction de PV max. Panacée maximise l'efficacité de soin et de résurrection. VIT élevée pour agir avant l'adversaire et effectuer des résurrections préventives."
    },
    "synergies": ["gabrielle", "ren-si", "donar"],
    "modes": {"story": "B", "kronos": "B", "apep": "B", "fafnir": "A", "pvp": "S"},
    "captain": null
  },
  {
    "id": "pritzker",
    "name": "Pritzker",
    "image": "https://playdislyte.com/wp-content/uploads/2022/01/Pritzker-Mimir.png",
    "divinity": "Mimir",
    "element": "inferno",
    "role": "controller",
    "tier": "S",
    "rarity": 4,
    "description": "Contrôleur Épique inspiré de Mimir, l'omniscient gardien du puits de sagesse de la mythologie nordique. Spécialiste de l'Étourdissement AoE : son ultime frappe toute l'équipe ennemie avec 93% de chance d'Étourdissement en zone, puis allonge tous leurs cooldowns au maximum. Ses autres compétences offrent également des étourdissements ciblés. L'un des meilleurs contrôleurs Épiques du jeu — redoutable en Kronos pour paralyser le boss et en PvE wave.",
    "relicBuild": {
      "primary": {"set4": "wind", "set2": "egide", "label": "Vent + Égide"},
      "alt": {"set4": "domination", "set2": "sylvestre", "label": "Domination + Sylvestre"},
      "mainStats": {"ring": "PV%", "helmet": "DEF%", "boots": "VIT"},
      "substats": ["VIT", "Précision%", "PV%", "DEF%"],
      "notes": "La Précision est cruciale pour fiabiliser les Étourdissements — viser 60%+. Le set Vent permet de cycler son ultime. La Domination ajoute une chance d'Étourdissement supplémentaire à chaque coup."
    },
    "synergies": ["sander", "tiye", "lucas"],
    "modes": {"story": "S", "kronos": "S", "apep": "A", "fafnir": "B", "pvp": "A"},
    "captain": "Augmente la VIT de tous les alliés de 25% en Holocomba."
  },
  {
    "id": "celine",
    "name": "Celine",
    "image": "https://playdislyte.com/wp-content/uploads/2022/01/Celine-Siren.png",
    "divinity": "Siren",
    "element": "flow",
    "role": "controller",
    "tier": "S",
    "rarity": 4,
    "description": "Contrôleuse Épique inspirée de la Sirène, créature aquatique dont le chant envoûtait les marins de la mythologie grecque. Spécialiste du Sommeil : ses compétences plongent les ennemis en Sommeil mono-cible ou en zone, les immobilisant jusqu'aux prochains dégâts reçus. Sa manipulation de PA permet de retarder significativement les tours ennemis. Particulièrement redoutable en Kronos et en PvP grâce à ses contrôles fiables.",
    "relicBuild": {
      "primary": {"set4": "wind", "set2": "egide", "label": "Vent + Égide"},
      "alt": {"set4": "givre", "set2": "sylvestre", "label": "Givre + Sylvestre"},
      "mainStats": {"ring": "PV%", "helmet": "DEF%", "boots": "VIT"},
      "substats": ["VIT", "Précision%", "PV%", "DEF%"],
      "notes": "La Précision est cruciale pour fiabiliser ses Sommeils. Le Sommeil est brisé par les dégâts — en PvP, ne pas attaquer une cible endormie. Le set Vent est primordial pour agir avant les ennemis et poser les contrôles en premier."
    },
    "synergies": ["tiye", "fatum-sisters", "lucas"],
    "modes": {"story": "B", "kronos": "S", "apep": "A", "fafnir": "B", "pvp": "S"},
    "captain": null
  },
  {
    "id": "kaylee",
    "name": "Kaylee",
    "image": "https://playdislyte.com/wp-content/uploads/2022/07/Kaylee-Anuket.png",
    "divinity": "Anuket",
    "element": "flow",
    "role": "controller",
    "tier": "A",
    "rarity": 4,
    "description": "Contrôleuse Épique inspirée d'Anuket, déesse égyptienne du Nil dont le souffle fertilisait les vallées. Ses compétences se décuplent sur les coups critiques : Criss Cross frappe 3 fois avec 50% de chance d'absorption de PA (15%) et SPD Down sur critique, Dance of Deluge accorde Taux de Critique à l'équipe, frappe 3 fois AoE et gèle les cibles critées (40%). Sa captain booste le Taux de Critique de l'équipe — utile pour toutes les compositions offensives.",
    "relicBuild": {
      "primary": {"set4": "wind", "set2": "recurve", "label": "Vent + Incandescence"},
      "alt": {"set4": "givre", "set2": "recurve", "label": "Givre + Incandescence"},
      "mainStats": {"ring": "PV%", "helmet": "DEF%", "boots": "VIT"},
      "substats": ["VIT", "Taux de Crit ≥70%", "Précision%", "PV%"],
      "notes": "Le Taux de Crit est fondamental — tout son kit se débloque sur les critiques. Le set Givre ajoute une chance de Gel supplémentaire. Vent + Incandescence lui permet d'agir souvent et de déclencher ses effets de crit régulièrement."
    },
    "synergies": ["sander", "tiye", "lucas"],
    "modes": {"story": "B", "kronos": "S", "apep": "A", "fafnir": "B", "pvp": "A"},
    "captain": "Augmente le Taux de Critique de tous les alliés de 20%."
  },
  {
    "id": "eira",
    "name": "Eira",
    "image": "https://playdislyte.com/wp-content/uploads/2022/01/Eira-Freya.png",
    "divinity": "Freya",
    "element": "flow",
    "role": "support",
    "tier": "A",
    "rarity": 4,
    "description": "Supporteuse Épique inspirée de Freya, déesse nordique de l'amour, de la beauté et de la guerre. Son S2 Divine Love dispel les debuffs d'un allié, réduit ses cooldowns d'1 tour et lui confère Brisingamen's Watch — un buff unique qui accorde 15% de PA après chaque tour allié. Son ultime Seabreeze Sonata attaque tous les ennemis (SPD Down 2T + PA −30%) et réinitialise automatiquement le CD de Divine Love pour enchaîner les cleanses. Polyvalente et solide dans la plupart des modes.",
    "relicBuild": {
      "primary": {"set4": "ecume", "set2": "egide", "label": "Écume + Égide"},
      "alt": {"set4": "wind", "set2": "sylvestre", "label": "Vent + Sylvestre"},
      "mainStats": {"ring": "PV%", "helmet": "PV%", "boots": "VIT"},
      "substats": ["VIT", "PV%", "DEF%", "Résistance%"],
      "notes": "L'Écume lui permet de recycler Divine Love encore plus vite grâce à la réduction de CD en début de tour. La réinitialisation automatique de son S2 après l'ultime est sa mécanique clé — VIT maximale pour l'exploiter en premier."
    },
    "synergies": ["gabrielle", "sally", "chang-pu"],
    "modes": {"story": "A", "kronos": "A", "apep": "A", "fafnir": "A", "pvp": "S"},
    "captain": "Augmente l'ATQ de tous les alliés de 24%."
  },
  {
    "id": "jacob",
    "name": "Jacob",
    "image": "https://playdislyte.com/wp-content/uploads/2022/01/Jacob-Jormungand.png",
    "divinity": "Jörmungandr",
    "element": "wind",
    "role": "controller",
    "tier": "A",
    "rarity": 4,
    "description": "Contrôleur Épique inspiré de Jörmungandr, le Serpent du Milieu de la mythologie nordique qui encercle le monde entier. Maître du Poison et de la Pétrification. Son S2 Entoxification accorde Crocs (Fangs) à toute l'équipe — les ennemis qui attaquent les alliés ont une chance d'être Empoisonnés, et les porteurs de Crocs sont immunisés au Poison. Son ultime Poussière à Poussière frappe AoE avec Poison, et si la cible est déjà Empoisonnée ou reçoit le Poison, elle est aussitôt Pétrifiée. Excellent contre Apep grâce à la synergie poison.",
    "relicBuild": {
      "primary": {"set4": "wind", "set2": "enchanteur", "label": "Vent + Enchanteur"},
      "alt": {"set4": "domination", "set2": "sylvestre", "label": "Domination + Sylvestre"},
      "mainStats": {"ring": "PV%", "helmet": "DEF%", "boots": "VIT"},
      "substats": ["VIT", "Précision%", "PV%", "DEF%"],
      "notes": "La Précision est cruciale pour fiabiliser Poison et Pétrification. L'Enchanteur prolonge les Poisons d'1 tour supplémentaire. Maximiser la VIT pour jouer Entoxification en premier et distribuer Crocs avant que les ennemis attaquent."
    },
    "synergies": ["sander", "tiye", "chang-pu"],
    "modes": {"story": "B", "kronos": "B", "apep": "S", "fafnir": "B", "pvp": "A"},
    "captain": null
  },
  {
    "id": "zhong-nan",
    "name": "Zhong Nan",
    "image": "https://playdislyte.com/wp-content/uploads/2022/09/Zhong_Nan_avatar.png",
    "divinity": "Zhong Kui",
    "element": "shimmer",
    "role": "controller",
    "tier": "A",
    "rarity": 4,
    "description": "Contrôleur Épique inspiré de Zhong Kui, le grand exorciste chasseur de démons de la mythologie chinoise. Spécialiste du Silence : sa compétence de base frappe avec 70% de chance de Silence 1 tour, son S2 Abjure le Mal frappe 2 fois (dispel 1 buff + gagne 20% de PA par coup), et son ultime Justice Céleste Silence AoE tous les ennemis 2 tours et allonge leurs cooldowns si déjà Silenciés. Sa captain booste massivement la Précision en Guerre des Points pour garantir que ses contrôles atterrissent en PvP.",
    "relicBuild": {
      "primary": {"set4": "wind", "set2": "sinueux", "label": "Vent + Sinueux"},
      "alt": {"set4": "domination", "set2": "sylvestre", "label": "Domination + Sylvestre"},
      "mainStats": {"ring": "PV%", "helmet": "DEF%", "boots": "VIT"},
      "substats": ["VIT", "Précision%", "PV%", "DEF%"],
      "notes": "La Précision est essentielle pour fiabiliser les Silences. Le set Sinueux (+25% Précision) est idéal. Son S2 qui dispel + gagne de la PA le rend polyvalent — il perturbe les buffs ennemis tout en accélérant ses propres tours."
    },
    "synergies": ["raven", "jiang-jiuli", "triki"],
    "modes": {"story": "B", "kronos": "A", "apep": "A", "fafnir": "B", "pvp": "S"},
    "captain": "Augmente la Précision de tous les alliés de 40% en Guerre des Points."
  }
]
$$) AS t(e)
ON CONFLICT (id) DO NOTHING;
