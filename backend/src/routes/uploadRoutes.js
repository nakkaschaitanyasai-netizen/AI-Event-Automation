import express from "express";
import {uploadImage,getEvents,DeleteEvent} from "../controllers/uploadControllers.js";
import {googleLogin} from "../controllers/googleAuthController.js"
import ProtectedRoute from "../middleware/ProtectedRoute.js";
import upload from "../middleware/uploadMiddleware.js";
const router = express.Router();
router.post("/upload", ProtectedRoute,upload.array("images", 5), uploadImage);
router.get("/events",ProtectedRoute,getEvents);
router.delete("/events/:id",ProtectedRoute,DeleteEvent)
router.get("/google",googleLogin)
export default router;
