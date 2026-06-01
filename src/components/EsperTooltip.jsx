import { useState, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import { ELEMENTS, ROLES } from '../data/espers.js'
import { RELIC_SETS } from '../data/relics.js'
import { ElementIcon } from './EsperCard.jsx'

const TIER_COLORS  = { SS: '#FF2D87', S: '#FFD200', A: '#38BDF8', B: '#4ADE80', C: '#aaa' }
const RARITY_COLORS = { 3: '#38BDF8', 4: '#A855F7', 5: '#FFD200' }

function TooltipContent({ esper, x, y }) {
  const el          = ELEMENTS[esper.element] || { emoji: '?', color: '#888', label: esper.element }
  const role        = ROLES[esper.role]
  const tierColor   = TIER_COLORS[esper.tier] || '#fff'
  const rarityColor = RARITY_COLORS[esper.rarity] || '#888'
  const build       = esper.relicBuild || esper.relic_build
  const set4        = build?.primary?.set4 ? RELIC_SETS.find(r => r.id === build.primary.set4) : null
  const set2        = build?.primary?.set2 ? RELIC_SETS.find(r => r.id === build.primary.set2) : null

  // Position intelligente : évite les bords
  const W = 260
  const H = 280
  const vw = window.innerWidth
  const vh = window.innerHeight
  const left = x + 14 + W > vw ? x - W - 14 : x + 14
  const top  = y + H > vh     ? y - H        : y

  return createPortal(
    <div style={{
      position: 'fixed',
      left,
      top,
      width: W,
      zIndex: 99999,
      background: 'rgba(8,7,24,0.97)',
      border: `1px solid ${el.color}40`,
      borderRadius: '14px',
      overflow: 'hidden',
      boxShadow: `0 12px 40px rgba(0,0,0,0.6), 0 0 0 1px ${el.color}20`,
      pointerEvents: 'none',
      animation: 'fadeIn 120ms both',
    }}>
      {/* Header avec portrait */}
      <div style={{
        background: `linear-gradient(135deg, ${el.color}25, transparent)`,
        padding: '14px 14px 10px',
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
        borderBottom: `1px solid rgba(255,255,255,0.06)`,
      }}>
        <div style={{
          width: 56, height: 56, borderRadius: 12, overflow: 'hidden', flexShrink: 0,
          border: `2px solid ${rarityColor}60`,
          background: `${rarityColor}15`,
        }}>
          {esper.image
            ? <img src={esper.image} alt={esper.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            : <ElementIcon el={el} size={28} />}
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
            <span style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 15 }}>{esper.name}</span>
            <span style={{
              fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 900,
              color: tierColor, padding: '1px 5px', borderRadius: 4,
              background: `${tierColor}18`, border: `1px solid ${tierColor}40`,
            }}>{esper.tier}</span>
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>{esper.divinity}</div>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 3,
              fontSize: 10, padding: '1px 6px', borderRadius: 10,
              background: `${el.color}18`, border: `1px solid ${el.color}40`, color: el.color,
            }}>
              <ElementIcon el={el} size={11} /> {el.label}
            </span>
            {role && <span style={{
              fontSize: 10, padding: '1px 6px', borderRadius: 10,
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
              color: 'var(--text-secondary)',
            }}>{role.icon} {role.label}</span>}
            <span style={{ fontSize: 9, color: rarityColor }}>{'★'.repeat(esper.rarity)}</span>
          </div>
        </div>
      </div>

      <div style={{ padding: '10px 14px' }}>
        {/* Description */}
        <p style={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: build ? 10 : 0 }}>
          {esper.description?.substring(0, 120)}{esper.description?.length > 120 ? '…' : ''}
        </p>

        {/* Build principal */}
        {build?.primary && (
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 8,
          }}>
            <div style={{ fontSize: 9, color: 'var(--text-muted)', letterSpacing: '1px', fontFamily: 'var(--font-display)', marginBottom: 6 }}>
              ⚙️ BUILD
            </div>
            <div style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
              {set4 && <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 6, background: `${set4.color}15`, border: `1px solid ${set4.color}30`, color: set4.color }}>
                {set4.name} ×4
              </span>}
              {set2 && <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 6, background: `${set2.color}15`, border: `1px solid ${set2.color}30`, color: set2.color }}>
                {set2.name} ×2
              </span>}
            </div>
            {build.substats?.length > 0 && (
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                {build.substats.slice(0, 3).map((s, i) => (
                  <span key={i} style={{
                    fontSize: 10, padding: '1px 6px', borderRadius: 5,
                    background: i === 0 ? 'rgba(255,210,0,0.12)' : 'rgba(255,255,255,0.04)',
                    border: i === 0 ? '1px solid rgba(255,210,0,0.3)' : '1px solid rgba(255,255,255,0.08)',
                    color: i === 0 ? 'var(--gold)' : 'var(--text-muted)',
                  }}>{i === 0 ? '★ ' : ''}{s}</span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Modes performances */}
        {esper.modes && (
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 8, marginTop: 8 }}>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {Object.entries(esper.modes).map(([k, v]) => (
                <span key={k} style={{
                  fontSize: 9, padding: '1px 5px', borderRadius: 4,
                  color: TIER_COLORS[v] || '#aaa',
                  background: `${TIER_COLORS[v] || '#aaa'}12`,
                  border: `1px solid ${TIER_COLORS[v] || '#aaa'}30`,
                  fontFamily: 'var(--font-display)', fontWeight: 700,
                }}>
                  {k.charAt(0).toUpperCase() + k.slice(1)} {v}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  )
}

export function useEsperTooltip() {
  const [tooltip, setTooltip] = useState(null)
  const timerRef = useRef(null)

  const show = useCallback((esper, e) => {
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setTooltip({ esper, x: e.clientX, y: e.clientY })
    }, 120)
  }, [])

  const hide = useCallback(() => {
    clearTimeout(timerRef.current)
    setTooltip(null)
  }, [])

  const move = useCallback((e) => {
    if (tooltip) setTooltip(t => t ? { ...t, x: e.clientX, y: e.clientY } : null)
  }, [tooltip])

  const node = tooltip
    ? <TooltipContent esper={tooltip.esper} x={tooltip.x} y={tooltip.y} />
    : null

  return { show, hide, move, node }
}
