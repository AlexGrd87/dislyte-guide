import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase.js'

const EspersContext = createContext({ espers: [], loading: true, error: null })

export function EspersProvider({ children }) {
  const [espers, setEspers]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }

    // Defer fetch hors du main thread initial pour ne pas bloquer FCP
    const timer = setTimeout(() => {
    supabase
      .from('espers')
      .select('*')
      .order('tier', { ascending: true })
      .then(({ data, error }) => {
        if (error) {
          console.error('[EspersContext]', error.message)
          setError(error.message)
        } else {
          // Renommer relic_build → relicBuild pour cohérence avec l'ancien code
          setEspers(data.map(e => ({
            ...e,
            relicBuild: e.relic_build,
          })))
        }
        setLoading(false)
      })
    }, 0)
    return () => clearTimeout(timer)
  }, [])

  return (
    <EspersContext.Provider value={{ espers, loading, error }}>
      {children}
    </EspersContext.Provider>
  )
}

export function useEspers() {
  return useContext(EspersContext)
}

// Helper : filtre par élément
export function useEspersByElement(element) {
  const { espers } = useEspers()
  return espers.filter(e => e.element === element)
}

// Helper : filtre par rôle
export function useEspersByRole(role) {
  const { espers } = useEspers()
  return espers.filter(e => e.role === role)
}

// Helper : filtre par tier
export function useEspersByTier(tier) {
  const { espers } = useEspers()
  return espers.filter(e => e.tier === tier)
}

// Helper : récupère un esper par id
export function useEsperById(id) {
  const { espers } = useEspers()
  return espers.find(e => e.id === id) || null
}
