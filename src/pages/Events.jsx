import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase.js'
import { GAME_VERSION } from '../data/config.js'

const TYPE_CONFIG = {
  event:     { label: 'Événement',  icon: '🎉', color: '#FF2D87' },
  banner:    { label: 'Bannière',   icon: '🎯', color: '#FFD200' },
  challenge: { label: 'Défi',       icon: '⚔️', color: '#38BDF8' },
  login:     { label: 'Connexion',  icon: '🎁', color: '#52ff8a' },
}

export default function Events() {
  const [events, setEvents]     = useState([])
  const [loading, setLoading]   = useState(true)
  const [lastCheck, setLastCheck] = useState(null)
  const [tab, setTab]           = useState('active') // 'active' | 'past'

  const fetchEvents = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('events')
      .select('*')
      .order('end_date', { ascending: true })
    setEvents(data || [])
    setLastCheck(new Date())
    setLoading(false)
  }

  useEffect(() => { fetchEvents() }, [])

  const now = new Date()
  const active = events.filter(e => e.is_active && (!e.end_date || new Date(e.end_date) > now))
  const past   = events.filter(e => !e.is_active || (e.end_date && new Date(e.end_date) <= now))

  const daysLeft = (end_date) => {
    if (!end_date) return null
    const diff = Math.ceil((new Date(end_date) - now) / (1000 * 60 * 60 * 24))
    return diff
  }

  const formatDate = (d) => d ? new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' }) : null

  const displayed = tab === 'active' ? active : past

  return (
    <div className="page" style={{ paddingTop: '40px', paddingBottom: '60px' }}>

      {/* Header */}
      <div className="section-header" style={{ marginBottom: '32px' }}>
        <div>
          <h1 className="section-title" style={{ color: '#FF2D87' }}>Événements</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>
            Événements en cours · {GAME_VERSION}
          </p>
        </div>
        <div className="section-header-line" />
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
          {lastCheck && (
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-ui)' }}>
              {lastCheck.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
          <button
            onClick={fetchEvents}
            disabled={loading}
            style={{
              padding: '8px 16px', borderRadius: '8px',
              background: 'rgba(255,45,135,0.08)', border: '1px solid rgba(255,45,135,0.25)',
              color: 'var(--pink)', fontFamily: 'var(--font-ui)', fontWeight: 700,
              fontSize: '12px', cursor: loading ? 'default' : 'pointer', opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? '⏳' : '🔄'} Actualiser
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0', marginBottom: '28px', borderBottom: '1px solid var(--border)' }}>
        {[
          { id: 'active', label: `En cours (${active.length})` },
          { id: 'past',   label: `Terminés (${past.length})` },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            padding: '10px 20px', background: 'transparent', border: 'none',
            borderBottom: tab === t.id ? '2px solid var(--pink)' : '2px solid transparent',
            color: tab === t.id ? 'var(--pink)' : 'var(--text-muted)',
            fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: '13px',
            cursor: 'pointer', transition: 'all 150ms', marginBottom: '-1px',
          }}>{t.label}</button>
        ))}
      </div>

      {/* Contenu */}
      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[1,2,3].map(i => <div key={i} className="skeleton" style={{ height: '100px', borderRadius: '14px' }} />)}
        </div>
      ) : displayed.length === 0 ? (
        <div style={{
          padding: '60px', textAlign: 'center', borderRadius: '14px',
          background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)',
          color: 'var(--text-muted)', fontFamily: 'var(--font-ui)', fontSize: '14px',
        }}>
          {tab === 'active' ? '😴 Aucun événement actif pour le moment.' : 'Aucun événement terminé.'}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {displayed.map(ev => {
            const cfg = TYPE_CONFIG[ev.type] || TYPE_CONFIG.event
            const days = daysLeft(ev.end_date)
            const urgent = days !== null && days <= 3
            return (
              <div key={ev.id} style={{
                padding: '20px 24px', borderRadius: '14px',
                background: `${cfg.color}06`,
                border: `1px solid ${urgent ? 'rgba(255,210,0,0.4)' : cfg.color + '25'}`,
                display: 'flex', gap: '20px', alignItems: 'flex-start',
                transition: 'all 200ms',
              }}>
                {/* Icône type */}
                <div style={{
                  width: '48px', height: '48px', borderRadius: '12px', flexShrink: 0,
                  background: `${cfg.color}15`, border: `1px solid ${cfg.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px',
                }}>
                  {cfg.icon}
                </div>

                {/* Infos */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '6px' }}>
                    <span style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: '15px', color: 'var(--text-primary)' }}>
                      {ev.title}
                    </span>
                    <span style={{
                      fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px',
                      background: `${cfg.color}15`, border: `1px solid ${cfg.color}30`, color: cfg.color,
                    }}>{cfg.label}</span>
                    {urgent && (
                      <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--gold)' }}>⚠️ Expire bientôt</span>
                    )}
                  </div>
                  {ev.description && (
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: '0 0 8px' }}>
                      {ev.description}
                    </p>
                  )}
                  {ev.rewards && (
                    <div style={{ fontSize: '12px', color: '#52ff8a' }}>🎁 {ev.rewards}</div>
                  )}
                </div>

                {/* Dates */}
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  {ev.start_date && (
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                      Début : <strong>{formatDate(ev.start_date)}</strong>
                    </div>
                  )}
                  {ev.end_date && (
                    <div style={{ fontSize: '11px', color: urgent ? 'var(--gold)' : 'var(--text-muted)' }}>
                      Fin : <strong>{formatDate(ev.end_date)}</strong>
                      {days !== null && tab === 'active' && (
                        <div style={{ fontSize: '10px', marginTop: '2px' }}>
                          {days > 0 ? `${days}j restant${days > 1 ? 's' : ''}` : 'Expire aujourd\'hui'}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
