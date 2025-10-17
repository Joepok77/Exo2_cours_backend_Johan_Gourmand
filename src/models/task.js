const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Le titre est obligatoire'],
    trim: true
  },
  description: {
    type: String,
    default: '',
    trim: true
  }
}, {
  timestamps: true // Ajoute automatiquement createdAt et updatedAt
});

/**
 * Methode pour formater la tache en JSON
 */
taskSchema.methods.toJSON = function() {
  const task = this.toObject();
  return {
    id: task._id,
    title: task.title,
    description: task.description,
    createdAt: task.createdAt
  };
};

module.exports = mongoose.model('Task', taskSchema);
