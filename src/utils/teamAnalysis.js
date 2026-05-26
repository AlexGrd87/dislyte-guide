import { ELEMENTS } from '../data/espers.js'

export function analyzeTeam(espers) {
  const active = espers.filter(Boolean)
  if (active.length === 0) return null

  const elements = [...new Set(active.map(e => e.element))]
  const roles = active.map(e => e.role)

  const hasRole = (role) => roles.includes(role)
  const hasHealer = hasRole('healer')
  const hasDPS = hasRole('dps')
  const hasSupport = hasRole('support')
  const hasController = hasRole('controller') || hasRole('ap-controller')
  const hasDebuffer = hasRole('debuffer')
  const hasDefender = hasRole('defender')

  const missingRoles = []
  if (!hasHealer && !hasSupport) missingRoles.push({ role: 'healer', label: 'Soigneur / Support', icon: '💚', critical: true })
  if (!hasDPS) missingRoles.push({ role: 'dps', label: 'DPS principal', icon: '⚔️', critical: true })
  if (!hasSupport && active.length >= 3) missingRoles.push({ role: 'support', label: 'Support', icon: '💙', critical: false })
  if (!hasController && active.length >= 4) missingRoles.push({ role: 'controller', label: 'Contrôle / CPA', icon: '🔒', critical: false })

  const synergies = detectSynergies(active)
  const speedTips = getSpeedTips(active, roles)
  const elementCoverage = getElementCoverage(elements)
  const overallScore = computeScore(active, hasHealer, hasDPS, hasSupport, synergies)

  return {
    elements,
    roles,
    hasHealer,
    hasDPS,
    hasSupport,
    hasController,
    hasDebuffer,
    missingRoles,
    synergies,
    speedTips,
    elementCoverage,
    overallScore,
    verdict: getVerdict(overallScore, missingRoles),
  }
}

function detectSynergies(espers) {
  const synergies = []
  const ids = espers.map(e => e.id)

  if (ids.includes('gaius') && ids.includes('abigail'))
    synergies.push({ label: 'Gaius + Abigail', desc: 'Combo légendaire — destruction garantie en boss et PvP', strength: 'legendary', icon: '💥' })

  if (ids.includes('gaius') && ids.includes('ahmed'))
    synergies.push({ label: 'Gaius + Ahmed', desc: 'La réduction DEF d\'Ahmed multiplie les dégâts de Gaius', strength: 'strong', icon: '🔥' })

  if (ids.includes('unas') || ids.includes('long-mian') || ids.includes('sander'))
    synergies.push({ label: 'Contrôleur de PA présent', desc: 'Votre équipe agira avant les ennemis — avantage tactique majeur', strength: 'strong', icon: '⚡' })

  if (ids.includes('gabrielle'))
    synergies.push({ label: 'Gabrielle incluse', desc: 'Elle améliore n\'importe quelle composition. +25% ATQ captain.', strength: 'good', icon: '✨' })

  if (ids.includes('tang-yun') && ids.includes('lu-yi'))
    synergies.push({ label: 'Tang Yun + Lu Yi', desc: 'Duo multi-hits spécialiste Fafnir — brise les shields rapidement', strength: 'strong', icon: '🐉' })

  if (ids.includes('raven') && ids.includes('meredith'))
    synergies.push({ label: 'Raven + Meredith', desc: 'Duo PvP : dissipation + immunité = contrôle total du meta', strength: 'strong', icon: '⚔️' })

  if (ids.includes('berenice') && (ids.includes('abigail') || ids.includes('tang-yun')))
    synergies.push({ label: 'Bérénice + DPS pursuit', desc: 'La réduction CD de Bérénice accélère les ultimates', strength: 'good', icon: '🔄' })

  if (ids.includes('long-mian') && ids.includes('unas'))
    synergies.push({ label: 'Long Mian + Unas', desc: 'Double CPA — vos ennemis n\'auront presque jamais leur tour', strength: 'legendary', icon: '🌪️' })

  return synergies
}

function getSpeedTips(espers, roles) {
  const tips = []
  const hasAPController = roles.includes('ap-controller')
  const hasSupport = roles.includes('support')

  if (!hasAPController)
    tips.push({ type: 'warning', text: 'Aucun Contrôleur de PA — vos ennemis agiront en premier.' })
  else
    tips.push({ type: 'success', text: 'CPA présent — vous contrôlez l\'ordre des tours. Équipez-le en VIT prioritaire.' })

  if (hasSupport)
    tips.push({ type: 'info', text: 'Votre Support doit être le plus rapide de l\'équipe pour appliquer ses buffs en premier.' })

  const dpsCount = roles.filter(r => r === 'dps').length
  if (dpsCount >= 3)
    tips.push({ type: 'warning', text: 'Équipe très offensive (3+ DPS) — assurez-vous d\'avoir au moins un soigneur ou de la survie suffisante.' })

  return tips
}

function getElementCoverage(elements) {
  return Object.entries(ELEMENTS).map(([key, el]) => ({
    ...el,
    element: key,
    present: elements.includes(key),
  }))
}

function computeScore(espers, hasHealer, hasDPS, hasSupport, synergies) {
  let score = 0
  const n = espers.length

  score += n * 10
  if (hasHealer) score += 20
  if (hasDPS) score += 20
  if (hasSupport) score += 15

  const tierScores = { SS: 15, S: 10, A: 6, B: 3, C: 1 }
  espers.forEach(e => { score += (tierScores[e.tier] || 0) })

  synergies.forEach(s => {
    if (s.strength === 'legendary') score += 20
    else if (s.strength === 'strong') score += 10
    else score += 5
  })

  return Math.min(100, score)
}

function getVerdict(score, missing) {
  const hasCritical = missing.some(m => m.critical)
  if (hasCritical) return { label: 'Incomplète', color: '#ff5252', desc: 'Il manque des rôles critiques.' }
  if (score >= 85) return { label: 'Meta', color: '#ff4af0', desc: 'Composition top-tier.' }
  if (score >= 65) return { label: 'Solide', color: '#ffd04a', desc: 'Bonne synergie d\'ensemble.' }
  if (score >= 45) return { label: 'Correcte', color: '#4af0ff', desc: 'Équipe fonctionnelle.' }
  return { label: 'À améliorer', color: '#52ff8a', desc: 'Cherche de meilleures synergies.' }
}
