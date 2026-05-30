// Correction des tiers et modes basée sur recherche approfondie mai 2026
// Sources : driffle.com, playdislyte.com, pocketgamer.com, onechilledgamer.com
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://ogxwqebkwyharrrjoyep.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

// format modes : { story, kronos, apep, fafnir, pvp }
// SS = indispensable/top meta | S = excellent | A = bon | B = situationnel | C = faible

const CORRECTIONS = [

  // ══ CORRECTIONS DE TIER ══════════════════════════════════════════════

  // Toland : SS tier confirmé (toutes sources). Contrôleur + DPS SS AoE,
  // Zero Hour incapacite les ennemis, Trackback +10 VIT/stack = un des plus rapides du jeu
  {
    id: 'toland',
    tier: 'SS',
    modes: { story: 'SS', kronos: 'S', apep: 'S', fafnir: 'A', pvp: 'SS' },
    relic_build_patch: {
      primary: { set4: 'wind', set2: 'recurve', label: 'Vent + Incandescence' },
      alt:     { set4: 'wind', set2: 'egide',   label: 'Vent + Égide' },
      mainStats: { ring: 'PV%', helmet: 'VIT', boots: 'VIT' },
      substats: ['VIT', 'Précision', 'PV%', 'DEF%'],
      notes: 'Contrôleur SS tier — ses stacks Trackback donnent +10 VIT chacun, ce qui le rend parmi les plus rapides du jeu. Vent + Recurve pour maximiser VIT et Précision (Zero Hour doit passer). Il agit souvent et accorde des dégâts AoE dévastateurs via son ult. Incontournable en PvP.'
    },
    synergies: ['gabrielle', 'unas', 'narmer'],
  },

  // Elaine (Nyx) : S→SS selon driffle et pocketgamer. DPS Vent SS tier
  {
    id: 'elaine',
    tier: 'SS',
    modes: { story: 'S', kronos: 'A', apep: 'A', fafnir: 'S', pvp: 'SS' },
    relic_build_patch: {
      notes: 'DPS Vent SS tier. Excellent en PvP grâce à sa mobilité et ses dégâts multi-cibles. Set Foudre pour maximiser C.DMG. Synergise avec les supports rapides pour agir en premier.'
    }
  },

  // Valeria (Quetzalcoatl) : confirmée SS tier, "devastating DPS with multi-hit"
  {
    id: 'valeria',
    tier: 'SS',
    modes: { story: 'SS', kronos: 'S', apep: 'S', fafnir: 'SS', pvp: 'S' },
  },

  // ══ CORRECTIONS DE MODES (tier inchangé) ════════════════════════════

  // Gabrielle : KRO devrait être SS — elle est dans TOUTES les équipes boss
  {
    id: 'gabrielle',
    modes: { story: 'SS', kronos: 'SS', apep: 'SS', fafnir: 'SS', pvp: 'SS' },
  },

  // Ahmed : meilleur healeur pour TOUS les boss (World Stage réduit CDs + soigne 10x)
  {
    id: 'ahmed',
    modes: { story: 'SS', kronos: 'SS', apep: 'SS', fafnir: 'SS', pvp: 'S' },
  },

  // Clara : Purification (cleanse + immunité) indispensable en Kronos et Apep
  {
    id: 'clara',
    modes: { story: 'SS', kronos: 'SS', apep: 'SS', fafnir: 'S', pvp: 'SS' },
  },

  // Sally : healeur polyvalent excellent dans tous les modes boss
  {
    id: 'sally',
    modes: { story: 'SS', kronos: 'SS', apep: 'SS', fafnir: 'S', pvp: 'SS' },
  },

  // Sander : capitaine meta Kronos ET PvP (SPD buff + AP down) — PVP était A, devrait être SS
  {
    id: 'sander',
    modes: { story: 'S', kronos: 'SS', apep: 'S', fafnir: 'B', pvp: 'SS' },
  },

  // Li Ling : PVP=A trop bas, il est S en PvP (ult AoE + captain +30% ATQ)
  {
    id: 'li-ling',
    modes: { story: 'SS', kronos: 'S', apep: 'SS', fafnir: 'S', pvp: 'S' },
  },

  // Heng Yue : KRO=C complètement faux — elle est la 2e meilleure healeur après Ahmed
  {
    id: 'heng-yue',
    modes: { story: 'SS', kronos: 'S', apep: 'S', fafnir: 'S', pvp: 'A' },
  },

  // Lin Xiao : KRO=SS ✓ mais FAF=A (elle est très bonne vs Apep aussi)
  {
    id: 'lin-xiao',
    modes: { story: 'SS', kronos: 'SS', apep: 'SS', fafnir: 'A', pvp: 'S' },
  },

  // Unas : capitaine PvP SS, et très bon en PvE aussi — KRO était S ✓ mais PVP=SS ✓
  {
    id: 'unas',
    modes: { story: 'SS', kronos: 'SS', apep: 'S', fafnir: 'A', pvp: 'SS' },
  },

  // Gaius : AoE DPS, très fort en Apep (AoE sur les vagues) — APE=A trop bas
  {
    id: 'gaius',
    modes: { story: 'SS', kronos: 'S', apep: 'S', fafnir: 'B', pvp: 'S' },
  },

  // Abigail : revival + bouclier, top PvP et boss — FAF=S ✓ KRO=S ✓
  {
    id: 'abigail',
    modes: { story: 'S', kronos: 'S', apep: 'S', fafnir: 'SS', pvp: 'SS' },
  },

  // Tiye : AP controller, KRO=S ✓ PVP=SS ✓ APE=S (bonne en Apep aussi)
  {
    id: 'tiye',
    modes: { story: 'SS', kronos: 'SS', apep: 'S', fafnir: 'A', pvp: 'SS' },
  },

  // Lucas : AP stealer/stun, top PvP SS ✓, TOP pour la Tour aussi — KRO=S ✓
  {
    id: 'lucas',
    modes: { story: 'SS', kronos: 'SS', apep: 'S', fafnir: 'B', pvp: 'SS' },
  },

  // Raven : dissipation PvP SS ✓ mais KRO=S (elle est aussi utile en Kronos pour DEF Down)
  {
    id: 'raven',
    modes: { story: 'S', kronos: 'S', apep: 'S', fafnir: 'B', pvp: 'SS' },
  },

  // Narmer : burst DPS PvP SS ✓ — KRO=A (il est passable en Kronos, correct)
  {
    id: 'narmer',
    modes: { story: 'S', kronos: 'A', apep: 'B', fafnir: 'B', pvp: 'SS' },
  },

  // Long Mian : capitaine +20% VIT = meilleur captain PvP — PVP=SS ✓ mais modes PvE trop bas
  {
    id: 'long-mian',
    modes: { story: 'S', kronos: 'S', apep: 'A', fafnir: 'A', pvp: 'SS' },
  },

  // Sienna : AP reset AoE + Stun, PVP=SS ✓ STR=SS (farming)
  {
    id: 'sienna',
    modes: { story: 'SS', kronos: 'A', apep: 'B', fafnir: 'B', pvp: 'SS' },
  },

  // Fabrice : Invincibilité + Immunité équipe → indispensable en boss difficiles
  {
    id: 'fabrice',
    modes: { story: 'S', kronos: 'S', apep: 'SS', fafnir: 'S', pvp: 'S' },
  },

  // Berenice : boucliers + CDR → SS en Fafnir ✓, sous-évaluée ailleurs
  {
    id: 'berenice',
    modes: { story: 'S', kronos: 'A', apep: 'A', fafnir: 'SS', pvp: 'A' },
  },

  // Tang Yun : multi-hit = Fafnir SS ✓, KRO=S (bon pour Kronos aussi)
  {
    id: 'tang-yun',
    modes: { story: 'S', kronos: 'S', apep: 'A', fafnir: 'SS', pvp: 'B' },
  },

  // Lu Yi : 9 hits → Fafnir SS ✓, capitaine +30% ATQ en PvE = excellent Kronos
  {
    id: 'lu-yi',
    modes: { story: 'S', kronos: 'S', apep: 'A', fafnir: 'SS', pvp: 'B' },
  },

  // Jacob : immunisé au poison → APE=SS (il est spécifiquement recommandé pour Apep)
  {
    id: 'jacob',
    modes: { story: 'B', kronos: 'B', apep: 'SS', fafnir: 'B', pvp: 'A' },
  },

  // Ollie : KRO=SS (son passif protège des coups fatals = parfait sur Kronos), PVP=S ✓
  {
    id: 'ollie',
    modes: { story: 'S', kronos: 'SS', apep: 'A', fafnir: 'B', pvp: 'S' },
  },

  // Fatum Sisters : KRO=S ✓ APE=S ✓ (elles sont bonnes dans tous les modes boss)
  {
    id: 'fatum-sisters',
    modes: { story: 'S', kronos: 'SS', apep: 'SS', fafnir: 'S', pvp: 'S' },
  },

  // Ye Suhua : réduit CDs + buffs → SS partout où les CDs comptent
  {
    id: 'ye-suhua',
    modes: { story: 'S', kronos: 'SS', apep: 'SS', fafnir: 'S', pvp: 'SS' },
  },

  // Leora (Athena) : SS tier ✓ — modes à corriger (SS dans tous les modes)
  {
    id: 'leora',
    modes: { story: 'SS', kronos: 'SS', apep: 'SS', fafnir: 'S', pvp: 'SS' },
  },

  // Pindar : support ultime pour amplifier DPS — SS dans tous les modes de boss
  {
    id: 'pindar',
    modes: { story: 'SS', kronos: 'SS', apep: 'SS', fafnir: 'SS', pvp: 'SS' },
  },

  // Lü Shang : support SS polyvalent → SS partout
  {
    id: 'lu-shang',
    modes: { story: 'SS', kronos: 'SS', apep: 'SS', fafnir: 'SS', pvp: 'S' },
  },

  // Meta Gabrielle / Pindar / Lü Shang tous SS modes

  // Mona : SS Story/Cube ✓ — KRO=A (correct, pas la meilleure en boss)
  {
    id: 'mona',
    modes: { story: 'SS', kronos: 'A', apep: 'S', fafnir: 'B', pvp: 'S' },
  },

  // Hyde : PvP SS (cap +50% RESIST + auto-revival) — mode PvE corrigés
  {
    id: 'hyde',
    modes: { story: 'A', kronos: 'B', apep: 'A', fafnir: 'S', pvp: 'SS' },
  },

  // Donar : PvP SS ✓ (Defender hybride — pas top en PvE farming mais solide)
  {
    id: 'donar',
    modes: { story: 'A', kronos: 'A', apep: 'B', fafnir: 'B', pvp: 'SS' },
  },

  // Triki : PvP SS ✓ (cap +50% RESIST) — mais pas top en PvE
  {
    id: 'triki',
    modes: { story: 'B', kronos: 'B', apep: 'B', fafnir: 'A', pvp: 'SS' },
  },

  // Melanie : Pétrification PvP → bonne option A-S, KRO=S était trop haut
  {
    id: 'melanie',
    modes: { story: 'B', kronos: 'A', apep: 'A', fafnir: 'A', pvp: 'S' },
  },

  // Ophelia : Fafnir et Apep très fort (scaling debuffs+buffs)
  {
    id: 'ophelia',
    modes: { story: 'S', kronos: 'A', apep: 'SS', fafnir: 'SS', pvp: 'A' },
  },

  // Jiang Jiuli : bon Fafnir (DEF-ignore + survive damage) — STR=S ✓
  {
    id: 'jiang-jiuli',
    modes: { story: 'S', kronos: 'B', apep: 'A', fafnir: 'S', pvp: 'A' },
  },
]

// ── Exécution ──────────────────────────────────────────────────────────────
console.log(`🔧 Application de ${CORRECTIONS.length} corrections de tiers/modes...`)
let ok = 0, fail = 0

for (const c of CORRECTIONS) {
  const updateData = {}
  if (c.tier) updateData.tier = c.tier
  if (c.modes) updateData.modes = c.modes
  if (c.synergies) updateData.synergies = c.synergies

  // Patch partiel du relic_build si nécessaire
  if (c.relic_build_patch) {
    const { data, error: fetchErr } = await supabase.from('espers').select('relic_build').eq('id', c.id).single()
    if (fetchErr) { console.error(`❌ fetch ${c.id}:`, fetchErr.message); fail++; continue }
    updateData.relic_build = { ...data.relic_build, ...c.relic_build_patch }
  }

  const { error } = await supabase.from('espers').update(updateData).eq('id', c.id)
  if (error) { console.error(`❌ ${c.id}:`, error.message); fail++ }
  else { process.stdout.write('.'); ok++ }
}

console.log(`\n\n✅ ${ok} corrections appliquées | ❌ ${fail} erreurs`)
