
// Import required packages
const express = require("express");
const session = require("express-session");
const path = require("path");
require("dotenv").config();

// Create Express application
const app = express();

// Set port number
const PORT = process.env.PORT || 3000;

// Middleware to read form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET || "foodexpress_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60
    }
}));

// Serve frontend files
app.use(express.static(path.join(__dirname, "public")));

// Home route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Test API route
app.get("/api/status", (req, res) => {
    res.json({
        success: true,
        message: "FoodExpress server is running successfully!"
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`FoodExpress server running at http://localhost:${PORT}`);
});
