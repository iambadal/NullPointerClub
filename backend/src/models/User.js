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
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"]
  },

  password: {
    type: String,
    required: true
  },

  phoneNumber: {
    type: String,
    required: true,
    match: [/^\d{10}$/, "Phone number must be exactly 10 digits"]
  },

  gender: {
    type: String,
    enum: ["male","female","other"],
    required: true
  },

  role: {
    type: String,
    enum: ["admin","organiser","participant"],
    default: "participant"
  },

  score: {
    type:Number,
    default:0
  },

  solvedChallenges:{
    type:Number,
    default:0
  },

  firstBloods:{
    type:Number,
    default:0
  },

  submissions:{
    type:Number,
    default:0
  },

  categoryStats:{
    web:{type:Number,default:0},
    crypto:{type:Number,default:0},
    reverse:{type:Number,default:0},
    pwn:{type:Number,default:0},
    forensics:{type:Number,default:0},
    misc:{type:Number,default:0}
  },

  badges:[
   {
     name:String,
     icon:String
    }
  ],

  recentSolves:[
  {
    challenge:String,
    category:String,
    points:Number,
    date:Date
  }],

  profilePicture:{
    type:String,
    default:"/uploads/default-avatar.png"
  },

  bio: {
    type: String,
    default: ""
  },

  university: {
    type: String,
    default: ""
  },

  github: {
    type: String,
    default: ""
  },

  linkedin: {
    type: String,
    default: ""
  },

  emailVerified: {
    type: Boolean,
    default: false
  },

  emailOTP: { type: String },
  resetOTP: { type: String },
  resetOTPExpires: { type: Date },

  rank:{
   type:Number,
   default:0
  },

  countryRank:{
    type:Number,
    default:0
  },

  country:{
    type:String,
    default:"India"
  },

  solvedEasy:{
    type:Number,
    default:0
  },

  solvedMedium:{
    type:Number,
    default:0
  },

  solvedHard:{
    type:Number,
    default:0
  },

  submissions:{
    type:Number,
    default:0
  },

  activity:[
    {
     date:String,
     count:Number
    }
  ]
  },
{ timestamps: true }
);

export default mongoose.model("User", userSchema);