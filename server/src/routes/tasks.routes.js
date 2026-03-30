import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import { getTasksByProject } from "../controllers/tasks.controller.js";

const router = express.Router({ mergeParams: true });
router.use(verifyToken);

router.get("/", getTasksByProject);

export default router;
