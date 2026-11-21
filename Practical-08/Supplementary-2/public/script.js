
const API_URL = "http://localhost:3001/employees";

const employeeForm = document.getElementById("employeeForm");
const employeeList = document.getElementById("employeeList");
const searchInput = document.getElementById("search");

// Fetch employees from database
async function loadEmployees() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Unable to fetch employees");
        }

        const employees = await response.json();
        displayEmployees(employees);

    } catch (error) {
        alert("Cannot connect to server. Please start the backend.");
        console.error(error);
    }
}

// Display employee records
function displayEmployees(employees) {
    employeeList.innerHTML = "";

    employees.forEach(employee => {
        const row = document.createElement("tr");

        const values = [
            employee.id,
            employee.name,
            employee.email,
            employee.department,
            employee.salary
        ];

        values.forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        const actionCell = document.createElement("td");

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "edit";
        editButton.onclick = () => editEmployee(employee);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete";
        deleteButton.onclick = () => deleteEmployee(employee.id);

        actionCell.append(editButton, deleteButton);
        row.appendChild(actionCell);

        employeeList.appendChild(row);
    });
}

// Add or update employee
employeeForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const id = document.getElementById("employeeId").value;
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const department = document.getElementById("department").value.trim();
    const salary = Number(document.getElementById("salary").value);

    if (!name || !email || !department || !Number.isFinite(salary) || salary <= 0) {
        alert("Please enter valid employee details.");
        return;
    }

    const employee = { name, email, department, salary };

    try {
        const response = await fetch(
            id ? `${API_URL}/${id}` : API_URL,
            {
                method: id ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(employee)
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || "Operation failed");
        }

        alert(result.message);

        employeeForm.reset();
        document.getElementById("employeeId").value = "";
        document.getElementById("submitBtn").textContent = "Add Employee";

        loadEmployees();

    } catch (error) {
        alert(error.message);
    }
});

// Edit employee
function editEmployee(employee) {
    document.getElementById("employeeId").value = employee.id;
    document.getElementById("name").value = employee.name;
    document.getElementById("email").value = employee.email;
    document.getElementById("department").value = employee.department;
    document.getElementById("salary").value = employee.salary;

    document.getElementById("submitBtn").textContent = "Update Employee";
}

// Delete employee
async function deleteEmployee(id) {
    if (!confirm("Are you sure you want to delete this employee?")) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || "Delete failed");
        }

        alert(result.message);
        loadEmployees();

    } catch (error) {
        alert(error.message);
    }
}

// Search employees
searchInput.addEventListener("input", async function() {
    const response = await fetch(API_URL);
    const employees = await response.json();

    const keyword = this.value.toLowerCase();

    const filtered = employees.filter(employee =>
        employee.name.toLowerCase().includes(keyword) ||
        employee.email.toLowerCase().includes(keyword) ||
        employee.department.toLowerCase().includes(keyword)
    );

    displayEmployees(filtered);
});

// Load records when page opens
loadEmployees();
