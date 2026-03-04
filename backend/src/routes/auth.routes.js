import express from "express";
import { register, login } from "../controllers/auth.controller.js";
import User from "../models/User.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

export default router;