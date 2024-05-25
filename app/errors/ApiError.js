const ApplicationController = require('./ApplicationError');
class ApiError extends ApplicationController {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
}

module.exports = ApiError;