const express = require('express');
const TaskControllerPG = require('../controllers/taskControllerPG');

const router = express.Router();

// GET /api/todos-pg - Lister toutes les taches
router.get('/', TaskControllerPG.list);

// POST /api/todos-pg - Ajouter une tache
router.post('/', TaskControllerPG.add);

// DELETE /api/todos-pg/:id - Supprimer une tache
router.delete('/:id', TaskControllerPG.delete);

module.exports = router;
