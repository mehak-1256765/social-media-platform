const express = require("express");
const Post = require("../models/post"); // Import Post model
const User = require("../models/user"); // Import User model
const router = express.Router();

// Create a new post
router.post("/", async (req, res) => {
  const { userId, content } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const post = new Post({ user: userId, content });
    await post.save();

    res.status(201).json({ message: "Post created successfully!", post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a comment to a post
router.post("/:postId/comment", async (req, res) => {
  const { postId } = req.params;
  const { userId, comment } = req.body;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.comments.push({ user: userId, comment });
    await post.save();

    res.status(200).json({ message: "Comment added successfully!", post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get posts for a user's feed
router.get("/feed/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate("friends");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const posts = await Post.find({
      $or: [
        { user: { $in: user.friends } },
        { "comments.user": { $in: user.friends } },
      ],
    }).populate("user comments.user");

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
