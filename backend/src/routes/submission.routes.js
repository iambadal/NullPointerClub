import express from "express";
import { submitFlag } from "../controllers/submission.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/submit", authMiddleware, submitFlag);

export default router;
