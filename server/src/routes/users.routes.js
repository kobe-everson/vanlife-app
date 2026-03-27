import express from "express";

import {
  getAllUsers,
  getUserById,
  getUserByEmail,
} from "../controllers/users.controller.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.get("/:email", getUserByEmail);

export default router;
