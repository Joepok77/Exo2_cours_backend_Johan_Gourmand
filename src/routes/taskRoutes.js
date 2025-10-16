const express = require('express');
const router = express.Router();

module.exports = (controller) => {
  // GET /tasks - Récupérer toutes les tâches
  router.get('/tasks', (req, res) => {
    const tasks = controller.getAllTasks();
    res.json({
      success: true,
      count: tasks.length,
      tasks: tasks.map(task => task.toJSON())
    });
  });

  // POST /tasks - Créer une nouvelle tâche
  router.post('/tasks', (req, res) => {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        error: 'Title is required'
      });
    }

    const task = controller.createTask(title, description || '');
    res.status(201).json({
      success: true,
      message: 'Task created',
      task: task.toJSON()
    });
  });

  // DELETE /tasks/:id - Supprimer une tâche
  router.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const success = controller.deleteTask(taskId);

    if (!success) {
      return res.status(404).json({
        success: false,
        error: 'Task not found'
      });
    }

    res.json({
      success: true,
      message: 'Task deleted'
    });
  });

  return router;
};