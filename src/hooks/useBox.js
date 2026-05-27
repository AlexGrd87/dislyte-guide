import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabase.js'
import { useAuth } from '../context/AuthContext.jsx'

export function useBox() {
  const { user } = useAuth()
  const [box, setBox]       = useState([])   // [{ esper_id, owned, stars, ascension, resonance, lvl }]
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!user) { setBox([]); return }
    setLoading(true)
    supabase
      .from('user_box')
      .select('*')
      .eq('user_id', user.id)
      .then(({ data }) => { setBox(data || []); setLoading(false) })
  }, [user])

  /** Retourne la fiche box d'un esper (ou null) */
  const getEsper = useCallback((esperId) =>
    box.find(e => e.esper_id === esperId) || null
  , [box])

  /** Ajoute ou met à jour un Esper dans la box */
  const upsertEsper = useCallback(async (esperId, fields = {}) => {
    if (!user) return
    const payload = { user_id: user.id, esper_id: esperId, owned: true, ...fields }
    const { data } = await supabase
      .from('user_box')
      .upsert(payload, { onConflict: 'user_id,esper_id' })
      .select()
      .single()
    setBox(prev => {
      const idx = prev.findIndex(e => e.esper_id === esperId)
      if (idx >= 0) { const n = [...prev]; n[idx] = data; return n }
      return [...prev, data]
    })
  }, [user])

  /** Marque un Esper comme non-possédé (sans supprimer) */
  const setNotOwned = useCallback(async (esperId) => {
    if (!user) return
    await supabase
      .from('user_box')
      .upsert({ user_id: user.id, esper_id: esperId, owned: false }, { onConflict: 'user_id,esper_id' })
    setBox(prev => prev.map(e => e.esper_id === esperId ? { ...e, owned: false } : e))
  }, [user])

  return { box, loading, getEsper, upsertEsper, setNotOwned }
}
