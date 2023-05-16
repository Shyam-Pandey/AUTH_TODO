import mongoose, { connect } from "mongoose";
const {MONGO_URL} = process.env;

export const connectDB = () =>{
    mongoose.connect(MONGO_URL, { dbName: "backendApi" })
    .then(() => console.log("Database connected"))
    .catch((e) => { console.log(e) })
}