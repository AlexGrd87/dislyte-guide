// Correction images + ajout Arthur via service role key
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://ogxwqebkwyharrrjoyep.supabase.co'
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
})

// --- 1. Corrections d'images (URLs cassées → URLs correctes) ---
const imagesFixes = [
  // Jin-Hee : 'h' minuscule dans le fichier Fandom
  {
    id: 'jin-hee',
    image: 'https://static.wikia.nocookie.net/dislyte/images/e/ea/Jin-hee_avatar.png/revision/latest'
  },
  // Meta espers : format {Name}_Awakening_avatar.png (pas Meta_{Name}_avatar.png)
  {
    id: 'meta-mona',
    image: 'https://static.wikia.nocookie.net/dislyte/images/2/26/Mona_Awakening.png/revision/latest'
  },
  {
    id: 'meta-freddy',
    image: 'https://static.wikia.nocookie.net/dislyte/images/e/e8/Freddy_Awakening_avatar.png/revision/latest'
  },
  {
    id: 'meta-li-ling',
    image: 'https://static.wikia.nocookie.net/dislyte/images/8/88/Li_Ling_Awakening_avatar.png/revision/latest'
  },
  {
    id: 'meta-ollie',
    image: 'https://static.wikia.nocookie.net/dislyte/images/d/dd/Ollie_Awakening_avatar.png/revision/latest'
  },
  {
    id: 'meta-drew',
    image: 'https://static.wikia.nocookie.net/dislyte/images/3/3a/Drew_Awakening_avatar.png/revision/latest'
  },
  {
    id: 'meta-alexa',
    image: 'https://static.wikia.nocookie.net/dislyte/images/1/14/Alexa_Awakening_avatar.png/revision/latest'
  },
]

// --- 2. Nouvel esper Arthur (Taranis) ---
const arthur = {
  id:          'arthur',
  name:        'Arthur',
  image:       'https://static.wikia.nocookie.net/dislyte/images/5/50/Arthur.png/revision/latest',
  divinity:    'Taranis',
  element:     'umbra',
  role:        'dps',
  tier:        'SS',
  rarity:      5,
  description: "DPS Ombre Légendaire inspiré de Taranis, dieu celte du tonnerre et de la foudre. Premier esper du panthéon celtique (patch v3.4.41). Arthur inflige des dégâts AoE massifs via Transmission, attaque 5 fois aléatoirement en priorisant les ennemis non touchés, et ses dégâts scalent sur sa VIT grâce à Flashbolt. Gagne Trailblazer au début du combat et applique Transmission à 2 cibles. Redoutable en farming et en boss multi-ennemis.",
  relic_build: {
    primary: { set4: 'wind', set2: 'recurve', label: 'Vent + Incandescence' },
    alt:     { set4: 'foudre', set2: 'recurve', label: 'Foudre + Incandescence' },
    mainStats: { ring: 'Taux de Crit', helmet: 'ATQ%', boots: 'VIT' },
    substats: ['VIT', 'Taux de Crit', 'ATQ%', 'Dégâts Crit'],
    notes: 'Ses dégâts scalent sur la VIT — VIT est la stat numéro 1. Vent (+25% VIT) est le set optimal. Taux de Crit ≥ 80%, puis ATQ% et Dégâts Crit.'
  },
  synergies: ['gabrielle', 'lu-shang', 'wu-you'],
  modes:     { story: 'SS', kronos: 'A', apep: 'SS', fafnir: 'S', pvp: 'S' },
  captain:   null,
}

// --- Exécution ---
console.log('🔧 Correction des images...')
for (const fix of imagesFixes) {
  const { error } = await supabase
    .from('espers')
    .update({ image: fix.image })
    .eq('id', fix.id)
  if (error) console.error(`❌ ${fix.id}:`, error.message)
  else console.log(`✅ ${fix.id} → image corrigée`)
}

console.log('\n⚔️  Ajout d\'Arthur...')
const { error: arthurErr } = await supabase
  .from('espers')
  .upsert(arthur, { onConflict: 'id' })
if (arthurErr) console.error('❌ Arthur:', arthurErr.message)
else console.log('✅ Arthur (Taranis) ajouté')

// Vérification du total
const { count } = await supabase
  .from('espers')
  .select('id', { count: 'exact', head: true })
console.log(`\n📊 Total espers en DB : ${count}`)
