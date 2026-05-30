// Complétion des builds (mainStats + alt + notes) pour 46 espers sans build détaillé
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://ogxwqebkwyharrrjoyep.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

// Chaque entrée merge sur le relic_build existant
const BUILDS = {

  // ═══════════════════ SS TIER ═══════════════════

  'clara': {
    alt: { set4: 'panacee', set2: 'lumiere', label: 'Panacée + Lumière' },
    mainStats: { ring: 'PV%', helmet: 'VIT', boots: 'VIT' },
    notes: 'Meilleur support du jeu grâce à Purification (cleanse + immunité). VIT maximale pour accorder l\'immunité AVANT l\'attaque ennemie. Vent + Égide : équipe protégée dès le départ. Lumière en alt pour double Immunité en PvP. PV% et DEF% pour survivre malgré les AoE.'
  },
  'gaius': {
    alt: { set4: 'war', set2: 'recurve', label: 'Guerre + Incandescence' },
    mainStats: { ring: 'ATQ%', helmet: 'Dégâts Crit', boots: 'VIT' },
    notes: 'AoE DPS SS tier. Foudre (+50% C.DMG, +30% vs boss) est optimal sur Kronos. God King mode garantit des crits → C.DMG > Taux Crit. ATQ% amplifie chaque frappe. Capitaine PvP avec +40% ATQ = meilleur buff d\'équipe offensif.'
  },
  'gabrielle': {
    alt: { set4: 'wind', set2: 'lumiere', label: 'Vent + Lumière' },
    mainStats: { ring: 'PV%', helmet: 'VIT', boots: 'VIT' },
    notes: 'Support N°1 universel. VIT maximale pour accorder ses buffs en priorité absolue. Lumière en alt pour l\'Immunité de départ en PvP — indispensable pour protéger l\'équipe du premier tour. Résistance pour ne pas être contrôlée avant d\'agir.'
  },
  'sander': {
    alt: { set4: 'wind', set2: 'recurve', label: 'Vent + Incandescence' },
    mainStats: { ring: 'Taux de Crit', helmet: 'VIT', boots: 'VIT' },
    notes: 'Ses dégâts SCALENT sur la VIT — chaque point de VIT est aussi un point d\'ATQ. Viser 280+ VIT. Taux de Crit ≥ 80% pour déclencher son passif d\'accélération (Corrosion). Meilleur capitaine PvE avec +25% VIT équipe. Incontournable en Kronos.'
  },
  'sally': {
    alt: { set4: 'wind', set2: 'sylvestre', label: 'Vent + Sylvestre' },
    mainStats: { ring: 'PV%', helmet: 'VIT', boots: 'VIT' },
    notes: 'Healeur polyvalent. Panacée (+30% efficacité soins) amplifie Ode to Joy (-25% dégâts équipe). PV% augmente directement la puissance des soins. VIT pour agir souvent. Résistance pour éviter d\'être contrôlée en PvP et continuer à soigner.'
  },
  'li-ling': {
    alt: { set4: 'foudre', set2: 'recurve', label: 'Foudre + Incandescence' },
    mainStats: { ring: 'Taux de Crit', helmet: 'ATQ%', boots: 'VIT' },
    notes: 'DPS Brasier iconique, excellent pour débutants. Guerre + Recurve pour le farming PvE en vitesse. Foudre en alt pour maximiser les dégâts boss (+50% C.DMG). Son capitaine +30% ATQ à toute l\'équipe est l\'un des meilleurs capitaines du jeu. Taux Crit ≥ 80%.'
  },
  'lin-xiao': {
    alt: { set4: 'foudre', set2: 'recurve', label: 'Foudre + Incandescence' },
    mainStats: { ring: 'Taux de Crit', helmet: 'ATQ%', boots: 'VIT' },
    notes: 'Tiger Roar garantit les crits → C.DMG >> Taux Crit (viser 150-200%). Foudre = BIS pour Apep/Kronos (+50% C.DMG +30% vs boss). Peut remplacer un debuffeur grâce à ses Bleed/SPD Down intégrés. Très forte en Apep grâce aux multi-hits.'
  },
  'unas': {
    alt: { set4: 'wind', set2: 'lumiere', label: 'Vent + Lumière' },
    mainStats: { ring: 'PV%', helmet: 'VIT', boots: 'VIT' },
    notes: 'Contrôleur de PA SS tier. VIT est sa SEULE stat qui compte — viser 250+ VIT minimum. Il doit agir 2 fois pour chaque tour ennemi. Lumière en alt pour l\'Immunité de départ en PvP. Toujours mettre en capitaine : +25% VIT à toute l\'équipe change l\'ordre des tours.'
  },
  'chloe': {
    alt: { set4: 'wind', set2: 'recurve', label: 'Vent + Incandescence' },
    mainStats: { ring: 'Taux de Crit', helmet: 'ATQ%', boots: 'VIT' },
    notes: 'DPS multi-hits vol de buffs. ATQ% et C.DMG prioritaires car ses 5+ hits lui donnent déjà beaucoup de chances de voler des buffs — Précision inutile. Guerre optimal pour maximiser les dégâts. Vent en alt pour agir plus souvent. Redoutable en PvP contre les équipes boostées.'
  },

  // ═══════════════════ S TIER ═══════════════════

  'abigail': {
    primary: { set4: 'ecume', set2: 'egide', label: 'Écume + Égide' },
    alt: { set4: 'wind', set2: 'sylvestre', label: 'Vent + Sylvestre' },
    mainStats: { ring: 'PV%', helmet: 'VIT', boots: 'VIT' },
    notes: 'Support Inferno avec revival et boucliers. Écume réduit les CDs de Queen\'s Gift (revival) — crucial pour relancer son ult rapidement. Égide protège dès le départ. PV% et VIT pour la survie. En PvP elle est une menace grâce à son revival qui peut retourner la partie.'
  },
  'ahmed': {
    alt: { set4: 'wind', set2: 'sylvestre', label: 'Vent + Sylvestre' },
    mainStats: { ring: 'PV%', helmet: 'VIT', boots: 'VIT' },
    notes: 'Meilleur healeur contre Fafnir. World Stage réduit TOUS les CDs alliés et soigne 10 fois. Avatara lui permet de contre-attaquer. Vent + Avatara ici. VIT haute pour agir souvent. PV% pour des soins plus puissants. Préférer Fabrice ou Sally si disponibles en PvP.'
  },
  'ashley': {
    alt: { set4: 'foudre', set2: 'recurve', label: 'Foudre + Incandescence' },
    mainStats: { ring: 'Taux de Crit', helmet: 'ATQ%', boots: 'VIT' },
    notes: 'DPS/Support hybride. Guerre maximise ses dégâts, Recurve assure ses debuffs SPD Down et Stun. Son ult accorde shield + DEF Up + ATQ Up à l\'équipe — excellent en PvP. C.DMG et Taux Crit ≥ 80%. Vent en alt pour VIT maximale en PvP compétitif.'
  },
  'dhalia': {
    alt: { set4: 'panacee', set2: 'sylvestre', label: 'Panacée + Sylvestre' },
    mainStats: { ring: 'PV%', helmet: 'VIT', boots: 'VIT' },
    notes: 'Healeur Flow polyvalent. Vent + Égide pour la VIT et les boucliers de départ. Panacée en alt si healeur principal. VIT priorité pour agir souvent. PV% et DEF% pour survivre. Bonne option F2P accessible en mid-game avant d\'obtenir Ahmed ou Sally.'
  },
  'drew': {
    alt: { set4: 'en-bas', set2: 'recurve', label: 'Vol de Vie + Incandescence' },
    mainStats: { ring: 'Taux de Crit', helmet: 'ATQ%', boots: 'VIT' },
    notes: 'DPS Inferno qui vole les buffs avec chaque frappe. Guerre + Recurve pour maximiser les dégâts et assurer le passage des debuffs. Vol de Vie en alt pour du sustain en PvE. Ses attaques de poursuite sur ennemis sans buff synergisent avec Raven. Taux Crit ≥ 80%.'
  },
  'fabrice': {
    alt: { set4: 'wind', set2: 'sylvestre', label: 'Vent + Sylvestre' },
    mainStats: { ring: 'PV%', helmet: 'VIT', boots: 'VIT' },
    notes: 'Support F2P obtenu par Fusion, donne Invincibilité + Immunité à toute l\'équipe. Écume réduit le CD d\'Autumn Butterflies. PV% et VIT pour la survie. Son ult (Invincibilité 1 tour + Immunité 2 tours) est l\'un des meilleurs skills défensifs du jeu. Indispensable en early/mid game.'
  },
  'li-guang': {
    alt: { set4: 'en-bas', set2: 'recurve', label: 'Vol de Vie + Incandescence' },
    mainStats: { ring: 'Taux de Crit', helmet: 'ATQ%', boots: 'VIT' },
    notes: 'DPS Vent multi-hits, capitaine +30% ATQ en PvE. Foudre optimal pour les boss. Ses crits déclenchent des frappes supplémentaires. Taux Crit ≥ 80% pour maximiser les proc. ATQ% amplifie chaque frappe. Bonne option early game pour Kronos et Fafnir.'
  },
  'lu-yi': {
    alt: { set4: 'foudre', set2: 'recurve', label: 'Foudre + Incandescence' },
    mainStats: { ring: 'Taux de Crit', helmet: 'ATQ%', boots: 'VIT' },
    notes: 'Multi-hit DPS (jusqu\'à 9 hits sur un tour !). Guerre pour maximiser l\'ATQ globale. Foudre en alt pour Fafnir/boss (+50% C.DMG). Ses 9 hits le rendent idéal pour briser le bouclier de Fafnir. Taux Crit ≥ 80%. Capitaine +30% ATQ en PvE — excellent pour Fafnir.'
  },
  'lucas': {
    alt: { set4: 'wind', set2: 'egide', label: 'Vent + Égide' },
    mainStats: { ring: 'PV%', helmet: 'VIT', boots: 'VIT' },
    notes: 'Contrôleur de PA qui étourdit et vole la PA des ennemis. Vent + Recurve pour maximiser la VIT et la Précision. Doit agir AVANT les ennemis pour que ses contrôles aient de l\'impact. Précision indispensable pour que Stun et AP vol passent. Capitaine au sommet de la Tour (100 étages).'
  },
  'narmer': {
    alt: { set4: 'foudre', set2: 'recurve', label: 'Foudre + Incandescence' },
    mainStats: { ring: 'Taux de Crit', helmet: 'ATQ%', boots: 'VIT' },
    notes: 'Sniper AoE qui ignore la DEF avec ses stacks Burning Sun. Guerre optimal pour maximiser les dégâts en un seul coup. Foudre en alt pour les boss. ATQ% prioritaire car ses dégâts ignorent la DEF. Sa progression est rapide : accumule Burning Sun, puis lâche tout sur l\'équipe ennemie.'
  },
  'nicole': {
    alt: { set4: 'wind', set2: 'lumiere', label: 'Vent + Lumière' },
    mainStats: { ring: 'PV%', helmet: 'VIT', boots: 'VIT' },
    notes: 'Support Scintillant polyvalent. Vent + Égide pour la VIT et les boucliers. Lumière en alt pour l\'Immunité de départ en PvP. VIT maximale pour accorder ses buffs en priorité. Bonne option F2P pour les modes PvE où on manque d\'un support rapide.'
  },
  'ollie': {
    alt: { set4: 'wind', set2: 'sylvestre', label: 'Vent + Sylvestre' },
    mainStats: { ring: 'PV%', helmet: 'VIT', boots: 'VIT' },
    notes: 'DPS Aquatique avec passif de protection alliés contre les coups mortels. Vol de Vie pour le sustain. Écume réduit son ult (CD 9 tours). PV%, DEF%, VIT pour la survie. Excellent en Kronos et PvP grâce à son passif Salvific Judgements. Son awakening (Meta Ollie) est bien meilleur.'
  },
  'raven': {
    alt: { set4: 'war', set2: 'recurve', label: 'Guerre + Incandescence' },
    mainStats: { ring: 'Taux de Crit', helmet: 'ATQ%', boots: 'VIT' },
    notes: 'Reine de la dissipation en PvP. Sleipnir (ult) dissipe TOUS les buffs ennemis et inflige DEF Down sur toute l\'équipe adverse. Vent + Recurve car ses dégâts scalent sur la VIT. Précision pour que les debuffs passent. Ses poursuites sur cibles sans buff s\'auto-alimentent. Redoutable en Point War.'
  },
  'sienna': {
    alt: { set4: 'wind', set2: 'lumiere', label: 'Vent + Lumière' },
    mainStats: { ring: 'PV%', helmet: 'VIT', boots: 'VIT' },
    notes: 'Contrôleur AP qui reset la jauge ennemie et étourdit. Vent + Égide pour la VIT et la protection. Doit absolument agir avant les ennemis. Précision pour que le reset AP passe. Lumière en alt pour l\'Immunité de départ en PvP. Sa montée en VIT via Résonance la rend encore meilleure.'
  },
  'tang-yun': {
    alt: { set4: 'foudre', set2: 'recurve', label: 'Foudre + Incandescence' },
    mainStats: { ring: 'Taux de Crit', helmet: 'ATQ%', boots: 'VIT' },
    notes: 'DPS Vent multi-hits, roi de Fafnir. Vol de Vie + Recurve pour sustain en PvE. Foudre en alt pour maximiser C.DMG vs boss. Ses attaques de poursuite (Pursuit) cassent efficacement le bouclier Andvari de Fafnir. ATQ% essentiel. Taux Crit ≥ 80%.'
  },
  'tevor': {
    alt: { set4: 'war', set2: 'recurve', label: 'Guerre + Incandescence' },
    mainStats: { ring: 'Taux de Crit', helmet: 'ATQ%', boots: 'VIT' },
    notes: 'DPS Scintillant burst. Foudre optimal pour maximiser C.DMG. ATQ% et C.DMG pour one-shot les cibles prioritaires. VIT pour agir avant les ennemis. Bon en PvE histoire et contre les boss mais remplacé en endgame par des DPS plus puissants.'
  },
  'tiye': {
    primary: { set4: 'wind', set2: 'recurve', label: 'Vent + Incandescence' },
    alt: { set4: 'wind', set2: 'sylvestre', label: 'Vent + Sylvestre' },
    mainStats: { ring: 'PV%', helmet: 'VIT', boots: 'VIT' },
    notes: 'Contrôleuse AP Aquatique. Vent + Recurve : VIT pour agir vite, Précision pour que les réductions de PA passent. Doit absolument être plus rapide que les ennemis. PV% pour la survie. Sa capacité à voler la PA en passif garantit un avantage constant sur le tempo du combat.'
  },
  'ye-suhua': {
    alt: { set4: 'wind', set2: 'lumiere', label: 'Vent + Lumière' },
    mainStats: { ring: 'PV%', helmet: 'VIT', boots: 'VIT' },
    notes: 'Support Scintillant discret mais efficace. Vent + Sylvestre pour la VIT et la survie. Lumière en alt pour l\'Immunité en PvP. VIT haute pour accorder ses buffs en priorité. Remplacé dans le meta actuel mais reste viable en mid-game pour les modes PvE courants.'
  },
  'donar': {
    primary: { set4: 'roche-inflexible', set2: 'sylvestre', label: 'Roche Inflexible + Sylvestre' },
    alt: { set4: 'en-bas', set2: 'roche-inflexible', label: 'Vol de Vie + Roche Inflexible' },
    mainStats: { ring: 'DEF%', helmet: 'PV%', boots: 'VIT' },
    notes: 'Défenseur DEF-scaling hybride. Ses dégâts et sa survie scalent sur la DEF. Roche Inflexible (+25% DEF) est prioritaire. PV% et DEF% pour maximiser le scaling. Vol de Vie en alt pour le sustain en PvE longue durée. Résistance pour ne pas être contrôlé.'
  },

  // ═══════════════════ A TIER ═══════════════════

  'berenice': {
    alt: { set4: 'wind', set2: 'sylvestre', label: 'Vent + Sylvestre' },
    mainStats: { ring: 'PV%', helmet: 'VIT', boots: 'VIT' },
    notes: 'Support/Healer Vent avec boucliers. Moon Dance scale les boucliers sur les PV max. Écume réduit les CDs. PV% prioritaire pour des boucliers plus épais. VIT pour agir souvent. Excellent pour Fafnir où la survie est critique. Synergise bien avec Gabrielle.'
  },
  'bonnie': {
    alt: { set4: 'domination', set2: 'recurve', label: 'Domination + Incandescence' },
    mainStats: { ring: 'PV%', helmet: 'VIT', boots: 'VIT' },
    notes: 'Contrôleuse Scintillant avec des debuffs variés. Vent + Sylvestre pour la VIT et la survie. Précision pour que ses debuffs passent. Domination en alt pour les chances d\'Étourdissement. PV% pour la survie. Option viable en PvE pour les joueurs F2P en attente de meilleurs contrôleurs.'
  },
  'heng-yue': {
    alt: { set4: 'panacee', set2: 'egide', label: 'Panacée + Égide' },
    mainStats: { ring: 'PV%', helmet: 'VIT', boots: 'VIT' },
    notes: 'Healeur SS Aquatique, soigne constamment via Golden Moon. Base VIT très basse (91) → Vent + Égide indispensable pour accélérer. Précision pour assurer la dissipation des debuffs alliés. PV% pour des soins plus efficaces. Panacée en alt si healeur principal. Top Fafnir.'
  },
  'hyde': {
    alt: { set4: 'foudre', set2: 'recurve', label: 'Foudre + Incandescence' },
    mainStats: { ring: 'Taux de Crit', helmet: 'ATQ%', boots: 'VIT' },
    notes: 'DPS Vent qui se ressuscite et vole les buffs. Vol de Vie + Avatara pour sustain et contre-attaques. Foudre en alt pour maximiser C.DMG. VIT important car sa base SPD est faible. Son revival passif le rend difficile à tuer. Capitaine +50% Résistance en PvP = équipe très résistante.'
  },
  'jiang-jiuli': {
    alt: { set4: 'foudre', set2: 'sylvestre', label: 'Foudre + Sylvestre' },
    mainStats: { ring: 'Taux de Crit', helmet: 'ATQ%', boots: 'VIT' },
    notes: 'DPS unique mi-Fighter mi-Defender. Plus il perd de PV, plus ses dégâts augmentent (+1% par 2% PV perdus). War + Sylvestre pour les dégâts et la survie. Éviter de le pairer avec des Taunt (ils l\'empêchent d\'encaisser). Foudre en alt pour maximiser C.DMG. PV% pour survivre et maintenir les stacks.'
  },
  'long-mian': {
    alt: { set4: 'wind', set2: 'egide', label: 'Vent + Égide' },
    mainStats: { ring: 'PV%', helmet: 'VIT', boots: 'VIT' },
    notes: 'Meilleur capitaine général du jeu : +20% VIT à toute l\'équipe change tout. Contrôleur Vent qui freeze et ralentit. Vent + Sylvestre pour sa survie. Précision indispensable pour que ses contrôles passent. PV% pour survivre. Doit agir avant les ennemis pour freezer en premier.'
  },
  'lynn': {
    alt: { set4: 'foudre', set2: 'recurve', label: 'Foudre + Incandescence' },
    mainStats: { ring: 'Taux de Crit', helmet: 'ATQ%', boots: 'VIT' },
    notes: 'DPS Vent multi-hits. Guerre + Recurve pour les dégâts et la précision. Foudre en alt pour les boss. Ses multiples frappes se combinent bien avec les attaques de poursuite d\'autres espers. Taux Crit ≥ 80%. Solide en PvE histoire pour le farming rapide.'
  },
  'melanie': {
    alt: { set4: 'wind', set2: 'egide', label: 'Vent + Égide' },
    mainStats: { ring: 'PV%', helmet: 'VIT', boots: 'VIT' },
    notes: 'Contrôleuse Scintillant avec pétrification et slow. Vent + Sylvestre pour la VIT et la survie. Précision pour que Pétrification passe. Obtenu via les Club Points — premier objectif de club à viser. Très utile en PvP pour son contrôle unique. PV% pour la survie.'
  },
  'ophelia': {
    alt: { set4: 'war', set2: 'recurve', label: 'Guerre + Incandescence' },
    mainStats: { ring: 'Taux de Crit', helmet: 'ATQ%', boots: 'VIT' },
    notes: 'DPS Vent burst avec scaling sur les buffs et debuffs. Foudre + Incandescence = build optimal. Ses dégâts explosent avec beaucoup de buffs actifs → synergise parfaitement avec Gabrielle. C.DMG prioritaire. VIT pour agir avant les ennemis. Redoutable en PvP contre les équipes très boostées.'
  },
  'triki': {
    alt: { set4: 'domination', set2: 'recurve', label: 'Domination + Incandescence' },
    mainStats: { ring: 'PV%', helmet: 'VIT', boots: 'VIT' },
    notes: 'Contrôleur Vent polyvalent. Vent + Sylvestre pour VIT et survie. Précision pour que ses debuffs passent (SPD Down, Stun). Domination en alt pour des chances d\'Étourdissement supplémentaires. Doit agir avant les ennemis. Capitaine +50% Résistance en PvP — excellent pour tenir les debuffs adverses.'
  },

  // ═══════════════════ B TIER ═══════════════════

  'biondina': {
    alt: { set4: 'en-bas', set2: 'recurve', label: 'Vol de Vie + Incandescence' },
    mainStats: { ring: 'Taux de Crit', helmet: 'ATQ%', boots: 'VIT' },
    notes: 'DPS Aquatique solide pour l\'early game. Guerre + Recurve standard. Vol de Vie en alt pour la survie en contenu difficile. Taux Crit ≥ 80%. ATQ% pour les dégâts. Remplacée rapidement par des DPS meilleurs mais correcte pour débuter le farming.'
  },
  'chang-pu': {
    alt: { set4: 'wind', set2: 'sylvestre', label: 'Vent + Sylvestre' },
    mainStats: { ring: 'PV%', helmet: 'VIT', boots: 'VIT' },
    notes: 'Healeur Aquatique F2P accessible. Panacée + Égide pour soins améliorés et protection. Vent en alt pour plus de VIT. PV% pour des soins plus efficaces. VIT prioritaire pour agir souvent. Bon substitut à Heng Yue en early game. À remplacer par un meilleur healeur dès que possible.'
  },
  'daylon': {
    alt: { set4: 'wind', set2: 'recurve', label: 'Vent + Incandescence' },
    mainStats: { ring: 'PV%', helmet: 'VIT', boots: 'VIT' },
    notes: 'Débuffeur Inferno avec réduction d\'ATQ et buff-strip. Vent + Sylvestre pour la VIT et la survie. Précision pour que ses debuffs passent. VIT pour agir avant les ennemis. Option correcte en early game pour réduire les dégâts subis dans les modes difficiles.'
  },
  'leon': {
    alt: { set4: 'en-bas', set2: 'recurve', label: 'Vol de Vie + Incandescence' },
    mainStats: { ring: 'Taux de Crit', helmet: 'ATQ%', boots: 'VIT' },
    notes: 'DPS Aquatique ciblage unique, bon pour Kronos en early game. Guerre + Recurve standard. Vol de Vie en alt pour la survie. Taux Crit ≥ 80%. ATQ% pour les dégâts. Remplacé rapidement par de meilleures options DPS mono-cible mais correct pour débuter le Miracle Rituel.'
  },
  'mona': {
    alt: { set4: 'war', set2: 'recurve', label: 'Guerre + Incandescence' },
    mainStats: { ring: 'Taux de Crit', helmet: 'ATQ%', boots: 'VIT' },
    notes: 'DPS zone F2P iconique de l\'early game. Vol de Vie = indispensable car elle se soigne via ses dégâts Hunter\'s Mark. Incandescence pour Taux Crit. C.DMG et Taux Crit ≥ 80%. Excellent pour farmer l\'Histoire des chapitres 1-8. Remplacée par Meta Mona en endgame.'
  },
}

// ──────────────── EXÉCUTION ────────────────

console.log(`🔧 Mise à jour de ${Object.keys(BUILDS).length} builds...`)
let ok = 0, fail = 0

for (const [id, updates] of Object.entries(BUILDS)) {
  // Récupérer le build actuel
  const { data, error: fetchErr } = await supabase
    .from('espers')
    .select('relic_build')
    .eq('id', id)
    .single()

  if (fetchErr) { console.error(`❌ fetch ${id}:`, fetchErr.message); fail++; continue }

  // Merger les nouvelles données sur l'existant
  const merged = { ...data.relic_build, ...updates }

  const { error } = await supabase
    .from('espers')
    .update({ relic_build: merged })
    .eq('id', id)

  if (error) { console.error(`❌ update ${id}:`, error.message); fail++ }
  else { process.stdout.write('.'); ok++ }
}

console.log(`\n\n✅ ${ok} builds complétés | ❌ ${fail} erreurs`)
