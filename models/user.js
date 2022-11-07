const db = require("../dbServer");
const Organization = require("./organization");
const Resolution = require("./resolution");
const Helper = require("../helpers/helpers");
const { USERS_TABLE_NAME } = require("../utils/constant");

const helper = new Helper();

class User {
  constructor(
    userDetails
  ) {
    this.userDetails = userDetails;
  }

  async save(orgId) {
    const deviceUID = await Organization.updateOrganization(orgId, 'users');
    if (deviceUID === false) {
      return [false];
    }

    const [deviceResolutionRow, deviceResolutionFields] =
      await Resolution.getResolutionById(this.resolutionId);
    const deviceResolution = deviceResolutionRow[0]["commonName"];
    const date = helper.getCurrentDate();
    const orgName = await Organization.getOrganizationProperty(orgId, "name");
    const sql = `INSERT INTO ${USERS_TABLE_NAME} (uid, deviceName, device, deviceBrand, deviceResolution, deviceSize, deviceLocation, deviceStatus, playingCampaign, activeCampaigns, createdAt, updatedAt, organization, organizationID, resolutionId, campaigns) VALUES('${deviceUID}','${this.deviceName}', '${this.deviceModel}',  '${this.deviceBrand}', '${deviceResolution}', '${this.deviceSize}', '${this.deviceLocation}', '${this.deviceStatus}', 'No', '1', '${date}', '${date}', '${orgName}', '${orgId}', '${this.resolutionId}', '[]');`;
    return db.execute(sql);
  }

  static async checkUserExist(email) {
    const sqlSearch = `SELECT * FROM userTable WHERE email = '${email}'`;
    const [row, fields] = await db.execute(sqlSearch);
    return !!row.length;
    //   // const idQuery = "SELECT COUNT(*) FROM userTable";
    //   // const id = await connection.query(idQuery, (err, res)=>{
    //   //     if(err) throw err;
    //   //     console.log('##########',res[0]);
    //   //     return res+1;
    //   // });
      
    // const sql = `SELECT * FROM ${DEVICE_TABLE_NAME} where organizationID = '${orgId}';`;
    // return db.execute(sql);
  }
}

module.exports = User;
