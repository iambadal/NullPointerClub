import mongoose from "mongoose";

const challengeSchema = new mongoose.Schema(
  {
    problemId: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true
    },
    
    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    category: {
      type: String,
      enum: ["web", "crypto", "forensics", "pwn", "osint", "misc"],
      required: true
    },

    points: {
      type: Number,
      required: true
    },

    flag: {
      type: String,
      required: true
    },

    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Challenge", challengeSchema);