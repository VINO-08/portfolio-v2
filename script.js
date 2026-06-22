// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

// DOM Elements
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const filterBtns = document.querySelectorAll(".filter-btn");

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add Task (Create)
function addTask() {
    const text = taskInput.value.trim();

    if (text === "") {
        return;
    }

    tasks.push({
        id: Date.now(),
        text: text,
        completed: false
    });

    taskInput.value = "";

    saveTasks();
    renderTasks();
}

// Delete Task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);

    saveTasks();
    renderTasks();
}

// Edit Task (Update)
function editTask(id) {
    const task = tasks.find(task => task.id === id);

    const newText = prompt("Edit Task:", task.text);

    if (newText && newText.trim() !== "") {
        task.text = newText.trim();

        saveTasks();
        renderTasks();
    }
}

// Toggle Complete/Incomplete
function toggleTask(id) {
    const task = tasks.find(task => task.id === id);

    task.completed = !task.completed;

    saveTasks();
    renderTasks();
}

// Filter Tasks
function getFilteredTasks() {
    if (currentFilter === "active") {
        return tasks.filter(task => !task.completed);
    }

    if (currentFilter === "completed") {
        return tasks.filter(task => task.completed);
    }

    return tasks;
}

// Render Tasks
function renderTasks() {
    taskList.innerHTML = "";

    const filteredTasks = getFilteredTasks();

    filteredTasks.forEach(task => {
        const li = document.createElement("li");

        li.className = task.completed
            ? "task completed"
            : "task";

        li.dataset.id = task.id;

        li.innerHTML = `
            <span class="task-text">${task.text}</span>

            <div class="actions">
                <button class="complete-btn">
                    ${task.completed ? "Undo" : "Done"}
                </button>

                <button class="edit-btn">
                    Edit
                </button>

                <button class="delete-btn">
                    Delete
                </button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

// Add Task Button
addBtn.addEventListener("click", addTask);

// Add Task with Enter Key
taskInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});

// Event Delegation
taskList.addEventListener("click", function (e) {
    const taskElement = e.target.closest(".task");

    if (!taskElement) {
        return;
    }

    const id = Number(taskElement.dataset.id);

    if (e.target.classList.contains("delete-btn")) {
        deleteTask(id);
    }

    if (e.target.classList.contains("edit-btn")) {
        editTask(id);
    }

    if (e.target.classList.contains("complete-btn")) {
        toggleTask(id);
    }
});

// Filter Buttons
filterBtns.forEach(button => {
    button.addEventListener("click", () => {
        filterBtns.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        currentFilter = button.dataset.filter;

        renderTasks();
    });
});

// Initial Render
renderTasks();