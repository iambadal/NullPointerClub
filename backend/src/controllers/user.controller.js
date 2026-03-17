import User from "../models/User.js";

export const getUserProfile = async (req,res)=>{

try{

const user = await User.findById(req.user.id);

if(!user){
return res.status(404).json({
message:"User not found"
});
}

res.json(user);

}catch(err){

res.status(500).json({message:"Server error"});

}

};


export const updateUserProfile = async (req,res) => {

  try{

    console.log("BODY:", req.body);
    console.log("USER FROM TOKEN:", req.user);

    const user = await User.findById(req.user.id || req.user._id);

    if(!user){
      return res.status(404).json({message:"User not found"});
    }

    const {
      fullName,
      phoneNumber,
      gender,
      bio,
      university,
      github,
      linkedin,
      profilePicture
    } = req.body;

    if(fullName !== undefined) user.fullName = fullName;
    if(phoneNumber !== undefined) user.phoneNumber = phoneNumber;
    if(gender !== undefined) user.gender = gender;
    if(bio !== undefined) user.bio = bio;
    if(university !== undefined) user.university = university;
    if(github !== undefined) user.github = github;
    if(linkedin !== undefined) user.linkedin = linkedin;
    if(profilePicture !== undefined) user.profilePicture = profilePicture;

    const updatedUser = await user.save();

    res.json({
      message:"Profile updated",
      user:updatedUser
    });

  }catch(error){

    console.error("UPDATE ERROR:", error);
    
    console.log("BODY:", req.body);
console.log("USER FROM TOKEN:", req.user); 

    res.status(500).json({
      message:"Server error",
      error:error.message
    });

  }

};