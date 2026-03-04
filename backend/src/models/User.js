import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true
    },

    userId: {
      type: String,
      required: true,
      unique: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/,"Please enter a valid email address"
      ]},

    password: {
      type: String,
      required: true
    },

    phoneNumber: {
      type: Number,
      required: true,
      match: [/^\d{10}$/, "Phone number must be exactly 10 digits"]
    },

    gender:{
      type: String,
      enum: ["male", "female", "other"],
      required: true
    },


    role: {
      type: String,
      enum: ["admin","organiser", "participant"],
      default: "participant"
    },

    score: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);
 
export default mongoose.model("User", userSchema);