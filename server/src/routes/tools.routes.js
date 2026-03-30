import express from "express";
import { getToolsByUser } from "../controllers/tools.controller.js";

const router = express.Router({ mergeParams: true });

router.get("/", getToolsByUser);

export default router;
