import express from "express";
import { googleLogin,googleCallback } from "../controllers/googleAuthController.js";
import ProtectedRoute from "../middleware/ProtectedRoute.js";

const router = express.Router();
router.get("/google", ProtectedRoute, googleLogin);
router.get("/google/callback", googleCallback);

export default router;