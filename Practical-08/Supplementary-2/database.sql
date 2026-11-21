
CREATE DATABASE employee_management;

USE employee_management;

CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    department VARCHAR(100) NOT NULL,
    salary DECIMAL(10,2) NOT NULL
);

INSERT INTO employees (name, email, department, salary)
VALUES
('Rahul Patel', 'rahul@gmail.com', 'IT', 35000),
('Amit Shah', 'amit@gmail.com', 'HR', 30000),
('Neha Desai', 'neha@gmail.com', 'Finance', 40000);
