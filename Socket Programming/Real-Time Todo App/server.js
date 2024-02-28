// Complete the server.js file to make user's add, delete and update the todos.

import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { connectToDatabase } from "./db.config.js";
import Task from "./task.schema.js";

export const app = express();
// const server = http.createServer(app);
// const io = new Server(server);

app.use(cors());

export const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "DELETE"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  //   Add new Task
  socket.on("addTask", async (taskText) => {
    try {
      console.log("Received task text:", taskText);
      const newTask = new Task({ text: taskText, createdAt: new Date() });
      await newTask.save();

      socket.emit("addTask", taskText);
    } catch (err) {
      console.error("error adding task", err);
    }
  });

  //   Delete Task
  socket.on("deleteTask", async (taskText) => {
    try {
      const deletedTask = await Task.findOneAndDelete({ text: taskText });

      if (deletedTask) {
        socket.emit("deleteTask", taskText);
      }
    } catch (error) {
      console.error(error);
    }
  });

  //   Update Task
  //   socket.on("updateTask", async ({ oldTaskText, newTaskText }) => {
  //     try {
  //       const updateTask = await Task.findOneAndUpdate(
  //         { text: oldTaskText },
  //         { text: newTaskText }
  //       );

  //       if (updateTask) {
  //         socket.emit("updateTask", { oldTaskText, newTaskText });
  //       }
  //     } catch (err) {
  //       console.error("Error updating task:", err);
  //     }
  //   });

  //   socket.on("disconnect", () => {
  //     console.log("User disconnected");
  //   });
});
