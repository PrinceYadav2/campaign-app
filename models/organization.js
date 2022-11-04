const db = require("../dbServer");
const Helper = require("../helpers/helpers");
const { ORGANIZATION_TABLE_NAME, DEVICE_TABLE_NAME } = require("../utils/constant");

const helper = new Helper();
class Organization {
  constructor() {}

  static getOrganizationByUid(uid) {
    const sql = `SELECT * FROM ${ORGANIZATION_TABLE_NAME} WHERE uid = '${uid}';`;
    return db.execute(sql);
  }

  static async updateOrganization(orgId) {
    const sql = `SELECT device, uid FROM ${ORGANIZATION_TABLE_NAME} where id = '${orgId}';`;
    const [row, fields] = await db.execute(sql);
    if (!row[0]) {
      return false;
    }
    const devices = JSON.parse(row[0]["device"]);
    const uid = row[0].uid;
    const deviceCountQuery = `SELECT MAX(id) FROM ${DEVICE_TABLE_NAME}`;
    const [deviceRows, deviceFields] = await db.execute(deviceCountQuery);

    const deviceId = !deviceRows[0]["MAX(id)"]
      ? 1
      : deviceRows[0]["MAX(id)"] + 1;
    if (!devices.includes(deviceId)) {
      devices.push(deviceId);
    }
    const updateQuery = `UPDATE ${ORGANIZATION_TABLE_NAME} SET device = '${JSON.stringify(
      devices
    )}' WHERE id = ${orgId};`;
    await db.execute(updateQuery);
    return helper.generateUID(uid, devices.length);
  }

  static async getOrganizationProperties(orgId, properties) {
    const sql = `SELECT ${properties.join(' ,')} FROM ${ORGANIZATION_TABLE_NAME} WHERE id = ${orgId}`;
    const [rows, _ ] = await db.execute(sql);
    return helper.filterKeys(rows[0], properties);
  }

  static async getOrganizationProperty(orgId, property) {
    const sql = `SELECT ${property} FROM ${ORGANIZATION_TABLE_NAME} WHERE id = ${orgId};`;
    const [row, fields] = await db.execute(sql);
    return row[0] ? row[0][property] : false; 
  }
  
}

module.exports = Organization;
