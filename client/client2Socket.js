const socket = io("http://localhost:5000");
const authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IldkaERiekNHUyIsImlhdCI6MTU5NDE4MzAzOTU5MiwiZXhwIjoxNTk0MjY5NDM5LCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJjaGF0YXBwIiwiZGF0YSI6eyJjcmVhdGVkIjoiMjAyMC0wNy0wNlQwNToyNjo1Ny4zNzZaIiwidXNlcklkIjoiY2w5V3V0ZDRwIiwiZmlyc3ROYW1lIjoibmVvIiwibGFzdE5hbWUiOiJtYXRyaXgiLCJtb2JpbGUiOjI5NzM4MzEyOCwiZW1haWwiOiJuZW9AYXBpLmNvbSJ9fQ.AmAe3IWLkC4z7wVGk_lVSdIYsDtZ6yRGG1eDsPVauko";
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
  /*socket.on(userId, (data) => {
    console.log("You recieved a message");
    console.log(data);
    let n = document.getElementById("name");
    let msg = document.getElementById("text");
    n.textContent = userId;
    msg.textContent = data;
    socket.emit("typing", "Neo");
  });*/

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
      chatMessage.message = messageContent.value;
      socket.emit("chat-msg", chatMessage);
    });
  });
  //listen to type event
  socket.on("typing", (data) => {
    console.log("type event", data);
    document.getElementById("typeEvent").textContent = data;
  });
  //listen to incoming message
  socket.on(userId, (data) => {
    console.log("Recieved message from", data.senderName);
    console.log("Message", data.message);
    document.getElementById("typeEvent").textContent = null;
  });
  //listen to join chat room event
  socket.on("online-users", (data) => {
    let usrList = [];
    data.map((u) => usrList.push(u.name));
    console.log(usrList);
    //set online users lists
    let onlineUsersDiv = document.getElementById("users");
    onlineUsersDiv.innerHTML = `<ul>
    <li>${usrList[0]}</li>
    <li>${usrList[1]}</li>
  </ul>`;
  });
};
clientChatSocket();
