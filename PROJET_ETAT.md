# 📋 ÉTAT DU PROJET — Dislyte Guide FR
> Document de reprise pour session Claude vierge — Mai 2026

---

## 🔗 Liens essentiels

| Ressource | URL |
|-----------|-----|
| **GitHub repo** | https://github.com/AlexGrd87/dislyte-guide |
| **Site live (GitHub Pages)** | https://alexgrd87.github.io/dislyte-guide/ |
| **Supabase dashboard** | https://supabase.com/dashboard/project/ogxwqebkwyharrrjoyep |
| **Fichier local** | `C:\Users\alexandre.gaillard\Desktop\dislyte-guide` |

---

## 🛠️ Stack technique

| Élément | Détail |
|---------|--------|
| Framework | React 18 + Vite 5 |
| Auth / DB | Supabase (PostgreSQL) |
| Déploiement | GitHub Pages via `npx gh-pages -d dist` |
| Routing | Hash-based (`/#espers`, `/#tierlist`, etc.) |
| CSS | Vanilla CSS variables (index.css) |
| Fonts | Google Fonts (display + UI) |

---

## 🗄️ Supabase — Credentials

```
Project ref  : ogxwqebkwyharrrjoyep
URL          : https://ogxwqebkwyharrrjoyep.supabase.co
Anon key     : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9neHdxZWJrd3loYXJycmpveWVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4Njk5MDgsImV4cCI6MjA5NTQ0NTkwOH0.XZVGMSItXSH3Wzk1_bu7Du8-NQI-dCgrd4VDeJXPvDM
```

> ⚠️ La clé anon est publique par design (visible côté client dans toutes les apps Supabase).
> Elle est hardcodée dans `src/lib/supabase.js` pour que GitHub Pages fonctionne sans variables d'env.

### Tables Supabase existantes

#### `public.espers` — 46 espers chargés ✅
```sql
CREATE TABLE public.espers (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  image       TEXT,               -- URL portrait (playdislyte.com)
  divinity    TEXT,               -- Dieu/déesse d'origine
  element     TEXT NOT NULL,      -- flow | inferno | wind | umbra | shimmer
  role        TEXT NOT NULL,      -- dps | support | healer | controller | debuffer | defender | ap-controller
  tier        TEXT NOT NULL,      -- SS | S | A | B | C
  rarity      SMALLINT NOT NULL,  -- 3 | 4 | 5
  description TEXT,
  relic_build JSONB,              -- { primary, alt, mainStats, substats, notes }
  synergies   TEXT[],             -- array d'IDs d'espers
  modes       JSONB,              -- { story, kronos, apep, fafnir, pvp } → tier par mode
  captain     TEXT                -- description du bonus capitaine ou null
);
-- RLS activée, lecture publique
-- GRANT SELECT TO anon, authenticated
```

#### `public.profiles` — Profils utilisateurs
```sql
CREATE TABLE public.profiles (
  id         UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username   TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### `public.user_box` — Espers possédés par joueur
```sql
CREATE TABLE public.user_box (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  esper_id   TEXT NOT NULL,
  stars      SMALLINT DEFAULT 0,
  ascension  SMALLINT DEFAULT 0,
  resonance  SMALLINT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### `public.user_builds` — Builds de relics sauvegardés
```sql
CREATE TABLE public.user_builds (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  esper_id    TEXT NOT NULL,
  build_name  TEXT NOT NULL,
  set4        TEXT,
  set2        TEXT,
  main_stats  JSONB,
  substats    TEXT[],
  notes       TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
```

#### `public.user_teams` — Équipes sauvegardées
```sql
CREATE TABLE public.user_teams (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  team_name  TEXT NOT NULL,
  mode       TEXT,
  esper_ids  TEXT[],
  notes      TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 📁 Structure du projet

```
dislyte-guide/
├── src/
│   ├── App.jsx                    # Router hash + AuthProvider + EspersProvider
│   ├── main.jsx                   # Entry point React
│   ├── index.css                  # Variables CSS globales (couleurs, fonts, etc.)
│   │
│   ├── components/
│   │   ├── Nav.jsx                # Barre de navigation
│   │   ├── EsperCard.jsx          # Carte esper (normal + compact) avec couleurs rareté
│   │   └── AuthModal.jsx          # Modal login (Google OAuth via Supabase)
│   │
│   ├── context/
│   │   ├── AuthContext.jsx        # Context auth (session Supabase)
│   │   └── EspersContext.jsx      # Context espers (fetch Supabase, fournit useEspers())
│   │
│   ├── data/
│   │   ├── espers.js              # ⚠️ Plus de tableau ESPERS — seulement ELEMENTS, ROLES, TIERS
│   │   ├── modes.js               # Données statiques des modes de jeu
│   │   └── relics.js              # Données statiques des sets de relics
│   │
│   ├── hooks/
│   │   ├── useBox.js              # CRUD user_box Supabase
│   │   ├── useBuilds.js           # CRUD user_builds Supabase
│   │   └── useTeams.js            # CRUD user_teams Supabase
│   │
│   ├── lib/
│   │   └── supabase.js            # Client Supabase (URL + clé anon hardcodées en fallback)
│   │
│   ├── pages/
│   │   ├── Home.jsx               # Page d'accueil (featured espers, stats, news)
│   │   ├── Espers.jsx             # Base de données espers (filtres, search, detail)
│   │   ├── TierList.jsx           # Tier list par mode (SS/S/A/B/C)
│   │   ├── TeamBuilder.jsx        # Constructeur d'équipes (5 slots)
│   │   ├── MyBox.jsx              # Collection personnelle (auth requise)
│   │   ├── Relics.jsx             # Guide des sets de relics
│   │   └── Modes.jsx              # Guide des modes de jeu
│   │
│   └── utils/
│       └── teamAnalysis.js        # Analyse de composition d'équipe
│
├── supabase/
│   └── espers_seed.sql            # Script SQL pour recréer/reseed la table espers (46 espers)
│
├── .env                           # Variables d'env locales (VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY)
├── .env.example                   # Template .env
├── vite.config.js                 # base: '/dislyte-guide/' en prod
└── package.json
```

---

## 🧠 Architecture clé — Flux des données Espers

### Avant (bundle statique)
```js
// espers.js contenait un tableau de 46 objets (~950 lignes)
import { ESPERS } from '../data/espers.js'  // ← 950 lignes dans le bundle
```

### Après (fetch Supabase via Context)
```js
// Dans n'importe quelle page/composant :
import { useEspers } from '../context/EspersContext.jsx'

function MaPage() {
  const { espers: ESPERS, loading, error } = useEspers()
  if (loading) return <div>Chargement…</div>
  // ESPERS = tableau des 46 espers depuis Supabase
}
```

### EspersContext.jsx (fichier clé)
```jsx
import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase.js'

const EspersContext = createContext({ espers: [], loading: true, error: null })

export function EspersProvider({ children }) {
  const [espers, setEspers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    supabase
      .from('espers')
      .select('*')
      .order('tier', { ascending: true })
      .then(({ data, error }) => {
        if (error) { setError(error.message) }
        else { setEspers(data.map(e => ({ ...e, relicBuild: e.relic_build }))) }
        setLoading(false)
      })
  }, [])

  return <EspersContext.Provider value={{ espers, loading, error }}>{children}</EspersContext.Provider>
}

export function useEspers() { return useContext(EspersContext) }
```

> ⚠️ **Note importante** : dans tous les composants qui utilisent `useEspers()`, si tu utilises `useMemo` avec les espers, **il faut mettre `ESPERS` dans le tableau de dépendances** sinon le calcul se met en cache avant que les données arrivent.
> 
> ```js
> // ✅ CORRECT
> const filtered = useMemo(() => ESPERS.filter(...), [ESPERS, search, filterEl, ...])
> // ❌ BUG — ESPERS manquant dans les deps
> const filtered = useMemo(() => ESPERS.filter(...), [search, filterEl, ...])
> ```

---

## 🎨 Système de couleurs Rareté

```js
// Dans EsperCard.jsx
const RARITY_COLORS = {
  3: '#38BDF8',  // bleu — Rare
  4: '#A855F7',  // violet — Épique
  5: '#FFD200',  // or — Légendaire
}
```

Appliqué sur : bordure gauche (mode compact), bordure avatar, étoiles, badge rareté, hover effects.

---

## 🃏 Composant EsperCard

`src/components/EsperCard.jsx` — 2 modes d'affichage :

- **Normal** (`compact={false}`) : grande carte verticale avec portrait, stats détaillées, badge élément
- **Compact** (`compact={true}`) : ligne horizontale (utilisée dans TeamBuilder, MyBox picker)

```jsx
<EsperCard esper={esper} compact={false} onClick={() => setSelected(esper.id)} />
```

### Portrait image
Les portraits viennent de `playdislyte.com` (URLs stockées dans la colonne `image` de Supabase).
Fallback : emoji élément si l'image ne charge pas (`onError`).

---

## 🔐 Authentification

- **Provider** : Google OAuth via Supabase Auth
- **Statut** : App Google en mode "Test" → seul le compte propriétaire peut se connecter
- **Pour publier** : Google Cloud Console → projet "Dislyte Guide" → Google Auth Platform → Audience → **Publier l'application**
- Les pages MyBox et TeamBuilder (sauvegarde) nécessitent d'être connecté

---

## 🚀 Commandes importantes

```bash
# Dev local
cd C:\Users\alexandre.gaillard\Desktop\dislyte-guide
npm run dev              # Lance le serveur sur localhost:5173

# Build + déploiement GitHub Pages
npm run build            # Crée dist/
npx gh-pages -d dist     # Publie dist/ sur la branche gh-pages

# Juste le build (test)
npm run build && npm run preview
```

---

## 📊 État des données — 56 Espers en DB

| Tier | Espers |
|------|--------|
| **SS** | Gaius, Clara, Unas, Lin Xiao, Gabrielle, Sander, Chloe, Sally, Li Ling, **Meredith** |
| **S** | Abigail, Ashley, Dhalia, Asenath, Lucas, Alice, Raven, Ahmed, Ollie, Nicole, Ye Suhua, Narmer, Tiye, Tang Yun, Donar, Sienna, Fabrice, Li Guang, Drew, Lu Yi, Brewster, Tevor, **Lian, Tang Xuan, Feng Nuxi, Yamato** |
| **A** | Long Mian, Triki, Hyde, Ophelia, Jiang Jiuli, Heng Yue, Berenice, Lynn, Melanie, Bonnie, **Cecilia, Cang Ji, Farrah, Elaine** |
| **B** | Mona, Biondina, Daylon, Chang Pu, Leon, **Ethan** |

### Batch 01 — ajouté le 29 Mai 2026 (`supabase/batch_01_espers.sql`)
Meredith (Scylla), Cecilia (Isis), Lian (Jiao Tu), Tang Xuan (Sun Wukong), Ethan (Pan), Cang Ji (Cang Jie), Farrah (Abzu & Tiamat), Feng Nuxi (Nuwa), Yamato (Izanagi), Elaine (Nyx)

> ⚠️ Images manquantes (null → fallback emoji) : Lian, Ethan, Cang Ji, Farrah, Yamato, Elaine

Chaque esper a : `id, name, image, divinity, element, role, tier, rarity, description, relic_build (JSONB), synergies (TEXT[]), modes (JSONB), captain`

---

## 🐛 Bugs corrigés (historique récent)

| Bug | Fix |
|-----|-----|
| Espers n'apparaissaient pas (0 trouvés) | `ESPERS` ajouté dans les dépendances du `useMemo` dans `Espers.jsx` |
| Supabase null sur GitHub Pages | Clé anon hardcodée en fallback dans `supabase.js` |
| `GRANT SELECT` manquant | Executé : `GRANT SELECT ON public.espers TO anon, authenticated` |
| Étoiles cachées par `overflow:hidden` | Étoiles déplacées dans un div sibling sous l'avatar |
| `ESPERS.length` à l'extérieur du composant | Hardcodé `'46+'` dans `STATS_BASE` dans `Home.jsx` |

---

## 📝 Tâches futures possibles

- [ ] **Google OAuth** : publier l'app Google (actuellement mode test)
- [ ] **Tier list** : `TIERS` est maintenant un objet `{SS:{}, S:{}, ...}` mais certains usages l'utilisent comme tableau — à vérifier dans `TierList.jsx`
- [ ] **Ajouter espers (batch 02+)** : ~74 espers manquants — continuer 10 par 10 via `supabase/batch_XX_espers.sql`
- [ ] **Images manquantes batch 01** : trouver URLs pour Lian, Ethan, Cang Ji, Farrah, Yamato, Elaine
- [ ] **Mode C** : les espers tier C ne sont pas encore documentés en détail
- [ ] **Relics page** : données statiques, pas encore connectée à Supabase
- [ ] **Modes page** : données statiques (`src/data/modes.js`), pas encore en DB

---

## 🔧 Fichiers critiques à ne pas casser

| Fichier | Pourquoi critique |
|---------|-------------------|
| `src/lib/supabase.js` | Client Supabase — clé anon hardcodée dedans |
| `src/context/EspersContext.jsx` | Fournit les espers à toute l'app via `useEspers()` |
| `src/App.jsx` | `EspersProvider` doit wrapper `AppInner` |
| `src/data/espers.js` | N'exporte PLUS `ESPERS` — seulement `ELEMENTS`, `ROLES`, `TIERS` |
| `vite.config.js` | `base: '/dislyte-guide/'` en prod — ne pas toucher |

---

## 💡 Pattern à respecter dans chaque page

```jsx
// ✅ Template correct pour utiliser les espers dans une page
import { useEspers } from '../context/EspersContext.jsx'

export default function MaPage() {
  const { espers: ESPERS, loading } = useEspers()
  
  // Optionnel : memo avec ESPERS dans les deps !
  const filtered = useMemo(() => {
    return ESPERS.filter(...)
  }, [ESPERS, /* autres deps */])   // ← ESPERS obligatoire ici
  
  if (loading) return <div>Chargement…</div>
  
  return (...)
}
```

---

*Dernière mise à jour : 29 Mai 2026 — batch 01 (56 espers en DB)*
