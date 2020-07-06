const socket = io("http://localhost:5000");
const authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IjgwcmFXZFEwNiIsImlhdCI6MTU5NDAxMzM2NzcwOSwiZXhwIjoxNTk0MDk5NzY3LCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJjaGF0YXBwIiwiZGF0YSI6eyJjcmVhdGVkIjoiMjAyMC0wNy0wMlQwNjowNDoyMC43MzRaIiwidXNlcklkIjoiQ1kxZFNMWjRXIiwiZmlyc3ROYW1lIjoic2F1cmFiaCIsImxhc3ROYW1lIjoiYmhhcnRpIiwibW9iaWxlIjoyOTczODM3NDgsImVtYWlsIjoic2JAYXBpLmNvbSJ9fQ.mqoVFuc8L3Q6U5n0MREFfnsSVDp5hq8wJD6WyjzgY_o";
const userId = "CY1dSLZ4W";

clientChatSocket = () => {
  socket.on("verify", (data) => {
    console.log("client verify");
    socket.emit("set-user", authToken);
  });
  socket.on("auth-error", (error) => {
    console.log("auth error event listend", error);
  });
  socket.on(userId, (data) => {
    console.log("You recieved a message");
    console.log(data);
    let n = document.getElementById("name");
    let msg = document.getElementById("text");
    n.textContent = userId;
    msg.textContent = data;
  });
  document.addEventListener("DOMContentLoaded", () => {
    let sendMessageBtn = document.getElementById("send");
    let messageContent = document.getElementById("msg");
  });
};
clientChatSocket();
