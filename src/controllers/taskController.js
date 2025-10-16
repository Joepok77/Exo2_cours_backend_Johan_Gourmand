const Task = require('../models/task');

class TaskController {
  constructor() {
    this.tasks = [];
  }

  // Créer une tâche
  createTask(title, description = '') {
    const task = new Task(title, description);
    this.tasks.push(task);
    return task;
  }

  // Récupérer toutes les tâches
  getAllTasks() {
    return this.tasks;
  }

  // Supprimer une tâche par ID
  deleteTask(taskId) {
    const taskIndex = this.tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
      this.tasks.splice(taskIndex, 1);
      return true;
    }
    return false;
  }

  // Compter les tâches
  getTaskCount() {
    return this.tasks.length;
  }
}

module.exports = TaskController;