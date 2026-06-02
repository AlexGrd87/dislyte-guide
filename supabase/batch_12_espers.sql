-- ═══════════════════════════════════════════════════════════════
-- BATCH 12 — 10 espers A tier (30 Mai 2026)
-- Leo, Yi An, Ossana, Ming Shuo, Elif, Nathaniel, Sakura, Yukine, Hailey, Jin-Hee
-- ⚠️ Jin-Hee : précédemment 404 — nouvelle URL calculée à confirmer
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
    "id": "leo",
    "name": "Leo",
    "image": "https://static.wikia.nocookie.net/dislyte/images/8/8e/Fu_Shi_avatar.png/revision/latest",
    "divinity": "Suan Ni",
    "element": "inferno",
    "role": "dps",
    "tier": "A",
    "rarity": 5,
    "description": "DPS Brasier Légendaire inspiré de Suan Ni, lion-dragon de la mythologie chinoise. Leo excelle en ciblage unique avec des attaques à haut multiplicateur et des mécaniques de poursuite. Solide en boss mono-cible comme Kronos.",
    "relicBuild": {
      "primary": {"set4": "foudre", "set2": "recurve", "label": "Foudre + Incandescence"},
      "alt": {"set4": "war", "set2": "recurve", "label": "Guerre + Incandescence"},
      "mainStats": {"ring": "Taux de Crit", "helmet": "ATQ%", "boots": "VIT"},
      "substats": ["Taux de Crit", "ATQ%", "Dégâts Crit", "VIT"],
      "notes": "Foudre maximise les dégâts boss (+30% C.DMG vs boss). Taux de Crit ≥ 80% avant d'investir en Dégâts Crit."
    },
    "synergies": ["gabrielle", "sander", "tiye"],
    "modes": {"story": "A", "kronos": "S", "apep": "B", "fafnir": "A", "pvp": "A"},
    "captain": null
  },
  {
    "id": "yi-an",
    "name": "Yi An",
    "image": "https://static.wikia.nocookie.net/dislyte/images/8/8a/Yi_An_avatar.png/revision/latest",
    "divinity": "Shennong",
    "element": "shimmer",
    "role": "healer",
    "tier": "A",
    "rarity": 5,
    "description": "Soigneur Scintillant Légendaire inspiré de Shennong, dieu chinois de l'agriculture et de la médecine. Yi An soigne ses alliés via Rebloom, transfère les debuffs ennemis, réduit massivement les dégâts reçus, accélère les jauges de PA et renforce le combat avec ses buffs d'amélioration en combat.",
    "relicBuild": {
      "primary": {"set4": "panacee", "set2": "sylvestre", "label": "Panacée + Sylvestre"},
      "alt": {"set4": "wind", "set2": "sylvestre", "label": "Vent + Sylvestre"},
      "mainStats": {"ring": "PV%", "helmet": "VIT", "boots": "VIT"},
      "substats": ["VIT", "PV%", "DEF%", "Résistance"],
      "notes": "Panacée (+30% efficacité soins) pour maximiser les soins Rebloom. VIT haute pour agir souvent et soigner régulièrement."
    },
    "synergies": ["gabrielle", "yu-jing", "lu-shang"],
    "modes": {"story": "S", "kronos": "S", "apep": "S", "fafnir": "A", "pvp": "A"},
    "captain": null
  },
  {
    "id": "ossana",
    "name": "Ossana",
    "image": "https://static.wikia.nocookie.net/dislyte/images/4/49/Ossana_avatar.png/revision/latest",
    "divinity": "Xipe Totec",
    "element": "inferno",
    "role": "dps",
    "tier": "A",
    "rarity": 5,
    "description": "DPS Brasier Légendaire inspirée de Xipe Totec, dieu aztèque du renouveau et de la saison des pluies. Ossana accumule des stacks de Saignement et Phantom Pain, ignore la résistance ennemie et enchaîne des attaques basées sur les stacks de saignement. Redoutable contre les boss avec beaucoup de PV.",
    "relicBuild": {
      "primary": {"set4": "calamite", "set2": "enchanteur", "label": "Calamité + Enchanteur"},
      "alt": {"set4": "war", "set2": "recurve", "label": "Guerre + Incandescence"},
      "mainStats": {"ring": "Taux de Crit", "helmet": "ATQ%", "boots": "VIT"},
      "substats": ["Précision", "Taux de Crit", "ATQ%", "Dégâts Crit", "VIT"],
      "notes": "Calamité performe avec ses nombreux debuffs. Enchanteur prolonge les saignements. Précision pour que les saignements passent."
    },
    "synergies": ["sander", "gabrielle", "chu-yao"],
    "modes": {"story": "A", "kronos": "S", "apep": "A", "fafnir": "A", "pvp": "A"},
    "captain": null
  },
  {
    "id": "ming-shuo",
    "name": "Shou",
    "image": "https://static.wikia.nocookie.net/dislyte/images/4/43/Ming_Shuo_avatar.png/revision/latest",
    "divinity": "Leizhenzi",
    "element": "shimmer",
    "role": "dps",
    "tier": "A",
    "rarity": 5,
    "description": "DPS Scintillant Légendaire inspiré de Leizhenzi, dieu chinois de la foudre. Shou sacrifie ses PV pour un pouvoir Thunderclad écrasant, gagne des boosts massifs de VIT, ignore la DEF ennemie et inflige des dégâts critiques dévastateurs à mesure que sa santé diminue.",
    "relicBuild": {
      "primary": {"set4": "foudre", "set2": "recurve", "label": "Foudre + Incandescence"},
      "alt": {"set4": "war", "set2": "recurve", "label": "Guerre + Incandescence"},
      "mainStats": {"ring": "Taux de Crit", "helmet": "ATQ%", "boots": "VIT"},
      "substats": ["ATQ%", "Dégâts Crit", "Taux de Crit", "VIT"],
      "notes": "Il ignore la DEF donc ATQ% et Dégâts Crit sont prioritaires. Sa mécanique de PV décroissants nécessite un suivi médical de l'équipe."
    },
    "synergies": ["yi-an", "gabrielle", "sally"],
    "modes": {"story": "A", "kronos": "S", "apep": "A", "fafnir": "A", "pvp": "A"},
    "captain": null
  },
  {
    "id": "elif",
    "name": "Elif",
    "image": "https://static.wikia.nocookie.net/dislyte/images/2/20/Elif_avatar.png/revision/latest",
    "divinity": "Inanna",
    "element": "inferno",
    "role": "dps",
    "tier": "A",
    "rarity": 5,
    "description": "DPS/Support Brasier Légendaire inspirée d'Inanna, déesse mésopotamienne de l'amour et de la guerre. Elif alterne entre Lion Stance et Contested Territory, déclenche des attaques d'assistance, se soigne en infligeant des dégâts et applique des debuffs DEF Down dévastateurs.",
    "relicBuild": {
      "primary": {"set4": "war", "set2": "recurve", "label": "Guerre + Incandescence"},
      "alt": {"set4": "foudre", "set2": "recurve", "label": "Foudre + Incandescence"},
      "mainStats": {"ring": "Taux de Crit", "helmet": "ATQ%", "boots": "VIT"},
      "substats": ["Taux de Crit", "ATQ%", "Dégâts Crit", "PV%", "VIT"],
      "notes": "PV% utile grâce à sa mécanique de heal sur dégâts. Guerre performant avec ses attaques d'assistance fréquentes."
    },
    "synergies": ["gabrielle", "sander", "zhou-hong"],
    "modes": {"story": "S", "kronos": "A", "apep": "S", "fafnir": "A", "pvp": "A"},
    "captain": null
  },
  {
    "id": "nathaniel",
    "name": "Nathaniel",
    "image": "https://static.wikia.nocookie.net/dislyte/images/c/cb/Nathaniel_avatar.png/revision/latest",
    "divinity": "Humbaba",
    "element": "wind",
    "role": "defender",
    "tier": "A",
    "rarity": 5,
    "description": "Défenseur Vent Légendaire inspiré de Humbaba, géant gardien des forêts de cèdres en mythologie mésopotamienne. Nathaniel accumule des stacks Thrive qui augmentent sa DEF et ses contre-attaques. Devient extrêmement résistant au fil du combat et inflige des frappes dévastatrices au stack max.",
    "relicBuild": {
      "primary": {"set4": "wind", "set2": "roche-inflexible", "label": "Vent + Roche Inflexible"},
      "alt": {"set4": "wind", "set2": "avatara", "label": "Vent + Avatara"},
      "mainStats": {"ring": "DEF%", "helmet": "PV%", "boots": "VIT"},
      "substats": ["DEF%", "PV%", "VIT", "Résistance"],
      "notes": "DEF% est la stat principale — les stacks Thrive multiplient l'impact de chaque point de DEF. Roche Inflexible (+25% DEF) synergise parfaitement."
    },
    "synergies": ["morris", "gorath", "gabrielle"],
    "modes": {"story": "A", "kronos": "A", "apep": "A", "fafnir": "B", "pvp": "A"},
    "captain": null
  },
  {
    "id": "sakura",
    "name": "Sakura",
    "image": "https://static.wikia.nocookie.net/dislyte/images/4/45/Sakura_avatar.png/revision/latest",
    "divinity": "Sakuya-hime",
    "element": "inferno",
    "role": "support",
    "tier": "A",
    "rarity": 5,
    "description": "Support Brasier Légendaire inspirée de Konohanasakuya-hime, déesse japonaise des fleurs de cerisier. Sakura protège ses alliés avec des boucliers, soigne en continu, accorde DEF Up et l'immunité Vigor Guard. Ses stacks Floral Barrier rendent l'équipe quasiment invincible.",
    "relicBuild": {
      "primary": {"set4": "wind", "set2": "sylvestre", "label": "Vent + Sylvestre"},
      "alt": {"set4": "panacee", "set2": "sylvestre", "label": "Panacée + Sylvestre"},
      "mainStats": {"ring": "PV%", "helmet": "VIT", "boots": "VIT"},
      "substats": ["VIT", "PV%", "DEF%", "Résistance"],
      "notes": "VIT prioritaire pour accorder ses boucliers avant les attaques ennemies. PV% élevé maximise la taille des boucliers."
    },
    "synergies": ["gabrielle", "yu-jing", "maria"],
    "modes": {"story": "S", "kronos": "A", "apep": "S", "fafnir": "A", "pvp": "S"},
    "captain": null
  },
  {
    "id": "yukine",
    "name": "Yukine",
    "image": "https://static.wikia.nocookie.net/dislyte/images/c/ca/Yukine_avatar.png/revision/latest",
    "divinity": "Yuki-onna",
    "element": "wind",
    "role": "support",
    "tier": "A",
    "rarity": 5,
    "description": "Support/Contrôleur Vent Épique inspirée de Yuki-onna, l'esprit de la neige de la mythologie japonaise. Yukine gèle les ennemis, déclenche des blizzards dévastateurs, se défend avec Hibernation et renforce ses alliés avec les bonus Snow Cloak. Très utile en équipes centrées sur le gel.",
    "relicBuild": {
      "primary": {"set4": "wind", "set2": "recurve", "label": "Vent + Incandescence"},
      "alt": {"set4": "givre", "set2": "recurve", "label": "Givre + Incandescence"},
      "mainStats": {"ring": "PV%", "helmet": "VIT", "boots": "VIT"},
      "substats": ["VIT", "Précision", "PV%", "DEF%"],
      "notes": "Givre déclenche des gels additionnels. Précision pour que les contrôles passent. VIT pour agir avant les ennemis."
    },
    "synergies": ["ivana", "maria", "gabrielle"],
    "modes": {"story": "A", "kronos": "B", "apep": "A", "fafnir": "B", "pvp": "A"},
    "captain": null
  },
  {
    "id": "hailey",
    "name": "Hailey",
    "image": "https://static.wikia.nocookie.net/dislyte/images/c/c7/Hailey_avatar.png/revision/latest",
    "divinity": "Héphaïstos",
    "element": "inferno",
    "role": "dps",
    "tier": "A",
    "rarity": 5,
    "description": "DPS Brasier Légendaire inspirée d'Héphaïstos, dieu grec de la forge et du feu. Hailey enchaîne des frappes critiques garanties avec scaling DEF, se soigne en combat, applique Sear et Molten Hot et octroie des buffs Smelting Mastery à ses alliés. Excellente en PvE boss.",
    "relicBuild": {
      "primary": {"set4": "foudre", "set2": "recurve", "label": "Foudre + Incandescence"},
      "alt": {"set4": "war", "set2": "roche-inflexible", "label": "Guerre + Roche Inflexible"},
      "mainStats": {"ring": "DEF%", "helmet": "DEF%", "boots": "VIT"},
      "substats": ["DEF%", "Dégâts Crit", "PV%", "VIT"],
      "notes": "Ses dégâts scalent sur la DEF — DEF% est la stat principale. Dégâts Crit prioritaire car crits garantis. Roche Inflexible synergise bien."
    },
    "synergies": ["gabrielle", "sander", "elif"],
    "modes": {"story": "A", "kronos": "S", "apep": "A", "fafnir": "A", "pvp": "A"},
    "captain": null
  },
  {
    "id": "jin-hee",
    "name": "Jin-Hee",
    "image": "https://static.wikia.nocookie.net/dislyte/images/7/72/Jin-Hee_avatar.png/revision/latest",
    "divinity": "Dokkaebi",
    "element": "wind",
    "role": "controller",
    "tier": "A",
    "rarity": 4,
    "description": "Contrôleuse Vent Épique inspirée du Dokkaebi, lutin facétieux de la mythologie coréenne. Jin-Hee est la première représentante du panthéon coréen dans Dislyte. Elle contrôle les ennemis avec des tours de passe-passe et des debuffs de manipulation, idéale pour perturber les compositions adverses.",
    "relicBuild": {
      "primary": {"set4": "wind", "set2": "recurve", "label": "Vent + Incandescence"},
      "alt": {"set4": "domination", "set2": "recurve", "label": "Domination + Incandescence"},
      "mainStats": {"ring": "PV%", "helmet": "VIT", "boots": "VIT"},
      "substats": ["VIT", "Précision", "PV%", "DEF%"],
      "notes": "Précision indispensable pour que ses contrôles passent. VIT haute pour agir avant les ennemis et enchaîner les tours."
    },
    "synergies": ["gabrielle", "wu-you", "unas"],
    "modes": {"story": "A", "kronos": "B", "apep": "A", "fafnir": "B", "pvp": "A"},
    "captain": null
  }
]
$$) AS t(e);
