const mongoose = require("mongoose");

const ChatSchema = mongoose.Schema({
  chatId: {
    type: String,
    unique: true,
    required: true,
  },
  senderName: {
    type: String,
    required: true,
  },
  senderId: {
    type: String,
    required: true,
  },
  recieverName: {
    type: String,
    required: true,
  },
  recieverId: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  chatRoom: {
    type: String,
    default: "",
  },
  seen: {
    type: Boolean,
    default: false,
  },
  createdOn: {
    type: Date,
    default: Date.now(),
  },
  modifiedOn: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("Chat", ChatSchema);
