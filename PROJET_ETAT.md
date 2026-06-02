# 📋 ÉTAT DU PROJET — Dislyte Guide FR
> Reprise immédiate possible — tout est ici. Dernière mise à jour : 2 Juin 2026 (session 2)

---

## 🔗 Liens essentiels

| Ressource | URL |
|-----------|-----|
| **GitHub repo** | https://github.com/AlexGrd87/dislyte-guide |
| **Site live** | https://alexgrd87.github.io/dislyte-guide/ |
| **Supabase dashboard** | https://supabase.com/dashboard/project/ogxwqebkwyharrrjoyep |
| **Discord Dev Portal** | https://discord.com/developers/applications/1509131976274219089/oauth2 |

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

> Scripts : `node scripts/add_code.js` · `node scripts/add_event.js`

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
│   ├── App.jsx                     # Router hash + lazy loading + Spotlight Ctrl+K
│   ├── components/
│   │   ├── Nav.jsx                 # 3 paliers responsive + badge codes actifs
│   │   ├── EsperCard.jsx           # React.memo + ElementIcon (mix-blend-mode screen)
│   │   ├── EsperTooltip.jsx        # Tooltip riche au survol
│   │   ├── AuthModal.jsx
│   │   └── Spotlight.jsx           # Recherche globale Ctrl+K
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── EspersContext.jsx       # fetch différé setTimeout(0)
│   ├── data/
│   │   ├── espers.js               # ELEMENTS + ROLES + ROLE_GROUPS (4 catégories)
│   │   ├── config.js               # GAME_VERSION centralisé
│   │   ├── modes.js
│   │   └── relics.js
│   ├── hooks/
│   │   ├── useBox.js
│   │   ├── useBuilds.js
│   │   ├── useTeams.js
│   │   └── useFavorites.js         # ⭐ favoris localStorage
│   └── pages/
│       ├── Home.jsx                # Système élémentaire lightbox + méta picks
│       ├── Espers.jsx              # Pagination 40/page + filtres + favoris + synergies
│       ├── TierList.jsx            # Filtres 4 rôles + éléments + filtre Ma Box
│       ├── TeamBuilder.jsx         # Partage URL + images espers + is_public
│       ├── Compare.jsx             # Comparaison côte à côte + partage URL
│       ├── MyBox.jsx
│       ├── Relics.jsx
│       ├── Modes.jsx
│       ├── Codes.jsx               # Codes cadeaux Supabase
│       ├── Events.jsx              # Événements + countdown + calendrier + notifs
│       ├── TierHistory.jsx         # Historique méta par patch
│       ├── CommunityTeams.jsx      # Teams publiques + likes
│       ├── Progression.jsx         # Guide F2P roadmap 5 étapes
│       ├── Stats.jsx               # Statistiques 190 espers — répartition tier/élément/rôle
│       ├── BuildCalc.jsx           # Calculateur de build — sets + substats + auto-fill relic_build
│       └── Notes.jsx               # (intégré dans EsperDetailFull)
├── scripts/
│   ├── add_code.js                 # CLI codes cadeaux
│   └── add_event.js                # CLI événements
├── public/images/espers/           # icônes éléments + systeme-elementaire.png
├── supabase/
│   ├── batch_01 → batch_21.sql    # ✅ Tous exécutés
│   ├── gift_codes.sql
│   ├── events_and_votes.sql        # events + build_votes + user_teams.is_public
│   └── patch_rename_fushi_to_leo.sql
├── vite.config.js                  # manualChunks + base '/dislyte-guide/'
└── .github/workflows/deploy.yml
```

---

## 🗄️ Tables Supabase

| Table | Contenu |
|-------|---------|
| `espers` | 190 espers avec builds, modes, synergies |
| `user_box` | Box personnelle (owned, level, stars) |
| `user_teams` | Teams sauvegardées + `is_public` + `likes` |
| `gift_codes` | Codes cadeaux actifs/expirés |
| `events` | Événements en cours (type, dates, récompenses) |
| `build_votes` | 👍/👎 sur les builds par user |

---

## 📊 État des données — 190 Espers

### Batches exécutés (batch_01 → batch_21 ✅)
### Corrections appliquées
- **Renommages** : Fu Shi → **Leo**, Ming Shuo → **Shou**, Asenath → **Asnath**, Aurelius → **Aurele**
- **Rarity 5★** : Feng Xun, Yorana, Yukine, Victor, Tetsuya
- **Rôles unifiés** : 4 catégories (Combattant/Tank/Soutien/Neutralisateur)
- **Version** : `src/data/config.js` → `GAME_VERSION = 'v3.4.41.448148'`

---

## ✅ Features implémentées

| Feature | Page/Composant |
|---------|----------------|
| Tooltip riche au survol | `EsperTooltip.jsx` |
| Partage team par URL | `TeamBuilder.jsx` (#team?t=...&c=...) |
| Pagination 40/page | `Espers.jsx` |
| Codes cadeaux temps réel | `Codes.jsx` + `gift_codes` table |
| Comparaison côte à côte | `Compare.jsx` (#compare?a=...&b=...) |
| Toggle grille/liste | `Espers.jsx` (localStorage) |
| Recherche globale Spotlight | `Spotlight.jsx` (Ctrl+K) |
| Favoris espers | `useFavorites.js` (localStorage) |
| Badge codes actifs nav | `Nav.jsx` + fetch count |
| Fix CLS (images) | width/height + aspect-ratio partout |
| Fix TBT | useTransition + React.memo |
| Filtre synergies | `Espers.jsx` → panel détail |
| Guide Progression F2P | `Progression.jsx` (5 étapes) |
| Événements complets | `Events.jsx` (countdown+calendrier+notifs) |
| Historique Tier List | `TierHistory.jsx` |
| Teams Communauté | `CommunityTeams.jsx` |
| Votes builds 👍/👎 | `Espers.jsx` → BuildVotes |
| Nav responsive | 3 paliers (>1100/769-1100/<768px) |
| Icônes éléments transparents | mix-blend-mode: screen |
| Roles unifiés (4 catégories) | ROLE_GROUPS dans espers.js |
| Page Stats 190 espers | `Stats.jsx` — répartition tier/élément/rôle |
| Calculateur de build relics | `BuildCalc.jsx` — sets + substats + DPS estimé |
| Auto-fill sets BuildCalc | Sélection esper → sets depuis `relic_build.primary` |
| Stats par rarity (5★/4★/3★) | BuildCalc — multiplicateur rarity appliqué |
| Filtre Ma Box × TierList | `TierList.jsx` — n'affiche que les espers possédés |
| Option "Rendre publique" | `TeamBuilder.jsx` — toggle `is_public` |
| Top teams par likes | `CommunityTeams.jsx` — tri serveur + bouton Charger plus |
| Pagination CommunityTeams | PAGE_SIZE=20 + fetch serveur respecte sortBy |
| Notes perso + partage build | `Espers.jsx` → EsperDetailFull |
| Titre d'onglet dynamique | `App.jsx` — `Page · Dislyte Guide FR` par page |

---

## ⚡ Performance Lighthouse

| Métrique | Score | Notes |
|----------|-------|-------|
| TBT | ~150ms | ✅ useTransition + React.memo |
| CLS | ~0.05 | ✅ width/height explicites + aspect-ratio |
| SEO | 100 | ✅ |

---

## 🚀 Commandes importantes

```bash
npm run dev              # Dev local → localhost:5173
npm run build            # Build prod
git push origin main     # ← SEUL moyen de déployer

# Ajouter un code cadeau :
node scripts/add_code.js

# Ajouter un événement :
node scripts/add_event.js
node scripts/add_event.js --list
node scripts/add_event.js --expire <id>

# UPDATE Supabase direct :
$url = "https://ogxwqebkwyharrrjoyep.supabase.co"
$key = "<service_role_key>"
$headers = @{ "apikey"=$key; "Authorization"="Bearer $key"; "Content-Type"="application/json"; "Prefer"="return=representation" }
Invoke-RestMethod -Uri "$url/rest/v1/espers?id=eq.<id>" -Method PATCH -Headers $headers -Body '{"field":"value"}'
```

---

## 🔧 Fichiers critiques — NE PAS CASSER

| Fichier | Pourquoi |
|---------|----------|
| `src/lib/supabase.js` | `flowType: 'implicit'` — si changé, auth casse |
| `src/context/EspersContext.jsx` | setTimeout(0) — retirer = TBT explose |
| `src/data/config.js` | GAME_VERSION — changer ici uniquement |
| `vite.config.js` | `base: '/dislyte-guide/'` en prod |
| `.github/workflows/deploy.yml` | GitHub Actions deploy |
