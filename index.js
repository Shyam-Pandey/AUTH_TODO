import app from "./app.js";
import { connectDB } from "./database/db.js";
const {PORT} = process.env;

connectDB();

app.listen(process.env.PORT, () => {
    console.log(`Server is Working at port ${PORT} in ${process.env.NODE_ENV}`)
})