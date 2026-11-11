
// ====================================
// BLOODBRIDGE BACKEND SERVER
// ====================================

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Import routes
const authRoutes = require("./routes/authRoutes");

// Middleware
app.use(cors());
app.use(express.json());

// Authentication routes
app.use("/api/auth", authRoutes);

// Home route
app.get("/", (req, res) => {
    res.send("Welcome to BloodBridge Backend!");
});

// Backend test route
app.get("/api/test", (req, res) => {
    res.json({
        success: true,
        message: "BloodBridge Backend is working successfully!"
    });
});

// Handle unknown routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "API route not found"
    });
});

// Connect MongoDB and start server
async function startServer() {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is missing. Check your .env file.");
        }

        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected successfully!");

        app.listen(PORT, () => {
            console.log(
                `BloodBridge server running at http://localhost:${PORT}`
            );
        });

    } catch (error) {
        console.error("Server startup failed:", error.message);
        process.exit(1);
    }
}

startServer();
