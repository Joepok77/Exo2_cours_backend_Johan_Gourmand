const { pool } = require('../config/postgres');

/**
 * Controleur pour gerer les taches avec PostgreSQL
 * Utilise des methodes statiques comme dans le cours
 */
class TaskControllerPG {
  /**
   * GET /api/todos-pg - Lister toutes les taches
   */
  static async list(_, res) {
    const query = `
      SELECT id, title, description, created_at as "createdAt", updated_at as "updatedAt"
      FROM tasks
      ORDER BY created_at DESC
    `;

    try {
      const result = await pool.query(query);
      res.json({
        success: true,
        count: result.rows.length,
        database: 'PostgreSQL',
        tasks: result.rows
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  /**
   * POST /api/todos-pg - Ajouter une tache
   */
  static async add(req, res) {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        error: 'Le titre est requis'
      });
    }

    const query = `
      INSERT INTO tasks (title, description)
      VALUES ($1, $2)
      RETURNING id, title, description, created_at as "createdAt", updated_at as "updatedAt"
    `;

    try {
      const result = await pool.query(query, [title, description || '']);
      res.status(201).json({
        success: true,
        message: 'Tache creee',
        database: 'PostgreSQL',
        task: result.rows[0]
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  /**
   * DELETE /api/todos-pg/:id - Supprimer une tache
   */
  static async delete(req, res) {
    const taskId = parseInt(req.params.id);
    const query = 'DELETE FROM tasks WHERE id = $1 RETURNING id';

    try {
      const result = await pool.query(query, [taskId]);

      if (result.rowCount === 0) {
        return res.status(404).json({
          success: false,
          error: 'Tache introuvable'
        });
      }

      res.json({
        success: true,
        message: 'Tache supprimee avec succes',
        database: 'PostgreSQL'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}

module.exports = TaskControllerPG;
