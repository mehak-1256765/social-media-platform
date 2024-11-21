const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require('../models/user'); // Ensure User model is correctly required
const Post = require('../models/post'); // Ensure Post model is correctly required

router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;

  // Check if userId is valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid userId" });
  }

  try {
    const user = await User.findById(userId).populate("friends");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const friendIds = user.friends.map(friend => friend._id);
    friendIds.push(user._id); // Include the user's own posts

    const posts = await Post.find({ userId: { $in: friendIds } })
                            .populate("comments")
                            .populate("userId"); // Ensure user data is populated in posts

    res.json({ posts }); // Send posts along with their comments
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching posts." });
  }
});

// Ensure you're exporting the router correctly
module.exports = router;
