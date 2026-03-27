import express from "express";
import { login, signup, getProfile } from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/me", verifyToken, getProfile);

export default router;
