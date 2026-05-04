# ShoesNotIncluded — Site web

Site vitrine et de e-commerce pour [ShoesNotIncluded](https://shoesnotincluded.com),
une application mobile d'escape games en plein air à Nantes et dans plusieurs
villes françaises.

Le site permet de présenter les scénarios disponibles, gérer les comptes
utilisateurs, et acheter des cartes de bon pour des parties via Stripe.

## Stack technique

- **Framework** : [Next.js](https://nextjs.org/) 13 (Pages Router)
- **Langage** : TypeScript
- **UI** : React 18, [styled-components](https://styled-components.com/),
  [Bootstrap 5](https://getbootstrap.com/) + [react-bootstrap](https://react-bootstrap.github.io/)
- **State** : [Redux Toolkit](https://redux-toolkit.js.org/) +
  [next-redux-wrapper](https://github.com/kirill-konshin/next-redux-wrapper)
- **Backend as a Service** : [Firebase](https://firebase.google.com/) (Auth,
  Firestore, Functions)
- **Paiement** : [Stripe](https://stripe.com/) via les
  [Firebase Extensions Stripe](https://firebase.google.com/products/extensions/stripe-firestore-stripe-payments)
- **Hébergement** : [Netlify](https://www.netlify.com/) (déploiement
  automatique sur push de la branche `main`)
- **Nom de domaine** : OVH
- **Emails transactionnels** : SocketLabs

## Démarrage rapide

### Prérequis

- Node.js ≥ 16 (recommandé : version LTS courante)
- Yarn ou npm
- Accès au projet Firebase et au compte Stripe

### Installation

```bash
git clone https://github.com/AnthonyLabaere/Shoesnotincluded-website.git
cd Shoesnotincluded-website
yarn install   # ou npm install
```

### Variables d'environnement

Copier le fichier exemple et remplir les valeurs :

```bash
cp .env.example .env.local
```

Voir `.env.example` pour la description de chaque variable. Les valeurs Firebase
et Stripe sont à récupérer dans leurs consoles respectives.

### Lancer en local

```bash
yarn dev
```

Le site est accessible sur [http://localhost:3000](http://localhost:3000).

## Scripts disponibles

| Script                   | Description                                                 |
| ------------------------ | ----------------------------------------------------------- |
| `yarn dev`               | Démarre le serveur de développement (hot reload)            |
| `yarn build`             | Build de production                                         |
| `yarn start`             | Lance le serveur Next.js sur le build de production         |
| `yarn lint`              | Lance ESLint                                                |
| `yarn format`            | Formatte le code avec Prettier                              |
| `yarn analyze`           | Build + analyse du bundle (server + browser)                |
| `yarn analyze:server`    | Build + analyse du bundle serveur uniquement                |
| `yarn analyze:browser`   | Build + analyse du bundle navigateur uniquement             |

## Architecture du repo

```
src/
├── constants/        Constantes globales (URLs, couleurs du thème, noms de cookies, IDs Firestore…)
├── data/             Données statiques (articles de blog en Markdown)
├── firebase/
│   ├── auth/         Wrappers de l'auth Firebase (subscribe, delete, reload, sendEmailVerification)
│   ├── firestore/    Wrappers Firestore (cities, scenarios, stripe, users)
│   └── functions/    Wrappers des Cloud Functions
├── gui/
│   └── components/   Composants React partagés (Layout, Navbar, Footer, CookiesBanner, …)
├── hooks/            Custom hooks (useCurrentUser, useAnalyticsEventTracker, useApp{Dispatch,Selector})
├── pages/            Pages Next.js (Pages Router)
│   ├── [cityId]/     Routes dynamiques par ville
│   ├── achat/        Tunnel d'achat
│   ├── blog/         Articles de blog
│   ├── compte/       Espace utilisateur
│   └── …             Autres pages statiques (CGU, mentions légales, FAQ, etc.)
├── store/            Redux Toolkit (slices, store)
├── styles/           Styles SCSS globaux + thème styled-components
├── types/            Types TypeScript partagés
└── utils/            Utilitaires (notifications, formatters, …)

public/               Assets statiques (images, fonts, robots.txt, sitemap.xml, _redirects Netlify)
```

## Workflow de contribution

- **`main`** = production. Tout push sur `main` redéploie automatiquement
  sur Netlify. **Ne jamais y pousser directement.**
- **`dev`** = branche de travail / intégration. Toutes les features partent
  de `dev` et y sont mergées.

### Cycle d'une modif

1. Créer une branche `feature/<sujet>` depuis `dev`
2. Commit régulièrement avec des messages explicites (cf.
   [Conventional Commits](https://www.conventionalcommits.org/) :
   `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`…)
3. Pousser la branche et ouvrir une PR vers `dev`
4. Une fois validée et mergée dans `dev`, ouvrir une PR `dev → main`
   pour déployer en production

## Conformité RGPD

- Le tag Google Tag Manager (GTM) n'est chargé qu'**après consentement
  explicite** de l'utilisateur via le bandeau cookies (`CookiesBanner.tsx`).
- Le cookie de consentement est nommé `ga-consent` et expire à 150 jours.
- L'option `anonymize_ip: true` est activée dans la config gtag.
- En cas de refus ou de retrait du consentement, les cookies GA (`_ga`,
  `_gat`, `_gid`) sont automatiquement supprimés.

Voir `src/gui/components/layout.tsx` et `src/gui/components/CookiesBanner.tsx`
pour le détail.

## Tech debt connue

- **Préfixe `NEXT_PUBLIC_REACT_APP_*`** : héritage d'une migration depuis
  Create React App. À renommer en `NEXT_PUBLIC_*` dans une MR future, en
  ajustant `firebase/index.tsx`, `stripeFirestore.tsx` et le `.env.local` /
  variables Netlify.
- **`react-ga`** : dépendance morte (à supprimer — voir MR dédiée).
- **styled-components** : à migrer vers CSS modules (cohérent avec le SCSS
  déjà en place).
- **Next.js 13.1** : version intermédiaire à mettre à jour vers la dernière
  LTS.
