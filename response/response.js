class Response {
  generateResponse(status, message, data) {
    return {
      status,
      message,
      data,
    };
  }

  generateNotFoundResp(mess='') {
    return {
      status: 404,
      message: mess ? mess : "Not Found",
    };
  }

  generateInvalidRequest() {
    return {
      status: 400,
      message: "Bad Request, Please verify request body"
    }
  }
}

module.exports = Response;
