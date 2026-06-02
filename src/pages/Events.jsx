import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase.js'
import { GAME_VERSION } from '../data/config.js'

const TYPE_CONFIG = {
  event:     { label: 'Événement',  icon: '🎉', color: '#FF2D87' },
  banner:    { label: 'Bannière',   icon: '🎯', color: '#FFD200' },
  challenge: { label: 'Défi',       icon: '⚔️', color: '#38BDF8' },
  login:     { label: 'Connexion',  icon: '🎁', color: '#52ff8a' },
}

const NOTIF_KEY = 'dislyte-event-notifs'

// ── Countdown hook ───────────────────────────────────────────────────────────
function useCountdown(endDate) {
  const [remaining, setRemaining] = useState(null)

  useEffect(() => {
    if (!endDate) return
    const tick = () => {
      const diff = new Date(endDate) - new Date()
      if (diff <= 0) { setRemaining(null); return }
      const d = Math.floor(diff / 86400000)
      const h = Math.floor((diff % 86400000) / 3600000)
      const m = Math.floor((diff % 3600000) / 60000)
      const s = Math.floor((diff % 60000) / 1000)
      setRemaining({ d, h, m, s, urgent: diff < 3 * 86400000 })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [endDate])

  return remaining
}

// ── Mini calendrier ──────────────────────────────────────────────────────────
function MiniCalendar({ events }) {
  const now = new Date()
  const [month, setMonth] = useState(now.getMonth())
  const [year,  setYear]  = useState(now.getFullYear())

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells = []
  for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  const dayEvents = (d) => {
    if (!d) return []
    const date = new Date(year, month, d)
    return events.filter(e => {
      const start = e.start_date ? new Date(e.start_date) : null
      const end   = e.end_date   ? new Date(e.end_date)   : null
      return (!start || date >= new Date(start.toDateString())) &&
             (!end   || date <= new Date(end.toDateString()))
    })
  }

  const MONTHS_FR = ['Jan','Fév','Mar','Avr','Mai','Juin','Juil','Aoû','Sep','Oct','Nov','Déc']
  const DAYS_FR   = ['L','M','M','J','V','S','D']

  return (
    <div className="card" style={{ padding: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <button onClick={() => { if (month === 0) { setMonth(11); setYear(y => y-1) } else setMonth(m => m-1) }}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '16px', padding: '0 4px' }}>‹</button>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '13px', letterSpacing: '1px', color: 'var(--text-primary)' }}>
          {MONTHS_FR[month]} {year}
        </div>
        <button onClick={() => { if (month === 11) { setMonth(0); setYear(y => y+1) } else setMonth(m => m+1) }}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '16px', padding: '0 4px' }}>›</button>
      </div>

      {/* Jours */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px', marginBottom: '4px' }}>
        {DAYS_FR.map((d, i) => (
          <div key={i} style={{ textAlign: 'center', fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-ui)', fontWeight: 700, padding: '2px 0' }}>{d}</div>
        ))}
      </div>

      {/* Cellules */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px' }}>
        {cells.map((d, i) => {
          const evts = dayEvents(d)
          const isToday = d && new Date(year, month, d).toDateString() === now.toDateString()
          return (
            <div key={i} title={evts.map(e => e.title).join('\n')} style={{
              aspectRatio: '1', borderRadius: '6px', display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: '1px',
              background: isToday ? 'rgba(255,45,135,0.15)' : evts.length ? 'rgba(255,255,255,0.04)' : 'transparent',
              border: isToday ? '1px solid rgba(255,45,135,0.4)' : '1px solid transparent',
              cursor: evts.length ? 'help' : 'default',
              position: 'relative',
            }}>
              {d && (
                <>
                  <span style={{ fontSize: '11px', color: isToday ? 'var(--pink)' : d ? 'var(--text-secondary)' : 'transparent', fontWeight: isToday ? 700 : 400 }}>{d}</span>
                  {evts.length > 0 && (
                    <div style={{ display: 'flex', gap: '1px', flexWrap: 'wrap', justifyContent: 'center' }}>
                      {evts.slice(0, 3).map((e, j) => {
                        const cfg = TYPE_CONFIG[e.type] || TYPE_CONFIG.event
                        return <div key={j} style={{ width: '4px', height: '4px', borderRadius: '50%', background: cfg.color }} />
                      })}
                    </div>
                  )}
                </>
              )}
            </div>
          )
        })}
      </div>

      {/* Légende */}
      <div style={{ marginTop: '12px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {Object.entries(TYPE_CONFIG).map(([k, v]) => (
          <div key={k} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', color: 'var(--text-muted)' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: v.color }} />
            {v.label}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Carte événement ──────────────────────────────────────────────────────────
function EventCard({ ev, notified, onToggleNotif }) {
  const cfg = TYPE_CONFIG[ev.type] || TYPE_CONFIG.event
  const countdown = useCountdown(ev.end_date)
  const now = new Date()
  const isExpired = ev.end_date && new Date(ev.end_date) <= now

  const formatDate = (d) => d ? new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' }) : null

  return (
    <div style={{
      padding: '20px 24px', borderRadius: '14px',
      background: isExpired ? 'rgba(255,255,255,0.01)' : `${cfg.color}06`,
      border: `1px solid ${countdown?.urgent ? 'rgba(255,210,0,0.4)' : isExpired ? 'rgba(255,255,255,0.06)' : cfg.color + '25'}`,
      opacity: isExpired ? 0.5 : 1,
      transition: 'all 200ms',
    }}>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
        {/* Icône */}
        <div style={{
          width: '52px', height: '52px', borderRadius: '12px', flexShrink: 0,
          background: `${cfg.color}15`, border: `1px solid ${cfg.color}30`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px',
        }}>{cfg.icon}</div>

        {/* Infos */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
            <span style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: '15px' }}>{ev.title}</span>
            <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '4px', background: `${cfg.color}15`, border: `1px solid ${cfg.color}30`, color: cfg.color, fontWeight: 700 }}>
              {cfg.label}
            </span>
            {countdown?.urgent && <span style={{ fontSize: '10px', color: 'var(--gold)', fontWeight: 700 }}>⚠️ Bientôt terminé</span>}
          </div>
          {ev.description && <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: '0 0 8px' }}>{ev.description}</p>}
          {ev.rewards && <div style={{ fontSize: '12px', color: '#52ff8a' }}>🎁 {ev.rewards}</div>}

          {/* Dates */}
          <div style={{ display: 'flex', gap: '16px', marginTop: '10px', flexWrap: 'wrap' }}>
            {ev.start_date && <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>📅 Début : <strong>{formatDate(ev.start_date)}</strong></span>}
            {ev.end_date   && <span style={{ fontSize: '11px', color: countdown?.urgent ? 'var(--gold)' : 'var(--text-muted)' }}>⏰ Fin : <strong>{formatDate(ev.end_date)}</strong></span>}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px', flexShrink: 0 }}>
          {/* Cloche notif */}
          {!isExpired && (
            <button onClick={() => onToggleNotif(ev.id)} title={notified ? 'Désactiver le rappel' : 'Me rappeler avant la fin'}
              style={{ background: notified ? 'rgba(255,210,0,0.15)' : 'rgba(255,255,255,0.05)',
                border: `1px solid ${notified ? 'rgba(255,210,0,0.4)' : 'var(--border)'}`,
                borderRadius: '8px', padding: '6px 8px', cursor: 'pointer', fontSize: '14px',
                transition: 'all 150ms' }}>
              {notified ? '🔔' : '🔕'}
            </button>
          )}
        </div>
      </div>

      {/* Countdown */}
      {countdown && !isExpired && (
        <div style={{
          marginTop: '14px', padding: '10px 14px', borderRadius: '10px',
          background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', gap: '12px', alignItems: 'center',
        }}>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-ui)' }}>Temps restant :</span>
          {[
            { v: countdown.d, l: 'j' },
            { v: countdown.h, l: 'h' },
            { v: countdown.m, l: 'm' },
            { v: countdown.s, l: 's' },
          ].map(({ v, l }) => (
            <div key={l} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 900, color: countdown.urgent ? 'var(--gold)' : cfg.color, lineHeight: 1 }}>
                {String(v).padStart(2, '0')}
              </div>
              <div style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: 'var(--font-ui)' }}>{l}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Page principale ──────────────────────────────────────────────────────────
export default function Events() {
  const [events, setEvents]     = useState([])
  const [loading, setLoading]   = useState(true)
  const [lastCheck, setLastCheck] = useState(null)
  const [typeFilter, setTypeFilter] = useState('all')
  const [tab, setTab]           = useState('active')
  const [notified, setNotified] = useState(() => {
    try { return new Set(JSON.parse(localStorage.getItem(NOTIF_KEY) || '[]')) }
    catch { return new Set() }
  })

  const fetchEvents = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase.from('events').select('*').order('end_date', { ascending: true })
    setEvents(data || [])
    setLastCheck(new Date())
    setLoading(false)
  }, [])

  useEffect(() => { fetchEvents() }, [fetchEvents])

  // Vérif notifications au chargement
  useEffect(() => {
    if (!events.length) return
    const now = new Date()
    events.forEach(ev => {
      if (!notified.has(ev.id)) return
      if (!ev.end_date) return
      const diff = new Date(ev.end_date) - now
      if (diff > 0 && diff < 3 * 86400000 && 'Notification' in window) {
        Notification.requestPermission().then(perm => {
          if (perm === 'granted') {
            const days = Math.ceil(diff / 86400000)
            new Notification(`⏰ ${ev.title} expire dans ${days}j !`, { body: ev.rewards || '' })
          }
        })
      }
    })
  }, [events])

  const toggleNotif = (id) => {
    setNotified(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      localStorage.setItem(NOTIF_KEY, JSON.stringify([...next]))
      return next
    })
  }

  const now = new Date()
  const filtered = events.filter(ev => {
    const isActive = ev.is_active && (!ev.end_date || new Date(ev.end_date) > now)
    if (tab === 'active' && !isActive) return false
    if (tab === 'past'   &&  isActive) return false
    if (typeFilter !== 'all' && ev.type !== typeFilter) return false
    return true
  })

  const activeCount = events.filter(ev => ev.is_active && (!ev.end_date || new Date(ev.end_date) > now)).length
  const pastCount   = events.length - activeCount

  return (
    <div className="page" style={{ paddingTop: '40px', paddingBottom: '60px' }}>

      {/* Header */}
      <div className="section-header" style={{ marginBottom: '32px' }}>
        <div>
          <h1 className="section-title" style={{ color: '#FF2D87' }}>Événements</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>Événements en cours · {GAME_VERSION}</p>
        </div>
        <div className="section-header-line" />
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          {lastCheck && <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-ui)' }}>{lastCheck.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>}
          <button onClick={fetchEvents} disabled={loading}
            style={{ padding: '8px 16px', borderRadius: '8px', background: 'rgba(255,45,135,0.08)', border: '1px solid rgba(255,45,135,0.25)', color: 'var(--pink)', fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: '12px', cursor: 'pointer' }}>
            {loading ? '⏳' : '🔄'} Actualiser
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: '24px', alignItems: 'start' }}>
        {/* Colonne gauche — liste */}
        <div>
          {/* Tabs actif/terminé */}
          <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', marginBottom: '20px' }}>
            {[{ id: 'active', label: `✅ En cours (${activeCount})` }, { id: 'past', label: `❌ Terminés (${pastCount})` }].map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                padding: '10px 20px', background: 'transparent', border: 'none',
                borderBottom: tab === t.id ? '2px solid var(--pink)' : '2px solid transparent',
                color: tab === t.id ? 'var(--pink)' : 'var(--text-muted)',
                fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: '13px', cursor: 'pointer', marginBottom: '-1px',
              }}>{t.label}</button>
            ))}
          </div>

          {/* Filtres par type */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '20px' }}>
            <button className={`tag ${typeFilter === 'all' ? 'active' : ''}`} onClick={() => setTypeFilter('all')}>Tous</button>
            {Object.entries(TYPE_CONFIG).map(([k, v]) => (
              <button key={k} className={`tag ${typeFilter === k ? 'active' : ''}`} onClick={() => setTypeFilter(typeFilter === k ? 'all' : k)}>
                {v.icon} {v.label}
              </button>
            ))}
          </div>

          {/* Liste */}
          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[1,2,3].map(i => <div key={i} className="skeleton" style={{ height: '120px', borderRadius: '14px' }} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: '60px', textAlign: 'center', borderRadius: '14px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', color: 'var(--text-muted)', fontFamily: 'var(--font-ui)' }}>
              {tab === 'active' ? '😴 Aucun événement actif en ce moment.' : 'Aucun événement terminé.'}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {filtered.map(ev => (
                <EventCard key={ev.id} ev={ev} notified={notified.has(ev.id)} onToggleNotif={toggleNotif} />
              ))}
            </div>
          )}
        </div>

        {/* Colonne droite — calendrier + rappels */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'sticky', top: '80px' }}>
          <MiniCalendar events={events.filter(e => e.is_active)} />

          {/* Mes rappels */}
          {notified.size > 0 && (
            <div className="card" style={{ padding: '16px' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '11px', color: 'var(--gold)', letterSpacing: '2px', marginBottom: '10px' }}>
                🔔 MES RAPPELS ({notified.size})
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {events.filter(e => notified.has(e.id)).map(e => (
                  <div key={e.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                    <span>{TYPE_CONFIG[e.type]?.icon || '🎉'}</span>
                    <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.title}</span>
                    <button onClick={() => toggleNotif(e.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '12px' }}>✕</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
