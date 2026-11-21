
const form = document.getElementById("registrationForm");
const message = document.getElementById("message");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    const strongPassword =
        password.length >= 8 &&
        password.length <= 128 &&
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /[0-9]/.test(password) &&
        /[^A-Za-z0-9]/.test(password);

    if (!/^[a-zA-Z0-9_]{3,30}$/.test(username)) {
        message.textContent = "Username must be 3-30 characters.";
        message.style.color = "red";
        return;
    }

    if (!strongPassword) {
        message.textContent = "Password must contain uppercase, lowercase, number and special character.";
        message.style.color = "red";
        return;
    }

    if (password !== confirmPassword) {
        message.textContent = "Passwords do not match!";
        message.style.color = "red";
        return;
    }

    try {
        const response = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password,
                confirmPassword
            })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message);
        }

        message.textContent = result.message;
        message.style.color = "green";
        form.reset();

    } catch (error) {
        message.textContent = error.message || "Server connection failed.";
        message.style.color = "red";
    }
});
