const { sign, verify } = require("jsonwebtoken");
const secret = "rahasia";

function signToken(payload) {
  return sign(payload, secret);
}
function veirifyToken(token) {
  return verify(token, secret);
}

module.exports = { signToken, veirifyToken };
