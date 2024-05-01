const { veirifyToken } = require("../helpers/jwt");
const { User } = require("../models");

async function authentication(req, res, next) {
  try {
    if (!req.headers.authorization) {
      throw { name: "Unauthorized", message: "Invalid token" };
    }

    const [type, token] = req.headers.authorization.split(" ");
    // console.log({ type, token });

    if (!type === "Bearer") {
      throw { name: "Unauthorized", message: "Invalid token" };
    }
    let payload;
    try {
      payload = veirifyToken(token);
    } catch (error) {
      console.log(error.message);
      next(error);
    }
    const user = await User.findOne({
      where: { id: payload.id },
    });
    req.user = { id: user.id, email: user.email };
    next();
  } catch (error) {
    console.log(error.message);
    next(error);
  }
}

module.exports = authentication;
