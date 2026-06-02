import { useState, useMemo } from 'react'
import { ELEMENTS, ROLES } from '../data/espers.js'
import { useEspers } from '../context/EspersContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { useBox } from '../hooks/useBox.js'
import { useBuilds } from '../hooks/useBuilds.js'
import { RELIC_SETS } from '../data/relics.js'

const TIER_ORDER = { SS: 0, S: 1, A: 2, B: 3, C: 4 }
const TIER_COLORS = { SS: '#FF2D87', S: '#FFD200', A: '#38BDF8', B: '#4ADE80', C: '#aaa' }
const EL_COLORS = { flow: '#3B9EFF', inferno: '#FF5C2B', wind: '#36D98A', umbra: '#A855F7', shimmer: '#FFD535' }

function rrect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.arcTo(x + w, y, x + w, y + r, r)
  ctx.lineTo(x + w, y + h - r)
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r)
  ctx.lineTo(x + r, y + h)
  ctx.arcTo(x, y + h, x, y + h - r, r)
  ctx.lineTo(x, y + r)
  ctx.arcTo(x, y, x + r, y, r)
  ctx.closePath()
}

async function exportBoxToPng(ownedEspers, userName, ownedCount, totalCount) {
  const COLS = 9
  const CELL = 84
  const GAP  = 6
  const PAD  = 24
  const HEADER_H = 90
  const FOOTER_H = 32

  const rows     = Math.ceil(ownedEspers.length / COLS)
  const canvasW  = COLS * (CELL + GAP) - GAP + PAD * 2
  const canvasH  = HEADER_H + rows * (CELL + GAP) - GAP + PAD * 2 + FOOTER_H

  const canvas = document.createElement('canvas')
  canvas.width  = canvasW
  canvas.height = canvasH
  const ctx = canvas.getContext('2d')

  // Fond
  const bg = ctx.createLinearGradient(0, 0, 0, canvasH)
  bg.addColorStop(0, '#09091B')
  bg.addColorStop(1, '#06050F')
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, canvasW, canvasH)

  // Bandeau header
  const hg = ctx.createLinearGradient(0, 0, canvasW, HEADER_H)
  hg.addColorStop(0, 'rgba(255,45,135,0.18)')
  hg.addColorStop(1, 'rgba(139,92,246,0.12)')
  ctx.fillStyle = hg
  ctx.fillRect(0, 0, canvasW, HEADER_H)
  ctx.strokeStyle = 'rgba(255,45,135,0.3)'
  ctx.lineWidth = 1
  ctx.beginPath(); ctx.moveTo(0, HEADER_H); ctx.lineTo(canvasW, HEADER_H); ctx.stroke()

  // Titre
  ctx.fillStyle = '#FF2D87'
  ctx.font = 'bold 20px Arial, sans-serif'
  ctx.fillText('MA BOX · DISLYTE GUIDE FR', PAD, 34)

  // Sous-titre
  ctx.fillStyle = 'rgba(232,232,240,0.55)'
  ctx.font = '13px Arial, sans-serif'
  const date = new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })
  ctx.fillText(`${userName} · ${ownedCount} / ${totalCount} Espers · ${date}`, PAD, 58)

  // Barre de progression
  const barW = canvasW - PAD * 2
  const pct  = ownedCount / totalCount
  ctx.fillStyle = 'rgba(255,255,255,0.08)'
  rrect(ctx, PAD, 70, barW, 8, 4); ctx.fill()
  const pg = ctx.createLinearGradient(PAD, 0, PAD + barW * pct, 0)
  pg.addColorStop(0, '#FF2D87'); pg.addColorStop(1, '#FFD200')
  ctx.fillStyle = pg
  rrect(ctx, PAD, 70, barW * pct, 8, 4); ctx.fill()

  // Charger les images
  const imgs = {}
  await Promise.all(ownedEspers.map(e => new Promise(resolve => {
    if (!e.image) return resolve()
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload  = () => { imgs[e.id] = img; resolve() }
    img.onerror = () => resolve()
    img.src = e.image
  })))

  // Dessiner les cartes
  ownedEspers.forEach((esper, i) => {
    const col = i % COLS
    const row = Math.floor(i / COLS)
    const x = PAD + col * (CELL + GAP)
    const y = HEADER_H + PAD + row * (CELL + GAP)

    const ec = EL_COLORS[esper.element] || '#888'
    const tc = TIER_COLORS[esper.tier]  || '#888'

    // Fond carte
    ctx.fillStyle = `${ec}20`
    rrect(ctx, x, y, CELL, CELL, 9); ctx.fill()
    ctx.strokeStyle = `${ec}45`
    ctx.lineWidth = 1
    rrect(ctx, x, y, CELL, CELL, 9); ctx.stroke()

    // Avatar
    const AV = 52
    const ax = x + (CELL - AV) / 2
    const ay = y + 6
    ctx.save()
    rrect(ctx, ax, ay, AV, AV, 7); ctx.clip()
    if (imgs[esper.id]) {
      ctx.drawImage(imgs[esper.id], ax, ay, AV, AV)
    } else {
      ctx.fillStyle = `${ec}50`
      ctx.fillRect(ax, ay, AV, AV)
      ctx.fillStyle = ec
      ctx.font = 'bold 18px Arial'
      ctx.textAlign = 'center'
      ctx.fillText(esper.name[0] || '?', ax + AV / 2, ay + AV / 2 + 6)
      ctx.textAlign = 'left'
    }
    ctx.restore()

    // Tier badge (haut-droite)
    ctx.fillStyle = tc
    ctx.font = `bold 9px Arial`
    ctx.textAlign = 'right'
    ctx.shadowColor = tc; ctx.shadowBlur = 4
    ctx.fillText(esper.tier, x + CELL - 4, y + 12)
    ctx.shadowBlur = 0

    // Nom (bas)
    ctx.fillStyle = 'rgba(232,232,240,0.88)'
    ctx.font = 'bold 9px Arial'
    ctx.textAlign = 'center'
    let name = esper.name
    while (ctx.measureText(name).width > CELL - 6 && name.length > 1) name = name.slice(0, -1)
    if (name !== esper.name) name += '…'
    ctx.fillText(name, x + CELL / 2, y + CELL - 6)
    ctx.textAlign = 'left'
  })

  // Footer
  ctx.fillStyle = 'rgba(232,232,240,0.2)'
  ctx.font = '10px Arial, sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('alexgrd87.github.io/dislyte-guide', canvasW / 2, canvasH - 10)
  ctx.textAlign = 'left'

  // Téléchargement
  const a = document.createElement('a')
  a.download = `ma-box-dislyte-${new Date().toISOString().slice(0, 10)}.png`
  a.href = canvas.toDataURL('image/png')
  a.click()
}

export default function MyBox({ onNavigate }) {
  const { espers: ESPERS } = useEspers()
  const { user } = useAuth()
  const { box, loading: boxLoading, getEsper, upsertEsper, setNotOwned } = useBox()
  const { builds, getBuildsForEsper, saveBuild, deleteBuild } = useBuilds()

  const [selected, setSelected] = useState(null)
  const [filterEl, setFilterEl] = useState(null)
  const [filterRarity, setFilterRarity] = useState(null)
  const [filterOwned, setFilterOwned] = useState('all') // 'all'|'owned'|'missing'
  const [search, setSearch] = useState('')
  const [buildModal, setBuildModal] = useState(false)
  const [editingBuild, setEditingBuild] = useState(null)
  const [saving, setSaving] = useState(false)
  const [exporting, setExporting] = useState(false)

  const ownedIds = new Set(box.filter(e => e.owned).map(e => e.esper_id))

  const filtered = useMemo(() => {
    return ESPERS
      .filter(e => {
        if (filterEl && e.element !== filterEl) return false
        if (filterRarity && e.rarity !== filterRarity) return false
        if (filterOwned === 'owned' && !ownedIds.has(e.id)) return false
        if (filterOwned === 'missing' && ownedIds.has(e.id)) return false
        if (search && !e.name.toLowerCase().includes(search.toLowerCase())) return false
        return true
      })
      .sort((a, b) => (TIER_ORDER[a.tier] ?? 5) - (TIER_ORDER[b.tier] ?? 5))
  }, [filterEl, filterRarity, filterOwned, search, ownedIds])

  const selectedEsper = selected ? ESPERS.find(e => e.id === selected) : null
  const boxEntry = selected ? getEsper(selected) : null
  const esperBuilds = selected ? getBuildsForEsper(selected) : []

  if (!user) {
    return (
      <div className="page" style={{ paddingTop: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: '20px' }}>
        <div style={{ fontSize: '48px' }}>🔒</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', letterSpacing: '2px', color: 'var(--pink)' }}>CONNEXION REQUISE</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', textAlign: 'center', maxWidth: '400px', lineHeight: 1.6 }}>
          Connecte-toi pour accéder à ta box et sauvegarder ta collection, tes builds et tes équipes.
        </p>
      </div>
    )
  }

  const ownedCount = ownedIds.size
  const totalCount = ESPERS.length

  return (
    <div className="page" style={{ paddingTop: '40px', paddingBottom: '60px' }}>

      {/* Header */}
      <div className="section-header" style={{ marginBottom: '8px' }}>
        <div>
          <h1 className="section-title" style={{ color: 'var(--pink)' }}>Ma Box</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '4px' }}>
            {ownedCount} / {totalCount} Espers · Clique pour gérer, double-clique pour les builds
          </p>
        </div>
        <div className="section-header-line" />
        {/* Progress bar + bouton export */}
        <div style={{ minWidth: '140px', textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
          <div style={{ fontSize: '11px', fontFamily: 'var(--font-display)', color: 'var(--text-muted)', letterSpacing: '1px' }}>
            {Math.round(ownedCount / totalCount * 100)}% complété
          </div>
          <div style={{ height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,0.08)', overflow: 'hidden', width: '140px' }}>
            <div style={{ height: '100%', borderRadius: '2px', width: `${ownedCount / totalCount * 100}%`, background: 'linear-gradient(90deg, var(--pink), var(--gold))', transition: 'width 600ms' }} />
          </div>
          <button
            disabled={exporting || ownedCount === 0}
            onClick={async () => {
              setExporting(true)
              const displayName = user.user_metadata?.full_name || user.user_metadata?.name || 'Joueur'
              const allOwned = ESPERS
                .filter(e => ownedIds.has(e.id))
                .sort((a, b) => (TIER_ORDER[a.tier] ?? 5) - (TIER_ORDER[b.tier] ?? 5))
              await exportBoxToPng(allOwned, displayName, ownedCount, totalCount)
              setExporting(false)
            }}
            style={{
              padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, cursor: exporting ? 'default' : 'pointer',
              background: exporting ? 'rgba(255,255,255,0.04)' : 'rgba(255,45,135,0.1)',
              border: `1px solid ${exporting ? 'var(--border)' : 'rgba(255,45,135,0.3)'}`,
              color: exporting ? 'var(--text-muted)' : 'var(--pink)',
              fontFamily: 'var(--font-ui)', transition: 'all 150ms',
              display: 'flex', alignItems: 'center', gap: '6px',
            }}
          >
            {exporting ? '⏳ Génération…' : '📸 Exporter PNG'}
          </button>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px', alignItems: 'center' }}>
        <input
          className="input"
          style={{ maxWidth: '220px', padding: '8px 14px', fontSize: '13px' }}
          placeholder="🔍 Rechercher..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div style={{ display: 'flex', gap: '4px' }}>
          {['all', 'owned', 'missing'].map(f => (
            <button
              key={f}
              className={`tag ${filterOwned === f ? 'active' : ''}`}
              onClick={() => setFilterOwned(f)}
              style={{ fontSize: '12px', padding: '5px 12px' }}
            >
              {{ all: 'Tous', owned: '✅ Possédés', missing: '⬜ Manquants' }[f]}
            </button>
          ))}
        </div>
        <div style={{ width: '1px', height: '20px', background: 'var(--border)' }} />
        {[5, 4, 3].map(r => (
          <button
            key={r}
            className={`tag ${filterRarity === r ? 'active' : ''}`}
            onClick={() => setFilterRarity(filterRarity === r ? null : r)}
            style={{
              fontSize: '12px', padding: '4px 10px',
              ...(filterRarity === r ? {
                borderColor: r === 5 ? 'rgba(255,210,0,0.5)' : r === 4 ? 'rgba(168,85,247,0.5)' : 'rgba(56,189,248,0.5)',
                color:       r === 5 ? 'var(--gold)'          : r === 4 ? '#A855F7'                : '#38BDF8',
                background:  r === 5 ? 'rgba(255,210,0,0.1)'  : r === 4 ? 'rgba(168,85,247,0.1)'  : 'rgba(56,189,248,0.1)',
              } : {}),
            }}
          >
            {'★'.repeat(r)}
          </button>
        ))}
        <div style={{ width: '1px', height: '20px', background: 'var(--border)' }} />
        {Object.entries(ELEMENTS).map(([key, el]) => (
          <button
            key={key}
            className={`tag ${filterEl === key ? 'active' : ''}`}
            onClick={() => setFilterEl(filterEl === key ? null : key)}
            style={{ fontSize: '12px', padding: '4px 10px' }}
          >
            {el.emoji} {el.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selectedEsper ? '1fr 380px' : '1fr', gap: '24px', alignItems: 'start' }}>

        {/* Grid d'Espers */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
          gap: '8px',
        }}>
          {filtered.map(esper => {
            const el = ELEMENTS[esper.element]
            const owned = ownedIds.has(esper.id)
            const entry = getEsper(esper.id)
            const tierColor = TIER_COLORS[esper.tier]
            const isSelected = selected === esper.id

            return (
              <div
                key={esper.id}
                onClick={() => setSelected(isSelected ? null : esper.id)}
                style={{
                  position: 'relative',
                  borderRadius: '12px',
                  border: isSelected ? `2px solid var(--pink)` : `1px solid ${owned ? el.color + '40' : 'rgba(255,255,255,0.06)'}`,
                  background: owned
                    ? `linear-gradient(160deg, ${el.color}18 0%, rgba(255,255,255,0.02) 100%)`
                    : 'rgba(255,255,255,0.02)',
                  padding: '12px 8px 10px',
                  cursor: 'pointer',
                  transition: 'all 160ms',
                  opacity: owned ? 1 : 0.45,
                  textAlign: 'center',
                  boxShadow: isSelected ? '0 0 16px rgba(255,45,135,0.25)' : 'none',
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.opacity = owned ? '1' : '0.45'; e.currentTarget.style.transform = 'none' }}
              >
                {/* Tier */}
                <div style={{ position: 'absolute', top: '5px', right: '6px', fontFamily: 'var(--font-display)', fontSize: '9px', fontWeight: 900, color: tierColor, textShadow: `0 0 8px ${tierColor}` }}>
                  {esper.tier}
                </div>

                {/* Owned check */}
                {owned && (
                  <div style={{ position: 'absolute', top: '5px', left: '6px', width: '14px', height: '14px', borderRadius: '50%', background: '#4ADE80', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '8px' }}>✓</div>
                )}

                {/* Avatar */}
                <div style={{
                  width: '48px', height: '48px', borderRadius: '12px', margin: '0 auto 8px',
                  background: `linear-gradient(135deg, ${el.color}40, ${el.color}15)`,
                  border: `2px solid ${el.color}50`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '22px',
                  boxShadow: owned ? `0 0 14px ${el.color}35` : 'none',
                  overflow: 'hidden',
                }}>
                  {esper.image ? (
                    <img
                      src={esper.image}
                      alt={esper.name}
                      loading="lazy" decoding="async" width="64" height="64"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
                      onError={e => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'flex' }}
                    />
                  ) : null}
                  <span style={{ display: esper.image ? 'none' : 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>{el.emoji}</span>
                </div>

                {/* Stars si possédé */}
                {owned && entry && (
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '1px', marginBottom: '4px' }}>
                    {Array.from({ length: entry.stars || 5 }).map((_, i) => (
                      <span key={i} style={{ fontSize: '7px', color: '#FFD200' }}>★</span>
                    ))}
                  </div>
                )}

                <div style={{ fontFamily: 'var(--font-ui)', fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {esper.name}
                </div>
              </div>
            )
          })}
        </div>

        {/* Panel détail */}
        {selectedEsper && (
          <div style={{ position: 'sticky', top: '80px' }}>
            <EsperBoxPanel
              esper={selectedEsper}
              entry={boxEntry}
              builds={esperBuilds}
              owned={ownedIds.has(selectedEsper.id)}
              onToggleOwned={() => {
                if (ownedIds.has(selectedEsper.id)) setNotOwned(selectedEsper.id)
                else upsertEsper(selectedEsper.id, { stars: 5, ascension: 0, resonance: 0, lvl: 1 })
              }}
              onUpdateEntry={(fields) => upsertEsper(selectedEsper.id, fields)}
              onNewBuild={() => { setEditingBuild({ esper_id: selectedEsper.id, build_name: 'Mon Build', set4: '', set2: '', ring_stat: '', helmet_stat: '', boots_stat: '', substats: [], notes: '' }); setBuildModal(true) }}
              onEditBuild={(b) => { setEditingBuild(b); setBuildModal(true) }}
              onDeleteBuild={deleteBuild}
              saving={saving}
            />
          </div>
        )}
      </div>

      {/* Modal Build */}
      {buildModal && editingBuild && (
        <BuildFormModal
          build={editingBuild}
          esper={selectedEsper}
          onSave={async (data) => {
            setSaving(true)
            await saveBuild(data)
            setSaving(false)
            setBuildModal(false)
            setEditingBuild(null)
          }}
          onClose={() => { setBuildModal(false); setEditingBuild(null) }}
          saving={saving}
        />
      )}
    </div>
  )
}

/* ── Panel détail Esper ────────────────────────── */
function EsperBoxPanel({ esper, entry, builds, owned, onToggleOwned, onUpdateEntry, onNewBuild, onEditBuild, onDeleteBuild, saving }) {
  const el = ELEMENTS[esper.element]
  const role = ROLES[esper.role]
  const tierColor = TIER_COLORS[esper.tier]

  return (
    <div className="card animate-fade" style={{ padding: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '20px', alignItems: 'flex-start' }}>
        <div style={{
          width: '64px', height: '64px', borderRadius: '16px', flexShrink: 0,
          background: `linear-gradient(135deg, ${el.color}40, ${el.color}15)`,
          border: `2px solid ${el.color}60`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px',
          boxShadow: `0 0 20px ${el.color}30`,
          overflow: 'hidden',
        }}>
          {esper.image ? (
            <img
              src={esper.image}
              alt={esper.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
              onError={e => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'flex' }}
            />
          ) : null}
          <span style={{ display: esper.image ? 'none' : 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>{el.emoji}</span>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', letterSpacing: '1px' }}>{esper.name}</h2>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '12px', color: tierColor, textShadow: `0 0 10px ${tierColor}` }}>{esper.tier}</span>
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>{esper.divinity}</div>
          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
            <span className={`badge badge-${esper.element}`} style={{ fontSize: '10px' }}>{el.emoji} {el.label}</span>
            <span className={`badge badge-${esper.role}`} style={{ fontSize: '10px' }}>{role?.icon} {role?.label}</span>
          </div>
        </div>
      </div>

      {/* Toggle owned */}
      <button
        onClick={onToggleOwned}
        disabled={saving}
        style={{
          width: '100%', padding: '12px', borderRadius: '10px', marginBottom: '20px',
          background: owned ? 'rgba(74,222,128,0.12)' : 'rgba(255,45,135,0.1)',
          border: `1px solid ${owned ? 'rgba(74,222,128,0.3)' : 'rgba(255,45,135,0.3)'}`,
          color: owned ? '#4ADE80' : 'var(--pink)',
          fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: '13px',
          cursor: 'pointer', transition: 'all 150ms',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
        }}
      >
        {owned ? '✅ Dans ma box' : '➕ Ajouter à ma box'}
      </button>

      {/* Stats si possédé */}
      {owned && entry && (
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '11px', fontFamily: 'var(--font-display)', color: 'var(--text-muted)', letterSpacing: '2px', marginBottom: '12px' }}>MES STATS</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <StatEditor label="⭐ Étoiles"   value={entry.stars     || 5} min={1} max={6}  step={1}  onChange={v => onUpdateEntry({ stars: v })} />
            <StatEditor label="🔺 Ascension" value={entry.ascension || 0} min={0} max={6}  step={1}  onChange={v => onUpdateEntry({ ascension: v })} />
            <StatEditor label="💠 Résonance" value={entry.resonance || 0} min={0} max={6}  step={1}  onChange={v => onUpdateEntry({ resonance: v })} />
            <StatEditor label="📊 Niveau"    value={entry.lvl      || 1} min={1} max={60} step={1}  onChange={v => onUpdateEntry({ lvl: v })} />
          </div>
        </div>
      )}

      <div className="divider" />

      {/* Builds */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div style={{ fontSize: '11px', fontFamily: 'var(--font-display)', color: 'var(--text-muted)', letterSpacing: '2px' }}>MES BUILDS</div>
          <button
            onClick={onNewBuild}
            style={{ background: 'rgba(255,45,135,0.1)', border: '1px solid rgba(255,45,135,0.25)', borderRadius: '8px', color: 'var(--pink)', fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: '12px', padding: '5px 12px', cursor: 'pointer' }}
          >+ Nouveau build</button>
        </div>

        {builds.length === 0 ? (
          <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', border: '1px dashed rgba(255,255,255,0.08)' }}>
            Aucun build sauvegardé
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {builds.map(b => (
              <BuildCard key={b.id} build={b} onEdit={() => onEditBuild(b)} onDelete={() => onDeleteBuild(b.id)} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Éditeur de stat +/- ────────────────────── */
function StatEditor({ label, value, min, max, step = 1, onChange }) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '10px', padding: '10px 12px' }}>
      <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '6px', fontFamily: 'var(--font-ui)', fontWeight: 600 }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          onClick={() => onChange(Math.max(min, value - step))}
          style={{ width: '26px', height: '26px', borderRadius: '6px', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border)', color: 'var(--text-secondary)', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >−</button>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '16px', color: 'var(--pink)' }}>{value}</span>
        <button
          onClick={() => onChange(Math.min(max, value + step))}
          style={{ width: '26px', height: '26px', borderRadius: '6px', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border)', color: 'var(--text-secondary)', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >+</button>
      </div>
    </div>
  )
}

/* ── Card build ──────────────────────────────── */
function BuildCard({ build, onEdit, onDelete }) {
  const set4 = RELIC_SETS.find(r => r.id === build.set4)
  const set2 = RELIC_SETS.find(r => r.id === build.set2)
  return (
    <div style={{ padding: '12px 14px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: '13px', color: 'var(--text-primary)', marginBottom: '3px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {build.build_name}
        </div>
        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
          {set4 ? `${set4.name} [4P]` : '—'} · {set2 ? `${set2.name} [2P]` : '—'}
        </div>
      </div>
      <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
        <button onClick={onEdit} style={{ padding: '5px 10px', borderRadius: '6px', background: 'rgba(255,210,0,0.08)', border: '1px solid rgba(255,210,0,0.2)', color: '#FFD200', fontSize: '11px', fontFamily: 'var(--font-ui)', fontWeight: 700, cursor: 'pointer' }}>Éditer</button>
        <button onClick={onDelete} style={{ padding: '5px 10px', borderRadius: '6px', background: 'rgba(255,80,80,0.08)', border: '1px solid rgba(255,80,80,0.2)', color: '#FF7070', fontSize: '11px', cursor: 'pointer' }}>✕</button>
      </div>
    </div>
  )
}

/* ── Modal création / édition de build ───────── */
function BuildFormModal({ build, esper, onSave, onClose, saving }) {
  const [form, setForm] = useState({ ...build })
  const set = f => setForm(prev => ({ ...prev, ...f }))

  const STAT_OPTIONS = ['ATQ%', 'PV%', 'DEF%', 'VIT', 'Taux Crit%', 'Dégâts Crit%', 'Précision%', 'Résistance%']

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9000, background: 'rgba(6,5,15,0.88)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={onClose}>
      <div style={{ background: '#0B0A1C', border: '1px solid rgba(255,45,135,0.25)', borderRadius: '20px', padding: '32px', width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', letterSpacing: '1.5px', background: 'linear-gradient(135deg,#FF2D87,#FFD200)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {build.id ? 'MODIFIER LE BUILD' : 'NOUVEAU BUILD'} — {esper?.name?.toUpperCase()}
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(237,233,255,0.4)', fontSize: '18px', cursor: 'pointer' }}>✕</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Nom */}
          <div>
            <label style={{ fontSize: '11px', fontFamily: 'var(--font-display)', color: 'var(--text-muted)', letterSpacing: '1.5px', display: 'block', marginBottom: '6px' }}>NOM DU BUILD</label>
            <input className="input" value={form.build_name} onChange={e => set({ build_name: e.target.value })} placeholder="Mon Build Kronos..." />
          </div>

          {/* Sets */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ fontSize: '11px', fontFamily: 'var(--font-display)', color: 'var(--text-muted)', letterSpacing: '1.5px', display: 'block', marginBottom: '6px' }}>SET 4 PIÈCES</label>
              <select className="input" value={form.set4 || ''} onChange={e => set({ set4: e.target.value })} style={{ padding: '10px 12px' }}>
                <option value="">— Choisir —</option>
                {RELIC_SETS.filter(r => r.type === '4piece').map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: '11px', fontFamily: 'var(--font-display)', color: 'var(--text-muted)', letterSpacing: '1.5px', display: 'block', marginBottom: '6px' }}>SET 2 PIÈCES</label>
              <select className="input" value={form.set2 || ''} onChange={e => set({ set2: e.target.value })} style={{ padding: '10px 12px' }}>
                <option value="">— Choisir —</option>
                {RELIC_SETS.filter(r => r.type === '2piece').map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
              </select>
            </div>
          </div>

          {/* Stats principales */}
          <div>
            <label style={{ fontSize: '11px', fontFamily: 'var(--font-display)', color: 'var(--text-muted)', letterSpacing: '1.5px', display: 'block', marginBottom: '8px' }}>STATS PRINCIPALES</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
              {[['ring_stat', '💍 Anneau'], ['helmet_stat', '⛑️ Casque'], ['boots_stat', '👟 Bottes']].map(([key, label]) => (
                <div key={key}>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '4px', fontFamily: 'var(--font-ui)' }}>{label}</div>
                  <select className="input" value={form[key] || ''} onChange={e => set({ [key]: e.target.value })} style={{ padding: '8px 10px', fontSize: '12px' }}>
                    <option value="">—</option>
                    {STAT_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label style={{ fontSize: '11px', fontFamily: 'var(--font-display)', color: 'var(--text-muted)', letterSpacing: '1.5px', display: 'block', marginBottom: '6px' }}>NOTES</label>
            <textarea
              className="input"
              rows={3}
              style={{ resize: 'vertical', fontFamily: 'var(--font-body)', lineHeight: 1.5 }}
              value={form.notes || ''}
              onChange={e => set({ notes: e.target.value })}
              placeholder="Priorités, contexte d'utilisation..."
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '24px' }}>
          <button onClick={onClose} className="btn btn-ghost" style={{ flex: 1 }}>Annuler</button>
          <button
            onClick={() => onSave(form)}
            disabled={saving}
            className="btn btn-primary"
            style={{ flex: 2, justifyContent: 'center' }}
          >
            {saving ? 'Sauvegarde...' : '💾 Sauvegarder'}
          </button>
        </div>
      </div>
    </div>
  )
}
