import { useState } from 'react'
import { ELEMENTS, ROLES, TIERS } from '../data/espers.js'
import { useEspers } from '../context/EspersContext.jsx'
import { ElementIcon } from '../components/EsperCard.jsx'

const MODES_FILTER = [
  { id: 'global', label: 'Global' },
  { id: 'kronos', label: '👹 Kronos' },
  { id: 'apep',   label: '🐍 Apep' },
  { id: 'fafnir', label: '🐉 Fafnir' },
  { id: 'pvp',    label: '⚔️ PvP' },
  { id: 'story',  label: '📖 Story' },
]

const TIER_DESC = {
  SS: 'Meta absolu — investis sans hésiter',
  S:  'Excellent — top-tier dans leur rôle',
  A:  'Très bon — viable en late game',
  B:  'Correct — bon early/mid game',
  C:  'Situationnel — niche ou remplacé',
}

const TIER_COLORS = {
  SS: '#FF2D87',
  S:  '#FFD200',
  A:  '#38BDF8',
  B:  '#4ADE80',
  C:  'rgba(232,232,240,0.5)',
}

function getTierForMode(esper, mode) {
  if (mode === 'global') return esper.tier
  return esper.modes?.[mode] || 'C'
}

export default function TierList({ onNavigate }) {
  const { espers: ESPERS, loading } = useEspers()
  const [mode, setMode] = useState('global')
  const [filterRole, setFilterRole] = useState(null)
  const [filterEl, setFilterEl] = useState(null)
  const [hovered, setHovered] = useState(null)

  if (loading) return <div style={{ padding: '80px', textAlign: 'center', color: 'var(--text-muted)' }}>Chargement…</div>

  const filtered = ESPERS.filter(e => {
    if (filterRole && e.role !== filterRole) return false
    if (filterEl && e.element !== filterEl) return false
    return true
  })

  const grouped = Object.keys(TIERS).reduce((acc, tier) => {
    const espers = filtered.filter(e => getTierForMode(e, mode) === tier)
    if (espers.length > 0) acc[tier] = espers
    return acc
  }, {})

  return (
    <div className="page" style={{ paddingTop: '40px', paddingBottom: '60px' }}>
      {/* Header */}
      <div className="section-header" style={{ marginBottom: '36px' }}>
        <div>
          <h1 className="section-title" style={{ color: 'var(--gold)' }}>Tier List</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>
            Classement des Espers par mode — v3.4.41.448148
          </p>
        </div>
        <div className="section-header-line" style={{ background: 'linear-gradient(90deg, rgba(255,210,0,0.3), transparent)' }} />
      </div>

      {/* Mode filter */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ fontSize: '11px', fontFamily: 'var(--font-display)', color: 'var(--text-muted)', letterSpacing: '2px', marginBottom: '10px' }}>
          MODE DE JEU
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {MODES_FILTER.map(m => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              style={{
                padding: '8px 18px',
                borderRadius: '8px',
                border: mode === m.id ? '1px solid rgba(255,210,0,0.5)' : '1px solid var(--border)',
                background: mode === m.id ? 'rgba(255,210,0,0.1)' : 'var(--bg-card)',
                color: mode === m.id ? 'var(--gold)' : 'var(--text-secondary)',
                fontFamily: 'var(--font-ui)',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 150ms',
                letterSpacing: '0.5px',
              }}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Role/element filters */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '36px' }}>
        {Object.entries(ROLES).map(([key, role]) => (
          <button
            key={key}
            className={`tag ${filterRole === key ? 'active' : ''}`}
            onClick={() => setFilterRole(filterRole === key ? null : key)}
          >
            {role.icon} {role.label}
          </button>
        ))}
        <div style={{ width: '1px', background: 'var(--border)', margin: '0 4px' }} />
        {Object.entries(ELEMENTS).map(([key, el]) => (
          <button
            key={key}
            className={`tag ${filterEl === key ? 'active' : ''}`}
            onClick={() => setFilterEl(filterEl === key ? null : key)}
          >
            <ElementIcon el={el} size={14} /> {el.label}
          </button>
        ))}
        {(filterRole || filterEl) && (
          <button className="tag" onClick={() => { setFilterRole(null); setFilterEl(null) }}>
            ✕ Réinitialiser
          </button>
        )}
      </div>

      {/* Tier rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {Object.keys(TIERS).map(tier => {
          const espers = grouped[tier]
          if (!espers) return null
          const color = TIER_COLORS[tier]

          return (
            <div key={tier} style={{
              display: 'grid',
              gridTemplateColumns: '72px 1fr',
              gap: '0',
              borderRadius: '14px',
              border: '1px solid var(--border)',
            }}>
              {/* Tier label */}
              <div style={{
                background: `${color}18`,
                borderRight: `2px solid ${color}40`,
                borderRadius: '13px 0 0 13px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px 8px',
                gap: '4px',
              }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '28px',
                  fontWeight: 900,
                  color,
                  textShadow: `0 0 20px ${color}`,
                  lineHeight: 1,
                }}>
                  {tier}
                </div>
                <div style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: 'var(--font-ui)', textAlign: 'center', letterSpacing: '0.5px' }}>
                  {TIER_DESC[tier]?.split(' — ')[0]}
                </div>
              </div>

              {/* Espers */}
              <div style={{
                background: `${color}06`,
                borderRadius: '0 13px 13px 0',
                padding: '12px 16px',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                alignContent: 'flex-start',
                minHeight: '72px',
                overflow: 'visible',
              }}>
                {espers
                  .sort((a, b) => {
                    const order = ['SS', 'S', 'A', 'B', 'C']
                    const tierA = order.indexOf(a.tier)
                    const tierB = order.indexOf(b.tier)
                    return tierA - tierB
                  })
                  .map(esper => (
                    <TierEsperChip
                      key={esper.id}
                      esper={esper}
                      tierColor={color}
                      mode={mode}
                      isHovered={hovered === esper.id}
                      onHover={setHovered}
                      onNavigate={onNavigate}
                    />
                  ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div style={{ marginTop: '40px' }}>
        <div className="divider" />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '20px' }}>
          {Object.keys(TIERS).slice(0, -1).map(tier => (
            <div key={tier} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: `${TIER_COLORS[tier]}15`,
                border: `2px solid ${TIER_COLORS[tier]}40`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-display)',
                fontSize: '12px',
                fontWeight: 900,
                color: TIER_COLORS[tier],
              }}>
                {tier}
              </div>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{TIER_DESC[tier]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div style={{
        marginTop: '24px',
        padding: '16px 20px',
        borderRadius: '12px',
        background: 'rgba(255,45,135,0.04)',
        border: '1px solid rgba(255,45,135,0.12)',
        fontSize: '12px',
        color: 'var(--text-muted)',
        lineHeight: 1.6,
      }}>
        ℹ️ La tier list reflète l'état du meta au patch v3.4.41.448148. Le classement peut évoluer avec chaque patch.
        Les Espers de tier B/C peuvent rester utiles en early/mid game ou dans des compositions spécifiques.
      </div>
    </div>
  )
}

const RARITY_COLORS = { 3: '#38BDF8', 4: '#A855F7', 5: '#FFD200' }
const MODE_COLORS = { SS: '#FF2D87', S: '#FFD200', A: '#38BDF8', B: '#4ADE80', C: '#aaa' }

function TierEsperChip({ esper, tierColor, mode, isHovered, onHover, onNavigate }) {
  const el = ELEMENTS[esper.element]
  const modeRating = mode !== 'global' ? esper.modes?.[mode] : null
  const rarityColor = RARITY_COLORS[esper.rarity] || '#888'

  return (
    <div
      onMouseEnter={() => onHover(esper.id)}
      onMouseLeave={() => onHover(null)}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
        padding: '8px 6px',
        borderRadius: '10px',
        background: isHovered ? `${el.color}15` : `rgba(255,255,255,0.04)`,
        border: isHovered ? `1px solid ${el.color}50` : `1px solid ${rarityColor}25`,
        cursor: 'default',
        transition: 'all 150ms',
        flexShrink: 0,
        width: '72px',
      }}
    >
      {/* Portrait */}
      <div style={{
        width: '52px',
        height: '52px',
        borderRadius: '10px',
        overflow: 'hidden',
        border: `2px solid ${rarityColor}60`,
        flexShrink: 0,
        background: 'rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '22px',
      }}>
        {esper.image ? (
          <img
            src={esper.image}
            alt={esper.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={e => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'flex' }}
          />
        ) : null}
        <span style={{ display: esper.image ? 'none' : 'flex' }}><ElementIcon el={el} size={24} /></span>
      </div>

      {/* Nom */}
      <div style={{
        fontFamily: 'var(--font-ui)',
        fontSize: '10px',
        fontWeight: 700,
        color: isHovered ? el.color : 'var(--text-primary)',
        textAlign: 'center',
        lineHeight: 1.2,
        wordBreak: 'break-word',
        width: '100%',
      }}>
        {esper.name}
      </div>

      {/* Rating mode */}
      {modeRating && mode !== 'global' && (
        <div style={{
          fontSize: '9px',
          color: MODE_COLORS[modeRating],
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          lineHeight: 1,
        }}>
          {modeRating}
        </div>
      )}

      {/* Tooltip on hover */}
      {isHovered && (
        <div style={{
          position: 'absolute',
          bottom: 'calc(100% + 8px)',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(10,10,30,0.98)',
          border: `1px solid ${el.color}30`,
          borderRadius: '10px',
          padding: '12px 16px',
          width: '220px',
          zIndex: 9999,
          animation: 'fadeIn 100ms both',
          boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
          pointerEvents: 'none',
        }}>
          <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, marginBottom: '2px' }}>{esper.name}</div>
          <div style={{ fontSize: '11px', color: el.color, marginBottom: '8px' }}>{esper.divinity} · {ROLES[esper.role]?.label}</div>
          <p style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            {esper.description}
          </p>
          {mode !== 'global' && (
            <div style={{ marginTop: '8px', fontSize: '11px', color: 'var(--text-muted)' }}>
              Mode actuel : <strong style={{ color: MODE_COLORS[esper.modes?.[mode]] }}>
                {esper.modes?.[mode] || '?'}
              </strong>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
