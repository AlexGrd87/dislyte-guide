import { useState } from 'react'
import { useEspers } from '../context/EspersContext.jsx'
import { ELEMENTS } from '../data/espers.js'
import { ElementIcon } from '../components/EsperCard.jsx'

const BOSSES = [
  {
    id: 'kronos',
    name: 'Kronos',
    icon: '👹',
    color: '#FF2D87',
    element: 'Ombre',
    weakness: 'Scintillant',
    desc: 'Boss du Rituel des Miracles. Réduit la PA de l\'équipe et inflige des debuffs massifs. Priorité : vitesse + contrôle de PA.',
    teams: [
      {
        label: 'Meta — Kronos SS',
        tier: 'SS',
        ids: ['gaius', 'ahmed', 'unas', 'gabrielle', 'sander'],
        captain: 'sander',
        notes: 'Sander comme capitaine (+25% VIT) est la clé. Ahmed réduit la DEF de Kronos (-100% DEF), Unas vole la PA, Gaius détruit. Viser 300+ VIT sur Sander.',
      },
      {
        label: 'F2P accessible',
        tier: 'A',
        ids: ['lin-xiao', 'ahmed', 'berenice', 'gabrielle', 'sa-ba'],
        captain: 'gabrielle',
        notes: 'Lin Xiao multi-hits pour stacks d\'ATQ. Berenice accélère les CD. Budget team efficace jusqu\'en difficile.',
      },
    ],
    tips: [
      '⚡ VIT minimum : 180+ sur tous les espers, 300+ sur Sander',
      '⚔️ Kronos est Ombre — Scintillant deal +25% de dégâts',
      '🎯 Ahmed est OBLIGATOIRE pour la réduction DEF (-100%)',
      '🔒 Unas ou Long Mian pour contrôler la PA de Kronos',
      '🌀 Sander capitaine = +25% VIT équipe = premier à agir',
    ],
  },
  {
    id: 'apep',
    name: 'Apep',
    icon: '🐍',
    color: '#4ADE80',
    element: 'Brasier',
    weakness: 'Aquatique',
    desc: 'Serpent du désert. Dispose de phases d\'immunité et inflige Poison à l\'équipe. Nécessite des multi-hits pour casser ses phases.',
    teams: [
      {
        label: 'Meta — Apep SS',
        tier: 'SS',
        ids: ['lin-xiao', 'lu-yi', 'tang-yun', 'ahmed', 'gabrielle'],
        captain: 'lu-yi',
        notes: 'Lin Xiao + Tang Yun multi-hits pour déclencher les phases. Lu Yi soigne + boost ATQ Aquatique. Ahmed réduit DEF. Foudre set recommandé sur Lin Xiao.',
      },
      {
        label: 'Option DPS Ombre',
        tier: 'S',
        ids: ['arthur', 'lu-yi', 'unas', 'berenice', 'ahmed'],
        captain: 'lu-yi',
        notes: 'Arthur AoE Ombre + Lu Yi capitaine Aquatique. Unas contrôle la PA. Solide en SS si bon équipement.',
      },
    ],
    tips: [
      '💧 Apep est Brasier — Aquatique deal +25% de dégâts',
      '🔄 Multi-hits essentiels pour passer les phases d\'immunité',
      '☠️ Avoir un cleanse pour le poison (Lu Yi recommandé)',
      '🎯 Ahmed reste obligatoire pour la réduction DEF',
      '💡 Lin Xiao avec set Foudre = boss killer en Apep',
    ],
  },
  {
    id: 'fafnir',
    name: 'Fafnir',
    icon: '🐉',
    color: '#38BDF8',
    element: 'Scintillant',
    weakness: 'Ombre',
    desc: 'Dragon du Nord. Invoqué des boucliers massifs — les casser avec des multi-hits est indispensable. Phase finale très agressive.',
    teams: [
      {
        label: 'Meta — Fafnir SS',
        tier: 'SS',
        ids: ['abigail', 'tang-yun', 'berenice', 'lu-yi', 'ahmed'],
        captain: 'berenice',
        notes: 'Abigail + Tang Yun pour briser les shields en multi-hits. Berenice accélère les ultimates en chaîne. Lu Yi soigne + débuff passif.',
      },
      {
        label: 'Option Arthur',
        tier: 'S',
        ids: ['arthur', 'abigail', 'berenice', 'lu-yi', 'ahmed'],
        captain: 'berenice',
        notes: 'Arthur Ombre est fort ici car Fafnir est Scintillant (+25% dégâts). Combo avec Abigail pour casser les boucliers.',
      },
    ],
    tips: [
      '🌟 Fafnir est Scintillant — Ombre deal +25% de dégâts',
      '🛡️ Ses boucliers absorbent 100% des dégâts — multi-hits obligatoires',
      '⚡ Berenice est CLEF — accélère les CD pour chaîner les ultimates',
      '💡 Tang Yun (multi-hits) + Abigail (ignore boucliers) = combo meta',
      '🎯 Ahmed toujours là pour la réduction DEF',
    ],
  },
]

function EsperMini({ id, isCaptain, espers }) {
  const e = espers.find(x => x.id === id)
  if (!e) return <div style={{ width: '52px', height: '52px', borderRadius: '10px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)' }} />
  const el = ELEMENTS[e.element]
  return (
    <div style={{ textAlign: 'center', position: 'relative' }}>
      {isCaptain && (
        <div style={{ position: 'absolute', top: '-8px', left: '50%', transform: 'translateX(-50%)', fontSize: '12px', zIndex: 1 }}>👑</div>
      )}
      <div style={{
        width: '52px', height: '52px', borderRadius: '10px', overflow: 'hidden',
        background: `${el?.color}20`, border: `2px solid ${isCaptain ? '#FFD200' : el?.color + '50' || 'var(--border)'}`,
        boxShadow: isCaptain ? '0 0 12px rgba(255,210,0,0.3)' : 'none',
      }}>
        {e.image
          ? <img src={e.image} alt={e.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
          : <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}><ElementIcon el={el} size={22} /></div>}
      </div>
      <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '3px', maxWidth: '56px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.name}</div>
    </div>
  )
}

export default function BossGuide() {
  const { espers } = useEspers()
  const [activeBoss, setActiveBoss] = useState('kronos')
  const boss = BOSSES.find(b => b.id === activeBoss)

  return (
    <div className="page" style={{ paddingTop: '40px', paddingBottom: '60px' }}>

      {/* Header */}
      <div className="section-header" style={{ marginBottom: '32px' }}>
        <div>
          <h1 className="section-title" style={{ color: '#FF2D87' }}>Guide des Bosses</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>
            Équipes recommandées et stratégies pour Kronos, Apep et Fafnir
          </p>
        </div>
        <div className="section-header-line" />
      </div>

      {/* Tabs bosses */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '32px' }}>
        {BOSSES.map(b => (
          <button key={b.id} onClick={() => setActiveBoss(b.id)} style={{
            padding: '12px 24px', borderRadius: '12px', cursor: 'pointer',
            background: activeBoss === b.id ? `${b.color}15` : 'rgba(255,255,255,0.03)',
            border: `2px solid ${activeBoss === b.id ? b.color : 'var(--border)'}`,
            color: activeBoss === b.id ? b.color : 'var(--text-secondary)',
            fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: '14px',
            display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 150ms',
            boxShadow: activeBoss === b.id ? `0 0 20px ${b.color}30` : 'none',
          }}>
            <span style={{ fontSize: '20px' }}>{b.icon}</span>
            {b.name}
          </button>
        ))}
      </div>

      {boss && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px', alignItems: 'start' }}>
          <div>
            {/* Boss info */}
            <div className="card" style={{ padding: '24px', marginBottom: '24px', borderColor: `${boss.color}30`, background: `${boss.color}06` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <div style={{ fontSize: '48px' }}>{boss.icon}</div>
                <div>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: boss.color, letterSpacing: '2px' }}>{boss.name}</h2>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                    <span style={{ fontSize: '12px', padding: '3px 10px', borderRadius: '20px', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                      Élément : {boss.element}
                    </span>
                    <span style={{ fontSize: '12px', padding: '3px 10px', borderRadius: '20px', background: `${boss.color}15`, border: `1px solid ${boss.color}40`, color: boss.color }}>
                      Faiblesse : {boss.weakness}
                    </span>
                  </div>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{boss.desc}</p>
            </div>

            {/* Équipes recommandées */}
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '2px', marginBottom: '16px' }}>
              ÉQUIPES RECOMMANDÉES
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {boss.teams.map((team, i) => (
                <div key={i} className="card" style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                    <span style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: '14px' }}>{team.label}</span>
                    <span style={{
                      fontSize: '10px', fontFamily: 'var(--font-display)', fontWeight: 900,
                      padding: '2px 8px', borderRadius: '20px',
                      color: team.tier === 'SS' ? '#FF2D87' : team.tier === 'S' ? '#FFD200' : '#38BDF8',
                      background: team.tier === 'SS' ? 'rgba(255,45,135,0.1)' : team.tier === 'S' ? 'rgba(255,210,0,0.1)' : 'rgba(56,189,248,0.1)',
                      border: `1px solid ${team.tier === 'SS' ? 'rgba(255,45,135,0.3)' : team.tier === 'S' ? 'rgba(255,210,0,0.3)' : 'rgba(56,189,248,0.3)'}`,
                    }}>TIER {team.tier}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
                    {team.ids.map(id => (
                      <EsperMini key={id} id={id} isCaptain={id === team.captain} espers={espers} />
                    ))}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.6, padding: '10px 14px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)' }}>
                    💡 {team.notes}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tips sidebar */}
          <div style={{ position: 'sticky', top: '80px' }}>
            <div className="card" style={{ padding: '20px', borderColor: `${boss.color}30` }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '11px', color: boss.color, letterSpacing: '2px', marginBottom: '16px' }}>
                ⚡ CONSEILS CLÉS — {boss.name.toUpperCase()}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {boss.tips.map((tip, i) => (
                  <div key={i} style={{
                    fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5,
                    padding: '10px', borderRadius: '8px',
                    background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)',
                  }}>
                    {tip}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
