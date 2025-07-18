const express = require('express');
const router = express.Router();
const MentorshipController = require('../controllers/MentorshipController');

// Crear sesión de mentoría
router.post('/sessions', MentorshipController.createSession);

// Obtener sesiones por mentor
router.get('/sessions/by-mentor/:id', MentorshipController.getSessionsByMentor);

// Actualizar sesión
router.put('/sessions/:id', MentorshipController.updateSession);

module.exports = router;

