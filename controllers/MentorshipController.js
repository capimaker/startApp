const Mentorship = require('../models/Mentorship');

module.exports = {
  // Crear una nueva sesión de mentoría
  createSession: async (req, res) => {
    try {
      const session = await Mentorship.create(req.body);
      res.status(201).json(session);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Obtener todas las sesiones por ID de mentor
  getSessionsByMentor: async (req, res) => {
    try {
      const sessions = await Mentorship.find({ mentor: req.params.id })
        .populate('mentee', 'name company email'); // Muestra campos específicos del mentee
      res.status(200).json(sessions);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Actualizar sesión de mentoría (ej: marcar como completada)
  updateSession: async (req, res) => {
    try {
      const session = await Mentorship.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json(session);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
