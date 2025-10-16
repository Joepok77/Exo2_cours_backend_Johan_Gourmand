const mongoose = require('mongoose');

/**
 * Connexion a la base de donnees MongoDB
 * Utilise l'URL de connexion definie dans les variables d'environnement
 */
const connectDB = async () => {
  try {
    console.log('Tentative de connexion a MongoDB...');
    console.log('URI:', process.env.MONGODB_URI);

    await mongoose.connect(process.env.MONGODB_URI);

    console.log('✅ MongoDB connecte avec succes');
  } catch (error) {
    console.error('❌ Erreur de connexion a MongoDB:', error.message);
    console.error('Details:', error);
    process.exit(1); // Arrete l'application en cas d'erreur
  }
};

// Evenements de connexion
mongoose.connection.on('connected', () => {
  console.log('🔗 Mongoose connecte a MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('⚠️ Erreur Mongoose:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('❌ Mongoose deconnecte de MongoDB');
});

module.exports = connectDB;