const socket = io("http://localhost:5000");
const authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6Il9kQnN1Y1k0ZCIsImlhdCI6MTU5NDE4MzA4MzU2MywiZXhwIjoxNTk0MjY5NDgzLCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJjaGF0YXBwIiwiZGF0YSI6eyJjcmVhdGVkIjoiMjAyMC0wNy0wMlQwNjowNDoyMC43MzRaIiwidXNlcklkIjoiQ1kxZFNMWjRXIiwiZmlyc3ROYW1lIjoic2F1cmFiaCIsImxhc3ROYW1lIjoiYmhhcnRpIiwibW9iaWxlIjoyOTczODM3NDgsImVtYWlsIjoic2JAYXBpLmNvbSJ9fQ.Fg_nAoOcURUpF0LUPtHdpPk8t1op4cHYzeAqZ2p6L6A";
const userId = "CY1dSLZ4W";
let chatMessage = {
  createdOn: Date.now(),
  recieverId: "cl9Wutd4p", //user 2
  recieverName: "Neo Matrix",
  senderId: userId,
  senderName: "Saurabh Bharti",
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
      socket.emit("typing", "Saurabh");
      console.log("keypress");
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
    //remove typing mesg from web
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
