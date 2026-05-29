-- ═══════════════════════════════════════════════════════════════
-- BATCH 06 — 9 nouveaux espers (29 Mai 2026)
-- Helena, Laura, Lauren, Layla, Li Ao, Q, Stewart, Unky Chai, Zelmer
-- Dernière fournée playdislyte.com — Sources images confirmées ✅
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
    "id": "helena",
    "name": "Helena",
    "image": "https://playdislyte.com/wp-content/uploads/2022/01/Helena-Helen.png",
    "divinity": "Hélène de Troie",
    "element": "inferno",
    "role": "healer",
    "tier": "C",
    "rarity": 3,
    "description": "Soigneuse Rare inspirée d'Hélène, la plus belle femme du monde de la mythologie grecque, dont l'enlèvement déclencha la Guerre de Troie. Helena soigne et booste le Taux de Critique de son équipe : son S2 Whispered Blessing soigne un allié pour 30% de ses PV max et les autres pour 15%, tout en accordant un buff de Taux de Crit à toute l'équipe. Solide pour Kronos grâce à ses soins et buffs offensifs, mais limitée dans les modes avancés par ses stats de rareté 3 étoiles.",
    "relicBuild": {
      "primary": {"set4": "panacee", "set2": "sylvestre", "label": "Panacée + Sylvestre"},
      "alt": {"set4": "panacee", "set2": "egide", "label": "Panacée + Égide"},
      "mainStats": {"ring": "PV%", "helmet": "PV% ou DEF%", "boots": "VIT ou PV%"},
      "substats": ["VIT", "PV%", "DEF%", "Résistance%"],
      "notes": "Panacée maximise l'efficacité de ses soins. VIT pour agir régulièrement et maintenir les soins. Stats plafonnées par la rareté 3 étoiles — à remplacer par Clara ou Meredith dès que possible en end-game."
    },
    "synergies": ["gabrielle", "sander", "lin-xiao"],
    "modes": {"story": "B", "kronos": "B", "apep": "C", "fafnir": "C", "pvp": "C"},
    "captain": null
  },
  {
    "id": "laura",
    "name": "Laura",
    "image": "https://playdislyte.com/wp-content/uploads/2022/05/Laura_avatar.png",
    "divinity": "Neith",
    "element": "shimmer",
    "role": "support",
    "tier": "S",
    "rarity": 4,
    "description": "Supporteuse Épique inspirée de Neith, déesse égyptienne de la guerre, de la chasse et de la sagesse. Sa mécanique passive Shield Defense est exceptionnelle : après chaque action d'un allié, elle lui accorde automatiquement un bouclier égal à 10% de ses PV max. Son ultime Iron Wall confère à toute l'équipe un bouclier massif (20% PV max, +25% si déjà bouclé) et une Résistance aux Critiques 2 tours. Sa compétence de base peut Silencier les ennemis. S-tier en PvP et Tour du Miracle grâce à sa protection passive permanente.",
    "relicBuild": {
      "primary": {"set4": "en-bas", "set2": "egide", "label": "Vol de Vie + Égide"},
      "alt": {"set4": "en-bas", "set2": "sylvestre", "label": "Vol de Vie + Sylvestre"},
      "mainStats": {"ring": "PV%", "helmet": "PV%", "boots": "PV% ou VIT"},
      "substats": ["PV%", "VIT", "DEF%", "Résistance%"],
      "notes": "Plus ses PV sont élevés, plus les boucliers passifs qu'elle distribue sont puissants. PV% partout pour maximiser cette synergie. Le Vol de Vie la maintient en vie sous les assauts. Sa captain +30% DEF en PvP est un atout défensif majeur."
    },
    "synergies": ["raven", "abigail", "gabrielle"],
    "modes": {"story": "A", "kronos": "A", "apep": "B", "fafnir": "B", "pvp": "S"},
    "captain": "Augmente la DEF de tous les alliés de 30% en Guerre des Points."
  },
  {
    "id": "lauren",
    "name": "Lauren",
    "image": "https://playdislyte.com/wp-content/uploads/2022/07/Lauren-Heket.png",
    "divinity": "Heket",
    "element": "shimmer",
    "role": "healer",
    "tier": "A",
    "rarity": 3,
    "description": "Soigneuse Rare inspirée d'Heket, déesse égyptienne de la fertilité et protectrice des nouveau-nés. Médecin compatissante de l'Union Esper, Lauren peut RESSUSCITER un allié tombé à 20% de ses PV max tout en gagnant un tour bonus pour elle-même. Son S2 soigne une cible et booste sa PA, et sa compétence de base peut réduire la VIT ennemie. Malgré sa rareté 3 étoiles, elle est S-tier dans la Tour du Miracle et A-tier sur Fafnir grâce à sa résurrection — une mécanique rare et précieuse.",
    "relicBuild": {
      "primary": {"set4": "panacee", "set2": "sylvestre", "label": "Panacée + Sylvestre"},
      "alt": {"set4": "ecume", "set2": "sylvestre", "label": "Écume + Sylvestre"},
      "mainStats": {"ring": "PV%", "helmet": "PV%", "boots": "VIT"},
      "substats": ["VIT", "PV%", "DEF%", "Résistance%"],
      "notes": "VIT élevée pour agir avant les coups mortels et lancer la résurrection en urgence. Panacée booste ses soins réguliers. L'Écume réduit le CD de sa résurrection pour pouvoir l'utiliser plus d'une fois par combat long."
    },
    "synergies": ["heng-yue", "asenath", "gabrielle"],
    "modes": {"story": "B", "kronos": "B", "apep": "B", "fafnir": "A", "pvp": "B"},
    "captain": null
  },
  {
    "id": "layla",
    "name": "Layla",
    "image": "https://playdislyte.com/wp-content/uploads/2022/07/Layla-Medjed.png",
    "divinity": "Medjed",
    "element": "inferno",
    "role": "debuffer",
    "tier": "C",
    "rarity": 3,
    "description": "Debuffeur Rare inspirée de Medjed, mystérieuse entité divine de la mythologie égyptienne surnommée celui qui frappe. Praticienne errante de la magie noire, Layla manipule les poisons et les debuffs. Son S2 Berserker Ray transfère 1 debuff de chaque allié vers un ennemi, lui inflige Malade 2 tours et des dégâts bonus si déjà empoisonné. Son ultime Gaze of the True Gods frappe toute l'équipe ennemie deux fois avec Poison garanti 3 tours. Utile en niche Poison, limitée en end-game par ses stats de rareté 3 étoiles.",
    "relicBuild": {
      "primary": {"set4": "wind", "set2": "sinueux", "label": "Vent + Sinueux"},
      "alt": {"set4": "domination", "set2": "sylvestre", "label": "Domination + Sylvestre"},
      "mainStats": {"ring": "PV%", "helmet": "Précision%", "boots": "VIT"},
      "substats": ["VIT", "Précision%", "PV%", "DEF%"],
      "notes": "Précision pour garantir l'application de Poison. Le transfert de debuffs de son S2 peut être utile en PvP défensif pour retourner les debuffs ennemis contre eux. Synergise avec Kara et Jacob pour les combos Poison."
    },
    "synergies": ["kara", "jacob", "hyde"],
    "modes": {"story": "B", "kronos": "C", "apep": "C", "fafnir": "B", "pvp": "C"},
    "captain": null
  },
  {
    "id": "li-ao",
    "name": "Li Ao",
    "image": "https://playdislyte.com/wp-content/uploads/2022/07/Li-Ao-Tao-Tie.png",
    "divinity": "Tao Tie",
    "element": "inferno",
    "role": "controller",
    "tier": "C",
    "rarity": 3,
    "description": "Contrôleur Rare incarnant Tao Tie, créature féroce de la mythologie chinoise symbolisant la gloutonnerie insatiable. Ex-mangeur de stress compulsif, Li Ao a trouvé un alter ego parfait en Tao Tie. Sa compétence Uncaged Beast applique Devour — un debuff rare qui empêche la cible de soigner et dure plus longtemps selon ses PV max. Son S2 Binge dispel les buffs ennemis tout en se soignant lui-même. Sa compétence de base peut Provoquer la cible avec 60% de chance. Utile en PvP pour empêcher les soins adverses.",
    "relicBuild": {
      "primary": {"set4": "wind", "set2": "sylvestre", "label": "Vent + Sylvestre"},
      "alt": {"set4": "ecume", "set2": "sylvestre", "label": "Écume + Sylvestre"},
      "mainStats": {"ring": "PV%", "helmet": "PV% ou Précision%", "boots": "VIT"},
      "substats": ["VIT", "PV%", "Précision%", "DEF%"],
      "notes": "Précision améliore la fiabilité de Devour. VIT pour agir avant les soigneurs ennemis et couper leur soin en premier. Ecume réduit le CD de son Devour pour l'appliquer plus souvent. Stats limitées par la rareté 3 étoiles."
    },
    "synergies": ["triki", "raven", "jiang-jiuli"],
    "modes": {"story": "B", "kronos": "C", "apep": "C", "fafnir": "B", "pvp": "B"},
    "captain": null
  },
  {
    "id": "q",
    "name": "Q",
    "image": "https://playdislyte.com/wp-content/uploads/2022/01/Q-Cupid.png",
    "divinity": "Éros",
    "element": "shimmer",
    "role": "debuffer",
    "tier": "A",
    "rarity": 3,
    "description": "Debuffeur Rare inspiré d'Éros, dieu grec de l'amour, fils d'Aphrodite dont les flèches enflammaient les passions. Impossible d'échapper à sa notoriété, Q possède une mécanique unique : son ultime Joke of the Aether frappe 2 cibles en infligeant Link 2 tours — les ennemis liés partagent les dégâts reçus entre eux. Ses autres compétences infligent Réduction d'ATQ et Réduction de DEF. Malgré sa rareté 3 étoiles, il est A-tier sur Kronos et Apep grâce à l'amplification des dégâts que le Link procure à toute l'équipe.",
    "relicBuild": {
      "primary": {"set4": "wind", "set2": "sinueux", "label": "Vent + Sinueux"},
      "alt": {"set4": "guerre", "set2": "recurve", "label": "Guerre + Incandescence"},
      "mainStats": {"ring": "PV%", "helmet": "Précision%", "boots": "VIT"},
      "substats": ["VIT", "Précision%", "PV%", "DEF%"],
      "notes": "Précision garantit ses debuffs ATQ/DEF Down. Le Link est dévastateur couplé à des attaques AoE — tous les dégâts infligés à une cible liée se répliquent sur l'autre. Synergise avec Tang Yun (attaques de poursuite) pour multiplier les dégâts partagés."
    },
    "synergies": ["berenice", "tang-yun", "lu-yi"],
    "modes": {"story": "B", "kronos": "A", "apep": "A", "fafnir": "B", "pvp": "C"},
    "captain": null
  },
  {
    "id": "stewart",
    "name": "Stewart",
    "image": "https://playdislyte.com/wp-content/uploads/2022/06/stewart-dionysus.png",
    "divinity": "Dionysos",
    "element": "inferno",
    "role": "dps",
    "tier": "S",
    "rarity": 4,
    "description": "DPS Épique inspiré de Dionysos, dieu grec du vin, de la fête et de la folie, libérateur des inhibitions. Stewart est un DPS cible unique parmi les meilleurs sur Apep. Son ultime Time Vortex inflige des dégâts massifs en consommant 25% de ses PV courants — une mécanique haut risque / haute récompense qui délivre des dégâts vrais supplémentaires sur coups critiques. Son S2 Soundly Dreams applique Sommeil 2 tours si la cible tombe sous 70% PV. SS-tier sur Apep, fort sur Kronos — sa captain +24% ATQ booste toute l'équipe.",
    "relicBuild": {
      "primary": {"set4": "foudre", "set2": "recurve", "label": "Foudre + Incandescence"},
      "alt": {"set4": "guerre", "set2": "recurve", "label": "Guerre + Incandescence"},
      "mainStats": {"ring": "ATQ%", "helmet": "ATQ%", "boots": "VIT"},
      "substats": ["Taux de Crit ≥80%", "Dégâts Crit%", "ATQ%", "VIT"],
      "notes": "Time Vortex coûte 25% de ses PV courants à chaque utilisation — associer avec un soigneur ou le set Vol de Vie pour tenir en combat. Sur Apep, le Sommeil + dégâts bruts est une combinaison dévastatrice. Sa captain +24% ATQ profite à tous les DPS de l'équipe."
    },
    "synergies": ["gabrielle", "sander", "sally"],
    "modes": {"story": "A", "kronos": "A", "apep": "S", "fafnir": "B", "pvp": "B"},
    "captain": "Augmente l'ATQ de tous les alliés de 24%."
  },
  {
    "id": "unky-chai",
    "name": "Unky Chai",
    "image": "https://playdislyte.com/wp-content/uploads/2022/07/Unky_Chai_avatar.png",
    "divinity": "Yue Lao",
    "element": "inferno",
    "role": "support",
    "tier": "A",
    "rarity": 3,
    "description": "Supporteur Rare inspiré de Yue Lao, le Vieillard de la Lune de la mythologie chinoise qui lie les destins amoureux avec un fil rouge invisible. Remarquable vieillard à l'esprit jeune, Unky Chai booste son équipe avec des buffs offensifs et réduit leurs cooldowns. Son ultime Ropes of Destiny confère Hausse d'ATQ à toute l'équipe 2 tours et réduit leurs CDs si le buff ATQ est déjà actif. Malgré sa rareté 3 étoiles, il est A-tier sur Kronos et Apep. Sa captain booste les PV de toute l'équipe.",
    "relicBuild": {
      "primary": {"set4": "ecume", "set2": "egide", "label": "Écume + Égide"},
      "alt": {"set4": "wind", "set2": "sylvestre", "label": "Vent + Sylvestre"},
      "mainStats": {"ring": "PV%", "helmet": "PV% ou DEF%", "boots": "VIT"},
      "substats": ["VIT", "PV%", "DEF%", "Résistance%"],
      "notes": "L'Écume lui permet de cycler son ultime plus souvent pour maintenir la Hausse d'ATQ en permanence. VIT élevée pour agir souvent et distribuer les buffs avant les attaques ennemies. Bon support secondaire dans les équipes Kronos et Apep."
    },
    "synergies": ["sander", "lin-xiao", "li-ling"],
    "modes": {"story": "B", "kronos": "A", "apep": "A", "fafnir": "B", "pvp": "B"},
    "captain": "Augmente les PV de tous les alliés de 18%."
  },
  {
    "id": "zelmer",
    "name": "Zelmer",
    "image": "https://playdislyte.com/wp-content/uploads/2022/01/Zelmer-Sekhmet.png",
    "divinity": "Sekhmet",
    "element": "wind",
    "role": "dps",
    "tier": "A",
    "rarity": 3,
    "description": "DPS Rare inspirée de Sekhmet, déesse égyptienne de la guerre et de la destruction représentée avec une tête de lionne, dont la fureur pouvait dévaster l'humanité entière. Zelmer décuple ses dégâts contre les ennemis affaiblis : son ultime Scarlet Tides inflige 250% d'ATQ et gagne +20% de dégâts bonus par debuff présent sur la cible (jusqu'à +120%). Ses compétences appliquent Réduction de DEF et Saignement pour préparer le terrain. Malgré sa rareté 3 étoiles, elle est SS-tier sur Fafnir et A-tier sur Apep.",
    "relicBuild": {
      "primary": {"set4": "calamite", "set2": "recurve", "label": "Calamité + Incandescence"},
      "alt": {"set4": "guerre", "set2": "recurve", "label": "Guerre + Incandescence"},
      "mainStats": {"ring": "Dégâts Crit%", "helmet": "ATQ%", "boots": "ATQ% ou VIT"},
      "substats": ["Taux de Crit ≥80%", "Dégâts Crit%", "ATQ%", "VIT"],
      "notes": "Calamité (+20% dégâts vs cibles avec debuff) est son set parfait — sa mécanique native de bonus par debuff se cumule avec Calamité pour des dégâts exponentiels. Associer avec Berenice (Réduction de DEF) pour maximiser les stacks de bonus sur son ultime."
    },
    "synergies": ["berenice", "ahmed", "dhalia"],
    "modes": {"story": "A", "kronos": "C", "apep": "A", "fafnir": "S", "pvp": "B"},
    "captain": null
  }
]
$$) AS t(e)
ON CONFLICT (id) DO NOTHING;
