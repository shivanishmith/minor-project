import express from "express";
import {
  fetchLeaderboard,
  getProfile,
  login,
  logout,
  register,
  sendOtp,
  verifyOtp,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// OTP Routes
router.post("/send-otp", sendOtp); // Sends OTP to user's email
router.post("/verify-otp", verifyOtp); // Verifies OTP provided by the user

// User Routes
router.post("/register", register); // Registers the user after OTP verification
router.post("/login", login); // Logs in the user
router.get("/me", isAuthenticated, getProfile); // Fetches logged-in user's profile
router.get("/logout", isAuthenticated, logout); // Logs out the user
router.get("/leaderboard", fetchLeaderboard); // Fetches leaderboard data

export default router;
