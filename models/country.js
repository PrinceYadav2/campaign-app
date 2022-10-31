const db = require("../dbServer");
const { COUNTRY_TABLE_NAME } = require("../utils/constant");

class Country {
  constructor() {}
  
  static getAllCountries() {
    const sql = `SELECT * FROM ${COUNTRY_TABLE_NAME};`;
    return db.execute(sql);
  }
}

module.exports = Country;
