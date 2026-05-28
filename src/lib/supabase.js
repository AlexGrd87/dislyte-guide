import { createClient } from '@supabase/supabase-js'

// La clé anon est publique par design — elle est visible côté client dans toutes les apps Supabase
const url = import.meta.env.VITE_SUPABASE_URL || 'https://ogxwqebkwyharrrjoyep.supabase.co'
const key = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9neHdxZWJrd3loYXJycmpveWVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4Njk5MDgsImV4cCI6MjA5NTQ0NTkwOH0.XZVGMSItXSH3Wzk1_bu7Du8-NQI-dCgrd4VDeJXPvDM'

export const supabase = createClient(url, key)
export const SUPABASE_CONFIGURED = true
