const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

//init server
const app = express();
dotenv.config();

//listen
app.listen(process.env.SERVER_PORT, () => {
  console.log("Server runnning on", process.env.SERVER_PORT);
});
