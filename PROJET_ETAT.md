# 📋 ÉTAT DU PROJET — Dislyte Guide FR
> Reprise immédiate possible — tout est ici. Dernière mise à jour : 29 Mai 2026

---

## 🔗 Liens essentiels

| Ressource | URL |
|-----------|-----|
| **GitHub repo** | https://github.com/AlexGrd87/dislyte-guide |
| **Site live** | https://alexgrd87.github.io/dislyte-guide/ |
| **Supabase dashboard** | https://supabase.com/dashboard/project/ogxwqebkwyharrrjoyep |
| **Google Cloud Console** | https://console.cloud.google.com/auth/clients?project=braided-city-497610-q1 |
| **Discord Dev Portal** | https://discord.com/developers/applications/1509131976274219089/oauth2 |
| **Fichier local** | `C:\Users\alexandre.gaillard\Desktop\dislyte-guide` |

---

## 🛠️ Stack technique

| Élément | Détail |
|---------|--------|
| Framework | React 18 + Vite 5 |
| Auth / DB | Supabase (PostgreSQL) |
| Déploiement | **GitHub Actions** — push sur `main` → deploy auto |
| Routing | Hash-based (`/#espers`, `/#tierlist`, etc.) |
| CSS | Vanilla CSS variables (`index.css`) |

> ⚠️ **RÈGLE DE DÉPLOIEMENT ABSOLUE** : TOUJOURS `git push origin main`
> JAMAIS `npx gh-pages -d dist` (ça push sur gh-pages ignoré par Actions)

---

## 🗄️ Supabase — Credentials

```
Project ref  : ogxwqebkwyharrrjoyep
URL          : https://ogxwqebkwyharrrjoyep.supabase.co
Anon key     : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9neHdxZWJrd3loYXJycmpveWVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4Njk5MDgsImV4cCI6MjA5NTQ0NTkwOH0.XZVGMSItXSH3Wzk1_bu7Du8-NQI-dCgrd4VDeJXPvDM
```

> Clé anon publique par design — hardcodée dans `src/lib/supabase.js`

### Tables et permissions

| Table | RLS | GRANT authenticated |
|-------|-----|---------------------|
| `espers` | ✅ SELECT public | ✅ |
| `profiles` | ✅ SELECT/INSERT/UPDATE own | ✅ |
| `user_box` | ✅ SELECT/INSERT/UPDATE/DELETE own | ✅ |
| `user_builds` | ✅ SELECT/INSERT/UPDATE/DELETE own | ✅ |
| `user_teams` | ✅ SELECT/INSERT/UPDATE/DELETE own | ✅ |

> ⚠️ Les GRANTs ont été ajoutés manuellement via API Supabase Management — ils sont déjà en place.

### Contraintes CHECK sur `user_box`
```sql
ascension  : 0–6
resonance  : 0–6
stars      : 1–6
lvl        : 1–60
```

---

## 🔐 Authentification — Configuration complète

### Provider actif
- ✅ **Discord uniquement** (Google retiré)

### Supabase Auth settings
- **Site URL** : `https://alexgrd87.github.io/dislyte-guide/`
- **Redirect URLs** : `https://alexgrd87.github.io/dislyte-guide/` + `http://localhost:5173/`

### Discord Developer Portal
- App ID : `1509131976274219089`
- Redirect URI configurée : `https://ogxwqebkwyharrrjoyep.supabase.co/auth/v1/callback` ✅

### ⚠️ `src/lib/supabase.js` — CRITIQUE
```js
export const supabase = createClient(url, key, {
  auth: {
    flowType: 'implicit',     // ← NE PAS CHANGER en pkce (perd le code_verifier sur GitHub Pages)
    detectSessionInUrl: true,
    persistSession: true,
  }
})
```

### `src/context/AuthContext.jsx` — Pattern correct
```js
// onAuthStateChange = source principale
supabase.auth.onAuthStateChange((_event, session) => {
  setUser(session?.user ?? null)
  if (session?.user) fetchProfile(session.user.id)
  else { setProfile(null); setLoading(false) }
})
// getSession() = backup session existante
// fetchProfile() crée automatiquement le profil si absent (premier login Discord)
// maybeSingle() utilisé à la place de single() pour éviter les crashs
```

---

## 📁 Structure du projet

```
dislyte-guide/
├── src/
│   ├── App.jsx                    # Router hash + AuthProvider + EspersProvider
│   ├── components/
│   │   ├── Nav.jsx                # Barre de navigation + auth state
│   │   ├── EsperCard.jsx          # ⚠️ Badge "NEW" sur batch 01+02
│   │   └── AuthModal.jsx          # Modal login Discord
│   ├── context/
│   │   ├── AuthContext.jsx        # Auth implicit flow + auto-création profil
│   │   └── EspersContext.jsx      # fetch Supabase → useEspers()
│   ├── data/
│   │   ├── espers.js              # ⚠️ N'exporte PLUS ESPERS — seulement ELEMENTS, ROLES, TIERS
│   │   ├── modes.js               # Guide des modes (statique)
│   │   └── relics.js              # 24 sets de relics
│   ├── hooks/
│   │   ├── useBox.js              # CRUD user_box — try/catch + maybeSingle()
│   │   ├── useBuilds.js           # CRUD user_builds
│   │   └── useTeams.js            # CRUD user_teams
│   ├── lib/
│   │   └── supabase.js            # ⚠️ flowType: 'implicit' — critique
│   └── pages/
│       ├── Home.jsx
│       ├── Espers.jsx             # ⚠️ allEspers passé en prop à EsperDetailFull
│       ├── TierList.jsx
│       ├── TeamBuilder.jsx        # Presets prédéfinis + picker avec filtres
│       ├── MyBox.jsx              # Collection personnelle (auth requise)
│       ├── Relics.jsx             # Filtres par rôle (DPS/Support/etc.)
│       └── Modes.jsx              # ⚠️ espers passé en prop à ModeDetail
├── supabase/
│   ├── espers_seed.sql            # 46 espers initiaux
│   ├── batch_01_espers.sql        # ✅ Exécuté — +10 espers
│   └── batch_02_espers.sql        # ✅ Exécuté — +10 espers (66 total)
├── .github/workflows/deploy.yml   # GitHub Actions — NE PAS TOUCHER
├── index.html                     # Favicon Dislyte officiel
└── vite.config.js                 # base: '/dislyte-guide/' — NE PAS TOUCHER
```

---

## 🧠 Architecture clé

### Flux espers
```js
// ✅ Pattern correct dans chaque page
import { useEspers } from '../context/EspersContext.jsx'

function MaPage() {
  const { espers: ESPERS, loading } = useEspers()
  const filtered = useMemo(() => ESPERS.filter(...), [ESPERS, ...deps]) // ESPERS obligatoire !
  if (loading) return <div>Chargement…</div>
  return (...)
}
```

### Pièges connus
```js
// ❌ ESPERS hors scope dans un composant enfant → ReferenceError
function EnfantComponent({ esper }) { ESPERS.find(...) } // crash !

// ✅ Passer espers en prop
function EnfantComponent({ esper, allEspers }) { allEspers.find(...) }
```

---

## 📊 État des données — 66 Espers en DB

| Tier | Espers |
|------|--------|
| **SS** | Gaius, Clara, Unas, Lin Xiao, Gabrielle, Sander, Chloe, Sally, Li Ling, Meredith |
| **S** | Abigail, Ashley, Dhalia, Asenath, Lucas, Alice, Raven, Ahmed, Ollie, Nicole, Ye Suhua, Narmer, Tiye, Tang Yun, Donar, Sienna, Fabrice, Li Guang, Drew, Lu Yi, Brewster, Tevor, Lian, Tang Xuan, Feng Nuxi, Yamato, Yun Chuan, Everett, Catherine, Intisar, Ren Si, Xiao Yin, Jin Yuyao |
| **A** | Long Mian, Triki, Hyde, Ophelia, Jiang Jiuli, Heng Yue, Berenice, Lynn, Melanie, Bonnie, Cecilia, Cang Ji, Farrah, Elaine, Ife, Zora |
| **B** | Mona, Biondina, Daylon, Chang Pu, Leon, Ethan, Jiang Man |

### Batches SQL exécutés
```
batch_01 : Meredith, Cecilia, Lian, Tang Xuan, Ethan, Cang Ji, Farrah, Feng Nuxi, Yamato, Elaine
batch_02 : Yun Chuan, Everett, Ife, Catherine, Intisar, Ren Si, Xiao Yin, Jiang Man, Jin Yuyao, Zora
```

---

## 🎯 Meta Dislyte — Mai 2026 (recherche top players)

### Corrections de tier à appliquer (DB)
| Esper | Tier actuel | Tier correct (meta) |
|-------|-------------|---------------------|
| Nicole | S | **SS** |
| Ollie | S | **SS** |
| Long Mian | A | **S** (top PvP captain) |
| Triki | A | **S** (dominant PvP) |

### Top espers par mode (source : playdislyte.com + pillarofgaming.com)
- **Kronos** : Lin Xiao, Gaius, Sander, Ahmed, Unas, Clara, Gabrielle, Xiao Yin
- **Apep** : Lin Xiao, Li Ling, Lu Yi, Clara, Gabrielle, Ahmed
- **Fafnir** : Lu Yi (9 hits!), Tang Yun, Abigail, Berenice, Gabrielle
- **PvP** : Triki, Long Mian, Clara, Lucas, Sally, Unas, Li Ling, Raven, Narmer, Nicole, Ollie
- **Story/Cube** : Li Ling, Clara, Gabrielle, Jiang Jiuli, Mona

### 🆕 Espers top-tier ABSENTS de notre DB (à ajouter en priorité)
| Esper | Divinité | Tier | Urgence |
|-------|---------|------|---------|
| **Leora** | Athena | SS | 🔴 Urgent |
| **Toland** | Tezcatlipoca | SS (DPS AoE) | 🔴 Urgent |
| **Sloan** | Ereshkigal | SS (CPA) | 🔴 Urgent |
| **Alexa** | Aphrodite | SS | 🔴 Urgent |
| **Lewis** | — | S | 🟡 |
| **Eira** | — | S | 🟡 |
| **Unky Chai** | — | S | 🟡 |
| **Laura** | — | S | 🟡 |
| **Jeanne** | — | A | 🟢 |
| **Skadi** | — | A | 🟢 |
| **Nick** | — | A | 🟢 |

---

## 📝 Tâches restantes

### 🔴 Priorité haute
- [ ] **Batch 03** : Ajouter Leora, Toland, Sloan, Alexa + données réelles (playdislyte.com)
- [ ] **Corriger les tiers** : Nicole & Ollie → SS, Long Mian & Triki → S (dans Supabase)

### 🟡 Priorité moyenne
- [ ] **Batch 04-06** : Lewis, Eira, Unky Chai, Laura + autres espers manquants (~50+)
- [ ] **% utilisation top players** : pas de données publiques disponibles actuellement
- [ ] **Guide Modes** : étoffer les descriptions (Cube, Tower, Point War...)

### 🟢 Priorité basse
- [ ] **Home.jsx** : mettre à jour "23 Sets de Relics" → 24
- [ ] **Mode C** : espers tier C non documentés
- [ ] **Relics/Modes** : connecter à Supabase (actuellement statique)

---

## 🚀 Commandes importantes

```bash
cd C:\Users\alexandre.gaillard\Desktop\dislyte-guide

npm run dev              # Dev local → localhost:5173
npm run build            # Build prod (vérif avant push)
git push origin main     # ← SEUL moyen de déployer

# Ajouter un batch d'espers :
# 1. Créer supabase/batch_03_espers.sql
# 2. L'exécuter dans Supabase SQL Editor
# 3. Mettre à jour ce fichier
```

---

## 🔧 Fichiers critiques — NE PAS CASSER

| Fichier | Pourquoi critique |
|---------|-------------------|
| `src/lib/supabase.js` | `flowType: 'implicit'` — si changé, auth casse |
| `src/context/AuthContext.jsx` | auto-création profil + onAuthStateChange pattern |
| `src/context/EspersContext.jsx` | fournit les espers à toute l'app |
| `src/App.jsx` | `EspersProvider` doit wrapper `AppInner` |
| `src/data/espers.js` | n'exporte PLUS `ESPERS` — seulement `ELEMENTS`, `ROLES`, `TIERS` |
| `vite.config.js` | `base: '/dislyte-guide/'` en prod |
| `.github/workflows/deploy.yml` | GitHub Actions deploy |

---

## 🐛 Bugs corrigés (session actuelle — 29 Mai 2026)

| Bug | Fix |
|-----|-----|
| Écran noir page Espers | Null-safety sur `ELEMENTS[element]`, `relicBuild`, `divinity` |
| `ESPERS` hors scope dans `EsperDetailFull` | Passé en prop `allEspers` |
| `ESPERS` hors scope dans `ModeDetail` | Passé en prop `espers` |
| TierList écran noir | `Object.keys(TIERS)` partout |
| Google OAuth session non établie | `flowType: 'implicit'` dans supabase.js |
| "Ajouter à ma box" sans effet | GRANTs manquants sur toutes les tables user_* |
| Profil absent au premier login | Auto-création dans `fetchProfile()` |
| Contraintes CHECK ascension/résonance à 5 | Modifiées → max 6 en DB |
| `divinity null` crash TeamBuilder picker | `(e.divinity \|\| '').toLowerCase()` |

---

*Dernière mise à jour : 29 Mai 2026 — 66 espers en DB, auth Discord ✅, Ma Box ✅, 5 améliorations UI*
