require('dotenv').config();
const Users = require('../models/Users');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const UsersController = {

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email });
      if (!user || user.password !== password) {
        return res.status(401).send({ msg: 'Usuario o contraseña incorrectos' });
      }

      const token = jwt.sign(
        { _id: user._id, email: user.email },
        JWT_SECRET,
      );

      await Users.findByIdAndUpdate(user._id, {
        $push: { tokens: token }
      });

      res.status(200).send({
        msg: `Bienvenid@`,
        token,
      });
    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).send('Error en el login');
    }
  },

  async logout(req, res) {
    try {
      if (!req.user) return res.status(401).send('No autorizado');

      await Users.findByIdAndUpdate(req.user._id, {
        $pull: { tokens: req.token },
      });

      res.send('Desconectad@ con éxito');
    } catch (error) {
      console.error('Error en logout:', error.message);
      res.status(500).send('Error al desconectar');
    }
  },

}

module.exports = UsersController;