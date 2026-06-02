import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase.js'
import { useAuth } from '../context/AuthContext.jsx'
import { useEspers } from '../context/EspersContext.jsx'
import { ELEMENTS } from '../data/espers.js'
import { ElementIcon } from '../components/EsperCard.jsx'

const MODES_FILTER = [
  { id: 'all',    label: 'Toutes' },
  { id: 'Kronos', label: '👹 Kronos' },
  { id: 'Apep',   label: '🐍 Apep' },
  { id: 'Fafnir', label: '🐉 Fafnir' },
  { id: 'PvP',    label: '⚔️ PvP' },
  { id: 'Histoire', label: '📖 Histoire' },
]

export default function CommunityTeams({ onOpenAuth }) {
  const { espers } = useEspers()
  const { user }   = useAuth()
  const [teams, setTeams]     = useState([])
  const [loading, setLoading] = useState(true)
  const [modeFilter, setModeFilter] = useState('all')
  const [search, setSearch]   = useState('')

  const fetchTeams = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('user_teams')
      .select('*')
      .eq('is_public', true)
      .order('likes', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(50)
    setTeams(data || [])
    setLoading(false)
  }

  useEffect(() => { fetchTeams() }, [])

  const handleLike = async (team) => {
    if (!user) { onOpenAuth?.(); return }
    const { error } = await supabase
      .from('user_teams')
      .update({ likes: (team.likes || 0) + 1 })
      .eq('id', team.id)
    if (!error) setTeams(prev => prev.map(t => t.id === team.id ? { ...t, likes: (t.likes || 0) + 1 } : t))
  }

  const handleShare = async (team) => {
    const ids = (team.esper_ids || []).filter(Boolean).join(',')
    const url = `${window.location.href.split('#')[0]}#team?t=${ids}&c=${team.captain_idx ?? 0}`
    await navigator.clipboard.writeText(url)
  }

  const filtered = teams.filter(t => {
    if (modeFilter !== 'all' && !(t.mode || '').toLowerCase().includes(modeFilter.toLowerCase())) return false
    if (search && !(t.team_name || '').toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div className="page" style={{ paddingTop: '40px', paddingBottom: '60px' }}>

      {/* Header */}
      <div className="section-header" style={{ marginBottom: '32px' }}>
        <div>
          <h1 className="section-title" style={{ color: '#8B5CF6' }}>Teams Communauté</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>
            Équipes partagées par les joueurs · {teams.length} équipes
          </p>
        </div>
        <div className="section-header-line" style={{ background: 'linear-gradient(90deg, rgba(139,92,246,0.3), transparent)' }} />
        <button onClick={fetchTeams} disabled={loading}
          style={{ padding: '8px 16px', borderRadius: '8px', flexShrink: 0,
            background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.3)',
            color: 'var(--purple)', fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: '12px', cursor: 'pointer' }}>
          🔄 Actualiser
        </button>
      </div>

      {/* Info partage */}
      <div style={{ padding: '14px 18px', borderRadius: '12px', marginBottom: '28px',
        background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.2)',
        fontSize: '13px', color: 'var(--text-secondary)' }}>
        💡 Pour partager une équipe, sauvegarde-la dans le <strong>Team Builder</strong> et coche "Partager à la communauté".
      </div>

      {/* Filtres */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
        <input className="input" placeholder="🔍 Rechercher une équipe..." value={search}
          onChange={e => setSearch(e.target.value)} style={{ flex: '1 1 200px', minWidth: '150px' }} />
        {MODES_FILTER.map(m => (
          <button key={m.id} className={`tag ${modeFilter === m.id ? 'active' : ''}`}
            onClick={() => setModeFilter(m.id)}>{m.label}</button>
        ))}
      </div>

      {/* Liste */}
      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[1,2,3].map(i => <div key={i} className="skeleton" style={{ height: '90px', borderRadius: '14px' }} />)}
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)', fontFamily: 'var(--font-ui)' }}>
          Aucune équipe partagée pour le moment.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filtered.map(team => {
            const ids = (team.esper_ids || []).filter(Boolean)
            const teamEspers = ids.map(id => espers.find(e => e.id === id)).filter(Boolean)
            return (
              <div key={team.id} style={{
                padding: '16px 20px', borderRadius: '14px',
                background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', gap: '16px',
                transition: 'border-color 200ms',
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(139,92,246,0.3)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                {/* Avatars */}
                <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
                  {teamEspers.slice(0, 5).map((esp, i) => {
                    const el = ELEMENTS[esp.element]
                    return (
                      <div key={i} title={esp.name} style={{
                        width: '36px', height: '36px', borderRadius: '8px', overflow: 'hidden',
                        background: el ? `${el.color}20` : 'rgba(255,255,255,0.06)',
                        border: `1px solid ${el ? el.color + '40' : 'rgba(255,255,255,0.1)'}`,
                        flexShrink: 0,
                      }}>
                        {esp.image
                          ? <img src={esp.image} alt={esp.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                          : <ElementIcon el={el} size={18} />
                        }
                      </div>
                    )
                  })}
                </div>

                {/* Infos */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: '14px', marginBottom: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {team.team_name || 'Équipe sans nom'}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    {team.mode && <span style={{ marginRight: '10px' }}>🗺️ {team.mode}</span>}
                    {teamEspers.map(e => e.name).join(' · ')}
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                  <button onClick={() => handleLike(team)}
                    style={{ padding: '6px 12px', borderRadius: '8px', background: 'rgba(255,45,135,0.06)', border: '1px solid rgba(255,45,135,0.2)', color: 'var(--pink)', fontSize: '12px', fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-ui)' }}>
                    ❤️ {team.likes || 0}
                  </button>
                  <button onClick={() => handleShare(team)}
                    title="Copier le lien"
                    style={{ padding: '6px 10px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: '12px', cursor: 'pointer' }}>
                    🔗
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
