const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const shortid = require("shortid");

exports.response = (error, status, message, data) => {
  let res = {
    error: error,
    status: status,
    message: message,
    data: data,
  };
  return res;
};

exports.hashedPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  return hashed;
};

exports.validatePassword = async (password, hashed) => {
  return await bcrypt.compare(password, hashed);
};

exports.getAuthToken = (data, cb) => {
  try {
    //define jwt claims object
    let tokenClaims = {
      jwtid: shortid.generate(),
      iat: Date.now(),
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
      sub: "authToken",
      iss: "chatapp",
      data: data,
    };
    let tokendetails = {
      authToken: jwt.sign(tokenClaims, process.env.TOKEN_SECRET),
    };
    cb(null, tokendetails);
  } catch (error) {
    console.warn("Token Generation Error", error);
    cb(error, null);
  }
};
