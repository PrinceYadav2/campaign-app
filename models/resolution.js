const db = require("../dbServer");
const { RESOLUTION_TABLE_NAME } = require("../utils/constant");

class Resolution {
  constructor() {}
  
  static getAllResolutions() {
    const sql = `SELECT * FROM ${RESOLUTION_TABLE_NAME};`;
    return db.execute(sql);
  }

  static getResolutionById(id) {
    const sql = `SELECT commonName FROM ${RESOLUTION_TABLE_NAME} WHERE id = ${id}`;
    console.log(sql);
    return db.execute(sql);
  }
}

module.exports = Resolution;
