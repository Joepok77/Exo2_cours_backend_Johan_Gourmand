const express = require('express');
const TaskController = require('../controllers/taskController');

const router = express.Router();

// GET /api/todos - Lister toutes les taches
router.get('/', TaskController.list);

// POST /api/todos - Ajouter une tache
router.post('/', TaskController.add);

// DELETE /api/todos/:id - Supprimer une tache
router.delete('/:id', TaskController.delete);

module.exports = router;
