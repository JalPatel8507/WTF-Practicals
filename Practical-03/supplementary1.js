
function calculateResult() {
    let name = document.getElementById("name").value.trim();

    let m1 = document.getElementById("m1").value;
    let m2 = document.getElementById("m2").value;
    let m3 = document.getElementById("m3").value;
    let m4 = document.getElementById("m4").value;
    let m5 = document.getElementById("m5").value;

    let result = document.getElementById("result");

    // Check empty fields
    if (name === "" || m1 === "" || m2 === "" ||
        m3 === "" || m4 === "" || m5 === "") {
        result.innerHTML = "Please fill all the fields!";
        return;
    }

    let marks = [
        Number(m1),
        Number(m2),
        Number(m3),
        Number(m4),
        Number(m5)
    ];

    // Check valid marks
    for (let i = 0; i < marks.length; i++) {
        if (marks[i] < 0 || marks[i] > 100) {
            result.innerHTML = "Marks must be between 0 and 100!";
            return;
        }
    }

    // Calculate total and percentage
    let total = 0;

    for (let i = 0; i < marks.length; i++) {
        total = total + marks[i];
    }

    let percentage = total / 5;
    let grade;
    let status;

    // Calculate grade
    if (marks.some(mark => mark < 35)) {
        grade = "F";
        status = "Fail";
    } 
    else if (percentage >= 90) {
        grade = "A+";
        status = "Pass";
    } 
    else if (percentage >= 80) {
        grade = "A";
        status = "Pass";
    } 
    else if (percentage >= 70) {
        grade = "B";
        status = "Pass";
    } 
    else if (percentage >= 60) {
        grade = "C";
        status = "Pass";
    } 
    else if (percentage >= 50) {
        grade = "D";
        status = "Pass";
    } 
    else {
        grade = "E";
        status = "Pass";
    }

    // Display result
    result.innerHTML =
        "<h2>Student Result</h2>" +
        "Name: " + name + "<br>" +
        "Total Marks: " + total + " / 500<br>" +
        "Percentage: " + percentage.toFixed(2) + "%<br>" +
        "Grade: " + grade + "<br>" +
        "Result: " + status;
}
