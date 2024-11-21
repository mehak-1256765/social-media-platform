const Post = require('../models/post');
const User = require('../models/user');

const getFeed = async (userId) => {
  // Fetch friend list of the user
  const user = await User.findById(userId).populate('friends');

  // Fetch posts created by the user or their friends
  const friendIds = user.friends.map(friend => friend._id);
  friendIds.push(userId); // Include the user's own posts

  const posts = await Post.find({ userId: { $in: friendIds } }).populate('comments');
  
  // Filter posts based on comments from friends
  const friendCommentedPosts = await Post.find({
    comments: { $in: user.friends.map(friend => friend._id) }
  }).populate('comments');
  
  return { posts, friendCommentedPosts };
};

module.exports = { getFeed };
