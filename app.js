const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const { initdb } = require("./initdb");
const router = require("./routers");
const { logIp, notfound, errorHandler } = require("./middlewares");
const { setSocketServer } = require("./lib/socketServer");
const path = require("path");
//init server
const app = express();
dotenv.config();

//init db
initdb();

//middlewares
app.use(logIp);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client")));
//routes
app.use("/api/chat", router);
app.use(notfound);
app.use(errorHandler);

//listen
let server = app.listen(process.env.SERVER_PORT, () => {
  console.log("server running at", process.env.SERVER_PORT);
});

//connect the socket server
let socketServerInit = setSocketServer(server);
