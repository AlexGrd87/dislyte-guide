import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

// Si les credentials ne sont pas configurés, on exporte null
// Les hooks vérifient supabase !== null avant d'appeler l'API
export const supabase = (url && key) ? createClient(url, key) : null
export const SUPABASE_CONFIGURED = !!(url && key)
