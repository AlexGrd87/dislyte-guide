import { useState } from 'react'

const STEPS = [
  {
    id: 'start',
    label: 'Démarrage',
    sub: 'Semaine 1',
    icon: '🚀',
    color: '#52ff8a',
    objectif: 'Terminer le tutoriel, obtenir les premiers espers gratuits et poser les bases.',
    pulls: [
      { label: 'Espers tutoriel', tip: 'Gaius ou Clara selon ton lot — garde-les, ils restent utiles long terme.' },
      { label: 'Bannière débutant', tip: 'Reroll jusqu\'à obtenir un SS ou S Tier de la liste méta.' },
    ],
    modes: [
      { label: 'Histoire (Normal)', tip: 'Source principale d\'XP et de matériaux early.' },
      { label: 'Kronos (Normal)', tip: 'Premiers sets de Relics — Guerre & Vent.' },
    ],
    relics: [
      { name: 'Guerre', why: 'ATQ +30% — base de tout DPS.' },
      { name: 'Vent', why: 'VIT +25% — indispensable pour les supports.' },
    ],
    tips: [
      'Ne dépense pas tes Nexus Crystals sur des bannières événements early.',
      'Fais les quêtes journalières chaque jour — elles donnent des Nexus Crystals.',
      'Élève tous tes espers au niveau 20 avant de monter le premier à 30+.',
    ],
  },
  {
    id: 'early',
    label: 'Early Game',
    sub: 'Semaine 2–4',
    icon: '⚔️',
    color: '#38BDF8',
    objectif: 'Stabiliser une team Kronos, débloquer Apep et poser ta première équipe viable.',
    pulls: [
      { label: 'Priorité : 1 Soigneur (Clara / Sally)', tip: 'Sans soigneur, tu ne peux pas farm de manière durable.' },
      { label: 'Priorité : 1 Support PA (Gabrielle)', tip: 'Gabrielle accélère toutes tes rotations — impact immédiat.' },
    ],
    modes: [
      { label: 'Kronos Difficile', tip: 'Vise l\'autobattle 3★ pour farm efficacement.' },
      { label: 'Apep Normal', tip: 'Sets DEF et PV pour tes tanks et soigneurs.' },
      { label: 'Cube Miracle', tip: 'Or et matériaux d\'évolution — à faire quotidiennement.' },
    ],
    relics: [
      { name: 'Foudre', why: '+30% Dégâts Crit vs boss — priorité sur ton DPS principal.' },
      { name: 'Panacée', why: 'Soins +30% — sur ton soigneur dès que possible.' },
    ],
    tips: [
      'Vise 60% Taux de Crit minimum avant d\'investir en Dégâts Crit.',
      'La VIT du support doit être > VIT du DPS pour agir en premier.',
      'Garde tes Stam Potions pour les événements double drop.',
    ],
  },
  {
    id: 'mid',
    label: 'Mid Game',
    sub: 'Mois 1–2',
    icon: '📈',
    color: '#FFD200',
    objectif: 'Monter Kronos en Légendaire, débloquer Fafnir et entrer en PvP.',
    pulls: [
      { label: 'DPS cible unique SS (Gaius / Li Ling)', tip: 'Li Ling est le meilleur DPS polyvalent du jeu si tu peux l\'avoir.' },
      { label: 'Contrôleur PA (Wu You / Unas)', tip: 'Wu You en PvP, Unas en PvE — change la dynamique de tes combats.' },
      { label: 'Support buff (Lu Shang / Pindar)', tip: 'Lu Shang ouvre le meta SS tier. Priorité absolue si disponible.' },
    ],
    modes: [
      { label: 'Kronos Légendaire', tip: 'Sets Soutien, Incandescence — les meilleurs relics DPS et support.' },
      { label: 'Apep Difficile', tip: 'Meilleur loot DEF/PV pour tes tanks.' },
      { label: 'Fafnir Normal', tip: 'Sets multi-hits — Lin Xiao/Li Ling excellent ici.' },
      { label: 'Guerre des Points (PvP)', tip: 'Commence avec une team VIT max pour agir en premier.' },
    ],
    relics: [
      { name: 'Soutien', why: '25% chance d\'assist attack — combo parfait avec Pindar ou Lu Shang.' },
      { name: 'Incandescence', why: '+15% Taux de Crit — set 2p universel pour tous les DPS.' },
      { name: 'Avatara', why: 'Counter-attaque — sur les Tanks/Défenseurs.' },
    ],
    tips: [
      'Optimise 3 espers à fond plutôt que 6 espers à moitié.',
      'En PvP : la vitesse prime tout — vise 250+ VIT sur ton lead.',
      'Fais les événements limités pour les Nexus Crystals gratuits.',
    ],
  },
  {
    id: 'late',
    label: 'Late Game',
    sub: 'Mois 3–6',
    icon: '🏆',
    color: '#FF2D87',
    objectif: 'Maximiser Fafnir, farmer des Relics +15 et dominer le Point War.',
    pulls: [
      { label: 'Team PvP dédiée', tip: 'Meta Li Ling + Wu You + Lu Shang + Soigneur = core PvP SS.' },
      { label: 'DPS Zone (Arthur / Meta Freddy)', tip: 'Indispensables pour les modes multi-ennemis et Apep.' },
      { label: 'Espers méta événements', tip: 'Les Metas sont souvent les plus puissants — garde des crystals pour eux.' },
    ],
    modes: [
      { label: 'Fafnir Difficile → Légendaire', tip: 'Sets Calamité et multi-hits — focus saignements et debuffs.' },
      { label: 'Point War (PvP)', tip: 'Vise le Diamant — les récompenses sont significativement meilleures.' },
      { label: 'Rituel Ancêtre', tip: 'Content endgame — nécessite des équipes très optimisées.' },
    ],
    relics: [
      { name: 'Calamité', why: 'Poison sur chaque attaque — OP sur les Neutralisateurs et DPS debuffers.' },
      { name: 'Conjuration', why: 'Amplification des buffs — sur Lu Shang ou Pindar pour max synergie.' },
      { name: 'Guerre +15', why: 'L\'objectif : au moins un DPS avec set complet +15 pour Kronos Legend.' },
    ],
    tips: [
      'Reforge tes Relics via l\'Echo Resonance plutôt que d\'en farmer des nouveaux.',
      'Garde 2 équipes distinctes : une PvE boss, une PvP vitesse.',
      'Les sous-stats ATQ flat < ATQ% dès que tu as +2000 ATQ de base.',
    ],
  },
  {
    id: 'endgame',
    label: 'Endgame',
    sub: 'Mois 6+',
    icon: '💎',
    color: '#A855F7',
    objectif: 'Relics parfaits, roster complet, domination tous modes.',
    pulls: [
      { label: 'Compléter le roster méta', tip: 'Si tu n\'as pas encore Lu Shang ou Meta Li Ling — priorité absolue.' },
      { label: 'Espers niche (Ling Zhao, Wenlock)', tip: 'Pour les modes spécifiques — optimisation finale.' },
    ],
    modes: [
      { label: 'Tous les boss en Légendaire', tip: 'Objectif : autobattle 3★ sur tous les niveaux max.' },
      { label: 'Point War — Diamant', tip: 'Vise le Top 100 pour les meilleures récompenses hebdo.' },
    ],
    relics: [
      { name: 'Tous les sets +12 minimum', why: 'Prioritise les substats : Taux/Dégâts Crit, ATQ%, VIT.' },
      { name: 'Reforge ciblée', why: 'Utilise l\'Echo Resonance pour cibler les substats manquantes.' },
    ],
    tips: [
      'Un roster de 10 espers bien équipés > 30 espers mal équipés.',
      'Participe à tous les événements — même petits, ils accumulent.',
      'Rejoins une guilde active pour les bonus de ressources.',
    ],
  },
]

export default function Progression() {
  const [active, setActive] = useState('start')
  const step = STEPS.find(s => s.id === active)

  return (
    <div className="page" style={{ paddingTop: '40px', paddingBottom: '80px' }}>

      {/* Header */}
      <div className="section-header" style={{ marginBottom: '40px' }}>
        <div>
          <h1 className="section-title" style={{ color: '#52ff8a' }}>Guide Progression F2P</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>
            Roadmap complète — Démarrage → Endgame · 100% Free to Play
          </p>
        </div>
        <div className="section-header-line" style={{ background: 'linear-gradient(90deg, rgba(82,255,138,0.3), transparent)' }} />
      </div>

      {/* Timeline nav */}
      <div style={{ display: 'flex', gap: '0', marginBottom: '40px', overflowX: 'auto', paddingBottom: '4px' }}>
        {STEPS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setActive(s.id)}
            style={{
              flex: '1 0 auto',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: '6px', padding: '14px 20px',
              background: active === s.id ? `${s.color}15` : 'transparent',
              border: 'none',
              borderBottom: `3px solid ${active === s.id ? s.color : 'rgba(255,255,255,0.08)'}`,
              cursor: 'pointer', transition: 'all 200ms',
              position: 'relative',
            }}
          >
            {/* Connecteur */}
            {i < STEPS.length - 1 && (
              <div style={{
                position: 'absolute', top: '22px', right: '-1px',
                width: '2px', height: '2px',
                background: 'transparent', zIndex: 1,
              }} />
            )}
            <span style={{ fontSize: '20px' }}>{s.icon}</span>
            <span style={{ fontSize: '13px', fontWeight: 700, fontFamily: 'var(--font-ui)', color: active === s.id ? s.color : 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
              {s.label}
            </span>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-ui)' }}>{s.sub}</span>
          </button>
        ))}
      </div>

      {/* Contenu de l'étape */}
      {step && (
        <div key={step.id} className="animate-fade">
          {/* Objectif */}
          <div style={{
            padding: '20px 24px', borderRadius: '14px', marginBottom: '32px',
            background: `${step.color}10`, border: `1px solid ${step.color}30`,
          }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '11px', color: step.color, letterSpacing: '2px', marginBottom: '8px' }}>
              {step.icon} OBJECTIF — {step.label.toUpperCase()}
            </div>
            <p style={{ fontSize: '15px', color: 'var(--text-primary)', lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
              {step.objectif}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>

            {/* Pulls prioritaires */}
            <div className="card" style={{ padding: '24px' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '11px', color: '#FF2D87', letterSpacing: '2px', marginBottom: '16px' }}>
                🎯 PULLS PRIORITAIRES
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {step.pulls.map((p, i) => (
                  <div key={i} style={{
                    padding: '12px 14px', borderRadius: '10px',
                    background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)',
                  }}>
                    <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: '13px', marginBottom: '4px', color: 'var(--text-primary)' }}>
                      {p.label}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.5 }}>{p.tip}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modes à farmer */}
            <div className="card" style={{ padding: '24px' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '11px', color: '#FFD200', letterSpacing: '2px', marginBottom: '16px' }}>
                🗺️ MODES À FARMER
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {step.modes.map((m, i) => (
                  <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '6px', height: '6px', borderRadius: '50%', flexShrink: 0,
                      background: step.color, marginTop: '6px',
                    }} />
                    <div>
                      <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: '13px', color: 'var(--text-primary)' }}>
                        {m.label}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.5 }}>{m.tip}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Relics */}
            <div className="card" style={{ padding: '24px' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '11px', color: '#A855F7', letterSpacing: '2px', marginBottom: '16px' }}>
                ⚙️ RELICS À PRIORISER
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {step.relics.map((r, i) => (
                  <div key={i} style={{
                    padding: '10px 14px', borderRadius: '8px',
                    background: 'rgba(168,85,247,0.06)', border: '1px solid rgba(168,85,247,0.2)',
                  }}>
                    <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: '13px', color: '#A855F7', marginBottom: '3px' }}>
                      {r.name}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{r.why}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips F2P */}
            <div className="card" style={{ padding: '24px', background: 'rgba(82,255,138,0.03)', borderColor: 'rgba(82,255,138,0.15)' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '11px', color: '#52ff8a', letterSpacing: '2px', marginBottom: '16px' }}>
                💡 TIPS F2P
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {step.tips.map((t, i) => (
                  <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    <span style={{ color: '#52ff8a', flexShrink: 0, fontWeight: 700 }}>{i + 1}.</span>
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Progression indicator */}
          <div style={{ marginTop: '32px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            {STEPS.map((s, i) => (
              <div key={s.id} style={{
                flex: s.id === active ? 3 : 1,
                height: '4px', borderRadius: '2px',
                background: STEPS.findIndex(x => x.id === active) >= i ? s.color : 'rgba(255,255,255,0.08)',
                transition: 'all 300ms',
              }} />
            ))}
          </div>
          <div style={{ marginTop: '8px', fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-ui)' }}>
            Étape {STEPS.findIndex(s => s.id === active) + 1} / {STEPS.length}
          </div>
        </div>
      )}
    </div>
  )
}
