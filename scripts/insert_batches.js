// Script d'insertion des batches 10-14 via Supabase service role key
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const SUPABASE_URL = 'https://ogxwqebkwyharrrjoyep.supabase.co'
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SERVICE_ROLE_KEY) {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY manquant')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
})

function extractJson(sqlContent) {
  const match = sqlContent.match(/\$\$([\s\S]+?)\$\$\s*\)\s*AS/)
  if (!match) throw new Error('JSON non trouvé dans le SQL')
  return JSON.parse(match[1].trim())
}

function toDbRow(e) {
  return {
    id:          e.id,
    name:        e.name,
    image:       e.image ?? null,
    divinity:    e.divinity,
    element:     e.element,
    role:        e.role,
    tier:        e.tier,
    rarity:      e.rarity,
    description: e.description,
    relic_build: e.relicBuild ?? null,
    synergies:   e.synergies ?? [],
    modes:       e.modes ?? null,
    captain:     e.captain ?? null,
  }
}

async function insertBatch(file) {
  const content = readFileSync(file, 'utf-8')
  const espers = extractJson(content).map(toDbRow)

  const { error } = await supabase
    .from('espers')
    .upsert(espers, { onConflict: 'id' })

  if (error) {
    console.error(`❌ ${file} — erreur:`, error.message)
    return 0
  }
  console.log(`✅ ${file} — ${espers.length} espers insérés`)
  return espers.length
}

const batches = [
  'supabase/batch_10_espers.sql',
  'supabase/batch_11_espers.sql',
  'supabase/batch_12_espers.sql',
  'supabase/batch_13_espers.sql',
  'supabase/batch_14_espers.sql',
]

let total = 0
for (const b of batches) {
  total += await insertBatch(b)
}
console.log(`\n🎉 Total inséré : ${total} espers`)
