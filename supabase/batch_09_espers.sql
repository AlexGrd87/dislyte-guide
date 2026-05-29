-- ═══════════════════════════════════════════════════════════════
-- BATCH 09 — 5 nouveaux espers (29 Mai 2026)
-- Emma, Mei, Ain, Uday, Ryota
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
    "id": "emma",
    "name": "Emma",
    "image": "https://static.wikia.nocookie.net/dislyte/images/7/73/Emma_avatar.png/revision/latest",
    "divinity": "Lapin de Jade",
    "element": "flow",
    "role": "dps",
    "tier": "B",
    "rarity": 4,
    "description": "DPS Aquatique Épique inspirée du Lapin de Jade, créature de la mythologie chinoise qui vit sur la Lune. Emma possède une synergie passif unique avec Heng Yue : chaque fois que Heng Yue est touchée, Emma contre-attaque avec un taux de 100%. Dans une équipe avec Pritzker ou Lucas pour le contrôle de zone, cette synergie crée une quantité massive de contre-attaques. Le set Domination (Tyranny) ajoute une chance d'Étourdissement supplémentaire.",
    "relicBuild": {
      "primary": {"set4": "domination", "set2": "wind", "label": "Domination + Vent"},
      "alt": {"set4": "domination", "set2": "avatara", "label": "Domination + Avatara"},
      "mainStats": {"ring": "ATQ%", "helmet": "ATQ%", "boots": "VIT"},
      "substats": ["Précision", "ATQ%", "VIT", "Taux de Crit"],
      "notes": "Domination pour le 20% de chance d'Étourdissement supplémentaire sur chaque frappe — dans un build contre-attaque avec Heng Yue, elle frappe des dizaines de fois. Précision pour fiabiliser les Étourdissements. Vent pour un maximum de tours."
    },
    "synergies": ["heng-yue", "pritzker", "lucas"],
    "modes": {"story": "B", "kronos": "C", "apep": "C", "fafnir": "C", "pvp": "B"},
    "captain": "Augmente l'ATQ de tous les alliés de 24%."
  },
  {
    "id": "mei",
    "name": "Mei",
    "image": "https://static.wikia.nocookie.net/dislyte/images/a/a1/Mei_avatar.png/revision/latest",
    "divinity": "Kaya-No-Hime",
    "element": "inferno",
    "role": "dps",
    "tier": "B",
    "rarity": 4,
    "description": "DPS Brasier Épique inspirée de Kaya-No-Hime, divinité japonaise de la végétation et des herbes. Mei est un DPS critique spécialisé contre les cibles sous debuffs, avec le set Calamité qui amplifie ses dégâts jusqu'à +35% contre les ennemis debuffés. Elle construit le set Voodoo Doll pour des effets additionnels. Bonne DPS Épique pour les joueurs mid-game cherchant une alternative accessible aux Légendaires.",
    "relicBuild": {
      "primary": {"set4": "foudre", "set2": "recurve", "label": "Foudre + Incandescence"},
      "alt": {"set4": "calamite", "set2": "recurve", "label": "Calamité + Incandescence"},
      "mainStats": {"ring": "Taux de Crit", "helmet": "ATQ%", "boots": "VIT"},
      "substats": ["Taux de Crit", "ATQ%", "Précision", "Dégâts Crit"],
      "notes": "Foudre pour le maximum de C.DMG. Alt Calamité pour les équipes avec debuffeurs (Lin Xiao, Ahmed...) — le bonus +35% contre cibles debuffées est puissant. Taux de Crit ≥ 80% avant d'investir en Dégâts Crit. Précision pour ses propres debuffs."
    },
    "synergies": ["gabrielle", "ahmed", "lin-xiao"],
    "modes": {"story": "B", "kronos": "B", "apep": "B", "fafnir": "C", "pvp": "B"},
    "captain": "Augmente l'ATQ de tous les alliés de 24%."
  },
  {
    "id": "ain",
    "name": "Ain",
    "image": "https://static.wikia.nocookie.net/dislyte/images/1/11/Ain_avatar.png/revision/latest",
    "divinity": "Ptah",
    "element": "wind",
    "role": "support",
    "tier": "B",
    "rarity": 4,
    "description": "Supporteuse Vent Épique inspirée de Ptah, dieu égyptien créateur et dieu des artisans. Ain est une bouclière qui scale sa protection sur ses propres PV : plus ses HP sont élevés, plus les boucliers qu'elle distribue à ses alliés sont puissants. Sa capacité Force Barrier (CD 3 tours max) fournit une protection significative à l'équipe. Sa captain +40% Résistance en PvP la rend utile comme capitaine défensive.",
    "relicBuild": {
      "primary": {"set4": "wind", "set2": "sylvestre", "label": "Vent + Sylvestre"},
      "alt": {"set4": "wind", "set2": "egide", "label": "Vent + Égide"},
      "mainStats": {"ring": "PV%", "helmet": "PV%", "boots": "VIT"},
      "substats": ["VIT", "PV%", "DEF%", "Précision"],
      "notes": "PV% partout pour maximiser la puissance des boucliers. Vent pour agir régulièrement et distribuer plus souvent ses protections. Sylvestre (+25% PV) amplifie directement sa mécanique principale. Précision pour les debuffs secondaires si applicable."
    },
    "synergies": ["gabrielle", "sander", "sally"],
    "modes": {"story": "B", "kronos": "B", "apep": "B", "fafnir": "B", "pvp": "A"},
    "captain": "Augmente la Résistance de tous les alliés de 40% en Guerre des Points et en Éliminatoire."
  },
  {
    "id": "uday",
    "name": "Uday",
    "image": "https://static.wikia.nocookie.net/dislyte/images/2/2b/Uday_avatar.png/revision/latest",
    "divinity": "Sopdet",
    "element": "shimmer",
    "role": "support",
    "tier": "B",
    "rarity": 4,
    "description": "Supporteuse Scintillante Épique inspirée de Sopdet, déesse égyptienne de l'étoile Sirius et annonciatrice des crues du Nil. Uday est une cleaneuse et buffeuse défensive : sa troisième capacité dissipe les debuffs de ses alliés tout en leur accordant des buffs de protection. Le set Égide lui permet de fournir des boucliers en début de combat à toute l'équipe. Sa captain +30% PV en fait un bon choix pour les modes PvE intenses.",
    "relicBuild": {
      "primary": {"set4": "wind", "set2": "egide", "label": "Vent + Égide"},
      "alt": {"set4": "wind", "set2": "avatara", "label": "Vent + Avatara"},
      "mainStats": {"ring": "PV%", "helmet": "PV%", "boots": "VIT"},
      "substats": ["VIT", "PV%", "Précision", "DEF%"],
      "notes": "Vent pour agir rapidement et nettoyer les debuffs alliés avant qu'ils fassent des dégâts. Égide pour les boucliers initiaux (+15% PV max à toute l'équipe). Précision pour que ses debuffs atterrissent. PV% pour maximiser sa survie et l'utilité de ses boucliers."
    },
    "synergies": ["gabrielle", "clara", "sally"],
    "modes": {"story": "B", "kronos": "B", "apep": "B", "fafnir": "B", "pvp": "B"},
    "captain": "Augmente les PV de tous les alliés de 30% en Miracle Rituel, Sonique, Terres Désolées et Chasse Sentinelle."
  },
  {
    "id": "ryota",
    "name": "Ryota",
    "image": "https://static.wikia.nocookie.net/dislyte/images/f/f5/Ryota_avatar.png/revision/latest",
    "divinity": "Inarinokami",
    "element": "inferno",
    "role": "support",
    "tier": "A",
    "rarity": 5,
    "description": "Supporteuse Brasier Légendaire inspirée d'Inarinokami, divinité japonaise des renards, de la fertilité et du riz. Ryota booste l'ATQ de ses coéquipiers lorsqu'ils sont sous l'effet de Furtivité (Stealth) — une mécanique rare et puissante. Dernier esper Légendaire ajouté au jeu (patch 3.4.27, Juillet 2025), elle représente le sommet des supports Brasier actuels. Ses synergies avec les espers capables de distribuer de la Furtivité la rendent redoutable.",
    "relicBuild": {
      "primary": {"set4": "wind", "set2": "sylvestre", "label": "Vent + Sylvestre"},
      "alt": {"set4": "ecume", "set2": "sylvestre", "label": "Écume + Sylvestre"},
      "mainStats": {"ring": "PV%", "helmet": "PV%", "boots": "VIT"},
      "substats": ["VIT", "PV%", "Précision", "DEF%"],
      "notes": "Vent pour agir en premier et distribuer Furtivité à ses alliés avant leurs tours. Sylvestre pour la survie. Écume en alt pour réduire les cooldowns et distribuer plus souvent ses buffs de Furtivité. VIT prioritaire pour maximiser ses actions."
    },
    "synergies": ["gabrielle", "sander", "sally"],
    "modes": {"story": "A", "kronos": "B", "apep": "B", "fafnir": "B", "pvp": "A"},
    "captain": null
  }
]
$$) AS t(e);
