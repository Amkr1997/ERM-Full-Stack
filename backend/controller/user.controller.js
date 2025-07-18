const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./.env" });
const connectDB = require("../db/db.connect");

const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    await connectDB();

    if (name === "" || email === "" || password === "" || role === "") {
      res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    if (!newUser) {
      res.status(404).json({ error: "User not created" });
    }

    res.status(200).json({ message: "User created successfully", newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    await connectDB();

    if (email === "" || password === "" || role === "") {
      res.status(400).json({ error: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ error: "User not found" });
    }

    if (user.role !== role) {
      return res.status(401).json({ error: "Role not correct" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(401).json({ error: "Invalid credentials" });
    }

    const jwtToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "24h",
      }
    );

    res.status(200).json({
      message: "Login successful",
      jwtToken,
      role: user.role,
      userId: user._id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const verifyAuth = async (req, res, next) => {
  console.log(req.headers["authorization"]);

  try {
    await connectDB();

    const token = req.headers["authorization"].split(" ")[1];

    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const privateRoute = async (req, res) => {
  if (req.user.role !== "manager") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  return res.status(200).json({
    message: "Private route accessed successfully",
    role: req.user.role,
  });
};

const getAllUsers = async (req, res) => {
  try {
    await connectDB();

    const users = await User.find().select("-password");

    if (!users) {
      return res.status(404).json({ error: "Users not found" });
    }

    return res
      .status(200)
      .json({ message: "Users fetched successfully", users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSingleUser = async (req, res) => {
  const userId = req.params.id;

  try {
    await connectDB();

    const user = await User.findById(userId).select("-password").populate();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ message: "User fetched successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllEngineers = async (req, res) => {
  try {
    await connectDB();

    const engineers = await User.find({ role: "engineer" }).select("-password");

    if (!engineers) {
      return res.status(404).json({ error: "Engineers not found" });
    }

    return res
      .status(200)
      .json({ message: "Engineers fetched successfully", engineers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// For updating profile
const updateUser = async (req, res) => {
  const userId = req.params.id;
  const dataToUpdate = req.body;

  try {
    await connectDB();

    const existingUser = await User.findById(userId);

    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    if (existingUser.role === "manager") {
      return res.status(401).json({ error: "Cannot update as a manager" });
    }

    const updatedUser = await User.findByIdAndUpdate(userId, dataToUpdate, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    await connectDB();

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not get delete" });
    }

    return res
      .status(200)
      .json({ message: "User deleted successfully", deletedUser });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
  verifyAuth,
  privateRoute,
  getAllUsers,
  getSingleUser,
  getAllEngineers,
  updateUser,
  deleteUser,
};
