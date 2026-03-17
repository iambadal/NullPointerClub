import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";

const router = express.Router();

router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware("admin"),
  (req, res) => {

    res.json({
      message: "Welcome Admin",
      user: req.user
    });

  }
);

export default router;