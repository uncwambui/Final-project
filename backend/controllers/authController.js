import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* ============================
   REGISTER USER
=============================== */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ error: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashed,
      role: role || "user", // default user
    });

    const cleanUser = {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    };

    res.status(201).json({
      message: "User registered successfully",
      user: cleanUser,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


/* ============================
   LOGIN USER
=============================== */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ error: "Invalid credentials" });

    // Create JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Clean the user object
    const safeUser = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role, // CRITICAL
    };

    return res.json({
      message: "Login successful",
      token,
      user: safeUser,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


/* ============================
   GET AUTHENTICATED USER
=============================== */
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
