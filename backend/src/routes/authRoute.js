import express from "express";
import {login,signup,logout} from "../controllers/authControllers.js"
import protectedRoute from "../middleware/ProtectedRoute.js" 
import {getCurrentUser} from "../controllers/authControllers.js"
const router=express.Router();
router.post("/login",login)
router.post("/signup",signup)
router.post("/logout",logout)
router.get("/me",protectedRoute,getCurrentUser);
export default router;