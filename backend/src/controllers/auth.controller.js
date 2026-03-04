import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/* REGISTER */
export const register = async (req, res) => {
  try {
    const { fullName, userId, email, password, role, phoneNumber, gender } = req.body;

    if (!fullName || !userId || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({
      $or: [{ userId }, { email }]
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
  fullName,
  userId,
  email,
  password: hashedPassword,
  role,
  phoneNumber,
  gender
});

console.log("Saved User:", newUser);

    res.status(201).json({
      message: "Registration successful",
      user: newUser
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* LOGIN */

export const login = async (req, res) => {
  try {

    const { userId, password } = req.body;

    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};