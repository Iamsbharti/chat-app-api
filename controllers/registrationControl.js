const { response } = require("../lib");

exports.test = (req, res) => {
  res.status(200).json(response(false, "Test Sucess", " welcome to chat-app"));
};

exports.register = async (req, res) => {};
