const Resolution = require("../models/resolution");
const Response = require("../response/response");
const Helper = require("../helpers/helpers");

const helper = new Helper();
const response = new Response();

exports.getAllResolutions = async (req, res, next) => {
  const [rows, fields] = await Resolution.getAllResolutions();
  if (rows.length === 0) {
    res.status(404).json(response.generateNotFoundResp());
  }
  const keysRequired = ["id", "resolutionType", "commonName", "pixelSize"];
  const data = rows.map(row=> helper.filterKeys(row, keysRequired));
  const rep = response.generateResponse(200, "SUCCESS", data);
  res.status(200).json(rep);
};
