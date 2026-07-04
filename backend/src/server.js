import app from "./app.js";
import dotenv from "dotenv";
import connectDB  from "./config/db.js";
dotenv.config();
const port = process.env.PORT || 5000;
app.listen(port,()=>{
    connectDB();
    console.log(`server running at port ${port}`)
})