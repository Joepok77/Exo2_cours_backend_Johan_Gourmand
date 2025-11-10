const express = require('express');
const TaskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

// Proteger toutes les routes avec le middleware d'authentification
router.use(authMiddleware);

// GET /api/todos - Lister toutes les taches
router.get('/', TaskController.list);

// POST /api/todos - Ajouter une tache
router.post('/', TaskController.add);

// DELETE /api/todos/:id - Supprimer une tache
router.delete('/:id', TaskController.delete);

module.exports = router;
