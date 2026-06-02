import { useState, useEffect, useCallback } from 'react'
import { ELEMENTS, ROLES, ROLE_GROUPS, TIERS } from '../data/espers.js'
import { GAME_VERSION } from '../data/config.js'
import { useEspers } from '../context/EspersContext.jsx'
import { useBox } from '../hooks/useBox.js'
import { useAuth } from '../context/AuthContext.jsx'
import { ElementIcon } from '../components/EsperCard.jsx'
import { useEsperTooltip } from '../components/EsperTooltip.jsx'
import { supabase } from '../lib/supabase.js'

const MODES_FILTER = [
  { id: 'global', label: 'Global' },
  { id: 'kronos', label: '👹 Kronos' },
  { id: 'apep',   label: '🐍 Apep' },
  { id: 'fafnir', label: '🐉 Fafnir' },
  { id: 'pvp',    label: '⚔️ PvP' },
  { id: 'story',  label: '📖 Story' },
]

const TIER_DESC = {
  SS: 'Meta absolu — investis sans hésiter',
  S:  'Excellent — top-tier dans leur rôle',
  A:  'Très bon — viable en late game',
  B:  'Correct — bon early/mid game',
  C:  'Situationnel — niche ou remplacé',
}

const TIER_COLORS = {
  SS: '#FF2D87',
  S:  '#FFD200',
  A:  '#38BDF8',
  B:  '#4ADE80',
  C:  'rgba(232,232,240,0.5)',
}

function getTierForMode(esper, mode) {
  if (mode === 'global') return esper.tier
  return esper.modes?.[mode] || 'C'
}

export default function TierList({ onNavigate }) {
  const { espers: ESPERS, loading } = useEspers()
  const { user } = useAuth()
  const { box } = useBox()
  const [mode, setMode] = useState('global')
  const [filterRole, setFilterRole] = useState(null)
  const [filterEl, setFilterEl] = useState(null)
  const [filterRarity, setFilterRarity] = useState(null)
  const [onlyOwned, setOnlyOwned] = useState(false)
  const [activeVote, setActiveVote] = useState(null) // esper_id du popover ouvert
  // { [esper_id]: { SS:n, S:n, A:n, B:n, C:n } }
  const [voteSummary, setVoteSummary] = useState({})
  // { [esper_id]: 'S' } vote de l'utilisateur courant
  const [myVotes, setMyVotes] = useState({})
  const tooltip = useEsperTooltip()
  const ownedIds = new Set(box.filter(b => b.owned).map(b => b.esper_id))

  const fetchVotes = useCallback(async () => {
    const { data } = await supabase.from('tier_votes').select('esper_id, user_id, vote')
    if (!data) return
    const agg = {}
    const mine = {}
    data.forEach(v => {
      if (!agg[v.esper_id]) agg[v.esper_id] = { SS: 0, S: 0, A: 0, B: 0, C: 0 }
      agg[v.esper_id][v.vote] = (agg[v.esper_id][v.vote] || 0) + 1
      if (user && v.user_id === user.id) mine[v.esper_id] = v.vote
    })
    setVoteSummary(agg)
    setMyVotes(mine)
  }, [user])

  useEffect(() => { fetchVotes() }, [fetchVotes])

  const handleVote = async (esperId, tier) => {
    if (!user) return
    const current = myVotes[esperId]
    if (current === tier) {
      await supabase.from('tier_votes').delete().eq('esper_id', esperId).eq('user_id', user.id)
      setMyVotes(v => { const n = { ...v }; delete n[esperId]; return n })
      setVoteSummary(v => {
        const n = { ...v, [esperId]: { ...v[esperId] } }
        n[esperId][tier] = Math.max(0, (n[esperId]?.[tier] || 0) - 1)
        return n
      })
    } else {
      await supabase.from('tier_votes').upsert(
        { esper_id: esperId, user_id: user.id, vote: tier },
        { onConflict: 'esper_id,user_id' }
      )
      setMyVotes(v => ({ ...v, [esperId]: tier }))
      setVoteSummary(v => {
        const n = { ...v, [esperId]: { SS: 0, S: 0, A: 0, B: 0, C: 0, ...v[esperId] } }
        if (current) n[esperId][current] = Math.max(0, n[esperId][current] - 1)
        n[esperId][tier] = (n[esperId][tier] || 0) + 1
        return n
      })
    }
  }

  if (loading) return <div style={{ padding: '80px', textAlign: 'center', color: 'var(--text-muted)' }}>Chargement…</div>

  const filtered = ESPERS.filter(e => {
    if (onlyOwned && !ownedIds.has(e.id)) return false
    if (filterRole && !ROLE_GROUPS[filterRole]?.roles.includes(e.role)) return false
    if (filterEl && e.element !== filterEl) return false
    if (filterRarity && e.rarity !== filterRarity) return false
    return true
  })

  const grouped = Object.keys(TIERS).reduce((acc, tier) => {
    const espers = filtered.filter(e => getTierForMode(e, mode) === tier)
    if (espers.length > 0) acc[tier] = espers
    return acc
  }, {})

  return (
    <div className="page" style={{ paddingTop: '40px', paddingBottom: '60px' }}
      onClick={e => { if (!e.target.closest('[data-vote-popover]')) setActiveVote(null) }}
    >
      {tooltip.node}
      {/* Header */}
      <div className="section-header" style={{ marginBottom: '36px' }}>
        <div>
          <h1 className="section-title" style={{ color: 'var(--gold)' }}>Tier List</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>
            Classement des Espers par mode — {GAME_VERSION}
          </p>
        </div>
        <div className="section-header-line" style={{ background: 'linear-gradient(90deg, rgba(255,210,0,0.3), transparent)' }} />
      </div>

      {/* Mode filter */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ fontSize: '11px', fontFamily: 'var(--font-display)', color: 'var(--text-muted)', letterSpacing: '2px', marginBottom: '10px' }}>
          MODE DE JEU
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {MODES_FILTER.map(m => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              style={{
                padding: '8px 18px',
                borderRadius: '8px',
                border: mode === m.id ? '1px solid rgba(255,210,0,0.5)' : '1px solid var(--border)',
                background: mode === m.id ? 'rgba(255,210,0,0.1)' : 'var(--bg-card)',
                color: mode === m.id ? 'var(--gold)' : 'var(--text-secondary)',
                fontFamily: 'var(--font-ui)',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 150ms',
                letterSpacing: '0.5px',
              }}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Role/element filters */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '36px' }}>
        {Object.entries(ROLE_GROUPS).map(([key, group]) => (
          <button
            key={key}
            className={`tag ${filterRole === key ? 'active' : ''}`}
            onClick={() => setFilterRole(filterRole === key ? null : key)}
          >
            {group.icon} {group.label}
          </button>
        ))}
        <div style={{ width: '1px', background: 'var(--border)', margin: '0 4px' }} />
        {Object.entries(ELEMENTS).map(([key, el]) => (
          <button
            key={key}
            className={`tag ${filterEl === key ? 'active' : ''}`}
            onClick={() => setFilterEl(filterEl === key ? null : key)}
          >
            <ElementIcon el={el} size={14} /> {el.label}
          </button>
        ))}
        <div style={{ width: '1px', background: 'var(--border)', margin: '0 4px' }} />
        {[5, 4, 3].map(r => (
          <button
            key={r}
            className={`tag ${filterRarity === r ? 'active' : ''}`}
            onClick={() => setFilterRarity(filterRarity === r ? null : r)}
            style={filterRarity === r ? {
              borderColor: r === 5 ? 'rgba(255,210,0,0.5)' : r === 4 ? 'rgba(168,85,247,0.5)' : 'rgba(56,189,248,0.5)',
              color: r === 5 ? 'var(--gold)' : r === 4 ? '#A855F7' : '#38BDF8',
              background: r === 5 ? 'rgba(255,210,0,0.1)' : r === 4 ? 'rgba(168,85,247,0.1)' : 'rgba(56,189,248,0.1)',
            } : {}}
          >
            {'★'.repeat(r)}
          </button>
        ))}
        {user && (
          <>
            <div style={{ width: '1px', background: 'var(--border)', margin: '0 4px' }} />
            <button
              className={`tag ${onlyOwned ? 'active' : ''}`}
              onClick={() => setOnlyOwned(v => !v)}
              style={onlyOwned ? { borderColor: 'rgba(255,210,0,0.5)', color: 'var(--gold)', background: 'rgba(255,210,0,0.1)' } : {}}
            >
              📦 Ma Box {onlyOwned && `(${ownedIds.size})`}
            </button>
          </>
        )}
        {(filterRole || filterEl || filterRarity || onlyOwned) && (
          <button className="tag" onClick={() => { setFilterRole(null); setFilterEl(null); setFilterRarity(null); setOnlyOwned(false) }}>
            ✕ Réinitialiser
          </button>
        )}
      </div>

      {/* Tier rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {Object.keys(TIERS).map(tier => {
          const espers = grouped[tier]
          if (!espers) return null
          const color = TIER_COLORS[tier]

          return (
            <div key={tier} style={{
              display: 'grid',
              gridTemplateColumns: '72px 1fr',
              gap: '0',
              borderRadius: '14px',
              border: '1px solid var(--border)',
            }}>
              {/* Tier label */}
              <div style={{
                background: `${color}18`,
                borderRight: `2px solid ${color}40`,
                borderRadius: '13px 0 0 13px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px 8px',
                gap: '4px',
              }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '28px',
                  fontWeight: 900,
                  color,
                  textShadow: `0 0 20px ${color}`,
                  lineHeight: 1,
                }}>
                  {tier}
                </div>
                <div style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: 'var(--font-ui)', textAlign: 'center', letterSpacing: '0.5px' }}>
                  {TIER_DESC[tier]?.split(' — ')[0]}
                </div>
              </div>

              {/* Espers */}
              <div style={{
                background: `${color}06`,
                borderRadius: '0 13px 13px 0',
                padding: '12px 16px',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                alignContent: 'flex-start',
                minHeight: '72px',
                overflow: 'visible',
              }}>
                {espers
                  .sort((a, b) => {
                    const order = ['SS', 'S', 'A', 'B', 'C']
                    const tierA = order.indexOf(a.tier)
                    const tierB = order.indexOf(b.tier)
                    return tierA - tierB
                  })
                  .map(esper => (
                    <TierEsperChip
                      key={esper.id}
                      esper={esper}
                      tierColor={color}
                      mode={mode}
                      onMouseEnter={e => { if (activeVote !== esper.id) tooltip.show(esper, e) }}
                      onMouseLeave={e => { tooltip.hide(e) }}
                      onMouseMove={tooltip.move}
                      onNavigate={onNavigate}
                      votes={voteSummary[esper.id]}
                      myVote={myVotes[esper.id]}
                      voteOpen={activeVote === esper.id}
                      onToggleVote={() => { tooltip.hide(); setActiveVote(v => v === esper.id ? null : esper.id) }}
                      onVote={(tier) => handleVote(esper.id, tier)}
                      user={user}
                    />
                  ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div style={{ marginTop: '40px' }}>
        <div className="divider" />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '20px' }}>
          {Object.keys(TIERS).slice(0, -1).map(tier => (
            <div key={tier} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: `${TIER_COLORS[tier]}15`,
                border: `2px solid ${TIER_COLORS[tier]}40`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-display)',
                fontSize: '12px',
                fontWeight: 900,
                color: TIER_COLORS[tier],
              }}>
                {tier}
              </div>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{TIER_DESC[tier]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div style={{
        marginTop: '24px',
        padding: '16px 20px',
        borderRadius: '12px',
        background: 'rgba(255,45,135,0.04)',
        border: '1px solid rgba(255,45,135,0.12)',
        fontSize: '12px',
        color: 'var(--text-muted)',
        lineHeight: 1.6,
      }}>
        ℹ️ La tier list reflète l'état du meta au patch {GAME_VERSION}. Le classement peut évoluer avec chaque patch.
        Les Espers de tier B/C peuvent rester utiles en early/mid game ou dans des compositions spécifiques.
      </div>
    </div>
  )
}

const RARITY_COLORS = { 3: '#38BDF8', 4: '#A855F7', 5: '#FFD200' }
const MODE_COLORS = { SS: '#FF2D87', S: '#FFD200', A: '#38BDF8', B: '#4ADE80', C: '#aaa' }
const TIER_LABELS = ['SS', 'S', 'A', 'B', 'C']

function topVotedTier(votes) {
  if (!votes) return null
  const total = Object.values(votes).reduce((a, b) => a + b, 0)
  if (total === 0) return null
  return Object.entries(votes).sort((a, b) => b[1] - a[1])[0][0]
}

function TierEsperChip({ esper, tierColor, mode, onMouseEnter, onMouseLeave, onMouseMove, onNavigate, votes, myVote, voteOpen, onToggleVote, onVote, user }) {
  const el = ELEMENTS[esper.element]
  const modeRating = mode !== 'global' ? esper.modes?.[mode] : null
  const rarityColor = RARITY_COLORS[esper.rarity] || '#888'
  const totalVotes = votes ? Object.values(votes).reduce((a, b) => a + b, 0) : 0
  const communityTop = topVotedTier(votes)
  const disagrees = communityTop && communityTop !== esper.tier && totalVotes >= 3

  return (
    <div
      data-vote-popover={voteOpen ? 'true' : undefined}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
      onClick={e => { e.stopPropagation(); onToggleVote() }}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
        padding: '8px 6px',
        borderRadius: '10px',
        background: voteOpen ? `${el.color}20` : 'rgba(255,255,255,0.04)',
        border: `1px solid ${voteOpen ? el.color + '60' : rarityColor + '25'}`,
        cursor: 'pointer',
        transition: 'all 150ms',
        flexShrink: 0,
        width: '72px',
      }}
      onMouseOver={e => { if (!voteOpen) { e.currentTarget.style.background = `${el.color}15`; e.currentTarget.style.borderColor = `${el.color}50` } }}
      onMouseOut={e => { if (!voteOpen) { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = `${rarityColor}25` } }}
    >
      {/* Badge communauté (divergence) */}
      {disagrees && (
        <div title={`Communauté : ${communityTop} (${totalVotes} votes)`} style={{
          position: 'absolute', top: 3, left: 4,
          fontSize: '8px', fontFamily: 'var(--font-display)', fontWeight: 900,
          color: MODE_COLORS[communityTop],
          textShadow: `0 0 6px ${MODE_COLORS[communityTop]}`,
          lineHeight: 1,
        }}>
          👥{communityTop}
        </div>
      )}

      {/* Portrait */}
      <div style={{
        width: '52px', height: '52px', borderRadius: '10px', overflow: 'hidden',
        border: `2px solid ${rarityColor}60`, flexShrink: 0,
        background: 'rgba(0,0,0,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px',
      }}>
        {esper.image ? (
          <img src={esper.image} alt={esper.name} loading="lazy" decoding="async" width="52" height="52"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={e => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'flex' }}
          />
        ) : null}
        <span style={{ display: esper.image ? 'none' : 'flex' }}><ElementIcon el={el} size={24} /></span>
      </div>

      {/* Nom */}
      <div style={{
        fontFamily: 'var(--font-ui)', fontSize: '10px', fontWeight: 700,
        color: 'var(--text-primary)', textAlign: 'center', lineHeight: 1.2,
        wordBreak: 'break-word', width: '100%',
      }}>{esper.name}</div>

      {/* Rating mode */}
      {modeRating && mode !== 'global' && (
        <div style={{ fontSize: '9px', color: MODE_COLORS[modeRating], fontFamily: 'var(--font-display)', fontWeight: 700, lineHeight: 1 }}>
          {modeRating}
        </div>
      )}

      {/* Indicateur votes (si des votes existent) */}
      {totalVotes > 0 && !disagrees && (
        <div style={{ fontSize: '8px', color: 'var(--text-muted)', lineHeight: 1 }}>👥 {totalVotes}</div>
      )}

      {/* Popover de vote */}
      {voteOpen && (
        <div data-vote-popover="true" onClick={e => e.stopPropagation()} style={{
          position: 'absolute', bottom: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)',
          zIndex: 200, minWidth: '180px',
          background: '#0E0D24', border: '1px solid rgba(139,92,246,0.4)',
          borderRadius: '12px', padding: '12px', boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        }}>
          {/* Triangle */}
          <div style={{
            position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
            width: 0, height: 0,
            borderLeft: '6px solid transparent', borderRight: '6px solid transparent',
            borderTop: '6px solid rgba(139,92,246,0.4)',
          }} />

          <div style={{ fontFamily: 'var(--font-display)', fontSize: '10px', color: 'var(--purple)', letterSpacing: '1.5px', marginBottom: '8px' }}>
            AVIS COMMUNAUTÉ
          </div>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '10px' }}>
            Officiel : <span style={{ fontWeight: 900, color: MODE_COLORS[esper.tier] }}>{esper.tier}</span>
            {totalVotes > 0 && <span style={{ marginLeft: '8px' }}>· {totalVotes} vote{totalVotes > 1 ? 's' : ''}</span>}
          </div>

          {/* Distribution */}
          {totalVotes > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '10px' }}>
              {TIER_LABELS.map(t => {
                const count = votes?.[t] || 0
                const pct = totalVotes > 0 ? (count / totalVotes) * 100 : 0
                return (
                  <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '9px', fontWeight: 900, color: MODE_COLORS[t], width: '14px', textAlign: 'right' }}>{t}</span>
                    <div style={{ flex: 1, height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,0.07)', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${pct}%`, background: MODE_COLORS[t], borderRadius: '3px', transition: 'width 300ms' }} />
                    </div>
                    <span style={{ fontSize: '9px', color: 'var(--text-muted)', width: '16px' }}>{count}</span>
                  </div>
                )
              })}
            </div>
          )}

          {/* Boutons de vote */}
          {user ? (
            <>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '6px' }}>Ton vote :</div>
              <div style={{ display: 'flex', gap: '4px' }}>
                {TIER_LABELS.map(t => (
                  <button key={t} onClick={() => onVote(t)} style={{
                    flex: 1, padding: '5px 2px', borderRadius: '6px', border: 'none', cursor: 'pointer',
                    fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '11px',
                    background: myVote === t ? `${MODE_COLORS[t]}30` : 'rgba(255,255,255,0.06)',
                    color: myVote === t ? MODE_COLORS[t] : 'var(--text-muted)',
                    outline: myVote === t ? `1px solid ${MODE_COLORS[t]}60` : 'none',
                    transition: 'all 150ms',
                  }}>{t}</button>
                ))}
              </div>
              {myVote && <div style={{ fontSize: '9px', color: 'var(--text-muted)', marginTop: '6px', textAlign: 'center' }}>Reclique pour annuler ton vote</div>}
            </>
          ) : (
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontStyle: 'italic' }}>Connecte-toi pour voter</div>
          )}
        </div>
      )}
    </div>
  )
}
