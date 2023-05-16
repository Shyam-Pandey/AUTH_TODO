import express from "express";
import router from "./routes/router.js";
import dotenv from "dotenv";

const app = express();
dotenv.config()

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(router)

export default app;
