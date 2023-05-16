import app from "./app.js";
import { connectDB } from "./database/db.js";
const {PORT} = process.env;

connectDB();

app.listen(PORT, () => {
    console.log("Server is Working")
})