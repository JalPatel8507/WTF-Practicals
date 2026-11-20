
document.getElementById("employeeForm").addEventListener("submit", function(event) {

    event.preventDefault();

    let empId = document.getElementById("empId").value.trim();
    let email = document.getElementById("email").value.trim();
    let mobile = document.getElementById("mobile").value.trim();
    let salary = Number(document.getElementById("salary").value);
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    let message = document.getElementById("message");

    if (empId === "" || email === "" || mobile === "" ||
        password === "" || confirmPassword === "") {
        message.style.color = "red";
        message.textContent = "Please fill all the fields!";
        return;
    }

    if (!/^EMP[0-9]{3,}$/.test(empId)) {
        message.style.color = "red";
        message.textContent = "Employee ID must be like EMP101!";
        return;
    }

    if (!/^[0-9]{10}$/.test(mobile)) {
        message.style.color = "red";
        message.textContent = "Enter a valid 10-digit mobile number!";
        return;
    }

    if (salary <= 0 || !Number.isFinite(salary)) {
        message.style.color = "red";
        message.textContent = "Enter a valid salary!";
        return;
    }

    if (password.length < 8) {
        message.style.color = "red";
        message.textContent = "Password must contain at least 8 characters!";
        return;
    }

    if (password !== confirmPassword) {
        message.style.color = "red";
        message.textContent = "Passwords do not match!";
        return;
    }

    message.style.color = "green";
    message.textContent = "Employee registered successfully!";

    document.getElementById("employeeForm").reset();

});
