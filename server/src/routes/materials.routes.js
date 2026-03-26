import express from "express";
import { getMaterialsByProject } from "../controllers/materials.controller.js";

const router = express.Router({ mergeParams: true });

router.get("/", getMaterialsByProject);

export default router;
