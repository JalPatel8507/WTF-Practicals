
let students = [];

const studentForm = document.getElementById("studentForm");
const studentList = document.getElementById("studentList");
const searchInput = document.getElementById("search");

// Display student records
function displayStudents(data = students) {
    studentList.innerHTML = "";

    data.forEach((student) => {
        const row = document.createElement("tr");

        const values = [
            student.name,
            student.enrollment,
            student.email,
            student.branch,
            student.semester
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
        editButton.onclick = () => editStudent(student.enrollment);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete";
        deleteButton.onclick = () => deleteStudent(student.enrollment);

        actionCell.append(editButton, deleteButton);
        row.appendChild(actionCell);

        studentList.appendChild(row);
    });
}

// Add or update student
studentForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const enrollment = document.getElementById("enrollment").value.trim();
    const email = document.getElementById("email").value.trim();
    const branch = document.getElementById("branch").value.trim();
    const semester = Number(document.getElementById("semester").value);

    if (!name || !enrollment || !email || !branch ||
        semester < 1 || semester > 8) {
        alert("Please enter valid student details.");
        return;
    }

    const editIndex = document.getElementById("editIndex").value;

    if (editIndex === "") {
        const exists = students.some(
            student => student.enrollment === enrollment
        );

        if (exists) {
            alert("Enrollment number already exists!");
            return;
        }

        students.push({
            name, enrollment, email, branch, semester
        });

        alert("Student added successfully!");
    } else {
        const oldEnrollment = students[Number(editIndex)].enrollment;

        const duplicate = students.some(
            (student, index) =>
                student.enrollment === enrollment &&
                index !== Number(editIndex)
        );

        if (duplicate) {
            alert("Enrollment number already exists!");
            return;
        }

        students[Number(editIndex)] = {
            name, enrollment, email, branch, semester
        };

        alert("Student updated successfully!");
    }

    studentForm.reset();
    document.getElementById("editIndex").value = "";
    document.getElementById("submitBtn").textContent = "Add Student";

    displayStudents();
});

// Edit student
function editStudent(enrollment) {
    const index = students.findIndex(
        student => student.enrollment === enrollment
    );

    const student = students[index];

    document.getElementById("name").value = student.name;
    document.getElementById("enrollment").value = student.enrollment;
    document.getElementById("email").value = student.email;
    document.getElementById("branch").value = student.branch;
    document.getElementById("semester").value = student.semester;

    document.getElementById("editIndex").value = index;
    document.getElementById("submitBtn").textContent = "Update Student";
}

// Delete student
function deleteStudent(enrollment) {
    if (confirm("Are you sure you want to delete this student?")) {
        students = students.filter(
            student => student.enrollment !== enrollment
        );

        displayStudents();
        alert("Student deleted successfully!");
    }
}

// Search students
searchInput.addEventListener("input", function() {
    const keyword = this.value.toLowerCase();

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(keyword) ||
        student.enrollment.toLowerCase().includes(keyword) ||
        student.branch.toLowerCase().includes(keyword)
    );

    displayStudents(filteredStudents);
});

displayStudents();
