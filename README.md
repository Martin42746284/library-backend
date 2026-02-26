# 🚀 BiblioThèque - API (Backend)

Bienvenue dans le cœur de **BiblioThèque**, une API REST construite avec Node.js, Express et PostgreSQL pour alimenter l'application de gestion de bibliothèque.

---

## 📖 Table des matières

1. [Aperçu technique](#aperçu-technique)
2. [Prérequis](#prérequis)
3. [Installation](#installation)
4. [Base de données](#base-de-données)
5. [Configuration](#configuration)
6. [Lancement](#lancement)pour
7. [Endpoints (Routes)](#endpoints-routes)

---

## Aperçu technique

L'API de BiblioThèque utilise les technologies suivantes:
- **Node.js**: Environnement d'exécution JavaScript
- **Express**: Framework web flexible et minimaliste
- **PostgreSQL**: Système de gestion de base de données relationnelle
- **JWT (JSON Web Tokens)**: Pour l'authentification sécurisée
- **Bcrypt**: Pour le hachage des mots de passe

### Fonctionnalités clés:
✅ Gestion complète de l'authentification (Register/Login)  
✅ Gestion du catalogue de livres (CRUD)  
✅ Système d'emprunt avec transactions SQL (anti-concurrency)  
✅ Statistiques avancées (Top livres, top utilisateurs, totaux)  
✅ Middleware de gestion des rôles (ADMIN/USER)  

---

## Prérequis

- **Node.js** (v18+)
- **PostgreSQL** (installé et en cours d'exécution)
- **npm** ou **yarn**

---

## Installation

1. Accédez au répertoire du backend:
   ```bash
   cd library-backend
   ```

2. Installez les dépendances:
   ```bash
   npm install
   ```

---

## Base de données

L'API nécessite une base de données PostgreSQL configurée.

### 1. Création de la base
Créez une base de données nommée `library_db` (ou le nom de votre choix).

### 2. Initialisation du schéma
Exécutez le script SQL de création des tables:
```bash
psql -d library_db -f src/database/schema.sql
```

### 3. Insertion des données (Seed)
Ajoutez les données de test (comptes utilisateurs et catalogue de livres):
```bash
psql -d library_db -f src/database/seed.sql
```

---

## Configuration

Créez un fichier `.env` à la racine de `library-backend/` avec les variables suivantes:

```env
PORT=3000
DATABASE_URL=postgres://votre_utilisateur:votre_mot_de_passe@localhost:5432/library_db
JWT_SECRET=votre_secret_tres_securise
```

- **PORT**: Port sur lequel l'API va écouter (ex: 3000).
- **DATABASE_URL**: URL de connexion PostgreSQL (format standard).
- **JWT_SECRET**: Chaîne de caractères aléatoire utilisée pour signer les tokens JWT.

---

## Lancement

### Développement (avec rechargement automatique)
```bash
npm run dev
```

### Production
```bash
npm start
```

Vérifiez que l'API fonctionne en accédant à `http://localhost:3000/api/health`.

---

## Endpoints (Routes)

L'API est préfixée par `/api`. Voici les routes principales:

### Authentification
- `POST /api/auth/register` : Créer un nouveau compte
- `POST /api/auth/login` : Se connecter (renvoie un token JWT)

### Livres
- `GET /api/books` : Liste tous les livres (avec filtres de recherche)
- `POST /api/books` : Ajouter un livre (ADMIN uniquement)
- `PUT /api/books/:id` : Modifier un livre (ADMIN uniquement)
- `DELETE /api/books/:id` : Supprimer un livre (ADMIN uniquement)

### Emprunts
- `POST /api/borrowings/:bookId` : Emprunter un livre
- `PUT /api/borrowings/:bookId/return` : Retourner un livre
- `GET /api/borrowings/me` : Liste des emprunts de l'utilisateur connecté

### Statistiques (ADMIN uniquement)
- `GET /api/stats/books` : Totaux par catégorie/livre
- `GET /api/stats/users` : Activité des utilisateurs
- `GET /api/stats/borrowings/total` : Nombre total d'emprunts
- `GET /api/stats/popular-books` : Top 10 des livres les plus empruntés

---

## Support

Pour toute question ou problème technique, veuillez consulter les logs ou contacter le support.

**Dernière mise à jour**: 2026
**Version**: 1.0.0
