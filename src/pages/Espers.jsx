import { useState, useMemo, useRef, useEffect, useTransition } from 'react'
import { ELEMENTS, ROLES, ROLE_GROUPS } from '../data/espers.js'
import { useEspers } from '../context/EspersContext.jsx'
import { RELIC_SETS, SUBSTAT_PRIORITY } from '../data/relics.js'
import EsperCard, { ElementIcon } from '../components/EsperCard.jsx'
import { useEsperTooltip } from '../components/EsperTooltip.jsx'
import { useFavorites } from '../hooks/useFavorites.js'

const TIER_ORDER  = { SS: 0, S: 1, A: 2, B: 3, C: 4 }
const TIER_COLORS = { SS: '#FF2D87', S: '#FFD200', A: '#38BDF8', B: '#4ADE80', C: '#aaa' }
const PAGE_SIZE   = 40

export default function Espers() {
  const { espers: ESPERS, loading } = useEspers()
  const [selected, setSelected] = useState(null)
  const [search, setSearch] = useState('')
  const [filterEl, setFilterEl] = useState(null)
  const [filterRole, setFilterRole] = useState(null)
  const [filterTier, setFilterTier] = useState(null)
  const [sort, setSort] = useState('tier')
  const [page, setPage] = useState(1)
  const [view, setView] = useState(() => localStorage.getItem('espers-view') || 'grid')
  const [onlyFavs, setOnlyFavs] = useState(false)
  const [filterSynergy, setFilterSynergy] = useState(null) // { id, name, synergies[] }
  const { favorites, toggle: toggleFav, isFav, count: favCount } = useFavorites()
  const [isPending, startTransition] = useTransition()

  const filtered = useMemo(() => {
    return ESPERS
      .filter(e => {
        if (filterSynergy && !filterSynergy.synergies.includes(e.id)) return false
        if (onlyFavs && !favorites.has(e.id)) return false
        if (search && !e.name.toLowerCase().includes(search.toLowerCase()) &&
            !(e.divinity || '').toLowerCase().includes(search.toLowerCase())) return false
        if (filterEl && e.element !== filterEl) return false
        if (filterRole && !ROLE_GROUPS[filterRole]?.roles.includes(e.role)) return false
        if (filterTier && e.tier !== filterTier) return false
        return true
      })
      .sort((a, b) => {
        if (sort === 'tier') return (TIER_ORDER[a.tier] ?? 5) - (TIER_ORDER[b.tier] ?? 5)
        if (sort === 'name') return a.name.localeCompare(b.name)
        return 0
      })
  }, [ESPERS, search, filterEl, filterRole, filterTier, sort, onlyFavs, favorites, filterSynergy])

  // Réinitialise la page dès qu'un filtre change
  useEffect(() => { setPage(1) }, [search, filterEl, filterRole, filterTier, sort])

  const visible = filtered.slice(0, page * PAGE_SIZE)
  const hasMore = filtered.length > visible.length
  const remaining = filtered.length - visible.length

  const selectedEsper = selected ? ESPERS.find(e => e.id === selected) : null
  const tooltip = useEsperTooltip()
  const panelRef = useRef(null)

  useEffect(() => {
    if (!selectedEsper) return
    const handler = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setSelected(null)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [selectedEsper])

  return (
    <div className="page" style={{ paddingTop: '40px', paddingBottom: '60px' }}>
      {tooltip.node}
      <div className="section-header" style={{ marginBottom: '32px' }}>
        <div>
          <h1 className="section-title" style={{ color: 'var(--purple)' }}>Base de Données Espers</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px', minHeight: '20px' }}>
            {loading ? ' ' : `${ESPERS.length} Espers documentés`}
          </p>
        </div>
        <div className="section-header-line" style={{ background: 'linear-gradient(90deg, rgba(139,92,246,0.3), transparent)' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selectedEsper ? '1fr 400px' : '1fr', gap: '28px', alignItems: 'start' }}>
        {/* Left: list */}
        <div>
          {/* Search & sort & toggle */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <input
                className="input"
                type="text"
                placeholder="🔍  Rechercher un Esper..."
                value={search}
                onChange={e => { const v = e.target.value; startTransition(() => setSearch(v)) }}
              />
            </div>
            <select
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                color: 'var(--text-secondary)',
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                padding: '10px 14px',
                cursor: 'pointer',
                outline: 'none',
              }}
              value={sort}
              onChange={e => { const v = e.target.value; startTransition(() => setSort(v)) }}
            >
              <option value="tier">Trier par Tier</option>
              <option value="name">Trier par Nom</option>
            </select>

            {/* Toggle grille / liste */}
            <div style={{ display: 'flex', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border)', flexShrink: 0 }}>
              {[
                { id: 'grid', icon: '▦', title: 'Vue grille' },
                { id: 'list', icon: '☰', title: 'Vue liste'  },
              ].map(v => (
                <button
                  key={v.id}
                  title={v.title}
                  onClick={() => { setView(v.id); localStorage.setItem('espers-view', v.id) }}
                  style={{
                    padding: '10px 14px',
                    background: view === v.id ? 'rgba(139,92,246,0.2)' : 'rgba(255,255,255,0.03)',
                    border: 'none',
                    borderLeft: v.id === 'list' ? '1px solid var(--border)' : 'none',
                    color: view === v.id ? 'var(--purple)' : 'var(--text-muted)',
                    fontSize: '16px',
                    cursor: 'pointer',
                    transition: 'all 150ms',
                    lineHeight: 1,
                  }}
                >{v.icon}</button>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '24px' }}>
            {Object.entries(ELEMENTS).map(([key, el]) => (
              <button
                key={key}
                className={`tag ${filterEl === key ? 'active' : ''}`}
                onClick={() => { const v = filterEl === key ? null : key; startTransition(() => setFilterEl(v)) }}
              >
                <ElementIcon el={el} size={14} /> {el.label}
              </button>
            ))}
            <div style={{ width: '1px', background: 'var(--border)', margin: '0 4px' }} />
            {Object.entries(ROLE_GROUPS).map(([key, group]) => (
              <button
                key={key}
                className={`tag ${filterRole === key ? 'active' : ''}`}
                onClick={() => { const v = filterRole === key ? null : key; startTransition(() => setFilterRole(v)) }}
              >
                {group.icon} {group.label}
              </button>
            ))}
            <div style={{ width: '1px', background: 'var(--border)', margin: '0 4px' }} />
            {['SS', 'S', 'A', 'B'].map(t => (
              <button
                key={t}
                className={`tag ${filterTier === t ? 'active' : ''}`}
                onClick={() => { const v = filterTier === t ? null : t; startTransition(() => setFilterTier(v)) }}
              >
                {t}
              </button>
            ))}
            <div style={{ width: '1px', background: 'var(--border)', margin: '0 4px' }} />
            <button
              className={`tag ${onlyFavs ? 'active' : ''}`}
              onClick={() => setOnlyFavs(v => !v)}
              style={onlyFavs ? { borderColor: 'rgba(255,210,0,0.5)', color: 'var(--gold)', background: 'rgba(255,210,0,0.1)' } : {}}
            >
              ⭐ Favoris {favCount > 0 && <span style={{ marginLeft: '3px', fontSize: '10px', opacity: 0.8 }}>({favCount})</span>}
            </button>
            {filterSynergy && (
              <button
                className="tag active"
                onClick={() => setFilterSynergy(null)}
                style={{ borderColor: 'rgba(255,210,0,0.5)', color: 'var(--gold)', background: 'rgba(255,210,0,0.1)' }}
              >
                🔗 Synergies de {filterSynergy.name} ✕
              </button>
            )}
            {(filterEl || filterRole || filterTier || search || onlyFavs || filterSynergy) && (
              <button className="tag" onClick={() => { setFilterEl(null); setFilterRole(null); setFilterTier(null); setSearch(''); setOnlyFavs(false); setFilterSynergy(null) }}>
                ✕ Réinitialiser
              </button>
            )}
          </div>

          {/* Results count */}
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px', fontFamily: 'var(--font-ui)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            {loading ? ' ' : `${visible.length} / ${filtered.length} Esper${filtered.length !== 1 ? 's' : ''}`}
            {isPending && <span style={{ fontSize: '10px', color: 'var(--purple)', opacity: 0.7 }}>⏳ filtrage…</span>}
          </div>

          {/* Grille ou Liste */}
          {view === 'grid' ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: `repeat(auto-fill, minmax(${selectedEsper ? '140px' : '180px'}, 1fr))`,
              gap: '12px',
              minHeight: '400px',
            }}>
              {loading
                ? Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="skeleton" style={{ height: '168px' }} />
                  ))
                : visible.map(esper => (
                    <div
                      key={esper.id}
                      style={{ height: '100%', position: 'relative' }}
                      onMouseEnter={e => !selectedEsper && tooltip.show(esper, e)}
                      onMouseLeave={tooltip.hide}
                      onMouseMove={tooltip.move}
                    >
                      <EsperCard
                        esper={esper}
                        selected={selected === esper.id}
                        compact={!!selectedEsper}
                        onClick={() => { tooltip.hide(); setSelected(selected === esper.id ? null : esper.id) }}
                      />
                      {/* Bouton favori */}
                      <button
                        onClick={e => { e.stopPropagation(); toggleFav(esper.id) }}
                        title={isFav(esper.id) ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                        style={{
                          position: 'absolute', top: '8px', left: '8px', zIndex: 10,
                          background: isFav(esper.id) ? 'rgba(255,210,0,0.2)' : 'rgba(0,0,0,0.45)',
                          border: `1px solid ${isFav(esper.id) ? 'rgba(255,210,0,0.6)' : 'rgba(255,255,255,0.15)'}`,
                          borderRadius: '6px', cursor: 'pointer',
                          fontSize: '13px', lineHeight: 1,
                          padding: '3px 5px',
                          transition: 'all 150ms',
                        }}
                      >{isFav(esper.id) ? '⭐' : '☆'}</button>
                    </div>
                  ))
              }
              {!loading && filtered.length === 0 && (
                <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px', color: 'var(--text-muted)', fontFamily: 'var(--font-ui)' }}>
                  Aucun Esper ne correspond aux filtres
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minHeight: '400px' }}>
              {loading
                ? Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="skeleton" style={{ height: '52px', borderRadius: '10px' }} />
                  ))
                : visible.map(esper => (
                    <EsperListRow
                      key={esper.id}
                      esper={esper}
                      selected={selected === esper.id}
                      isFav={isFav(esper.id)}
                      onToggleFav={e => { e.stopPropagation(); toggleFav(esper.id) }}
                      onClick={() => { tooltip.hide(); setSelected(selected === esper.id ? null : esper.id) }}
                    />
                  ))
              }
              {!loading && filtered.length === 0 && (
                <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)', fontFamily: 'var(--font-ui)' }}>
                  Aucun Esper ne correspond aux filtres
                </div>
              )}
            </div>
          )}

          {/* Bouton charger plus */}
          {!loading && hasMore && (
            <div style={{ textAlign: 'center', marginTop: '32px' }}>
              <button
                onClick={() => setPage(p => p + 1)}
                style={{
                  padding: '12px 32px',
                  borderRadius: '12px',
                  background: 'rgba(139,92,246,0.1)',
                  border: '1px solid rgba(139,92,246,0.35)',
                  color: 'var(--purple)',
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 700,
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'all 200ms',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(139,92,246,0.2)'
                  e.currentTarget.style.borderColor = 'rgba(139,92,246,0.6)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(139,92,246,0.1)'
                  e.currentTarget.style.borderColor = 'rgba(139,92,246,0.35)'
                }}
              >
                Voir {Math.min(remaining, PAGE_SIZE)} Espers de plus
              </button>
              <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--text-muted)' }}>
                {remaining} restant{remaining > 1 ? 's' : ''}
              </div>
            </div>
          )}
        </div>

        {/* Right: detail */}
        {selectedEsper && (
          <div ref={panelRef} style={{ position: 'sticky', top: '80px' }}>
            <EsperDetailFull
              esper={selectedEsper}
              allEspers={ESPERS}
              onClose={() => setSelected(null)}
              onFilterSynergy={synergies => {
                setFilterSynergy(synergies?.length ? { id: selectedEsper.id, name: selectedEsper.name, synergies } : null)
                setFilterEl(null); setFilterRole(null); setFilterTier(null); setSearch(''); setOnlyFavs(false)
              }}
              filterSynergyActive={filterSynergy?.id === selectedEsper?.id}
            />
          </div>
        )}
      </div>
    </div>
  )
}

function EsperListRow({ esper, selected, isFav, onToggleFav, onClick }) {
  const el   = ELEMENTS[esper.element] || { emoji: '❓', color: '#888', label: '?' }
  const role = ROLES[esper.role]
  const MODE_KEYS = ['story','kronos','apep','fafnir','pvp']
  const MODE_ICONS = { story:'📖', kronos:'👹', apep:'🐍', fafnir:'🐉', pvp:'⚔️' }

  return (
    <div
      onClick={onClick}
      style={{
        display: 'grid',
        gridTemplateColumns: '36px 1fr auto auto',
        alignItems: 'center',
        gap: '12px',
        padding: '10px 14px',
        borderRadius: '10px',
        border: selected
          ? `1px solid ${el.color}60`
          : '1px solid var(--border)',
        background: selected
          ? `${el.color}10`
          : 'rgba(255,255,255,0.02)',
        cursor: 'pointer',
        transition: 'all 150ms',
      }}
      onMouseEnter={e => { if (!selected) e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
      onMouseLeave={e => { if (!selected) e.currentTarget.style.background = 'rgba(255,255,255,0.02)' }}
    >
      {/* Avatar miniature */}
      <div style={{
        width: '36px', height: '36px', borderRadius: '8px', flexShrink: 0, overflow: 'hidden',
        background: `${el.color}20`, border: `1px solid ${el.color}40`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {esper.image
          ? <img src={esper.image} alt={esper.name} loading="lazy" decoding="async"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
              onError={e => { e.currentTarget.style.display='none' }} />
          : <ElementIcon el={el} size={18} />
        }
      </div>

      {/* Nom + méta */}
      <div style={{ minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: '14px', color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
            {esper.name}
          </span>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
            {el.emoji} {el.label}
          </span>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
            {role?.icon} {role?.label}
          </span>
        </div>
        <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '1px' }}>
          {'★'.repeat(esper.rarity)} · {esper.divinity}
        </div>
      </div>

      {/* Scores par mode */}
      <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }} className="hide-mobile">
        {MODE_KEYS.map(m => {
          const rating = esper.modes?.[m]
          return (
            <div key={m} title={m} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1px',
              padding: '3px 6px', borderRadius: '6px', minWidth: '30px',
              background: rating ? `${TIER_COLORS[rating]}12` : 'transparent',
              border: `1px solid ${rating ? TIER_COLORS[rating]+'30' : 'transparent'}`,
            }}>
              <span style={{ fontSize: '9px' }}>{MODE_ICONS[m]}</span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '11px', fontWeight: 900, color: rating ? TIER_COLORS[rating] : 'var(--text-muted)' }}>
                {rating || '—'}
              </span>
            </div>
          )
        })}
      </div>

      {/* Tier global */}
      <div style={{
        fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '16px',
        color: TIER_COLORS[esper.tier] || '#aaa',
        textShadow: `0 0 10px ${TIER_COLORS[esper.tier] || '#aaa'}60`,
        minWidth: '24px', textAlign: 'center', flexShrink: 0,
      }}>
        {esper.tier}
      </div>

      {/* Bouton favori */}
      <button
        onClick={onToggleFav}
        title={isFav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
        style={{
          background: 'none', border: 'none', cursor: 'pointer',
          fontSize: '15px', lineHeight: 1, flexShrink: 0,
          opacity: isFav ? 1 : 0.25, transition: 'opacity 150ms',
        }}
        onMouseEnter={e => e.currentTarget.style.opacity = '1'}
        onMouseLeave={e => e.currentTarget.style.opacity = isFav ? '1' : '0.25'}
      >{isFav ? '⭐' : '☆'}</button>
    </div>
  )
}

function EsperDetailFull({ esper, allEspers = [], onClose, onFilterSynergy, filterSynergyActive }) {
  const el = ELEMENTS[esper.element] || { emoji: '❓', color: '#888', label: esper.element || '?' }
  const role = ROLES[esper.role]
  const tierColors = { SS: '#FF2D87', S: '#FFD200', A: '#38BDF8', B: '#4ADE80', C: '#aaa' }
  const tierColor = tierColors[esper.tier]
  const build = esper.relicBuild || null
  const relicSet4 = build?.primary?.set4 ? RELIC_SETS.find(r => r.id === build.primary.set4) : null
  const relicSet2 = build?.primary?.set2 ? RELIC_SETS.find(r => r.id === build.primary.set2) : null

  const modeLabels = { story: '📖 Story', kronos: '👹 Kronos', apep: '🐍 Apep', fafnir: '🐉 Fafnir', pvp: '⚔️ PvP' }

  return (
    <div className="card animate-fade" style={{ padding: '0', overflow: 'hidden', maxHeight: 'calc(100vh - 120px)', overflowY: 'auto' }}>
      {/* Header image area */}
      <div style={{
        background: `linear-gradient(160deg, ${el.color}30 0%, rgba(10,10,30,0.8) 100%)`,
        padding: '28px',
        position: 'relative',
        borderBottom: '1px solid var(--border)',
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            color: 'var(--text-secondary)',
            width: '32px',
            height: '32px',
            cursor: 'pointer',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >✕</button>

        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '18px',
            background: `linear-gradient(135deg, ${el.color}40, ${el.color}15)`,
            border: `2px solid ${el.color}60`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '40px',
            flexShrink: 0,
            boxShadow: `0 0 30px ${el.color}30`,
            overflow: 'hidden',
            position: 'relative',
          }}>
            {esper.image ? (
              <img
                src={esper.image}
                alt={esper.name}
                loading="lazy" decoding="async" width="80" height="80"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
                onError={e => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'flex' }}
              />
            ) : null}
            <span style={{
              display: esper.image ? 'none' : 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
            }}><ElementIcon el={el} size={32} /></span>
          </div>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', letterSpacing: '1px', marginBottom: '4px' }}>
              {esper.name}
            </h2>
            <div style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '10px' }}>
              {esper.divinity} · {'★'.repeat(esper.rarity)}
            </div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              <span className={`badge badge-${esper.element}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><ElementIcon el={el} size={12} /> {el.label}</span>
              <span className={`badge badge-${esper.role}`}>{role?.icon} {role?.label}</span>
              <span className={`badge badge-${esper.tier}`}>Tier {esper.tier}</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '24px' }}>
        {/* Description */}
        <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.7, marginBottom: '20px' }}>
          {esper.longDescription || esper.description}
        </p>

        {/* Captain */}
        {esper.captain && (
          <div style={{
            padding: '12px 16px',
            borderRadius: '10px',
            background: 'rgba(255,210,0,0.08)',
            border: '1px solid rgba(255,210,0,0.25)',
            marginBottom: '20px',
          }}>
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-display)', color: 'var(--gold)', letterSpacing: '2px' }}>
              👑 BONUS CAPITAINE —
            </span>{' '}
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{esper.captain}</span>
          </div>
        )}

        {/* Performance par mode */}
        {esper.modes && (
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '11px', fontFamily: 'var(--font-display)', color: 'var(--text-muted)', letterSpacing: '2px', marginBottom: '10px' }}>
              PERFORMANCE PAR MODE
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {Object.entries(esper.modes).map(([modeKey, rating]) => {
                const ratingColor = tierColors[rating] || '#aaa'
                return (
                  <div key={modeKey} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    background: `${ratingColor}10`,
                    border: `1px solid ${ratingColor}30`,
                    fontSize: '12px',
                  }}>
                    <span style={{ color: 'var(--text-muted)' }}>{modeLabels[modeKey]}</span>
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, color: ratingColor, fontSize: '12px' }}>
                      {rating}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        <div className="divider" />

        {/* Build */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '11px', fontFamily: 'var(--font-display)', color: 'var(--pink)', letterSpacing: '2px', marginBottom: '14px' }}>
            ⚙️ BUILD RECOMMANDÉ
          </div>

          {!build ? (
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontStyle: 'italic' }}>
              Build non encore documenté.
            </div>
          ) : (
            <>
              {/* Sets */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
                {relicSet4 && (
                  <div style={{
                    padding: '12px',
                    borderRadius: '10px',
                    background: `${relicSet4.color}10`,
                    border: `1px solid ${relicSet4.color}30`,
                  }}>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '3px' }}>4 pièces</div>
                    <div style={{ fontWeight: 700, fontSize: '13px', color: relicSet4.color }}>{relicSet4.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{relicSet4.effect}</div>
                  </div>
                )}
                {relicSet2 && (
                  <div style={{
                    padding: '12px',
                    borderRadius: '10px',
                    background: `${relicSet2.color}10`,
                    border: `1px solid ${relicSet2.color}30`,
                  }}>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '3px' }}>2 pièces</div>
                    <div style={{ fontWeight: 700, fontSize: '13px', color: relicSet2.color }}>{relicSet2.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{relicSet2.effect}</div>
                  </div>
                )}
              </div>

              {/* Substats — build spécifique ou fallback par rôle */}
              {(() => {
                const subs = build.substats?.length > 0
                  ? build.substats
                  : SUBSTAT_PRIORITY[esper.role] || []
                const isGeneric = !(build.substats?.length > 0)
                return subs.length > 0 ? (
                  <>
                    <div style={{ fontSize: '11px', fontFamily: 'var(--font-display)', color: 'var(--text-muted)', letterSpacing: '1px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      SUBSTATS À PRIORISER
                      {isGeneric && <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-body)', letterSpacing: 0 }}>— priorités génériques pour ce rôle</span>}
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                      {subs.map((sub, i) => (
                        <span key={i} style={{
                          padding: '4px 10px',
                          borderRadius: '6px',
                          background: i === 0 ? 'rgba(255,208,74,0.12)' : 'rgba(255,255,255,0.04)',
                          border: i === 0 ? '1px solid rgba(255,208,74,0.3)' : '1px solid var(--border)',
                          fontSize: '11px',
                          color: i === 0 ? 'var(--gold)' : 'var(--text-secondary)',
                          fontFamily: 'var(--font-ui)',
                          fontWeight: i === 0 ? 700 : 400,
                        }}>
                          {i === 0 ? '★ ' : ''}{sub}
                        </span>
                      ))}
                    </div>
                  </>
                ) : null
              })()}

              {build.notes && (
                <div style={{
                  padding: '10px 14px',
                  borderRadius: '8px',
                  background: 'rgba(255,45,135,0.04)',
                  border: '1px solid rgba(255,45,135,0.12)',
                  fontSize: '12px',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.5,
                }}>
                  💡 {build.notes}
                </div>
              )}
            </>
          )}
        </div>

        {/* Synergies */}
        {esper.synergies?.length > 0 && (
          <>
            <div className="divider" />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div style={{ fontSize: '11px', fontFamily: 'var(--font-display)', color: 'var(--text-muted)', letterSpacing: '2px' }}>
                  🔗 SYNERGIES
                </div>
                <button
                  onClick={() => onFilterSynergy?.(esper.synergies)}
                  style={{
                    padding: '4px 10px', borderRadius: '6px', fontSize: '11px',
                    fontFamily: 'var(--font-ui)', fontWeight: 700, cursor: 'pointer',
                    background: filterSynergyActive ? 'rgba(255,210,0,0.15)' : 'rgba(255,255,255,0.05)',
                    border: filterSynergyActive ? '1px solid rgba(255,210,0,0.4)' : '1px solid var(--border)',
                    color: filterSynergyActive ? 'var(--gold)' : 'var(--text-secondary)',
                    transition: 'all 150ms',
                  }}
                >
                  {filterSynergyActive ? '✓ Filtré' : '🔍 Filtrer'}
                </button>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {esper.synergies.map(id => {
                  const syn = allEspers.find(e => e.id === id)
                  if (!syn) return null
                  const synEl = ELEMENTS[syn.element] || { emoji: '❓', color: '#888', label: syn.element || '?' }
                  return (
                    <div key={id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      background: `${synEl.color}10`,
                      border: `1px solid ${synEl.color}30`,
                      fontSize: '12px',
                      fontFamily: 'var(--font-ui)',
                      fontWeight: 600,
                      color: synEl.color,
                    }}>
                      {synEl.emoji} {syn.name}
                    </div>
                  )
                })}
              </div>
            </div>
          </>
        )}

        {/* Tips */}
        {esper.tips && (
          <>
            <div className="divider" />
            <div style={{
              padding: '14px 18px',
              borderRadius: '10px',
              background: 'rgba(139,92,246,0.06)',
              border: '1px solid rgba(139,92,246,0.2)',
            }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '11px', color: 'var(--purple)', letterSpacing: '2px', marginBottom: '6px' }}>
                ⚡ CONSEIL PRO
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{esper.tips}</div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}


