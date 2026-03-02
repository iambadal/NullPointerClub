import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    problemId: {
      type: String,
      required: true,
      uppercase: true,
      trim: true
    },

    challenge: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Challenge",
      required: true
    },

    submittedFlag: {
      type: String,
      required: true
    },

    isCorrect: {
      type: Boolean,
      required: true
    },

    submittedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

export default mongoose.model("Submission", submissionSchema);