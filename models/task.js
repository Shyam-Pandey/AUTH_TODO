import mongoose from "mongoose";
import User from "./userdb.js";

const TaskSchema = new mongoose.Schema({
    title: {
        type : String,
        required : true
    },
    description: {
        type : String,
        required : true,
    },

    isCompleted: {
        type : Boolean,
        default : false
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

    createdAt:{
        type : Date,
        default : Date.now
    }
});

const Task = mongoose.model("Task", TaskSchema);

export default Task;
