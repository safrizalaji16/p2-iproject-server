const { comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User } = require("../models");
const { OAuth2Client } = require("google-auth-library");

class Controller {
  static async register(req, res, next) {
    try {
      const { email, password, phoneNumber, username, address } = req.body;
      const newUser = await User.create({
        email,
        password,
        phoneNumber,
        username,
        address,
      });

      res.status(201).json({
        id: newUser.id,
        email: newUser.email,
        msg: "Register Success!",
      });
    } catch (err) {
      next(err);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw {
          name: "Error email or password",
        };
      }

      const findUser = await User.findOne({ where: { email } });

      if (!findUser || !comparePassword(password, findUser.password)) {
        throw {
          name: "Error email or password",
        };
      }

      const access_token = createToken({ id: findUser.id });

      res.status(200).json({ access_token, msg: "Login Success!" });
    } catch (err) {
      next(err);
    }
  }
  static async googleLogin(req, res, next) {
    try {
      const token = req.headers.google_token;

      if (!token) {
        throw {
          name: "Error google login",
        };
      }

      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();

      const [user, created] = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          username: payload.name.split(" ").join(""),
          email: payload.email,
          password: "From Google Login",
          phoneNumber: "From Google Login",
          address: "From Google Login",
        },
        hooks: false,
      });

      const access_token = createToken({ id: user.id });

      res.status(200).json({ access_token, msg: "Login Success" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
