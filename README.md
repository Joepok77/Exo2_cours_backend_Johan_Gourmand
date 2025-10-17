# ToDoList API - Express

API simple pour gérer une liste de tâches, développée en JavaScript avec Express et une architecture MVC.
**Support de deux bases de données : MongoDB et PostgreSQL**

## Structure du Projet

```
express_todolist/
├── src/
│   ├── config/
│   │   ├── db.js            (Configuration MongoDB)
│   │   └── postgres.js      (Configuration PostgreSQL)
│   ├── controllers/
│   │   ├── taskController.js     (Controleur MongoDB)
│   │   └── taskControllerPG.js   (Controleur PostgreSQL)
│   ├── models/
│   │   └── task.js          (Schema Mongoose)
│   └── routes/
│       ├── taskRoutes.js    (Routes MongoDB)
│       └── taskRoutesPG.js  (Routes PostgreSQL)
├── .gitignore
├── .env
├── app.js
├── package.json
└── README.md
```

## Architecture MVC

- **Models** (`src/models/`): Schema Mongoose pour MongoDB
- **Controllers** (`src/controllers/`): Logique metier pour les deux bases de donnees
- **Routes** (`src/routes/`): Endpoints API pour MongoDB et PostgreSQL
- **Config** (`src/config/`): Configuration des connexions aux bases de donnees

## Installation

```bash
git clone https://github.com/Joepok77/Exo2_cours_backend_Johan_Gourmand.git

cd Exo2_cours_backend_Johan_Gourmand

# Installer les dependances de production
npm install 

```

## Configuration

### 1. Copier le fichier .env.example

```bash
cp .env.example .env
```

### 2. Configurer les variables d'environnement dans .env

```env
# Serveur
PORT=3000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://127.0.0.1:27017/todolist

# PostgreSQL
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=todolist
POSTGRES_USER=postgres
POSTGRES_PASSWORD=votre_mot_de_passe
```

### 3. Installer et demarrer les bases de donnees

**MongoDB :**
- Telecharger : https://www.mongodb.com/try/download/community
- Le service doit tourner sur le port 27017

**PostgreSQL :**
- Telecharger : https://www.postgresql.org/download/
- Creer une base de donnees `todolist`
- Le service doit tourner sur le port 5432

## Utilisation

```bash
# Lancer le serveur
npm start

# Ou en mode developpement (avec nodemon)
npm run dev
```

L'API sera disponible sur http://localhost:3000

## Fonctionnalites

L'API expose **2 sets d'endpoints** (un par base de donnees) :

### Endpoints MongoDB

- **GET /api/todos** - Voir toutes les taches
- **POST /api/todos** - Ajouter une tache
- **DELETE /api/todos/:id** - Supprimer une tache

### Endpoints PostgreSQL

- **GET /api/todos-pg** - Voir toutes les taches
- **POST /api/todos-pg** - Ajouter une tache
- **DELETE /api/todos-pg/:id** - Supprimer une tache

## Exemples d'utilisation

### MongoDB

#### Voir toutes les taches
```bash
curl http://localhost:3000/api/todos
```

Reponse :
```json
{
  "success": true,
  "count": 2,
  "tasks": [
    {
      "id": "68f10672491c5e2290072f27",
      "title": "Faire les courses",
      "description": "Acheter du pain et du lait",
      "createdAt": "2025-10-16T14:51:30.613Z"
    }
  ]
}
```

#### Ajouter une tache
```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Ma tache", "description": "Description optionnelle"}'
```

#### Supprimer une tache
```bash
curl -X DELETE http://localhost:3000/api/todos/68f10672491c5e2290072f27
```

### PostgreSQL

#### Voir toutes les taches
```bash
curl http://localhost:3000/api/todos-pg
```

Reponse :
```json
{
  "success": true,
  "count": 1,
  "database": "PostgreSQL",
  "tasks": [
    {
      "id": 1,
      "title": "Faire du sport",
      "description": "Aller courir 30min",
      "createdAt": "2025-10-16T14:51:30.613Z"
    }
  ]
}
```

#### Ajouter une tache
```bash
curl -X POST http://localhost:3000/api/todos-pg \
  -H "Content-Type: application/json" \
  -d '{"title": "Ma tache", "description": "Description optionnelle"}'
```

#### Supprimer une tache
```bash
curl -X DELETE http://localhost:3000/api/todos-pg/1
```

## Technologies utilisees

- **Express.js** - Framework web
- **MongoDB** + **Mongoose** - Base de donnees NoSQL
- **PostgreSQL** + **pg** - Base de donnees SQL
- **dotenv** - Gestion des variables d'environnement
- **nodemon** - Rechargement automatique en developpement


