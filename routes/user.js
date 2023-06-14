import express  from "express";
import auth  from "../middleware/auth.js";

const router = express.Router()
 
import {home,login,register,getAllUser,getMyProfile, logout} from "../controllers/users.js"

router.get("/", home);

router.post("/login",login );
router.post("/register",register)

router.get("/getAllUser", getAllUser);
router.get("/me",auth,getMyProfile)

router.get("/logout",logout);

export default router;