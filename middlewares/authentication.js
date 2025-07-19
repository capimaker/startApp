const jwt = require('jsonwebtoken');
const Users = require('../models/Users');
const JWT_SECRET = process.env.JWT_SECRET;

const authentication = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).send({ msg: 'Token no proporcionado' });

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await Users.findOne({ _id: decoded._id, tokens: token });

    if (!user) return res.status(401).send({ msg: 'Token inválido' });

    req.token = token;
    req.user = user;

    next();
  } catch (error) {
    console.error('Error en autenticación:', error.message);
    res.status(401).send({ msg: 'No autorizado' });
  }
};

module.exports = { authentication };