const db = require("../dbServer");
const Organization = require("./organization");
const Resolution = require("./resolution");
const Helper = require("../helpers/helpers");
const {
  DEVICE_TABLE_NAME,
  ORGANIZATION_TABLE_NAME,
} = require("../utils/constant");

const helper = new Helper();

class Device {
  constructor(
    deviceName,
    deviceModel,
    deviceBrand,
    resolutionId,
    deviceSize,
    deviceLocation,
    deviceStatus
  ) {
    this.deviceName = deviceName;
    this.deviceModel = deviceModel;
    this.deviceBrand = deviceBrand;
    this.resolutionId = resolutionId;
    this.deviceSize = deviceSize;
    this.deviceLocation = deviceLocation;
    this.deviceStatus = deviceStatus;
  }

  async save(orgId) {
    const deviceUID = await Organization.updateOrganization(orgId);
    if (deviceUID === false) {
      return [false];
    }

    const [deviceResolutionRow, deviceResolutionFields] =
      await Resolution.getResolutionById(this.resolutionId);
    const deviceResolution = deviceResolutionRow[0]["commonName"];
    const date = helper.getCurrentDate();
    const orgName = await Organization.getOrganizationProperty(orgId, 'name');
    console.log(orgName);
    const sql = `INSERT INTO ${DEVICE_TABLE_NAME} (uid, deviceName, device, deviceBrand, deviceResolution, deviceSize, deviceLocation, deviceStatus, playingCampaign, activeCampaigns, createdAt, updatedAt, organization, organizationId, resolutionId, campaigns) VALUES('${deviceUID}','${this.deviceName}', '${this.deviceModel}',  '${this.deviceBrand}', '${deviceResolution}', '${this.deviceSize}', '${this.deviceLocation}', '${this.deviceStatus}', '[]', '[]', '${date}', '${date}', '', '${orgId}', '${this.resolutionId}', '[]');`;
    return db.execute(sql);
  }

  

  // static getAllDevices(or) {
  //   const sql = `SELECT * FROM ${DEVICE_TABLE_NAME} where id = '$';`;
  //   return db.execute(sql);
  // }
}

module.exports = Device;
