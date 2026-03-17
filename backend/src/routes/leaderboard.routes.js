import express from "express";
import {getGlobalLeaderboard,getCountryLeaderboard} from "../controllers/leaderboard.controller.js";

const router = express.Router();

router.get("/global",getGlobalLeaderboard);

router.get("/country/:country",getCountryLeaderboard);

export default router;