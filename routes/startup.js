const express = require('express');
const router = express.Router();
const StartupController = require('../controllers/StartupController');
const { authentication } = require('../middlewares/authentication');

// Multer para subir logo
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Registro de startup con subida de logo opcional
router.post('/register', upload.single('logo'), StartupController.register);

router.post('/login', StartupController.login);
router.post('/logout', authentication, StartupController.logout);
router.get('/me', authentication, StartupController.getProfile);

// Actualizar perfil de startup (con posibilidad de subir nuevo logo)
router.put('/update', authentication, upload.single('logo'), StartupController.update);

module.exports = router;
