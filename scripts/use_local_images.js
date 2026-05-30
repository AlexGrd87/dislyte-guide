// Remplace les URLs DB par les images locales trouvées dans public/images/espers/
// Usage : node scripts/use_local_images.js
import { createClient } from '@supabase/supabase-js'
import { existsSync } from 'fs'
import { join } from 'path'

const supabase = createClient(
  'https://ogxwqebkwyharrrjoyep.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

const BASE_URL  = 'https://alexgrd87.github.io/dislyte-guide/images/espers'
const LOCAL_DIR = 'public/images/espers'

// Espers concernés + extensions acceptées
const ESPERS = ['arthur', 'gorath', 'ivana', 'andreas', 'meta-mona']
const EXTS   = ['.jpg', '.jpeg', '.png', '.webp']

console.log('🔍 Scan de', LOCAL_DIR, '...\n')

let updated = 0, skipped = 0

for (const id of ESPERS) {
  let found = null

  // Chercher le fichier avec n'importe quelle extension
  for (const ext of EXTS) {
    const path = join(LOCAL_DIR, id + ext)
    if (existsSync(path)) { found = id + ext; break }
  }

  if (!found) {
    console.log(`⏭️  ${id.padEnd(12)} — fichier introuvable (mets ${id}.jpg dans ${LOCAL_DIR})`)
    skipped++
    continue
  }

  const url = `${BASE_URL}/${found}`
  const { error } = await supabase.from('espers').update({ image: url }).eq('id', id)

  if (error) { console.error(`❌ ${id}:`, error.message) }
  else { console.log(`✅ ${id.padEnd(12)} → ${url}`); updated++ }
}

console.log(`\n📊 ${updated} mis à jour | ${skipped} fichiers manquants`)
if (skipped > 0) console.log('   → Ajoute les fichiers manquants dans', LOCAL_DIR, 'puis relance ce script.')
