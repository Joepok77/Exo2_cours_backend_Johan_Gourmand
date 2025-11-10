const express = require('express');
const TaskControllerPG = require('../controllers/taskControllerPG');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

// Proteger toutes les routes avec le middleware d'authentification
router.use(authMiddleware);

// GET /api/todos-pg - Lister toutes les taches
router.get('/', TaskControllerPG.list);

// POST /api/todos-pg - Ajouter une tache
router.post('/', TaskControllerPG.add);

// DELETE /api/todos-pg/:id - Supprimer une tache
router.delete('/:id', TaskControllerPG.delete);

module.exports = router;
