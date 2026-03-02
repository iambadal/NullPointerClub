import Submission from "../models/Submission.js";
import Challenge from "../models/Challenge.js";
import User from "../models/User.js";

export const submitFlag=async (req,res) => {
  try{
    const {problemId,flag}=req.body;
    const userId=req.user.id;

    const challenge = await Challenge.findOne({ problemId });

    if(!challenge){
      return res.status(404).json({ message: "Challenge not found" });
    }

    const alreadySubmitted = await Submission.findOne({user: userId,problemId});

    if (alreadySubmitted) {
      return res.status(400).json({
        message: "You already submitted this challenge"
      });
    }

    const isCorrect = challenge.flag === flag;

    await Submission.create({
      user: userId,
      challenge: challenge._id,
      problemId,
      submittedFlag: flag,
      isCorrect
    });

    if (isCorrect) {
      await User.findByIdAndUpdate(userId, {
        $inc: { score: challenge.points }
      });
    }

    res.json({
      correct: isCorrect,
      points: isCorrect ? challenge.points : 0
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};