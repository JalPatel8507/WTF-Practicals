let tasks = [];

function addTask() {
    let input = document.getElementById("taskInput");
    let taskName = input.value.trim();

    if (taskName === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        name: taskName,
        completed: false
    });

    input.value = "";
    displayTasks();
}

function editTask(index) {
    let newName = prompt("Enter the updated task:", tasks[index].name);

    if (newName !== null && newName.trim() !== "") {
        tasks[index].name = newName.trim();
        displayTasks();
    }
}

function completeTask(index) {
    tasks[index].completed = !tasks[index].completed;
    displayTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    displayTasks();
}

function displayTasks() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach(function(task, index) {
        let taskDiv = document.createElement("div");
        taskDiv.className = "task";

        let taskText = document.createElement("span");
        taskText.textContent = task.name;

        if (task.completed) {
            taskText.classList.add("completed");
        }

        let buttons = document.createElement("div");

        let completeButton = document.createElement("button");
        completeButton.textContent = task.completed ? "Undo" : "Complete";
        completeButton.addEventListener("click", function() {
            completeTask(index);
        });

        let editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", function() {
            editTask(index);
        });

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function() {
            deleteTask(index);
        });

        buttons.appendChild(completeButton);
        buttons.appendChild(editButton);
        buttons.appendChild(deleteButton);

        taskDiv.appendChild(taskText);
        taskDiv.appendChild(buttons);

        list.appendChild(taskDiv);
    });
}