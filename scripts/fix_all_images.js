// Mise à jour complète de toutes les images vers Fandom CDN officiel
// URLs 100% vérifiées via API MediaWiki Fandom (pas de MD5 calculés)
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://ogxwqebkwyharrrjoyep.supabase.co'
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const BASE = 'https://static.wikia.nocookie.net/dislyte/images'

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
})

// Toutes les URLs vérifiées via API Fandom (action=query&prop=imageinfo)
const IMAGE_MAP = {
  'abigail':       `${BASE}/8/83/Abigail_avatar.png/revision/latest`,
  'ahmed':         `${BASE}/d/df/Ahmed_avatar.png/revision/latest`,
  'alexa':         `${BASE}/f/f2/Alexa_avatar.png/revision/latest`,
  'alice':         `${BASE}/b/b4/Alice_avatar.png/revision/latest`,
  'anesidora':     `${BASE}/a/a2/Anesidora_avatar.png/revision/latest`,
  'arcana':        `${BASE}/f/fb/Arcana_avatar.png/revision/latest`,
  'asenath':       `${BASE}/5/51/Asenath_avatar.png/revision/latest`,
  'ashley':        `${BASE}/5/5c/Ashley_avatar.png/revision/latest`,
  'aurelius':      `${BASE}/c/cc/Aurelius_avatar.png/revision/latest`,
  'bai-liuli':     `${BASE}/3/30/Bai_Liuli_avatar.png/revision/latest`,
  'bardon':        `${BASE}/4/4c/Bardon_avatar.png/revision/latest`,
  'berenice':      `${BASE}/a/ab/Berenice_avatar.png/revision/latest`,
  'biondina':      `${BASE}/7/7a/Biondina_avatar.png/revision/latest`,
  'bonnie':        `${BASE}/2/25/Bonnie_avatar.png/revision/latest`,
  'brewster':      `${BASE}/e/e8/Brewster_avatar.png/revision/latest`,
  'brynn':         `${BASE}/c/c5/Brynn_avatar.png/revision/latest`,
  'cang-ji':       `${BASE}/b/b8/Cang_Ji_avatar.png/revision/latest`,
  'catherine':     `${BASE}/3/31/Catherine_avatar.png/revision/latest`,
  'cecilia':       `${BASE}/e/e1/Cecilia_avatar.png/revision/latest`,
  'celine':        `${BASE}/0/04/Celine_avatar.png/revision/latest`,
  'chalmers':      `${BASE}/8/88/Chalmers_avatar.png/revision/latest`,
  'chang-pu':      `${BASE}/f/f7/Chang_Pu_avatar.png/revision/latest`,
  'chloe':         `${BASE}/5/57/Chloe_avatar.png/revision/latest`,
  'clara':         `${BASE}/f/f0/Clara_avatar.png/revision/latest`,
  'david':         `${BASE}/7/7c/David_avatar.png/revision/latest`,
  'daylon':        `${BASE}/3/3d/Daylon_avatar.png/revision/latest`,
  'dhalia':        `${BASE}/5/56/Dhalia_avatar.png/revision/latest`,
  'djoser':        `${BASE}/f/f3/Djoser_avatar.png/revision/latest`,
  'donar':         `${BASE}/0/0d/Donar_avatar.png/revision/latest`,
  'drew':          `${BASE}/9/98/Drew_avatar.png/revision/latest`,
  'eira':          `${BASE}/6/6f/Eira_avatar.png/revision/latest`,
  'elaine':        `${BASE}/c/c1/Elaine_avatar.png/revision/latest`,
  'elliot':        `${BASE}/6/66/Elliot_avatar.png/revision/latest`,
  'ethan':         `${BASE}/9/91/Ethan_avatar.png/revision/latest`,
  'everett':       `${BASE}/d/db/Everett_avatar.png/revision/latest`,
  'fabrice':       `${BASE}/b/bc/Fabrice_avatar.png/revision/latest`,
  'falken':        `${BASE}/7/7e/Falken_avatar.png/revision/latest`,
  'farrah':        `${BASE}/c/cd/Farrah_avatar.png/revision/latest`,
  'fatum-sisters': `${BASE}/6/6e/Fatum_Sisters_avatar.png/revision/latest`,
  'feng-nuxi':     `${BASE}/5/53/Feng_Nuxi_avatar.png/revision/latest`,
  'freddy':        `${BASE}/5/59/Freddy_avatar.png/revision/latest`,
  'gabrielle':     `${BASE}/7/79/Gabrielle_avatar.png/revision/latest`,
  'gaius':         `${BASE}/f/fe/Gaius_avatar.png/revision/latest`,
  'hall':          `${BASE}/a/a3/Hall_avatar.png/revision/latest`,
  'helena':        `${BASE}/1/18/Helena_avatar.png/revision/latest`,
  'heng-yue':      `${BASE}/d/de/Heng_Yue_avatar.png/revision/latest`,
  'hyde':          `${BASE}/e/e4/Hyde_avatar.png/revision/latest`,
  'ife':           `${BASE}/b/b5/Ife_avatar.png/revision/latest`,
  'intisar':       `${BASE}/1/15/Intisar_avatar.png/revision/latest`,
  'jacob':         `${BASE}/6/6a/Jacob_avatar.png/revision/latest`,
  'jeanne':        `${BASE}/c/cb/Jeanne_avatar.png/revision/latest`,
  'jiang-jiuli':   `${BASE}/a/af/Jiang_Jiuli_avatar.png/revision/latest`,
  'jiang-man':     `${BASE}/a/a4/Jiang_Man_avatar.png/revision/latest`,
  'jin-yuyao':     `${BASE}/b/b7/Jin_Yuyao_avatar.png/revision/latest`,
  'kara':          `${BASE}/a/a0/Kara_avatar.png/revision/latest`,
  'kaylee':        `${BASE}/3/39/Kaylee_avatar.png/revision/latest`,
  'laura':         `${BASE}/2/23/Laura_avatar.png/revision/latest`,
  'lauren':        `${BASE}/4/45/Lauren_avatar.png/revision/latest`,
  'layla':         `${BASE}/8/81/Layla_avatar.png/revision/latest`,
  'leon':          `${BASE}/6/67/Leon_avatar.png/revision/latest`,
  'lewis':         `${BASE}/5/52/Lewis_avatar.png/revision/latest`,
  'li-ao':         `${BASE}/a/ad/Li_Ao_avatar.png/revision/latest`,
  'li-guang':      `${BASE}/9/93/Li_Guang_avatar.png/revision/latest`,
  'li-ling':       `${BASE}/6/6c/Li_Ling_avatar.png/revision/latest`,
  'lian':          `${BASE}/c/cf/Lian_avatar.png/revision/latest`,
  'lin-xiao':      `${BASE}/b/ba/Lin_Xiao_avatar.png/revision/latest`,
  'long-mian':     `${BASE}/5/5a/Long_Mian_avatar.png/revision/latest`,
  'lu-yi':         `${BASE}/e/e2/Lu_Yi_avatar.png/revision/latest`,
  'lucas':         `${BASE}/7/7e/Lucas_avatar.png/revision/latest`,
  'luo-yan':       `${BASE}/1/16/Luo_Yan_avatar.png/revision/latest`,
  'lynn':          `${BASE}/a/aa/Lynn_avatar.png/revision/latest`,
  'melanie':       `${BASE}/5/59/Melanie_avatar.png/revision/latest`,
  'meredith':      `${BASE}/6/69/Meredith_avatar.png/revision/latest`,
  'mona':          `${BASE}/f/f2/Mona_avatar.png/revision/latest`,
  'narmer':        `${BASE}/e/e9/Narmer_avatar.png/revision/latest`,
  'nick':          `${BASE}/2/2a/Nick_avatar.png/revision/latest`,
  'nicole':        `${BASE}/8/8f/Nicole_avatar.png/revision/latest`,
  'odette':        `${BASE}/0/0c/Odette_avatar.png/revision/latest`,
  'ollie':         `${BASE}/2/21/Ollie_avatar.png/revision/latest`,
  'ophelia':       `${BASE}/c/c9/Ophelia_avatar.png/revision/latest`,
  'pritzker':      `${BASE}/9/97/Pritzker_avatar.png/revision/latest`,
  'q':             `${BASE}/3/39/Q_avatar.png/revision/latest`,
  'raven':         `${BASE}/f/fe/Raven_avatar.png/revision/latest`,
  'ren-si':        `${BASE}/a/a7/Ren_Si_avatar.png/revision/latest`,
  'sally':         `${BASE}/0/0f/Sally_avatar.png/revision/latest`,
  'sander':        `${BASE}/3/3b/Sander_avatar.png/revision/latest`,
  'sienna':        `${BASE}/f/f5/Sienna_avatar.png/revision/latest`,
  'stewart':       `${BASE}/a/aa/Stewart_avatar.png/revision/latest`,
  'tang-xuan':     `${BASE}/b/bf/Tang_Xuan_avatar.png/revision/latest`,
  'tang-yun':      `${BASE}/a/a0/Tang_Yun_avatar.png/revision/latest`,
  'taylor':        `${BASE}/7/70/Taylor_avatar.png/revision/latest`,
  'tevor':         `${BASE}/3/3d/Tevor_avatar.png/revision/latest`,
  'tiye':          `${BASE}/8/80/Tiye_avatar.png/revision/latest`,
  'triki':         `${BASE}/9/99/Triki_avatar.png/revision/latest`,
  'unas':          `${BASE}/7/7a/Unas_avatar.png/revision/latest`,
  'unky-chai':     `${BASE}/5/51/Unky_Chai_avatar.png/revision/latest`,
  'xiao-yin':      `${BASE}/9/94/Xiao_Yin_avatar.png/revision/latest`,
  'xie-chuyi':     `${BASE}/f/fc/Xie_Chuyi_avatar.png/revision/latest`,
  'xie-yuzhi':     `${BASE}/1/19/Xie_Yuzhi_avatar.png/revision/latest`,
  'yamato':        `${BASE}/b/b2/Yamato_avatar.png/revision/latest`,
  'ye-suhua':      `${BASE}/8/84/Ye_Suhua_avatar.png/revision/latest`,
  'yun-chuan':     `${BASE}/7/72/Yun_Chuan_avatar.png/revision/latest`,
  'zelmer':        `${BASE}/9/9d/Zelmer_avatar.png/revision/latest`,
  'zhong-nan':     `${BASE}/d/d8/Zhong_Nan_avatar.png/revision/latest`,
  'zora':          `${BASE}/b/b3/Zora_avatar.png/revision/latest`,
}

console.log(`🔧 Mise à jour de ${Object.keys(IMAGE_MAP).length} images vers Fandom CDN...`)

let ok = 0, fail = 0
for (const [id, url] of Object.entries(IMAGE_MAP)) {
  const { error } = await supabase
    .from('espers')
    .update({ image: url })
    .eq('id', id)
  if (error) { console.error(`❌ ${id}: ${error.message}`); fail++ }
  else { process.stdout.write('.'); ok++ }
}

console.log(`\n\n✅ ${ok} images mises à jour | ❌ ${fail} erreurs`)

// Compter les espers encore sans Fandom CDN
const { count } = await supabase
  .from('espers')
  .select('image', { count: 'exact', head: true })
  .not('image', 'ilike', '%wikia.nocookie%')
console.log(`📊 Espers encore sans image Fandom CDN : ${count}`)
