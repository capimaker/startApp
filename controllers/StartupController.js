require('dotenv').config();
const Startup = require('../models/Startup');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const JWT_SECRET = process.env.JWT_SECRET;

const StartupController = {
  async register(req, res) {
    try {
      if (!req.body.password) {
        return res.status(400).send('La contraseña es obligatoria');
      }

      const hashedPassword = bcrypt.hashSync(req.body.password, 10);
      const logoPath = req.file ? req.file.path : null;

      const startup = await Startup.create({
        ...req.body,
        password: hashedPassword,
        logo: logoPath,
        app_role: 'startup',
        tokens: [],
      });

      res.status(201).send({ msg: 'Startup registrada correctamente', startup });
    } catch (error) {
      console.error('Error en register:', error.message);
      res.status(500).send('Error al registrar la startup');
    }
  },

  async login(req, res) {
    try {
      const startup = await Startup.findOne({ email: req.body.email });
      if (!startup) return res.status(400).send('Email o contraseña incorrectos');

      /*   const isMatch = await bcrypt.compare(req.body.password, startup.password); */
      const isMatch = req.body.password === startup.password;
      if (!isMatch) return res.status(400).send('Email o contraseña incorrectos');

      const token = jwt.sign({ _id: startup._id, appRole: 'startup' }, JWT_SECRET);
      if (startup.tokens.length > 4) startup.tokens.shift(); // Máximo de 5 tokens en el array.
      startup.tokens.push(token);
      await startup.save();

      res.status(200).send({
        msg: `Bienvenid@ ${startup.name}`,
        token,
      });
    } catch (error) {
      console.error('Error en login:', error.message);
      res.status(500).send('Error en el login');
    }
  },

  async logout(req, res) {
    try {
      if (!req.user) return res.status(401).send('No autorizado');

      await Startup.findByIdAndUpdate(req.user._id, {
        $pull: { tokens: req.token },
      });

      res.send('Desconectad@ con éxito');
    } catch (error) {
      console.error('Error en logout:', error.message);
      res.status(500).send('Error al desconectar');
    }
  },

  async update(req, res) {
    try {
      const updateData = { ...req.body };
      if (req.file) updateData.logo = req.file.path;

      const updatedStartup = await Startup.findByIdAndUpdate(req.user._id, updateData, { new: true });
      res.status(200).send(updatedStartup);
    } catch (error) {
      console.error('Error en update:', error.message);
      res.status(500).send('Error al actualizar la startup');
    }
  },

  async getProfile(req, res) {
    try {
      const startup = await Startup.findById(req.user._id).select('-password -tokens');
      res.status(200).send(startup);
    } catch (error) {
      console.error('Error en getProfile:', error.message);
      res.status(500).send('Error al obtener el perfil');
    }
  },
};

module.exports = StartupController;
