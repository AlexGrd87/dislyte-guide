import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useEspers } from '../context/EspersContext.jsx'
import { supabase } from '../lib/supabase.js'
import { ELEMENTS } from '../data/espers.js'
import { ElementIcon } from '../components/EsperCard.jsx'

const TIER_COLORS = { SS: '#FF2D87', S: '#FFD200', A: '#38BDF8', B: '#4ADE80', C: '#aaa' }

export default function Profile({ onOpenAuth, onNavigate }) {
  const { user } = useAuth()
  const { espers } = useEspers()
  const [teams, setTeams]     = useState([])
  const [box, setBox]         = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) { setLoading(false); return }
    Promise.all([
      supabase.from('user_teams').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
      supabase.from('user_box').select('*').eq('user_id', user.id),
    ]).then(([{ data: t }, { data: b }]) => {
      setTeams(t || [])
      setBox(b || [])
      setLoading(false)
    })
  }, [user])

  if (!user) return (
    <div className="page" style={{ paddingTop: '80px', textAlign: 'center' }}>
      <div style={{ fontSize: '48px', marginBottom: '20px' }}>👤</div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', marginBottom: '12px' }}>Connecte-toi pour voir ton profil</h2>
      <button onClick={onOpenAuth} style={{
        padding: '12px 28px', borderRadius: '12px', cursor: 'pointer',
        background: 'linear-gradient(135deg, #FF2D87, #8B5CF6)', border: 'none',
        color: '#fff', fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: '14px',
      }}>🔑 Connexion Discord</button>
    </div>
  )

  const displayName  = user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || 'Joueur'
  const avatar       = user.user_metadata?.avatar_url
  const publicTeams  = teams.filter(t => t.is_public)
  const privateTeams = teams.filter(t => !t.is_public)
  const totalLikes   = teams.reduce((sum, t) => sum + (t.likes || 0), 0)

  // Stats box par tier
  const ownedIds = box.map(b => b.esper_id)
  const boxByTier = ['SS', 'S', 'A', 'B', 'C'].map(tier => ({
    tier,
    count: espers.filter(e => e.tier === tier && ownedIds.includes(e.id)).length,
    total: espers.filter(e => e.tier === tier).length,
  }))

  return (
    <div className="page" style={{ paddingTop: '40px', paddingBottom: '60px' }}>

      {/* Header profil */}
      <div className="card" style={{ padding: '32px', marginBottom: '28px', display: 'flex', gap: '24px', alignItems: 'center' }}>
        {avatar
          ? <img src={avatar} alt="" style={{ width: '80px', height: '80px', borderRadius: '50%', border: '3px solid rgba(255,45,135,0.4)', boxShadow: '0 0 24px rgba(255,45,135,0.3)' }} />
          : <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #FF2D87, #8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: 900, color: '#fff', flexShrink: 0 }}>
              {displayName[0]?.toUpperCase()}
            </div>
        }
        <div style={{ flex: 1 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', letterSpacing: '1px', marginBottom: '4px' }}>{displayName}</h1>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px' }}>Via Discord · Membre Dislyte Guide FR</div>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {[
              { label: 'Teams créées',  value: teams.length },
              { label: 'Teams publiques', value: publicTeams.length },
              { label: 'Likes reçus',   value: totalLikes },
              { label: 'Espers possédés', value: ownedIds.length || '—' },
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 900, color: 'var(--pink)' }}>{s.value}</div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.5px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '24px', alignItems: 'start' }}>
        <div>
          {/* Teams publiques */}
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '11px', color: 'var(--purple)', letterSpacing: '2px', marginBottom: '12px' }}>
            🌍 TEAMS PUBLIQUES ({publicTeams.length})
          </div>
          {publicTeams.length === 0 ? (
            <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px', marginBottom: '24px',
              background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--border)' }}>
              Aucune team publique — sauvegarde une team et coche "Partager à la communauté"
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
              {publicTeams.map(team => <TeamRow key={team.id} team={team} espers={espers} onNavigate={onNavigate} />)}
            </div>
          )}

          {/* Teams privées */}
          {privateTeams.length > 0 && (
            <>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '2px', marginBottom: '12px' }}>
                🔒 TEAMS PRIVÉES ({privateTeams.length})
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {privateTeams.map(team => <TeamRow key={team.id} team={team} espers={espers} onNavigate={onNavigate} />)}
              </div>
            </>
          )}
        </div>

        {/* Sidebar — Box stats */}
        <div style={{ position: 'sticky', top: '80px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="card" style={{ padding: '20px' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '11px', color: 'var(--gold)', letterSpacing: '2px', marginBottom: '16px' }}>
              📦 MA BOX
            </div>
            {ownedIds.length === 0 ? (
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Va dans <button onClick={() => onNavigate?.('mybox')} style={{ background: 'none', border: 'none', color: 'var(--pink)', cursor: 'pointer', fontWeight: 700, padding: 0 }}>Ma Box</button> pour enregistrer tes espers.
              </div>
            ) : (
              boxByTier.map(({ tier, count, total }) => (
                <div key={tier} style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, color: TIER_COLORS[tier], fontSize: '13px' }}>{tier}</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{count}/{total}</span>
                  </div>
                  <div style={{ height: '5px', borderRadius: '3px', background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${total > 0 ? (count/total)*100 : 0}%`, background: TIER_COLORS[tier], borderRadius: '3px', transition: 'width 500ms ease' }} />
                  </div>
                </div>
              ))
            )}
          </div>

          <button onClick={() => onNavigate?.('team')} style={{
            padding: '12px', borderRadius: '10px', cursor: 'pointer',
            background: 'linear-gradient(135deg, #FF2D87, #8B5CF6)', border: 'none',
            color: '#fff', fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: '13px',
          }}>👥 Créer une team</button>
        </div>
      </div>
    </div>
  )
}

function TeamRow({ team, espers, onNavigate }) {
  const ids = (team.esper_ids || []).filter(Boolean)
  const teamEspers = ids.map(id => espers.find(e => e.id === id)).filter(Boolean)
  return (
    <div style={{
      padding: '14px 18px', borderRadius: '12px',
      background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)',
      display: 'flex', alignItems: 'center', gap: '14px',
      transition: 'border-color 200ms', cursor: 'pointer',
    }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,45,135,0.3)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
      onClick={() => {
        const ids = teamEspers.map(e => e.id).join(',')
        onNavigate?.('team')
        setTimeout(() => { window.location.hash = `#team?t=${ids}&c=${team.captain_idx ?? 0}` }, 50)
      }}
    >
      <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
        {teamEspers.slice(0, 5).map((e, i) => {
          const el = ELEMENTS[e.element]
          return (
            <div key={i} title={e.name} style={{ width: '32px', height: '32px', borderRadius: '7px', overflow: 'hidden',
              background: `${el?.color}20`, border: `1px solid ${el?.color}40` }}>
              {e.image
                ? <img src={e.image} alt={e.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                : <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}><ElementIcon el={el} size={14} /></div>}
            </div>
          )
        })}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 700, fontSize: '13px', marginBottom: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{team.team_name || 'Équipe sans nom'}</div>
        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{team.mode && `🗺️ ${team.mode} · `}{teamEspers.map(e => e.name).join(' · ')}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
        {team.is_public && <span style={{ fontSize: '11px', color: 'var(--pink)' }}>❤️ {team.likes || 0}</span>}
        <span style={{ fontSize: '11px', color: team.is_public ? 'var(--purple)' : 'var(--text-muted)' }}>
          {team.is_public ? '🌍' : '🔒'}
        </span>
      </div>
    </div>
  )
}
