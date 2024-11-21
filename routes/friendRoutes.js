const express = require("express");
const User = require("../models/user");
const FriendRequest = require("../models/friendRequest");
const authMiddleware = require("../middleware/authenticateToken.js");
const router = express.Router();

// Middleware to protect routes
router.use(authMiddleware);

// Search for users by name
router.get("/search", async (req, res) => {
  const { name } = req.query;
  if (!name) return res.status(400).json({ message: "Name is required" });

  try {
    // Find users whose name contains the search query
    const users = await User.find({ name: { $regex: name, $options: "i" } });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Send a friend request
router.post("/send", async (req, res) => {
  const { receiverId } = req.body;

  try {
    // Create a new friend request
    const request = new FriendRequest({
      sender: req.userId,
      receiver: receiverId,
    });
    await request.save();
    res.json({ message: "Friend request sent!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
