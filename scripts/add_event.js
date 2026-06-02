#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════
// Script : Ajouter / mettre à jour un événement Dislyte
// Usage  : node scripts/add_event.js
// Rapide : node scripts/add_event.js "Titre" "Description" event "Récompenses" "2026-07-01" "2026-07-15"
// Expirer: node scripts/add_event.js --expire <id>
// Liste  : node scripts/add_event.js --list
// ═══════════════════════════════════════════════════════════════

import { createClient } from '@supabase/supabase-js'
import readline from 'readline'

const SUPABASE_URL     = 'https://ogxwqebkwyharrrjoyep.supabase.co'
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9neHdxZWJrd3loYXJycmpveWVwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTg2OTkwOCwiZXhwIjoyMDk1NDQ1OTA4fQ.RLW-iDfY92PlJVuEIBe1SuGx7pfl2tr9j_mgpLollYA'
const TYPES = ['event', 'banner', 'challenge', 'login']
const sb = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, { auth: { persistSession: false } })
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const ask = (q) => new Promise(r => rl.question(q, r))

// ── --list ──────────────────────────────────────────────────────────────────
if (process.argv[2] === '--list') {
  const { data } = await sb.from('events').select('id, title, type, end_date, is_active').order('end_date')
  console.log('\n📋 Événements en DB :\n')
  data?.forEach(e => {
    const status = e.is_active ? '✅' : '❌'
    const expire = e.end_date ? new Date(e.end_date).toLocaleDateString('fr-FR') : 'sans limite'
    console.log(`  ${status} [${e.type}] ${e.title} — expire ${expire}`)
    console.log(`     ID : ${e.id}\n`)
  })
  process.exit(0)
}

// ── --expire <id> ────────────────────────────────────────────────────────────
if (process.argv[2] === '--expire') {
  const id = process.argv[3]
  if (!id) { console.error('Usage: node scripts/add_event.js --expire <id>'); process.exit(1) }
  const { error } = await sb.from('events').update({ is_active: false }).eq('id', id)
  if (error) console.error('❌', error.message)
  else console.log(`✅ Événement ${id} marqué inactif.`)
  process.exit(0)
}

// ── Mode rapide (args) ──────────────────────────────────────────────────────
if (process.argv[2] && process.argv[2] !== '--') {
  const [,, title, description, type, rewards, start_date, end_date] = process.argv
  await upsert({
    title,
    description: description || '',
    type: TYPES.includes(type) ? type : 'event',
    rewards: rewards || '',
    start_date: start_date ? new Date(start_date).toISOString() : null,
    end_date: end_date ? new Date(end_date + 'T23:59:59Z').toISOString() : null,
    is_active: true,
  })
  rl.close(); process.exit(0)
}

// ── Mode interactif ─────────────────────────────────────────────────────────
console.log('\n🎉  AJOUT D\'UN ÉVÉNEMENT DISLYTE\n')
const title       = (await ask('Titre        : ')).trim()
if (!title) { console.log('Titre vide.'); rl.close(); process.exit(0) }
const description = (await ask('Description  : ')).trim()
const typeRaw     = (await ask(`Type [${TYPES.join('/')}] : `)).trim()
const type        = TYPES.includes(typeRaw) ? typeRaw : 'event'
const rewards     = (await ask('Récompenses  : ')).trim()
const startRaw    = (await ask('Début        : (ex: 2026-07-01, vide = maintenant) ')).trim()
const endRaw      = (await ask('Fin          : (ex: 2026-07-15, vide = sans limite) ')).trim()

rl.close()
await upsert({
  title,
  description,
  type,
  rewards,
  start_date: startRaw ? new Date(startRaw).toISOString() : new Date().toISOString(),
  end_date: endRaw ? new Date(endRaw + 'T23:59:59Z').toISOString() : null,
  is_active: true,
})

async function upsert(payload) {
  console.log('\n📤 Envoi vers Supabase...')
  const { data, error } = await sb.from('events').insert([payload]).select()
  if (error) { console.error('❌', error.message); process.exit(1) }
  console.log(`\n✅ Événement "${data[0].title}" créé (${data[0].type})`)
  const { data: actifs } = await sb.from('events').select('title, end_date, type').eq('is_active', true).order('end_date')
  if (actifs?.length) {
    console.log('\n📋 Événements actifs :')
    actifs.forEach(e => console.log(`  • [${e.type}] ${e.title}${e.end_date ? ' — ' + new Date(e.end_date).toLocaleDateString('fr-FR') : ''}`))
  }
}
