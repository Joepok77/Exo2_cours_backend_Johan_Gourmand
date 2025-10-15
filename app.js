const express = require('express');
const TaskController = require('./controllers/taskController');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = 3000;

// Middleware pour parser le JSON
app.use(express.json());

// Créer une instance du contrôleur
const taskController = new TaskController();


app.use('/', taskRoutes(taskController));


app.listen(PORT, () => {
  console.log(`API disponible sur: http://localhost:${PORT}`);
});