const ApplicationController = require("./ApplicationController");
const { NotFoundError, WrongPasswordError } = require("../errors");
const { JWT_SIGNATURE_KEY } = require("../../config/application");

class AuthenticationController extends ApplicationController {
  constructor({
    adminModel,
    bcrypt,
    jwt,
  }) {
    super();
    this.adminModel = adminModel;
    this.bcrypt = bcrypt;
    this.jwt = jwt;
  }

  handleLogin = async (req, res, next) => {
    try {
      const username = req.body.username.toLowerCase();
      const password = req.body.password;
      const admin = await this.adminModel.findOne({ where: { username } });

      if (!admin) {
        const err = new NotFoundError('User not found');
        res.status(404).json(err);
        return;
      }

      const isPasswordCorrect = this.verifyPassword(password, admin.password);

      if (!isPasswordCorrect) {
        const err = new WrongPasswordError('Incorrect password');
        res.status(401).json(err);
        return;
      }

      const accessToken = this.createToken({ id: admin.id, username: admin.username });

      res.status(201).json({ accessToken });
    } catch (err) {
      next(err);
    }
  }

  createToken = (payload) => {
    return this.jwt.sign(payload, JWT_SIGNATURE_KEY);
  }

  verifyPassword = (password, encryptedPassword) => {
    return this.bcrypt.compareSync(password, encryptedPassword)
  }
}

module.exports = AuthenticationController;
