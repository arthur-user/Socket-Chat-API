const { Server } = require("socket.io"); //server class from socket.io

// Create an instance of the server with proper CORS configuration
const io = new Server({
  cors: {
    origin: "http://localhost:5173", // your frontend URL
    methods: ["GET", "POST"], // allowed methods
  },
});

let onlineUsers = [];

io.on("connection", (socket) => {
  console.log("Connection established", socket.id);

  socket.on("addNewUser", (userId) => {
    // Check if user is already in the onlineUsers array
    if (!onlineUsers.some((user) => user.userId === userId)) {
      // If not, add user to onlineUsers
      onlineUsers.push({
        userId,
        socketId: socket.id,
      });
    }
  });

  // Log current online users
  console.log("onlineUsers", onlineUsers);

  // Emit the list of online users
  io.emit("getOnlineUsers", onlineUsers);

  // add message

  socket.on("sendMessage", (message) => {
    const user = onlineUsers.find(user => user.userId === message.recipientId);

    if (user) {
      io.to(user.socketId).emit("getMessage", message);
    }
  });
  // Handle the disconnect event
  socket.on("disconnect", () => {
    // Remove the user from onlineUsers based on their socketId
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);

    // Emit the updated list of online users after a user disconnects
    io.emit("getOnlineUsers", onlineUsers);
    console.log(`User disconnected: ${socket.id}`);
  });
});

io.listen(3000); // Start listening on port 3000
