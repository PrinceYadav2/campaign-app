const db = require("../dbServer");
const { ORGANIZATION_TABLE_NAME } = require("../utils/constant");

class Organization {
  constructor() {}

  static getOrganizationByUid(uid) {
    const sql = `SELECT * FROM ${ORGANIZATION_TABLE_NAME} WHERE uid = '${uid}';`;
    console.log(sql);
    return db.execute(sql);
  }
}

module.exports = Organization;
