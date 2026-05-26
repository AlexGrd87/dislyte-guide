export const ELEMENTS = {
  flow:    { label: 'Aquatique', emoji: '🔵', color: '#4a9eff', strong: 'inferno', weak: 'wind' },
  inferno: { label: 'Brasier',   emoji: '🔴', color: '#ff5252', strong: 'wind',    weak: 'flow' },
  wind:    { label: 'Vent',      emoji: '🟢', color: '#52ff8a', strong: 'flow',    weak: 'inferno' },
  umbra:   { label: 'Ombre',     emoji: '🟣', color: '#b04aff', strong: 'all',     weak: 'shimmer' },
  shimmer: { label: 'Scintillant',emoji: '🟡', color: '#ffd04a', strong: 'umbra',  weak: null },
}

export const ROLES = {
  dps:           { label: 'DPS',             icon: '⚔️',  color: '#ff8080' },
  support:       { label: 'Support',          icon: '💙',  color: '#80b8ff' },
  healer:        { label: 'Soigneur',         icon: '💚',  color: '#80ffb0' },
  controller:    { label: 'Contrôleur',       icon: '🔒',  color: '#c880ff' },
  debuffer:      { label: 'Affaiblisseur',    icon: '🎯',  color: '#ffb040' },
  defender:      { label: 'Défenseur',        icon: '🛡️',  color: '#ffd04a' },
  'ap-controller':{ label: 'Contrôleur PA',  icon: '⚡',  color: '#00d4ff' },
}

export const ESPERS = [
  /* ══════════════════ SS TIER ══════════════════ */
  {
    id: 'gaius',
    name: 'Gaius',
    divinity: 'Mars',
    element: 'inferno',
    role: 'dps',
    tier: 'SS',
    rarity: 5,
    description: 'Le DPS cible unique le plus dévastateur. Sa passive lui permet d\'infliger des dégâts massifs sur les cibles brûlantes. Roi des boss.',
    longDescription: 'Gaius incarne Mars, dieu romain de la guerre. Son kit est entièrement orienté vers l\'élimination rapide d\'une seule cible. Sa capacité passive amplifie ses dégâts contre les cibles en état d\'altération, et son ultime peut OS un boss mal préparé. Indispensable en Kronos et en PvP.',
    relicBuild: {
      primary: { set4: 'war', set2: 'recurve', label: 'Guerre + Incandescence' },
      alt: { set4: 'war', set2: 'war', label: 'Double Guerre' },
      mainStats: { ring: 'ATQ%', helmet: 'Dégâts Crit', boots: 'ATQ%' },
      substats: ['Taux de Crit ≥80%', 'Dégâts Crit ≥150%', 'ATQ%', 'VIT'],
      notes: 'Priorité absolue : atteindre 80% Taux de Crit. Ensuite pousser les Dégâts Crit au maximum.'
    },
    synergies: ['abigail', 'gabrielle', 'ahmed'],
    modes: { story: 'A', kronos: 'SS', apep: 'A', fafnir: 'B', pvp: 'S' },
    captain: 'Brasier : +15% Elemental Boon',
    tips: 'Toujours l\'utiliser après qu\'Ahmed a réduit la DEF de l\'ennemi. Combo légendaire avec Abigail.'
  },
  {
    id: 'abigail',
    name: 'Abigail',
    divinity: 'Artemis',
    element: 'flow',
    role: 'dps',
    tier: 'SS',
    rarity: 5,
    description: 'DPS multi-hits qui brise les shields de Fafnir. Synergise parfaitement avec Gaius pour des combos dévastateurs.',
    longDescription: 'Abigail incarne Artémis, déesse de la chasse. Ses attaques multi-cibles et son potentiel de pursuit en font une pièce centrale de nombreuses équipes end-game. Elle excelle particulièrement contre Fafnir où ses hits multiples brisent rapidement le shield.',
    relicBuild: {
      primary: { set4: 'war', set2: 'recurve', label: 'Guerre + Incandescence' },
      mainStats: { ring: 'ATQ%', helmet: 'Dégâts Crit', boots: 'VIT' },
      substats: ['Taux de Crit ≥80%', 'Dégâts Crit ≥150%', 'ATQ%', 'VIT'],
      notes: 'Un peu de VIT pour agir avant l\'ennemi est crucial. Vise 160+ VIT au minimum.'
    },
    synergies: ['gaius', 'gabrielle', 'berenice'],
    modes: { story: 'S', kronos: 'S', apep: 'S', fafnir: 'SS', pvp: 'S' },
    captain: 'Aquatique : +15% Elemental Boon',
    tips: 'Combo ultime : Gaius + Abigail = destruction garantie. Souvent utilisée en Capitaine pour le bonus Aquatique.'
  },
  {
    id: 'unas',
    name: 'Unas',
    divinity: 'Unas',
    element: 'wind',
    role: 'ap-controller',
    tier: 'SS',
    rarity: 5,
    description: 'Le contrôleur de PA le plus puissant du jeu. Fait gagner un tour à toute l\'équipe avant que les ennemis n\'agissent. VIT god.',
    longDescription: 'Unas est le pharaon égyptien divinisé. Son kit est entièrement basé sur la manipulation des jauges d\'action. Si bien équipé en VIT, il peut enchaîner deux tours complets avant que l\'ennemi n\'en prenne un seul. Transforme n\'importe quelle équipe en machine à gagner.',
    relicBuild: {
      primary: { set4: 'wind', set2: 'sylvestre', label: 'Vent + Sylvestre' },
      mainStats: { ring: 'PV%', helmet: 'VIT', boots: 'VIT' },
      substats: ['VIT (max possible)', 'PV%', 'DEF%', 'Résistance'],
      notes: 'VIT est l\'unique priorité. Vise 250+ VIT. Les dégâts ne comptent pas, seule sa vitesse importe.'
    },
    synergies: ['long-mian', 'gabrielle', 'sander'],
    modes: { story: 'S', kronos: 'SS', apep: 'SS', fafnir: 'SS', pvp: 'SS' },
    captain: 'Vent : +15% PA au début du combat',
    tips: 'Le meilleur investissement de relics du jeu. Donne au moins 4 sets de relics VIT de qualité.'
  },
  {
    id: 'clara',
    name: 'Clara',
    divinity: 'Clairvoyant',
    element: 'shimmer',
    role: 'healer',
    tier: 'SS',
    rarity: 5,
    description: 'Soigneuse ultime avec cleanse de tous debuffs. Indispensable partout — la meilleure heal du jeu sans contexte.',
    longDescription: 'Clara incarne une voyante mystique. Son kit combine soins massifs, purification des debuffs, et boucliers pour toute l\'équipe. Extrêmement polyvalente, elle est la première soigneuse à monter pour tout joueur sérieux.',
    relicBuild: {
      primary: { set4: 'panacee', set2: 'sylvestre', label: 'Panacée + Sylvestre' },
      alt: { set4: 'panacee', set2: 'infinite', label: 'Panacée + Infini (PvP)' },
      mainStats: { ring: 'PV%', helmet: 'PV%', boots: 'VIT' },
      substats: ['VIT', 'PV%', 'DEF%', 'Résistance'],
      notes: 'Maximiser PV et VIT. En PvP, ajouter Résistance pour résister aux contrôles.'
    },
    synergies: ['gabrielle', 'unas', 'long-mian'],
    modes: { story: 'SS', kronos: 'S', apep: 'SS', fafnir: 'S', pvp: 'SS' },
    captain: 'Scintillant : Restaure 10% PV à un allié aléatoire chaque tour',
    tips: 'Utilise-la en Capitaine dans les modes difficiles pour la regen passive.'
  },
  {
    id: 'meredith',
    name: 'Meredith',
    divinity: 'Morgan le Fay',
    element: 'umbra',
    role: 'support',
    tier: 'SS',
    rarity: 5,
    description: 'Support ombre qui accorde l\'immunité et des buffs ATQ massifs. Pilier du PvP et des boss difficiles.',
    longDescription: 'Meredith incarne Morgan le Fay, la sorcière arthurienne. Elle peut immuniser toute l\'équipe aux debuffs, augmenter l\'ATQ, et placer des buffs durables. Son kit défensif lui permet de contrer les équipes de contrôle en PvP.',
    relicBuild: {
      primary: { set4: 'lumiere', set2: 'sylvestre', label: 'Lumière + Sylvestre (PvP)' },
      alt: { set4: 'harmonie', set2: 'sylvestre', label: 'Harmonie + Sylvestre (PvE)' },
      mainStats: { ring: 'PV%', helmet: 'PV%', boots: 'VIT' },
      substats: ['VIT', 'PV%', 'DEF%', 'Résistance'],
      notes: 'Résistance importante en PvP pour ne pas se faire contrôler avant d\'agir.'
    },
    synergies: ['gaius', 'abigail', 'raven'],
    modes: { story: 'A', kronos: 'S', apep: 'A', fafnir: 'S', pvp: 'SS' },
    captain: 'Ombre : Immunité aux Altérations au début du combat (1 tour)',
    tips: 'Son captain bonus est excellent en PvP pour contrer les équipes de contrôle rapides.'
  },

  /* ══════════════════ S TIER ══════════════════ */
  {
    id: 'gabrielle',
    name: 'Gabrielle',
    divinity: 'Gabriel',
    element: 'shimmer',
    role: 'support',
    tier: 'S',
    rarity: 5,
    description: 'Le meilleur support universel. Elle amplifie tous les alliés et s\'adapte à n\'importe quelle équipe. "Gabrielle + n\'importe qui = ça marche."',
    longDescription: 'Gabrielle incarne l\'archange Gabriel. Son kit offre des buffs d\'ATQ, des boucliers, et une réduction de CD pour les alliés. Elle est légendairement polyvalente — il n\'existe pratiquement aucune composition où elle n\'est pas utile.',
    relicBuild: {
      primary: { set4: 'harmonie', set2: 'sylvestre', label: 'Harmonie + Sylvestre' },
      alt: { set4: 'wind', set2: 'sylvestre', label: 'Vent + Sylvestre (plus de VIT)' },
      mainStats: { ring: 'PV%', helmet: 'PV%', boots: 'VIT' },
      substats: ['VIT', 'PV%', 'DEF%', 'Résistance'],
      notes: 'Priorité VIT pour agir en premier et appliquer ses buffs immédiatement.'
    },
    synergies: ['gaius', 'abigail', 'lin-xiao', 'li-ling'],
    modes: { story: 'SS', kronos: 'SS', apep: 'SS', fafnir: 'SS', pvp: 'S' },
    captain: 'Scintillant : +25% ATQ à tous les alliés',
    tips: 'L\'un des meilleurs captain bonus du jeu. Presque toujours utilisée en Capitaine.'
  },
  {
    id: 'sally',
    name: 'Sally',
    divinity: 'Salacia',
    element: 'flow',
    role: 'healer',
    tier: 'S',
    rarity: 5,
    description: 'Soigneuse AoE avec buffs défensifs. Excellente en PvE farming et contre les boss nécessitant une survie d\'équipe.',
    longDescription: 'Sally incarne Salacia, déesse des eaux. Elle excelle dans les soins de zone et les buffs de DEF pour l\'équipe entière. Alternative légèrement moins forte que Clara mais disponible plus facilement pour certains joueurs.',
    relicBuild: {
      primary: { set4: 'panacee', set2: 'sylvestre', label: 'Panacée + Sylvestre' },
      mainStats: { ring: 'PV%', helmet: 'PV%', boots: 'VIT' },
      substats: ['VIT', 'PV%', 'DEF%'],
      notes: 'Même build que Clara. VIT et PV avant tout.'
    },
    synergies: ['gabrielle', 'lin-xiao', 'long-mian'],
    modes: { story: 'SS', kronos: 'A', apep: 'S', fafnir: 'A', pvp: 'A' },
    captain: 'Aquatique : +15% PV à tous les alliés',
    tips: 'Très bonne soigneuse early/mid game. Remplaçable par Clara en late game.'
  },
  {
    id: 'lin-xiao',
    name: 'Lin Xiao',
    divinity: 'Tigre Blanc',
    element: 'flow',
    role: 'dps',
    tier: 'S',
    rarity: 5,
    description: 'DPS zone aquatique avec multi-hits. Excellente contre Apep et en farming Histoire.',
    longDescription: 'Lin Xiao incarne le Tigre Blanc, créature divine chinoise. Ses attaques touchent plusieurs cibles simultanément et ses combos de pursuit la rendent redoutable. Pilier des équipes de farming grâce à son AoE constante.',
    relicBuild: {
      primary: { set4: 'war', set2: 'recurve', label: 'Guerre + Incandescence' },
      mainStats: { ring: 'ATQ%', helmet: 'Dégâts Crit', boots: 'ATQ%' },
      substats: ['Taux de Crit ≥80%', 'Dégâts Crit', 'ATQ%', 'VIT'],
      notes: 'Priorité DPS. Un peu de VIT pour ne pas se faire tuer avant d\'agir.'
    },
    synergies: ['gabrielle', 'sally', 'berenice'],
    modes: { story: 'SS', kronos: 'A', apep: 'SS', fafnir: 'S', pvp: 'A' },
    captain: 'Aquatique : +25% ATQ si seul Aquatique de l\'équipe',
    tips: 'Captain bonus très puissant si elle est la seule Aquatique dans l\'équipe.'
  },
  {
    id: 'ahmed',
    name: 'Ahmed',
    divinity: 'Anubis',
    element: 'umbra',
    role: 'debuffer',
    tier: 'S',
    rarity: 5,
    description: 'Réducteur de DEF exceptionnel. Ses debuffs boostent les dégâts de toute l\'équipe. Indispensable pour les boss.',
    longDescription: 'Ahmed incarne Anubis, dieu égyptien de la mort. Il empile des réductions de DEF et des debuffs variés sur les ennemis, amplifiant les dégâts de toute l\'équipe. Sa synergie avec les DPS comme Gaius est explosive.',
    relicBuild: {
      primary: { set4: 'calamite', set2: 'infinite', label: 'Calamité + Infini' },
      mainStats: { ring: 'PV%', helmet: 'PV%', boots: 'VIT' },
      substats: ['VIT', 'PV%', 'Résistance', 'DEF%'],
      notes: 'Résistance cruciale pour éviter les contrôles. Pas besoin d\'ATQ.'
    },
    synergies: ['gaius', 'li-ling', 'lin-xiao'],
    modes: { story: 'S', kronos: 'SS', apep: 'S', fafnir: 'A', pvp: 'B' },
    captain: 'Ombre : -25% DEF aux ennemis au début du combat',
    tips: 'Le captain bonus d\'Ahmed est l\'un des plus impactants pour les boss. Toujours l\'utiliser en capitaine si tu manques de DEF down.'
  },
  {
    id: 'li-ling',
    name: 'Li Ling',
    divinity: 'Li Nezha',
    element: 'wind',
    role: 'dps',
    tier: 'S',
    rarity: 5,
    description: 'DPS vent explosif avec pursuit et ignore partiellement la DEF ennemie. Incontournable en Guerre des Points.',
    longDescription: 'Li Ling incarne Nezha, héros mythologique chinois. Son kit lui permet d\'ignorer une partie de la DEF adverse et de déclencher des attaques de pursuit dévastatrices. Très polyvalent, il brille en PvP et contre les boss.',
    relicBuild: {
      primary: { set4: 'war', set2: 'recurve', label: 'Guerre + Incandescence' },
      mainStats: { ring: 'ATQ%', helmet: 'Dégâts Crit', boots: 'ATQ%' },
      substats: ['Taux de Crit ≥80%', 'Dégâts Crit', 'ATQ%', 'VIT'],
      notes: 'Build DPS classique. Vise 200+ VIT pour le PvP.'
    },
    synergies: ['gabrielle', 'ahmed', 'unas'],
    modes: { story: 'S', kronos: 'A', apep: 'S', fafnir: 'A', pvp: 'SS' },
    captain: 'Vent : +25% VIT à tous les alliés Vent',
    tips: 'Excellent en PvP grâce à son ultime dévastateur et son ignore DEF.'
  },
  {
    id: 'raven',
    name: 'Raven',
    divinity: 'Raven',
    element: 'umbra',
    role: 'debuffer',
    tier: 'S',
    rarity: 5,
    description: 'La reine de la dissipation. Dispel les buffs ennemis et applique ses propres debuffs. Indispensable en PvP.',
    longDescription: 'Raven incarne le Corbeau, esprit amérindien. Son kit est centré sur le vol de buffs — elle retire les améliorations ennemies et peut même les retourner contre eux. En PvP, contre une équipe buff-dépendante, elle seule peut changer l\'issue du combat.',
    relicBuild: {
      primary: { set4: 'wind', set2: 'infinite', label: 'Vent + Infini (PvP)' },
      alt: { set4: 'calamite', set2: 'sylvestre', label: 'Calamité + Sylvestre (PvE)' },
      mainStats: { ring: 'PV%', helmet: 'VIT', boots: 'VIT' },
      substats: ['VIT', 'PV%', 'Résistance', 'DEF%'],
      notes: 'VIT maximum pour agir avant les ennemis. Résistance pour le PvP.'
    },
    synergies: ['meredith', 'unas', 'triki'],
    modes: { story: 'B', kronos: 'B', apep: 'A', fafnir: 'B', pvp: 'SS' },
    captain: 'Ombre : +25% PV à tous les alliés',
    tips: 'Quasi-inutile en PvE, irremplaçable en PvP. Ne pas investir si tu ne fais pas de Guerre des Points.'
  },

  /* ══════════════════ A TIER ══════════════════ */
  {
    id: 'long-mian',
    name: 'Long Mian',
    divinity: 'Dragon Céleste',
    element: 'flow',
    role: 'ap-controller',
    tier: 'A',
    rarity: 5,
    description: 'Contrôleur de PA universel et excellent Capitaine. Son bonus de VIT fait de lui l\'un des meilleurs capitaines du jeu.',
    longDescription: 'Long Mian incarne un dragon céleste de la mythologie chinoise. Son kit permet de réduire la jauge PA des ennemis et d\'augmenter celle des alliés. Son captain bonus de +20% VIT en fait l\'un des meilleurs capitaines disponibles.',
    relicBuild: {
      primary: { set4: 'wind', set2: 'sylvestre', label: 'Vent + Sylvestre' },
      mainStats: { ring: 'PV%', helmet: 'VIT', boots: 'VIT' },
      substats: ['VIT', 'PV%', 'DEF%'],
      notes: 'Build full VIT. Vise 230+ VIT.'
    },
    synergies: ['unas', 'sander', 'gabrielle'],
    modes: { story: 'S', kronos: 'S', apep: 'S', fafnir: 'A', pvp: 'SS' },
    captain: 'Universel : +20% VIT à tous les alliés — Meilleur captain PvP',
    tips: 'Captain bonus universel très fort. Utilisé dans presque toutes les équipes PvP.'
  },
  {
    id: 'jiang-jiuli',
    name: 'Jiang Jiuli',
    divinity: 'Chi You',
    element: 'wind',
    role: 'dps',
    tier: 'A',
    rarity: 5,
    description: 'DPS vent zone avec executions. Excellent en farming Histoire et Cube Miracle.',
    longDescription: 'Jiang Jiuli incarne Chi You, dieu de la guerre chinese. Ses attaques de zone et sa mécanique d\'exécution (bonus dégâts cibles PV bas) en font un excellent farmer PvE.',
    relicBuild: {
      primary: { set4: 'war', set2: 'recurve', label: 'Guerre + Incandescence' },
      mainStats: { ring: 'ATQ%', helmet: 'Dégâts Crit', boots: 'ATQ%' },
      substats: ['Taux de Crit ≥80%', 'Dégâts Crit', 'ATQ%', 'VIT'],
      notes: 'Build DPS standard.'
    },
    synergies: ['gabrielle', 'clara', 'unas'],
    modes: { story: 'SS', kronos: 'B', apep: 'A', fafnir: 'B', pvp: 'A' },
    captain: 'Vent : +25% dégâts AoE',
    tips: 'Excellent pour le farming automatique. Combine-le avec Clara pour une team farming solide.'
  },
  {
    id: 'ashley',
    name: 'Ashley',
    divinity: 'Hippolyte',
    element: 'shimmer',
    role: 'defender',
    tier: 'A',
    rarity: 5,
    description: 'Défenseur tank avec contre-attaques et taunt. Protège l\'équipe et inflige des dégâts en riposte.',
    longDescription: 'Ashley incarne Hippolyte, reine des Amazones. Son kit est défensif avec des taunts, des boucliers et de puissantes contre-attaques. Utile dans les modes où la survie est critique.',
    relicBuild: {
      primary: { set4: 'war', set2: 'avatara', label: 'Guerre + Avatara' },
      alt: { set4: 'fortification', set2: 'avatara', label: 'Fortification + Avatara (Tank)' },
      mainStats: { ring: 'DEF%', helmet: 'PV%', boots: 'DEF%' },
      substats: ['DEF%', 'PV%', 'VIT', 'Résistance'],
      notes: 'Maximiser DEF et PV pour les contre-attaques. Avatara pour ripostes automatiques.'
    },
    synergies: ['gabrielle', 'clara', 'meredith'],
    modes: { story: 'B', kronos: 'A', apep: 'B', fafnir: 'A', pvp: 'A' },
    captain: 'Scintillant : Bouclier = 20% PV max au début',
    tips: 'Utile si tu manques d\'un tank solide. Remplacée par des DPS plus forts en late game.'
  },
  {
    id: 'triki',
    name: 'Triki',
    divinity: 'Loki',
    element: 'wind',
    role: 'controller',
    tier: 'A',
    rarity: 5,
    description: 'Contrôleur chaos avec sommeil, réductions de CD, et déplacements aléatoires d\'AP. Imprévisible et efficace en PvP.',
    longDescription: 'Triki incarne Loki, dieu nordique de la ruse. Son kit introduit du hasard bénéfique — il peut endormir, réduire les CDs de ses alliés, et manipuler les jauges AP de façon imprévisible. Son côté chaos en fait un excellent contre-pick en PvP.',
    relicBuild: {
      primary: { set4: 'wind', set2: 'infinite', label: 'Vent + Infini' },
      mainStats: { ring: 'PV%', helmet: 'VIT', boots: 'VIT' },
      substats: ['VIT', 'PV%', 'Résistance', 'DEF%'],
      notes: 'VIT max. Résistance pour ne pas se faire contrôler en PvP.'
    },
    synergies: ['raven', 'meredith', 'long-mian'],
    modes: { story: 'B', kronos: 'B', apep: 'B', fafnir: 'B', pvp: 'S' },
    captain: 'Vent : -25% PA aux ennemis au début',
    tips: 'Niche en PvE, très fort en PvP. Ne pas investir si tu ne joues pas Guerre des Points.'
  },
  {
    id: 'hyde',
    name: 'Hyde',
    divinity: 'Hadès',
    element: 'umbra',
    role: 'dps',
    tier: 'A',
    rarity: 5,
    description: 'DPS ombre avec DOT (Dégâts sur la Durée) et exécutions sur cibles basses en PV. Excellent contre les boss à plusieurs phases.',
    longDescription: 'Hyde incarne Hadès, dieu grec des enfers. Il applique des saignements et des empoisonnements progressifs qui font des ravages sur les boss à hauts PV. Sa mécanique d\'exécution sur cibles affaiblies est dévastatrice.',
    relicBuild: {
      primary: { set4: 'calamite', set2: 'enchanteur', label: 'Calamité + Enchanteur' },
      mainStats: { ring: 'ATQ%', helmet: 'Dégâts Crit', boots: 'ATQ%' },
      substats: ['Taux de Crit', 'Dégâts Crit', 'ATQ%', 'VIT'],
      notes: 'Le set Enchanteur prolonge ses DOT pour des dégâts passifs massifs.'
    },
    synergies: ['ahmed', 'gabrielle', 'ophelia'],
    modes: { story: 'S', kronos: 'A', apep: 'S', fafnir: 'A', pvp: 'B' },
    captain: 'Ombre : +25% dégâts contre cibles avec debuff',
    tips: 'Son captain bonus est excellent si tu joues une équipe orientée debuffs.'
  },
  {
    id: 'ophelia',
    name: 'Ophélia',
    divinity: 'Hécate',
    element: 'umbra',
    role: 'controller',
    tier: 'A',
    rarity: 5,
    description: 'Contrôleuse ombre avec réductions de PA et dormance. Très efficace en PvE difficile.',
    longDescription: 'Ophélia incarne Hécate, déesse de la magie. Son kit applique des contrôles variés — sommeil, réduction de PA — et des debuffs magiques. Utile dans la Tour du Miracle pour contrôler les étages difficiles.',
    relicBuild: {
      primary: { set4: 'wind', set2: 'infinite', label: 'Vent + Infini' },
      mainStats: { ring: 'PV%', helmet: 'VIT', boots: 'VIT' },
      substats: ['VIT', 'PV%', 'Résistance', 'DEF%'],
      notes: 'Résistance pour garder ses contrôles actifs face aux retours d\'altération.'
    },
    synergies: ['ahmed', 'hyde', 'meredith'],
    modes: { story: 'A', kronos: 'B', apep: 'A', fafnir: 'B', pvp: 'A' },
    captain: 'Ombre : +25% Résistance à tous les alliés',
    tips: 'Excellent captain bonus pour les modes où les debuffs ennemis sont problématiques.'
  },

  /* ══════════════════ B TIER / Utiles ══════════════════ */
  {
    id: 'leon',
    name: 'Leon',
    divinity: 'Léontaur',
    element: 'wind',
    role: 'dps',
    tier: 'B',
    rarity: 5,
    description: 'DPS vent cible unique solide. Bon early-mid game, remplacé par Li Ling en late.',
    longDescription: 'Leon incarne le Léontaur, créature mythique mi-homme mi-lion. Son kit DPS est propre mais sans signature unique. Excellent pour débuter Kronos avant d\'obtenir de meilleurs DPS.',
    relicBuild: {
      primary: { set4: 'war', set2: 'recurve', label: 'Guerre + Incandescence' },
      mainStats: { ring: 'ATQ%', helmet: 'Dégâts Crit', boots: 'ATQ%' },
      substats: ['Taux de Crit ≥80%', 'Dégâts Crit', 'ATQ%', 'VIT'],
      notes: 'Build DPS standard.'
    },
    synergies: ['gabrielle', 'ahmed'],
    modes: { story: 'B', kronos: 'A', apep: 'B', fafnir: 'B', pvp: 'C' },
    captain: 'Vent : +20% ATQ',
    tips: 'Bon esper early game. Priorise Li Ling ou Gaius en late.'
  },
  {
    id: 'sander',
    name: 'Sander',
    divinity: 'Thor',
    element: 'wind',
    role: 'ap-controller',
    tier: 'B',
    rarity: 5,
    description: 'Contrôleur de PA et Capitaine VIT. Son captain bonus de VIT Vent est fort pour les équipes mono-élément.',
    longDescription: 'Sander incarne Thor, dieu nordique du tonnerre. Il manipule les jauges AP et peut électrocuter les ennemis. Son captain bonus en fait un bon capitaine pour les équipes vent.',
    relicBuild: {
      primary: { set4: 'wind', set2: 'sylvestre', label: 'Vent + Sylvestre' },
      mainStats: { ring: 'PV%', helmet: 'VIT', boots: 'VIT' },
      substats: ['VIT', 'PV%', 'DEF%'],
      notes: 'Full VIT. Sander doit agir en premier.'
    },
    synergies: ['li-ling', 'jiang-jiuli', 'triki'],
    modes: { story: 'B', kronos: 'B', apep: 'B', fafnir: 'B', pvp: 'A' },
    captain: 'Vent : +25% VIT aux alliés Vent',
    tips: 'Excellent captain pour les équipes full vent. Remplacé par Long Mian en universalité.'
  },
  {
    id: 'tang-yun',
    name: 'Tang Yun',
    divinity: 'Dragon Noir',
    element: 'flow',
    role: 'dps',
    tier: 'B',
    rarity: 5,
    description: 'DPS avec attaques de pursuit. Excellent contre Fafnir pour briser les shields.',
    longDescription: 'Tang Yun incarne le Dragon Noir. Son kit génère des attaques de pursuit supplémentaires qui s\'accumulent pour briser rapidement le shield de Fafnir.',
    relicBuild: {
      primary: { set4: 'war', set2: 'recurve', label: 'Guerre + Incandescence' },
      mainStats: { ring: 'ATQ%', helmet: 'Dégâts Crit', boots: 'ATQ%' },
      substats: ['Taux de Crit ≥80%', 'Dégâts Crit', 'ATQ%', 'VIT'],
      notes: 'Standard DPS. Priorité Fafnir.'
    },
    synergies: ['berenice', 'gabrielle', 'lu-yi'],
    modes: { story: 'B', kronos: 'B', apep: 'B', fafnir: 'SS', pvp: 'C' },
    captain: 'Aquatique : +15% Taux de Crit',
    tips: 'Spécialiste Fafnir. Excellent dans ce contexte précis, médiocre ailleurs.'
  },
  {
    id: 'lu-yi',
    name: 'Lu Yi',
    divinity: 'Hou Yi',
    element: 'flow',
    role: 'dps',
    tier: 'B',
    rarity: 5,
    description: 'DPS 9 hits par ultime. Machine à briser les shields de Fafnir. Spécialiste mono-boss.',
    longDescription: 'Lu Yi incarne Hou Yi, l\'archer légendaire chinois qui abattit 9 soleils. Son ultime tire 9 flèches successives — un record — ce qui en fait le roi du shield-breaking contre Fafnir.',
    relicBuild: {
      primary: { set4: 'war', set2: 'recurve', label: 'Guerre + Incandescence' },
      mainStats: { ring: 'ATQ%', helmet: 'Dégâts Crit', boots: 'ATQ%' },
      substats: ['Taux de Crit ≥80%', 'Dégâts Crit', 'ATQ%', 'VIT'],
      notes: 'Maximiser les dégâts crit pour exploiter ses 9 hits.'
    },
    synergies: ['tang-yun', 'berenice', 'gabrielle'],
    modes: { story: 'C', kronos: 'B', apep: 'B', fafnir: 'SS', pvp: 'C' },
    captain: 'Aquatique : +25% Dégâts Crit',
    tips: 'Spécialiste absolu de Fafnir. Ne pas l\'utiliser hors de ce contexte.'
  },
  {
    id: 'berenice',
    name: 'Bérénice',
    divinity: 'Bérénice',
    element: 'shimmer',
    role: 'support',
    tier: 'B',
    rarity: 5,
    description: 'Support qui réduit les CD alliés et buff l\'ATQ. Excellente pour les compositions CD-dépendantes.',
    longDescription: 'Bérénice incarne la reine égyptienne du même nom. Elle accélère les rotations de l\'équipe en réduisant les temps de recharge des compétences, et amplifie l\'ATQ des alliés.',
    relicBuild: {
      primary: { set4: 'wind', set2: 'sylvestre', label: 'Vent + Sylvestre' },
      mainStats: { ring: 'PV%', helmet: 'VIT', boots: 'VIT' },
      substats: ['VIT', 'PV%', 'DEF%'],
      notes: 'Soutien pur, pas besoin d\'ATQ.'
    },
    synergies: ['tang-yun', 'lu-yi', 'abigail'],
    modes: { story: 'A', kronos: 'B', apep: 'B', fafnir: 'S', pvp: 'B' },
    captain: 'Scintillant : Réduit de 1 tour tous les CD au début',
    tips: 'Son captain bonus est unique et très fort pour les équipes à gros ultime.'
  },
  {
    id: 'mona',
    name: 'Mona',
    divinity: 'Moïra',
    element: 'umbra',
    role: 'dps',
    tier: 'B',
    rarity: 5,
    description: 'DPS Zone ombre disponible tôt. La première priorité du débutant avec le set Vol de Vie.',
    longDescription: 'Mona incarne Moïra, déesse grecque du destin. Elle est le premier DPS Zone accessible aux nouveaux joueurs et devient quasi-immortelle avec le set De l\'En-bas (Vol de Vie). Incontournable en early game.',
    relicBuild: {
      primary: { set4: 'en-bas', set2: 'sylvestre', label: 'De l\'En-bas + Sylvestre (Early)' },
      alt: { set4: 'war', set2: 'recurve', label: 'Guerre + Incandescence (Late)' },
      mainStats: { ring: 'ATQ%', helmet: 'PV%', boots: 'ATQ%' },
      substats: ['ATQ%', 'PV%', 'Taux de Crit', 'VIT'],
      notes: 'Early game : priorise le Vol de Vie pour la survivabilité. Late : passe sur Guerre.'
    },
    synergies: ['gabrielle', 'sally', 'long-mian'],
    modes: { story: 'SS', kronos: 'C', apep: 'B', fafnir: 'C', pvp: 'D' },
    captain: 'Ombre : +15% ATQ si cible a un debuff',
    tips: 'PRIORITÉ ABSOLUE en early game. Farmez le set De l\'En-bas au Chapitre 6.'
  },
  {
    id: 'fabrice',
    name: 'Fabrice',
    divinity: 'Obéron',
    element: 'wind',
    role: 'healer',
    tier: 'B',
    rarity: 5,
    description: 'Soigneur vent obtenu via Fusion. Bonne polyvalence mais moins efficace que Clara.',
    longDescription: 'Fabrice incarne Obéron, roi des fées. Obtenu uniquement via la Fusion d\'Espers dans la Salle de Guerre, il combine soins et quelques buffs. Bon soigneur secondaire.',
    relicBuild: {
      primary: { set4: 'panacee', set2: 'sylvestre', label: 'Panacée + Sylvestre' },
      mainStats: { ring: 'PV%', helmet: 'PV%', boots: 'VIT' },
      substats: ['VIT', 'PV%', 'DEF%'],
      notes: 'Même build que Clara/Sally.'
    },
    synergies: ['gabrielle', 'jiang-jiuli', 'lin-xiao'],
    modes: { story: 'A', kronos: 'B', apep: 'A', fafnir: 'B', pvp: 'B' },
    captain: 'Vent : Soins de 10% PV max à tous les alliés chaque début de tour',
    tips: 'Obtenu via Fusion — gratuit mais demande du temps. Bon soigneur F2P.'
  },
]

export const getEsperById = (id) => ESPERS.find(e => e.id === id)
export const getEspersByTier = (tier) => ESPERS.filter(e => e.tier === tier)
export const getEspersByElement = (el) => ESPERS.filter(e => e.element === el)
export const getEspersByRole = (role) => ESPERS.filter(e => e.role === role)

export const TIERS = ['SS', 'S', 'A', 'B', 'C']
