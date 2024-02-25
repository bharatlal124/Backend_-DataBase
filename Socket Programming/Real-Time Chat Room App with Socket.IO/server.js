// No need to change the pre-written code
// Implement the features in io.on() section
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

export const app = express();
app.use(cors());

export const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Connection made.");

  // Write your code here

  socket.on("login", (username, room) => {
    console.log("Username: ", username);
    console.log("Room: ", room);
    socket.join(room);
    socket.emit("message", {
      username: "Server",
      text: `Welcome ${username} to the chat!`,
    });
    socket.broadcast.to(room).emit("message", {
      username: "Server",
      text: `${username} has joined the chat.`,
    });
  });

  socket.on("sendMessage", (message, room, username) => {
    io.to(room).emit("message", {
      username,
      text: message,
    });
  });

  socket.on("disconnect", () => {
    console.log("Connection disconnected.");
  });
});
