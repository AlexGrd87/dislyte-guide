import { useState, useMemo } from 'react'
import { useEspers } from '../context/EspersContext.jsx'
import { RELIC_SETS } from '../data/relics.js'
import { ELEMENTS, ROLES } from '../data/espers.js'
import { ElementIcon } from '../components/EsperCard.jsx'

const TIER_COLORS = { SS: '#FF2D87', S: '#FFD200', A: '#38BDF8', B: '#4ADE80', C: '#aaa' }

// Stats de base estimées par tier (moyennes génériques)
const BASE_STATS = {
  SS: { atq: 1400, def: 900, pv: 18000, vit: 95, tauxCrit: 15, degCrit: 50 },
  S:  { atq: 1250, def: 850, pv: 16000, vit: 90, tauxCrit: 15, degCrit: 50 },
  A:  { atq: 1100, def: 800, pv: 15000, vit: 90, tauxCrit: 15, degCrit: 50 },
  B:  { atq: 1000, def: 750, pv: 14000, vit: 85, tauxCrit: 15, degCrit: 50 },
  C:  { atq:  900, def: 700, pv: 13000, vit: 85, tauxCrit: 15, degCrit: 50 },
}

const SET_BONUSES = {
  war:       { atq: 30 },
  wind:      { vit: 25 },
  foudre:    { degCrit: 30 },
  panacee:   { soins: 30 },
  frost:     {},
  avatara:   {},
  recurve:   { tauxCrit: 12 },
  calamite:  {},
  sylvestre: { pv: 25 },
  soutien:   {},
  roche:     { def: 25 },
}

function StatBar({ label, value, max, color, unit = '' }) {
  const pct = Math.min((value / max) * 100, 100)
  return (
    <div style={{ marginBottom: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
        <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-ui)' }}>{label}</span>
        <span style={{ fontSize: '12px', fontWeight: 700, color, fontFamily: 'var(--font-ui)' }}>
          {Math.round(value).toLocaleString()}{unit}
        </span>
      </div>
      <div style={{ height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: '3px', transition: 'width 400ms ease' }} />
      </div>
    </div>
  )
}

export default function BuildCalc() {
  const { espers, loading } = useEspers()
  const [selectedId, setSelectedId] = useState('')
  const [search, setSearch] = useState('')
  const [set4, setSet4] = useState('war')
  const [set2, setSet2] = useState('recurve')
  // Stats relics personnalisées
  const [atqPct,    setAtqPct]    = useState(50)
  const [defPct,    setDefPct]    = useState(0)
  const [pvPct,     setPvPct]     = useState(0)
  const [vitBonus,  setVitBonus]  = useState(50)
  const [tauxBonus, setTauxBonus] = useState(30)
  const [degBonus,  setDegBonus]  = useState(50)

  const esper = espers.find(e => e.id === selectedId)
  const el = esper ? ELEMENTS[esper.element] : null

  const filteredEspers = useMemo(() =>
    espers.filter(e => !search || e.name.toLowerCase().includes(search.toLowerCase())).slice(0, 30)
  , [espers, search])

  const stats = useMemo(() => {
    if (!esper) return null
    const base = BASE_STATS[esper.tier] || BASE_STATS.A
    const s4bonus = SET_BONUSES[set4] || {}
    const s2bonus = SET_BONUSES[set2] || {}

    const atq = Math.round(base.atq * (1 + (atqPct + (s4bonus.atq || 0)) / 100))
    const def = Math.round(base.def * (1 + (defPct + (s4bonus.def || s2bonus.def || 0)) / 100))
    const pv  = Math.round(base.pv  * (1 + (pvPct  + (s4bonus.pv  || s2bonus.pv  || 0)) / 100))
    const vit = Math.round(base.vit + vitBonus + (s4bonus.vit || s2bonus.vit || 0))
    const tauxCrit = Math.min(base.tauxCrit + tauxBonus + (s2bonus.tauxCrit || 0), 100)
    const degCrit  = base.degCrit + degBonus + (s4bonus.degCrit || 0)

    const dps = Math.round(atq * (1 + (tauxCrit / 100) * (degCrit / 100)))

    return { atq, def, pv, vit, tauxCrit, degCrit, dps }
  }, [esper, set4, set2, atqPct, defPct, pvPct, vitBonus, tauxBonus, degBonus])

  const set4options = RELIC_SETS.filter(r => r.type === '4piece')
  const set2options = RELIC_SETS.filter(r => r.type === '2piece')

  return (
    <div className="page" style={{ paddingTop: '40px', paddingBottom: '60px' }}>

      <div className="section-header" style={{ marginBottom: '40px' }}>
        <div>
          <h1 className="section-title" style={{ color: '#A855F7' }}>Calculateur de Build</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>
            Simule les stats finales de tes espers selon tes relics
          </p>
        </div>
        <div className="section-header-line" style={{ background: 'linear-gradient(90deg, rgba(168,85,247,0.3), transparent)' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '24px', alignItems: 'start' }}>

        {/* Panneau gauche — sélection + config */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Sélection esper */}
          <div className="card" style={{ padding: '20px' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '11px', color: 'var(--purple)', letterSpacing: '2px', marginBottom: '12px' }}>
              CHOISIR UN ESPER
            </div>
            <input className="input" placeholder="🔍 Rechercher..." value={search}
              onChange={e => setSearch(e.target.value)} style={{ marginBottom: '10px' }} />
            <div style={{ maxHeight: '200px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {loading ? <div style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Chargement…</div>
                : filteredEspers.map(e => {
                const eel = ELEMENTS[e.element]
                return (
                  <button key={e.id} onClick={() => setSelectedId(e.id)}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '7px 10px', borderRadius: '8px', border: 'none',
                      background: selectedId === e.id ? 'rgba(168,85,247,0.15)' : 'transparent',
                      cursor: 'pointer', textAlign: 'left', transition: 'all 120ms',
                      outline: selectedId === e.id ? '1px solid rgba(168,85,247,0.4)' : 'none' }}>
                    {eel && <ElementIcon el={eel} size={14} />}
                    <span style={{ fontSize: '13px', fontWeight: selectedId === e.id ? 700 : 400, color: selectedId === e.id ? 'var(--purple)' : 'var(--text-secondary)' }}>{e.name}</span>
                    <span style={{ marginLeft: 'auto', fontSize: '10px', fontFamily: 'var(--font-display)', fontWeight: 900, color: TIER_COLORS[e.tier] }}>{e.tier}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Sets */}
          <div className="card" style={{ padding: '20px' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '11px', color: 'var(--pink)', letterSpacing: '2px', marginBottom: '12px' }}>
              SETS DE RELICS
            </div>
            <label style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Set 4 pièces</label>
            <select value={set4} onChange={e => setSet4(e.target.value)}
              style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-secondary)', padding: '8px 10px', fontSize: '13px', marginBottom: '12px', outline: 'none' }}>
              {set4options.map(s => <option key={s.id} value={s.id}>{s.name} — {s.effect}</option>)}
            </select>
            <label style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Set 2 pièces</label>
            <select value={set2} onChange={e => setSet2(e.target.value)}
              style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-secondary)', padding: '8px 10px', fontSize: '13px', outline: 'none' }}>
              {set2options.map(s => <option key={s.id} value={s.id}>{s.name} — {s.effect}</option>)}
            </select>
          </div>

          {/* Substats */}
          <div className="card" style={{ padding: '20px' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '11px', color: '#FFD200', letterSpacing: '2px', marginBottom: '12px' }}>
              SUBSTATS ESTIMÉES
            </div>
            {[
              { label: 'ATQ%', val: atqPct, set: setAtqPct, max: 120, color: '#FF5C5C' },
              { label: 'DEF%', val: defPct, set: setDefPct, max: 120, color: '#FCD34D' },
              { label: 'PV%',  val: pvPct,  set: setPvPct,  max: 120, color: '#4ADE80' },
              { label: 'VIT (bonus)', val: vitBonus,  set: setVitBonus,  max: 150, color: '#38BDF8' },
              { label: 'Taux Crit%', val: tauxBonus, set: setTauxBonus, max: 85,  color: '#F472B6' },
              { label: 'Dég Crit%', val: degBonus,  set: setDegBonus,  max: 200, color: '#FB923C' },
            ].map(({ label, val, set, max, color }) => (
              <div key={label} style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{label}</span>
                  <span style={{ fontSize: '11px', fontWeight: 700, color }}>{val}{label.includes('VIT') ? '' : '%'}</span>
                </div>
                <input type="range" min="0" max={max} value={val} onChange={e => set(Number(e.target.value))}
                  style={{ width: '100%', accentColor: color }} />
              </div>
            ))}
          </div>
        </div>

        {/* Panneau droit — résultats */}
        <div>
          {!esper ? (
            <div style={{ padding: '80px', textAlign: 'center', color: 'var(--text-muted)', fontFamily: 'var(--font-ui)' }}>
              Sélectionne un esper pour voir ses stats simulées
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Header esper */}
              <div className="card" style={{ padding: '20px', display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '14px', overflow: 'hidden', flexShrink: 0,
                  background: el ? `${el.color}20` : 'rgba(255,255,255,0.06)', border: `1px solid ${el ? el.color + '40' : 'rgba(255,255,255,0.1)'}` }}>
                  {esper.image && <img src={esper.image} alt={esper.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', letterSpacing: '1px' }}>{esper.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>{esper.divinity} · {ROLES[esper.role]?.label} · Tier <span style={{ color: TIER_COLORS[esper.tier], fontWeight: 900 }}>{esper.tier}</span></div>
                </div>
                <div style={{ marginLeft: 'auto', textAlign: 'center' }}>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '2px' }}>DPS ESTIMÉ</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 900, color: '#FF2D87' }}>
                    {stats?.dps?.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Stats */}
              {stats && (
                <div className="card" style={{ padding: '24px' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '11px', color: 'var(--purple)', letterSpacing: '2px', marginBottom: '20px' }}>
                    STATS SIMULÉES (base {esper.tier} + relics)
                  </div>
                  <StatBar label="ATQ"      value={stats.atq}      max={4000}  color="#FF5C5C" />
                  <StatBar label="DEF"      value={stats.def}      max={2000}  color="#FCD34D" />
                  <StatBar label="PV"       value={stats.pv}       max={50000} color="#4ADE80" />
                  <StatBar label="VIT"      value={stats.vit}      max={350}   color="#38BDF8" />
                  <StatBar label="Taux Crit" value={stats.tauxCrit} max={100}   color="#F472B6" unit="%" />
                  <StatBar label="Dég Crit"  value={stats.degCrit}  max={300}   color="#FB923C" unit="%" />
                </div>
              )}

              {/* Seuils recommandés */}
              <div className="card" style={{ padding: '20px', background: 'rgba(255,255,255,0.02)' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '11px', color: '#52ff8a', letterSpacing: '2px', marginBottom: '12px' }}>
                  SEUILS CIBLES
                </div>
                {[
                  { label: 'Taux de Crit', current: stats?.tauxCrit, target: 80, unit: '%', color: '#F472B6' },
                  { label: 'VIT (DPS)', current: stats?.vit, target: 180, unit: '', color: '#38BDF8' },
                  { label: 'VIT (Support)', current: stats?.vit, target: 220, unit: '', color: '#60A5FA' },
                  { label: 'ATQ (DPS)', current: stats?.atq, target: 3000, unit: '', color: '#FF5C5C' },
                ].map(({ label, current, target, unit, color }) => {
                  const ok = current >= target
                  return (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{label}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '12px', color, fontWeight: 700 }}>{Math.round(current)}{unit}</span>
                        <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>/ {target}{unit}</span>
                        <span>{ok ? '✅' : '❌'}</span>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div style={{ padding: '12px 16px', borderRadius: '10px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                ℹ️ Les stats de base sont des estimations génériques par tier. Le calculateur donne une approximation — les vraies stats varient selon l'esper.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
