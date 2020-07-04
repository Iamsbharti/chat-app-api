const socket = require("socket.io");
const mongoose = require("mongoose");
const events = require("events");
const { response } = require("../lib");

//init event emitter class
const eventEmitter = new events.EventEmitter();

exports.setSocketServer = (server) => {
  console.log("socket server start");
  let io = socket.listen(server);
  console.log("io");
  let myio = io.of("");
  myio.on("connection", (socket) => {
    console.log("emit on connection");
  });
};
