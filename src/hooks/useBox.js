import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabase.js'
import { useAuth } from '../context/AuthContext.jsx'

export function useBox() {
  const { user } = useAuth()
  const [box, setBox]         = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!user || !supabase) { setBox([]); return }
    setLoading(true)
    supabase
      .from('user_box')
      .select('*')
      .eq('user_id', user.id)
      .then(({ data }) => { setBox(data || []); setLoading(false) })
  }, [user])

  const getEsper = useCallback((esperId) =>
    box.find(e => e.esper_id === esperId) || null
  , [box])

  const upsertEsper = useCallback(async (esperId, fields = {}) => {
    if (!user || !supabase) return
    try {
      const payload = { user_id: user.id, esper_id: esperId, owned: true, ...fields }
      const { data, error } = await supabase
        .from('user_box')
        .upsert(payload, { onConflict: 'user_id,esper_id' })
        .select()
        .maybeSingle()
      if (error) { console.error('[useBox] upsertEsper error:', error.message); return }
      if (data) {
        setBox(prev => {
          const idx = prev.findIndex(e => e.esper_id === esperId)
          if (idx >= 0) { const n = [...prev]; n[idx] = data; return n }
          return [...prev, data]
        })
      }
    } catch (e) {
      console.error('[useBox] upsertEsper exception:', e)
    }
  }, [user])

  const setNotOwned = useCallback(async (esperId) => {
    if (!user || !supabase) return
    await supabase
      .from('user_box')
      .upsert({ user_id: user.id, esper_id: esperId, owned: false }, { onConflict: 'user_id,esper_id' })
    setBox(prev => prev.map(e => e.esper_id === esperId ? { ...e, owned: false } : e))
  }, [user])

  return { box, loading, getEsper, upsertEsper, setNotOwned }
}
