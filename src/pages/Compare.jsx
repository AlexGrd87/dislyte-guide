import { useState, useCallback, useEffect, useMemo } from 'react'
import { ELEMENTS, ROLES, TIERS } from '../data/espers.js'
import { useEspers } from '../context/EspersContext.jsx'
import { RELIC_SETS } from '../data/relics.js'
import EsperCard, { ElementIcon } from '../components/EsperCard.jsx'

const TIER_SCORE  = { SS: 5, S: 4, A: 3, B: 2, C: 1 }
const TIER_COLORS = { SS: '#FF2D87', S: '#FFD200', A: '#38BDF8', B: '#4ADE80', C: '#aaa' }
const MODE_LABELS = { story: '📖 Story', kronos: '👹 Kronos', apep: '🐍 Apep', fafnir: '🐉 Fafnir', pvp: '⚔️ PvP' }

export default function Compare() {
  const { espers: ESPERS, loading } = useEspers()
  const [left,  setLeft]  = useState(null)
  const [right, setRight] = useState(null)
  const [picker, setPicker] = useState(null) // 'left' | 'right' | null
  const [copied, setCopied] = useState(false)

  // Charger depuis URL (#compare?a=id&b=id)
  useEffect(() => {
    if (!ESPERS.length) return
    const params = new URLSearchParams(window.location.hash.slice(1).split('?')[1] || '')
    const a = params.get('a'), b = params.get('b')
    if (a) setLeft(ESPERS.find(e => e.id === a) || null)
    if (b) setRight(ESPERS.find(e => e.id === b) || null)
  }, [ESPERS])

  const shareUrl = useCallback(() => {
    if (!left && !right) return
    const base = window.location.href.split('#')[0]
    const url  = `${base}#compare?a=${left?.id ?? ''}&b=${right?.id ?? ''}`
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [left, right])

  return (
    <div className="page" style={{ paddingTop: '40px', paddingBottom: '60px' }}>

      {/* Header */}
      <div className="section-header" style={{ marginBottom: '40px' }}>
        <div>
          <h1 className="section-title" style={{ color: 'var(--pink)' }}>Comparer des Espers</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>
            Sélectionne deux Espers pour comparer leurs stats, builds et performances
          </p>
        </div>
        <div className="section-header-line" />
        {(left || right) && (
          <button
            onClick={shareUrl}
            style={{
              padding: '8px 16px', borderRadius: '8px', flexShrink: 0,
              background: copied ? 'rgba(82,255,138,0.15)' : 'rgba(255,255,255,0.05)',
              border: `1px solid ${copied ? 'rgba(82,255,138,0.4)' : 'var(--border)'}`,
              color: copied ? '#52ff8a' : 'var(--text-secondary)',
              fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: '12px', cursor: 'pointer',
              transition: 'all 200ms',
            }}
          >
            {copied ? '✓ Lien copié !' : '🔗 Partager'}
          </button>
        )}
      </div>

      {/* Deux pickers */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '16px', alignItems: 'center', marginBottom: '40px' }}>
        <EsperSlot esper={left}  side="left"  onOpen={() => setPicker('left')}  onClear={() => setLeft(null)}  loading={loading} />
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: 'var(--text-muted)', textAlign: 'center', padding: '0 8px' }}>VS</div>
        <EsperSlot esper={right} side="right" onOpen={() => setPicker('right')} onClear={() => setRight(null)} loading={loading} />
      </div>

      {/* Tableau de comparaison */}
      {left && right ? (
        <CompareTable left={left} right={right} allEspers={ESPERS} />
      ) : (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)', fontFamily: 'var(--font-ui)' }}>
          {!left && !right ? 'Sélectionne deux Espers pour commencer la comparaison' :
           !left ? 'Sélectionne un Esper à gauche' : 'Sélectionne un Esper à droite'}
        </div>
      )}

      {/* Picker modal */}
      {picker && (
        <PickerModal
          espers={ESPERS}
          excluded={picker === 'left' ? right?.id : left?.id}
          onSelect={e => { picker === 'left' ? setLeft(e) : setRight(e); setPicker(null) }}
          onClose={() => setPicker(null)}
        />
      )}
    </div>
  )
}

/* ── Slot de sélection ───────────────────────────────────────────────────── */
function EsperSlot({ esper, onOpen, onClear, loading }) {
  const el = esper ? ELEMENTS[esper.element] : null

  if (loading) return <div className="skeleton" style={{ height: '130px', borderRadius: '16px' }} />

  if (!esper) return (
    <button
      onClick={onOpen}
      style={{
        width: '100%', height: '130px', borderRadius: '16px',
        background: 'rgba(255,255,255,0.02)',
        border: '2px dashed rgba(255,45,135,0.25)',
        color: 'rgba(255,45,135,0.5)', cursor: 'pointer',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: '8px', transition: 'all 200ms', fontFamily: 'var(--font-ui)',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,45,135,0.6)'; e.currentTarget.style.color = 'rgba(255,45,135,0.8)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,45,135,0.25)'; e.currentTarget.style.color = 'rgba(255,45,135,0.5)' }}
    >
      <span style={{ fontSize: '32px' }}>+</span>
      <span style={{ fontSize: '13px', fontWeight: 700 }}>Choisir un Esper</span>
    </button>
  )

  return (
    <div style={{
      padding: '20px 24px', borderRadius: '16px',
      background: `linear-gradient(135deg, ${el.color}15, rgba(255,255,255,0.02))`,
      border: `2px solid ${el.color}40`,
      display: 'flex', alignItems: 'center', gap: '16px',
    }}>
      {/* Avatar */}
      <div style={{
        width: '70px', height: '70px', borderRadius: '14px', flexShrink: 0,
        background: `linear-gradient(135deg, ${el.color}40, ${el.color}15)`,
        border: `2px solid ${el.color}60`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
        boxShadow: `0 0 20px ${el.color}30`,
      }}>
        {esper.image
          ? <img src={esper.image} alt={esper.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
              onError={e => { e.currentTarget.style.display = 'none' }} />
          : <ElementIcon el={el} size={32} />
        }
      </div>

      {/* Infos */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', letterSpacing: '0.5px', marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {esper.name}
        </div>
        <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px' }}>{esper.divinity}</div>
        <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
          <span className={`badge badge-${esper.element}`} style={{ fontSize: '10px' }}>{el.emoji} {el.label}</span>
          <span className={`badge badge-${esper.tier}`} style={{ fontSize: '10px' }}>Tier {esper.tier}</span>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flexShrink: 0 }}>
        <button onClick={onOpen} style={{ padding: '6px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border)', color: 'var(--text-secondary)', fontSize: '11px', cursor: 'pointer', fontWeight: 600 }}>
          Changer
        </button>
        <button onClick={onClear} style={{ padding: '6px 12px', borderRadius: '8px', background: 'rgba(255,82,82,0.06)', border: '1px solid rgba(255,82,82,0.2)', color: 'rgba(255,82,82,0.7)', fontSize: '11px', cursor: 'pointer' }}>
          Retirer
        </button>
      </div>
    </div>
  )
}

/* ── Tableau de comparaison ──────────────────────────────────────────────── */
function CompareTable({ left, right, allEspers }) {
  const elL = ELEMENTS[left.element]  || { emoji: '❓', color: '#888' }
  const elR = ELEMENTS[right.element] || { emoji: '❓', color: '#888' }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* Identité */}
      <Section title="🧬 IDENTITÉ">
        <Row label="Élément"  left={<span className={`badge badge-${left.element}`}>{elL.emoji} {elL.label}</span>}  right={<span className={`badge badge-${right.element}`}>{elR.emoji} {elR.label}</span>} />
        <Row label="Rôle"     left={<span className={`badge badge-${left.role}`}>{ROLES[left.role]?.icon} {ROLES[left.role]?.label}</span>} right={<span className={`badge badge-${right.role}`}>{ROLES[right.role]?.icon} {ROLES[right.role]?.label}</span>} />
        <Row label="Tier"     left={<TierBadge tier={left.tier} />}  right={<TierBadge tier={right.tier} />}  winLeft={TIER_SCORE[left.tier] > TIER_SCORE[right.tier]} winRight={TIER_SCORE[right.tier] > TIER_SCORE[left.tier]} />
        <Row label="Rareté"   left={'★'.repeat(left.rarity)}  right={'★'.repeat(right.rarity)}  winLeft={left.rarity > right.rarity} winRight={right.rarity > left.rarity} />
        <Row label="Divinité" left={left.divinity} right={right.divinity} muted />
      </Section>

      {/* Performances par mode */}
      <Section title="📊 PERFORMANCES PAR MODE">
        {Object.entries(MODE_LABELS).map(([mode, label]) => {
          const lv = left.modes?.[mode], rv = right.modes?.[mode]
          const ls = TIER_SCORE[lv] || 0, rs = TIER_SCORE[rv] || 0
          return (
            <Row key={mode} label={label}
              left={lv  ? <TierBadge tier={lv} /> : <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>—</span>}
              right={rv ? <TierBadge tier={rv} /> : <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>—</span>}
              winLeft={ls > rs} winRight={rs > ls}
            />
          )
        })}
      </Section>

      {/* Builds de relics */}
      <Section title="⚙️ BUILD RECOMMANDÉ">
        <BuildRow label="Set principal" left={left.relicBuild?.primary?.label}  right={right.relicBuild?.primary?.label} />
        <BuildRow label="Set alternatif" left={left.relicBuild?.alt?.label}     right={right.relicBuild?.alt?.label} />
        <BuildRow label="Anneau"  left={left.relicBuild?.mainStats?.ring}   right={right.relicBuild?.mainStats?.ring} />
        <BuildRow label="Casque"  left={left.relicBuild?.mainStats?.helmet} right={right.relicBuild?.mainStats?.helmet} />
        <BuildRow label="Bottes"  left={left.relicBuild?.mainStats?.boots}  right={right.relicBuild?.mainStats?.boots} />
        <Row label="Substats"
          left={<SubstatList subs={left.relicBuild?.substats} />}
          right={<SubstatList subs={right.relicBuild?.substats} />}
        />
      </Section>

      {/* Synergies */}
      <Section title="🔗 SYNERGIES">
        <Row
          label="Synergies clés"
          left={<SynergyList ids={left.synergies}  allEspers={allEspers} />}
          right={<SynergyList ids={right.synergies} allEspers={allEspers} />}
        />
        {/* Synergie mutuelle */}
        {left.synergies?.includes(right.id) || right.synergies?.includes(left.id) ? (
          <div style={{
            padding: '12px 16px', borderRadius: '10px', textAlign: 'center',
            background: 'rgba(255,210,0,0.08)', border: '1px solid rgba(255,210,0,0.3)',
            fontSize: '13px', color: 'var(--gold)', fontWeight: 700,
          }}>
            ⚡ Ces deux Espers se synergisent entre eux !
          </div>
        ) : null}
      </Section>

    </div>
  )
}

/* ── Composants utilitaires ──────────────────────────────────────────────── */
function Section({ title, children }) {
  return (
    <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
      <div style={{
        padding: '12px 20px',
        background: 'rgba(255,255,255,0.02)',
        borderBottom: '1px solid var(--border)',
        fontFamily: 'var(--font-display)', fontSize: '11px',
        color: 'var(--text-muted)', letterSpacing: '2px',
      }}>{title}</div>
      <div style={{ padding: '8px 0' }}>{children}</div>
    </div>
  )
}

function Row({ label, left, right, winLeft, winRight, muted }) {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '1fr 120px 1fr',
      alignItems: 'center', padding: '10px 20px', gap: '12px',
      borderBottom: '1px solid rgba(255,255,255,0.03)',
    }}>
      <div style={{
        display: 'flex', justifyContent: 'flex-end',
        background: winLeft ? 'rgba(82,255,138,0.06)' : 'transparent',
        borderRadius: '8px', padding: '4px 8px',
        border: winLeft ? '1px solid rgba(82,255,138,0.2)' : '1px solid transparent',
      }}>
        <span style={{ fontSize: '13px', color: muted ? 'var(--text-muted)' : 'var(--text-secondary)' }}>{left}</span>
        {winLeft && <span style={{ marginLeft: '6px', fontSize: '12px' }}>✅</span>}
      </div>

      <div style={{ textAlign: 'center', fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-ui)', fontWeight: 600, letterSpacing: '0.5px' }}>
        {label}
      </div>

      <div style={{
        display: 'flex', justifyContent: 'flex-start',
        background: winRight ? 'rgba(82,255,138,0.06)' : 'transparent',
        borderRadius: '8px', padding: '4px 8px',
        border: winRight ? '1px solid rgba(82,255,138,0.2)' : '1px solid transparent',
      }}>
        {winRight && <span style={{ marginRight: '6px', fontSize: '12px' }}>✅</span>}
        <span style={{ fontSize: '13px', color: muted ? 'var(--text-muted)' : 'var(--text-secondary)' }}>{right}</span>
      </div>
    </div>
  )
}

function BuildRow({ label, left, right }) {
  const same = left && right && left === right
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '1fr 120px 1fr',
      alignItems: 'center', padding: '8px 20px', gap: '12px',
      borderBottom: '1px solid rgba(255,255,255,0.03)',
    }}>
      <div style={{ textAlign: 'right', fontSize: '12px', color: 'var(--text-secondary)' }}>{left || <span style={{ color: 'var(--text-muted)' }}>—</span>}</div>
      <div style={{ textAlign: 'center', fontSize: '11px', color: same ? '#52ff8a' : 'var(--text-muted)', fontFamily: 'var(--font-ui)', fontWeight: 600 }}>
        {same ? '= même' : label}
      </div>
      <div style={{ textAlign: 'left', fontSize: '12px', color: 'var(--text-secondary)' }}>{right || <span style={{ color: 'var(--text-muted)' }}>—</span>}</div>
    </div>
  )
}

function TierBadge({ tier }) {
  return (
    <span style={{
      fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '14px',
      color: TIER_COLORS[tier] || '#aaa',
      textShadow: `0 0 8px ${TIER_COLORS[tier] || '#aaa'}60`,
    }}>{tier}</span>
  )
}

function SubstatList({ subs }) {
  if (!subs?.length) return <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>—</span>
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
      {subs.map((s, i) => (
        <span key={i} style={{
          padding: '2px 7px', borderRadius: '4px', fontSize: '10px',
          background: i === 0 ? 'rgba(255,208,74,0.12)' : 'rgba(255,255,255,0.04)',
          border: i === 0 ? '1px solid rgba(255,208,74,0.3)' : '1px solid var(--border)',
          color: i === 0 ? 'var(--gold)' : 'var(--text-secondary)',
        }}>{s}</span>
      ))}
    </div>
  )
}

function SynergyList({ ids, allEspers }) {
  if (!ids?.length) return <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>—</span>
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
      {ids.map(id => {
        const e = allEspers.find(x => x.id === id)
        if (!e) return null
        const el = ELEMENTS[e.element] || { emoji: '❓', color: '#888' }
        return (
          <span key={id} style={{
            padding: '2px 7px', borderRadius: '4px', fontSize: '10px',
            background: `${el.color}12`, border: `1px solid ${el.color}30`,
            color: el.color, fontWeight: 600,
          }}>{el.emoji} {e.name}</span>
        )
      })}
    </div>
  )
}

/* ── Modal de sélection ──────────────────────────────────────────────────── */
function PickerModal({ espers, excluded, onSelect, onClose }) {
  const [search, setSearch] = useState('')
  const [filterEl, setFilterEl] = useState(null)
  const [filterTier, setFilterTier] = useState(null)

  const filtered = useMemo(() => espers.filter(e => {
    if (e.id === excluded) return false
    if (search && !e.name.toLowerCase().includes(search.toLowerCase()) &&
        !(e.divinity || '').toLowerCase().includes(search.toLowerCase())) return false
    if (filterEl && e.element !== filterEl) return false
    if (filterTier && e.tier !== filterTier) return false
    return true
  }), [espers, excluded, search, filterEl, filterTier])

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 2000, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '80px 24px 24px', backdropFilter: 'blur(8px)' }}
      onClick={onClose}>
      <div style={{ background: 'rgba(10,10,30,0.98)', border: '1px solid rgba(255,45,135,0.2)', borderRadius: '20px', width: '95vw', maxWidth: '1200px', maxHeight: '85vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '14px', letterSpacing: '2px', color: 'var(--pink)', flexShrink: 0 }}>CHOISIR UN ESPER</div>
          <input className="input" type="text" placeholder="Rechercher..." value={search} onChange={e => setSearch(e.target.value)} autoFocus style={{ flex: 1 }} />
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-secondary)', width: '36px', height: '36px', cursor: 'pointer', fontSize: '16px', flexShrink: 0 }}>✕</button>
        </div>

        {/* Filtres */}
        <div style={{ padding: '12px 24px', borderBottom: '1px solid var(--border)', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {Object.entries(ELEMENTS).map(([k, el]) => (
            <button key={k} className={`tag ${filterEl === k ? 'active' : ''}`} onClick={() => setFilterEl(filterEl === k ? null : k)}>
              {el.emoji} {el.label}
            </button>
          ))}
          <span style={{ width: '1px', background: 'var(--border)', margin: '0 4px' }} />
          {['SS','S','A','B'].map(t => (
            <button key={t} className={`tag ${filterTier === t ? 'active' : ''}`} onClick={() => setFilterTier(filterTier === t ? null : t)}>{t}</button>
          ))}
        </div>

        {/* Grille */}
        <div style={{ flex: 1, overflow: 'auto', padding: '16px 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '6px', alignContent: 'start' }}>
          {filtered.length === 0
            ? <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>Aucun Esper trouvé</div>
            : filtered.map(e => <EsperCard key={e.id} esper={e} compact onClick={() => onSelect(e)} />)
          }
        </div>
      </div>
    </div>
  )
}
