const mongoose = require("mongoose");
const UserModel = require("../models/User");
const { response } = require("../lib");

exports.getAllUsers = async (req, res) => {
  console.log("get all users", "authorized");
  if (req.userId) {
    UserModel.find()
      .select("-__v -_id -password")
      .lean()
      .exec((error, allUsers) => {
        if (error !== null) {
          return res
            .status(400)
            .json(response(true, 400, "Error fetching users", error));
        } else {
          res
            .status(200)
            .json(response(false, 200, "Users fetched successfully", allUsers));
        }
      });
  }
};
