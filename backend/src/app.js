import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import uploadRouter from "./routes/uploadRoutes.js";
import googleAuthRoutes from "./routes/googleAuthRoutes.js";
import EventAddInCalender from "./routes/calenderRoute.js"
import userAuthRoutes from "./routes/authRoute.js"
const app=express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api",uploadRouter)
app.use("/auth", googleAuthRoutes);
app.use("/calendar",EventAddInCalender)
app.use("/auth",userAuthRoutes)
export default app;