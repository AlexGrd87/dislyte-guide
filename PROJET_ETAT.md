# 📋 ÉTAT DU PROJET — Dislyte Guide FR
> Document de reprise pour session Claude vierge — Mai 2026

---

## 🔗 Liens essentiels

| Ressource | URL |
|-----------|-----|
| **GitHub repo** | https://github.com/AlexGrd87/dislyte-guide |
| **Site live (GitHub Pages)** | https://alexgrd87.github.io/dislyte-guide/ |
| **Supabase dashboard** | https://supabase.com/dashboard/project/ogxwqebkwyharrrjoyep |
| **Google Cloud Console** | https://console.cloud.google.com/auth/clients?project=braided-city-497610-q1 |
| **Discord Dev Portal** | https://discord.com/developers/applications/1509131976274219089/oauth2 |
| **Fichier local** | `C:\Users\User\Desktop\dislyte-guide-main` |

---

## 🛠️ Stack technique

| Élément | Détail |
|---------|--------|
| Framework | React 18 + Vite 5 |
| Auth / DB | Supabase (PostgreSQL) |
| Déploiement | **GitHub Actions** (push sur `main` → deploy automatique) |
| Routing | Hash-based (`/#espers`, `/#tierlist`, etc.) |
| CSS | Vanilla CSS variables (index.css) |
| Fonts | Google Fonts (display + UI) |

> ⚠️ **DÉPLOIEMENT** : TOUJOURS `git push origin main` — NE JAMAIS utiliser `npx gh-pages -d dist` (ça push sur la branche gh-pages qui est ignorée par GitHub Actions)

---

## 🗄️ Supabase — Credentials

```
Project ref  : ogxwqebkwyharrrjoyep
URL          : https://ogxwqebkwyharrrjoyep.supabase.co
Anon key     : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9neHdxZWJrd3loYXJycmpveWVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4Njk5MDgsImV4cCI6MjA5NTQ0NTkwOH0.XZVGMSItXSH3Wzk1_bu7Du8-NQI-dCgrd4VDeJXPvDM
```

> ⚠️ La clé anon est publique par design. Elle est hardcodée dans `src/lib/supabase.js`.

### Tables Supabase existantes

#### `public.espers` — 66 espers ✅
```sql
CREATE TABLE public.espers (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  image       TEXT,
  divinity    TEXT,
  element     TEXT NOT NULL,      -- flow | inferno | wind | umbra | shimmer
  role        TEXT NOT NULL,      -- dps | support | healer | controller | debuffer | defender | ap-controller
  tier        TEXT NOT NULL,      -- SS | S | A | B | C
  rarity      SMALLINT NOT NULL,  -- 3 | 4 | 5
  description TEXT,
  relic_build JSONB,              -- { primary, alt, mainStats, substats, notes }
  synergies   TEXT[],
  modes       JSONB,              -- { story, kronos, apep, fafnir, pvp }
  captain     TEXT
);
-- RLS activée, GRANT SELECT TO anon, authenticated
```

#### `public.profiles` — Profils utilisateurs
```sql
CREATE TABLE public.profiles (
  id         UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username   TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### `public.user_box`, `public.user_builds`, `public.user_teams` — données utilisateur
(voir ancien PROJET_ETAT pour DDL complet)

---

## 📁 Structure du projet

```
dislyte-guide/
├── src/
│   ├── App.jsx                    # Router hash + AuthProvider + EspersProvider
│   ├── components/
│   │   ├── Nav.jsx                # Barre de navigation + auth state
│   │   ├── EsperCard.jsx          # Carte esper (normal + compact)
│   │   └── AuthModal.jsx          # Modal login Google/Discord
│   ├── context/
│   │   ├── AuthContext.jsx        # ⚠️ Context auth — voir section Auth ci-dessous
│   │   └── EspersContext.jsx      # Context espers (fetch Supabase)
│   ├── data/
│   │   ├── espers.js              # ⚠️ N'exporte PLUS ESPERS — seulement ELEMENTS, ROLES, TIERS
│   │   ├── modes.js               # Données statiques modes de jeu
│   │   └── relics.js              # 24 sets de relics (12 x 4-pièces + 12 x 2-pièces)
│   ├── lib/
│   │   └── supabase.js            # Client Supabase — flowType: 'implicit' ⚠️
│   └── pages/
│       ├── Home.jsx, Espers.jsx, TierList.jsx, TeamBuilder.jsx
│       ├── MyBox.jsx, Relics.jsx, Modes.jsx
├── supabase/
│   ├── espers_seed.sql            # Seed initial (46 espers)
│   ├── batch_01_espers.sql        # ✅ Exécuté — 10 espers (56 total)
│   └── batch_02_espers.sql        # ✅ Exécuté — 10 espers (66 total)
├── .github/workflows/deploy.yml   # GitHub Actions — deploy sur push main
├── vite.config.js                 # base: '/dislyte-guide/' en prod
└── PROJET_ETAT.md                 # Ce fichier
```

---

## 🔐 Authentification — Architecture complète

### Providers OAuth configurés
- **Google** : ✅ App publiée (en production, tous les comptes Google peuvent se connecter)
- **Discord** : ✅ Activé dans Supabase + redirect URI configurée

### Supabase Auth — URL Configuration
- **Site URL** : `https://alexgrd87.github.io/dislyte-guide/`
- **Redirect URLs** : `https://alexgrd87.github.io/dislyte-guide/` + `http://localhost:5173/`

### Google Cloud Console (projet: braided-city-497610-q1)
- OAuth client : "Dislyte Guide" (Application Web)
- **Origines JS autorisées** : `https://alexgrd87.github.io`
- **URI de redirection** : `https://ogxwqebkwyharrrjoyep.supabase.co/auth/v1/callback`
- **Audience** : ✅ En production (plus en mode Test)

### Discord Developer Portal (App ID: 1509131976274219089)
- **Redirect URI** : `https://ogxwqebkwyharrrjoyep.supabase.co/auth/v1/callback` ✅

### src/lib/supabase.js — flowType IMPORTANT
```js
export const supabase = createClient(url, key, {
  auth: {
    flowType: 'implicit',       // ⚠️ PAS pkce — le PKCE perd le code_verifier sur GitHub Pages
    detectSessionInUrl: true,
    persistSession: true,
  }
})
```

### src/context/AuthContext.jsx — pattern correct
```js
// onAuthStateChange = source principale (gère tokens dans le hash avec implicit flow)
supabase.auth.onAuthStateChange((_event, session) => {
  setUser(session?.user ?? null)
  if (session?.user) fetchProfile(session.user.id)
  else { setProfile(null); setLoading(false) }
})

// getSession() = backup pour sessions déjà existantes
supabase.auth.getSession().then(({ data: { session } }) => {
  if (session?.user && !user) { setUser(session.user); fetchProfile(session.user.id) }
  else if (!session) setLoading(false)
})

// fetchProfile utilise maybeSingle() (pas single() qui plante si aucune ligne)
const { data } = await supabase.from('profiles').select('*').eq('id', userId).maybeSingle()
```

---

## 🧠 Architecture clé — Flux des données Espers

```js
// Dans n'importe quelle page :
import { useEspers } from '../context/EspersContext.jsx'

function MaPage() {
  const { espers: ESPERS, loading } = useEspers()

  // ⚠️ ESPERS obligatoire dans les deps de useMemo !
  const filtered = useMemo(() => ESPERS.filter(...), [ESPERS, ...autres])

  if (loading) return <div>Chargement…</div>
  return (...)
}
```

---

## 🎨 Système de couleurs

```js
// Rareté (EsperCard.jsx, TierList.jsx)
const RARITY_COLORS = { 3: '#38BDF8', 4: '#A855F7', 5: '#FFD200' }

// Tiers
const TIER_COLORS = { SS: '#FF2D87', S: '#FFD200', A: '#38BDF8', B: '#4ADE80', C: '#aaa' }
```

---

## 🚀 Commandes importantes

```bash
cd C:\Users\User\Desktop\dislyte-guide-main

npm run dev              # Dev local (localhost:5173)
npm run build            # Build prod (vérifie avant push)
git push origin main     # ← SEUL moyen de déployer (déclenche GitHub Actions)
```

---

## 📊 État des données — 130 Espers en DB

| Tier | Espers |
|------|--------|
| **SS** | Gaius, Clara, Unas, Lin Xiao, Gabrielle, Sander, Chloe, Sally, Li Ling, Meredith, Leora, Yuuhime |
| **S** | Abigail, Ashley, Dhalia, Asenath, Lucas, Alice, Raven, Ahmed, Ollie, Nicole, Ye Suhua, Narmer, Tiye, Tang Yun, Donar, Sienna, Fabrice, Li Guang, Drew, Lu Yi, Brewster, Tevor, Lian, Tang Xuan, Feng Nuxi, Yamato, Yun Chuan, Everett, Catherine, Intisar, Ren Si, Xiao Yin, Jin Yuyao, Ginny, Mateo, Valeria, Anna, Jin Qiu |
| **A** | Long Mian, Triki, Hyde, Ophelia, Jiang Jiuli, Heng Yue, Berenice, Lynn, Melanie, Bonnie, Cecilia, Cang Ji, Farrah, Elaine, Ife, Zora, Toland, Archibald, Mavis, Camille, Embla, Hilda, Javid, Norah, Xuan Pin, Koharu, Parmi, Ryota |
| **B** | Mona, Biondina, Daylon, Chang Pu, Leon, Ethan, Jiang Man, Adrina, Alolin, Emma, Mei, Ain, Uday |

### Batches SQL exécutés sur Supabase
- **batch_01** (29 Mai 2026) : Meredith, Cecilia, Lian, Tang Xuan, Ethan, Cang Ji, Farrah, Feng Nuxi, Yamato, Elaine
- **batch_02** (29 Mai 2026) : Yun Chuan, Everett, Ife, Catherine, Intisar, Ren Si, Xiao Yin, Jiang Man, Jin Yuyao, Zora
- **batch_03** (29 Mai 2026) : Elliot, Lewis, Fatum Sisters, Luo Yan, Pritzker, Celine, Kaylee, Eira, Jacob, Zhong Nan ✅
- **batch_04** (29 Mai 2026) : Xie Chuyi, Xie Yuzhi, Odette, Taylor, Nick, Bai Liuli, Aurelius, Kara, Jeanne, Chalmers ✅
- **batch_05** (29 Mai 2026) : Alexa, Anesidora, Djoser, Arcana, Bardon, Brynn, David, Falken, Hall, Freddy ✅
- **batch_06** (29 Mai 2026) : Helena, Laura, Lauren, Layla, Li Ao, Q, Stewart, Unky Chai, Zelmer ✅ (9 espers — dernière fournée playdislyte.com)
- **batch_07** (29 Mai 2026) : Leora, Ginny, Mateo, Yuuhime, Toland, Valeria, Anna, Archibald, Mavis, Jin Qiu ✅
- **batch_08** (29 Mai 2026) : Camille, Embla, Hilda, Javid, Norah, Xuan Pin, Koharu, Adrina, Alolin, Parmi ✅
- **batch_09** (29 Mai 2026) : Emma, Mei, Ain, Uday, Ryota ✅

> ⚠️ Règle absolue : TOUS les espers doivent avoir une image confirmée avant d'être inclus dans un batch.
> ⚠️ Espers sans image confirmée (404 sur toutes les variations testées) : Jin-Hee, Lu Shang, Hu Jie, Jae-in — à réessayer plus tard ou chercher autres sources.

**Sources images utilisées pour batches 07-09 :** Fandom CDN via calcul MD5 hash (URL format : `static.wikia.nocookie.net/dislyte/images/{md5[0]}/{md5[0:2]}/{Name}_avatar.png/revision/latest`).

---

## 🐛 Bugs corrigés (session actuelle)

| Bug | Fichier | Fix |
|-----|---------|-----|
| Écran noir page Espers | EsperCard.jsx, Espers.jsx | Null-safety sur `ELEMENTS[element]`, `relicBuild`, `divinity` |
| `ESPERS` non défini dans `EsperDetailFull` | Espers.jsx | Passé en prop `allEspers` |
| TierList écran noir | TierList.jsx | `TIERS` est un objet → `Object.keys(TIERS)` partout |
| Tooltip TierList coupé | TierList.jsx | `overflow: hidden` supprimé, `borderRadius` sur enfants, `zIndex: 9999` |
| Images espers absentes TierList | TierList.jsx | Chips redesignés avec portraits 52×52px |
| Set Sinueux (Apollo's Bow) manquant | relics.js | Ajouté (+25% Précision, 2-pièces) |
| Google OAuth : app en mode Test | Google Cloud Console | App publiée en production |
| Site URL Supabase = localhost:3000 | Supabase dashboard | Corrigé → `https://alexgrd87.github.io/dislyte-guide/` |
| Google OAuth : session non établie après redirect | AuthContext.jsx + supabase.js | Passage en `flowType: 'implicit'`, getSession backup, nettoyage hash URL |
| Portrait absent dans panneau détail esper | Espers.jsx | Portrait 120px ajouté avec URL fallback |
| Portraits absents dans Ma Box (grille + détail) | MyBox.jsx | Construction URL image Fandom CDN par nom |
| Auto-création profil manquante (premier login Discord) | AuthContext.jsx + useBox.js | `upsert` profil au lieu d'`insert` + useBox null-safe |
| Stats MyBox : Ascension max=4, Résonance incohérente | MyBox.jsx | Ascension max=6, Résonance max=6, step=1 partout |
| Filtres Relics non fonctionnels | Relics.jsx | Ajout filtres par slot/set/type |
| Page Modes : données incorrectes | Modes.jsx | Fix données statiques modes |
| Substats Espers : champ vide si absent | EsperCard.jsx | Fallback affiché si substats null |
| Badge "NEW" absent sur nouveaux espers | EsperCard.jsx | Badge NEW conditionnel |
| `divinity` null crashait l'affichage | Espers.jsx | Null-safety sur le champ divinity |

---

## 📝 Tâches futures

- [ ] **Ajouter espers manquants** : Jin-Hee, Lu Shang, Hu Jie, Jae-in — trouver images (404 sur Fandom CDN)
- [ ] **Tester l'auth** : vérifier que Google/Discord fonctionnent avec le implicit flow
- [ ] **Mode C** : espers tier C pas encore documentés en détail
- [ ] **Relics page** : données statiques, pas encore connectée à Supabase
- [ ] **Modes page** : données statiques (`src/data/modes.js`), pas encore en DB
- [x] **Home.jsx** : compteur "24 Sets de Relics" ✅

---

## 🔧 Fichiers critiques à ne pas casser

| Fichier | Pourquoi critique |
|---------|-------------------|
| `src/lib/supabase.js` | `flowType: 'implicit'` obligatoire — NE PAS remettre pkce |
| `src/context/AuthContext.jsx` | Pattern onAuthStateChange + getSession backup |
| `src/context/EspersContext.jsx` | Fournit les espers à toute l'app |
| `src/App.jsx` | `EspersProvider` doit wrapper `AppInner` |
| `src/data/espers.js` | N'exporte PLUS `ESPERS` — seulement `ELEMENTS`, `ROLES`, `TIERS` |
| `vite.config.js` | `base: '/dislyte-guide/'` en prod — ne pas toucher |
| `.github/workflows/deploy.yml` | GitHub Actions deploy — ne pas toucher |

---

*Dernière mise à jour : 30 Mai 2026 — 130 espers en DB, auth OAuth réparée (implicit flow), Ma Box corrigée (portraits + stats), 5 améliorations UI (filtres Relics, badge NEW, fallback substats, fix Modes, fix divinity)*
