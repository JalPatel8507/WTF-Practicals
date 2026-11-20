
document.getElementById("eventForm").addEventListener("submit", function(event) {

    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let mobile = document.getElementById("mobile").value.trim();
    let eventName = document.getElementById("event").value;
    let payment = document.getElementById("payment").value;
    let amount = Number(document.getElementById("amount").value);

    let message = document.getElementById("message");

    if (name === "" || email === "" || mobile === "" ||
        eventName === "" || payment === "") {
        message.style.color = "red";
        message.textContent = "Please fill all the fields!";
        return;
    }

    if (!/^[0-9]{10}$/.test(mobile)) {
        message.style.color = "red";
        message.textContent = "Enter a valid 10-digit mobile number!";
        return;
    }

    if (amount <= 0 || !Number.isFinite(amount)) {
        message.style.color = "red";
        message.textContent = "Enter a valid registration amount!";
        return;
    }

    message.style.color = "green";

    message.textContent =
        "Registration Successful! " +
        "Name: " + name +
        " | Event: " + eventName +
        " | Payment: " + payment +
        " | Amount: ₹" + amount;

    document.getElementById("eventForm").reset();

});
