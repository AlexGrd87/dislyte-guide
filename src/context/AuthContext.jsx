import { createContext, useContext, useEffect, useState } from 'react'
import { supabase, SUPABASE_CONFIGURED } from '../lib/supabase.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true) // toujours true au départ

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }

    // onAuthStateChange est la seule source de vérité dans Supabase v2.
    // Il se déclenche automatiquement :
    //   - avec INITIAL_SESSION au montage (session existante ou nulle)
    //   - avec SIGNED_IN après l'échange du code PKCE venant du redirect OAuth
    //   - avec SIGNED_OUT à la déconnexion
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        await fetchProfile(session.user.id)
      } else {
        setProfile(null)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  async function fetchProfile(userId) {
    if (!supabase) { setLoading(false); return }
    try {
      // maybeSingle() ne plante pas si aucune ligne n'existe (contrairement à single())
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
