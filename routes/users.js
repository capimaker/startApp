const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/UsersController');
const { authentication } = require('../middlewares/authentication');


router.post('/', UsersController.login);
router.post('/logout', authentication, UsersController.logout);


module.exports = router;
