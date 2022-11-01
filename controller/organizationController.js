const Organization = require("../models/organization");
const Response = require("../response/response");
const Helper = require("../helpers/helpers");

const helper = new Helper();
const response = new Response();

exports.findOrgByUID = async (req, res, next) => {
  const uid = req.params.uid;
  const [rows, fields] = await Organization.getOrganizationByUid(uid);
  if (rows.length === 0) {
    res.status(404).json(response.generateNotFoundResp());
  }
  const keysRequired = ["id", "uid", "name", "createdAt", "updatedAt"];
  const data = helper.filterKeys(rows[0], keysRequired);
  const rep = response.generateResponse(200, "SUCCESS", data);
  res.status(200).json(rep);
};
