import express from "express";
import http from "http";
import { Server } from "socket.io";

const port = 5000;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("join", (room) => {
    socket.join(room);
  });

  socket.on("send", (chatting) => {
    io.to(chatting.room).emit("receive", {
      id: chatting.id,
      message: chatting.message,
    });
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
