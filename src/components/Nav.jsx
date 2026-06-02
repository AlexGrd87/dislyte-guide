import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { GAME_VERSION } from '../data/config.js'

const NAV_ITEMS = [
  { id: 'home',        label: 'Accueil',      icon: '🏠' },
  { id: 'mybox',       label: 'Ma Box',       icon: '📦' },
  { id: 'team',        label: 'Team Builder', icon: '👥' },
  { id: 'espers',      label: 'Espers',       icon: '🃏' },
  { id: 'tierlist',    label: 'Tier List',    icon: '🏆' },
  { id: 'relics',      label: 'Relics',       icon: '⚙️' },
  { id: 'modes',       label: 'Modes',        icon: '🗺️' },
  { id: 'codes',       label: 'Codes',        icon: '🎁' },
  { id: 'compare',     label: 'Comparer',     icon: '⚖️' },
  { id: 'progression',    label: 'F2P Guide',   icon: '📈' },
  { id: 'events',         label: 'Événements',  icon: '🎉' },
  { id: 'tierhistory',    label: 'Historique',  icon: '📜' },
  { id: 'communityteams', label: 'Communauté',  icon: '🌍' },
  { id: 'stats',          label: 'Stats',        icon: '📊' },
  { id: 'buildcalc',      label: 'Build Calc',   icon: '🧮' },
  { id: 'mytierlist',     label: 'Ma TierList',  icon: '⭐' },
]

export default function Nav({ current, onNavigate, onOpenAuth, onOpenSpotlight, activeCodesCount = 0 }) {
  const { user, signOut, loading } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Close user menu on outside click
  useEffect(() => {
    if (!userMenuOpen) return
    const handler = () => setUserMenuOpen(false)
    window.addEventListener('click', handler)
    return () => window.removeEventListener('click', handler)
  }, [userMenuOpen])

  const go = (id) => {
    onNavigate(id)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSignOut = async () => {
    setUserMenuOpen(false)
    await signOut()
  }

  // Avatar: first letter of email or username
  const avatarLetter = user?.user_metadata?.full_name?.[0]
    || user?.user_metadata?.name?.[0]
    || user?.email?.[0]
    || '?'

  const displayName = user?.user_metadata?.full_name
    || user?.user_metadata?.name
    || user?.email?.split('@')[0]
    || ''

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        background: scrolled ? 'rgba(6,5,15,0.96)' : 'rgba(6,5,15,0.75)',
        backdropFilter: 'blur(24px) saturate(1.5)',
        borderBottom: `1px solid ${scrolled ? 'rgba(255,45,135,0.18)' : 'rgba(255,255,255,0.05)'}`,
        transition: 'all 300ms',
        gap: '8px',
      }}>
        {/* Ligne déco basse */}
        <div style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255,45,135,0.5) 30%, rgba(255,210,0,0.4) 60%, transparent)',
          opacity: scrolled ? 0.6 : 0.25,
          transition: 'opacity 300ms',
        }} />

        {/* Logo */}
        <div
          onClick={() => go('home')}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', marginRight: '12px', flexShrink: 0 }}
        >
          <div style={{
            width: '34px',
            height: '34px',
            borderRadius: '9px',
            background: 'linear-gradient(135deg, #FF2D87 0%, #8B5CF6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            fontSize: '15px',
            color: '#fff',
            boxShadow: '0 0 20px rgba(255,45,135,0.45)',
            flexShrink: 0,
          }}>D</div>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            fontSize: '14px',
            letterSpacing: '3px',
            background: 'linear-gradient(135deg, #FF2D87, #FFD200)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>DISLYTE·FR</span>
        </div>

        {/* Desktop nav */}
        <div style={{ display: 'flex', gap: '2px', flex: 1 }} className="hide-mobile">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              title={item.label}
              style={{
                flex: 1,
                background: current === item.id ? 'rgba(255,45,135,0.1)' : 'transparent',
                border: current === item.id ? '1px solid rgba(255,45,135,0.3)' : '1px solid transparent',
                borderRadius: '8px',
                color: current === item.id ? 'var(--pink)' : 'var(--text-secondary)',
                fontFamily: 'var(--font-ui)',
                fontWeight: 600,
                padding: '5px 4px',
                cursor: 'pointer',
                transition: 'all 140ms',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2px',
                textShadow: current === item.id ? '0 0 12px rgba(255,45,135,0.5)' : 'none',
              }}
              onMouseEnter={e => {
                if (current !== item.id) {
                  e.currentTarget.style.color = 'var(--text-primary)'
                  e.currentTarget.style.background = 'rgba(255,45,135,0.06)'
                  e.currentTarget.style.borderColor = 'rgba(255,45,135,0.2)'
                }
              }}
              onMouseLeave={e => {
                if (current !== item.id) {
                  e.currentTarget.style.color = 'var(--text-secondary)'
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.borderColor = 'transparent'
                }
              }}
            >
              <div style={{ position: 'relative', lineHeight: 1 }}>
                <span style={{ fontSize: '16px', lineHeight: 1 }}>{item.icon}</span>
                {item.id === 'codes' && activeCodesCount > 0 && (
                  <span style={{
                    position: 'absolute', top: '-4px', right: '-6px',
                    background: '#FF2D87', color: '#fff',
                    borderRadius: '50%', width: '14px', height: '14px',
                    fontSize: '8px', fontWeight: 700,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-ui)',
                    boxShadow: '0 0 6px rgba(255,45,135,0.8)',
                  }}>
                    {activeCodesCount}
                  </span>
                )}
              </div>
              <span style={{ fontSize: '9px', letterSpacing: '0.3px', whiteSpace: 'nowrap', lineHeight: 1 }}>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Right zone — badge version + auth */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: 'auto', flexShrink: 0 }} className="hide-mobile">
          <div style={{
            padding: '4px 12px',
            borderRadius: '20px',
            background: 'rgba(255,210,0,0.08)',
            border: '1px solid rgba(255,210,0,0.25)',
            color: 'var(--gold)',
            fontFamily: 'var(--font-ui)',
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '1.5px',
          }}>
            {GAME_VERSION}
          </div>

          {/* Auth zone */}
          {loading ? null : user ? (
            <div style={{ position: 'relative' }}>
              <button
                onClick={e => { e.stopPropagation(); setUserMenuOpen(v => !v) }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  background: 'rgba(255,45,135,0.08)',
                  border: '1px solid rgba(255,45,135,0.25)',
                  borderRadius: '20px',
                  padding: '5px 12px 5px 5px',
                  cursor: 'pointer',
                  transition: 'all 150ms',
                }}
              >
                {/* Avatar */}
                {user.user_metadata?.avatar_url ? (
                  <img
                    src={user.user_metadata.avatar_url}
                    alt=""
                    style={{ width: '26px', height: '26px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{
                    width: '26px', height: '26px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #FF2D87, #8B5CF6)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '12px', fontWeight: 700, color: '#fff',
                  }}>
                    {avatarLetter.toUpperCase()}
                  </div>
                )}
                <span style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '12px', fontWeight: 600,
                  color: 'var(--text-primary)',
                  maxWidth: '100px', overflow: 'hidden',
                  textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {displayName}
                </span>
                <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>▼</span>
              </button>

              {/* Dropdown */}
              {userMenuOpen && (
                <div style={{
                  position: 'absolute', top: '100%', right: 0, marginTop: '6px',
                  background: '#0B0A1C',
                  border: '1px solid rgba(255,45,135,0.25)',
                  borderRadius: '12px',
                  padding: '6px',
                  minWidth: '160px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                  zIndex: 2000,
                }}>
                  <button
                    onClick={() => { go('mybox'); setUserMenuOpen(false) }}
                    style={{
                      width: '100%', padding: '10px 14px',
                      background: 'transparent', border: 'none',
                      borderRadius: '8px', cursor: 'pointer',
                      color: 'var(--text-primary)', fontFamily: 'var(--font-ui)',
                      fontSize: '13px', fontWeight: 600,
                      display: 'flex', alignItems: 'center', gap: '8px',
                      textAlign: 'left',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,45,135,0.1)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    📦 Ma Box
                  </button>
                  <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '4px 0' }} />
                  <button
                    onClick={handleSignOut}
                    style={{
                      width: '100%', padding: '10px 14px',
                      background: 'transparent', border: 'none',
                      borderRadius: '8px', cursor: 'pointer',
                      color: 'rgba(237,233,255,0.5)', fontFamily: 'var(--font-ui)',
                      fontSize: '13px', fontWeight: 600,
                      display: 'flex', alignItems: 'center', gap: '8px',
                      textAlign: 'left',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,80,80,0.08)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    🚪 Déconnexion
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              style={{
                padding: '7px 16px',
                background: 'linear-gradient(135deg, #FF2D87, #8B5CF6)',
                border: 'none',
                borderRadius: '20px',
                color: '#fff',
                fontFamily: 'var(--font-ui)',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.5px',
                cursor: 'pointer',
                boxShadow: '0 0 16px rgba(255,45,135,0.35)',
                transition: 'all 150ms',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(255,45,135,0.5)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 0 16px rgba(255,45,135,0.35)' }}
            >
              Connexion
            </button>
          )}
        </div>

        {/* Loupe Spotlight */}
        <button
          onClick={onOpenSpotlight}
          title="Recherche (Ctrl+K)"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            cursor: 'pointer',
            color: 'var(--text-muted)',
            fontSize: '15px',
            padding: '6px 10px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 150ms',
            flexShrink: 0,
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,45,135,0.4)'; e.currentTarget.style.color = 'var(--pink)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)' }}
        >
          🔍
          <span style={{ fontSize: '10px', fontFamily: 'var(--font-ui)', letterSpacing: '0.5px' }} className="hide-mobile">Ctrl+K</span>
        </button>

        {/* Burger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            marginLeft: 'auto',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-primary)',
            fontSize: '20px',
            padding: '8px',
            display: 'none',
          }}
          className="show-mobile"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed',
          top: '60px', left: 0, right: 0, bottom: 0,
          background: 'rgba(6,5,15,0.98)',
          backdropFilter: 'blur(20px)',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          padding: '24px',
          gap: '8px',
          overflowY: 'auto',
          animation: 'fadeIn 200ms both',
        }}>
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              style={{
                background: current === item.id ? 'rgba(255,45,135,0.1)' : 'rgba(255,255,255,0.03)',
                border: current === item.id ? '1px solid rgba(255,45,135,0.3)' : '1px solid rgba(255,255,255,0.08)',
                borderRadius: '12px',
                color: current === item.id ? 'var(--pink)' : 'var(--text-primary)',
                fontFamily: 'var(--font-ui)',
                fontSize: '16px',
                fontWeight: 600,
                padding: '16px 20px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                textAlign: 'left',
              }}
            >
              <span style={{ fontSize: '20px' }}>{item.icon}</span>
              {item.label}
            </button>
          ))}

          {/* Mobile auth */}
          <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            {user ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '12px 16px',
                  background: 'rgba(255,45,135,0.06)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,45,135,0.15)',
                }}>
                  {user.user_metadata?.avatar_url ? (
                    <img src={user.user_metadata.avatar_url} alt="" style={{ width: '36px', height: '36px', borderRadius: '50%' }} />
                  ) : (
                    <div style={{
                      width: '36px', height: '36px', borderRadius: '50%',
                      background: 'linear-gradient(135deg, #FF2D87, #8B5CF6)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '16px', fontWeight: 700, color: '#fff',
                    }}>
                      {avatarLetter.toUpperCase()}
                    </div>
                  )}
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>{displayName}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Connecté</div>
                  </div>
                </div>
                <button
                  onClick={handleSignOut}
                  style={{
                    padding: '14px 20px', background: 'rgba(255,80,80,0.08)',
                    border: '1px solid rgba(255,80,80,0.2)', borderRadius: '12px',
                    color: 'rgba(237,233,255,0.6)', fontFamily: 'var(--font-ui)',
                    fontSize: '14px', fontWeight: 600, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '10px',
                  }}
                >
                  🚪 Déconnexion
                </button>
              </div>
            ) : (
              <button
                onClick={() => { setMenuOpen(false); onOpenAuth() }}
                style={{
                  width: '100%', padding: '16px 20px',
                  background: 'linear-gradient(135deg, #FF2D87, #8B5CF6)',
                  border: 'none', borderRadius: '12px',
                  color: '#fff', fontFamily: 'var(--font-ui)',
                  fontSize: '16px', fontWeight: 700, cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(255,45,135,0.4)',
                }}
              >
                🔑 Connexion
              </button>
            )}
          </div>
        </div>
      )}

      {/* Spacer */}
      <div style={{ height: '64px' }} />

      <style>{`
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </>
  )
}
