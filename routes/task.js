import express from "express";
import auth from "../middleware/auth.js";
import {createTask,getTask,updateTask,deleteTask} from "../controllers/task.js"


const router = express.Router()

router.post("/createTask",auth,createTask)
router.get("/getTask",auth,getTask)

router.route("/:id").put(auth,updateTask).delete(auth,deleteTask)


export default router