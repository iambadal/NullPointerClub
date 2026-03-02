import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import eventRoutes from "./routes/event.routes.js";
import authRoutes from "./routes/auth.routes.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5500;

app.use(cors());
app.use(express.json());

app.use("/api/events", eventRoutes);
app.use("/api/auth", authRoutes);


app.get("/", (req, res) => {
  res.send("Backend server is running successfully 🚀");
});

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});