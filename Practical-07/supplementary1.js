
let students = [];
let editIndex = -1;

let studentForm = document.getElementById("studentForm");

studentForm.addEventListener("submit", function(event) {

    event.preventDefault();

    let rollNo = document.getElementById("rollNo").value.trim();
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let course = document.getElementById("course").value.trim();
    let semester = Number(document.getElementById("semester").value);

    // Validate student details
    if (!rollNo || !name || !email || !course) {
        alert("Please fill all fields!");
        return;
    }

    if (!/^[A-Za-z ]+$/.test(name)) {
        alert("Enter a valid student name!");
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Enter a valid email address!");
        return;
    }

    if (semester < 1 || semester > 8) {
        alert("Semester must be between 1 and 8!");
        return;
    }

    // Check duplicate roll number
    let duplicate = students.some(function(student, index) {
        return student.rollNo.toLowerCase() === rollNo.toLowerCase()
            && index !== editIndex;
    });

    if (duplicate) {
        alert("Roll number already exists!");
        return;
    }

    let student = {
        rollNo: rollNo,
        name: name,
        email: email,
        course: course,
        semester: semester
    };

    // Add or update student
    if (editIndex === -1) {
        students.push(student);
        alert("Student added successfully!");
    } else {
        students[editIndex] = student;
        alert("Student updated successfully!");
        editIndex = -1;
        document.getElementById("submitBtn").textContent = "Add Student";
    }

    studentForm.reset();
    displayStudents();

});

// Display student records
function displayStudents() {

    let studentList = document.getElementById("studentList");

    studentList.innerHTML = "";

    students.forEach(function(student, index) {

        let row = document.createElement("tr");

        row.innerHTML = `
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
                <button class="edit" onclick="editStudent(${index})">
                    Edit
                </button>
                <button class="delete" onclick="deleteStudent(${index})">
                    Delete
                </button>
            </td>
        `;

        row.cells[0].textContent = student.rollNo;
        row.cells[1].textContent = student.name;
        row.cells[2].textContent = student.email;
        row.cells[3].textContent = student.course;
        row.cells[4].textContent = student.semester;

        studentList.appendChild(row);

    });

}

// Edit student record
function editStudent(index) {

    let student = students[index];

    document.getElementById("rollNo").value = student.rollNo;
    document.getElementById("name").value = student.name;
    document.getElementById("email").value = student.email;
    document.getElementById("course").value = student.course;
    document.getElementById("semester").value = student.semester;

    editIndex = index;

    document.getElementById("submitBtn").textContent = "Update Student";

}

// Delete student record
function deleteStudent(index) {

    if (confirm("Are you sure you want to delete this student?")) {

        students.splice(index, 1);

        if (editIndex === index) {
            editIndex = -1;
            studentForm.reset();
            document.getElementById("submitBtn").textContent = "Add Student";
        } else if (editIndex > index) {
            editIndex--;
        }

        displayStudents();

    }

}
