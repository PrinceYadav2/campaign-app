const db = require("../dbServer");
const { RESOLUTION_TABLE_NAME } = require("../utils/constant");
const Helper = require("../helpers/helpers");

const helper = new Helper();

class Resolution {
  constructor() {}
  
  static getAllResolutions() {
    const sql = `SELECT * FROM ${RESOLUTION_TABLE_NAME};`;
    return db.execute(sql);
  }

  static getResolutionById(id) {
    const sql = `SELECT commonName FROM ${RESOLUTION_TABLE_NAME} WHERE id = ${id}`;
    return db.execute(sql);
  }

  static async getResolutionProperties(id, properties) {
    const sql = `SELECT ${properties.join(' ,')} FROM ${RESOLUTION_TABLE_NAME} WHERE id = ${id}`;
    const [rows, _ ] = await db.execute(sql);
    return helper.filterKeys(rows[0], properties);
  }
}

module.exports = Resolution;
