const ApplicationController = require("./ApplicationController");
const { NotFoundError, WrongPasswordError, InsufficientAccessError } = require("../errors");
const { JWT_SIGNATURE_KEY } = require("../../config/application");

class AuthenticationController extends ApplicationController {
  constructor({
    userModel,
    bcrypt,
    jwt,
  }) {
    super();
    this.userModel = userModel;
    this.bcrypt = bcrypt;
    this.jwt = jwt;
  }

  accessControl = {
    OWNER: 'OWNER',
    ADMIN: 'ADMIN',
    CASHIER: 'CASHIER'
  }

  authorize =(rolename) => {
    return (req, res, next) => {
      try {
        const token = req.headers.authorization?.split("Bearer ")[1];
        const payload = this.decodeToken(token)

        console.log('Token payload:', payload);

        if (!!rolename && rolename != payload.role) {
          throw new InsufficientAccessError(payload?.role);
      }

      req.user_acc = payload;
      next();

    } catch(err) {
        res.status(401).json({
          error: {
            name: err.name,
            message: err.message,
            details: err.details || null,
          }
        })
      }
    }
  }

  handleLogin = async (req, res, next) => {
    try {
      const username = req.body.username.toLowerCase();
      const password = req.body.password;
      const user = await this.userModel.findOne({ where: { username } });

      if (!user) {
        const err = new NotFoundError('User not found');
        res.status(404).json(err);
        return;
      }

      const isPasswordCorrect = this.verifyPassword(password, user.password);

      if (!isPasswordCorrect) {
        const err = new WrongPasswordError('Incorrect password');
        res.status(401).json(err);
        return;
      }

      const accessToken = this.createToken({ user_acc_id: user.user_acc_id, username: user.username, role: user.role });

      res.status(201).json({ accessToken });
    } catch (err) {
      next(err);
    }
  }

  handleGetUser = async (req, res) => {
    try {
      console.log("Fetching: ", req.user_acc.id);
      const user = await this.userModel.findByPk(req.user_acc.user_acc_id);
  
      if (!user) {
        const err = new NotFoundError(req.user_acc.username);
        res.status(404).json(err);
        return;
      }
  
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({
        error: {
          name: err.name,
          message: err.message,
          details: err.details || null,
        }
      });
    }
  }

  createToken = (user) => {
    return this.jwt.sign({
      user_acc_id: user.user_acc_id,
      username: user.username,
      role: user.role
    }, JWT_SIGNATURE_KEY);
  }

  decodeToken(token) {
    return this.jwt.verify(token, JWT_SIGNATURE_KEY);
  }

  encryptPassword = (password) => {
    return this.bcrypt.hashSync(password, 10);
  }

  verifyPassword = (password, encryptedPassword) => {
    return this.bcrypt.compareSync(password, encryptedPassword)
  }
}

module.exports = AuthenticationController;
