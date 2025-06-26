const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongooseConnection = require("./config/connect");
const path = require("path");
const fs = require("fs");

const app = express();

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongooseConnection();

// Define PORT
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors());

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Serve uploaded static files (videos)
app.use("/uploads", express.static(uploadsDir));

// API Routes
app.use("/api/admin", require("./routers/adminRoutes"));
app.use("/api/user", require("./routers/userRoutes"));

// Start server
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

