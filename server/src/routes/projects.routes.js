import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";

import {
  getAllProjects,
  getProjectById,
} from "../controllers/projects.controller.js";

const router = express.Router();
router.use(verifyToken);

router.get("/", getAllProjects);
router.get("/:id", getProjectById);

export default router;
