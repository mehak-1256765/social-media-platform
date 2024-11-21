const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const feedRoutes = require("./routes/feed"); // Import the feed routes

dotenv.config();
const app = express();

// Middleware
app.use(bodyParser.json()); // Parse incoming requests with JSON payloads
app.use(express.static("public")); // Serve static files from 'public' directory

// Routes
app.use("/api/auth", authRoutes); // Use authRoutes for /api/auth endpoint
app.use("/api/feed", feedRoutes); // Use feedRoutes for /api/feed endpoint

// Connect to database and start server
connectDB();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

