require('dotenv').config();
const express = require('express');
const cors = require('cors');

// MongoDB
const connectDB = require('./src/config/db');
const taskRoutes = require('./src/routes/taskRoutes');

// PostgreSQL
const { connectPostgres, createTasksTable } = require('./src/config/postgres');
const taskRoutesPG = require('./src/routes/taskRoutesPG');

// Authentication
const authRoutes = require('./src/routes/authRoutes');

// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();

// Connexion aux bases de donnees
connectDB(); 
connectPostgres().then(() => {
  createTasksTable(); // Creer la table tasks si elle n'existe pas
});

const PORT = process.env.PORT || 3000;

// Middlewares
// Configuration CORS pour autoriser les headers d'authentification
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Authorization', 'Content-Type'],
  credentials: true
}));
app.use(express.json());

// TODO: Ajouter le rate limiting pour la sécurité (protection contre brute force, DDoS)
// Installer: npm install express-rate-limit
// Exemple d'utilisation:
// const rateLimit = require('express-rate-limit');
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // Limit of 100 requests per IP
//   message: 'Trop de requêtes, réessayez plus tard.'
// });
// app.use('/api/', limiter);

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes Authentication
app.use('/api/auth', authRoutes);

// Routes MongoDB
app.use('/api/todos', taskRoutes);

// Routes PostgreSQL
app.use('/api/todos-pg', taskRoutesPG);

// Route d'accueil pour indiquer les endpoints disponibles
app.get('/', (_, res) => {
  res.json({
    message: 'TodoList API - Dual Database Support with JWT Authentication',
    endpoints: {
      auth: {
        signup: 'POST /api/auth/signup',
        login: 'POST /api/auth/login'
      },
      mongodb: {
        getAll: 'GET /api/todos (requires token)',
        create: 'POST /api/todos (requires token)',
        delete: 'DELETE /api/todos/:id (requires token)'
      },
      postgresql: {
        getAll: 'GET /api/todos-pg (requires token)',
        create: 'POST /api/todos-pg (requires token)',
        delete: 'DELETE /api/todos-pg/:id (requires token)'
      }
    }
  });
});

app.listen(PORT, () => {
  console.log(`API disponible sur: http://localhost:${PORT}`);

});
