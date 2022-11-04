class Helper {
  getCurrentDate() {
    let date = new Date();
    date =
      date.getUTCFullYear() +
      "-" +
      ("00" + (date.getUTCMonth() + 1)).slice(-2) +
      "-" +
      ("00" + date.getUTCDate()).slice(-2) +
      " " +
      ("00" + date.getUTCHours()).slice(-2) +
      ":" +
      ("00" + date.getUTCMinutes()).slice(-2) +
      ":" +
      ("00" + date.getUTCSeconds()).slice(-2);
    return date;
  }

  filterKeys(obj, keys) {
    // Filter desired key from
    if (keys.length > 0) {
      for (const key in obj) {
        if (!keys.includes(key)) {
          delete obj[key];
        }
      }
    }
    return obj;
  }

  validateRequest(req, keysRequired) {
    const keysPassed = Object.keys(req);
    for (const key of keysRequired) {
      if (!keysPassed.includes(key) || !req[key]) {
        return false;
      }
    }
    return true;
  }

  generateUID(orgId, deviceId) {
    const deviceUID = orgId + "-" + String(deviceId).padStart(4, "0");
    return deviceUID;
  }
}

module.exports = Helper;
