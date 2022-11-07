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

  static async updateOrganization(orgId, column) {
    const sql = `SELECT ${column}, uid FROM ${ORGANIZATION_TABLE_NAME} where id = '${orgId}';`;
    const [row, fields] = await db.execute(sql);
    if (!row[0]) {
      return false;
    }
    const elements = JSON.parse(row[0][column]);
    const uid = row[0].uid;
    const columnCountQuery = `SELECT MAX(id) FROM ${DEVICE_TABLE_NAME}`;
    const [columnRows, columnFields] = await db.execute(columnCountQuery);

    const columnId = !columnRows[0]["MAX(id)"]
      ? 1
      : columnRows[0]["MAX(id)"] + 1;
    if (!elements.includes(columnId)) {
      elements.push(columnId);
    }
    const updateQuery = `UPDATE ${ORGANIZATION_TABLE_NAME} SET ${column} = '${JSON.stringify(
      elements
    )}' WHERE id = ${orgId};`;
    await db.execute(updateQuery);
    return helper.generateUID(uid, elements.length);
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
