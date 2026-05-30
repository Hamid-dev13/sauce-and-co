# SAUCE&CO

Démo de site fast-food / burger joint, par [Hamid Bennacef](https://github.com/Hamid-dev13).

Direction artistique brutaliste inspirée de Five Guys : kraft, rouge sauce, stickers obliques, typo Anton.
Frontend complet avec back-office mocké pour démontrer un savoir-faire fullstack de bout en bout.

> **Démo fictive.** Aucune commande n'est réellement prise. Toutes les données sont mockées.

---

## Démarrage rapide

### Avec Make (recommandé)

```bash
make up          # Build + run le container (port 3000)
make logs        # Suivre les logs
make down        # Stopper
make help        # Voir toutes les commandes
```

### Avec Docker directement

```bash
docker compose up -d --build
```

### En mode dev (hot reload)

```bash
make install     # ou: npm ci
make dev         # ou: npm run dev
```

→ http://localhost:3000

---

## Stack

| Brique | Choix |
|--------|-------|
| Framework | **Next.js 16** (App Router, Turbopack, `output: standalone`) |
| UI | **React 19** + TypeScript strict |
| Styling | **Tailwind CSS v4** (tokens inline `@theme`) |
| Animations | **Framer Motion 12** (drawer panier, modals, stepper checkout) |
| State | **Zustand 5** (panier + auth + édits, persistés `localStorage`) |
| Charts | **Recharts** (dashboard admin) |
| Feedback | **React Hot Toast** |
| Conteneur | **Docker** multi-stage (image ~190 MB, ~40 MB RAM runtime) |

---

## Routes

### Public

| Route | Description |
|-------|-------------|
| `/` | Home — hero, menu showcase, sauces teaser, story, galerie, avis, map CTA |
| `/menu` | Catalogue complet avec filtres catégorie / régime / recherche |
| `/sauces` | Les 8 sauces maison avec story individuelle |
| `/commander` | Tunnel checkout 3 steps (mode → infos → récap & paiement mock) |
| `/nous-trouver` | Carte SVG custom + horaires + transports |
| `/about` | Histoire, timeline, 3 promesses |

### Admin (login : `admin` / `admin`)

| Route | Description |
|-------|-------------|
| `/admin/login` | Auth fake avec animation shake si mauvais mdp |
| `/admin` | Dashboard : 4 KPI, graph Recharts CA 30j, top produits, dernières commandes |
| `/admin/orders` | Table filtrable + drawer détail + workflow `new → preparing → ready → delivered` |
| `/admin/menu` | Édition prix inline + toggle dispo, persistés `localStorage` |
| `/admin/sauces` | Modale d'édition avec color picker live + niveau d'épice |

---

## Commandes Make

```
make install      Installer les dépendances npm
make dev          Lancer le serveur de dev (npm run dev)
make build        Build la version prod (next build)
make start        Lancer la version prod en standalone (sans Docker)
make lint         Lint le code

make up           Build + run le container Docker
make down         Stopper et supprimer le container
make restart      Redémarrer le container (sans rebuild)
make rebuild      Rebuild from scratch + run (no cache)
make logs         Suivre les logs en live
make ps           Voir le statut du container
make shell        Ouvrir un shell dans le container
make stats        Voir la consommation CPU / RAM

make clean        Nettoyer node_modules + .next
make clean-docker Supprimer container + image Docker
make deploy       Déploiement VPS (git pull + rebuild)
```

---

## Déploiement sur VPS

### Setup initial

```bash
ssh user@ton-vps
git clone https://github.com/Hamid-dev13/sauce-and-co.git
cd sauce-and-co
make up
```

### Nginx reverse proxy

```nginx
server {
    listen 80;
    server_name sauceandco.tondomaine.fr;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo certbot --nginx -d sauceandco.tondomaine.fr
```

### Redéployer après un push

```bash
make deploy
```

(équivalent : `git pull && docker compose up -d --build`)

---

## Architecture

```
app/
├── layout.tsx                # Root layout (html, body, fonts, banner, nav, cart)
├── globals.css               # Tokens + textures + utilitaires brutalist
├── page.tsx                  # Home (assemblage des sections)
├── not-found.tsx             # 404 custom
│
├── _components/              # Composants partagés (navbar, footer, cart, sticker…)
│   └── sections/             # Sections de la home
├── _data/                    # Données mockées typées (products, sauces, orders, reviews)
├── _lib/                     # Stores Zustand + types TS
│
├── menu/                     # /menu — page + client component avec filtres
├── sauces/                   # /sauces — hero + grid + stories individuelles + CTA
├── commander/                # /commander — tunnel checkout 3 steps
├── nous-trouver/             # /nous-trouver — carte SVG custom
├── about/                    # /about — histoire long-form
│
└── admin/                    # /admin — back-office complet
    ├── layout.tsx            # Sidebar + AuthGate
    ├── page.tsx              # Dashboard
    ├── login/                # Page de connexion
    ├── orders/               # Gestion commandes
    ├── menu/                 # Édition du menu
    ├── sauces/               # Édition des sauces
    └── _components/          # Sidebar, KpiCard, RevenueChart, StatusBadge, AuthGate
```

---

## Notes

- Toutes les données sont **mockées** (TypeScript en `app/_data/`).
- L'auth est fake (Zustand + localStorage). Aucune vraie sécurité.
- Les commandes ne partent nulle part — c'est une démo de UI / DA / structure.
- Les photos viennent d'Unsplash via `images.remotePatterns`.

### Pour brancher du vrai

Pour passer en prod réelle avec une DB / paiement / mail :

1. Remplacer les stores Zustand par des Server Actions Next 16 qui parlent à **Supabase** (auth + DB + storage)
2. Tunnel checkout → **Stripe Checkout** (ou Payment Intents)
3. Mails de confirmation → **Resend** avec React Email
4. Image upload → **Supabase Storage** ou **Cloudinary**

Compter **3 à 4 jours** de plus pour cette bascule.

---

## License

Démo portfolio — utilisable comme template. Crédit photographies : Unsplash.
