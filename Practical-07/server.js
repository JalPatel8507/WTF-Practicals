
// Import required modules
const express = require("express");
const session = require("express-session");

// Create an Express application
const app = express();

// Define the server port
const PORT = 3000;

// Middleware to read form data
app.use(express.urlencoded({ extended: true }));

// Configure session management
app.use(
    session({
        secret: "library-secret-key",
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            maxAge: 10 * 60 * 1000
        }
    })
);

// Predefined login credentials
const USERNAME = "admin";
const PASSWORD = "12345";

// Authentication middleware
function authenticate(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect("/login");
    }
}

// Route 1: Home Page
app.get("/", (req, res) => {
    res.send(`
        <h1>Central City Library</h1>
        <p>Welcome to our online library portal.</p>
        <a href="/about">About</a><br>
        <a href="/login">Login</a><br>
        <a href="/dashboard">Dashboard</a>
    `);
});

// Route 2: About Page
app.get("/about", (req, res) => {
    res.send(`
        <h1>About Central City Library</h1>
        <p>Our library provides books and digital
        resources to students and staff.</p>
        <a href="/">Home</a>
    `);
});

// Route 3: Login Page
app.get("/login", (req, res) => {
    res.send(`
        <h1>Library Member Login</h1>

        <form action="/login" method="POST">
            <label>Username:</label>
            <input type="text" name="username" required>

            <br><br>

            <label>Password:</label>
            <input type="password" name="password" required>

            <br><br>

            <button type="submit">Login</button>
        </form>

        <a href="/">Home</a>
    `);
});

// Route 4: Handle Login Authentication
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (username === USERNAME && password === PASSWORD) {
        req.session.user = username;
        res.redirect("/dashboard");
    } else {
        res.send(`
            <h2>Invalid Username or Password!</h2>
            <a href="/login">Try Again</a>
        `);
    }
});

// Route 5: Protected Dashboard
app.get("/dashboard", authenticate, (req, res) => {
    res.send(`
        <h1>Welcome to Library Dashboard</h1>
        <p>Hello, ${req.session.user}!</p>
        <p>You are successfully authenticated.</p>
        <a href="/logout">Logout</a>
    `);
});

// Route 6: Logout
app.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("Unable to logout.");
        }

        res.clearCookie("connect.sid");
        res.redirect("/login");
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
