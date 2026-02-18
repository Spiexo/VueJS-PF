# 💎 VueJS-PF | E-Commerce

Une application e-commerce moderne construite avec **Vue 3**, **TypeScript** et **Pinia**, offrant une expérience utilisateur fluide avec un design esthétique "Liquid Glass".

## ✨ Caractéristiques

- 🎨 **Design** : Esthétique "Liquid Glass" inspirée de macOS/iOS (frosted glass, gradients dynamiques).
- 🛍️ **Catalogue de Produits** : Affichage dynamique des produits récupérés via une API externe.
- 🔍 **Recherche Intelligente** : Filtrage en temps réel des produits.
- 🛒 **Gestion du Panier** : Store Pinia complet pour gérer l'ajout, la suppression et les quantités.
- 💱 **Multi-Devises** : Conversion dynamique des prix (USD, EUR, GBP, JPY) avec un store dédié.
- 📝 **Formulaire de Contact** : Validation robuste côté client et gestion des états de succès.
- 🚀 **Performance** : Mise en cache locale des produits pour réduire les appels API.
- 🧪 **Qualité** : Suite complète de tests unitaires (Vitest) et typage TypeScript strict.

## 🛠️ Stack Technique

- **Framework** : [Vue.js 3](https://vuejs.org/) (Composition API)
- **Gestion d'état** : [Pinia](https://pinia.vuejs.org/)
- **Routage** : [Vue Router 4](https://router.vuejs.org/)
- **Langage** : [TypeScript](https://www.typescriptlang.org/)
- **Build Tool** : [Vite](https://vitejs.dev/)
- **API Produits** : [FakeStoreAPI](https://fakestoreapi.com/)
- **API Devises** : [ExchangeRate-API](https://www.exchangerate-api.com/)
- **Tests** : [Vitest](https://vitest.dev/)

## 📁 Structure du Projet

```text
src/
├── api/          # Appels API (Product Service)
├── assets/       # Styles globaux (Variables Liquid Glass)
├── components/   # Composants UI réutilisables
├── router/       # Configuration des routes
├── stores/       # Gestion d'état globale (Cart, Currency, Product)
│   └── __tests__/ # Tests unitaires des stores
├── types/        # Interfaces et types TypeScript
└── views/        # Pages de l'application
```

## 🚀 Installation

### 1. Cloner le dépôt

```sh
git clone https://github.com/Spiexo/VueJS-PF.git
cd VueJS-PF
```

### 2. Installer les dépendances

```sh
npm install
```

### 3. Lancer en mode développement

```sh
npm run dev
```

### 4. Lancer les tests

```sh
npm run test

npm run test -- --coverage
```

## 📖 Scripts disponibles

| Commande             | Description                                 |
| :------------------- | :------------------------------------------ |
| `npm run dev`        | Lance le serveur de développement.          |
| `npm run build`      | Compile l'application pour la production.   |
| `npm run test`       | Exécute les tests unitaires une seule fois. |
| `npm run test:watch` | Exécute les tests en mode watch.            |
| `npm run type-check` | Vérifie le typage TypeScript.               |
| `npm run lint`       | Analyse et corrige le code avec ESLint.     |

## 👷‍♂️ Setup recommandé

- **IDE** : [VS Code](https://code.visualstudio.com/) + extension [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar).
- **Outils** : [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd).

---

_Projet réalisé dans le cadre du cours Web Avance Front - B3 Ynov 2025-2026._
