import express from "express";
import User from "../models/User.js";

const router = express.Router();

// POST - Add user
router.post("/", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET - Fetch all users
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

export default router;
