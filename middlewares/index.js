const express = require("express");
const { response } = require("../lib");

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
