// no need to change the prewritten code
// make necessary imports here
import mongoose from "mongoose";

// Define the Task schema
const taskSchema = new mongoose.Schema({
  // ------write your code here.-------
  text: { type: String, required: true },
  createdAt: { type: String },
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
