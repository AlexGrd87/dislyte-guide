import { createContext, useContext, useEffect, useState } from 'react'
import { supabase, SUPABASE_CONFIGURED } from '../lib/supabase.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }

    // 1. onAuthStateChange — source principale (gère implicit flow : lit les tokens dans le hash)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfile(session.user.id)
        // Nettoie le hash (#access_token=...) de l'URL sans recharger la page
        if (window.location.hash.includes('access_token')) {
          window.history.replaceState(null, '', window.location.pathname)
        }
      } else {
        setProfile(null)
        setLoading(false)
      }
    })

    // 2. getSession() — backup pour récupérer une session déjà existante
    //    (ex. l'utilisateur revient sur le site après s'être connecté)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user && !user) {
        setUser(session.user)
        fetchProfile(session.user.id)
      } else if (!session) {
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  async function fetchProfile(userId) {
    if (!supabase) { setLoading(false); return }
    try {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle()
      setProfile(data ?? null)
    } catch (e) {
      console.error('[Auth] fetchProfile error:', e)
    } finally {
      setLoading(false)
    }
  }

  async function signInWithGoogle() {
    if (!supabase) return
    const redirectTo = window.location.hostname === 'localhost'
      ? 'http://localhost:5173/'
      : 'https://alexgrd87.github.io/dislyte-guide/'
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo },
    })
    if (error) console.error('[Auth] Google error:', error.message)
  }

  async function signInWithDiscord() {
    if (!supabase) return
    const redirectTo = window.location.hostname === 'localhost'
      ? 'http://localhost:5173/'
      : 'https://alexgrd87.github.io/dislyte-guide/'
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'discord',
      options: { redirectTo },
    })
    if (error) console.error('[Auth] Discord error:', error.message)
  }

  async function signOut() {
    if (!supabase) return
    await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider value={{
      user, profile, loading,
      signInWithGoogle, signInWithDiscord, signOut,
      isConfigured: SUPABASE_CONFIGURED,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
