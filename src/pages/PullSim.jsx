import { useState, useMemo } from 'react'

// Taux Dislyte : 5★ = 1.5% (soft pity à 75+, pity dur à 100)
const RATE_BASE  = 0.015
const SOFT_PITY  = 75
const PITY_HARD  = 100
const CRYSTALS_PER_PULL = 300
const GOLD_PER_PULL     = 30  // Records dorés (estimation)

function pullRate(pullNum) {
  if (pullNum >= PITY_HARD) return 1
  if (pullNum >= SOFT_PITY) return RATE_BASE + (pullNum - SOFT_PITY) * 0.06
  return RATE_BASE
}

function simulate(wantedRate = 1) {
  // Prob d'obtenir AU MOINS 1 copie sur N pulls (wantedRate = fraction du pool occupée par l'esper voulu)
  // Retourne un tableau [{pulls, prob}] de 1 à 200
  const results = []
  let pNoSuccess = 1 // prob de ne PAS avoir eu l'esper voulu
  let pity = 0
  for (let i = 1; i <= 200; i++) {
    const rate5 = pullRate(pity + 1)
    const rateWanted = rate5 * wantedRate
    pNoSuccess *= (1 - rateWanted)
    if ((pity + 1) >= PITY_HARD) pity = 0; else pity++
    results.push({ pulls: i, prob: Math.round((1 - pNoSuccess) * 100) })
  }
  return results
}

export default function PullSim() {
  const [pulls,    setPulls]    = useState(50)
  const [poolSize, setPoolSize] = useState(1) // nb d'espers featured dans le pool
  const [mode,     setMode]     = useState('standard') // standard | limited

  const wantedRate = mode === 'limited' ? 1 : 1 / poolSize
  const curve = useMemo(() => simulate(wantedRate), [wantedRate])

  const prob50  = curve.find(c => c.pulls >= 50)?.prob  || 0
  const prob100 = curve.find(c => c.pulls >= 100)?.prob || 0
  const expected = curve.find(c => c.prob >= 50)?.pulls || '?'
  const crystals = pulls * CRYSTALS_PER_PULL

  const currentProb = curve[pulls - 1]?.prob || 0
  const probColor = currentProb >= 80 ? '#4ADE80' : currentProb >= 50 ? '#FFD200' : '#FF2D87'

  return (
    <div className="page" style={{ paddingTop: '40px', paddingBottom: '60px' }}>

      <div className="section-header" style={{ marginBottom: '40px' }}>
        <div>
          <h1 className="section-title" style={{ color: '#38BDF8' }}>Simulateur de Pulls</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>
            Probabilités de drop basées sur les taux officiels Dislyte
          </p>
        </div>
        <div className="section-header-line" style={{ background: 'linear-gradient(90deg, rgba(56,189,248,0.3), transparent)' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '24px', alignItems: 'start' }}>

        {/* Config */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="card" style={{ padding: '20px' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '11px', color: '#38BDF8', letterSpacing: '2px', marginBottom: '16px' }}>
              CONFIGURATION
            </div>

            {/* Mode */}
            <label style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>Type de bannière</label>
            <div style={{ display: 'flex', gap: '6px', marginBottom: '16px' }}>
              {[
                { id: 'limited',  label: '⭐ Limitée (featured)' },
                { id: 'standard', label: '🎲 Standard' },
              ].map(m => (
                <button key={m.id} onClick={() => setMode(m.id)} style={{
                  flex: 1, padding: '8px 6px', borderRadius: '8px', cursor: 'pointer', fontSize: '11px',
                  fontFamily: 'var(--font-ui)', fontWeight: 600,
                  background: mode === m.id ? 'rgba(56,189,248,0.15)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${mode === m.id ? 'rgba(56,189,248,0.5)' : 'var(--border)'}`,
                  color: mode === m.id ? '#38BDF8' : 'var(--text-secondary)',
                }}>{m.label}</button>
              ))}
            </div>

            {/* Pool size (standard only) */}
            {mode === 'standard' && (
              <>
                <label style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                  Espers 5★ dans le pool : <strong style={{ color: 'var(--text-primary)' }}>{poolSize}</strong>
                </label>
                <input type="range" min="1" max="20" value={poolSize}
                  onChange={e => setPoolSize(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#38BDF8', marginBottom: '16px' }} />
              </>
            )}

            {/* Nombre de pulls */}
            <label style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              Pulls planifiés : <strong style={{ color: 'var(--text-primary)' }}>{pulls}</strong>
            </label>
            <input type="range" min="1" max="200" value={pulls}
              onChange={e => setPulls(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#38BDF8' }} />
          </div>

          {/* Info taux */}
          <div className="card" style={{ padding: '16px', background: 'rgba(56,189,248,0.04)', borderColor: 'rgba(56,189,248,0.2)' }}>
            <div style={{ fontSize: '11px', color: '#38BDF8', fontFamily: 'var(--font-display)', letterSpacing: '1px', marginBottom: '10px' }}>TAUX OFFICIELS</div>
            {[
              ['Taux de base 5★', '1,5%'],
              ['Soft pity (à partir de)', `pull ${SOFT_PITY}`],
              ['Pity garanti', `pull ${PITY_HARD}`],
              ['Coût par pull', `${CRYSTALS_PER_PULL} cristaux`],
            ].map(([label, val]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: '12px' }}>
                <span style={{ color: 'var(--text-muted)' }}>{label}</span>
                <span style={{ color: 'var(--text-secondary)', fontWeight: 700 }}>{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Résultats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Résultat principal */}
          <div className="card" style={{ padding: '28px', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-display)', letterSpacing: '2px', marginBottom: '12px' }}>
              PROBABILITÉ EN {pulls} PULLS
            </div>
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: '72px', fontWeight: 900,
              color: probColor, textShadow: `0 0 40px ${probColor}`,
              lineHeight: 1, marginBottom: '8px',
            }}>{currentProb}%</div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>
              d'obtenir l'esper voulu
            </div>
            <div style={{ height: '8px', borderRadius: '4px', background: 'rgba(255,255,255,0.06)', overflow: 'hidden', marginBottom: '8px' }}>
              <div style={{ height: '100%', width: `${currentProb}%`, background: `linear-gradient(90deg, ${probColor}, ${probColor}80)`, borderRadius: '4px', transition: 'width 400ms ease' }} />
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              = <strong style={{ color: '#38BDF8' }}>{crystals.toLocaleString()}</strong> cristaux
            </div>
          </div>

          {/* Stats clés */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            {[
              { label: 'Prob à 50 pulls',  value: `${prob50}%`,      color: '#FFD200' },
              { label: 'Prob à 100 pulls', value: `${prob100}%`,     color: '#4ADE80' },
              { label: 'Pulls attendus (50%)', value: `~${expected}`, color: '#38BDF8' },
            ].map(s => (
              <div key={s.label} className="card" style={{ padding: '16px', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 900, color: s.color, marginBottom: '4px' }}>{s.value}</div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', lineHeight: 1.3 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Courbe de probabilité */}
          <div className="card" style={{ padding: '20px' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '2px', marginBottom: '16px' }}>
              COURBE DE PROBABILITÉ (0–200 pulls)
            </div>
            <svg width="100%" viewBox="0 0 400 120" style={{ overflow: 'visible' }}>
              {/* Grille */}
              {[25,50,75,100].map(p => (
                <g key={p}>
                  <line x1="0" y1={120 - p*1.2} x2="400" y2={120 - p*1.2} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                  <text x="0" y={120 - p*1.2 - 2} fill="rgba(232,232,240,0.3)" fontSize="8" fontFamily="var(--font-ui)">{p}%</text>
                </g>
              ))}
              {/* Courbe */}
              <polyline
                points={curve.map(c => `${c.pulls * 2},${120 - c.prob * 1.2}`).join(' ')}
                fill="none" stroke="#38BDF8" strokeWidth="2"
              />
              {/* Marqueur pulls sélectionnés */}
              <line x1={pulls*2} y1="0" x2={pulls*2} y2="120" stroke={probColor} strokeWidth="1.5" strokeDasharray="4,2" />
              <circle cx={pulls*2} cy={120 - currentProb*1.2} r="4" fill={probColor} />
            </svg>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>
              <span>0</span><span>50</span><span>100</span><span>150</span><span>200 pulls</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
