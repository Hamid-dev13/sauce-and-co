# SAUCE&CO

Démo de site fast-food / burger joint, par [Hamid Bennacef](https://github.com/Hamid-dev13).

Direction artistique brutaliste inspirée de Five Guys : kraft, rouge sauce, stickers obliques, typo Anton.
Stack frontend complète avec back-office mocké pour démontrer le savoir-faire fullstack.

## Stack

- **Next.js 16** (App Router, Turbopack, output standalone)
- **React 19** + TypeScript strict
- **Tailwind CSS v4** (tokens inline `@theme`)
- **Framer Motion 12** (animations, drawer panier, modals)
- **Zustand 5** (panier + auth + édition menu, persistés `localStorage`)
- **Recharts** (dashboard admin)
- **React Hot Toast** (feedback ajout panier, transitions admin)
- **Docker** multi-stage (image runtime ~190 MB, ~40 MB RAM)

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, menu showcase, sauces teaser, story, galerie, avis, map CTA |
| `/menu` | Catalogue complet avec filtres catégorie / régime / recherche |
| `/sauces` | Page signature : les 8 sauces maison avec story individuelle |
| `/commander` | Tunnel checkout 3 steps (mode → infos → récap & paiement mock) |
| `/nous-trouver` | Carte custom SVG + horaires + transports |
| `/about` | Histoire, timeline, 3 promesses |
| `/admin` | Back-office (login `admin` / `admin`) |

### Admin

- **Dashboard** : 4 KPI + graph Recharts CA 30j + top produits + dernières commandes
- **Commandes** : table filtrable par statut, drawer détail, workflow new → preparing → ready → delivered
- **Menu** : édition prix inline + toggle disponibilité, persisté `localStorage`
- **Sauces** : modale d'édition avec color picker live

## Lancer en dev

```bash
npm install
npm run dev
```

→ http://localhost:3000

## Lancer en production via Docker

```bash
docker compose up -d --build
```

→ http://localhost:3000

Pour reload après changement :
```bash
docker compose up -d --build
```

## Déployer sur VPS

Voir un tuto Nginx + certbot standard. La doc rapide :

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

Puis `sudo certbot --nginx -d sauceandco.tondomaine.fr` pour HTTPS.

## Notes

- Toutes les données sont **mockées** (TypeScript en `app/_data/`).
- L'auth est fake (Zustand + localStorage). Aucune vraie sécurité.
- Les commandes ne partent nulle part — c'est une démo.
- Les photos viennent d'Unsplash via remotePatterns.

Pour brancher une vraie DB / paiement / mail : swap les fonctions des stores Zustand par des Server Actions Next 16 qui parlent à Supabase + Stripe + Resend. Compter 3-4 jours de plus.
