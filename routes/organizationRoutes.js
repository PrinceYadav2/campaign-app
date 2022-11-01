const express = require("express");

const { findOrgByUID } = require("../controller/organizationController");
const deviceRouter = require("./deviceRoutes");


const router = express.Router();


router.use("/", deviceRouter);
router.route("/:id/organizations/uid/:uid").get(findOrgByUID);

module.exports = router;
