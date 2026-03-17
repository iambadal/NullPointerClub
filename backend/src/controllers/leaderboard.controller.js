import User from "../models/User.js";

/* GLOBAL LEADERBOARD */

export const getGlobalLeaderboard = async (req,res)=>{

try{

const users = await User.find()
.select("fullName userId score rank country")
.sort({score:-1})
.limit(100);

res.json(users);

}catch(err){

res.status(500).json({message:"Server error"});

}

};


/* COUNTRY LEADERBOARD */

export const getCountryLeaderboard = async (req,res)=>{

try{

const {country} = req.params;

const users = await User.find({country})
.select("fullName userId score countryRank")
.sort({score:-1})
.limit(100);

res.json(users);

}catch(err){

res.status(500).json({message:"Server error"});

}

};