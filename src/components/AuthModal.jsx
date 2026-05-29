import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'

export default function AuthModal({ onClose }) {
  const { signInWithDiscord, isConfigured } = useAuth()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleDiscord() {
    setError(null)
    setLoading(true)
    try {
      await signInWithDiscord()
    } catch (e) {
      setError('Erreur Discord : ' + e.message)
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9000,
        background: 'rgba(6,5,15,0.85)',
        backdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#0B0A1C',
          border: '1px solid rgba(255,45,135,0.25)',
          borderRadius: '20px',
          padding: '40px 36px',
          width: '380px',
          boxShadow: '0 0 60px rgba(255,45,135,0.12), 0 24px 60px rgba(0,0,0,0.6)',
          position: 'relative',
        }}
      >
        {/* Déco top */}
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: '120px', height: '2px',
          background: 'linear-gradient(90deg, transparent, #FF2D87, transparent)',
        }} />

        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '14px', right: '16px',
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'rgba(237,233,255,0.4)', fontSize: '18px', lineHeight: 1,
          }}
        >✕</button>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            width: '52px', height: '52px', borderRadius: '14px',
            background: 'linear-gradient(135deg, #FF2D87 0%, #8B5CF6 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '22px', color: '#fff',
            margin: '0 auto 16px',
            boxShadow: '0 0 24px rgba(255,45,135,0.4)',
          }}>D</div>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 900,
            letterSpacing: '2px', marginBottom: '8px',
            background: 'linear-gradient(135deg, #FF2D87, #FFD200)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>CONNEXION</h2>
          <p style={{ fontSize: '13px', color: 'rgba(237,233,255,0.5)', lineHeight: 1.5 }}>
            Connecte-toi pour sauvegarder ta box, tes builds et tes équipes sur tous tes appareils.
          </p>
        </div>

        {/* Message erreur */}
        {error && (
          <div style={{
            padding: '12px 16px', borderRadius: '10px', marginBottom: '16px',
            background: 'rgba(255,82,82,0.08)', border: '1px solid rgba(255,82,82,0.3)',
            fontSize: '12px', color: 'rgba(255,150,150,0.9)', lineHeight: 1.6, textAlign: 'center',
          }}>
            ❌ {error}
          </div>
        )}

        {/* Message si Supabase non configuré */}
        {!isConfigured && (
          <div style={{
            padding: '14px 18px', borderRadius: '12px', marginBottom: '16px',
            background: 'rgba(255,210,0,0.08)', border: '1px solid rgba(255,210,0,0.3)',
            fontSize: '12px', color: 'rgba(255,210,0,0.9)', lineHeight: 1.6, textAlign: 'center',
          }}>
            ⚙️ La base de données n'est pas encore configurée.
          </div>
        )}

        {/* Bouton Discord uniquement */}
        <button
          onClick={isConfigured ? handleDiscord : undefined}
          disabled={!isConfigured || loading}
          style={{
            width: '100%', padding: '14px 20px',
            background: '#5865F2', border: 'none', borderRadius: '12px',
            fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: '14px',
            color: '#fff', cursor: (!isConfigured || loading) ? 'not-allowed' : 'pointer',
            transition: 'all 150ms', opacity: (!isConfigured || loading) ? 0.6 : 1,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            boxShadow: '0 4px 16px rgba(88,101,242,0.35)',
          }}
          onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(88,101,242,0.5)' }}}
          onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(88,101,242,0.35)' }}
        >
          {loading ? (
            <span style={{ fontSize: '14px' }}>⏳</span>
          ) : (
            <svg width="20" height="15" viewBox="0 0 20 15" fill="#fff">
              <path d="M16.93 1.33A16.42 16.42 0 0 0 12.86.02a.06.06 0 0 0-.07.03c-.18.32-.38.73-.52 1.06a15.16 15.16 0 0 0-4.54 0C7.6.74 7.38.32 7.2 0a.06.06 0 0 0-.07-.02A16.38 16.38 0 0 0 3.06 1.33a.06.06 0 0 0-.03.02C.44 5.2-.27 8.97.08 12.7c0 .02.01.04.03.05a16.52 16.52 0 0 0 4.97 2.5.06.06 0 0 0 .07-.02c.38-.52.72-1.07 1.01-1.65a.06.06 0 0 0-.03-.09 10.87 10.87 0 0 1-1.55-.74.06.06 0 0 1-.01-.1c.1-.08.21-.16.31-.24a.06.06 0 0 1 .06-.01c3.26 1.49 6.79 1.49 10.01 0a.06.06 0 0 1 .06.01c.1.08.2.16.31.24a.06.06 0 0 1-.01.1c-.5.29-1.01.54-1.55.73a.06.06 0 0 0-.03.1c.3.58.63 1.13 1.01 1.65a.06.06 0 0 0 .07.02 16.48 16.48 0 0 0 4.97-2.5.06.06 0 0 0 .03-.04c.42-4.32-.7-8.07-2.96-11.39a.05.05 0 0 0-.03-.02zM6.68 10.44c-.98 0-1.79-.9-1.79-2s.79-2 1.79-2c1.01 0 1.8.91 1.79 2 0 1.1-.79 2-1.79 2zm6.61 0c-.98 0-1.79-.9-1.79-2s.79-2 1.79-2c1.01 0 1.8.91 1.79 2 0 1.1-.78 2-1.79 2z"/>
            </svg>
          )}
          {loading ? 'Redirection...' : 'Continuer avec Discord'}
        </button>

        <p style={{ fontSize: '11px', color: 'rgba(237,233,255,0.25)', textAlign: 'center', marginTop: '20px', lineHeight: 1.5 }}>
          En te connectant, tu acceptes que tes données de jeu soient stockées<br/>pour personnaliser ton expérience sur ce site.
        </p>
      </div>
    </div>
  )
}
