//models/friendRequest
const mongoose = require("mongoose");

const friendRequestSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["Pending", "Accepted", "Rejected"], default: "Pending" }, // Status of the request
});

module.exports = mongoose.model("FriendRequest", friendRequestSchema);
