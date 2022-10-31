const express = require("express");

const { findOrgByUID } = require("../controller/organizationController");
const { route } = require("./usersRoutes");

const router = express.Router();

router.route("/:id/organizations/uid/:uid").get(findOrgByUID);

module.exports = router;
