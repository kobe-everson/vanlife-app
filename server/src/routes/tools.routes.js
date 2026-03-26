import express from "express";
import { getToolsByProject } from "../controllers/tools.controller.js";

const router = express.Router({ mergeParams: true });

router.get("/", getToolsByProject);

export default router;
