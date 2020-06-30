const mongoose = require("mongoose");

exports.initdb = () => {
  mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("DB Conencted");
    }
  );
};
