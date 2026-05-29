import { createContext, useContext, useEffect, useState } from 'react'
import { supabase, SUPABASE_CONFIGURED } from '../lib/supabase.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(SUPABASE_CONFIGURED) // false si pas configuré

  useEffect(() => {
    if (!supabase) return // Supabase non configuré, on reste déconnecté

    // Session initiale
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) fetchProfile(session.user.id)
      else setLoading(false)
    })

    // Listener changements d'auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) fetchProfile(session.user.id)
      else { setProfile(null); setLoading(false) }
    })
    return () => subscription.unsubscribe()
  }, [])

  async function fetchProfile(userId) {
    if (!supabase) return
    const { data } = await supabase.from('profiles').select('*').eq('id', userId).single()
    setProfile(data)
    setLoading(false)
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
