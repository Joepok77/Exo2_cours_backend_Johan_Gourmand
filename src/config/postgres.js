const { Pool } = require('pg');

/**
 * Configuration du pool de connexions PostgreSQL
 * Utilise les variables d'environnement pour la connexion
 */
const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

/**
 * Test de connexion a PostgreSQL
 */
const connectPostgres = async () => {
  try {
    console.log('Tentative de connexion a PostgreSQL...');
    const client = await pool.connect();
    console.log('✅ PostgreSQL connecte avec succes');
    client.release();
  } catch (error) {
    console.error('❌ Erreur de connexion a PostgreSQL:', error.message);
    console.error('Verifiez que PostgreSQL est installe et demarre');
  }
};

/**
 * Creer la table tasks si elle n'existe pas
 */
const createTasksTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT DEFAULT '',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(query);
    console.log('✅ Table tasks creee ou deja existante');
  } catch (error) {
    console.error('❌ Erreur lors de la creation de la table:', error.message);
  }
};

module.exports = {
  pool,
  connectPostgres,
  createTasksTable
};
