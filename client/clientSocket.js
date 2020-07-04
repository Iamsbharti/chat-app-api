const socket = io("http://localhost:5000");
const authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IjJFSHgxc2VkdSIsImlhdCI6MTU5MzgzODIxMjMzOSwiZXhwIjoxNTkzOTI0NjEyLCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJjaGF0YXBwIiwiZGF0YSI6eyJjcmVhdGVkIjoiMjAyMC0wNy0wMlQwNjowNDoyMC43MzRaIiwidXNlcklkIjoiQ1kxZFNMWjRXIiwiZmlyc3ROYW1lIjoic2F1cmFiaCIsImxhc3ROYW1lIjoiYmhhcnRpIiwibW9iaWxlIjoyOTczODM3NDgsImVtYWlsIjoic2JAYXBpLmNvbSJ9fQ.qSdiNSEspIZy_AFhodReoFcYV4a8VAM7p_3Nccg4p7k";
const userId = "CY1dSLZ4W";

clientChatSocket = () => {
  socket.on("verify", (data) => {
    console.log("hi client verify");
  });
  console.log("dsfgsdh");
};
clientChatSocket();
