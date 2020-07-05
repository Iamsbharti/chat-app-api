const socket = io("http://localhost:5000");
const authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6ImhST2N1QTQ0NiIsImlhdCI6MTU5Mzk1NDc0NzkwNCwiZXhwIjoxNTk0MDQxMTQ3LCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJjaGF0YXBwIiwiZGF0YSI6eyJjcmVhdGVkIjoiMjAyMC0wNy0wMlQwNjowNDoyMC43MzRaIiwidXNlcklkIjoiQ1kxZFNMWjRXIiwiZmlyc3ROYW1lIjoic2F1cmFiaCIsImxhc3ROYW1lIjoiYmhhcnRpIiwibW9iaWxlIjoyOTczODM3NDgsImVtYWlsIjoic2JAYXBpLmNvbSJ9fQ.Jz3005VjmZrhfUlsRrHH_alLK8kVA8DrSAyO5xRV2_s";
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
};
clientChatSocket();
