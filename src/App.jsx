import { useState, useEffect, lazy, Suspense } from 'react'
import { GAME_VERSION } from './data/config.js'
import Nav from './components/Nav.jsx'
import AuthModal from './components/AuthModal.jsx'
import Spotlight from './components/Spotlight.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { EspersProvider } from './context/EspersContext.jsx'
import { supabase } from './lib/supabase.js'

const Home        = lazy(() => import('./pages/Home.jsx'))
const TeamBuilder = lazy(() => import('./pages/TeamBuilder.jsx'))
const Espers      = lazy(() => import('./pages/Espers.jsx'))
const TierList    = lazy(() => import('./pages/TierList.jsx'))
const Relics      = lazy(() => import('./pages/Relics.jsx'))
const Modes       = lazy(() => import('./pages/Modes.jsx'))
const MyBox       = lazy(() => import('./pages/MyBox.jsx'))
const Codes       = lazy(() => import('./pages/Codes.jsx'))
const Compare     = lazy(() => import('./pages/Compare.jsx'))
const Progression      = lazy(() => import('./pages/Progression.jsx'))
const Events           = lazy(() => import('./pages/Events.jsx'))
const TierHistory      = lazy(() => import('./pages/TierHistory.jsx'))
const CommunityTeams   = lazy(() => import('./pages/CommunityTeams.jsx'))
const Stats            = lazy(() => import('./pages/Stats.jsx'))
const BuildCalc        = lazy(() => import('./pages/BuildCalc.jsx'))
const MyTierList       = lazy(() => import('./pages/MyTierList.jsx'))
const BossGuide        = lazy(() => import('./pages/BossGuide.jsx'))
const Profile          = lazy(() => import('./pages/Profile.jsx'))
const PullSim          = lazy(() => import('./pages/PullSim.jsx'))

const PAGE_TITLES = {
  home:           'Accueil',
  team:           'Team Builder',
  espers:         'Espers',
  tierlist:       'Tier List',
  relics:         'Relics',
  modes:          'Modes de jeu',
  mybox:          'Ma Box',
  codes:          'Codes Cadeaux',
  compare:        'Comparer',
  progression:    'Guide F2P',
  events:         'Événements',
  tierhistory:    'Historique Méta',
  communityteams: 'Communauté',
  stats:          'Statistiques',
  buildcalc:      'Build Calc',
  mytierlist:     'Ma Tier List',
  bossguide:      'Guide des Bosses',
  profile:        'Mon Profil',
  pullsim:        'Simulateur de Pulls',
}

const PAGE_COMPONENTS = {
  home:     Home,
  team:     TeamBuilder,
  espers:   Espers,
  tierlist: TierList,
  relics:   Relics,
  modes:    Modes,
  mybox:    MyBox,
  codes:    Codes,
  compare:  Compare,
  progression:    Progression,
  events:         Events,
  tierhistory:    TierHistory,
  communityteams: CommunityTeams,
  stats:          Stats,
  buildcalc:      BuildCalc,
  mytierlist:     MyTierList,
  bossguide:      BossGuide,
  profile:        Profile,
  pullsim:        PullSim,
}

function getPageFromHash() {
  const hash = window.location.hash.slice(1).split('?')[0]
  return PAGE_COMPONENTS[hash] ? hash : 'home'
}

function AppInner() {
  const [page, setPage] = useState(getPageFromHash)
  const [showAuth, setShowAuth] = useState(false)
  const [showSpotlight, setShowSpotlight] = useState(false)
  const [activeCodesCount, setActiveCodesCount] = useState(0)

  // Fetch nombre de codes actifs pour le badge nav
  useEffect(() => {
    supabase
      .from('gift_codes')
      .select('id', { count: 'exact', head: true })
      .eq('is_active', true)
      .then(({ count }) => setActiveCodesCount(count || 0))
  }, [])

  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setShowSpotlight(v => !v)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => {
    const handler = () => setPage(getPageFromHash())
    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  }, [])

  useEffect(() => {
    const label = PAGE_TITLES[page] || 'Accueil'
    document.title = `${label} · Dislyte Guide FR`
  }, [page])

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
          onOpenSpotlight={() => setShowSpotlight(true)}
          activeCodesCount={activeCodesCount}
        />
        <main>
          <Suspense fallback={<div style={{ minHeight: '60vh' }} />}>
            <PageComponent onNavigate={navigate} onOpenAuth={() => setShowAuth(true)} />
          </Suspense>
        </main>
        <Footer />
      </div>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
      <Spotlight open={showSpotlight} onClose={() => setShowSpotlight(false)} onNavigate={navigate} />
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <EspersProvider>
        <AppInner />
      </EspersProvider>
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
        Guide communautaire non officiel · Patch {GAME_VERSION} · Contenu basé sur le meta actuel
      </p>
      <p style={{ fontSize: '11px', color: 'rgba(232,232,240,0.2)', marginTop: '8px' }}>
        Dislyte est la propriété de Farlight Games. Ce site n'est pas affilié à l'éditeur.
      </p>
    </footer>
  )
}
