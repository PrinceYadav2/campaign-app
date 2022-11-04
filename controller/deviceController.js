const Device = require("../models/device");
const Response = require("../response/response");
const Helper = require("../helpers/helpers");

const helper = new Helper();
const response = new Response();

exports.addDevice = async (req, res, next) => {
  const reqkeysRequired = [
    "deviceName",
    "deviceModel",
    "deviceBrand",
    "resolutionId",
    "deviceSize",
    "deviceLocation",
    "deviceStatus",
  ];
  // Verify If request body contains needed keys & value is present for them too.
  const isRequestValidated = helper.validateRequest(req.body, reqkeysRequired);
  // Verify the format the orgId.
  const orgId = req.params.id;
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
  const [deviceRow, deviceFields] = await device.getDeviceByID(rows["insertId"]);
  const resKeysRequired = [
    "id",
    "uid",
    "deviceName",
    "device",
    "deviceBrand",
    "deviceSize",
    "deviceLocation",
    "deviceStatus",
    "playingCampaign",
    "activeCampaigns",
    "createdAt",
    "updatedAt",
    "organizationID",
    "resolutionId",
  ];
  const data = helper.filterKeys(deviceRow[0], resKeysRequired);
  res.json(response.generateResponse(200, "SUCCESS", data));
};
