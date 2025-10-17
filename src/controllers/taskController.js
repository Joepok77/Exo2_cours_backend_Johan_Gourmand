const Task = require('../models/task');

/**
 * Controleur pour gerer les taches avec MongoDB
 * Utilise des methodes statiques comme dans le cours
 */
class TaskController {
  /**
   * GET /api/todos - Lister toutes les taches
   */
  static async list(_, res) {
    try {
      const tasks = await Task.find().sort({ createdAt: -1 });
      res.json({
        success: true,
        count: tasks.length,
        tasks: tasks
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  /**
   * POST /api/todos - Ajouter une tache
   */
  static async add(req, res) {
    try {
      const { title, description } = req.body;

      if (!title) {
        return res.status(400).json({
          success: false,
          error: 'Le titre est requis'
        });
      }

      const task = new Task({ title, description: description || '' });
      await task.save();

      res.status(201).json({
        success: true,
        message: 'Tache creee',
        task: task
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  /**
   * DELETE /api/todos/:id - Supprimer une tache
   */
  static async delete(req, res) {
    try {
      const taskId = req.params.id;
      const deletedTask = await Task.findByIdAndDelete(taskId);

      if (!deletedTask) {
        return res.status(404).json({
          success: false,
          error: 'Tache introuvable'
        });
      }

      res.json({
        success: true,
        message: 'Tache supprimee avec succes'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}

module.exports = TaskController;
