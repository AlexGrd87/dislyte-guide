import { useState, useMemo } from 'react'
import { useEspers } from '../context/EspersContext.jsx'
import { useBox } from '../hooks/useBox.js'
import { useAuth } from '../context/AuthContext.jsx'
import { ELEMENTS } from '../data/espers.js'
import { ElementIcon } from '../components/EsperCard.jsx'

// Coût par niveau de résonance (R1 = base, R2..R6 = coûts incrémentaux)
const R_COSTS = [
  null,                       // index 0 non utilisé
  { dupes: 0, starimon: 0 },  // R1 (base, 0 coût)
  { dupes: 1, starimon: 3 },  // R1 → R2
  { dupes: 2, starimon: 6 },  // R2 → R3
  { dupes: 3, starimon: 9 },  // R3 → R4
  { dupes: 4, starimon: 12 }, // R4 → R5
  { dupes: 5, starimon: 15 }, // R5 → R6
]

// Pulls moyens par copie selon rarity
const AVG_PULLS = { 5: 65, 4: 20, 3: null }
const CRYSTALS_PER_PULL = 250

const TIER_COLORS = { SS: '#FF2D87', S: '#FFD200', A: '#38BDF8', B: '#4ADE80', C: '#aaa' }
const EL_COLORS   = { flow: '#3B9EFF', inferno: '#FF5C2B', wind: '#36D98A', umbra: '#A855F7', shimmer: '#FFD535' }

function calcCost(from, to) {
  if (from >= to) return { dupes: 0, starimon: 0 }
  let dupes = 0, starimon = 0
  for (let i = from + 1; i <= to; i++) {
    dupes    += R_COSTS[i].dupes
    starimon += R_COSTS[i].starimon
  }
  return { dupes, starimon }
}

export default function Resonance({ onNavigate }) {
  const { espers, loading } = useEspers()
  const { box } = useBox()
  const { user } = useAuth()

  const [search, setSearch]   = useState('')
  const [selected, setSelected] = useState(null)
  const [fromR, setFromR]     = useState(1)
  const [toR, setToR]         = useState(6)
  const [showSearch, setShowSearch] = useState(false)

  const ownedMap = useMemo(() => {
    const m = {}
    box.forEach(b => { m[b.esper_id] = b })
    return m
  }, [box])

  const suggestions = useMemo(() => {
    if (!search.trim()) return []
    return espers
      .filter(e => e.name.toLowerCase().includes(search.toLowerCase()))
      .slice(0, 8)
  }, [espers, search])

  const esper = selected ? espers.find(e => e.id === selected) : null
  const el    = esper ? ELEMENTS[esper.element] : null
  const boxEntry = esper ? ownedMap[esper.id] : null

  // Pré-remplir depuis la box si dispo
  const currentBoxR = boxEntry?.resonance || 1

  const cost = esper ? calcCost(fromR, toR) : null
  const avgPulls = esper ? AVG_PULLS[esper.rarity] : null
  const totalPulls = cost && avgPulls ? cost.dupes * avgPulls : null
  const totalCrystals = totalPulls ? totalPulls * CRYSTALS_PER_PULL : null

  const selectEsper = (e) => {
    setSelected(e.id)
    setSearch('')
    setShowSearch(false)
    // Pré-remplir depuis la box
    const entry = ownedMap[e.id]
    setFromR(entry?.resonance || 1)
    setToR(6)
  }

  return (
    <div className="page" style={{ paddingTop: '40px', paddingBottom: '60px', maxWidth: '700px' }}>

      {/* Header */}
      <div className="section-header" style={{ marginBottom: '36px' }}>
        <div>
          <h1 className="section-title" style={{ color: 'var(--purple)' }}>Calculateur de Résonance</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>
            Combien de doublons faut-il pour monter un esper en résonance ?
          </p>
        </div>
        <div className="section-header-line" style={{ background: 'linear-gradient(90deg, rgba(139,92,246,0.3), transparent)' }} />
      </div>

      {/* Sélecteur d'esper */}
      <div className="card" style={{ padding: '24px', marginBottom: '24px' }}>
        <div style={{ fontSize: '11px', fontFamily: 'var(--font-display)', color: 'var(--purple)', letterSpacing: '2px', marginBottom: '14px' }}>
          1. CHOISIR UN ESPER
        </div>

        {/* Résultat sélectionné */}
        {esper ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 16px', borderRadius: '12px', background: `${el.color}12`, border: `1px solid ${el.color}40`, marginBottom: '12px' }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '12px', overflow: 'hidden', border: `2px solid ${el.color}60`, flexShrink: 0 }}>
              {esper.image
                ? <img src={esper.image} alt={esper.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${el.color}20` }}><ElementIcon el={el} size={24} /></div>
              }
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', letterSpacing: '0.5px', marginBottom: '4px' }}>{esper.name}</div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{el.emoji} {el.label}</span>
                <span style={{ fontSize: '12px', color: TIER_COLORS[esper.tier], fontFamily: 'var(--font-display)', fontWeight: 900 }}>Tier {esper.tier}</span>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{'★'.repeat(esper.rarity)}</span>
              </div>
              {boxEntry && (
                <div style={{ fontSize: '11px', color: '#52ff8a', marginTop: '4px' }}>
                  ✅ Dans ta box — Résonance actuelle : R{boxEntry.resonance || 1}
                </div>
              )}
            </div>
            <button onClick={() => { setSelected(null); setSearch('') }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '16px', padding: '4px' }}>✕</button>
          </div>
        ) : null}

        {/* Barre de recherche */}
        <div style={{ position: 'relative' }}>
          <input
            className="input"
            placeholder="🔍 Rechercher un esper..."
            value={search}
            onChange={e => { setSearch(e.target.value); setShowSearch(true) }}
            onFocus={() => setShowSearch(true)}
            autoComplete="off"
          />
          {showSearch && suggestions.length > 0 && (
            <div style={{
              position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0,
              background: '#0E0D24', border: '1px solid rgba(139,92,246,0.35)',
              borderRadius: '10px', zIndex: 50, overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            }}>
              {suggestions.map(e => {
                const sel = ELEMENTS[e.element]
                const owned = !!ownedMap[e.id]
                return (
                  <div
                    key={e.id}
                    onClick={() => selectEsper(e)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '10px',
                      padding: '10px 14px', cursor: 'pointer', transition: 'background 120ms',
                      borderBottom: '1px solid rgba(255,255,255,0.04)',
                    }}
                    onMouseEnter={ev => ev.currentTarget.style.background = 'rgba(139,92,246,0.1)'}
                    onMouseLeave={ev => ev.currentTarget.style.background = 'transparent'}
                  >
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, background: `${sel.color}20`, border: `1px solid ${sel.color}40` }}>
                      {e.image ? <img src={e.image} alt={e.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} /> : <ElementIcon el={sel} size={14} />}
                    </div>
                    <div>
                      <span style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: '13px' }}>{e.name}</span>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginLeft: '8px' }}>{'★'.repeat(e.rarity)}</span>
                    </div>
                    {owned && <span style={{ marginLeft: 'auto', fontSize: '11px', color: '#52ff8a' }}>✅ Possédé</span>}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Sliders de résonance */}
      {esper && (
        <>
          <div className="card" style={{ padding: '24px', marginBottom: '24px' }}>
            <div style={{ fontSize: '11px', fontFamily: 'var(--font-display)', color: 'var(--purple)', letterSpacing: '2px', marginBottom: '20px' }}>
              2. RÉSONANCE ACTUELLE → CIBLE
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
              {/* De */}
              <div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '10px' }}>De (actuel)</div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {[1,2,3,4,5].map(r => (
                    <button
                      key={r}
                      onClick={() => { setFromR(r); if (toR <= r) setToR(r + 1) }}
                      style={{
                        flex: 1, padding: '8px 4px', borderRadius: '8px', border: 'none',
                        cursor: 'pointer', fontFamily: 'var(--font-display)', fontWeight: 900,
                        fontSize: '13px', transition: 'all 150ms',
                        background: fromR === r ? 'rgba(139,92,246,0.25)' : 'rgba(255,255,255,0.05)',
                        color: fromR === r ? 'var(--purple)' : 'var(--text-muted)',
                        outline: fromR === r ? '1px solid rgba(139,92,246,0.5)' : 'none',
                      }}
                    >R{r}</button>
                  ))}
                </div>
              </div>

              {/* Vers */}
              <div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '10px' }}>Vers (cible)</div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {[2,3,4,5,6].map(r => (
                    <button
                      key={r}
                      onClick={() => setToR(r)}
                      disabled={r <= fromR}
                      style={{
                        flex: 1, padding: '8px 4px', borderRadius: '8px', border: 'none',
                        cursor: r <= fromR ? 'default' : 'pointer',
                        fontFamily: 'var(--font-display)', fontWeight: 900,
                        fontSize: '13px', transition: 'all 150ms',
                        background: toR === r ? 'rgba(255,45,135,0.2)' : 'rgba(255,255,255,0.05)',
                        color: toR === r ? 'var(--pink)' : r <= fromR ? 'rgba(255,255,255,0.12)' : 'var(--text-muted)',
                        outline: toR === r ? '1px solid rgba(255,45,135,0.4)' : 'none',
                        opacity: r <= fromR ? 0.3 : 1,
                      }}
                    >R{r}</button>
                  ))}
                </div>
              </div>
            </div>

            {/* Visualisation pas par pas */}
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-display)', letterSpacing: '1px', marginBottom: '12px' }}>DÉTAIL PAR ÉTAPE</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0', overflowX: 'auto', paddingBottom: '4px' }}>
                {[1,2,3,4,5,6].map((r, i) => {
                  const inRange = r >= fromR && r <= toR
                  const stepCost = r > 1 ? R_COSTS[r] : null
                  const isFrom = r === fromR
                  const isTo   = r === toR
                  const color  = inRange ? (isTo ? '#FF2D87' : isFrom ? '#8B5CF6' : 'rgba(139,92,246,0.6)') : 'rgba(255,255,255,0.15)'
                  return (
                    <div key={r} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                      {/* Noeud */}
                      <div style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', minWidth: '52px',
                      }}>
                        <div style={{
                          width: '36px', height: '36px', borderRadius: '50%',
                          background: inRange ? (isTo ? 'rgba(255,45,135,0.2)' : 'rgba(139,92,246,0.15)') : 'rgba(255,255,255,0.04)',
                          border: `2px solid ${color}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '12px',
                          color: color, transition: 'all 200ms',
                        }}>R{r}</div>
                        {stepCost && r > fromR && r <= toR && (
                          <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', textAlign: 'center', lineHeight: 1.3 }}>
                            {stepCost.dupes} dupe{stepCost.dupes > 1 ? 's' : ''}
                          </div>
                        )}
                      </div>
                      {/* Connecteur */}
                      {r < 6 && (
                        <div style={{
                          width: '24px', height: '2px',
                          background: r >= fromR && r < toR ? 'linear-gradient(90deg, #8B5CF6, #FF2D87)' : 'rgba(255,255,255,0.08)',
                          transition: 'all 200ms', flexShrink: 0,
                        }} />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Résultats */}
          <div className="card" style={{ padding: '24px' }}>
            <div style={{ fontSize: '11px', fontFamily: 'var(--font-display)', color: 'var(--pink)', letterSpacing: '2px', marginBottom: '20px' }}>
              3. RÉSULTATS — R{fromR} → R{toR}
            </div>

            {fromR === toR ? (
              <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '20px', fontSize: '13px' }}>
                Sélectionne une cible supérieure à la résonance actuelle.
              </div>
            ) : (
              <>
                {/* Stats principales */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '12px', marginBottom: '24px' }}>
                  <StatBox
                    icon="🧬"
                    label="Doublons nécessaires"
                    value={cost.dupes}
                    unit={`dupe${cost.dupes > 1 ? 's' : ''}`}
                    color="#A855F7"
                  />
                  <StatBox
                    icon="⭐"
                    label="Starimon équivalent"
                    value={cost.starimon}
                    unit="Starimon"
                    color="#FFD200"
                  />
                  {totalPulls && (
                    <StatBox
                      icon="🎲"
                      label="Pulls estimés"
                      value={`~${totalPulls}`}
                      unit="pulls"
                      color="#38BDF8"
                      sub={`(${esper.rarity}★ · ~${AVG_PULLS[esper.rarity]} pulls/dupe)`}
                    />
                  )}
                  {totalCrystals && (
                    <StatBox
                      icon="💎"
                      label="Cristaux estimés"
                      value={`~${totalCrystals.toLocaleString('fr-FR')}`}
                      unit="cristaux"
                      color="#52ff8a"
                      sub={`(${CRYSTALS_PER_PULL} par pull)`}
                    />
                  )}
                </div>

                {/* Tableau détaillé par étape */}
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-display)', letterSpacing: '1px', marginBottom: '10px' }}>
                  COÛT CUMULÉ DEPUIS R{fromR}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {Array.from({ length: toR - fromR }, (_, i) => {
                    const step     = fromR + i + 1
                    const cumul    = calcCost(fromR, step)
                    const stepCost = R_COSTS[step]
                    return (
                      <div key={step} style={{
                        display: 'flex', alignItems: 'center', gap: '12px',
                        padding: '10px 14px', borderRadius: '10px',
                        background: step === toR ? 'rgba(255,45,135,0.07)' : 'rgba(255,255,255,0.02)',
                        border: `1px solid ${step === toR ? 'rgba(255,45,135,0.25)' : 'rgba(255,255,255,0.05)'}`,
                      }}>
                        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '13px', color: step === toR ? 'var(--pink)' : 'var(--purple)', minWidth: '80px' }}>
                          R{step - 1} → R{step}
                        </span>
                        <span style={{ fontSize: '12px', color: 'var(--text-secondary)', flex: 1 }}>
                          +{stepCost.dupes} dupe{stepCost.dupes > 1 ? 's' : ''} · +{stepCost.starimon} Starimon
                        </span>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)', textAlign: 'right' }}>
                          Cumulé : <strong style={{ color: 'var(--text-primary)' }}>{cumul.dupes} dupes / {cumul.starimon} Starimon</strong>
                        </span>
                      </div>
                    )
                  })}
                </div>

                {/* Conseil rarity */}
                <div style={{ marginTop: '20px', padding: '14px 18px', borderRadius: '10px', background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.2)' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '10px', color: 'var(--purple)', letterSpacing: '2px', marginBottom: '6px' }}>💡 CONSEIL</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {esper.rarity === 5 && '⚠️ Esper 5★ : les doublons sont rares (bannière dédiée). Préfère les Starimon si tu en as assez. Utilise les doublons uniquement si l\'esper n\'est plus en rotation.'}
                    {esper.rarity === 4 && '✅ Esper 4★ : doublons plus accessibles via les bannières standard. La montée est raisonnable.'}
                    {esper.rarity === 3 && '✅ Esper 3★ : farmable via les événements et la Tour. Prio les ressources sur tes 5★ d\'abord.'}
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}

      {/* État initial — pas d'esper sélectionné */}
      {!esper && !loading && (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🧬</div>
          <div style={{ fontSize: '14px', lineHeight: 1.7 }}>
            Recherche un esper pour calculer<br />le coût de montée en résonance.
          </div>
          {user && box.length > 0 && (
            <div style={{ marginTop: '16px', fontSize: '12px', color: 'rgba(139,92,246,0.7)' }}>
              Astuce : les espers de ta box ont leur résonance pré-remplie automatiquement.
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function StatBox({ icon, label, value, unit, color, sub }) {
  return (
    <div style={{
      padding: '16px', borderRadius: '12px',
      background: `${color}0F`,
      border: `1px solid ${color}30`,
      display: 'flex', flexDirection: 'column', gap: '6px',
    }}>
      <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-ui)' }}>
        {icon} {label}
      </div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 900, color, lineHeight: 1 }}>
        {value}
      </div>
      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{unit}</div>
      {sub && <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)', lineHeight: 1.4 }}>{sub}</div>}
    </div>
  )
}
