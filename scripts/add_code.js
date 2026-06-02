#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════
// Script : Ajouter / mettre à jour un code cadeau Dislyte
// Usage  : node scripts/add_code.js
// ═══════════════════════════════════════════════════════════════

import { createClient } from '@supabase/supabase-js'
import readline from 'readline'

const SUPABASE_URL      = 'https://ogxwqebkwyharrrjoyep.supabase.co'
const SERVICE_ROLE_KEY  = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9neHdxZWJrd3loYXJycmpveWVwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTg2OTkwOCwiZXhwIjoyMDk1NDQ1OTA4fQ.RLW-iDfY92PlJVuEIBe1SuGx7pfl2tr9j_mgpLollYA'

const sb = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, { auth: { persistSession: false } })

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const ask = (q) => new Promise(resolve => rl.question(q, resolve))

async function main() {
  console.log('\n🎁  AJOUT / MISE À JOUR D\'UN CODE CADEAU DISLYTE\n')

  // ── Commande rapide en argument : node scripts/add_code.js CODE "récompenses" "2026-07-01" ──
  if (process.argv[2]) {
    const code      = process.argv[2]
    const rewards   = process.argv[3] || 'Récompenses exclusives'
    const expiresAt = process.argv[4] ? new Date(process.argv[4]).toISOString() : null
    const notes     = process.argv[5] || ''
    await upsert({ code, rewards, expires_at: expiresAt, is_active: true, notes })
    rl.close()
    return
  }

  // ── Mode interactif ──
  const code      = (await ask('Code        : ')).trim()
  if (!code) { console.log('Code vide, abandon.'); rl.close(); return }

  const rewards   = (await ask('Récompenses : ')).trim() || 'Récompenses exclusives'
  const expiry    = (await ask('Expire le   : (ex: 2026-07-15, laisser vide si inconnu) ')).trim()
  const notes     = (await ask('Notes       : (optionnel) ')).trim()
  const activeStr = (await ask('Actif ?     : [O/n] ')).trim().toLowerCase()
  const is_active = activeStr !== 'n'

  const expires_at = expiry ? new Date(expiry + 'T23:59:59Z').toISOString() : null

  rl.close()
  await upsert({ code, rewards, expires_at, is_active, notes })
}

async function upsert(payload) {
  console.log('\n📤 Envoi vers Supabase...')
  console.table(payload)

  const { data, error } = await sb
    .from('gift_codes')
    .upsert([payload], { onConflict: 'code' })
    .select()

  if (error) {
    console.error('❌ Erreur :', error.message)
    process.exit(1)
  }

  console.log(`\n✅ Code "${data[0].code}" ${data[0].is_active ? 'ACTIF' : 'inactif'} enregistré en base.`)

  // Afficher tous les codes actifs
  const { data: actifs } = await sb.from('gift_codes').select('code, expires_at').eq('is_active', true)
  if (actifs?.length) {
    console.log('\n📋 Codes actifs en DB :')
    actifs.forEach(c => console.log(`  • ${c.code}${c.expires_at ? ' — expire le ' + new Date(c.expires_at).toLocaleDateString('fr-FR') : ''}`))
  }
}

// ── Commande rapide : désactiver un code ──
// node scripts/add_code.js --expire CODE
if (process.argv[2] === '--expire') {
  const code = process.argv[3]
  if (!code) { console.error('Usage: node scripts/add_code.js --expire CODE'); process.exit(1) }
  const sb2 = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, { auth: { persistSession: false } })
  const { error } = await sb2.from('gift_codes').update({ is_active: false }).eq('code', code)
  if (error) console.error('❌', error.message)
  else console.log(`✅ Code "${code}" marqué expiré.`)
  process.exit(0)
}

main().catch(e => { console.error(e); process.exit(1) })
