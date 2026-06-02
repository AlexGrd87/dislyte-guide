import { useState, useCallback } from 'react'

const KEY = 'dislyte-favorites'

function load() {
  try { return new Set(JSON.parse(localStorage.getItem(KEY) || '[]')) }
  catch { return new Set() }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState(load)

  const toggle = useCallback((id) => {
    setFavorites(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      localStorage.setItem(KEY, JSON.stringify([...next]))
      return next
    })
  }, [])

  const isFav = useCallback((id) => favorites.has(id), [favorites])

  return { favorites, toggle, isFav, count: favorites.size }
}
