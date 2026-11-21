
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// MySQL database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_PASSWORD || "",
    database: "employee_management"
});

db.connect((err) => {
    if (err) {
        console.log("Database connection failed:", err.message);
        return;
    }

    console.log("Connected to MySQL database!");
});

// Get all employees
app.get("/employees", (req, res) => {
    db.query("SELECT * FROM employees", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Add employee
app.post("/employees", (req, res) => {
    const { name, email, department, salary } = req.body;

    if (!name || !email || !department || salary === undefined ||
        !Number.isFinite(Number(salary)) || Number(salary) <= 0) {
        return res.status(400).json({ error: "Enter valid employee details." });
    }

    const sql = "INSERT INTO employees (name, email, department, salary) VALUES (?, ?, ?, ?)";

    db.query(sql, [name, email, department, salary], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Employee added successfully!", id: result.insertId });
    });
});

// Update employee
app.put("/employees/:id", (req, res) => {
    const { name, email, department, salary } = req.body;

    if (!name || !email || !department || salary === undefined ||
        !Number.isFinite(Number(salary)) || Number(salary) <= 0) {
        return res.status(400).json({ error: "Enter valid employee details." });
    }

    const sql = "UPDATE employees SET name=?, email=?, department=?, salary=? WHERE id=?";

    db.query(sql, [name, email, department, salary, req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Employee not found." });
        }
        res.json({ message: "Employee updated successfully!" });
    });
});

// Delete employee
app.delete("/employees/:id", (req, res) => {
    db.query("DELETE FROM employees WHERE id=?", [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Employee not found." });
        }
        res.json({ message: "Employee deleted successfully!" });
    });
});

// Start server
app.listen(3001, () => {
    console.log("Server running at http://localhost:3001");
});
