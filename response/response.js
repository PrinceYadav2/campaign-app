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
}

module.exports = Response;
