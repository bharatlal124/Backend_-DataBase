// don't change the prewritten code
// change the code for 'join' event

import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { messageModel } from "./message.schema.js";

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

  socket.on("join", async (data) => {
    // Emit a welcome message to the user who joined
    // write your code here
    socket.join(data.room);

    try {
      const previousMessages = await messageModel
        .find({
          room: data.room,
          timestamp: { $lte: new Date() },
          // timestamp: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
        })
        .sort({ timestamp: -1 })
        .limit(10);

      socket.emit("previousMessages", previousMessages.reverse());
      io.to(data.room).emit("message", {
        text: `${data.username} has joined the chat.`,
        username: "System",
      });
    } catch (error) {
      console.error(error);
    }
  });

  socket.on("sendMessage", async (data) => {
    const message = new messageModel({
      username: data.username,
      text: data.message,
      room: data.room,
    });

    await message.save();

    // Broadcast the received message to all users in the same room
    io.to(data.room).emit("message", {
      username: data.username,
      text: data.message,
    });
  });

  socket.on("disconnect", () => {
    console.log("Connection disconnected.");
  });
});
