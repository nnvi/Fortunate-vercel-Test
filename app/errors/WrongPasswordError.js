const ApplicationError = require("./ApplicationError");

class RecordNotFoundError extends ApplicationError {
  constructor(username) {
    super(`${username}!`)
  }
}

module.exports = RecordNotFoundError;