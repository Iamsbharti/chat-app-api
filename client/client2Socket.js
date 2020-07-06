const socket = io("http://localhost:5000");
const authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IkFaMGVxUkRVaiIsImlhdCI6MTU5NDAxMzU1MzQ2MiwiZXhwIjoxNTk0MDk5OTUzLCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJjaGF0YXBwIiwiZGF0YSI6eyJjcmVhdGVkIjoiMjAyMC0wNy0wNlQwNToyNjo1Ny4zNzZaIiwidXNlcklkIjoiY2w5V3V0ZDRwIiwiZmlyc3ROYW1lIjoibmVvIiwibGFzdE5hbWUiOiJtYXRyaXgiLCJtb2JpbGUiOjI5NzM4MzEyOCwiZW1haWwiOiJuZW9AYXBpLmNvbSJ9fQ.fWa4Bx6R-ojAqwMRong45FUTmNIwl-LYV_-CAD8t1dU";
const userId = "cl9Wutd4p";

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
