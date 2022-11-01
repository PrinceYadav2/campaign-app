class Response {
  generateResponse(status, message, data) {
    return {
      status,
      message,
      data,
    };
  }

  generateNotFoundResp() {
    return {
      status: 404,
      message: "Not Found",
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
