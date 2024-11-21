// routes/requestRoutes.js
const express = require("express");
const Request = require("../models/request");
const User = require("../models/user");
const authenticateToken = require("../middleware/authenticateToken");

const router = express.Router();

// Route to send a request to another user
router.post("/sendRequest", authenticateToken, async (req, res) => {
  const { recipientId } = req.body;

  try {
    const sender = req.user; // Get the logged-in user (from the middleware)
    const recipient = await User.findById(recipientId);

    if (!recipient) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new request
    const newRequest = new Request({
      sender: sender._id,
      recipient: recipient._id,
    });

    await newRequest.save();
    res.status(200).json({ message: "Request sent successfully!" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
});

// Route to get all requests sent by the logged-in user
router.get("/sentRequests", authenticateToken, async (req, res) => {
  try {
    const requests = await Request.find({ sender: req.user._id }).populate("recipient", "name email");

    res.status(200).json({ requests });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
});

// Route to get all requests received by the logged-in user
router.get("/receivedRequests", authenticateToken, async (req, res) => {
  try {
    const requests = await Request.find({ recipient: req.user._id }).populate("sender", "name email");

    res.status(200).json({ requests });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
});

// Route to accept or reject a request
router.put("/updateRequest/:id", authenticateToken, async (req, res) => {
  const { status } = req.body; // status can be "accepted" or "rejected"
  const requestId = req.params.id;

  try {
    const request = await Request.findById(requestId);

    if (!request || request.recipient.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Request not found" });
    }

    // Update request status
    request.status = status;
    await request.save();

    res.status(200).json({ message: `Request ${status}` });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
});

// Route to delete a request
router.delete("/deleteRequest/:id", authenticateToken, async (req, res) => {
  const requestId = req.params.id;

  try {
    const request = await Request.findById(requestId);

    if (!request || request.recipient.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Request not found" });
    }

    await request.remove();
    res.status(200).json({ message: "Request deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
});

module.exports = router;
