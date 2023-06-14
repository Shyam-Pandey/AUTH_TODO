import express from "express";
import auth from "../middleware/auth.js";
import {newTask,getTask,updateTask,deleteTask} from "../controllers/task.js"


const router = express.Router()

router.post("/new",auth,newTask)
router.get("/getTask",auth,getTask)

router.route("/:id").put(auth,updateTask).delete(auth,deleteTask)


export default router