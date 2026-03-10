import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";

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

    /* Generate OTP */
    const emailOTP = otpGenerator.generate(6, {
      upperCase: false,
      specialChars: false,
      alphabets: false
    });

    const newUser = await User.create({
      fullName,
      userId,
      email,
      password: hashedPassword,
      role,
      phoneNumber,
      gender,
      emailOTP,
      emailVerified: false
    });

    /* Send OTP email */

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify your email",
      html: `
        <div style="font-family: Arial, sans-serif; background:#0f172a; padding:30px; color:white;">
    
        <div style="max-width:600px; margin:auto; background:#020617; border-radius:10px; padding:30px; border:1px solid #00ff9c;">
      
        <h2 style="color:#00ff9c; text-align:center;">
          NullPointerClub
        </h2>

        <p style="font-size:16px;">  Hello <b>${fullName}</b>,</p>

        <p style="font-size:15px;">
          Thank you for registering with <b>NullPointerClub</b>.
          To complete your registration, please verify your email address using the OTP below.
        </p>

        <div style="text-align:center; margin:30px 0;">
          <span style="
            font-size:28px;
            letter-spacing:6px;
            padding:12px 20px;
            border-radius:8px;
            background:#00ff9c;
            color:#000;
            font-weight:bold;
            ">${emailOTP}
          </span>
        </div>

        <p style="font-size:14px;">
          This OTP is valid for a short period. Please do not share it with anyone.
        </p>

        <p style="margin-top:30px; font-size:14px;">
          If you did not create this account, you can safely ignore this email.
        </p>

        <hr style="border:none; border-top:1px solid #334155; margin:25px 0;" />

        <p style="font-size:12px; color:#94a3b8; text-align:center;">
          © ${new Date().getFullYear()} NullPointerClub. All rights reserved.
        </p>
      </div>
    </div>`
    }).catch(err => console.log(err));

    res.status(201).json({
      message: "OTP sent to email. Please verify your email to complete registration.",
      email: email
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* VERIFY EMAIL */
export const verifyEmail = async (req, res) => {
  try {

    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        message: "Email and OTP are required"
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase().trim()
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    if (!user.emailOTP) {
      return res.status(400).json({
        message: "OTP expired. Please register again."
      });
    }

    if (String(user.emailOTP) !== String(otp)) {
      return res.status(400).json({
        message: "Invalid OTP"
      });
    }

    user.emailVerified = true;
    user.emailOTP = null;

    await user.save();

    res.status(200).json({
      message: "Registration completed successfully"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Verification failed" });
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

    if (!user.emailVerified) {
      return res.status(403).json({
        message: "Please verify your email first"
      });
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
  };
};

/* ForgotPassword */
export const forgotPassword = async (req, res) => {

  try {

    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = otpGenerator.generate(6, {
      upperCase: false,
      specialChars: false,
      alphabets: false
    });

    user.resetOTP = otp;
    await user.save();

    // CREATE TRANSPORTER
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // SEND EMAIL
    transporter.sendMail({
      from: `"NullPointerClub" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset Your Password - NullPointerClub",
      html: `
        <div style="font-family: Arial, sans-serif; background:#0f172a; padding:30px;">
    
        <div style="max-width:500px; margin:auto; background:#020617; border-radius:10px; padding:25px; border:1px solid #00ff9c; color:white;">

        <h2 style="color:#00ff9c; text-align:center; margin-bottom:20px;">
          NullPointerClub
        </h2>

        <p>Hello <b>${user.fullName}</b>,</p>

        <p style="font-size:14px;">
          We received a request to reset your password.  
          Use the OTP below to reset it.
        </p>

        <div style="text-align:center; margin:25px 0;">
          <span style="
            font-size:26px;
            letter-spacing:5px;
            padding:12px 18px;
            background:#00ff9c;
            color:#000;
            border-radius:8px;
            font-weight:bold;
            ">${otp}
          </span>
        </div>

        <p style="font-size:13px;">
          This OTP is valid for a short time. Do not share it with anyone.
        </p>

        <hr style="border:none; border-top:1px solid #334155; margin:20px 0;" />

        <p style="font-size:12px; text-align:center; color:#94a3b8;">
          © ${new Date().getFullYear()} NullPointerClub
        </p>

      </div>
    </div>`
  });

    res.json({ message: "OTP sent to email" });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};

/* ResetPassword */
export const resetPassword = async (req, res) => {
  try {

    const { email, otp, newPassword } = req.body;

    const user = await User.findOne({ email });

    if (!user || user.resetOTP !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetOTP = null;

    await user.save();

    res.json({ message: "Password reset successful" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};