import express from "express";
import User from "../models/User.js";
import { register, login } from "../controller/user.controller.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
