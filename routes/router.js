import express  from "express";

const router = express.Router()
 
import {home,getAllUser,createUser,getUser} from "../controllers/users.js"
router.get("/", home);

router.get("/users/all", getAllUser);
router.get("/user/:id", getUser);

router.post("/users/new",createUser)

export default router;