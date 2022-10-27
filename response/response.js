class Response {
    generateResponse(status, message, data) {
        return {
            status,
            message,
            data
        }
    }
}

module.exports = Response;