const jwt = require('jsonwebtoken');
const Startup = require('../models/Startup');
const Mentor = require('../models/Mentor');
const Admin = require('../models/Admin');
const JWT_SIGNATURE = process.env.JWT_SECRET;

const authentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).send({ message: 'Token no proporcionado o formato incorrecto' });
    }

    const payload = jwt.verify(token, JWT_SIGNATURE);
    const { _id, role } = payload;

    let user;

    switch (role) {
      case 'startup':
        user = await Startup.findOne({ _id, 'tokens.token': token });
        break;
      case 'mentor':
        user = await Mentor.findOne({ _id, 'tokens.token': token });
        break;
      case 'admin':
        user = await Admin.findOne({ _id, 'tokens.token': token });
        break;
      default:
        return res.status(401).send({ message: 'Rol de usuario no válido' });
    }

    if (!user) {
      return res.status(401).send({ message: 'Token no válido o usuario no encontrado' });
    }

    req.user = user;
    req.token = token;
    req.role = role;

    next();
  } catch (error) {
    console.error('Error en autenticación:', error.message);
    res.status(401).send({ message: 'Token inválido', error: error.message });
  }
};

module.exports = { authentication };
