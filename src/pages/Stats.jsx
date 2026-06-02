import { useMemo } from 'react'
import { useEspers } from '../context/EspersContext.jsx'
import { ELEMENTS, ROLES, ROLE_GROUPS, TIERS } from '../data/espers.js'
import { ElementIcon } from '../components/EsperCard.jsx'

const TIER_COLORS = { SS: '#FF2D87', S: '#FFD200', A: '#38BDF8', B: '#4ADE80', C: '#aaa' }
const RARITY_COLORS = { 3: '#38BDF8', 4: '#A855F7', 5: '#FFD200' }

function Bar({ label, count, total, color, icon }) {
  const pct = total > 0 ? (count / total) * 100 : 0
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
      <div style={{ width: '90px', fontSize: '12px', color: 'var(--text-secondary)', fontFamily: 'var(--font-ui)', display: 'flex', alignItems: 'center', gap: '5px', flexShrink: 0 }}>
        {icon && <span>{icon}</span>}{label}
      </div>
      <div style={{ flex: 1, height: '8px', borderRadius: '4px', background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: '4px', transition: 'width 600ms ease' }} />
      </div>
      <div style={{ width: '50px', textAlign: 'right', fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-ui)' }}>
        {count} <span style={{ opacity: 0.5 }}>({Math.round(pct)}%)</span>
      </div>
    </div>
  )
}

function StatCard({ title, color, children }) {
  return (
    <div className="card" style={{ padding: '24px' }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '11px', color, letterSpacing: '2px', marginBottom: '18px' }}>
        {title}
      </div>
      {children}
    </div>
  )
}

export default function Stats() {
  const { espers, loading } = useEspers()

  const stats = useMemo(() => {
    if (!espers.length) return null
    const total = espers.length

    const byElement = Object.keys(ELEMENTS).map(k => ({
      key: k, el: ELEMENTS[k],
      count: espers.filter(e => e.element === k).length
    })).sort((a, b) => b.count - a.count)

    const byRole = Object.entries(ROLE_GROUPS).map(([k, g]) => ({
      key: k, label: g.label, icon: g.icon, color: g.color,
      count: espers.filter(e => g.roles.includes(e.role)).length
    })).sort((a, b) => b.count - a.count)

    const byTier = Object.keys(TIERS).map(t => ({
      tier: t, color: TIER_COLORS[t],
      count: espers.filter(e => e.tier === t).length
    }))

    const byRarity = [5, 4, 3].map(r => ({
      rarity: r, color: RARITY_COLORS[r],
      count: espers.filter(e => e.rarity === r).length
    }))

    // Meilleur tier par élément
    const ssByEl = Object.keys(ELEMENTS).map(k => ({
      el: ELEMENTS[k], key: k,
      ss: espers.filter(e => e.element === k && e.tier === 'SS').length,
      s:  espers.filter(e => e.element === k && e.tier === 'S').length,
    })).sort((a, b) => b.ss - a.ss)

    // Top synergies (les espers les plus cités comme synergie)
    const synCounts = {}
    espers.forEach(e => (e.synergies || []).forEach(id => { synCounts[id] = (synCounts[id] || 0) + 1 }))
    const topSyn = Object.entries(synCounts)
      .sort((a, b) => b[1] - a[1]).slice(0, 8)
      .map(([id, count]) => ({ esper: espers.find(e => e.id === id), count }))
      .filter(x => x.esper)

    return { total, byElement, byRole, byTier, byRarity, ssByEl, topSyn }
  }, [espers])

  if (loading || !stats) return <div style={{ padding: '80px', textAlign: 'center', color: 'var(--text-muted)' }}>Chargement…</div>

  return (
    <div className="page" style={{ paddingTop: '40px', paddingBottom: '60px' }}>

      <div className="section-header" style={{ marginBottom: '40px' }}>
        <div>
          <h1 className="section-title" style={{ color: '#38BDF8' }}>Statistiques</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>
            Répartition des {stats.total} espers documentés
          </p>
        </div>
        <div className="section-header-line" style={{ background: 'linear-gradient(90deg, rgba(56,189,248,0.3), transparent)' }} />
      </div>

      {/* Chiffres clés */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        {[
          { label: 'Espers', value: stats.total, color: '#38BDF8' },
          { label: 'Tier SS', value: stats.byTier.find(t => t.tier === 'SS')?.count || 0, color: '#FF2D87' },
          { label: 'Tier S',  value: stats.byTier.find(t => t.tier === 'S')?.count  || 0, color: '#FFD200' },
          { label: '5 étoiles', value: stats.byRarity.find(r => r.rarity === 5)?.count || 0, color: '#FFD200' },
          { label: 'Éléments', value: Object.keys(ELEMENTS).length, color: '#52ff8a' },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: 900, color: s.color, lineHeight: 1, marginBottom: '6px' }}>{s.value}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-ui)', letterSpacing: '1px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>

        {/* Par élément */}
        <StatCard title="⚗️ PAR ÉLÉMENT" color="#38BDF8">
          {stats.byElement.map(({ key, el, count }) => (
            <Bar key={key} label={el.label} count={count} total={stats.total} color={el.color} icon={<ElementIcon el={el} size={14} />} />
          ))}
        </StatCard>

        {/* Par rôle */}
        <StatCard title="⚔️ PAR RÔLE" color="#FF2D87">
          {stats.byRole.map(({ key, label, icon, color, count }) => (
            <Bar key={key} label={label} count={count} total={stats.total} color={color} icon={icon} />
          ))}
        </StatCard>

        {/* Par tier */}
        <StatCard title="🏆 PAR TIER" color="#FFD200">
          {stats.byTier.map(({ tier, color, count }) => (
            <Bar key={tier} label={`Tier ${tier}`} count={count} total={stats.total} color={color} />
          ))}
        </StatCard>

        {/* Par rareté */}
        <StatCard title="⭐ PAR RARETÉ" color="#A855F7">
          {stats.byRarity.map(({ rarity, color, count }) => (
            <Bar key={rarity} label={`${rarity} étoiles`} count={count} total={stats.total} color={color} icon={'★'.repeat(rarity)} />
          ))}
        </StatCard>

        {/* SS par élément */}
        <StatCard title="💎 ESPERS SS PAR ÉLÉMENT" color="#FF2D87">
          {stats.ssByEl.map(({ el, key, ss, s }) => (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <ElementIcon el={el} size={16} />
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)', width: '80px' }}>{el.label}</span>
              <span style={{ fontSize: '12px', fontFamily: 'var(--font-display)', fontWeight: 900, color: '#FF2D87', width: '30px' }}>{ss} SS</span>
              <span style={{ fontSize: '11px', color: '#FFD200', fontFamily: 'var(--font-display)', fontWeight: 700 }}>{s} S</span>
            </div>
          ))}
        </StatCard>

        {/* Top synergies */}
        <StatCard title="🔗 ESPERS LES PLUS SYNERGISÉS" color="#52ff8a">
          {stats.topSyn.map(({ esper, count }, i) => {
            const el = ELEMENTS[esper.element]
            return (
              <div key={esper.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', width: '16px', textAlign: 'right' }}>#{i+1}</span>
                <div style={{ width: '28px', height: '28px', borderRadius: '6px', overflow: 'hidden', flexShrink: 0, background: el ? `${el.color}20` : 'rgba(255,255,255,0.06)' }}>
                  {esper.image && <img src={esper.image} alt={esper.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                </div>
                <span style={{ flex: 1, fontSize: '12px', color: 'var(--text-secondary)' }}>{esper.name}</span>
                <span style={{ fontSize: '11px', color: '#52ff8a', fontWeight: 700 }}>{count} synergies</span>
              </div>
            )
          })}
        </StatCard>
      </div>
    </div>
  )
}
