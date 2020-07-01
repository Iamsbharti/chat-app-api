const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const { initdb } = require("./initdb");
const router = require("./routers");
const { logIp, notfound, errorHandler } = require("./middlewares");

//init server
const app = express();
dotenv.config();

//init db
initdb();

//middlewares
app.use(logIp);
app.use(bodyParser.json());
//routes
app.use("/api/chat", router);
app.use(notfound);
app.use(errorHandler);

//listen
app.listen(process.env.SERVER_PORT, () => {
  console.log("server running at", process.env.SERVER_PORT);
});
