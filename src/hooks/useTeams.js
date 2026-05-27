import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabase.js'
import { useAuth } from '../context/AuthContext.jsx'

export function useTeams() {
  const { user } = useAuth()
  const [teams, setTeams]     = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!user || !supabase) { setTeams([]); return }
    setLoading(true)
    supabase
      .from('user_teams')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data }) => { setTeams(data || []); setLoading(false) })
  }, [user])

  const saveTeam = useCallback(async (teamData) => {
    if (!user || !supabase) return null
    const payload = { ...teamData, user_id: user.id }
    if (payload.id) {
      const { data } = await supabase
        .from('user_teams')
        .update(payload)
        .eq('id', payload.id)
        .eq('user_id', user.id)
        .select()
        .single()
      setTeams(prev => prev.map(t => t.id === data.id ? data : t))
      return data
    } else {
      const { data } = await supabase
        .from('user_teams')
        .insert(payload)
        .select()
        .single()
      setTeams(prev => [data, ...prev])
      return data
    }
  }, [user])

  const deleteTeam = useCallback(async (teamId) => {
    if (!user || !supabase) return
    await supabase.from('user_teams').delete().eq('id', teamId).eq('user_id', user.id)
    setTeams(prev => prev.filter(t => t.id !== teamId))
  }, [user])

  return { teams, loading, saveTeam, deleteTeam }
}
