import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { useEspers } from '../context/EspersContext.jsx'
import { RELIC_SETS } from '../data/relics.js'
import { ELEMENTS, ROLES } from '../data/espers.js'
import { ElementIcon } from './EsperCard.jsx'

const PAGES = [
  { id: 'home',     label: 'Accueil',       icon: '🏠', desc: 'Page principale' },
  { id: 'espers',   label: 'Espers',        icon: '🃏', desc: 'Base de données espers' },
  { id: 'tierlist', label: 'Tier List',     icon: '🏆', desc: 'Classement des espers' },
  { id: 'team',     label: 'Team Builder',  icon: '👥', desc: 'Construire une équipe' },
  { id: 'compare',     label: 'Comparer',       icon: '⚖️', desc: 'Comparer deux espers côte à côte' },
  { id: 'relics',     label: 'Relics',         icon: '⚙️', desc: 'Guide des sets de relics' },
  { id: 'modes',      label: 'Modes',          icon: '🗺️', desc: 'Guide des modes de jeu' },
  { id: 'codes',      label: 'Codes cadeaux',  icon: '🎁', desc: 'Codes actifs à utiliser' },
  { id: 'mybox',      label: 'Ma Box',         icon: '📦', desc: 'Ma collection d\'espers' },
  { id: 'progression',    label: 'F2P Guide',      icon: '📈', desc: 'Roadmap progression Free to Play' },
  { id: 'events',         label: 'Événements',     icon: '🎉', desc: 'Événements en cours' },
  { id: 'tierhistory',    label: 'Historique Meta', icon: '📜', desc: 'Évolution du méta par patch' },
  { id: 'communityteams', label: 'Communauté',      icon: '🌍', desc: 'Teams partagées par les joueurs' },
  { id: 'stats',          label: 'Statistiques',    icon: '📊', desc: 'Répartition des 190 espers' },
  { id: 'buildcalc',      label: 'Build Calc',      icon: '🧮', desc: 'Simulateur de stats relics' },
  { id: 'mytierlist',     label: 'Ma Tier List',    icon: '⭐', desc: 'Crée et partage ta tier list personnelle' },
  { id: 'bossguide',      label: 'Guide des Bosses', icon: '👹', desc: 'Équipes recommandées Kronos, Apep, Fafnir' },
  { id: 'profile',        label: 'Mon Profil',       icon: '👤', desc: 'Teams, box stats, likes reçus' },
  { id: 'pullsim',        label: 'Pull Sim',         icon: '🎲', desc: 'Probabilités de drop gacha' },
]

export default function Spotlight({ open, onClose, onNavigate }) {
  const { espers } = useEspers()
  const [query, setQuery] = useState('')
  const [cursor, setCursor] = useState(0)
  const inputRef = useRef(null)
  const listRef = useRef(null)

  // Reset à l'ouverture
  useEffect(() => {
    if (open) {
      setQuery('')
      setCursor(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  // Fermer avec Escape
  useEffect(() => {
    if (!open) return
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    const out = []

    // Pages
    PAGES.forEach(p => {
      if (p.label.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)) {
        out.push({ type: 'page', ...p })
      }
    })

    // Espers (max 6)
    espers
      .filter(e =>
        e.name.toLowerCase().includes(q) ||
        (e.divinity || '').toLowerCase().includes(q)
      )
      .slice(0, 6)
      .forEach(e => out.push({ type: 'esper', id: e.id, label: e.name, desc: e.divinity, element: e.element, role: e.role, tier: e.tier, image: e.image }))

    // Relics (max 4)
    RELIC_SETS
      .filter(r => r.name.toLowerCase().includes(q) || r.effect.toLowerCase().includes(q))
      .slice(0, 4)
      .forEach(r => out.push({ type: 'relic', id: r.id, label: r.name, desc: r.effect, color: r.color }))

    return out
  }, [query, espers])

  // Navigation clavier
  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); setCursor(c => Math.min(c + 1, results.length - 1)) }
      if (e.key === 'ArrowUp')   { e.preventDefault(); setCursor(c => Math.max(c - 1, 0)) }
      if (e.key === 'Enter' && results[cursor]) { select(results[cursor]) }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, cursor, results])

  // Scroll auto sur item actif
  useEffect(() => {
    const el = listRef.current?.children[cursor]
    el?.scrollIntoView({ block: 'nearest' })
  }, [cursor])

  const select = useCallback((item) => {
    if (item.type === 'page') {
      onNavigate(item.id)
    } else if (item.type === 'esper') {
      onNavigate('espers')
    } else if (item.type === 'relic') {
      onNavigate('relics')
    }
    onClose()
  }, [onNavigate, onClose])

  if (!open) return null

  const TIER_COLORS = { SS: '#FF2D87', S: '#FFD200', A: '#38BDF8', B: '#4ADE80', C: '#aaa' }

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 4000,
        background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(16px)',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        paddingTop: '15vh',
      }}
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div style={{
        width: '90vw', maxWidth: '600px',
        background: '#0B0A1C',
        border: '1px solid rgba(255,45,135,0.25)',
        borderRadius: '18px',
        boxShadow: '0 24px 80px rgba(0,0,0,0.7), 0 0 60px rgba(255,45,135,0.08)',
        overflow: 'hidden',
      }}>
        {/* Barre de recherche */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 20px', borderBottom: query && results.length ? '1px solid var(--border)' : 'none' }}>
          <span style={{ fontSize: '18px', opacity: 0.5 }}>🔍</span>
          <input
            ref={inputRef}
            value={query}
            onChange={e => { setQuery(e.target.value); setCursor(0) }}
            placeholder="Rechercher un esper, une page, une relic…"
            style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              color: 'var(--text-primary)', fontFamily: 'var(--font-ui)',
              fontSize: '16px', fontWeight: 500,
            }}
          />
          {query && (
            <button onClick={() => setQuery('')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '16px' }}>✕</button>
          )}
          <kbd style={{ padding: '2px 6px', borderRadius: '4px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-ui)' }}>Esc</kbd>
        </div>

        {/* Résultats */}
        {!query && (
          <div style={{ padding: '16px 20px 20px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ width: '100%', fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-ui)', letterSpacing: '1.5px', marginBottom: '4px' }}>PAGES RAPIDES</div>
            {PAGES.map(p => (
              <button key={p.id} onClick={() => { onNavigate(p.id); onClose() }}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', color: 'var(--text-secondary)', fontFamily: 'var(--font-ui)', fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: 'all 140ms' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,45,135,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,45,135,0.3)'; e.currentTarget.style.color = 'var(--pink)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
              >
                {p.icon} {p.label}
              </button>
            ))}
          </div>
        )}

        {query && results.length === 0 && (
          <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)', fontFamily: 'var(--font-ui)', fontSize: '14px' }}>
            Aucun résultat pour « {query} »
          </div>
        )}

        {query && results.length > 0 && (
          <div ref={listRef} style={{ maxHeight: '400px', overflowY: 'auto', padding: '8px' }}>
            {results.map((item, i) => {
              const active = cursor === i
              const el = item.element ? ELEMENTS[item.element] : null
              return (
                <div
                  key={`${item.type}-${item.id}`}
                  onClick={() => select(item)}
                  onMouseEnter={() => setCursor(i)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '10px 12px', borderRadius: '10px', cursor: 'pointer',
                    background: active ? 'rgba(255,45,135,0.1)' : 'transparent',
                    border: active ? '1px solid rgba(255,45,135,0.25)' : '1px solid transparent',
                    transition: 'all 100ms',
                  }}
                >
                  {/* Icône / Avatar */}
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '8px', flexShrink: 0,
                    background: item.type === 'relic' ? `${item.color}20` : el ? `${el.color}20` : 'rgba(255,255,255,0.06)',
                    border: `1px solid ${item.type === 'relic' ? item.color + '40' : el ? el.color + '40' : 'rgba(255,255,255,0.1)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: item.type === 'page' ? '18px' : '14px',
                    overflow: 'hidden',
                  }}>
                    {item.type === 'page' && item.icon}
                    {item.type === 'relic' && <span style={{ fontSize: '18px' }}>⚙️</span>}
                    {item.type === 'esper' && item.image && (
                      <img src={item.image} alt={item.label} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                        onError={e => { e.currentTarget.style.display = 'none' }} />
                    )}
                    {item.type === 'esper' && !item.image && el && <ElementIcon el={el} size={20} />}
                  </div>

                  {/* Texte */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: '14px', color: active ? 'var(--pink)' : 'var(--text-primary)' }}>
                        {item.label}
                      </span>
                      {item.type === 'esper' && (
                        <span style={{ fontSize: '11px', fontWeight: 900, fontFamily: 'var(--font-display)', color: TIER_COLORS[item.tier] }}>
                          {item.tier}
                        </span>
                      )}
                      {item.type === 'relic' && (
                        <span style={{ fontSize: '10px', padding: '1px 6px', borderRadius: '4px', background: `${item.color}20`, color: item.color, fontWeight: 700 }}>
                          Relic
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '1px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {item.desc}
                    </div>
                  </div>

                  {/* Type tag */}
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)', flexShrink: 0, fontFamily: 'var(--font-ui)' }}>
                    {item.type === 'page' ? 'Page' : item.type === 'esper' ? el ? <ElementIcon el={el} size={13} /> : '' : ''}
                  </span>
                  <span style={{ fontSize: '12px', color: active ? 'var(--pink)' : 'var(--text-muted)', flexShrink: 0 }}>↵</span>
                </div>
              )
            })}
          </div>
        )}

        {/* Footer */}
        <div style={{ padding: '10px 20px', borderTop: '1px solid var(--border)', display: 'flex', gap: '16px', fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-ui)' }}>
          <span>↑↓ naviguer</span>
          <span>↵ sélectionner</span>
          <span>Esc fermer</span>
        </div>
      </div>
    </div>
  )
}
