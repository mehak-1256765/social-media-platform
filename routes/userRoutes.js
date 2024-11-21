const express = require("express");
const router = express.Router();
const User = require("../models/user");
const FriendRequest = require("../models/friendRequest"); 

// Route to get all users except the logged-in user
router.get("/users", async (req, res) => {
  try {
    const currentUserId = req.user.id; // Ensure req.user contains the logged-in user's details
    const users = await User.find({ _id: { $ne: currentUserId } }); // Exclude the logged-in user
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Route to get friend requests for the logged-in user
router.get("/friend-requests", async (req, res) => {
  try {
    const friendRequests = await FriendRequest.find({ receiverId: req.user.id });
    res.status(200).json(friendRequests);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch friend requests" });
  }
});

module.exports = router;
