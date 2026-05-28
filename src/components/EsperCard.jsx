import { ELEMENTS, ROLES } from '../data/espers.js'

const ELEMENT_BG = {
  flow:    'radial-gradient(ellipse at top, rgba(74,158,255,0.18) 0%, transparent 70%)',
  inferno: 'radial-gradient(ellipse at top, rgba(255,82,82,0.18) 0%, transparent 70%)',
  wind:    'radial-gradient(ellipse at top, rgba(82,255,138,0.18) 0%, transparent 70%)',
  umbra:   'radial-gradient(ellipse at top, rgba(176,74,255,0.18) 0%, transparent 70%)',
  shimmer: 'radial-gradient(ellipse at top, rgba(255,208,74,0.18) 0%, transparent 70%)',
}

const TIER_COLORS = {
  SS: '#FF2D87', S: '#FFD200', A: '#38BDF8', B: '#4ADE80', C: 'rgba(232,232,240,0.5)',
}

// Couleur par rareté : 3★ bleu | 4★ violet | 5★ or
const RARITY_COLORS = {
  3: '#38BDF8',
  4: '#A855F7',
  5: '#FFD200',
}

export default function EsperCard({ esper, onClick, compact = false, selected = false }) {
  if (!esper) return null

  const el = ELEMENTS[esper.element]
  const role = ROLES[esper.role]
  const tierColor = TIER_COLORS[esper.tier] || '#fff'
  const rarityColor = RARITY_COLORS[esper.rarity] || '#888'

  /* ── Mode compact : carte horizontale pour le picker ── */
  if (compact) {
    return (
      <div
        onClick={onClick}
        style={{
          background: selected ? `${rarityColor}18` : 'rgba(255,255,255,0.03)',
          border: selected
            ? `1px solid ${rarityColor}60`
            : `1px solid ${rarityColor}20`,
          borderLeft: `3px solid ${rarityColor}`,
          borderRadius: '10px',
          padding: '9px 10px 9px 12px',
          cursor: onClick ? 'pointer' : 'default',
          transition: 'all 150ms',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: selected ? `0 0 14px ${rarityColor}35` : 'none',
        }}
        onMouseEnter={e => {
          if (!selected) {
            e.currentTarget.style.background = `${rarityColor}10`
            e.currentTarget.style.transform = 'translateY(-1px)'
            e.currentTarget.style.boxShadow = `0 4px 16px rgba(0,0,0,0.35)`
          }
        }}
        onMouseLeave={e => {
          if (!selected) {
            e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }
        }}
      >
        {/* Portrait avatar */}
        <div style={{
          width: '34px',
          height: '34px',
          borderRadius: '8px',
          background: `${rarityColor}18`,
          border: `1.5px solid ${rarityColor}50`,
          overflow: 'hidden',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '16px',
        }}>
          {esper.image
            ? <img
                src={esper.image}
                alt={esper.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                onError={e => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'flex' }}
              />
            : null}
          <span style={{ display: esper.image ? 'none' : 'flex' }}>{el.emoji}</span>
        </div>

        {/* Info */}
        <div style={{ flex: 1, overflow: 'hidden', minWidth: '80px' }}>
          <div style={{
            fontFamily: 'var(--font-ui)',
            fontWeight: 700,
            fontSize: '13px',
            color: '#EDE9FF',
            lineHeight: '17px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {esper.name}
          </div>
          <div style={{
            fontSize: '11px',
            color: 'rgba(237,233,255,0.45)',
            lineHeight: '14px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {el.emoji} {el.label} · {role?.label}
          </div>
        </div>

        {/* Rarity stars + Tier */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', flexShrink: 0 }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '11px',
            fontWeight: 900,
            color: tierColor,
            textShadow: `0 0 8px ${tierColor}60`,
            width: '20px',
            textAlign: 'center',
          }}>
            {esper.tier}
          </div>
          <div style={{ display: 'flex', gap: '1px' }}>
            {Array.from({ length: esper.rarity }).map((_, i) => (
              <span key={i} style={{ fontSize: '6px', color: rarityColor }}>★</span>
            ))}
          </div>
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
          ? `${rarityColor}0D`
          : `var(--bg-card)`,
        border: selected
          ? `1px solid ${rarityColor}60`
          : `1px solid ${rarityColor}30`,
        borderRadius: '14px',
        padding: '16px',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 200ms',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: selected ? `0 0 20px ${rarityColor}25` : 'none',
      }}
      onMouseEnter={e => {
        if (!selected) {
          e.currentTarget.style.borderColor = `${rarityColor}55`
          e.currentTarget.style.background = `${rarityColor}08`
          e.currentTarget.style.transform = 'translateY(-2px)'
          e.currentTarget.style.boxShadow = `0 8px 30px rgba(0,0,0,0.3)`
        }
      }}
      onMouseLeave={e => {
        if (!selected) {
          e.currentTarget.style.borderColor = `${rarityColor}30`
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
        background: `linear-gradient(135deg, ${rarityColor}30 0%, ${rarityColor}10 100%)`,
        border: `2px solid ${rarityColor}60`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '28px',
        marginBottom: '0',
        flexShrink: 0,
        boxShadow: `0 0 18px ${rarityColor}25`,
        position: 'relative',
        zIndex: 1,
        overflow: 'hidden',
      }}>
        {esper.image
          ? <img
              src={esper.image}
              alt={esper.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              onError={e => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'flex' }}
            />
          : null}
        <span style={{ display: esper.image ? 'none' : 'flex' }}>{el.emoji}</span>
      </div>

      {/* Stars row below avatar */}
      <div style={{
        display: 'flex',
        gap: '1px',
        justifyContent: 'center',
        marginTop: '3px',
        marginBottom: '8px',
        position: 'relative',
        zIndex: 1,
      }}>
        {Array.from({ length: esper.rarity }).map((_, i) => (
          <span key={i} style={{ fontSize: '7px', color: rarityColor }}>★</span>
        ))}
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

      {/* Divinity */}
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

      {/* Badges — élément + rôle */}
      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
        {/* Badge élément coloré selon l'élément */}
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '3px',
          fontSize: '10px',
          padding: '2px 7px',
          borderRadius: '20px',
          background: `${el.color}20`,
          border: `1px solid ${el.color}50`,
          color: el.color,
          fontWeight: 600,
          whiteSpace: 'nowrap',
        }}>
          {el.emoji} {el.label}
        </span>
        {/* Badge rôle */}
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
  const rarityColor = RARITY_COLORS[esper.rarity] || '#888'
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: Math.round(size * 0.2) + 'px',
      background: `linear-gradient(135deg, ${rarityColor}30, ${rarityColor}10)`,
      border: `2px solid ${rarityColor}60`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: size * 0.45 + 'px',
      boxShadow: `0 0 15px ${rarityColor}25`,
      flexShrink: 0,
      overflow: 'hidden',
    }}>
      {esper.image
        ? <img src={esper.image} alt={esper.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        : el.emoji}
    </div>
  )
}
