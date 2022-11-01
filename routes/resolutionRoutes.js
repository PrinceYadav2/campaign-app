const express = require("express");
const { getAllResolutions } = require("../controller/resolutionController");

const router = express.Router();

router.route("/").get(getAllResolutions);

module.exports = router;
