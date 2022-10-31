const Country = require("../models/country");
const Response = require("../response/response");
const Helper = require("../helpers/helpers");

const helper = new Helper();
const response = new Response();

exports.getAllCountries = async (req, res, next) => {
  const [rows, fields] = await Country.getAllCountries();
  if (rows.length === 0) {
    res.status(404).json(response.generateNotFoundResp());
  }
  const keysRequired = ["id", "countryName", "countryCode", "phoneCode"];
  const data = rows.map(row=> helper.filterKeys(row, keysRequired));
  const rep = response.generateResponse(200, "SUCCESS", data);
  res.status(200).json(rep);
};
