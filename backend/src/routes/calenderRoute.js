import express from "express";
import {addCalenderEvent} from "../controllers/calenderController.js" 
import ProtectedRoute from "../middleware/ProtectedRoute.js"
const router=express.Router();
router.post("/:id",ProtectedRoute,addCalenderEvent);
export default router