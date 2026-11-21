
const express = require("express");
const mysql = require("mysql2/promise");
const session = require("express-session");
const crypto = require("crypto");
const { promisify } = require("util");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const scrypt = promisify(crypto.scrypt);

// MySQL database connection
const db = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: "finsecure",
    waitForConnections: true,
    connectionLimit: 10
});

// Middleware
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: false }));

app.use(session({
    name: "finsecure.sid",
    secret: process.env.SESSION_SECRET || "classroom-secret-change-before-deployment",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        maxAge: 30 * 60 * 1000
    }
}));

// Serve main website
app.use(express.static(path.join(__dirname, "public")));

// Serve supplementary practical files
const supplementaryFiles = {
    "/supplementary1.html": "supplementary1.html",
    "/supplementary1.css": "supplementary1.css",
    "/supplementary1.js": "supplementary1.js",
    "/supplementary2.html": "supplementary2.html",
    "/supplementary2.css": "supplementary2.css",
    "/supplementary2.js": "supplementary2.js"
};

app.get(Object.keys(supplementaryFiles), (req, res) => {
    res.sendFile(path.join(__dirname, supplementaryFiles[req.path]));
});

// Username validation
function validUsername(username) {
    return typeof username === "string" &&
        /^[a-zA-Z0-9_]{3,30}$/.test(username);
}

// Password validation
function validPassword(password) {
    return typeof password === "string" &&
        password.length >= 8 &&
        password.length <= 128 &&
        /[a-z]/.test(password) &&
        /[A-Z]/.test(password) &&
        /[0-9]/.test(password) &&
        /[^a-zA-Z0-9]/.test(password);
}

// Secure password hashing using scrypt
async function hashPassword(password) {
    const salt = crypto.randomBytes(16).toString("hex");
    const key = await scrypt(password, salt, 64);
    return `${salt}:${key.toString("hex")}`;
}

// Verify password
async function verifyPassword(password, savedHash) {
    if (typeof savedHash !== "string") return false;

    const parts = savedHash.split(":");

    if (parts.length !== 2) return false;

    const [salt, keyHex] = parts;

    if (!/^[0-9a-f]{128}$/i.test(keyHex)) return false;

    const expected = Buffer.from(keyHex, "hex");
    const actual = await scrypt(password, salt, 64);

    return crypto.timingSafeEqual(actual, expected);
}

// Check server and database
app.get("/api/health", async (req, res) => {
    try {
        await db.query("SELECT 1");
        res.json({
            message: "Server and database are working."
        });
    } catch (error) {
        console.error("Health check:", error.message);
        res.status(500).json({
            message: "Database connection failed."
        });
    }
});

// REGISTER
app.post("/api/register", async (req, res) => {
    try {
        const { username, password, confirmPassword } = req.body || {};

        if (!validUsername(username)) {
            return res.status(400).json({
                message: "Username must be 3-30 characters using letters, numbers or underscore."
            });
        }

        if (!validPassword(password)) {
            return res.status(400).json({
                message: "Password must be 8-128 characters with uppercase, lowercase, number and special character."
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "Passwords do not match."
            });
        }

        const passwordHash = await hashPassword(password);

        await db.execute(
            "INSERT INTO users (username, password_hash) VALUES (?, ?)",
            [username, passwordHash]
        );

        res.status(201).json({
            message: "Registration successful. Please log in."
        });

    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
                message: "This username already exists."
            });
        }

        console.error("Registration error:", error.message);

        res.status(500).json({
            message: "Registration failed due to a server error."
        });
    }
});

// LOGIN
app.post("/api/login", async (req, res) => {
    try {
        const { username, password } = req.body || {};

        if (
            typeof username !== "string" ||
            typeof password !== "string"
        ) {
            return res.status(400).json({
                message: "Enter your username and password."
            });
        }

        const [rows] = await db.execute(
            "SELECT id, username, password_hash FROM users WHERE username = ?",
            [username]
        );

        if (
            rows.length === 0 ||
            !(await verifyPassword(password, rows[0].password_hash))
        ) {
            return res.status(401).json({
                message: "Invalid username or password."
            });
        }

        req.session.regenerate((error) => {
            if (error) {
                console.error("Session error:", error.message);

                return res.status(500).json({
                    message: "Unable to start a session."
                });
            }

            req.session.user = {
                id: rows[0].id,
                username: rows[0].username
            };

            req.session.save((saveError) => {
                if (saveError) {
                    console.error("Session save:", saveError.message);

                    return res.status(500).json({
                        message: "Unable to save the session."
                    });
                }

                res.json({
                    message: "Login successful.",
                    username: rows[0].username
                });
            });
        });

    } catch (error) {
        console.error("Login error:", error.message);

        res.status(500).json({
            message: "Login failed due to a server error."
        });
    }
});

// Login protection middleware
function requireLogin(req, res, next) {
    if (!req.session.user) {
        return res.status(401).json({
            message: "Please log in first."
        });
    }

    next();
}

// Protected dashboard
app.get("/api/dashboard", requireLogin, (req, res) => {
    res.json({
        message: "Welcome to the FinSecure dashboard.",
        user: req.session.user
    });
});

// XSS safety demonstration
app.post("/api/comment", requireLogin, (req, res) => {
    const { comment } = req.body || {};

    if (typeof comment !== "string" || comment.length > 500) {
        return res.status(400).json({
            message: "Comment must be text of at most 500 characters."
        });
    }

    res.json({
        message: "Input received.",
        comment
    });
});

// LOGOUT
app.post("/api/logout", (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            console.error("Logout error:", error.message);

            return res.status(500).json({
                message: "Unable to log out."
            });
        }

        res.clearCookie("finsecure.sid", {
            httpOnly: true,
            sameSite: "lax",
            secure: false
        });

        res.json({
            message: "Logged out successfully."
        });
    });
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error("Application error:", error.message);

    if (res.headersSent) return next(error);

    res.status(500).json({
        message: "An unexpected server error occurred."
    });
});

// Start server without requiring MySQL at startup
app.listen(PORT, () => {
    console.log(`FinSecure running at http://localhost:${PORT}`);
});
