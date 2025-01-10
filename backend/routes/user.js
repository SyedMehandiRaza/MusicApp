const router = require("express").Router();
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/auth.middleware");

// signup route
router.post("/sign-up", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are mandatory" });
    }
    if (username.length < 5) {
      return res
        .status(400)
        .json({ error: "Username must be at least 5 characters long" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ error: "Password must be at least 8 characters long" });
    }

    // check if user already exists
    const existingEmail = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });
    if (existingEmail || existingUsername) {
      return res
        .status(400)
        .json({ error: "User or Email with this email already exists" });
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Signin route
router.post("/sign-in", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are mandatory" });
    }

    // check if user exists
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // verify password
    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!passwordCorrect) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // generate JWT token
    const token = jwt.sign(
      { id: existingUser._id, email: existingUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.cookie("podcasterUserToken", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: "none",
      secure: process.env.NODE_ENV === "production",
    });
    return res.status(200).json({
      id: existingUser._id,
      email: existingUser.email,
      username: existingUser.username,
      message: "User signed in successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Signout route
router.post("/sign-out", async (req, res) => {
  res.clearCookie("podcasterUserToken", {
    httpOnly: true,
  });
  res.status(200).json({ message: "User signed out successfully" });
});

// check cookie present or not
router.get("/check-cookie", async (req, res) => {
  const token = req.cookies.podcasterUserToken;
  if (token) {
    return res.status(200).json({ message: true });
  }
  return res.status(200).json({ message: false });
});

// get user details
router.get("/user-details", authMiddleware, async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email }).select("-password");

    return res.status(200).json({ user: existingUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
