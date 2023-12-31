import express from "express";
import userRouter from "./routes/user.js";
import taskRouter  from "./routes/task.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";


const app = express();
dotenv.config()

// middlewares
app.use(express.json())
app.use(cookieParser())

// app.use(cors({
//     origin : [process.env.FRONTEND_URL],
//     methods : ["GET","POST","PUT","DELETE"],
//     credential : true
// }))
app.use(cors())
import { createProxyMiddleware } from 'http-proxy-middleware';
app.use('/api', createProxyMiddleware({ 
    target: process.env.FRONTEND_URL, //original url
    changeOrigin: true, 
    //secure: false,
    onProxyRes: function (proxyRes, req, res) {
       proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    }
}));
app.use(express.urlencoded({ extended: true }))

// use routes
app.use('/user',userRouter)
app.use('/task',taskRouter)

export default app;
