
let students = [];

function addStudent() {
    let name = document.getElementById("studentName").value.trim();

    if (name === "") {
        alert("Please enter student name!");
        return;
    }

    students.push({
        name: name,
        status: "Absent"
    });

    document.getElementById("studentName").value = "";

    displayAttendance();
}

function updateAttendance(index, status) {
    students[index].status = status;
    displayAttendance();
}

function displayAttendance() {
    let list = document.getElementById("attendanceList");
    list.innerHTML = "";

    let present = 0;
    let absent = 0;

    students.forEach(function(student, index) {
        if (student.status === "Present") {
            present++;
        } else {
            absent++;
        }

        list.innerHTML +=
            `<div class="student">
                <strong>${student.name}</strong>
                <p>Status: ${student.status}</p>
                <button onclick="updateAttendance(${index}, 'Present')">
                    Present
                </button>
                <button onclick="updateAttendance(${index}, 'Absent')">
                    Absent
                </button>
            </div>`;
    });

    document.getElementById("summary").innerHTML =
        "Present: " + present + " | Absent: " + absent;
}
