import { useState, useEffect } from 'react'
import Nav from './components/Nav.jsx'
import Home from './pages/Home.jsx'
import TeamBuilder from './pages/TeamBuilder.jsx'
import Espers from './pages/Espers.jsx'
import TierList from './pages/TierList.jsx'
import Relics from './pages/Relics.jsx'
import Modes from './pages/Modes.jsx'
import MyBox from './pages/MyBox.jsx'
import AuthModal from './components/AuthModal.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

const PAGE_COMPONENTS = {
  home:     Home,
  team:     TeamBuilder,
  espers:   Espers,
  tierlist: TierList,
  relics:   Relics,
  modes:    Modes,
  mybox:    MyBox,
}

function getPageFromHash() {
  const hash = window.location.hash.slice(1)
  return PAGE_COMPONENTS[hash] ? hash : 'home'
}

function AppInner() {
  const [page, setPage] = useState(getPageFromHash)
  const [showAuth, setShowAuth] = useState(false)

  useEffect(() => {
    const handler = () => setPage(getPageFromHash())
    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  }, [])

  const navigate = (id) => {
    setPage(id)
    window.location.hash = id
  }

  const PageComponent = PAGE_COMPONENTS[page] || Home

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-deep)' }}>
      {/* Ambient background */}
      <div style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        background: `
          radial-gradient(ellipse 50% 30% at 10% 0%, rgba(255,45,135,0.07) 0%, transparent 70%),
          radial-gradient(ellipse 40% 25% at 90% 100%, rgba(139,92,246,0.06) 0%, transparent 70%)
        `,
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Nav
          current={page}
          onNavigate={navigate}
          onOpenAuth={() => setShowAuth(true)}
        />
        <main>
          <PageComponent onNavigate={navigate} onOpenAuth={() => setShowAuth(true)} />
        </main>
        <Footer />
      </div>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  )
}

function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '32px 24px',
      textAlign: 'center',
    }}>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '12px',
        color: 'var(--text-muted)',
        letterSpacing: '2px',
        marginBottom: '8px',
      }}>
        DISLYTE · GUIDE FR
      </div>
      <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
        Guide communautaire non officiel · Mis à jour Mai 2026 · Contenu basé sur le meta actuel
      </p>
      <p style={{ fontSize: '11px', color: 'rgba(232,232,240,0.2)', marginTop: '8px' }}>
        Dislyte est la propriété de Farlight Games. Ce site n'est pas affilié à l'éditeur.
      </p>
    </footer>
  )
}
