import express from "express";
import { getTasksByProject } from "../controllers/tasks.controller.js";

const router = express.Router({ mergeParams: true });

router.get("/", getTasksByProject);

export default router;
