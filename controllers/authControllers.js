const jwt = require("jsonwebtoken"); 
const User = require("../models/user"); 

// Secret key for JWT (store this securely, preferably in environment variables)
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"; 

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Validate password (you should use hashed passwords, not plain text)
    if (password !== user.password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });

    // Send token in response
    res.status(200).json({
      message: "Login successful!",
      token, // Send the token back to the client
    });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while logging in" });
  }
};
