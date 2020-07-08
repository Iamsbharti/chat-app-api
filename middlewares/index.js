const express = require("express");
const { response } = require("../lib");
const jwt = require("jsonwebtoken");
const AuthModel = require("../models/Auth");

exports.logIp = (req, res, next) => {
  let ip = req.ip;
  let path = req.originalUrl;
  let protocol = req.protocol;
  let method = req.method;
  console.log(`${method} requested by -${ip} for -${path} using ${protocol}`);
  next();
};

exports.notfound = (req, res, next) => {
  res.status(404).json(response(true, "Route not Found", req.path));
  next();
};
exports.errorHandler = (error, req, res, next) => {
  res.status(500).json(response(true, "Internal Server Error", error));
  next();
};
exports.isAuthorized = async (req, res, next) => {
  console.log("is authorized middlewares");
  //const authToken = req.header("authToken");
  //console.log(req.header("authToken"));

  //check for authToken as header
  if (
    req.header("authToken") === null ||
    req.header("authToken") === "" ||
    req.header("authToken") === undefined
  ) {
    return res
      .status(401)
      .send(response(true, 401, "AuthToken is Missing in request", null));
  } else {
    //if auth token is present , check it's existence in db(Auth)
    const authToken = req.header("authToken");
    await AuthModel.findOne(
      { authToken: authToken },
      (error, userAuthDetails) => {
        console.log(error, userAuthDetails);
        if (error !== null) {
          return res
            .status(400)
            .json(response(true, "No Authrorization Found", error));
        } else {
          //verify the authtoken
          jwt.verify(
            userAuthDetails.authToken,
            userAuthDetails.tokenSecret,
            (error, decodedInfo) => {
              if (error) {
                console.log("jwt decode error", error);
                return res
                  .status(401)
                  .json(response(true, 401, "Authorization Failed", error));
              } else {
                //console.log(decodedInfo);
                req.userId = decodedInfo.data.userId;
              }
            }
          );
        }
      }
    );
  }
  next();
};
