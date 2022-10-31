const express = require("express");
const { getAllCountries } = require("../controller/countryController");

const router = express.Router();

router.route("/").get(getAllCountries);

module.exports = router;
