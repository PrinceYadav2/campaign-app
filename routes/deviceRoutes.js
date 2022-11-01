const express = require('express');

const deviceController = require('../controller/deviceController');

const router = express.Router();


router.route('/:id/devices/').post(deviceController.addDevice);

module.exports = router;