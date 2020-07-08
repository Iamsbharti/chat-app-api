const socketio = require("socket.io");
const mongoose = require("mongoose");
const events = require("events");
const { response } = require("../lib");
const jwt = require("jsonwebtoken");
const Auth = require("../models/Auth");
const Chat = require("../models/Chat");
const shortid = require("shortid");
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

              //set chat room
              socket.room = "chatapp";
              //join chat room
              socket.join(socket.room);
              socket
                .to(socket.room)
                .broadcast.emit("online-users", onlineUsers);
            }
          }
        );
      }
    });
    socket.on("disconnect", (data) => {
      console.log("user disconnected");
      onlineUsers = onlineUsers.filter((user) => user.userId !== socket.userId);
      console.log("online users", onlineUsers);

      //remove from socket
      socket.to(socket.room).broadcast.emit("online-users", onlineUsers);
      return onlineUsers;
    });
    socket.on("typing", (data) => {
      console.log("type cap", data);
      socket.to(socket.room).broadcast.emit("typing", `${data} is typing`);
    });
    socket.on("chat-msg", (data) => {
      console.log("chat -msg event capt.", data);
      /**
       * emit save-chat event using eventEmitter as
       * chatsave func should be excluded from chat-room flow
       */
      setTimeout(() => eventEmitter.emit("save-chat", data), 1500);

      //emit message details to the reciever
      myio.emit(data.recieverId, data);
    });
  });
  //save-chat listener
  eventEmitter.on("save-chat", (data) => {
    //generate chat schema
    console.log("save-chat=listener", data);
    let room =
      data.recieverName.split(" ")[0] + "_" + data.senderName.split(" ")[0];
    console.log("room", room);
    let newChat = new Chat({
      chatId: shortid.generate(),
      senderName: data.senderName,
      senderId: data.senderId,
      recieverName: data.recieverName,
      recieverId: data.recieverId,
      message: data.message,
      chatRoom: room,
    });
    //persist to db
    Chat.create(newChat, (error, createdChat) => {
      if (error != null) {
        console.error("Error while saving Chat", error.message);
      } else {
        console.log("Chat Data Save Sucess");
      }
    });
  });
};
