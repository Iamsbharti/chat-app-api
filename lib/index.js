const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const shortid = require("shortid");

exports.response = (error, message, data) => {
  let res = {
    error: error,
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

exports.generateToken = (data) => {};
