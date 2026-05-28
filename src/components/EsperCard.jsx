import { ELEMENTS, ROLES } from '../data/espers.js'

const ELEMENT_BG = {
  flow:    'radial-gradient(ellipse at top, rgba(74,158,255,0.25) 0%, transparent 70%)',
  inferno: 'radial-gradient(ellipse at top, rgba(255,82,82,0.25) 0%, transparent 70%)',
  wind:    'radial-gradient(ellipse at top, rgba(82,255,138,0.25) 0%, transparent 70%)',
  umbra:   'radial-gradient(ellipse at top, rgba(176,74,255,0.25) 0%, transparent 70%)',
  shimmer: 'radial-gradient(ellipse at top, rgba(255,208,74,0.25) 0%, transparent 70%)',
}

const TIER_COLORS = {
  SS: '#FF2D87', S: '#FFD200', A: '#38BDF8', B: '#4ADE80', C: 'rgba(232,232,240,0.5)',
}

export default function EsperCard({ esper, onClick, compact = false, selected = false }) {
  if (!esper) return null

  const el = ELEMENTS[esper.element]
  const role = ROLES[esper.role]
  const tierColor = TIER_COLORS[esper.tier] || '#fff'

  /* ── Mode compact : carte horizontale pour le picker ── */
  if (compact) {
    return (
      <div
        onClick={onClick}
        style={{
          background: selected ? `rgba(255,45,135,0.1)` : 'rgba(255,255,255,0.03)',
          border: selected ? '1px solid rgba(255,45,135,0.5)' : `1px solid rgba(255,255,255,0.07)`,
          borderRadius: '12px',
          padding: '10px',
          cursor: onClick ? 'pointer' : 'default',
          transition: 'all 160ms',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: selected ? '0 0 16px rgba(255,45,135,0.25)' : 'none',
        }}
        onMouseEnter={e => {
          if (!selected) {
            e.currentTarget.style.borderColor = `${el.color}60`
            e.currentTarget.style.background = `${el.color}10`
            e.currentTarget.style.transform = 'translateY(-1px)'
            e.currentTarget.style.boxShadow = `0 6px 20px rgba(0,0,0,0.4)`
          }
        }}
        onMouseLeave={e => {
          if (!selected) {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
            e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }
        }}
      >
        {/* Left accent bar */}
        <div style={{
          position: 'absolute',
          left: 0, top: 0, bottom: 0,
          width: '3px',
          background: el.color,
          borderRadius: '12px 0 0 12px',
          opacity: 0.7,
        }} />

        {/* Element avatar */}
        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: '10px',
          background: `linear-gradient(135deg, ${el.color}40, ${el.color}15)`,
          border: `1.5px solid ${el.color}50`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px',
          flexShrink: 0,
          boxShadow: `0 0 12px ${el.color}25`,
        }}>
          {el.emoji}
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontFamily: 'var(--font-ui)',
            fontWeight: 700,
            fontSize: '13px',
            color: '#EDE9FF',
            lineHeight: 1.2,
            marginBottom: '3px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {esper.name}
          </div>
          <div style={{ fontSize: '11px', color: 'rgba(237,233,255,0.45)', fontFamily: 'var(--font-body)' }}>
            {el.label} · {role?.label}
          </div>
        </div>

        {/* Tier badge */}
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '12px',
          fontWeight: 900,
          color: tierColor,
          textShadow: `0 0 8px ${tierColor}`,
          flexShrink: 0,
          minWidth: '22px',
          textAlign: 'center',
        }}>
          {esper.tier}
        </div>
      </div>
    )
  }

  /* ── Mode normal : carte verticale ── */
  return (
    <div
      onClick={onClick}
      style={{
        background: selected
          ? `rgba(255,45,135,0.08)`
          : `var(--bg-card)`,
        border: selected
          ? '1px solid rgba(255,45,135,0.5)'
          : `1px solid var(--border)`,
        borderRadius: '14px',
        padding: '16px',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 200ms',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: selected ? '0 0 20px rgba(255,45,135,0.2)' : 'none',
      }}
      onMouseEnter={e => {
        if (!selected) {
          e.currentTarget.style.borderColor = 'rgba(255,45,135,0.3)'
          e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
          e.currentTarget.style.transform = 'translateY(-2px)'
          e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.3)'
        }
      }}
      onMouseLeave={e => {
        if (!selected) {
          e.currentTarget.style.borderColor = 'var(--border)'
          e.currentTarget.style.background = 'var(--bg-card)'
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = 'none'
        }
      }}
    >
      {/* Element gradient overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: ELEMENT_BG[esper.element],
        pointerEvents: 'none',
      }} />

      {/* Tier corner badge */}
      <div style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        fontFamily: 'var(--font-display)',
        fontSize: '11px',
        fontWeight: 900,
        color: tierColor,
        textShadow: `0 0 10px ${tierColor}`,
        letterSpacing: '1px',
        zIndex: 1,
      }}>
        {esper.tier}
      </div>

      {/* Avatar */}
      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: '14px',
        background: `linear-gradient(135deg, ${el.color}40 0%, ${el.color}15 100%)`,
        border: `2px solid ${el.color}50`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '28px',
        marginBottom: '12px',
        flexShrink: 0,
        boxShadow: `0 0 20px ${el.color}30`,
        position: 'relative',
        zIndex: 1,
      }}>
        {el.emoji}
        <div style={{
          position: 'absolute',
          bottom: '-8px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '1px',
        }}>
          {Array.from({ length: esper.rarity }).map((_, i) => (
            <span key={i} style={{ fontSize: '7px', color: '#FFD200' }}>★</span>
          ))}
        </div>
      </div>

      {/* Name */}
      <div style={{
        fontFamily: 'var(--font-ui)',
        fontWeight: 700,
        fontSize: '15px',
        color: 'var(--text-primary)',
        marginBottom: '2px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        position: 'relative',
        zIndex: 1,
      }}>
        {esper.name}
      </div>

      <div style={{
        fontFamily: 'var(--font-body)',
        fontSize: '11px',
        color: 'var(--text-muted)',
        marginBottom: '10px',
        position: 'relative',
        zIndex: 1,
      }}>
        {esper.divinity}
      </div>

      {/* Badges */}
      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
        <span className={`badge badge-${esper.element}`} style={{ fontSize: '10px', padding: '2px 7px' }}>
          {el.emoji} {el.label}
        </span>
        <span className={`badge badge-${esper.role}`} style={{ fontSize: '10px', padding: '2px 7px' }}>
          {role?.icon} {role?.label}
        </span>
      </div>
    </div>
  )
}

export function EsperAvatar({ esper, size = 48 }) {
  if (!esper) return null
  const el = ELEMENTS[esper.element]
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: Math.round(size * 0.2) + 'px',
      background: `linear-gradient(135deg, ${el.color}40, ${el.color}15)`,
      border: `2px solid ${el.color}60`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: size * 0.45 + 'px',
      boxShadow: `0 0 15px ${el.color}30`,
      flexShrink: 0,
    }}>
      {el.emoji}
    </div>
  )
}
