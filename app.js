const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const { initdb } = require("./initdb");
//init server
const app = express();
dotenv.config();

//init db
initdb();

//listen
app.listen(process.env.SERVER_PORT, () => {
  console.log("Server runnning on", process.env.SERVER_PORT);
});
