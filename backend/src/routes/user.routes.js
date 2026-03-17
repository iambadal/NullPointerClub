import express from "express";
import protect from "../middleware/auth.middleware.js";
import { getUserProfile, updateUserProfile } from "../controllers/user.controller.js";
import upload from "../middleware/upload.middleware.js";
import User from "../models/User.js";

const router = express.Router();

router.get("/profile", protect, getUserProfile);

router.put("/profile", protect, updateUserProfile);

/* Upload profile picture */
router.post("/upload-profile", protect, upload.single("image"), async (req,res)=>{

try{

const user = await User.findById(req.user.id);

user.profilePicture = `/uploads/${req.file.filename}`;

await user.save();

res.json({
profilePicture:user.profilePicture
});

}catch(err){

res.status(500).json({message:"Upload failed"});

}

});

export default router;