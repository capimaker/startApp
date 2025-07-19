const jwt = require('jsonwebtoken');
const Startup = require('../models/Startup');
const JWT_SECRET = process.env.JWT_SECRET;

const authentication = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).send({ message: 'Token no proporcionado o formato incorrecto' });
    }

    const token = authHeader.replace('Bearer ', '');
    const payload = jwt.verify(token, JWT_SECRET);
    const { _id, appRole } = payload;

    let user;

    switch (appRole) {
      case 'startup':
        user = await Startup.findOne({ _id, tokens: token });
        break;
      case 'mentor':
        user = await Mentor.findOne({ _id, tokens: token });
        break;
      case 'admin':
        user = await Admin.findOne({ _id, tokens: token });
        break;
      default:
        return res.status(401).send({ message: 'Rol de usuario no válido' });
    }

    if (!user) {
      return res.status(401).send({ message: 'Token no válido o usuario no encontrado' });
    }

    req.user = user;
    req.token = token;
    req.role = appRole;

    next();
  } catch (error) {
    console.error('Error en autenticación:', error.message);
    res.status(401).send({ message: 'Token inválido', error: error.message });
  }
};

module.exports = { authentication };
