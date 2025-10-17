require('dotenv').config();
const express = require('express');
const cors = require('cors');

// MongoDB
const connectDB = require('./src/config/db');
const taskRoutes = require('./src/routes/taskRoutes');

// PostgreSQL
const { connectPostgres, createTasksTable } = require('./src/config/postgres');
const taskRoutesPG = require('./src/routes/taskRoutesPG');

const app = express();

// Connexion aux bases de donnees
connectDB(); 
connectPostgres().then(() => {
  createTasksTable(); // Creer la table tasks si elle n'existe pas
});

const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes MongoDB
app.use('/api/todos', taskRoutes);

// Routes PostgreSQL
app.use('/api/todos-pg', taskRoutesPG);

// Route d'accueil pour indiquer les endpoints disponibles
app.get('/', (_, res) => {
  res.json({
    message: 'TodoList API - Dual Database Support',
    endpoints: {
      mongodb: {
        getAll: 'GET /api/todos',
        create: 'POST /api/todos',
        delete: 'DELETE /api/todos/:id'
      },
      postgresql: {
        getAll: 'GET /api/todos-pg',
        create: 'POST /api/todos-pg',
        delete: 'DELETE /api/todos-pg/:id'
      }
    }
  });
});

app.listen(PORT, () => {
  console.log(`API disponible sur: http://localhost:${PORT}`);

});
