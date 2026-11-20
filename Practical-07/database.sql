
-- Create Employee Database
CREATE DATABASE IF NOT EXISTS employee_db;

-- Select Database
USE employee_db;

-- Create Employees Table
CREATE TABLE IF NOT EXISTS employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    department VARCHAR(100) NOT NULL,
    salary DECIMAL(10,2) NOT NULL
);

-- Insert Sample Employee Records
INSERT INTO employees (name, email, department, salary)
VALUES
('Rahul Patel', 'rahul@example.com', 'IT', 35000),
('Priya Shah', 'priya@example.com', 'HR', 30000),
('Amit Mehta', 'amit@example.com', 'Finance', 40000);
