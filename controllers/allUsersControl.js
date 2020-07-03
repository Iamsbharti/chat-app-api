const mongoose = require("mongoose");
const UserModel = require("../models/User");
const { response } = require("../lib");

exports.getAllUsers = async (req, res) => {
  console.log("get all users");
  let allUsers = await UserModel.find();
  console.log(allUsers);
  if (!allUsers)
    return res
      .status(400)
      .json(response(true, 400, "Error Fetching data", null));

  res
    .status(200)
    .json(response(false, 200, "Users Fetched Successfully", allUsers));
};
