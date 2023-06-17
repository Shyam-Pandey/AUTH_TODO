import express from "express";
import userRouter from "./routes/user.js";
import taskRouter  from "./routes/task.js";
// import customizedError from "./middleware/error.js"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config()

// middlewares
app.use(express.json())
app.use(cookieParser())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });
app.use(cors({
    origin : [process.env.FRONTEND_URL],
    methods : ["GET","POST","PUT","DELETE"],
    credential : true
}))
app.use(express.urlencoded({ extended: true }))

// use routes
app.use('/users',userRouter)
app.use('/task',taskRouter)

// app.use(customizedError)

export default app;
