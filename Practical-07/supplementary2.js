
const API_URL = "http://localhost:3000/employees";

let employeeForm = document.getElementById("employeeForm");

// Load employees when page opens
document.addEventListener("DOMContentLoaded", loadEmployees);

// Add or update employee
employeeForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    let id = document.getElementById("employeeId").value;

    let employee = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        department: document.getElementById("department").value.trim(),
        salary: Number(document.getElementById("salary").value)
    };

    if (!employee.name || !employee.email ||
        !employee.department || employee.salary <= 0) {
        showMessage("Please enter valid employee details!", true);
        return;
    }

    try {

        let response = await fetch(
            id ? `${API_URL}/${id}` : API_URL,
            {
                method: id ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(employee)
            }
        );

        let result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Operation failed!");
        }

        showMessage(result.message);
        employeeForm.reset();
        document.getElementById("employeeId").value = "";
        document.getElementById("submitBtn").textContent = "Add Employee";

        loadEmployees();

    } catch (error) {
        showMessage(error.message, true);
    }

});

// Display all employees
async function loadEmployees() {

    let employeeList = document.getElementById("employeeList");

    try {

        let response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Unable to load employees!");
        }

        let employees = await response.json();

        employeeList.innerHTML = "";

        employees.forEach(function(employee) {

            let row = document.createElement("tr");

            row.innerHTML = `
                <td>${employee.id}</td>
                <td></td>
                <td></td>
                <td></td>
                <td>${employee.salary}</td>
                <td>
                    <button class="edit" onclick="editEmployee(${employee.id})">
                        Edit
                    </button>
                    <button class="delete" onclick="deleteEmployee(${employee.id})">
                        Delete
                    </button>
                </td>
            `;

            row.cells[1].textContent = employee.name;
            row.cells[2].textContent = employee.email;
            row.cells[3].textContent = employee.department;

            employeeList.appendChild(row);

        });

    } catch (error) {
        employeeList.innerHTML =
            `<tr><td colspan="6">${error.message}</td></tr>`;
    }

}

// Edit employee
async function editEmployee(id) {

    try {

        let response = await fetch(`${API_URL}/${id}`);

        if (!response.ok) {
            throw new Error("Employee not found!");
        }

        let employee = await response.json();

        document.getElementById("employeeId").value = employee.id;
        document.getElementById("name").value = employee.name;
        document.getElementById("email").value = employee.email;
        document.getElementById("department").value = employee.department;
        document.getElementById("salary").value = employee.salary;

        document.getElementById("submitBtn").textContent = "Update Employee";

    } catch (error) {
        showMessage(error.message, true);
    }

}

// Delete employee
async function deleteEmployee(id) {

    if (!confirm("Are you sure you want to delete this employee?")) {
        return;
    }

    try {

        let response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        let result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Delete failed!");
        }

        showMessage(result.message);
        loadEmployees();

    } catch (error) {
        showMessage(error.message, true);
    }

}

// Display messages
function showMessage(message, isError = false) {

    let messageBox = document.getElementById("message");

    messageBox.textContent = message;
    messageBox.style.color = isError ? "red" : "green";

}
