const Device = require("../models/device");
const Response = require("../response/response");
const Helper = require("../helpers/helpers");

const helper = new Helper();
const response = new Response();

exports.addDevice = async (req, res, next) => {
  keysRequired = [
    "deviceName",
    "deviceModel",
    "deviceBrand",
    "resolutionId",
    "deviceSize",
    "deviceLocation",
    "deviceStatus",
  ];
  // Verify If request body contains needed keys & value is present for them too.
  const isRequestValidated = helper.validateRequest(req.body, keysRequired);
  // Verify the format the orgId.
  const orgId = req.params.id;
  console.log("Organziation ID", orgId);
  const orgRegxp = /^\d+$/;
  if (!isRequestValidated || !orgRegxp.test(orgId)) {
    const resp = response.generateInvalidRequest();
    res.status(400).json(resp);
  }
  const {
    deviceName,
    deviceModel,
    deviceBrand,
    resolutionId,
    deviceSize,
    deviceLocation,
    deviceStatus,
  } = req.body;
  const device = new Device(
    deviceName,
    deviceModel,
    deviceBrand,
    resolutionId,
    deviceSize,
    deviceLocation,
    deviceStatus
  );

  const [rows, field] = await device.save(orgId);
  if (!rows) {
    const resp = response.generateNotFoundResp(
      `Organization with orgId : ${orgId} can't be found`
    );
    res.status(404).json(resp);
  }

  res.json({ status: 200, message: "We are good" });
};
