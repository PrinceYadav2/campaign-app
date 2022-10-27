const express = require('express');

const usersController = require('../controller/userController');

const router = express.Router();


router.route('/signup').post(usersController.createUser)

module.exports = router;