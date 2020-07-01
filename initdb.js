const mongoose = require("mongoose");

exports.initdb = () => {
  mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection.on("error", (error) => {
    console.log("Error connecting db", error);
  });
  mongoose.connection.on("open", (error) => {
    error
      ? console.log("Error conencting db", error)
      : console.log("Db connection sucess");
  });
};
