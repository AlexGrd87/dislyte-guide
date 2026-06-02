// Constantes statiques — les données espers sont en DB Supabase
// Récupérer via : import { useEspers } from '../context/EspersContext.jsx'
// Éléments : "flow" | "inferno" | "wind" | "umbra" | "shimmer"
// Rôles    : "dps" | "support" | "healer" | "controller" | "debuffer" | "defender" | "ap-controller"
// Tiers    : "SS" | "S" | "A" | "B" | "C"

const BASE = import.meta.env.BASE_URL

export const ELEMENTS = {
  flow:    { label: 'Aquatique',   emoji: '🔵', icon: `${BASE}images/espers/icone-aquatique.png`,   color: '#3B9EFF', strong: 'inferno', weak: 'wind' },
  inferno: { label: 'Brasier',     emoji: '🔴', icon: `${BASE}images/espers/icone-brasier.png`,     color: '#FF5C2B', strong: 'wind',    weak: 'flow' },
  wind:    { label: 'Vent',        emoji: '🟢', icon: `${BASE}images/espers/icone-vent.png`,        color: '#36D98A', strong: 'flow',    weak: 'inferno' },
  umbra:   { label: 'Ombre',       emoji: '🟣', icon: `${BASE}images/espers/icone-ombre.png`,       color: '#A855F7', strong: 'all',     weak: 'shimmer' },
  shimmer: { label: 'Scintillant', emoji: '🟡', icon: `${BASE}images/espers/icone-scintillant.png`, color: '#FFD535', strong: 'umbra',   weak: null },
}

// Labels détaillés par rôle (badges sur les cartes)
export const ROLES = {
  dps:             { label: 'Combattant',     icon: '⚔️', color: '#FF5C5C' },
  support:         { label: 'Soutien',        icon: '💙', color: '#60A5FA' },
  healer:          { label: 'Soutien',        icon: '💚', color: '#4ADE80' },
  controller:      { label: 'Neutralisateur', icon: '🎯', color: '#C084FC' },
  debuffer:        { label: 'Neutralisateur', icon: '🎯', color: '#FB923C' },
  defender:        { label: 'Tank',           icon: '🛡️', color: '#FCD34D' },
  'ap-controller': { label: 'Neutralisateur', icon: '🎯', color: '#F472B6' },
}

// Groupes de rôles pour les filtres UI — 4 catégories officielles du jeu
export const ROLE_GROUPS = {
  combattant:     { label: 'Combattant',     icon: '⚔️', color: '#FF5C5C', roles: ['dps'] },
  tank:           { label: 'Tank',           icon: '🛡️', color: '#FCD34D', roles: ['defender'] },
  soutien:        { label: 'Soutien',        icon: '💙', color: '#60A5FA', roles: ['support', 'healer'] },
  neutralisateur: { label: 'Neutralisateur', icon: '🎯', color: '#C084FC', roles: ['controller', 'debuffer', 'ap-controller'] },
}

export const TIERS = {
  SS: { label: 'SS', color: '#FF2D87' },
  S:  { label: 'S',  color: '#FFD200' },
  A:  { label: 'A',  color: '#38BDF8' },
  B:  { label: 'B',  color: '#4ADE80' },
  C:  { label: 'C',  color: 'rgba(220,220,240,0.45)' },
}
