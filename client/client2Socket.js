const socket = io("http://localhost:5000");
const authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IkFaMGVxUkRVaiIsImlhdCI6MTU5NDAxMzU1MzQ2MiwiZXhwIjoxNTk0MDk5OTUzLCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJjaGF0YXBwIiwiZGF0YSI6eyJjcmVhdGVkIjoiMjAyMC0wNy0wNlQwNToyNjo1Ny4zNzZaIiwidXNlcklkIjoiY2w5V3V0ZDRwIiwiZmlyc3ROYW1lIjoibmVvIiwibGFzdE5hbWUiOiJtYXRyaXgiLCJtb2JpbGUiOjI5NzM4MzEyOCwiZW1haWwiOiJuZW9AYXBpLmNvbSJ9fQ.fWa4Bx6R-ojAqwMRong45FUTmNIwl-LYV_-CAD8t1dU";
const userId = "cl9Wutd4p";
let chatMessage = {
  createdOn: Date.now(),
  recieverId: "CY1dSLZ4W", //user 1
  recieverName: "Saurabh Bharti",
  senderId: userId,
  senderName: "Neo Matrix",
};
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
    socket.emit("typing", "Neo");
  });

  document.addEventListener("DOMContentLoaded", () => {
    let sendMessageBtn = document.getElementById("send");
    let messageContent = document.getElementById("msg");

    //emit typing event on input field changes
    messageContent.addEventListener("keypress", () => {
      socket.emit("typing", "Neo");
      console.log("key press");
    });
    //emitt message on send
    sendMessageBtn.addEventListener("click", () => {
      console.log("emit messege");
      socket.emit("chat-msg", chatMessage);
    });
  });
  //listen to type event
  socket.on("typing", (data) => {
    console.log("type event", data);
  });
  //listen to incoming message
  socket.on(chatMessage.recieverId, (data) => {
    console.log("Recieved message from", data.senderName);
  });
};
clientChatSocket();
