import { useState, useMemo, useEffect } from 'react'
import { useEspers } from '../context/EspersContext.jsx'
import { ELEMENTS, ROLES } from '../data/espers.js'
import { ElementIcon } from '../components/EsperCard.jsx'

const TIERS = [
  { id: 'SS', color: '#FF2D87', bg: 'rgba(255,45,135,0.08)' },
  { id: 'S',  color: '#FFD200', bg: 'rgba(255,210,0,0.08)' },
  { id: 'A',  color: '#38BDF8', bg: 'rgba(56,189,248,0.08)' },
  { id: 'B',  color: '#4ADE80', bg: 'rgba(74,222,128,0.08)' },
  { id: 'C',  color: '#aaa',    bg: 'rgba(170,170,170,0.06)' },
]

const LS_KEY = 'my_tierlist_v1'

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(LS_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch { return {} }
}

function loadFromUrl() {
  try {
    const raw = window.location.hash.slice(1)
    const q = raw.indexOf('?')
    if (q === -1) return null
    const params = new URLSearchParams(raw.slice(q + 1))
    const result = {}
    for (const tier of TIERS.map(t => t.id)) {
      const ids = params.get(tier.toLowerCase())
      if (ids) ids.split(',').forEach(id => { result[id] = tier })
    }
    return Object.keys(result).length ? result : null
  } catch { return null }
}

export default function MyTierList() {
  const { espers, loading } = useEspers()
  const [assignments, setAssignments] = useState({}) // { esperId: tierId }
  const [popup, setPopup] = useState(null) // esper object
  const [search, setSearch] = useState('')
  const [copied, setCopied] = useState(false)
  const [filterEl, setFilterEl] = useState(null)

  // Charger depuis URL ou localStorage
  useEffect(() => {
    const fromUrl = loadFromUrl()
    setAssignments(fromUrl || loadFromStorage())
  }, [])

  // Sauvegarder auto dans localStorage
  useEffect(() => {
    if (Object.keys(assignments).length > 0)
      localStorage.setItem(LS_KEY, JSON.stringify(assignments))
  }, [assignments])

  const assign = (esperId, tierId) => {
    setAssignments(prev => {
      const next = { ...prev }
      if (tierId === null) delete next[esperId]
      else next[esperId] = tierId
      return next
    })
    setPopup(null)
  }

  const reset = () => {
    setAssignments({})
    localStorage.removeItem(LS_KEY)
  }

  const share = () => {
    const parts = TIERS.map(t => {
      const ids = Object.entries(assignments).filter(([, v]) => v === t.id).map(([k]) => k)
      return ids.length ? `${t.id.toLowerCase()}=${ids.join(',')}` : null
    }).filter(Boolean).join('&')
    const url = `${window.location.href.split('#')[0]}#mytierlist?${parts}`
    navigator.clipboard.writeText(url).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000) })
  }

  const filteredEspers = useMemo(() =>
    espers.filter(e =>
      (!search || e.name.toLowerCase().includes(search.toLowerCase())) &&
      (!filterEl || e.element === filterEl)
    )
  , [espers, search, filterEl])

  const unranked = filteredEspers.filter(e => !assignments[e.id])
  const ranked   = (tierId) => filteredEspers.filter(e => assignments[e.id] === tierId)
  const total    = Object.keys(assignments).length

  return (
    <div className="page" style={{ paddingTop: '40px', paddingBottom: '60px' }}>

      {/* Header */}
      <div className="section-header" style={{ marginBottom: '32px' }}>
        <div>
          <h1 className="section-title" style={{ color: '#FFD200' }}>Ma Tier List</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>
            {total} esper{total > 1 ? 's' : ''} classé{total > 1 ? 's' : ''} · Clique sur un esper pour l'assigner
          </p>
        </div>
        <div className="section-header-line" style={{ background: 'linear-gradient(90deg, rgba(255,210,0,0.3), transparent)' }} />
        <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
          <button onClick={share} style={{
            padding: '8px 16px', borderRadius: '8px', cursor: 'pointer',
            background: copied ? 'rgba(82,255,138,0.1)' : 'rgba(255,210,0,0.1)',
            border: `1px solid ${copied ? 'rgba(82,255,138,0.4)' : 'rgba(255,210,0,0.3)'}`,
            color: copied ? '#52ff8a' : 'var(--gold)',
            fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: '12px',
          }}>
            {copied ? '✓ Lien copié !' : '🔗 Partager'}
          </button>
          <button onClick={reset} style={{
            padding: '8px 16px', borderRadius: '8px', cursor: 'pointer',
            background: 'rgba(255,82,82,0.06)', border: '1px solid rgba(255,82,82,0.2)',
            color: 'rgba(255,82,82,0.7)', fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: '12px',
          }}>
            🗑️ Reset
          </button>
        </div>
      </div>

      {/* Tiers */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '40px' }}>
        {TIERS.map(tier => {
          const list = ranked(tier.id)
          return (
            <div key={tier.id} style={{
              display: 'flex', alignItems: 'stretch', borderRadius: '12px',
              border: `1px solid ${tier.color}30`, overflow: 'hidden', minHeight: '72px',
            }}>
              {/* Label */}
              <div style={{
                width: '60px', flexShrink: 0,
                background: `${tier.color}20`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 900,
                color: tier.color, textShadow: `0 0 20px ${tier.color}`,
              }}>{tier.id}</div>

              {/* Espers */}
              <div style={{
                flex: 1, background: tier.bg,
                display: 'flex', flexWrap: 'wrap', gap: '6px',
                padding: '8px 12px', alignItems: 'center', minHeight: '72px',
              }}>
                {list.length === 0 && (
                  <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.15)', fontStyle: 'italic' }}>
                    — vide —
                  </span>
                )}
                {list.map(e => <EsperChip key={e.id} esper={e} tier={tier} onClick={() => setPopup(e)} />)}
              </div>
            </div>
          )
        })}
      </div>

      {/* Filtres non classés */}
      <div style={{ marginBottom: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '2px' }}>
          NON CLASSÉS ({unranked.length})
        </div>
        <div style={{ flex: 1 }} />
        <input className="input" placeholder="🔍 Rechercher..."
          value={search} onChange={e => setSearch(e.target.value)}
          style={{ width: '180px' }} />
        {Object.entries(ELEMENTS).map(([key, el]) => (
          <button key={key} className={`tag ${filterEl === key ? 'active' : ''}`}
            onClick={() => setFilterEl(filterEl === key ? null : key)}>
            <ElementIcon el={el} size={12} /> {el.label}
          </button>
        ))}
      </div>

      {/* Grille non classés */}
      {loading ? (
        <div style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Chargement…</div>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {unranked.map(e => (
            <EsperChip key={e.id} esper={e} onClick={() => setPopup(e)} />
          ))}
        </div>
      )}

      {/* Popup assignation */}
      {popup && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 3000,
          background: 'rgba(6,5,15,0.85)', backdropFilter: 'blur(12px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }} onClick={() => setPopup(null)}>
          <div onClick={e => e.stopPropagation()} style={{
            background: '#0B0A1C', border: '1px solid rgba(255,210,0,0.25)',
            borderRadius: '20px', padding: '28px', minWidth: '280px',
            boxShadow: '0 0 60px rgba(255,210,0,0.1)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              {(() => { const el = ELEMENTS[popup.element]; return (
                <div style={{ width: '44px', height: '44px', borderRadius: '10px', overflow: 'hidden',
                  background: `${el.color}20`, border: `1px solid ${el.color}40`, flexShrink: 0 }}>
                  {popup.image
                    ? <img src={popup.image} alt={popup.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                    : <ElementIcon el={el} size={20} />}
                </div>
              )})()}
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '15px', letterSpacing: '1px' }}>{popup.name}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{ROLES[popup.role]?.label}</div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '8px', marginBottom: '12px' }}>
              {TIERS.map(t => (
                <button key={t.id} onClick={() => assign(popup.id, t.id)} style={{
                  padding: '12px 8px', borderRadius: '10px', cursor: 'pointer',
                  background: assignments[popup.id] === t.id ? `${t.color}25` : 'rgba(255,255,255,0.04)',
                  border: `2px solid ${assignments[popup.id] === t.id ? t.color : 'rgba(255,255,255,0.08)'}`,
                  fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 900,
                  color: t.color, textShadow: `0 0 10px ${t.color}`,
                  transition: 'all 150ms',
                }}>{t.id}</button>
              ))}
            </div>
            {assignments[popup.id] && (
              <button onClick={() => assign(popup.id, null)} style={{
                width: '100%', padding: '8px', borderRadius: '8px', cursor: 'pointer',
                background: 'rgba(255,82,82,0.06)', border: '1px solid rgba(255,82,82,0.2)',
                color: 'rgba(255,82,82,0.7)', fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: '12px',
              }}>Retirer de la tier list</button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function EsperChip({ esper, tier, onClick }) {
  const el = ELEMENTS[esper.element]
  return (
    <button onClick={onClick} title={esper.name} style={{
      display: 'flex', alignItems: 'center', gap: '6px',
      padding: '4px 8px 4px 4px', borderRadius: '8px', cursor: 'pointer',
      background: tier ? `${tier.color}10` : 'rgba(255,255,255,0.04)',
      border: `1px solid ${tier ? tier.color + '30' : 'var(--border)'}`,
      transition: 'all 120ms',
    }}
      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'none'}
    >
      <div style={{ width: '28px', height: '28px', borderRadius: '6px', overflow: 'hidden', flexShrink: 0,
        background: `${el.color}20`, border: `1px solid ${el.color}40` }}>
        {esper.image
          ? <img src={esper.image} alt={esper.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
          : <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}><ElementIcon el={el} size={14} /></div>}
      </div>
      <span style={{ fontSize: '12px', fontWeight: 600, color: tier ? tier.color : 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
        {esper.name}
      </span>
    </button>
  )
}
