const socketio = require("socket.io");
const mongoose = require("mongoose");
const events = require("events");
const { response } = require("../lib");
const jwt = require("jsonwebtoken");
const Auth = require("../models/Auth");
const { decode } = require("punycode");

//init event emitter class
const eventEmitter = new events.EventEmitter();

exports.setSocketServer = (server) => {
  console.log("socket server start");
  let io = socketio.listen(server);
  console.log("io");
  let myio = io.of("");

  let onlineUsers = [];
  myio.on("connection", (socket) => {
    console.log("emit on connection");
    socket.emit("verify", "");

    //authorize user
    socket.on("set-user", (authToken) => {
      console.log("Authorize user, set-user event");
      if (authToken) {
        jwt.verify(
          authToken,
          process.env.TOKEN_SECRET,
          (error, decodedInfo) => {
            if (error != null) {
              console.log("auth error");
              socket.emit("auth-error", error);
            } else {
              const { userId, firstName, lastName } = decodedInfo.data;
              let name = firstName + " " + lastName;
              socket.userId = userId;
              socket.name = name;

              console.log("name", name, "-is online--event emitted");
              socket.emit(userId, "you are online");
              onlineUsers.push({ userId: userId, name: name });
              console.log(onlineUsers);
            }
          }
        );
      }
    });
    socket.on("disconnect", (data) => {
      console.log("user disconnected");
      onlineUsers = onlineUsers.filter((user) => user.userId !== socket.userId);
      console.log("online users", onlineUsers);
      return onlineUsers;
    });
    socket.on("typing", (data) => {
      console.log("type cap", data);
    });
  });
};
