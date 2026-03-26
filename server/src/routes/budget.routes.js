import express from "express";
import { getBudgetByProject } from "../controllers/budget.controller.js";

const router = express.Router({ mergeParams: true });

router.get("/", getBudgetByProject);

export default router;
