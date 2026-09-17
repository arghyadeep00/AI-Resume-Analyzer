import {
  generateAccessToken,
  generateRefreshToken,
} from "../helper/tokenGenerate.js";
import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/User.js";
import Refresh from "../models/Token.js";

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({
    name,
    email,
    password,
    role,
  });
  if (user) {
    res.status(201).json({
      message: "User registered successfully",
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  }
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await Refresh.create({ user: user._id, token: refreshToken });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 21 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "User logged in successfully",
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      accessToken,
    });
  } else {
    res.status(401).json({
      message: "Invalid email or password",
    });
    throw new Error("Invalid email or password");
  }
});
