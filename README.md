# Template Next.js & Supabase

Ce projet est un template pour démarrer rapidement avec Next.js et Supabase. Il vous permet de configurer un environnement de développement en quelques étapes simples.

## Prérequis

- Node.js installé sur votre machine
- Compte Vercel pour le déploiement

## Installation

1. Clonez ce dépôt sur votre machine locale.

2. Installez les dépendances du projet :

   ```bash
   npm install
   ```

3. Liez votre projet à Vercel :

   ```bash
   npx vercel link
   ```

4. Récupérez les variables d'environnement de Vercel :

   ```bash
   npx vercel env pull .env.development
   ```

5. Démarrez le serveur de développement :

   ```bash
   npm run dev
   ```

## Déploiement

Pour déployer votre application, utilisez la commande suivante :

## URL de Production

L'application est déployée à l'URL suivante : [Voltix Production](https://voltix-ns9krhbzx-giovanni532s-projects.vercel.app/)

## Lancer le Seed

Pour initialiser la base de données avec des données de test, exécutez la commande suivante :

```bash
npm run seed
```

Assurez-vous que votre base de données est correctement configurée avant de lancer cette commande.
