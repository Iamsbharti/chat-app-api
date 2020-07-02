const mongoose = require("mongoose");

const schema = mongoose.Schema({
  userId: {
    type: String,
  },
  authToken: {
    type: String,
  },
  tokenSecret: {
    type: String,
  },
  tokenGenerationTime: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("Auth", schema);
