import { useState, useEffect } from 'react'

const NAV_ITEMS = [
  { id: 'home',        label: 'Accueil',      icon: '🏠' },
  { id: 'team',        label: 'Team Builder', icon: '👥' },
  { id: 'espers',      label: 'Espers',       icon: '🃏' },
  { id: 'tierlist',    label: 'Tier List',    icon: '🏆' },
  { id: 'relics',      label: 'Relics',       icon: '⚙️' },
  { id: 'modes',       label: 'Modes',        icon: '🗺️' },
]

export default function Nav({ current, onNavigate }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const go = (id) => {
    onNavigate(id)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 28px',
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
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', marginRight: '36px', flexShrink: 0 }}
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
              style={{
                background: current === item.id ? 'rgba(255,45,135,0.1)' : 'transparent',
                border: current === item.id ? '1px solid rgba(255,45,135,0.3)' : '1px solid transparent',
                borderRadius: '8px',
                color: current === item.id ? 'var(--pink)' : 'var(--text-secondary)',
                fontFamily: 'var(--font-ui)',
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.5px',
                padding: '7px 14px',
                cursor: 'pointer',
                transition: 'all 140ms',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
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
              <span style={{ fontSize: '14px' }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>

        {/* Badge version */}
        <div style={{
          marginLeft: 'auto',
          padding: '4px 12px',
          borderRadius: '20px',
          background: 'rgba(255,210,0,0.08)',
          border: '1px solid rgba(255,210,0,0.25)',
          color: 'var(--gold)',
          fontFamily: 'var(--font-ui)',
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '1.5px',
        }} className="hide-mobile">
          MAJ MAI 2026
        </div>

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
        </div>
      )}

      {/* Spacer */}
      <div style={{ height: '60px' }} />

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
