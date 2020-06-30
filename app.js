const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const { initdb } = require("./initdb");
const router = require("./routers");
//init server
const app = express();
dotenv.config();

//init db
initdb();

//routes
app.use("/api/chat", router);

//listen
app.listen(process.env.SERVER_PORT, () => {
  console.log("server running at", process.env.SERVER_PORT);
});
