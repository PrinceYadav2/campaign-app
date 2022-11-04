const express = require('express');

const deviceController = require('../controller/deviceController');

const router = express.Router();


router.route('/:id/devices/').post(deviceController.addDevice).get(deviceController.getAllDevices);

module.exports = router;