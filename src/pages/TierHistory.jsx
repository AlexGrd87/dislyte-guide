import { useState } from 'react'
import { useEspers } from '../context/EspersContext.jsx'
import { ELEMENTS } from '../data/espers.js'
import { ElementIcon } from '../components/EsperCard.jsx'

const TIER_COLORS = { SS: '#FF2D87', S: '#FFD200', A: '#38BDF8', B: '#4ADE80', C: '#aaa' }

// Snapshots du méta par patch — à enrichir manuellement à chaque patch
const HISTORY = [
  {
    patch: 'v3.4.41',
    date: 'Mai 2026',
    changes: [
      { esper: 'arthur',    from: null, to: 'SS', note: 'Ajout — DPS Ombre AoE, scale sur VIT. Priorité immédiate.' },
      { esper: 'meta-yun-chuan', from: null, to: 'SS', note: 'Ajout — DPS Vent méta, remplace Yun Chuan classique.' },
      { esper: 'meta-eira', from: null, to: 'SS', note: 'Ajout — AP Controller Flow S, top PvP.' },
      { esper: 'ling-zhao', from: null, to: 'S',  note: 'Ajout — Support Flow polyvalent.' },
      { esper: 'wenlock',   from: null, to: 'S',  note: 'Ajout — Support Vent Championship.' },
      { esper: 'nyles',     from: null, to: 'A',  note: 'Ajout — DPS Ombre niche.' },
    ],
  },
  {
    patch: 'v3.4.35',
    date: 'Avril 2026',
    changes: [
      { esper: 'meta-li-ling', from: 'S',  to: 'SS', note: 'Buffé — AoE amélioré, meilleur DPS du jeu.' },
      { esper: 'wu-you',       from: 'S',  to: 'SS', note: 'Confirmé méta PvP — contrôle PA imbattable.' },
      { esper: 'lu-shang',     from: 'A',  to: 'SS', note: 'Réévalué — synergies Accentuated sous-estimées.' },
      { esper: 'pindar',       from: 'S',  to: 'SS', note: 'Confirmé — support offensif de référence.' },
      { esper: 'tang-yun',     from: 'SS', to: 'S',  note: 'Légèrement affaibli par la concurrence.' },
    ],
  },
  {
    patch: 'v3.4.18',
    date: 'Janvier 2026',
    changes: [
      { esper: 'meta-freddy',  from: null, to: 'SS', note: 'Ajout Meta Freddy — DPS Brasier zone OP.' },
      { esper: 'meta-alexa',   from: null, to: 'S',  note: 'Ajout Meta Alexa — Support Brasier.' },
      { esper: 'meta-mona',    from: null, to: 'A',  note: 'Ajout Meta Mona — Support Aquatique.' },
      { esper: 'gaius',        from: 'SS', to: 'SS', note: 'Maintenu méta — DPS cible unique de référence.' },
    ],
  },
]

const ARROW = { up: '↑', down: '↓', new: '★' }
const CHANGE_COLOR = (from, to) => {
  if (!from) return '#52ff8a'
  const order = { SS: 5, S: 4, A: 3, B: 2, C: 1 }
  return order[to] > order[from] ? '#52ff8a' : order[to] < order[from] ? '#ff5252' : 'var(--text-muted)'
}

export default function TierHistory() {
  const { espers } = useEspers()
  const [open, setOpen] = useState('v3.4.41')

  return (
    <div className="page" style={{ paddingTop: '40px', paddingBottom: '60px' }}>

      {/* Header */}
      <div className="section-header" style={{ marginBottom: '40px' }}>
        <div>
          <h1 className="section-title" style={{ color: '#FFD200' }}>Historique Tier List</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>
            Évolution du méta patch par patch
          </p>
        </div>
        <div className="section-header-line" style={{ background: 'linear-gradient(90deg, rgba(255,210,0,0.3), transparent)' }} />
      </div>

      {/* Timeline */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {HISTORY.map((snapshot, si) => {
          const isOpen = open === snapshot.patch
          return (
            <div key={snapshot.patch} style={{
              borderRadius: '14px',
              border: `1px solid ${isOpen ? 'rgba(255,210,0,0.4)' : 'var(--border)'}`,
              overflow: 'hidden',
              transition: 'border-color 200ms',
            }}>
              {/* Header patch */}
              <button
                onClick={() => setOpen(isOpen ? null : snapshot.patch)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: '16px',
                  padding: '16px 20px', background: isOpen ? 'rgba(255,210,0,0.06)' : 'var(--bg-card)',
                  border: 'none', cursor: 'pointer', transition: 'background 200ms', textAlign: 'left',
                }}
              >
                {/* Dot timeline */}
                <div style={{
                  width: '12px', height: '12px', borderRadius: '50%', flexShrink: 0,
                  background: si === 0 ? '#FFD200' : 'rgba(255,255,255,0.2)',
                  boxShadow: si === 0 ? '0 0 10px rgba(255,210,0,0.6)' : 'none',
                }} />

                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', color: isOpen ? 'var(--gold)' : 'var(--text-primary)', letterSpacing: '1px' }}>
                    Patch {snapshot.patch}
                    {si === 0 && <span style={{ marginLeft: '10px', fontSize: '10px', padding: '2px 8px', borderRadius: '4px', background: 'rgba(255,210,0,0.15)', color: 'var(--gold)', fontFamily: 'var(--font-ui)' }}>ACTUEL</span>}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>{snapshot.date} · {snapshot.changes.length} changement{snapshot.changes.length > 1 ? 's' : ''}</div>
                </div>

                <span style={{ color: 'var(--text-muted)', fontSize: '16px', transition: 'transform 200ms', transform: isOpen ? 'rotate(180deg)' : 'none' }}>▾</span>
              </button>

              {/* Changements */}
              {isOpen && (
                <div style={{ borderTop: '1px solid var(--border)' }}>
                  {snapshot.changes.map((change, i) => {
                    const esper = espers.find(e => e.id === change.esper)
                    const el = esper ? ELEMENTS[esper.element] : null
                    const color = CHANGE_COLOR(change.from, change.to)
                    const isNew = !change.from

                    return (
                      <div key={i} style={{
                        display: 'flex', alignItems: 'center', gap: '16px',
                        padding: '14px 20px',
                        borderBottom: i < snapshot.changes.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                        background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)',
                      }}>
                        {/* Avatar */}
                        <div style={{
                          width: '40px', height: '40px', borderRadius: '10px', flexShrink: 0,
                          background: el ? `${el.color}20` : 'rgba(255,255,255,0.06)',
                          border: `1px solid ${el ? el.color + '40' : 'rgba(255,255,255,0.1)'}`,
                          overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          {esper?.image
                            ? <img src={esper.image} alt={esper.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                            : el ? <ElementIcon el={el} size={20} /> : <span style={{ fontSize: '16px' }}>❓</span>
                          }
                        </div>

                        {/* Nom */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: '14px', color: 'var(--text-primary)', marginBottom: '2px' }}>
                            {esper?.name || change.esper}
                          </div>
                          <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.4 }}>{change.note}</div>
                        </div>

                        {/* Changement de tier */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                          {isNew ? (
                            <div style={{
                              display: 'flex', alignItems: 'center', gap: '6px',
                              padding: '4px 12px', borderRadius: '8px',
                              background: 'rgba(82,255,138,0.1)', border: '1px solid rgba(82,255,138,0.3)',
                            }}>
                              <span style={{ fontSize: '12px', color: '#52ff8a', fontWeight: 700 }}>★ NOUVEAU</span>
                              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '14px', color: TIER_COLORS[change.to] }}>
                                {change.to}
                              </span>
                            </div>
                          ) : (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '14px', color: TIER_COLORS[change.from], opacity: 0.6 }}>
                                {change.from}
                              </span>
                              <span style={{ color, fontSize: '16px', fontWeight: 900 }}>
                                {CHANGE_COLOR(change.from, change.to) === '#52ff8a' ? '↑' : CHANGE_COLOR(change.from, change.to) === '#ff5252' ? '↓' : '→'}
                              </span>
                              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '14px', color: TIER_COLORS[change.to] }}>
                                {change.to}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div style={{ marginTop: '32px', padding: '16px 20px', borderRadius: '12px', background: 'rgba(255,210,0,0.04)', border: '1px solid rgba(255,210,0,0.15)', fontSize: '12px', color: 'var(--text-muted)' }}>
        ℹ️ L'historique est mis à jour manuellement à chaque patch. Les changements reflètent les réévaluations du méta, pas forcément des nerfs/buffs officiels.
      </div>
    </div>
  )
}
