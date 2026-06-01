# 📋 ÉTAT DU PROJET — Dislyte Guide FR
> Reprise immédiate possible — tout est ici. Dernière mise à jour : 1 Juin 2026

---

## 🔗 Liens essentiels

| Ressource | URL |
|-----------|-----|
| **GitHub repo** | https://github.com/AlexGrd87/dislyte-guide |
| **Site live** | https://alexgrd87.github.io/dislyte-guide/ |
| **Supabase dashboard** | https://supabase.com/dashboard/project/ogxwqebkwyharrrjoyep |
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

---

## 🗄️ Supabase — Credentials

```
Project ref   : ogxwqebkwyharrrjoyep
URL           : https://ogxwqebkwyharrrjoyep.supabase.co
Anon key      : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9neHdxZWJrd3loYXJycmpveWVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4Njk5MDgsImV4cCI6MjA5NTQ0NTkwOH0.XZVGMSItXSH3Wzk1_bu7Du8-NQI-dCgrd4VDeJXPvDM
Service role  : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9neHdxZWJrd3loYXJycmpveWVwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTg2OTkwOCwiZXhwIjoyMDk1NDQ1OTA4fQ.RLW-iDfY92PlJVuEIBe1SuGx7pfl2tr9j_mgpLollYA
```

> Pour les UPDATE/INSERT directs via PowerShell, utiliser la service role key.

---

## 🔐 Authentification

- ✅ **Discord uniquement**
- **flowType: 'implicit'** dans `src/lib/supabase.js` — NE PAS CHANGER
- **Site URL Supabase** : `https://alexgrd87.github.io/dislyte-guide/`

---

## 📁 Structure du projet

```
dislyte-guide/
├── src/
│   ├── App.jsx                    # Router hash + lazy loading pages + Suspense
│   ├── components/
│   │   ├── Nav.jsx
│   │   ├── EsperCard.jsx          # + ElementIcon export + NEW badge batch 01-02
│   │   ├── EsperTooltip.jsx       # ✅ NOUVEAU — tooltip riche au survol
│   │   └── AuthModal.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── EspersContext.jsx      # fetch différé setTimeout(0) pour TBT
│   ├── data/
│   │   ├── espers.js              # ELEMENTS avec icônes PNG + BASE_URL dynamique
│   │   ├── modes.js
│   │   └── relics.js
│   └── pages/
│       ├── Home.jsx               # Système élémentaire avec image officielle
│       ├── Espers.jsx             # Skeleton loading + tooltip + click-outside
│       ├── TierList.jsx           # Tooltip riche remplace l'ancien
│       ├── TeamBuilder.jsx        # Partage par URL déjà implémenté (#team?t=...&c=...)
│       ├── MyBox.jsx
│       ├── Relics.jsx
│       └── Modes.jsx
├── public/
│   └── images/
│       ├── elements/              # SVGs custom (flow/inferno/wind/umbra/shimmer)
│       └── espers/                # PNGs locaux + icônes éléments officiels PNG
│           ├── icone-aquatique.png
│           ├── icone-brasier.png
│           ├── icone-vent.png
│           ├── icone-ombre.png
│           ├── icone-scintillant.png
│           └── systeme-elementaire.png
├── supabase/
│   ├── espers_seed.sql            # 46 espers initiaux
│   ├── batch_01 → batch_21.sql    # ✅ Tous exécutés
│   ├── fix_rarity_5stars.sql      # Feng Xun/Yorana/Yukine/Victor/Tetsuya → 5★
│   ├── fix_leo_image.sql          # Correction URL image Leo
│   └── fix_rarity_5stars.sql
├── vite.config.js                 # manualChunks + base '/dislyte-guide/'
└── .github/workflows/deploy.yml
```

---

## 🧠 Architecture clé

### Flux espers
```js
import { useEspers } from '../context/EspersContext.jsx'
function MaPage() {
  const { espers: ESPERS, loading } = useEspers()
  // loading → afficher skeleton, jamais un spinner pleine page (= CLS)
}
```

### Icônes éléments
```js
import { ElementIcon } from '../components/EsperCard.jsx'
// <ElementIcon el={el} size={18} /> — SVG fallback si PNG manquant
// Les URLs PNG utilisent import.meta.env.BASE_URL (dev + prod)
```

### Tooltip espers
```js
import { useEsperTooltip } from '../components/EsperTooltip.jsx'
const tooltip = useEsperTooltip()
// Dans le return : {tooltip.node}
// Sur chaque chip : onMouseEnter={e => tooltip.show(esper, e)} onMouseLeave={tooltip.hide}
```

### Partage team par URL (TeamBuilder)
```
URL format : /#team?t=gaius,clara,gabrielle,lu-shang,wu-you&c=0
// c = index du capitaine
// Déjà implémenté dans loadFromHash()
```

---

## 📊 État des données — ~210+ Espers en DB

### Batches exécutés
| Batch | Contenu | Date |
|-------|---------|------|
| batch_01 à batch_02 | Premiers 20 espers | Avant mai |
| batch_03 à batch_15 | ~150 espers + Arthur | 29-30 Mai 2026 |
| batch_16 | Ling Zhao (Tianfei) — Support Flow 5★ | 1 Juin 2026 |
| batch_17 | Wenlock (Huehuecoyotl) — Support Vent 5★ Championship | 1 Juin 2026 |
| batch_18 | Meta Yun Chuan (Meta Yang Jian) — DPS Vent 5★ SS | 1 Juin 2026 |
| batch_19 | Meta Eira (Meta Freya) — AP Controller Flow 5★ SS | 1 Juin 2026 |
| batch_20 | Nyles (Nidhogg) — DPS Ombre 5★ | 1 Juin 2026 |
| batch_21 | Sachiko (Hare of Inaba) — Support Brasier 4★ | 1 Juin 2026 |

### Corrections appliquées
- **Rarity 5★** : Feng Xun, Yorana, Yukine, Victor, Tetsuya
- **Renommages** : Ming Shuo → **Shou**, Asenath → **Asnath**, Aurelius → **Aurele**
- **Image Leo** : corrigée (pointait vers Fu Shi)
- **Version affichée** : v3.4.41.448148 partout

---

## ⚡ Performance Lighthouse (dernier score)

| Métrique | Score | Cible |
|----------|-------|-------|
| Performance | **77** | 85+ |
| FCP | 0.8s | ✅ |
| LCP | 1.5s | ✅ |
| TBT | 350ms | ⚠️ à améliorer |
| CLS | 0.141 | ⚠️ à améliorer |
| Accessibilité | 83 | — |
| SEO | 100 | ✅ |

### Optimisations déjà faites
- React.lazy + Suspense sur les 7 pages
- manualChunks Vite (vendor-react / vendor-supabase)
- Fonts non-bloquantes (media=print trick)
- Skeleton grid page Espers (au lieu de LoadingEspers = CLS)
- setTimeout(0) sur fetch Supabase (libère main thread)
- loading="lazy" + decoding="async" sur toutes les images espers

---

## 🎯 Suggestions à implémenter (dans l'ordre)

| # | Feature | Statut |
|---|---------|--------|
| 1 | Tooltip riche au survol | ✅ **Fait** |
| 2 | Partage team par URL | ✅ **Déjà en place** (loadFromHash dans TeamBuilder) |
| 3 | Pagination / chargement progressif espers | ⏳ À faire |
| 4 | Section codes cadeaux en temps réel | ⏳ À faire |
| 5 | Comparaison côte à côte de 2 espers | ⏳ À faire |
| 6 | Toggle grille / mode liste sur page Espers | ⏳ À faire |
| 7 | PWA (manifest + service worker) | ⏳ À faire |

---

## 🚀 Commandes importantes

```bash
npm run dev              # Dev local → localhost:5173
npm run build            # Build prod (vérif avant push)
git push origin main     # ← SEUL moyen de déployer

# Modifier un esper en DB (PowerShell) :
$url = "https://ogxwqebkwyharrrjoyep.supabase.co"
$key = "<service_role_key>"
$headers = @{ "apikey"=$key; "Authorization"="Bearer $key"; "Content-Type"="application/json"; "Prefer"="return=representation" }
Invoke-RestMethod -Uri "$url/rest/v1/espers?id=eq.<id>" -Method PATCH -Headers $headers -Body '{"field":"value"}'
```

---

## 🔧 Fichiers critiques — NE PAS CASSER

| Fichier | Pourquoi critique |
|---------|-------------------|
| `src/lib/supabase.js` | `flowType: 'implicit'` — si changé, auth casse |
| `src/context/EspersContext.jsx` | setTimeout(0) sur fetch — retirer = TBT explose |
| `src/data/espers.js` | `BASE_URL` dynamique pour icônes éléments |
| `vite.config.js` | `base: '/dislyte-guide/'` en prod |
| `.github/workflows/deploy.yml` | GitHub Actions deploy |
