import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { v2 as cloudinary } from "cloudinary";
import { generateToken } from "../utils/jwtToken.js";
import { sendEmail } from "../utils/sendEmail.js";

// In-memory OTP Store
const otpStore = new Map();

// Send OTP
export const sendOtp = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new ErrorHandler("Email is required.", 400));
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
  otpStore.set(email, { otp, expiresAt: Date.now() + 5 * 60 * 1000, verified: false });

  try {
    const subject = "Your OTP for Sign-Up";
    const message = `Your OTP is ${otp}. It will expire in 5 minutes.`;

    await sendEmail({
      email,
      subject,
      message,
    });

    res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error.message);
    return next(new ErrorHandler("Failed to send OTP.", 500));
  }
});

// Verify OTP
export const verifyOtp = catchAsyncErrors(async (req, res, next) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return next(new ErrorHandler("Email and OTP are required.", 400));
  }

  const storedOtp = otpStore.get(email);

  if (!storedOtp) {
    return next(new ErrorHandler("No OTP found for this email.", 400));
  }

  if (storedOtp.expiresAt < Date.now()) {
    otpStore.delete(email);
    return next(new ErrorHandler("OTP has expired.", 400));
  }

  if (storedOtp.otp !== otp) {
    return next(new ErrorHandler("Invalid OTP.", 400));
  }

  storedOtp.verified = true; // Mark OTP as verified
  otpStore.set(email, storedOtp); // Update the OTP store
  res.status(200).json({ success: true, message: "OTP verified successfully" });
});

// Register User
export const register = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;

  // Validate OTP before proceeding with registration
  const storedOtp = otpStore.get(email);
  if (!storedOtp || !storedOtp.verified) {
    return next(new ErrorHandler("Please verify OTP before registering.......", 400));
  }

  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Profile Image Required.", 400));
  }

  const { profileImage } = req.files;

  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(profileImage.mimetype)) {
    return next(new ErrorHandler("File format not supported.", 400));
  }

  const {
    userName,
    password,
    phone,
    address,
    role,
    bankAccountNumber,
    bankAccountName,
    bankName,
    phonepeAccountNumber,
    paypalEmail,
  } = req.body;

  if (!userName || !email || !phone || !password || !address || !role) {
    return next(new ErrorHandler("Please fill the complete form.", 400));
  }

  if (role === "Auctioneer") {
    if (!bankAccountName || !bankAccountNumber || !bankName) {
      return next(new ErrorHandler("Please provide your full bank details.", 400));
    }
    if (!phonepeAccountNumber) {
      return next(new ErrorHandler("Please provide your phonepe account number.", 400));
    }
    if (!paypalEmail) {
      return next(new ErrorHandler("Please provide your PayPal email.", 400));
    }
  }

  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(new ErrorHandler("User already registered.", 400));
  }

  const cloudinaryResponse = await cloudinary.uploader.upload(profileImage.tempFilePath, {
    folder: "MERN_AUCTION_PLATFORM_USERS",
  });

  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error("Cloudinary error:", cloudinaryResponse.error || "Unknown error.");
    return next(new ErrorHandler("Failed to upload profile image to Cloudinary.", 500));
  }

  const user = await User.create({
    userName,
    email,
    password,
    phone,
    address,
    role,
    profileImage: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
    paymentMethods: {
      bankTransfer: {
        bankAccountNumber,
        bankAccountName,
        bankName,
      },
      phonepe: {
        phonepeAccountNumber,
      },
      paypal: {
        paypalEmail,
      },
    },
  });

  otpStore.delete(email); // Clear OTP after successful registration
  generateToken(user, "User Registered.", 201, res);
});

// Login User
export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please fill the complete form.", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid credentials.", 400));
  }
  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid credentials.", 400));
  }
  generateToken(user, "Login successfully.", 200, res);
});

// Get User Profile
export const getProfile = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

// Logout User
export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Logout Successfully.",
    });
});

// Fetch Leaderboard
export const fetchLeaderboard = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find({ moneySpent: { $gt: 0 } });
  const leaderboard = users.sort((a, b) => b.moneySpent - a.moneySpent);
  res.status(200).json({
    success: true,
    leaderboard,
  });
});
