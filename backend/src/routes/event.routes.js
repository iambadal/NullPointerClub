import express from "express";
import { createEvent } from "../controllers/event.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createEvent);

export default router;
