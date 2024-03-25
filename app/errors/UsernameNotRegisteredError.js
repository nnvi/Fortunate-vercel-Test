const ApplicationError = require("./ApplicationError");

class UsernameNotRegisteredError extends ApplicationError {
  constructor(username) {
    super(`${username} is not registered!`);
    this.username = username;
  }

  get details() {
    return { username: this.username }
  }
}

module.exports = UsernameNotRegisteredError;