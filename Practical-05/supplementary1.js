
document.getElementById("admissionForm").addEventListener("submit", function(event) {

    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let mobile = document.getElementById("mobile").value.trim();
    let dob = document.getElementById("dob").value;
    let school = document.getElementById("school").value.trim();
    let percentage = Number(document.getElementById("percentage").value);
    let course = document.getElementById("course").value;

    let message = document.getElementById("message");

    if (name === "" || email === "" || mobile === "" ||
        dob === "" || school === "" || course === "") {
        message.style.color = "red";
        message.textContent = "Please fill all the fields!";
        return;
    }

    if (!/^[0-9]{10}$/.test(mobile)) {
        message.style.color = "red";
        message.textContent = "Enter a valid 10-digit mobile number!";
        return;
    }

    if (new Date(dob) >= new Date()) {
        message.style.color = "red";
        message.textContent = "Enter a valid date of birth!";
        return;
    }

    if (percentage < 0 || percentage > 100) {
        message.style.color = "red";
        message.textContent = "Percentage must be between 0 and 100!";
        return;
    }

    message.style.color = "green";
    message.textContent = "Admission application submitted successfully!";

    document.getElementById("admissionForm").reset();

});
