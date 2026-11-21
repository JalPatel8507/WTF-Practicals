
// Get the login form
const loginForm = document.querySelector("form");

// Handle login button click
loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.querySelector('input[type="email"]').value.trim();
    const password = document.querySelector('input[type="password"]').value;

    if (email === "" || password === "") {
        alert("Please enter both email and password.");
        return;
    }

    alert(
        "Demo Login Attempt!\n\n" +
        "This sample demonstrates why login systems need secure authentication."
    );
});
