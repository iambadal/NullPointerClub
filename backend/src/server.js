import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import eventRoutes from "./routes/event.routes.js";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import userRoutes from "./routes/user.routes.js";
import leaderboardRoutes from "./routes/leaderboard.routes.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5500;

app.use("/uploads", express.static("src/uploads"))

app.use(cors());
app.use(express.json());

app.use("/api/events", eventRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/leaderboard", leaderboardRoutes);


app.get("/", (req, res) => {
  res.send("Backend server is running successfully 🚀");
});

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});