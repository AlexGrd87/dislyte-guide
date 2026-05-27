import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabase.js'
import { useAuth } from '../context/AuthContext.jsx'

export function useBuilds() {
  const { user } = useAuth()
  const [builds, setBuilds]   = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!user || !supabase) { setBuilds([]); return }
    setLoading(true)
    supabase
      .from('user_builds')
      .select('*')
      .eq('user_id', user.id)
      .then(({ data }) => { setBuilds(data || []); setLoading(false) })
  }, [user])

  const getBuildsForEsper = useCallback((esperId) =>
    builds.filter(b => b.esper_id === esperId)
  , [builds])

  const saveBuild = useCallback(async (buildData) => {
    if (!user || !supabase) return null
    const payload = { ...buildData, user_id: user.id }
    if (payload.id) {
      const { data } = await supabase
        .from('user_builds')
        .update(payload)
        .eq('id', payload.id)
        .eq('user_id', user.id)
        .select()
        .single()
      setBuilds(prev => prev.map(b => b.id === data.id ? data : b))
      return data
    } else {
      const { data } = await supabase
        .from('user_builds')
        .insert(payload)
        .select()
        .single()
      setBuilds(prev => [...prev, data])
      return data
    }
  }, [user])

  const deleteBuild = useCallback(async (buildId) => {
    if (!user || !supabase) return
    await supabase.from('user_builds').delete().eq('id', buildId).eq('user_id', user.id)
    setBuilds(prev => prev.filter(b => b.id !== buildId))
  }, [user])

  return { builds, loading, getBuildsForEsper, saveBuild, deleteBuild }
}
