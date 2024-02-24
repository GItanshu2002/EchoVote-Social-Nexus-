const accessToken = require("jsonwebtoken");
const secreatKey = "thesecreatKeyforapplybrais9876453210";
const generateToken = async function genrating_Token(data) {
  const token = accessToken.sign(data, secreatKey);
  return token;
};

module.exports = {
  generateToken,
};
