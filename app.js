require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');
const TaskController = require('./src/controllers/taskController');
const taskRoutes = require('./src/routes/taskRoutes');

const app = express();

// Connexion à MongoDB (asynchrone)
connectDB();
const PORT = process.env.PORT || 3000;

// Middleware pour parser le JSON
app.use(express.json());

// Créer une instance du contrôleur
const taskController = new TaskController();

app.use('/', taskRoutes(taskController));

app.listen(PORT, () => {
  console.log(`API disponible sur: http://localhost:${PORT}`);
});