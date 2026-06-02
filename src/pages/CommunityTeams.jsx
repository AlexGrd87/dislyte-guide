import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase.js'
import { useAuth } from '../context/AuthContext.jsx'
import { useEspers } from '../context/EspersContext.jsx'
import { ELEMENTS } from '../data/espers.js'
import { ElementIcon } from '../components/EsperCard.jsx'

function TopContributors({ teams }) {
  const byUser = {}
  teams.forEach(t => {
    if (!t.user_name) return
    if (!byUser[t.user_name]) byUser[t.user_name] = { name: t.user_name, avatar: t.user_avatar, likes: 0, teams: 0 }
    byUser[t.user_name].likes += (t.likes || 0)
    byUser[t.user_name].teams += 1
  })
  const top = Object.values(byUser).sort((a, b) => b.likes - a.likes).slice(0, 5)
  if (top.length === 0) return null
  return (
    <div className="card" style={{ padding: '20px', marginBottom: '20px' }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '11px', color: 'var(--gold)', letterSpacing: '2px', marginBottom: '14px' }}>
        🏆 TOP CONTRIBUTEURS
      </div>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {top.map((u, i) => (
          <div key={u.name} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', borderRadius: '10px', background: i === 0 ? 'rgba(255,210,0,0.08)' : 'rgba(255,255,255,0.03)', border: `1px solid ${i === 0 ? 'rgba(255,210,0,0.3)' : 'var(--border)'}` }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, color: ['#FFD200','#aaa','#CD7F32'][i] || 'var(--text-muted)', fontSize: '14px' }}>{i + 1}</span>
            {u.avatar
              ? <img src={u.avatar} alt="" style={{ width: '26px', height: '26px', borderRadius: '50%' }} />
              : <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: 'linear-gradient(135deg,#FF2D87,#8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: '#fff', fontWeight: 700 }}>{u.name[0]?.toUpperCase()}</div>
            }
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700 }}>{u.name}</div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>❤️ {u.likes} · {u.teams} team{u.teams > 1 ? 's' : ''}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CommentSection({ teamId, onOpenAuth }) {
  const { user } = useAuth()
  const [comments, setComments] = useState([])
  const [open, setOpen]         = useState(false)
  const [text, setText]         = useState('')
  const [loading, setLoading]   = useState(false)
  const [sending, setSending]   = useState(false)

  const load = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('team_comments').select('*')
      .eq('team_id', teamId).order('created_at', { ascending: true })
    setComments(data || [])
    setLoading(false)
  }

  const toggle = () => { if (!open) load(); setOpen(v => !v) }

  const send = async () => {
    if (!user) { onOpenAuth?.(); return }
    if (!text.trim()) return
    setSending(true)
    const { data } = await supabase.from('team_comments').insert({
      team_id:     teamId,
      user_id:     user.id,
      user_name:   user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || 'Joueur',
      user_avatar: user.user_metadata?.avatar_url || null,
      content:     text.trim(),
    }).select().single()
    if (data) setComments(prev => [...prev, data])
    setText('')
    setSending(false)
  }

  const del = async (id) => {
    await supabase.from('team_comments').delete().eq('id', id)
    setComments(prev => prev.filter(c => c.id !== id))
  }

  return (
    <div style={{ marginTop: '10px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '8px' }}>
      <button onClick={toggle} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '12px', fontFamily: 'var(--font-ui)', display: 'flex', alignItems: 'center', gap: '4px' }}>
        💬 {open ? 'Masquer' : `Commentaires${comments.length ? ` (${comments.length})` : ''}`}
      </button>
      {open && (
        <div style={{ marginTop: '10px' }}>
          {loading ? <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Chargement…</div> : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '10px' }}>
              {comments.length === 0 && <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Aucun commentaire — sois le premier !</div>}
              {comments.map(c => (
                <div key={c.id} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  {c.user_avatar
                    ? <img src={c.user_avatar} alt="" style={{ width: '22px', height: '22px', borderRadius: '50%', flexShrink: 0 }} />
                    : <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'linear-gradient(135deg, #FF2D87, #8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#fff', flexShrink: 0 }}>{c.user_name?.[0]?.toUpperCase()}</div>
                  }
                  <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', borderRadius: '8px', padding: '6px 10px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--purple)', marginRight: '6px' }}>{c.user_name}</span>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{c.content}</span>
                  </div>
                  {user?.id === c.user_id && (
                    <button onClick={() => del(c.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,82,82,0.5)', fontSize: '11px', padding: '4px' }}>✕</button>
                  )}
                </div>
              ))}
            </div>
          )}
          <div style={{ display: 'flex', gap: '6px' }}>
            <input value={text} onChange={e => setText(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()}
              placeholder={user ? 'Ajouter un commentaire…' : 'Connecte-toi pour commenter'}
              maxLength={500} disabled={!user}
              style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-primary)', fontFamily: 'var(--font-ui)', fontSize: '12px', padding: '6px 10px', outline: 'none' }} />
            <button onClick={send} disabled={sending || !text.trim()} style={{ padding: '6px 12px', borderRadius: '8px', background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)', color: 'var(--purple)', cursor: 'pointer', fontSize: '12px', fontWeight: 700 }}>
              {sending ? '…' : 'Envoyer'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

const MODES_FILTER = [
  { id: 'all',    label: 'Toutes' },
  { id: 'Kronos', label: '👹 Kronos' },
  { id: 'Apep',   label: '🐍 Apep' },
  { id: 'Fafnir', label: '🐉 Fafnir' },
  { id: 'PvP',    label: '⚔️ PvP' },
  { id: 'Histoire', label: '📖 Histoire' },
]

const PAGE_SIZE = 20

export default function CommunityTeams({ onOpenAuth }) {
  const { espers } = useEspers()
  const { user }   = useAuth()
  const [teams, setTeams]     = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(false)
  const [offset, setOffset]   = useState(0)
  const [modeFilter, setModeFilter] = useState('all')
  const [search, setSearch]   = useState('')
  const [sortBy, setSortBy]   = useState('likes')

  const fetchTeams = async (from = 0, append = false) => {
    if (from === 0) setLoading(true); else setLoadingMore(true)
    let query = supabase
      .from('user_teams')
      .select('*')
      .eq('is_public', true)
      .range(from, from + PAGE_SIZE - 1)
    if (sortBy === 'recent') {
      query = query.order('created_at', { ascending: false })
    } else {
      query = query.order('likes', { ascending: false }).order('created_at', { ascending: false })
    }
    const { data } = await query
    const rows = data || []
    if (append) setTeams(prev => [...prev, ...rows]); else setTeams(rows)
    setOffset(from + PAGE_SIZE)
    setHasMore(rows.length === PAGE_SIZE)
    if (from === 0) setLoading(false); else setLoadingMore(false)
  }

  useEffect(() => { fetchTeams(0, false) }, [sortBy])

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

  const sortedTeams = [...teams].sort((a, b) =>
    sortBy === 'likes' ? (b.likes || 0) - (a.likes || 0) : new Date(b.created_at) - new Date(a.created_at)
  )

  const filtered = sortedTeams.filter(t => {
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
        <div style={{ display: 'flex', gap: '4px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border)' }}>
          {[{ id: 'likes', label: '❤️ Top' }, { id: 'recent', label: '🕐 Récent' }].map(s => (
            <button key={s.id} onClick={() => setSortBy(s.id)} style={{
              padding: '8px 12px', background: sortBy === s.id ? 'rgba(139,92,246,0.2)' : 'rgba(255,255,255,0.03)',
              border: 'none', color: sortBy === s.id ? 'var(--purple)' : 'var(--text-muted)',
              fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: '12px', cursor: 'pointer',
            }}>{s.label}</button>
          ))}
        </div>
        <button onClick={() => fetchTeams(0, false)} disabled={loading}
          style={{ padding: '8px 16px', borderRadius: '8px', flexShrink: 0,
            background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.3)',
            color: 'var(--purple)', fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: '12px', cursor: 'pointer' }}>
          🔄 Actualiser
        </button>
      </div>

      {/* Top contributeurs */}
      {teams.some(t => t.user_name) && (
        <TopContributors teams={teams} />
      )}

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
          {filtered.map((team) => {
            const ids = (team.esper_ids || []).filter(Boolean)
            const teamEspers = ids.map(id => espers.find(e => e.id === id)).filter(Boolean)
            return (
              <div key={team.id} style={{
                padding: '16px 20px', borderRadius: '14px',
                background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)',
                transition: 'border-color 200ms',
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(139,92,246,0.3)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
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
              <CommentSection teamId={team.id} onOpenAuth={onOpenAuth} />
              </div>
            )
          })}
        </div>
      )}

      {/* Charger plus */}
      {!loading && hasMore && (
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <button
            onClick={() => fetchTeams(offset, true)}
            disabled={loadingMore}
            style={{ padding: '10px 28px', borderRadius: '10px', background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.3)', color: 'var(--purple)', fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>
            {loadingMore ? 'Chargement…' : 'Charger plus'}
          </button>
        </div>
      )}
    </div>
  )
}
