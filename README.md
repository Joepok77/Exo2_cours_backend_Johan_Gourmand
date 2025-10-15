# ToDoList API - Express

API simple pour gérer une liste de tâches, développée en JavaScript avec Express et une architecture MVC.

## Structure du Projet

```
express_todolist/
├── models/
│   └── task.js
├── controllers/
│   └── taskController.js
├── routes/
│   └── taskRoutes.js
├── .gitignore
├── app.js
├── package.json
└── README.md
```

## Architecture MVC

- **Models** (`models/`): Classe `Task` représentant une tâche
- **Controllers** (`controllers/`): `TaskController` gère la logique métier
- **Routes** (`routes/`): Définition des endpoints API

## Installation

```bash
git clone https://github.com/Joepok77/Exo2_cours_backend_Johan_Gourmand.git

cd Exo2_cours_backend_Johan_Gourmand

# Installer les dépendances de production
npm install express cors dotenv

# Installer les dépendances de développement
npm install --save-dev nodemon
```

## Utilisation

```bash
# Lancer le serveur
npm start

# Ou en mode développement (avec nodemon)
npm run dev
```

L'API sera disponible sur http://localhost:3000

## Fonctionnalités

L'API expose 3 endpoints :

- **GET /tasks** - Voir toutes les tâches
- **POST /tasks** - Ajouter une tâche
- **DELETE /tasks/:id** - Supprimer une tâche

## Exemples d'utilisation

### Voir toutes les tâches
```bash
curl http://localhost:3000/tasks
```

Réponse :
```json
{
  "success": true,
  "count": 2,
  "tasks": [
    {
      "id": 1,
      "title": "Faire les courses",
      "description": "Acheter du pain et du lait",
      "createdAt": "2025-10-15T10:30:00.000Z"
    }
  ]
}
```

### Ajouter une tâche
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Ma tâche", "description": "Description optionnelle"}'
```

Réponse :
```json
{
  "success": true,
  "message": "Task created",
  "task": {
    "id": 1,
    "title": "Ma tâche",
    "description": "Description optionnelle",
    "createdAt": "2025-10-15T10:30:00.000Z"
  }
}
```

### Supprimer une tâche
```bash
curl -X DELETE http://localhost:3000/tasks/1
```

Réponse :
```json
{
  "success": true,
  "message": "Task deleted"
}
```





