const express = require("express");
exports.logIp = (req, res, next) => {
  let ip = req.ip;
  let path = req.originalUrl;
  let protocol = req.protocol;
  let method = req.method;
  console.log(`${method} requested by -${ip} for -${path} using ${protocol}`);
  next();
};
